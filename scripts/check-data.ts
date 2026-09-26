/**
 * Treatment-data integrity and freshness check.
 *
 * Run with `npm run check:data` (Node 22.6+, executes TypeScript directly
 * via type stripping). Exits non-zero when the data breaks an invariant or
 * has gone stale, so CI can alert before wrong figures reach users.
 *
 * What "stale" means here: DATA_PROVENANCE.pricesVerifiedOn is older than
 * STALE_DAYS. Re-verifying (the treatment-data-check skill walks through it)
 * and bumping that date is the fix, never bump the date without actually
 * re-checking the figures.
 *
 * Also enforces the clinic exclusion policy (src/lib/clinic-exclusions.ts),
 * checks the shape of the media roundup (src/lib/news.ts), and scans site
 * content for prescription-medicine brand names, which must never appear on
 * the public site (see the checks at the bottom of this file).
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { CLINIC_RECORDS, CLINICS, DATA_PROVENANCE, NO_RESULTS_PAGE_LABEL } from "../src/lib/clinics.ts";
import { HFEA_BANDS } from "../src/types/clinic.ts";
import { CLINIC_EXCLUSIONS, exclusionFor } from "../src/lib/clinic-exclusions.ts";
import { eligibilityFor } from "../src/lib/country-eligibility.ts";
import { GUIDES } from "../src/lib/guides.ts";
import { FAMILY_TYPES } from "../src/lib/family-types.ts";
import { ALL_STORIES, FEATURED_STORIES } from "../src/lib/stories.ts";
import { DESTINATIONS, TRAVEL_PROVENANCE } from "../src/lib/travel.ts";
import { NEWS_ITEMS, NEWS_PROVENANCE } from "../src/lib/news.ts";
import { PLACES, distanceMiles, postcodeArea, searchPlaces } from "../src/lib/geo.ts";
import {
  EMPTY_ANSWERS,
  STATE_RULES,
  allProvenance,
  assessCoverage,
  stepsFor,
  type CoverageAnswers,
  type Verdict,
} from "../src/lib/us-coverage.ts";

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
  "Re-verify prices against each clinic's published price list and the HFEA cost guidance " +
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
const LICENCE_WARNING_DAYS = 30;

/** Parses an ISO date, recording an error under `label` when it is missing or malformed. */
function isoDate(id: string, label: string, value: string | undefined, required: boolean): Date | undefined {
  if (value == null) {
    if (required) errors.push(`${id}: ${label} is required.`);
    return undefined;
  }
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) {
    errors.push(`${id}: ${label} is not a valid ISO date: "${value}".`);
    return undefined;
  }
  return date;
}

let earliestCheckedOn: string | undefined;

