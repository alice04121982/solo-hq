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
form fails silently. Resume it, then apply both migrations from
`supabase/migrations/` in the SQL editor, oldest first. They are safe to re-run.

### 2. Create the group and lock it down

In WhatsApp, create the group, then in group settings:

- **Edit group info** → admins only
- **Send messages** → all participants (it is a conversation, not a broadcast)
- **Approve new participants** → **on**. This is the second gate: even someone
  holding a working invite link still has to be let in by you, and you only
  approve requests you have an approval on record for.

Check these after any WhatsApp update. Settings have moved between versions.

### 3. Environment variables

On Vercel (production and preview):

| Variable | What it is |
|---|---|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Anon key. Cannot read any table — see the security review |
| `COMMUNITY_INVITE_URL` | The group's join link. **Server-only. Never `NEXT_PUBLIC_`** |
| `NEXT_PUBLIC_COMMUNITY_PLATFORM` | Display name, e.g. `WhatsApp`. Optional |

In your local `.env.local` (git-ignored), the same plus:

| Variable | What it is |
|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | Full database access. **This machine only** |

The service-role key must never be set on Vercel. The deployed site has no use
for it, and its absence is what makes a site compromise survivable.

---

## The weekly job

```bash
npm run community -- list          # who is waiting
npm run community -- show alice@example.com
npm run community -- approve alice@example.com
```

`approve` prints a link. Send it to that address and no other. It works once,
expires in seven days, and only opens for someone who can also type that email
address — so forwarding it achieves nothing, which is the point.

**It is shown once and is not recoverable.** Lost one? Run `approve` again for
a fresh link, then `remove` and re-`approve` if you want the old one dead.

### Deciding

Read the free-text answer. You are looking for one thing: does this read like a
person describing their own situation? Bots and bad actors are bad at that and
rarely bother.

Approve when it reads like a person. Decline when it is empty of specifics,
pitches something, or reads like it was written to get past you. A declared
sector connection (flagged `⚑` in `list`) is not a reason to decline — plenty
of members have been on both sides — but ask what they want from the group
before deciding.

When you are unsure, wait. There is no cost to a slow yes and a real cost to a
fast one.

```bash
npm run community -- decline bob@example.com "no detail, likely automated"
```

Declined applications, and everything the person wrote, are deleted after 30
days by `purge`.

---

## When something goes wrong

**Someone shared what was said in the group.**

```bash
npm run community -- remove person@example.com "shared a screenshot"
```

That revokes any unused invite and marks them removed. It does **not** remove
them from WhatsApp — do that in the app now. Then **rotate the group link** in
WhatsApp: outstanding invites keep pointing at the old link, so re-issue to
anyone mid-join, and update `COMMUNITY_INVITE_URL` on Vercel.

**The group link leaked.** Rotate it in WhatsApp, update
`COMMUNITY_INVITE_URL`, and leave "approve new participants" on — it is what
stops a leaked link from being an open door.

**Someone asks to be forgotten.** Delete their row in Supabase. If they are in
the group, removing them from WhatsApp is separate and they can also just
leave.

**Someone reports another member.** Act first, ask later. Remove, then talk to
the reporter. The rules promise they will not have to explain themselves twice
and will never be asked to sort it out directly — keep that promise.

---

## Every month

```bash
npm run community -- purge
```

Deletes declined applications older than 30 days and clears the free-text
answer on settled ones older than 90 days. This is not housekeeping — it is the
retention promise the privacy policy makes, and it is only true if this runs.
Worth a calendar reminder until it is automated.

---

## Things to keep true

Each of these is a promise made on the site, so breaking one means changing the
copy in `src/lib/community.ts` and `src/lib/legal.ts` in the same change.

- Every member was read and approved by a person. No bulk approvals.
- The group link is never published anywhere. It reaches people one invite at
  a time.
- The site never asks for a phone number.
- Nothing said in the group is ever quoted on the site — including in the
  illustrative quotes on `/community`.
- Applicants are told, before they apply, that other members will see their
  phone number.
