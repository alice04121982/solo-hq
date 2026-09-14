# Running the community

How to review applications, let people in, and keep the group safe. Written
for whoever is holding the review queue, not for a developer.

The design in one line: **the website is the door, not the room.** The
conversation happens in a private WhatsApp group; everything in this repo
exists to make that door hard to walk through uninvited.

---

## Setup, once

### 1. Resume and prepare the database

The Supabase project pauses itself when idle, and a paused project means the
form fails silently. Resume it, then:

1. In the Supabase dashboard, go to **Database > Extensions**, search for
   `pg_cron` and switch it on. This is what lets the database run the
   retention purge by itself every night. If you skip this, migration 0004
   fails with a message about pg_cron not being available; enable it and run
   the file again.
2. Apply every file in `supabase/migrations/` in the SQL editor, oldest first
   (0001, 0002, 0003, 0004). They are safe to re-run.
3. Check the nightly job exists:

   ```sql
   select jobid, jobname, schedule, active
   from cron.job
   where jobname = 'community-retention';
   ```

   You should see one row, schedule `15 3 * * *`, active `true`.

### 2. Create the group and lock it down

In WhatsApp, create the group, then in group settings:

- **Edit group info**: admins only
- **Send messages**: all participants (it is a conversation, not a broadcast)
- **Approve new participants**: **on**. This is the second gate: even someone
  holding a working invite link still has to be let in by you, and you only
  approve requests you have an approval on record for.

Check these after any WhatsApp update. Settings have moved between versions.

### 3. Environment variables

On Vercel (production and preview):

| Variable | What it is |
|---|---|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Anon key. Cannot read any table; see the security review |
| `COMMUNITY_INVITE_URL` | The group's join link. **Server-only. Never `NEXT_PUBLIC_`** |
| `NEXT_PUBLIC_COMMUNITY_PLATFORM` | Display name, e.g. `WhatsApp`. Optional |

In your local `.env.local` (git-ignored), the same plus:

| Variable | What it is |
|---|---|
| `SUPABASE_SECRET_KEY` | Full database access (`sb_secret_…`; the legacy `SUPABASE_SERVICE_ROLE_KEY` still works). **This machine only**, in `~/Developer/cairn/.env.local`, never a folder iCloud syncs |

The service-role key must never be set on Vercel. The deployed site has no use
for it, and its absence is what makes a site compromise survivable.

---

## The weekly job

```bash
npm run community -- list          # who is waiting
npm run community -- show alice@example.com
npm run community -- approve alice@example.com
```

`list` applies the retention schedule first and then prints the queue, so you
never see an application the privacy policy says should already be gone.

`approve` prints a link. Send it to that address and no other. It works once,
expires in seven days, and only opens for someone who can also type that email
address, so forwarding it achieves nothing, which is the point.

**It is shown once and is not recoverable.** Lost one? Run `approve` again for
a fresh link, then `remove` and re-`approve` if you want the old one dead.

### Deciding

Read the free-text answer. You are looking for one thing: does this read like a
person describing their own situation? Bots and bad actors are bad at that and
rarely bother.

Approve when it reads like a person. Decline when it is empty of specifics,
pitches something, or reads like it was written to get past you. A declared
sector connection (flagged `⚑` in `list`) is not a reason to decline; plenty
of members have been on both sides. Ask what they want from the group before
deciding.

A row flagged `legacy: no recorded consent` was submitted before the form had
its separate consent tick-box, so we hold health-related information about
that person without a recorded basis for it. Do not approve it as it stands.
Send the email below the day you find it. If the person replies with a clear
yes, record it by setting `health_data_consent_at` to the time of their reply
(SQL: `update community_applications set health_data_consent_at = now() where
email = '...'`) and keep their reply email. If there is no reply within 30
days, delete the row (see "Someone asks to be forgotten"). Do not chase more
than once.

Subject: Your CairnFertility community application

> Hello [first name]. You applied to join the CairnFertility community before
> we added a separate consent step to the form. Your application includes
> information about your fertility treatment, which counts as health data, so
> we need your explicit permission to keep it. If you are happy for us to keep
> your application, including your path, stage and what you wrote, so that a
> person can read it and decide on your place, please reply to this email
> with the word "yes". If we do not hear from you within 30 days, or if you
> would rather we did not keep it, we will delete it. You can also apply again
> at any time through the current form at cairnfertility.com/community.

When you are unsure, wait. There is no cost to a slow yes and a real cost to a
fast one.

### Decline

```bash
npm run community -- decline bob@example.com "no detail, likely automated"
```

The note is for you and is never sent. The command prints an email. Send it,
from hello@cairnfertility.com to the address on the application, with no
additions and no reason. This is the text:

> Hello [first name]. Thank you for applying to the CairnFertility community. We are not able to offer you a place at the moment. Your application will be deleted within 30 days. If you have questions, reply to this email.

Declined applications, and everything the person wrote, are deleted 30 days
after the decision by the nightly purge. The site tells applicants they will
hear either way, so the email is not optional.

---

## What you see in WhatsApp

