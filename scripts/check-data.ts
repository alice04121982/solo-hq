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
 * Also enforces the clinic exclusion policy (src/lib/clinic-exclusions.ts),
 * checks the shape of the media roundup (src/lib/news.ts), and scans site
 * content for prescription-medicine brand names, which must never appear on
 * the public site (see the checks at the bottom of this file).
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { CLINIC_RECORDS, CLINICS, DATA_PROVENANCE } from "../src/lib/clinics.ts";
import { CLINIC_EXCLUSIONS, exclusionFor } from "../src/lib/clinic-exclusions.ts";
import { DESTINATIONS, TRAVEL_PROVENANCE } from "../src/lib/travel.ts";
import { NEWS_ITEMS, NEWS_PROVENANCE } from "../src/lib/news.ts";

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

// ── Clinic exclusions ──
//
// `CLINICS` is filtered through the exclusion policy, so an excluded clinic
// cannot render. That filter is the safety net, not the plan: a clinic we
// have decided not to list should not be sitting in the database at all,
// where a future edit could rename it out of the policy's reach.
for (const c of CLINIC_RECORDS) {
  const excluded = exclusionFor(c);
  if (excluded)
    errors.push(
      `${c.slug || c.name}: matches the exclusion for "${excluded.name}" in ` +
        `src/lib/clinic-exclusions.ts — remove the clinic from src/lib/clinics.ts, or ` +
        `retire the exclusion there if the reason no longer holds.`
    );
}

for (const x of CLINIC_EXCLUSIONS) {
  const id = x.name || "<unnamed exclusion>";
  if (x.names.length === 0 || x.countries.length === 0)
    errors.push(`${id}: an exclusion needs at least one name and one country to match on.`);
  if (!x.names.some((n) => n.toLowerCase().includes(x.name.split(" ")[0].toLowerCase())))
    warnings.push(`${id}: none of its match names look like its display name — check for a typo.`);
  if (x.reason.length < 80)
    errors.push(`${id}: the reason is too short to be a record of anything. Say what was reported and by whom.`);
  if (x.sources.length === 0)
    errors.push(`${id}: an exclusion must cite at least one published source.`);
  for (const src of x.sources) {
    if (!src.url.startsWith("https://")) errors.push(`${id}: source "${src.label}" is not an https link.`);
  }
  // An exclusion is not price data: growing old is not a failure, so this
  // reports on reviewOn rather than running it through checkFreshness and
  // failing the build for an entry that is simply still standing.
  const excludedOn = new Date(`${x.excludedOn}T00:00:00Z`);
  if (Number.isNaN(excludedOn.getTime())) errors.push(`${id}: excludedOn is not a valid ISO date.`);
  else if (excludedOn.getTime() > Date.now() + 86_400_000)
    errors.push(`${id}: excludedOn (${x.excludedOn}) is in the future.`);

  const review = new Date(`${x.reviewOn}T00:00:00Z`);
  if (Number.isNaN(review.getTime())) errors.push(`${id}: reviewOn is not a valid ISO date.`);
  else if (review.getTime() < Date.now())
    warnings.push(`${id}: passed its review date (${x.reviewOn}) — re-check it against its sources.`);
}

// ── Media roundup ──
//
// The page links out to other people's journalism, so a dead or invented link
// is the failure mode that matters. This cannot open the pages; it checks that
// what is written down could be a real, dated, absolute link to somewhere
// other than here.
const newsIds = new Set<string>();
for (const item of NEWS_ITEMS) {
  const id = item.id || item.title || "<untitled news item>";
  if (newsIds.has(item.id)) errors.push(`News "${id}": duplicate id.`);
  newsIds.add(item.id);

  if (!item.title || !item.outlet || !item.note)
    errors.push(`News "${id}": missing title, outlet or note.`);
  if (!/^https:\/\//.test(item.url))
    errors.push(`News "${id}": url must be an absolute https link to the original publisher.`);
  if (/cairnfertility/i.test(item.url))
    errors.push(`News "${id}": this list is for other people's reporting, not our own pages.`);

  for (const [label, value, required] of [
    ["addedOn", item.addedOn, true],
    ["published", item.published, false],
  ] as const) {
    if (value == null) {
      if (required) errors.push(`News "${id}": ${label} is required.`);
      continue;
    }
    const date = new Date(`${value}T00:00:00Z`);
    if (Number.isNaN(date.getTime())) errors.push(`News "${id}": ${label} is not a valid ISO date.`);
    else if (date.getTime() > Date.now() + 86_400_000)
      errors.push(`News "${id}": ${label} (${value}) is in the future.`);
  }
  if (item.related && !item.related.href.startsWith("/"))
    errors.push(`News "${id}": related.href should be a path on this site.`);
}

if (NEWS_ITEMS.filter((i) => i.featured).length > 1)
  errors.push("Media roundup: more than one item is marked featured; only one can lead the page.");

// A quiet news list is an editorial matter, not a broken build: this warns
// rather than failing the way the price and travel provenance dates do.
const roundupAgeDays = Math.floor(
  (Date.now() - new Date(`${NEWS_PROVENANCE.listUpdatedOn}T00:00:00Z`).getTime()) / 86_400_000
);
if (Number.isNaN(roundupAgeDays))
  errors.push(`NEWS_PROVENANCE.listUpdatedOn is not a valid ISO date: "${NEWS_PROVENANCE.listUpdatedOn}"`);
else if (roundupAgeDays < 0)
  errors.push(`NEWS_PROVENANCE.listUpdatedOn is in the future (${NEWS_PROVENANCE.listUpdatedOn}).`);
else if (roundupAgeDays > 90)
  warnings.push(
    `The media roundup was last swept ${roundupAgeDays} days ago, and the page says so. ` +
      `Check the links in src/lib/news.ts still resolve, add what has happened since, then ` +
      `update listUpdatedOn.`
  );

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
  `\nChecked ${CLINICS.length} listed clinics (${CLINIC_EXCLUSIONS.length} exclusion(s) in force) ` +
    `and ${NEWS_ITEMS.length} media items: ${errors.length} error(s), ${warnings.length} warning(s). ` +
    `Prices last verified ${DATA_PROVENANCE.pricesVerifiedOn}.`
);
process.exit(errors.length > 0 ? 1 : 0);