for (const c of CLINICS) {
  const id = c.slug || c.name || "<unnamed clinic>";
  if (slugs.has(c.slug)) errors.push(`${id}: duplicate slug.`);
  slugs.add(c.slug);

  if (!c.name || !c.city || !c.country) errors.push(`${id}: missing name, city or country.`);

  // The distance sort and "within" filter read every clinic's coordinates;
  // a missing or implausible pair would silently misplace the clinic.
  if (!c.coordinates || !Number.isFinite(c.coordinates.lat) || !Number.isFinite(c.coordinates.lng)) {
    errors.push(`${id}: coordinates are required for the distance sort.`);
  } else {
    const { lat, lng } = c.coordinates;
    if (Math.abs(lat) > 90 || Math.abs(lng) > 180)
      errors.push(`${id}: coordinates ${lat}, ${lng} are not on the earth.`);
    if (c.region === "UK" && (lat < 49 || lat > 61 || lng < -9 || lng > 2.5))
      errors.push(`${id}: coordinates ${lat}, ${lng} are outside the UK for a UK clinic.`);
    const place = PLACES.find((pl) => pl.name === c.city);
    if (place && distanceMiles(place, c.coordinates) > 40)
      errors.push(`${id}: coordinates are ${Math.round(distanceMiles(place, c.coordinates))} miles from ${c.city} in the gazetteer; one of them is wrong.`);
  }
  if (c.country && !eligibilityFor(c.country)) {
    errors.push(`${id}: no entry for "${c.country}" in src/lib/country-eligibility.ts; the matcher and finder cannot say who its law allows clinics to treat.`);
  }

  // Every clinic carries the date its price, address and treatments were
  // last read. The file-level pricesVerifiedOn may not be later than the
  // earliest of them: it is a promise about the whole file.
  const checked = isoDate(id, "checkedOn", c.checkedOn, true);
  if (checked && checked.getTime() > Date.now() + 86_400_000)
    errors.push(`${id}: checkedOn (${c.checkedOn}) is in the future.`);
  if (c.checkedOn && (earliestCheckedOn == null || c.checkedOn < earliestCheckedOn))
    earliestCheckedOn = c.checkedOn;

  const report = c.successRates;
  if (c.country === "United Kingdom") {
    if (!c.hfeaLicensed) errors.push(`${id}: UK clinic must be HFEA licensed.`);
    if (!c.hfeaNumber) errors.push(`${id}: UK clinic must carry its HFEA centre number.`);
    if (report.verification !== "hfea")
      errors.push(`${id}: UK success rates must carry verification "hfea" and cite the register.`);
    if (report.denominator !== "per embryo transferred")
      errors.push(`${id}: HFEA figures are births per embryo transferred; the denominator says "${report.denominator}".`);
    if (!/\/choose-a-clinic\/clinic-search\/results\/\d+\/?$/.test(report.sourceUrl))
      errors.push(`${id}: UK sourceUrl must be the clinic's own Choose a Clinic results page.`);
    // The register publishes three bands; nothing else is entered for UK
    // clinics, so a six-bracket figure can never be passed off as HFEA data.
    if (Object.keys(report.byBracket).length > 0)
      errors.push(`${id}: UK reports must not carry byBracket figures; the register publishes HFEA bands only.`);
    if (!report.byHfeaBand) {
      errors.push(`${id}: UK report needs byHfeaBand copied from the register (empty object if the page shows nothing).`);
    } else {
      for (const band of HFEA_BANDS) {
        const fig = report.byHfeaBand[band.value];
        if (!fig) {
          warnings.push(`${id}: no HFEA figure for "${band.label}"; it renders as "Not published".`);
          continue;
        }
        if (fig.rate < 0 || fig.rate > 80 || fig.nationalAverage < 0 || fig.nationalAverage > 80)
          errors.push(`${id}: ${band.value} rate ${fig.rate}% or national average ${fig.nationalAverage}% is outside the plausible range.`);
        if (fig.range.low > fig.rate || fig.range.high < fig.rate)
          errors.push(`${id}: ${band.value} rate ${fig.rate}% sits outside its own range ${fig.range.low}–${fig.range.high}%.`);
        if (fig.count <= 0) errors.push(`${id}: ${band.value} count must be positive.`);
      }
      if (report.vsNationalAverage == null)
        errors.push(`${id}: UK report needs the all-ages vsNationalAverage verdict.`);
    }
    isoDate(id, "successRates.checkedOn", report.checkedOn, true);

    // Licences are routinely renewed, so an approaching expiry is a prompt to
    // re-read the register page, not a defect. Past expiry fails the build
    // until someone has looked.
    const expiry = isoDate(id, "licenceExpiry", c.licenceExpiry, true);
    if (expiry) {
      const daysLeft = Math.floor((expiry.getTime() - Date.now()) / 86_400_000);
      if (daysLeft < 0)
        errors.push(`${id}: HFEA licence expiry ${c.licenceExpiry} has passed. Re-read the register page and update licenceExpiry.`);
      else if (daysLeft <= LICENCE_WARNING_DAYS)
        warnings.push(`${id}: HFEA licence expires in ${daysLeft} day(s) (${c.licenceExpiry}). Re-check the register page soon.`);
    }
  } else {
    if (report.verification !== "clinic")
      errors.push(`${id}: overseas success rates must carry verification "clinic".`);
    if (report.byHfeaBand)
      errors.push(`${id}: only UK clinics carry byHfeaBand.`);
    const hasFigures = Object.keys(report.byBracket).length > 0 || (report.publishedBands?.length ?? 0) > 0;
    if (hasFigures && report.sourceLabel === NO_RESULTS_PAGE_LABEL)
      errors.push(`${id}: carries figures but says no results page was found.`);
    if (hasFigures && report.sourceUrl.replace(/\/$/, "") === (c.website ?? "").replace(/\/$/, ""))
      errors.push(`${id}: rate figures must link the results page they were read from, not the homepage.`);
    for (const band of report.publishedBands ?? []) {
      if (band.rate < 0 || band.rate > 80)
        errors.push(`${id}: published band "${band.label}" rate ${band.rate}% is outside the plausible range.`);
    }
    if (c.pricePerCycleGbp != null && c.localPrice == null)
      warnings.push(`${id}: overseas price has no localPrice; record the clinic's own currency figure.`);
    if (c.pricePerCycleGbp != null && !c.priceListUrl)
      errors.push(`${id}: a published price needs the priceListUrl it was read from.`);
  }

  // Donor labels are legal claims; each carries the date the law was checked.
  if (c.donorAnonymity != null) isoDate(id, "donorLawCheckedOn", c.donorLawCheckedOn, true);
  const offersDonor = c.treatments.some((t) => t === "Donor eggs" || t === "Donor sperm" || t === "Double donor");
  if (offersDonor && c.donorAnonymity == null && !c.donorAnonymityNote)
    errors.push(`${id}: offers donor treatment but has neither donorAnonymity nor a donorAnonymityNote.`);

  if (c.publishedAllInEstimateGbp) {
    const e = c.publishedAllInEstimateGbp;
    if (e.low > e.high) errors.push(`${id}: publishedAllInEstimateGbp low is above high.`);
    if (c.pricePerCycleGbp != null && e.low < c.pricePerCycleGbp)
      errors.push(`${id}: the clinic's typical total (£${e.low}) is below its headline price (£${c.pricePerCycleGbp}).`);
    if (!e.sourceUrl.startsWith("https://")) errors.push(`${id}: publishedAllInEstimateGbp.sourceUrl is not an https link.`);
  }

  const offersIui = c.treatments.includes("IUI");
  if (offersIui && c.iuiPricePerCycleGbp == null)
    errors.push(`${id}: offers IUI but has no iuiPricePerCycleGbp, the budget filter cannot price it.`);
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
if (earliestCheckedOn && DATA_PROVENANCE.pricesVerifiedOn > earliestCheckedOn)
  errors.push(
    `DATA_PROVENANCE.pricesVerifiedOn (${DATA_PROVENANCE.pricesVerifiedOn}) is later than the earliest ` +
      `per-clinic checkedOn (${earliestCheckedOn}). Set it to the earliest date, not today.`
  );

// ── Guide sources and freshness ──
//
// Every guide carries the sources it rests on and the date it was last read
// against them. The date is stored in its display form ("13 September 2026")
// so the page can print it as written; it is parsed here rather than kept
// twice.
const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

/** "13 September 2026" -> "2026-09-13", or undefined when it does not parse. */
function displayDateToIso(display: string): string | undefined {
  const m = /^(\d{1,2}) ([A-Za-z]+) (\d{4})$/.exec(display.trim());
  if (!m) return undefined;
  const month = MONTHS.indexOf(m[2].toLowerCase());
  if (month < 0) return undefined;
  return `${m[3]}-${String(month + 1).padStart(2, "0")}-${m[1].padStart(2, "0")}`;
}

for (const g of GUIDES) {
  const id = `guides.ts (${g.slug})`;
  if (!g.sources || g.sources.length === 0) errors.push(`${id}: needs at least one source.`);
  for (const s of g.sources ?? []) {
    if (!s.label || !s.href) errors.push(`${id}: a source is missing its label or href.`);
    if (!/^https:\/\//.test(s.href)) errors.push(`${id}: source "${s.label}" is not an https link.`);
  }
  const iso = displayDateToIso(g.lastReviewed ?? "");
  if (!iso) {
    errors.push(`${id}: lastReviewed "${g.lastReviewed}" is not in the form "13 September 2026".`);
    continue;
  }
  checkFreshness(
    `${id} lastReviewed`,
    iso,
    "Re-open every source listed on the guide, correct anything that has changed, then update lastReviewed."
  );
}

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
// The travel estimates shown beside overseas headline prices depend on every
// overseas clinic city having a travel entry: a missing entry silently drops
// the estimate for that clinic.
const travelCities = new Set(DESTINATIONS.map((d) => d.city));
const overseasCities = new Set(
  CLINICS.filter((c) => c.region !== "UK").map((c) => c.city)
);
for (const city of overseasCities) {
  if (!travelCities.has(city))
    errors.push(
      `Overseas clinic city "${city}" has no travel entry in src/lib/travel.ts; ` +
        `no travel estimate can be shown beside its headline price.`
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
        `src/lib/clinic-exclusions.ts, remove the clinic from src/lib/clinics.ts, or ` +
        `retire the exclusion there if the reason no longer holds.`
    );
}

for (const x of CLINIC_EXCLUSIONS) {
  const id = x.name || "<unnamed exclusion>";
  if (x.names.length === 0 || x.countries.length === 0)
    errors.push(`${id}: an exclusion needs at least one name and one country to match on.`);
  if (!x.names.some((n) => n.toLowerCase().includes(x.name.split(" ")[0].toLowerCase())))
    warnings.push(`${id}: none of its match names look like its display name, check for a typo.`);
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
    warnings.push(`${id}: passed its review date (${x.reviewOn}), re-check it against its sources.`);
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
          `"${match[1]}", describe medication by category and cost range instead ` +
          `(Human Medicines Regulations 2012, regs 280/284).`
      );
  });
}

