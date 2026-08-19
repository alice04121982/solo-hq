# CairnFertility

Cairn compares IVF clinics on cost, success rates and eligibility, and explains how
treatment works, for everyone going through IVF: solo mums, solo dads, two mums, two
dads, and couples.

A cairn is a stack of stones marking a route where the path is not obvious. That is the
job of the site: practical, quiet guidance through a process that is expensive, medical
and hard to compare from the outside.

## What the site does today

- **Clinic finder** (`/ivf-finder`): search and compare clinics, UK and international,
  on treatments (IVF, ICSI, IUI, donor routes), pricing, and success rates by age band.
  Compare up to four clinics side by side. UK success rates cite the HFEA register.
- **Family pathways** (`/families`): dedicated pages for each route into IVF, with a
  clinic matcher that filters by what your pathway actually needs (donor sperm, donor
  eggs, reciprocal IVF, and so on).
- **Guides** (`/resources`): long-form guides on costs, treatment, emotional wellbeing,
  legal and admin, pregnancy and community.
- **How IVF works** (`/how-ivf-works`), **stories** (`/stories`), a **cost calculator**
  and a **journey map** on the homepage.
- **Community** (`/community`): a small, vetted private group — not a forum.
  There is no posting, commenting, or profile anywhere on this site. Applying
  is a form; a person reads every application; approval mints a single-use,
  expiring invite that is the only way the group link is ever handed out. The
  rules are at `/community/guidelines`. Day-to-day operation, including how to
  approve people and what to do when something goes wrong, is in
  [`docs/community-runbook.md`](docs/community-runbook.md).

Surrogacy is not covered yet but is planned.

The stories and quotes across the site are currently illustrative examples,
labelled as such where they render (see `src/lib/stories.ts` and
`src/lib/quotes.ts`). They must be replaced with real, consented accounts
before the labels come off.

## Stack

- [Next.js](https://nextjs.org) 16, App Router
- React 19, TypeScript
- Tailwind CSS v4 (theme tokens in `src/app/globals.css`)
- framer-motion, lucide-react
- Deployed on [Vercel](https://vercel.com)

## Local setup

```bash
npm install
npm run dev        # dev server on http://localhost:3000
npm run preview    # production build + start
npm run lint
```

## Data: where it comes from and how it stays fresh

There is no live clinic-data feed: every price, treatment list and success
rate ships with the site from **one file, `src/lib/clinics.ts`**, and the
finder, the Get Started wizard and the cost calculator all read from it.
It is indicative seed data compiled from each clinic's published price list,
sanity-checked against the HFEA's and NHS's published cost guidance, and it
must be re-verified before being treated as current.

- `DATA_PROVENANCE` (in the same file) records the sources and the date the
  figures were last verified; the UI displays both wherever prices render.
- UK success rates cite the [HFEA register](https://www.hfea.gov.uk/choose-a-clinic/clinic-search/)
  (the UK's fertility regulator — which does not endorse this site);
  overseas rates are self-reported by clinics and labelled as such.
- `npm run check:data` (Node 22.6+) enforces the data invariants and fails
  once the verification date is stale. A weekly GitHub Action
  (`.github/workflows/data-freshness.yml`) runs it and opens an issue when
  re-verification is due.
- The re-verification procedure lives in
  `.claude/skills/treatment-data-check/SKILL.md`.

## Environment variables

| Variable | Where | Purpose |
|---|---|---|
| `SUPABASE_URL` | Vercel + local | Supabase project URL. |
| `SUPABASE_ANON_KEY` | Vercel + local | Anon key. It can execute four functions and **read nothing** — every table has RLS on with no policies (see below). |
| `COMMUNITY_INVITE_URL` | Vercel + local | The group's join link. Server-only; returned by exactly one code path, a successful invite redemption. Never give it a `NEXT_PUBLIC_` name. |
| `NEXT_PUBLIC_COMMUNITY_PLATFORM` | optional | Display name for the messaging platform, default `WhatsApp`. A word, not a secret. |
| `SUPABASE_SERVICE_ROLE_KEY` | **local only** | Full database access, used by `npm run community`. Never set this on Vercel. |

Create `.env.local` (git-ignored) with the variables above for local development.

## Database

Schema and access rules live in `supabase/migrations/`, applied oldest first.
They are written to be safe to re-run against the existing project.

The access model is the security design, so it is worth stating: **the anon key
the website holds has no privileges on any table.** Row-level security is on
with no policies, plus an explicit `revoke all`. The site can only execute four
`security definer` functions — submit a signup, submit an application, check an
invite, redeem an invite. It cannot read the waitlist, read applications,
approve anyone, or mint an invite; those need the service-role key, which lives
only on a reviewer's machine. A compromise of the website leaks nothing about
who is on the list.

Reviewing applications and issuing invites is a local command, deliberately
rather than an admin page — an admin page needs authentication, and
authentication is a new attack surface guarding the most sensitive data here:

```bash
npm run community -- list                       # applications awaiting review
npm run community -- show    <email>            # read one in full
npm run community -- approve <email>            # mint a single-use invite
npm run community -- decline <email> ["note"]
npm run community -- remove  <email> ["note"]   # revoke invites, mark removed
npm run community -- purge                      # apply the retention policy
```

## Security

[`docs/security-review.md`](docs/security-review.md) records the review this
site was last given: what was fixed, what is accepted and why, and what needs a
decision. Read it before changing anything under `src/app/api/`,
`supabase/migrations/`, or the headers in `next.config.ts`.

## Project conventions

See `AGENTS.md` and the notes at the top of `src/app/globals.css`. Colours come from
the semantic tokens defined there; components use the existing library under
`src/components`.
