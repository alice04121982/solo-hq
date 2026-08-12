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

Surrogacy is not covered yet but is planned. A community space is also planned:
somewhere to find people at your stage, hear from people who have been through
it and are willing to mentor, and set up local meetups. Until it exists the
site stays waitlist-honest about it and signposts existing communities such as
the Donor Conception Network.

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

| Variable | Required | Purpose |
|---|---|---|
| `SUPABASE_URL` | For the waitlist API only | Supabase project URL for `/api/waitlist`. |
| `SUPABASE_ANON_KEY` | For the waitlist API only | Anon key, RLS-scoped to insert-only on `waitlist_signups`. |

Create `.env.local` with the variables above for local development.

## Project conventions

See `AGENTS.md` and the notes at the top of `src/app/globals.css`. Colours come from
the semantic tokens defined there; components use the existing library under
`src/components`.
