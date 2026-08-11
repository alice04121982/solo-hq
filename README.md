# CairnFertility

Cairn compares IVF clinics on cost, success rates and eligibility, and explains how
treatment works, for everyone going through IVF: solo mums, solo dads, two mums, two
dads, and couples.

A cairn is a stack of stones marking a route where the path is not obvious. That is the
job of the site: practical, quiet guidance through a process that is expensive, medical
and hard to compare from the outside.

## What the site does today

- **Clinic finder** (`/ivf-finder`): search and compare UK clinics, with seed data for
  the Cambridge area and a live search backed by the Claude API. Compare up to four
  clinics side by side on pricing, packages and HFEA success rates by age band.
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

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | For live clinic search only | Powers `/api/clinic-search`, which uses the Claude API with web search to fetch current clinic data. Without it the finder still works from the bundled seed data. |

Create `.env.local` with the variable above for local development.

## Project conventions

See `AGENTS.md` and the notes at the top of `src/app/globals.css`. Colours come from
the semantic tokens defined there; components use the existing library under
`src/components`.
