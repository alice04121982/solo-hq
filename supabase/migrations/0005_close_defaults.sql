-- Closes the gaps the September 2026 audit found around, not inside, the
-- access model (findings F-06, F-07, F-08, F-12 in the audit report).
--
-- Safe to re-run: every statement is idempotent or `create or replace`.

/* ── 1. Revoke the grant nobody wrote (F-07) ───────────────────────────── */
-- Supabase's default privileges handed EXECUTE to `authenticated` when each
-- function was created. `revoke … from public` in 0001–0004 does not undo a
-- role-specific grant, so the role has to be named. There are no accounts on
-- this site and no reason a signed-in role should ever exist, but if Auth
-- sign-ups were ever switched on, this is what would have let a stranger in.
revoke execute on function public.submit_waitlist_signup(text) from authenticated;
revoke execute on function public.submit_community_application(
  text, text, text, text, text[], text, text, boolean
) from authenticated;
revoke execute on function public.community_invite_status(text) from authenticated;
revoke execute on function public.redeem_community_invite(text, text) from authenticated;

/* ── 2. New objects start closed (F-08) ────────────────────────────────── */
-- Until now a `create table` or `create function` that forgot its `revoke`
-- was instantly reachable by the website's key. From here on, a table or
-- function is reachable only if a migration says so. Grants already made in
-- 0001–0004 are unaffected.
alter default privileges for role postgres in schema public
  revoke all on tables from anon, authenticated;
alter default privileges for role postgres in schema public
  revoke all on sequences from anon, authenticated;
alter default privileges for role postgres in schema public
  revoke execute on functions from anon, authenticated;

/* ── 3. The forms switch, enforced where the data lives (F-06) ─────────── */
-- FORMS_OPEN in the app (src/lib/launch.ts) gates the routes. This gates the
-- writes themselves, so a key that leaks, or has leaked, writes nothing while
-- the site says it is not collecting anything. Opening the forms at launch
-- means flipping both:
--
--   update public.app_flags set enabled = true, updated_at = now()
--    where key = 'forms_open';
--
-- and setting FORMS_OPEN=true on Vercel in the same sitting.
create table if not exists public.app_flags (
  key        text        primary key,
  enabled    boolean     not null default false,
  updated_at timestamptz not null default now()
);
alter table public.app_flags enable row level security;
revoke all on table public.app_flags from anon, authenticated;
insert into public.app_flags (key, enabled) values ('forms_open', false)
  on conflict do nothing;

create or replace function public.assert_forms_open()
returns void
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
begin
  if not exists (
    select 1 from public.app_flags where key = 'forms_open' and enabled
  ) then
    raise exception 'forms closed' using errcode = '42501';
  end if;
end;
$$;
revoke all on function public.assert_forms_open() from public, anon, authenticated;

-- The two submit functions, re-created with the guard as their first
-- statement. Bodies are otherwise identical to 0001 and 0003. The API route
-- maps every database error to a generic 500, so nothing about the closed
-- state leaks to a caller.

create or replace function public.submit_waitlist_signup(p_email text)
returns void
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  v_email text := lower(btrim(p_email));
begin
  perform public.assert_forms_open();

  if v_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' then
    raise exception 'invalid email' using errcode = '22023';
  end if;
  if length(v_email) > 254 then
    raise exception 'invalid email' using errcode = '22023';
  end if;

  insert into public.waitlist_signups (email)
  values (v_email)
  on conflict do nothing;
end;
$$;

create or replace function public.submit_community_application(
  p_email          text,
  p_first_name     text,
  p_pathway        text,
  p_stage          text,
  p_interests      text[],
  p_reason         text,
  p_affiliation    text,
  p_health_consent boolean
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
  perform public.assert_forms_open();

  if p_health_consent is distinct from true then
    raise exception 'consent required' using errcode = '22023';
  end if;

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
    guidelines_accepted_at, health_data_consent_at
  )
  values (
    v_email, v_name, p_pathway, p_stage, coalesce(p_interests, '{}'),
    nullif(btrim(coalesce(p_reason, '')), ''),
    nullif(btrim(coalesce(p_affiliation, '')), ''),
    now(), now()
  )
  on conflict do nothing;
end;
$$;

-- `create or replace` keeps existing grants, but state them again so this
-- file is complete on its own: anon may execute, nobody else may.
revoke all on function public.submit_waitlist_signup(text) from public, authenticated;
grant execute on function public.submit_waitlist_signup(text) to anon;
revoke all on function public.submit_community_application(
  text, text, text, text, text[], text, text, boolean
) from public, authenticated;
grant execute on function public.submit_community_application(
  text, text, text, text, text[], text, text, boolean
) to anon;

/* ── 4. Clinics schema housekeeping (F-12) ─────────────────────────────── */
-- Each table carried two identical permissive SELECT policies; the
-- role-scoped one stays. The two indexes have never been used: the clinic
-- data ships in src/lib/clinics.ts and these tables hold no rows.
drop policy if exists "countries public read" on public.clinic_countries;
drop policy if exists "clinics public read"   on public.clinics;
drop index if exists public.idx_clinics_country;
drop index if exists public.idx_clinics_smbc;

-- Check afterwards, as anon, that nothing widened:
--   set role anon;
--   select public.submit_waitlist_signup('a@b.co');   -- expect: forms closed
--   select * from public.app_flags;                    -- expect: permission denied
--   reset role;
