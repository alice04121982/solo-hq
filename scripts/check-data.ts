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
 *
 * Also scans site content for prescription-medicine brand names, which must
 * never appear on the public site (see the check at the bottom of this file).
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { CLINICS, DATA_PROVENANCE } from "../src/lib/clinics.ts";
import { GUIDES } from "../src/lib/guides.ts";
import { FAMILY_TYPES } from "../src/lib/family-types.ts";
import { ALL_STORIES, FEATURED_STORIES } from "../src/lib/stories.ts";
import { DESTINATIONS, TRAVEL_PROVENANCE } from "../src/lib/travel.ts";

const STALE_DAYS = Number(process.env.STALE_DAYS ?? 120);

const errors: string[] = [];
const warnings: string[] = [];

// ── Provenance freshness ──
function checkFreshness(label: string, isoDate: string, fixHint: string) {
  const date = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) {
    errors.push(`${label} is not a valid ISO date: "${isoDate}"`);
    return;
  }
  const ageDays = Math.floor((Date.now() - date.getTime()) / 86_400_000);
  if (ageDays < 0) {
    errors.push(`${label} is in the future (${isoDate}).`);
  } else if (ageDays > STALE_DAYS) {
    errors.push(
      `${label} data is stale: last verified ${ageDays} days ago (${isoDate}), ` +
        `limit is ${STALE_DAYS} days. ${fixHint}`
    );
  } else if (ageDays > STALE_DAYS * 0.75) {
    warnings.push(`${label} was last verified ${ageDays} days ago; it goes stale at ${STALE_DAYS}.`);
  }
}

checkFreshness(
  "DATA_PROVENANCE.pricesVerifiedOn",
  DATA_PROVENANCE.pricesVerifiedOn,
  "Re-verify prices against each clinic's published price list and the HFEA/NHS benchmarks " +
    "(see the treatment-data-check skill), then update pricesVerifiedOn."
);
checkFreshness(
  "TRAVEL_PROVENANCE.verifiedOn",
  TRAVEL_PROVENANCE.verifiedOn,
  "Re-check each destination's flight and stay ranges against booking sites, then update " +
    "TRAVEL_PROVENANCE.verifiedOn in src/lib/travel.ts."
);

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

// ── Cross-file references ──
// The dynamic routes resolve slugs against these files; a dangling reference
// means a link somewhere on the site 404s.
const guideSlugs = new Set(GUIDES.map((g) => g.slug));
if (guideSlugs.size !== GUIDES.length) errors.push("Duplicate guide slug in guides.ts.");

const storyIds = new Set(ALL_STORIES.map((s) => s.id));
if (storyIds.size !== ALL_STORIES.length) errors.push("Duplicate story id in stories.ts.");
for (const s of FEATURED_STORIES) {
  if (!s) errors.push("FEATURED_IDS in stories.ts references a story id that does not exist.");
}

const familySlugs = new Set<string>();
for (const f of FAMILY_TYPES) {
  if (familySlugs.has(f.slug)) errors.push(`family-types.ts: duplicate slug "${f.slug}".`);
  familySlugs.add(f.slug);
  for (const r of f.resources) {
    if (!guideSlugs.has(r))
      errors.push(`family-types.ts (${f.slug}): resources references missing guide slug "${r}".`);
  }
}

// ── Travel estimates ──
//
// The true-cost figures across the finder, wizard and calculator depend on
// every overseas clinic city having a travel entry: a missing entry silently
// reverts that clinic to headline-price-only comparison.
const travelCities = new Set(DESTINATIONS.map((d) => d.city));
const overseasCities = new Set(
  CLINICS.filter((c) => c.region !== "UK").map((c) => c.city)
);
for (const city of overseasCities) {
  if (!travelCities.has(city))
    errors.push(
      `Overseas clinic city "${city}" has no travel entry in src/lib/travel.ts — ` +
        `its true cost falls back to the headline price.`
    );
}
for (const d of DESTINATIONS) {
  if (!overseasCities.has(d.city))
    warnings.push(`Travel entry "${d.city}" matches no overseas clinic city; remove it or fix the name.`);
  for (const [label, range, min, max] of [
    ["returnFlightGbp", d.returnFlightGbp, 30, 2500],
    ["nightlyStayGbp", d.nightlyStayGbp, 20, 500],
  ] as const) {
    if (range.low >= range.high)
      errors.push(`${d.city}: ${label} low (£${range.low}) is not below high (£${range.high}).`);
    if (range.low < min || range.high > max)
      errors.push(`${d.city}: ${label} £${range.low}–£${range.high} is outside the plausible range.`);
  }
}

// ── Prescription-medicine brand names ──
//
// Advertising prescription-only medicines to the public is a criminal offence
// under the Human Medicines Regulations 2012 (regulations 280 and 284), so
// site content discusses fertility medication by category and cost range
// only, never by brand (see the methodology on /about). This check keeps a
// named brand from slipping back in through any content edit.
const POM_BRAND_NAMES = [
  "Gonal-F", "Gonal F", "Menopur", "Bemfola", "Ovaleap", "Fostimon",
  "Meriofert", "Pergoveris", "Luveris", "Elonva", "Rekovelle", "Cetrotide",
  "Orgalutran", "Fyremadel", "Suprecur", "Synarel", "Prostap", "Zoladex",
  "Ovitrelle", "Pregnyl", "Gonasi", "Cyclogest", "Utrogestan", "Lubion",
  "Crinone", "Progynova", "Clomid",
];
const POM_PATTERN = new RegExp(
  `\\b(${POM_BRAND_NAMES.map((n) => n.replace(/[-\s]/g, "[-\\s]")).join("|")})\\b`,
  "i"
);

function* sourceFiles(dir: string): Generator<string> {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) yield* sourceFiles(path);
    else if (/\.(ts|tsx|md)$/.test(entry)) yield path;
  }
}

const srcRoot = new URL("../src", import.meta.url).pathname;
for (const file of sourceFiles(srcRoot)) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    const match = line.match(POM_PATTERN);
    if (match)
      errors.push(
        `${relative(srcRoot, file)}:${i + 1}: names the prescription medicine brand ` +
          `"${match[1]}" — describe medication by category and cost range instead ` +
          `(Human Medicines Regulations 2012, regs 280/284).`
      );
  });
}

// ── Report ──
for (const w of warnings) console.warn(`WARN  ${w}`);
for (const e of errors) console.error(`ERROR ${e}`);
console.log(
  `\nChecked ${CLINICS.length} clinics, ${GUIDES.length} guides, ${FAMILY_TYPES.length} family types, ` +
    `${ALL_STORIES.length} stories: ${errors.length} error(s), ${warnings.length} warning(s). ` +
    `Prices last verified ${DATA_PROVENANCE.pricesVerifiedOn}.`
);
process.exit(errors.length > 0 ? 1 : 0);
