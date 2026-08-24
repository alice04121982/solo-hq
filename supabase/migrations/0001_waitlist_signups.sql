-- Waitlist signups: the original email-only capture behind /waitlist and the
-- first version of /community.
--
-- This table already exists in the hosted project; it was created through the
-- Supabase dashboard before the repo tracked migrations, so this file is
-- written to be safe to re-run against a database that already has it. It is
-- here so the schema the app depends on is reviewable in the repo rather than
-- only in a web console.
--
-- Access model: the anon key has NO table privileges. Rows are written through
-- public.submit_waitlist_signup(), a security-definer function, so the API
-- route cannot read the list back out even if it is compromised.

create table if not exists public.waitlist_signups (
  id          uuid        primary key default gen_random_uuid(),
  email       text        not null,
  created_at  timestamptz not null default now()
);

-- Emails are stored lowercased and compared that way, so a case-different
-- resubmission is the same person rather than a second row.
create unique index if not exists waitlist_signups_email_key
  on public.waitlist_signups (lower(email));

alter table public.waitlist_signups enable row level security;

-- Deliberately no policies. With RLS on and no policy, anon and authenticated
-- can do nothing at all to this table directly; the security-definer function
-- below is the only route in. Revoking explicitly as well, so a future
-- "grant all on all tables" in another migration cannot quietly widen this.
revoke all on table public.waitlist_signups from anon, authenticated;

/**
 * Adds an email to the waitlist.
 *
 * Returns void, and returns it identically whether the email was new or
 * already present. That is the point: an endpoint that distinguishes the two
 * tells anyone who can guess an address whether that person is waiting to join
 * a fertility community, which is exactly the disclosure this site exists to
 * avoid.
 *
 * search_path is pinned because a security-definer function that resolves
 * unqualified names through the caller's search_path can be hijacked by a
 * shadowing object in another schema.
 */
create or replace function public.submit_waitlist_signup(p_email text)
returns void
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  v_email text := lower(btrim(p_email));
begin
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

revoke all on function public.submit_waitlist_signup(text) from public;
grant execute on function public.submit_waitlist_signup(text) to anon;