// ── Gazetteer ──
//
// The finder's location search resolves against src/lib/geo.ts. Every UK
// postcode area must resolve somewhere (a postcode that returns nothing looks
// like a broken search), no two places may claim the same area, and every
// entry must be somewhere plausible for its country.
const UK_POSTCODE_AREAS = [
  "AB","AL","B","BA","BB","BD","BH","BL","BN","BR","BS","BT","CA","CB","CF","CH","CM","CO","CR","CT",
  "CV","CW","DA","DD","DE","DG","DH","DL","DN","DT","DY","E","EC","EH","EN","EX","FK","FY","G","GL",
  "GU","GY","HA","HD","HG","HP","HR","HS","HU","HX","IG","IM","IP","IV","JE","KA","KT","KW","KY","L",
  "LA","LD","LE","LL","LN","LS","LU","M","ME","MK","ML","N","NE","NG","NN","NP","NR","NW","OL","OX",
  "PA","PE","PH","PL","PO","PR","RG","RH","RM","S","SA","SE","SG","SK","SL","SM","SN","SO","SP","SR",
  "SS","ST","SW","SY","TA","TD","TF","TN","TQ","TR","TS","TW","UB","W","WA","WC","WD","WF","WN","WR",
  "WS","WV","YO","ZE",
];
const areaOwners = new Map<string, string>();
const placeKeys = new Set<string>();
for (const place of PLACES) {
  const key = `${place.name}, ${place.country}`;
  if (placeKeys.has(key)) errors.push(`geo.ts: duplicate place "${key}".`);
  placeKeys.add(key);
  if (Math.abs(place.lat) > 90 || Math.abs(place.lng) > 180)
    errors.push(`geo.ts: "${key}" has coordinates ${place.lat}, ${place.lng}, which are not on the earth.`);
  if (place.country === "United Kingdom" && (place.lat < 49 || place.lat > 61 || place.lng < -9 || place.lng > 2.5))
    errors.push(`geo.ts: "${key}" is outside the UK.`);
  for (const area of place.postcodeAreas ?? []) {
    if (!UK_POSTCODE_AREAS.includes(area))
      errors.push(`geo.ts: "${key}" claims postcode area "${area}", which is not a UK postcode area.`);
    const owner = areaOwners.get(area);
    if (owner) errors.push(`geo.ts: postcode area "${area}" is claimed by both "${owner}" and "${key}".`);
    areaOwners.set(area, key);
  }
}
for (const area of UK_POSTCODE_AREAS) {
  if (!areaOwners.has(area)) errors.push(`geo.ts: no place resolves UK postcode area "${area}".`);
}
// A few searches that must keep working.
if (postcodeArea("CB23 2TN") !== "CB" || searchPlaces("CB23 2TN")[0]?.name !== "Cambridge")
  errors.push('geo.ts: "CB23 2TN" should resolve to Cambridge.');