When someone uses their invite and asks to join the group, WhatsApp shows you
their phone number and profile name, and you match that request to the
approval you have on record. The site never asks for a phone number, and no
phone number is stored in the database, so this is the only place one reaches
us. The privacy policy says exactly this, and the sentence must stay true:

> As group admin, we can see members' phone numbers in WhatsApp when we approve join requests and match them to applications. We do not copy them anywhere else.

So: do not save members' numbers to your contacts, do not export the member
list, and do not paste numbers into notes, chats or issues. If you need to
reach a member outside the group, do it inside WhatsApp.

---

## When something goes wrong

**Someone shared what was said in the group.**

```bash
npm run community -- remove person@example.com "shared a screenshot"
```

That revokes any unused invite and marks them removed. It does **not** remove
them from WhatsApp; do that in the app now. Then **rotate the group link** in
WhatsApp: outstanding invites keep pointing at the old link, so re-issue to
anyone mid-join, and update `COMMUNITY_INVITE_URL` on Vercel.

Thirty days after removal the nightly purge clears everything on the row
except the email and the status. The email stays so that address cannot
quietly re-apply.

**The group link leaked.** Rotate it in WhatsApp, update
`COMMUNITY_INVITE_URL`, and leave "approve new participants" on. It is what
stops a leaked link from being an open door.

**Someone asks to be forgotten.** They have the right to this at any time, and
we promise it on the form and in the privacy policy. Do it the same day.

1. If they are in the group, remove them from WhatsApp, then run
   `npm run community -- remove person@example.com "asked to be forgotten"`
   so no live invite remains. If they were never in the group, skip to step 2.
2. Delete the row in the Supabase SQL editor. Their invites go with it.

   ```sql
   delete from public.community_applications
   where lower(email) = lower('person@example.com');
   ```

   If they also want off the waitlist:

   ```sql
   delete from public.waitlist_signups
   where lower(email) = lower('person@example.com');
   ```

3. Reply to their email to confirm it is done. Keep it short: "We have deleted
   your application and everything you sent us. Nothing about you remains in
   our database." Do not keep a copy of their original request once you have
   replied.

Nothing from the group itself is affected, because nothing from the group is
ever stored here.

**Someone reports another member.** Act first, ask later. Remove, then talk to
the reporter. The rules promise they will not have to explain themselves twice
and will never be asked to sort it out directly. Keep that promise.

---

## Retention runs itself

The privacy policy states how long each kind of record is kept. The database
enforces it: a job called `community-retention` runs every night at 03:15 UTC
(04:15 in British Summer Time) using pg_cron, and the same purge runs whenever
you type `list` or `purge`. There is nothing to remember. This is the promise
the policy makes, and it is only true while the job exists.

What one run does:

| Record | What happens | When |
|---|---|---|
| Declined | Whole record deleted | 30 days after the decision |
| Pending, never reviewed | Whole record deleted | 90 days after applying |
| Approved, invite never used | Whole record deleted | 30 days after approval |
| Joined | Free-text answer and sector declaration cleared; first name, email, path and stage kept while a member | 90 days after applying |
| Removed | Everything except email and status cleared | 30 days after removal |
| Invites | Deleted | 30 days after being used, revoked or expiring |

Waitlist emails are kept until the person asks to be removed.

**Check it ran.** In the Supabase SQL editor:

```sql
select * from cron.job_run_details order by start_time desc limit 5;
```

Each night should show one row for `community-retention` with `status`
`succeeded`. If you see `failed`, the `return_message` column says why; the
usual cause is a migration that has not been applied.

**Run it now.** `npm run community -- purge` runs the same purge and prints
what it did, one count per line.

**Paused projects.** Supabase pauses a project after a period without traffic.
A paused project does not run pg_cron jobs. Nothing is lost: every rule is
"older than N days", so the first run after you resume the project catches up
everything that was missed. Resume it, then run `list` or `purge` once so you
are not waiting for 03:15. If the project pauses often, the retention promise
is only being kept while someone is looking, which is worth knowing about.

**Change the schedule** only by editing
`supabase/migrations/0004_community_retention.sql`, `src/lib/retention.ts`,
the constants in `scripts/community-admin.ts` and the privacy policy in
`src/lib/legal.ts` in the same change. They repeat the same numbers on
purpose, so a grep for `30 days` and `90 days` across them should agree.

---

## Things to keep true

Each of these is a promise made on the site, so breaking one means changing the
copy in `src/lib/community.ts` and `src/lib/legal.ts` in the same change.

- Every member was read and approved by a person. No bulk approvals.
- The group link is never published anywhere. It reaches people one invite at
  a time.
- The site never asks for a phone number.
- Members' phone numbers are seen in WhatsApp and copied nowhere else.
- Nothing said in the group is ever quoted on the site, including in the
  illustrative quotes on `/community`.
- Applicants are told, before they apply, that other members will see their
  phone number.
- Every declined applicant gets the decline email.
- The retention schedule in the privacy policy is the one migration 0004
  enforces, and the nightly job is active.
