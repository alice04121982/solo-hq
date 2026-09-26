# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
People going through IVF or planning to: solo mums, solo dads, two mums, two
dads and couples. They often arrive anxious and short of money, while
comparing options that are expensive, medical and hard to read from the
outside. Today they are in the UK. A US audience is planned (see
`reports/US IVF market expansion plan.md`).

## Product Purpose
Cairn is an independent IVF clinic comparison and guidance site. It compares
clinics on cost, success rates and eligibility, and explains how treatment
works for each family route. Success means a visitor leaves knowing what their
route will cost, which clinics fit, and what to do next.

## Positioning
Independent. Cairn is never paid to change rankings and collects no tracking
data. It is built around family pathways (donor sperm, donor eggs, reciprocal
IVF) rather than only heterosexual couples.

## Capabilities and Constraints
- Clinic finder, family pathway pages, guides, cost calculator, Get Started
  wizard, vetted private community (no posting or profiles on the site).
- All clinic data ships from `src/lib/clinics.ts` with sources and a
  verification date shown wherever prices appear.
- No analytics, pixels or third-party requests. The CSP restricts
  `connect-src` to `'self'`. Pages are statically generated.
- Markets: the UK stays at the current URLs. A US market is planned under
  `/us` (decided 2026-09-26). Not built yet.

## Brand Commitments
- The name refers to a cairn: a stack of stones marking a route where the
  path isn't obvious. The voice is practical, quiet guidance.
- Flags are drawn as inline SVG (`src/components/country-flag.tsx`), never
  emoji, and always have the country name written beside them.

## Evidence on Hand
- Stories and quotes are illustrative and labelled as such
  (`src/lib/stories.ts`, `src/lib/quotes.ts`). Never present them as real
  testimonials.
- UK success rates cite the HFEA register. Overseas rates are self-reported
  and labelled.

## Product Principles
1. Independence is visible: sources, dates and exclusions are shown, not
   hidden.
2. Collect nothing we don't need. Work things out in the browser where
   possible.
3. Every family route is a first-class path, not an edge case.
4. Calm over urgency: no dark patterns, no blocking interruptions.

## Accessibility & Inclusion
The site has an accessibility statement at `/accessibility`. The research
recommends targeting WCAG 2.2 AA for the US launch.