if (searchPlaces("Bath")[0]?.name !== "Bath")
  errors.push('geo.ts: "Bath" should find the city, not the BA postcode area.');
if (searchPlaces("manch")[0]?.name !== "Manchester")
  errors.push('geo.ts: "manch" should suggest Manchester first.');

// ── US coverage rules (src/lib/us-coverage.ts) ──
// Each rule must cite at least one https source and carry valid checkedOn and
// reviewBy dates. Passing reviewBy is an error: a coverage rule that nobody
// has looked at since its review date must not keep answering visitors.
const provenanceRecords = allProvenance();
let unreviewed = 0;
for (const { id, provenance } of provenanceRecords) {
  if (provenance.sources.length === 0) errors.push(`us-coverage.ts: ${id} cites no sources.`);
  for (const src of provenance.sources) {
    if (!src.url.startsWith("https://")) errors.push(`us-coverage.ts: ${id} source "${src.label}" is not an https URL.`);
    if (!src.label.trim()) errors.push(`us-coverage.ts: ${id} has a source with no label.`);
  }
  const checked = new Date(`${provenance.checkedOn}T00:00:00Z`);
  const reviewBy = new Date(`${provenance.reviewBy}T00:00:00Z`);
  if (Number.isNaN(checked.getTime())) errors.push(`us-coverage.ts: ${id}.checkedOn is not a valid ISO date.`);
  else if (checked.getTime() > Date.now()) errors.push(`us-coverage.ts: ${id}.checkedOn is in the future.`);
  if (Number.isNaN(reviewBy.getTime())) {
    errors.push(`us-coverage.ts: ${id}.reviewBy is not a valid ISO date.`);
  } else {
    const daysLeft = Math.floor((reviewBy.getTime() - Date.now()) / 86_400_000);
    if (daysLeft < 0)
      errors.push(`us-coverage.ts: ${id} was due for review on ${provenance.reviewBy}. Re-check it against its sources, then move reviewBy on.`);
    else if (daysLeft <= 30) warnings.push(`us-coverage.ts: ${id} is due for review in ${daysLeft} day(s) (${provenance.reviewBy}).`);
  }
  if (!provenance.usReviewed) unreviewed++;
}
if (unreviewed > 0)
  warnings.push(
    `us-coverage.ts: ${unreviewed} of ${provenanceRecords.length} coverage rules await review by a US insurance expert. ` +
      "The checker shows a draft notice until every rule has usReviewed: true.",
  );

