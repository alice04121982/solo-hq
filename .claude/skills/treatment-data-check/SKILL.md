---
name: treatment-data-check
description: Re-verify the treatment cost and clinic data behind the finder, wizard and cost calculator against primary sources (clinic price lists, the HFEA register and cost guidance, NHS), fix stale figures, and stamp the verification date. Use on the weekly data-refresh schedule, whenever `npm run check:data` fails or warns, when a user reports a wrong price or missing result, or before any launch or announcement that cites prices.
---

# Treatment data check

All treatment prices, treatment lists and success rates live in ONE file:
`src/lib/clinics.ts`. The finder (`/ivf-finder`), the Get Started wizard
(`src/components/clinic-matcher.tsx`) and the cost calculator all read from
it. Never add prices anywhere else; if a surface needs a figure, it imports
it from there.

## Ground rules

- **Never invent a figure.** A price you cannot source stays absent
  (`undefined`), and the UI renders "Not published". Absent beats wrong.
- **Never bump `DATA_PROVENANCE.pricesVerifiedOn` without actually
  re-checking.** The date is a promise to users; the UI displays it.
- UK clinics: success rates must stay `verification: "hfea"` citing the
  register. Overseas: `verification: "clinic"` (self-reported). Never blend.
- IUI rule: a clinic has `"IUI"` in `treatments` if and only if it also has
  `iuiPricePerCycleGbp`. `npm run check:data` enforces this.
- The HFEA does not endorse this site. Keep that wording (see
  `src/components/regulator-notice.tsx`) intact.

## Procedure

1. **Run the structural check first**: `npm run check:data`. Fix any errors
   it reports before touching sources.

2. **Re-verify each clinic** in `src/lib/clinics.ts`:
   - Fetch the clinic's published price list (use `priceListUrl` if set,
     otherwise find it from `website` — and set `priceListUrl` once found,
     only with a URL you actually loaded).
   - Compare `pricePerCycleGbp` (headline own-egg IVF) and
     `iuiPricePerCycleGbp` (IUI excluding drugs and donor sperm). Update on
     drift; convert overseas prices at the current indicative GBP rate.
   - Check the clinic still holds an HFEA licence (UK) via
     https://www.hfea.gov.uk/choose-a-clinic/clinic-search/ and that its
     treatment list is still right.
   - Do not deep-link to individual HFEA register pages by constructing
     URLs from `hfeaNumber` — the register's numeric page IDs are internal
     and don't reliably match licence numbers. Link the register search.

3. **Re-check the national benchmarks** quoted in `DATA_PROVENANCE`
   (HFEA IUI page, HFEA IVF page, NHS IVF availability page). If the
   quoted figures or URLs changed, update the `benchmarks` entries.

4. **Check for newer HFEA success-rate data.** The register updates
   periodically and an annual "Fertility treatment: trends and figures"
   report is published each year (`DATA_PROVENANCE.successRates.
   latestNationalReportUrl`). If newer per-clinic rates are available,
   update `byBracket` and `year` per clinic — keeping each clinic's own
   published denominator, and leaving unpublished brackets absent.

5. **Sweep the prose figures** so copy doesn't drift from the data file:
   - `src/lib/guides.ts` — £ figures in guide text (IUI callout especially).
   - `src/components/cost-calculator.tsx` — `BASE_COSTS`, `SOLO_COSTS`,
     `MEDS_COST`, `ADD_ONS`.
   - `public/downloads/cairn-ivf-budget-template.csv`.

6. **Stamp and validate**: set `DATA_PROVENANCE.pricesVerifiedOn` to today
   (ISO `YYYY-MM-DD`), then run `npm run check:data`, `npm run lint`, and
   `npm run build`.

7. **Ship it reviewably**: commit on a fresh branch, push, and open a draft
   PR. In the PR body, list every figure that changed with its source URL,
   and every figure you could not verify (with what you tried). A run that
   changes nothing still updates `pricesVerifiedOn` and says so.

## If sources are unreachable

Network egress may block some clinic sites. Never guess around a blocked
source: leave the figure as is, do NOT bump `pricesVerifiedOn` for that
clinic's data, and list the blocked URLs in the PR body so a human can
check them.
