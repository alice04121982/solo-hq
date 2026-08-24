-- The vetted community: applications, review, and single-use invites.
--
-- Why this shape
-- --------------
-- The community itself lives on a messaging platform (WhatsApp today — see
-- COMMUNITY_INVITE_URL). The site's job is not to host conversation; it is to
-- be the door. Everything here exists to make the door hard to walk through
-- uninvited:
--
--   1. Applying is not joining. Every application lands as 'pending' and a
--      human approves it. Nothing in this schema can approve an application —
--      that requires the service-role key, which only exists on the reviewer's
--      machine (scripts/community-admin.ts), never in the deployed app.
--   2. The invite link to the group is never on a page anyone can reach.
--      Approval mints a single-use, expiring token; redeeming it is the only
--      way the group link is ever served.
--   3. Redemption needs the token AND the email it was issued to. A token that
--      leaks through a server log, a shared screen, or a forwarded email is
--      not on its own enough to get in.
--   4. The anon key has no privileges on any table here. The three functions
--      below are the entire public surface, and each one is written to give
--      away as little as it can.
--
-- Sensitive data: `reason` is free text about someone's fertility treatment —
-- special category data under UK GDPR Art. 9. It is collected under explicit
-- consent, it is the minimum needed to tell a real applicant from a bot or a
-- bad actor, and scripts/community-admin.ts purge clears it once it has done
-- that job. Do not add columns here without asking whether the reviewer
-- genuinely cannot decide without them.

/* ── Applications ──────────────────────────────────────────────────────── */

create table if not exists public.community_applications (
  id                     uuid        primary key default gen_random_uuid(),
  created_at             timestamptz not null default now(),
  email                  text        not null,
  first_name             text        not null,
  pathway                text        not null,
  stage                  text        not null,
  interests              text[]      not null default '{}',
  -- Free text: "why do you want to join". The strongest single filter we
  -- have, and the only special-category field.
  reason                 text,
  -- Self-declared professional connection to the sector. Declaring one is not
  -- disqualifying; failing to declare one and being found out is.
  affiliation            text,
  guidelines_accepted_at timestamptz not null,
  status                 text        not null default 'pending',
  reviewed_at            timestamptz,
  review_note            text,
  constraint community_applications_status_check
    check (status in ('pending', 'approved', 'declined', 'joined', 'removed'))
);

create unique index if not exists community_applications_email_key
  on public.community_applications (lower(email));

create index if not exists community_applications_status_idx
  on public.community_applications (status, created_at desc);

alter table public.community_applications enable row level security;
revoke all on table public.community_applications from anon, authenticated;

/* ── Invites ───────────────────────────────────────────────────────────── */

create table if not exists public.community_invites (
  id             uuid        primary key default gen_random_uuid(),
  application_id uuid        not null
                 references public.community_applications (id) on delete cascade,
  -- SHA-256 of the token, hex. The token itself is shown once, to the person
  -- approving, and never stored: a database dump is not a set of working
  -- invites.
  token_hash     text        not null unique,
  created_at     timestamptz not null default now(),
  expires_at     timestamptz not null,
  redeemed_at    timestamptz,
  revoked_at     timestamptz
);

create index if not exists community_invites_application_idx
  on public.community_invites (application_id);

alter table public.community_invites enable row level security;
revoke all on table public.community_invites from anon, authenticated;

/* ── Public surface: three functions, nothing else ─────────────────────── */

/**
 * Records an application to join.
 *
 * Validates in the database as well as in the API route, so a bug or a
 * compromise upstream still cannot write arbitrary rows. Returns void, and
 * returns it identically for a new application and a repeat one — the same
 * non-disclosure rule as the waitlist: nobody gets to test whether a given
 * email belongs to someone doing IVF.
 *
 * A repeat application from an address that is already pending or approved is
 * a no-op. A repeat from an address previously declined or removed is also a
 * no-op: re-applying is not a way around a review decision.
 */
