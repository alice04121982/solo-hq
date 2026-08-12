/**
 * Treatment-data integrity and freshness check.
 *
 * Run with `npm run check:data` (Node 22.6+ — executes TypeScript directly
 * via type stripping). Exits non-zero when the data breaks an invariant or
 * has gone stale, so CI can alert before wrong figures reach users.
 *
 * What "stale" means here: DATA_PROVENANCE.pricesVerifiedOn is older than
 * STALE_DAYS. Re-verifying (the treatment-data-check skill walks through it)
 * and bumping that date is the fix — never bump the date without actually
 * re-checking the figures.
 */
import { CLINICS, DATA_PROVENANCE } from "../src/lib/clinics.ts";

const STALE_DAYS = Number(process.env.STALE_DAYS ?? 120);

const errors: string[] = [];
const warnings: string[] = [];

// ── Provenance freshness ──
const verifiedOn = new Date(`${DATA_PROVENANCE.pricesVerifiedOn}T00:00:00Z`);
if (Number.isNaN(verifiedOn.getTime())) {
  errors.push(`DATA_PROVENANCE.pricesVerifiedOn is not a valid ISO date: "${DATA_PROVENANCE.pricesVerifiedOn}"`);
} else {
  const ageDays = Math.floor((Date.now() - verifiedOn.getTime()) / 86_400_000);
  if (ageDays < 0) {
    errors.push(`DATA_PROVENANCE.pricesVerifiedOn is in the future (${DATA_PROVENANCE.pricesVerifiedOn}).`);
  } else if (ageDays > STALE_DAYS) {
    errors.push(
      `Price data is stale: last verified ${ageDays} days ago (${DATA_PROVENANCE.pricesVerifiedOn}), ` +
        `limit is ${STALE_DAYS} days. Re-verify prices against each clinic's published price list ` +
        `and the HFEA/NHS benchmarks (see the treatment-data-check skill), then update pricesVerifiedOn.`
    );
  } else if (ageDays > STALE_DAYS * 0.75) {
    warnings.push(`Price data was last verified ${ageDays} days ago; it goes stale at ${STALE_DAYS}.`);
  }
}

// ── Per-clinic invariants ──
const slugs = new Set<string>();
const currentYear = new Date().getUTCFullYear();

for (const c of CLINICS) {
  const id = c.slug || c.name || "<unnamed clinic>";
  if (slugs.has(c.slug)) errors.push(`${id}: duplicate slug.`);
  slugs.add(c.slug);

  if (!c.name || !c.city || !c.country) errors.push(`${id}: missing name, city or country.`);

  if (c.country === "United Kingdom") {
    if (!c.hfeaLicensed) errors.push(`${id}: UK clinic must be HFEA licensed.`);
    if (!c.hfeaNumber) errors.push(`${id}: UK clinic must carry its HFEA centre number.`);
    if (c.successRates.verification !== "hfea")
      errors.push(`${id}: UK success rates must carry verification "hfea" and cite the register.`);
  } else if (c.successRates.verification !== "clinic") {
    errors.push(`${id}: overseas success rates must carry verification "clinic" (self-reported).`);
  }

  const offersIui = c.treatments.includes("IUI");
  if (offersIui && c.iuiPricePerCycleGbp == null)
    errors.push(`${id}: offers IUI but has no iuiPricePerCycleGbp — the budget filter cannot price it.`);
  if (!offersIui && c.iuiPricePerCycleGbp != null)
    errors.push(`${id}: has an IUI price but IUI is not in treatments.`);

  for (const [label, price] of [
    ["pricePerCycleGbp", c.pricePerCycleGbp],
    ["iuiPricePerCycleGbp", c.iuiPricePerCycleGbp],
  ] as const) {
    if (price != null && (price < 300 || price > 50_000))
      errors.push(`${id}: ${label} of £${price} is outside the plausible range.`);
  }
  if (
    c.pricePerCycleGbp != null &&
    c.iuiPricePerCycleGbp != null &&
    c.iuiPricePerCycleGbp >= c.pricePerCycleGbp
  ) {
    errors.push(`${id}: IUI price (£${c.iuiPricePerCycleGbp}) is not below the IVF price (£${c.pricePerCycleGbp}).`);
  }

  for (const [bracket, rate] of Object.entries(c.successRates.byBracket)) {
    if (rate != null && (rate < 0 || rate > 80))
      errors.push(`${id}: ${bracket} live birth rate of ${rate}% is outside the plausible range.`);
  }
  if (c.successRates.year < currentYear - 6)
    warnings.push(
      `${id}: success rates cover ${c.successRates.year}; check whether a newer dataset exists ` +
        `(latest national report: ${DATA_PROVENANCE.successRates.latestNationalReportUrl}).`
    );
}

if (CLINICS.length === 0) errors.push("Clinic database is empty.");

// ── Report ──
for (const w of warnings) console.warn(`WARN  ${w}`);
for (const e of errors) console.error(`ERROR ${e}`);
console.log(
  `\nChecked ${CLINICS.length} clinics: ${errors.length} error(s), ${warnings.length} warning(s). ` +
    `Prices last verified ${DATA_PROVENANCE.pricesVerifiedOn}.`
);
process.exit(errors.length > 0 ? 1 : 0);
