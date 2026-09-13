-- Retention, enforced by the database rather than by someone remembering.
--
-- Why this exists
-- ---------------
-- The privacy policy states how long each kind of community record is kept.
-- Until this migration, that schedule was applied only when a person ran
-- `npm run community -- purge` by hand, and the purge never touched 'pending'
-- or 'approved' applications or the invites table at all (review finding L-3).
-- A stated retention period that nothing enforces is not a retention period.
--
-- What this adds
-- --------------
--   1. public.purge_community_data(): one function that applies the whole
--      schedule and returns a single row of counts. It is the ONLY place the
--      schedule is implemented. The day counts are repeated, as plain numbers,
--      in src/lib/retention.ts (for the app and its copy) and in
--      scripts/community-admin.ts (which shares no module with the app).
--      Change all three together, and the privacy policy with them.
--   2. A pg_cron job, 'community-retention', that runs it every night at
--      03:15 UTC. The admin script calls the same function, so the schedule
--      is identical whichever way it runs.
--
-- The schedule (contract C3 in the Phase 3 plan; the policy states it in the
-- same words):
--   declined            whole record deleted 30 days after the decision
--   pending, unreviewed whole record deleted 90 days after applying
--   approved, unused    whole record deleted 30 days after approval, if the
--                       invite was never used
--   joined              free text and sector declaration cleared 90 days
--                       after applying; first name, email, path and stage
--                       kept while a member
--   removed             everything except email and status cleared 30 days
--                       after removal (the email stays so a removed address
--                       cannot quietly re-apply; see "Needs a lawyer" in the
--                       plan for the legitimate-interests argument)
--   invites             deleted 30 days after being used, revoked or expiring
--
-- Access model: same as every function in 0002. security definer, search_path
-- pinned, execute revoked from public, anon and authenticated. The anon key
-- must not be able to trigger deletions. The service role can, because the
-- admin script runs as it, and pg_cron runs the job as the role that
-- scheduled it (postgres, which also owns the function).
--
-- Safe to re-run: create or replace, and the cron job is unscheduled and
-- rescheduled by name.

/* ── The purge ─────────────────────────────────────────────────────────── */

create or replace function public.purge_community_data()
returns table (
  declined_deleted        bigint,
  unreviewed_deleted      bigint,
  approved_unused_deleted bigint,
  joined_cleared          bigint,
  removed_cleared         bigint,
  invites_deleted         bigint
)
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
begin
  -- 1. Declined: whole record, 30 days after the decision.
  --    reviewed_at is the decision time. It is always set by the admin
  --    script, but if a row ever reached 'declined' without it, falling back
  --    to created_at means the row is still deleted rather than kept forever.
  delete from public.community_applications
   where status = 'declined'
     and coalesce(reviewed_at, created_at) < now() - interval '30 days';
  get diagnostics declined_deleted = row_count;

  -- 2. Pending and never reviewed: whole record, 90 days after applying.
  delete from public.community_applications
   where status = 'pending'
     and created_at < now() - interval '90 days';
  get diagnostics unreviewed_deleted = row_count;

  -- 3. Approved but the invite was never used: whole record, 30 days after
  --    approval. Invites last seven days, so by then every invite for the row
  --    has expired. Redeeming an invite moves the row to 'joined', so an
  --    'approved' row should never have a redeemed invite; the not-exists
  --    guard makes sure a redeemed one is never deleted even so. Invites go
  --    with the row (on delete cascade).
  delete from public.community_applications a
   where a.status = 'approved'
     and coalesce(a.reviewed_at, a.created_at) < now() - interval '30 days'
     and not exists (
       select 1
         from public.community_invites i
        where i.application_id = a.id
          and i.redeemed_at is not null
     );
  get diagnostics approved_unused_deleted = row_count;

  -- 4. Joined: the free-text answer and the sector declaration have done
  --    their job. Cleared 90 days after applying. First name, email, path
  --    and stage stay while the person is a member. Only rows that still
  --    hold something are touched, so the count means something.
  update public.community_applications
     set reason      = null,
         affiliation = null
   where status = 'joined'
     and created_at < now() - interval '90 days'
     and (reason is not null or affiliation is not null);
  get diagnostics joined_cleared = row_count;

  -- 5. Removed: everything except email and status, 30 days after removal.
  --    The columns are not null, so "cleared" means the empty string or the
  --    empty array. pathway and stage have no check constraint on the table
  --    (only the submit function validates them), so they are blanked rather
  --    than set to a real answer that a reader of `show` could mistake for
  --    the person's own. The system timestamps (created_at,
  --    guidelines_accepted_at, reviewed_at) are kept: they are dates the site
  --    generated, not things the person told us, and reviewed_at is what
  --    lets the runbook say when the removal happened.
  update public.community_applications
     set reason      = null,
         affiliation = null,
         review_note = null,
         first_name  = '',
         pathway     = '',
         stage       = '',
         interests   = '{}'
   where status = 'removed'
     and coalesce(reviewed_at, created_at) < now() - interval '30 days'
     and (
       reason is not null
       or affiliation is not null
       or review_note is not null
       or first_name <> ''
       or pathway <> ''
       or stage <> ''
       or interests <> '{}'
     );
  get diagnostics removed_cleared = row_count;

  -- 6. Invites: 30 days after being used, revoked or expiring, whichever
  --    happened. A spent token hash is of no use to anyone, and keeping it
  --    only keeps a link between a person and a date.
  delete from public.community_invites
   where coalesce(redeemed_at, 'infinity') < now() - interval '30 days'
      or coalesce(revoked_at,  'infinity') < now() - interval '30 days'
      or expires_at                        < now() - interval '30 days';
  get diagnostics invites_deleted = row_count;

  return next;
end;
$$;

comment on function public.purge_community_data() is
  'Applies the community retention schedule stated in the privacy policy. Run nightly by pg_cron and on demand by scripts/community-admin.ts.';

revoke all on function public.purge_community_data() from public;
revoke all on function public.purge_community_data() from anon;
revoke all on function public.purge_community_data() from authenticated;
-- The admin script calls this over PostgREST with the service-role key, and
-- the service role is not a superuser: it needs execute granted explicitly.
grant execute on function public.purge_community_data() to service_role;

/* ── The nightly job ───────────────────────────────────────────────────── */

-- pg_cron ships with every Supabase project but may need switching on first:
-- Dashboard > Database > Extensions > search "pg_cron" > enable. If it is not
-- enabled, the statement below fails with "extension pg_cron is not
-- available" or a permissions error; enable it and re-run this file. Supabase
-- installs it into pg_catalog; the jobs themselves always live in the `cron`
-- schema. The runbook ("Retention runs itself") has the manual checks.
create extension if not exists pg_cron with schema pg_catalog;

-- Remove any earlier copy of the job by name, so re-running this migration
-- never leaves two purges scheduled. Returns no rows when there is none.
select cron.unschedule(jobid)
  from cron.job
 where jobname = 'community-retention';

-- Every day at 03:15 UTC (pg_cron schedules are UTC; Supabase does not change
-- that). Quiet hours in the UK, and after any day's review work. The job runs
-- as the role that scheduled it, which is the owner of the function.
select cron.schedule(
  'community-retention',
  '15 3 * * *',
  $$select public.purge_community_data();$$
);

-- Check it is scheduled:
--   select jobid, jobname, schedule, active from cron.job
--    where jobname = 'community-retention';
-- Check it ran:
--   select * from cron.job_run_details order by start_time desc limit 5;
