-- Explicit consent for health data on community applications.
--
-- Correction to migration 0002
-- ----------------------------
-- Migration 0002 describes `reason` as "the only special-category field". That
-- is wrong. `pathway` ("two-mums", "two-dads") reveals sexual orientation, and
-- `stage` ("in-treatment", "pregnant") is data concerning health. All three of
-- reason, pathway and stage are special category data under UK GDPR Art. 9,
-- and they are held for as long as someone is a member, not only until review.
--
-- Migration 0002 also says the data "is collected under explicit consent".
-- Until this migration nothing recorded any such consent: the form's single
-- checkbox was agreement to the group rules (guidelines_accepted_at). This
-- migration adds a second, separate consent, recorded with its own timestamp,
-- and makes the insert function refuse to write without it.
--
-- Existing rows
-- -------------
-- The new column is nullable because earlier rows have no recorded consent.
-- They are not back-filled: a timestamp we did not capture is not one we can
-- invent. The admin list marks them "legacy: no recorded consent"; what to do
-- with them (re-consent or delete) is the owner's decision.

/* ── Column ────────────────────────────────────────────────────────────── */

alter table public.community_applications
  add column if not exists health_data_consent_at timestamptz;

comment on column public.community_applications.health_data_consent_at is
  'When the applicant ticked the separate health-data consent box. Null only on rows created before migration 0003.';

/* ── Insert function: new signature with p_health_consent ──────────────── */

-- Postgres overloads by signature, so `create or replace` with an eighth
-- parameter would leave the old seven-parameter function in place, still
-- granted to anon and still able to insert without consent. Drop it first.
drop function if exists public.submit_community_application(
  text, text, text, text, text[], text, text
);

/**
 * Records an application to join.
 *
 * Validates in the database as well as in the API route, so a bug or a
 * compromise upstream still cannot write arbitrary rows. Returns void, and
 * returns it identically for a new application and a repeat one: nobody gets
 * to test whether a given email belongs to someone doing IVF.
 *
 * `p_health_consent` must be exactly true. Anything else (false, null) raises
 * 'consent required' and nothing is written. The row records the moment of
 * consent in health_data_consent_at alongside guidelines_accepted_at.
 *
 * A repeat application from an address that is already pending or approved is
 * a no-op. A repeat from an address previously declined or removed is also a
 * no-op: re-applying is not a way around a review decision.
 */
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

revoke all on function public.submit_community_application(
  text, text, text, text, text[], text, text, boolean
) from public;
grant execute on function public.submit_community_application(
  text, text, text, text, text[], text, text, boolean
) to anon;