create or replace function public.submit_community_application(
  p_email       text,
  p_first_name  text,
  p_pathway     text,
  p_stage       text,
  p_interests   text[],
  p_reason      text,
  p_affiliation text
)
returns void
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  v_email text := lower(btrim(p_email));
  v_name  text := btrim(p_first_name);
begin
  if v_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
     or length(v_email) > 254 then
    raise exception 'invalid email' using errcode = '22023';
  end if;

  if v_name = '' or length(v_name) > 80 then
    raise exception 'invalid name' using errcode = '22023';
  end if;

  if p_pathway not in
       ('solo-mum','solo-dad','two-mums','two-dads','mum-and-dad','exploring') then
    raise exception 'invalid pathway' using errcode = '22023';
  end if;

  if p_stage not in
       ('deciding','preparing','in-treatment','pregnant','parent') then
    raise exception 'invalid stage' using errcode = '22023';
  end if;

  if coalesce(array_length(p_interests, 1), 0) > 10 then
    raise exception 'invalid interests' using errcode = '22023';
  end if;

  -- Length caps are a storage-exhaustion guard as much as a data-quality one.
  if length(coalesce(p_reason, '')) > 1500
     or length(coalesce(p_affiliation, '')) > 300 then
    raise exception 'field too long' using errcode = '22023';
  end if;

  insert into public.community_applications (
    email, first_name, pathway, stage, interests, reason, affiliation,
    guidelines_accepted_at
  )
  values (
    v_email, v_name, p_pathway, p_stage, coalesce(p_interests, '{}'),
    nullif(btrim(coalesce(p_reason, '')), ''),
    nullif(btrim(coalesce(p_affiliation, '')), ''),
    now()
  )
  on conflict do nothing;
end;
$$;

revoke all on function public.submit_community_application(
  text, text, text, text, text[], text, text
) from public;
grant execute on function public.submit_community_application(
  text, text, text, text, text[], text, text
) to anon;

/**
 * Reports whether an invite token can still be redeemed, so someone arriving
 * on a dead link is told so kindly rather than after filling in a form.
 *
 * Takes the hash, never the token. Says nothing about who the invite belongs
 * to. Knowing a token is live is only useful to someone who already holds a
 * 256-bit token, and they still cannot redeem it without the email address it
 * was issued to.
 */
create or replace function public.community_invite_status(p_token_hash text)
returns text
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  v_invite public.community_invites%rowtype;
begin
  select * into v_invite
  from public.community_invites
  where token_hash = p_token_hash;

  if not found then
    return 'unknown';
  elsif v_invite.revoked_at is not null then
    return 'revoked';
  elsif v_invite.redeemed_at is not null then
    return 'used';
  elsif v_invite.expires_at <= now() then
    return 'expired';
  else
    return 'valid';
  end if;
end;
$$;

revoke all on function public.community_invite_status(text) from public;
grant execute on function public.community_invite_status(text) to anon;

/**
 * Burns an invite. Returns true only if the token was live AND belonged to the
 * email given. The caller reveals the group link on true and nothing on false.
 *
 * The update is guarded by `redeemed_at is null` in the WHERE clause rather
 * than checked first and written after, so two simultaneous redemptions of the
 * same token cannot both succeed.
 */
create or replace function public.redeem_community_invite(
  p_token_hash text,
  p_email      text
)
returns boolean
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  v_application_id uuid;
begin
  update public.community_invites i
     set redeemed_at = now()
    from public.community_applications a
   where i.token_hash    = p_token_hash
     and i.application_id = a.id
     and i.redeemed_at   is null
     and i.revoked_at    is null
     and i.expires_at    > now()
     and lower(a.email)   = lower(btrim(p_email))
  returning i.application_id into v_application_id;

  if v_application_id is null then
    return false;
  end if;

  update public.community_applications
     set status = 'joined'
   where id = v_application_id;

  return true;
end;
$$;

revoke all on function public.redeem_community_invite(text, text) from public;
grant execute on function public.redeem_community_invite(text, text) to anon;