// A few answers whose outcome must not drift.
const expectVerdict = (label: string, answers: Partial<CoverageAnswers>, verdict: Verdict) => {
  const got = assessCoverage({ ...EMPTY_ANSWERS, ...answers }).verdict;
  if (got !== verdict) errors.push(`us-coverage.ts: ${label} should give "${verdict}", got "${got}".`);
};
for (const code of Object.keys(STATE_RULES) as (keyof typeof STATE_RULES)[]) {
  expectVerdict(`${code} fully insured, 101+ staff`, { source: "employer", funding: "fully-insured", state: code, size: "large" }, "required");
  expectVerdict(`${code} fully insured, 100 or fewer staff`, { source: "employer", funding: "fully-insured", state: code, size: "small" }, "plan-decides");
}
expectVerdict("self-funded employer plan", { source: "employer", funding: "self-funded" }, "plan-decides");
expectVerdict("fully insured plan in an unchecked state", { source: "employer", funding: "fully-insured", state: "other" }, "not-checked");
expectVerdict("Medicaid", { source: "medicaid" }, "unlikely");
if (stepsFor({ ...EMPTY_ANSWERS, source: "employer", funding: "self-funded" }).includes("state"))
  errors.push("us-coverage.ts: a self-funded plan must not be asked for its state; state law doesn't apply to it.");

// ── Report ──
for (const w of warnings) console.warn(`WARN  ${w}`);
for (const e of errors) console.error(`ERROR ${e}`);
console.log(
  `\nChecked ${CLINICS.length} listed clinics (${CLINIC_EXCLUSIONS.length} exclusion(s) in force), ` +
    `${GUIDES.length} guides, ${FAMILY_TYPES.length} family types, ${ALL_STORIES.length} stories, ` +
    `and ${NEWS_ITEMS.length} media items: ${errors.length} error(s), ${warnings.length} warning(s). ` +
    `Prices last verified ${DATA_PROVENANCE.pricesVerifiedOn}.`
);
process.exit(errors.length > 0 ? 1 : 0);
