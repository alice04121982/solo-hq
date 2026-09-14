"use client";

import { useState, useMemo, type ReactNode } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getFamilyType, type FamilyTypeSlug } from "@/lib/family-types";
import { CLINICS, DATA_PROVENANCE, formatCheckedDate, rateFor } from "@/lib/clinics";
import { eligibilityFor, type CountryEligibility } from "@/lib/country-eligibility";
import {
  travelEstimateForCity,
  googleFlightsUrl,
  staySearchUrl,
  formatRangeGbp,
  TRAVEL_ASSUMPTIONS,
  TRAVEL_ESTIMATE_SCOPE,
  type TravelEstimate,
} from "@/lib/travel";
import type { AgeBracket, Clinic } from "@/types/clinic";
import { RegulatorNotice } from "@/components/regulator-notice";
import { CountryFlag } from "@/components/country-flag";
import { FigureLabel, RateFigure, VerificationBadge } from "@/components/ivf-finder/rate-display";
import { clinicCardClasses } from "@/lib/card-style";
import { ShapeMark, FAMILY_SHAPES, type ShapeName } from "@/components/shapes";
import {
  ArrowRight,
  ArrowLeft,
  MapPin,
  Globe,
  Check,
  Venus,
  Mars,
  VenusAndMars,
  Plane,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Labels ───────────────────────────────────────────────────────────────────
//
// Shared wording, kept identical to src/lib/rate-labels.ts. Inlined here so
// this file does not depend on that module landing first.

const BADGE_HFEA = "From the HFEA register";
const RATE_NOTE = "These are averages across many patients, not a prediction for you.";
const RATE_CAVEAT =
  "These are averages across many patients, not a prediction for you. The HFEA advises using success rates as a rough guide: a difference of one or two percentage points is usually down to chance, and differences between clinics usually reflect the patients they treat.";
const DONOR_SPERM_NOTE =
  "You will need donor sperm: roughly £1,000–£1,800 a vial at UK-facing banks, plus VAT on imports, a family-slot or reservation fee and shipping (bank price lists, September 2026).";
const DONOR_EGG_NOTE = "Donor eggs are charged on top of the headline price. Ask the clinic for a written costed plan.";
const SURROGACY_NOTE =
  "A surrogate is matched separately through a UK surrogacy organisation; the clinics below handle the IVF element. Ask the clinic for a written costed plan.";
const DONOR_EGG_RATE_NOTE =
  "With donor eggs, the donor's age matters more than yours. UK birth rates with donor eggs are above 30% per embryo transferred at every recipient age (HFEA, 2019 data).";
const IUI_RATE_LINE = "HFEA: around a third of IVF's rate";

// ─── Types ────────────────────────────────────────────────────────────────────

type FamilyType = "solo-mum" | "solo-dad" | "female-couple" | "male-couple" | "straight-couple";
type TravelWillingness = "uk-only" | "europe" | "anywhere";
type BudgetRange = "under5k" | "5to10k" | "10to15k" | "over15k";
type SortKey = "name" | "price" | "rate";

interface WizardState {
  family: FamilyType | null;
  age: AgeBracket | null;
  /** Optional answer on the age step; surrogacy paths always need donor eggs. */
  donorEggs: boolean;
  travel: TravelWillingness | null;
  budget: BudgetRange | null;
}

/** Fields Package A is adding to Clinic. Read through `?.` until they exist. */
type ClinicExtras = {
  publishedAllInEstimateGbp?: { low: number; high: number; sourceUrl?: string };
  priceIncludes?: string;
  checkedOn?: string;
};

function extras(clinic: Clinic): ClinicExtras {
  return clinic as Clinic & ClinicExtras;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isSurrogacyPath(family: FamilyType | null): boolean {
  return family === "solo-dad" || family === "male-couple";
}

// The wizard's family answers and the guide pages in src/lib/family-types.ts
// name the same five pathways under different ids; this bridges the two so
// results can link to the guide for the family type the user stated.
const FAMILY_GUIDE_SLUG: Record<FamilyType, FamilyTypeSlug> = {
  "solo-mum": "solo-mum",
  "female-couple": "same-sex-female",
  "male-couple": "same-sex-male",
  "solo-dad": "single-dad",
  "straight-couple": "heterosexual-couple",
};

const FAMILY_PLURAL: Record<FamilyType, string> = {
  "solo-mum": "solo mums",
  "female-couple": "two mums",
  "male-couple": "two dads",
  "solo-dad": "solo dads",
  "straight-couple": "a mum and dad",
};

/** Which country-eligibility field decides whether a family type can be treated. */
const ELIGIBILITY_FIELD: Record<FamilyType, keyof CountryEligibility> = {
  "solo-mum": "singleWomen",
  "female-couple": "femaleCouples",
  "solo-dad": "surrogacyForMaleIntendedParents",
  "male-couple": "surrogacyForMaleIntendedParents",
  "straight-couple": "differentSexCouples",
};

/** True only when the country's law is confirmed to allow this family type. */
function countryAllows(country: string, family: FamilyType): boolean {
  return eligibilityFor(country)?.[ELIGIBILITY_FIELD[family]] === true;
}

function joinList(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function budgetMax(b: BudgetRange): number {
  return { under5k: 5000, "5to10k": 10000, "10to15k": 15000, over15k: Infinity }[b];
}

function travelAllows(travel: TravelWillingness, clinic: Clinic): boolean {
  if (travel === "uk-only") return clinic.region === "UK";
  if (travel === "europe") return clinic.region === "UK" || clinic.region === "Europe";
  return true;
}

type DonorNeed = { sperm: boolean; egg: boolean };

function getDonorNeed(family: FamilyType, donorEggs: boolean): DonorNeed {
  if (isSurrogacyPath(family)) return { sperm: false, egg: true };
  const sperm = family === "solo-mum" || family === "female-couple";
  return { sperm, egg: donorEggs };
}

function formatGbp(n: number): string {
  return `£${n.toLocaleString("en-GB")}`;
}

// ─── Matching logic ───────────────────────────────────────────────────────────

interface Match {
  clinic: Clinic;
  /** What the match is priced on: IVF by default, IUI when only IUI fits. */
  treatment: "ivf" | "iui";
  headlineGBP: number;
  /** Headline plus the mid travel estimate abroad; what the budget compares. */
  comparableGBP: number;
  travel: TravelEstimate | null;
  /** The clinic's published rate for the chosen age group, own eggs. */
  rate: number | undefined;
}

/**
 * Hard filters in order: travel range, country law for the family type,
 * donor treatments offered, budget. Nothing here scores or ranks; ordering
 * is the user's choice on the results step.
 */
function matchClinic(clinic: Clinic, s: WizardState): Match | null {
  if (!s.family || !s.travel || !s.budget) return null;
  const surrogacy = isSurrogacyPath(s.family);
  if (!surrogacy && !s.age) return null;

  if (!travelAllows(s.travel, clinic)) return null;
  if (!countryAllows(clinic.country, s.family)) return null;

  const need = getDonorNeed(s.family, s.donorEggs);
  if (need.sperm && !clinic.treatments.includes("Donor sperm")) return null;
  if (need.egg && !clinic.treatments.includes("Donor eggs")) return null;

  const travel = clinic.region === "UK" ? null : travelEstimateForCity(clinic.city);
  const travelMid = travel?.mid ?? 0;
  const max = budgetMax(s.budget);

  if (clinic.pricePerCycleGbp != null && clinic.pricePerCycleGbp + travelMid <= max) {
    return {
      clinic,
      treatment: "ivf",
      headlineGBP: clinic.pricePerCycleGbp,
      comparableGBP: clinic.pricePerCycleGbp + travelMid,
      travel,
      rate: s.age ? rateFor(clinic, s.age) : undefined,
    };
  }

  // IUI fallback: own eggs, UK clinic (cycle-timing visits make travel
  // impractical), IUI offered and priced. This is what lets "Under £5,000"
  // return UK IUI options instead of nothing.
  const iuiSuitable =
    !surrogacy &&
    !need.egg &&
    clinic.region === "UK" &&
    clinic.treatments.includes("IUI") &&
    clinic.iuiPricePerCycleGbp != null;
  if (!iuiSuitable || clinic.iuiPricePerCycleGbp! > max) return null;

  return {
    clinic,
    treatment: "iui",
    headlineGBP: clinic.iuiPricePerCycleGbp!,
    comparableGBP: clinic.iuiPricePerCycleGbp!,
    travel: null,
    rate: undefined,
  };
}

/** Countries whose clinics passed the travel filter but whose law excludes this family type. */
/**
 * Countries in range whose clinics are left out for this family type, split by
 * why: `barred` where the law is confirmed to exclude them, `unconfirmed` where
 * we could not confirm it either way. The results page words the two differently.
 */
function excludedCountries(s: WizardState): { barred: string[]; unconfirmed: string[] } {
  if (!s.family || !s.travel) return { barred: [], unconfirmed: [] };
  const field = ELIGIBILITY_FIELD[s.family];
  const travel = s.travel;
  const barred = new Set<string>();
  const unconfirmed = new Set<string>();
  for (const c of CLINICS) {
    if (!travelAllows(travel, c)) continue;
    const value = eligibilityFor(c.country)?.[field];
    if (value === true) continue;
    (value === false ? barred : unconfirmed).add(c.country);
  }
  return { barred: [...barred].sort(), unconfirmed: [...unconfirmed].sort() };
}

function byName(a: Match, b: Match): number {
  return a.clinic.name.localeCompare(b.clinic.name);
}

function byPrice(a: Match, b: Match): number {
  return a.comparableGBP - b.comparableGBP || byName(a, b);
}

/** Rate descending, unpublished last, name as the tiebreak. */
function byRate(a: Match, b: Match): number {
  if (a.rate == null && b.rate == null) return byName(a, b);
  if (a.rate == null) return 1;
  if (b.rate == null) return -1;
  return b.rate - a.rate || byName(a, b);
}

/**
 * Sorted groups for display. Name and price give one group. Rate gives two,
 * HFEA figures first and clinics' own figures second, because the measures
 * differ and a single ordered list would imply they compare.
 */
function groupMatches(matches: Match[], sort: SortKey): { heading: string | null; items: Match[] }[] {
  if (sort === "name") return [{ heading: null, items: [...matches].sort(byName) }];
  if (sort === "price") return [{ heading: null, items: [...matches].sort(byPrice) }];
  const hfea = matches.filter((m) => m.clinic.successRates.verification === "hfea").sort(byRate);
  const own = matches.filter((m) => m.clinic.successRates.verification !== "hfea").sort(byRate);
  return [
    { heading: BADGE_HFEA, items: hfea },
    { heading: "Clinic's own figures (measures differ)", items: own },
  ].filter((g) => g.items.length > 0);
}

// ─── Shared UI ────────────────────────────────────────────────────────────────

// Icons sit in a fixed-width slot so every option's text starts on the same
// left edge, whether its glyph is a single symbol or a pair.
function OptionCard({
  selected, onClick, title, subtitle, icon,
}: {
  selected: boolean; onClick: () => void; title: string; subtitle?: string; icon?: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-150 ${
        selected ? "border-teal bg-teal/5" : "border-border hover:border-teal/40"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {icon && (
            <span
              className={`shrink-0 mt-0.5 flex w-6 justify-center transition-colors ${
                selected ? "text-foreground" : "text-muted"
              }`}
            >
              {icon}
            </span>
          )}
          <div>
            <p className={`text-sm font-sans font-medium leading-snug ${selected ? "text-foreground" : "text-foreground/80"}`}>
              {title}
            </p>
            {subtitle && (
              <p className="text-xs font-sans text-muted mt-1 leading-relaxed">{subtitle}</p>
            )}
          </div>
        </div>
        <div className={`shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors mt-0.5 ${
          selected ? "border-teal bg-teal" : "border-border"
        }`}>
          {selected && <Check className="h-3 w-3 text-background" strokeWidth={3} />}
        </div>
      </div>
    </button>
  );
}

// ─── Steps ────────────────────────────────────────────────────────────────────

// One glyph per parent, so the icon carries the same information as the label.
// Paired glyphs are a size down and overlapped to keep the pair's footprint
// close to a single symbol's.
function ParentPair({ symbol }: { symbol: "venus" | "mars" }) {
  const Symbol = symbol === "venus" ? Venus : Mars;
  return (
    <span className="flex items-center">
      <Symbol className="h-4 w-4" strokeWidth={1.75} />
      <Symbol className="h-4 w-4 -ml-1" strokeWidth={1.75} />
    </span>
  );
}

function StepFamily({ s, set }: { s: WizardState; set: (f: FamilyType) => void }) {
  const options: { value: FamilyType; title: string; subtitle: string; icon: ReactNode }[] = [
    {
      value: "solo-mum",
      title: "Solo mum",
      subtitle: "Single woman using donor sperm",
      icon: <Venus className="h-5 w-5" strokeWidth={1.75} />,
    },
    {
      value: "female-couple",
      title: "Two mums",
      subtitle: "Female couple using donor sperm",
      icon: <ParentPair symbol="venus" />,
    },
    {
      value: "male-couple",
      title: "Two dads",
      subtitle: "Male couple using donor eggs and a surrogate",
      icon: <ParentPair symbol="mars" />,
    },
    {
      value: "straight-couple",
      title: "Mum and dad",
      subtitle: "Couple of a woman and a man: IVF, ICSI or donor options",
      icon: <VenusAndMars className="h-5 w-5" strokeWidth={1.75} />,
    },
    {
      value: "solo-dad",
      title: "Solo dad",
      subtitle: "Single man using donor eggs and a surrogate",
      icon: <Mars className="h-5 w-5" strokeWidth={1.75} />,
    },
  ];
  return (
    <div className="space-y-3">
      {options.map((o) => (
        <OptionCard key={o.value} selected={s.family === o.value} onClick={() => set(o.value)}
          title={o.title} subtitle={o.subtitle} icon={o.icon} />
      ))}
    </div>
  );
}

const LOWER_AGE_SUBTITLE =
  "Chances per cycle are lower than at younger ages. A clinic can talk through what this means for you.";

function StepAge({
  s, setAge, setDonorEggs,
}: {
  s: WizardState; setAge: (a: AgeBracket) => void; setDonorEggs: (v: boolean) => void;
}) {
  const options: { value: AgeBracket; title: string; subtitle?: string }[] = [
    { value: "under35", title: "Under 35" },
    { value: "age35to37", title: "35–37" },
    { value: "age38to39", title: "38–39", subtitle: LOWER_AGE_SUBTITLE },
    { value: "age40to42", title: "40–42", subtitle: LOWER_AGE_SUBTITLE },
    { value: "age43to44", title: "43–44", subtitle: LOWER_AGE_SUBTITLE },
    { value: "age45plus", title: "45 and over", subtitle: "Few clinics publish figures for this group." },
  ];
  return (
    <div>
      <div className="space-y-3">
        {options.map((o) => (
          <OptionCard key={o.value} selected={s.age === o.value} onClick={() => setAge(o.value)}
            title={o.title} subtitle={o.subtitle} />
        ))}
      </div>
      <p className="text-xs font-sans text-muted mt-4 leading-relaxed">{RATE_NOTE}</p>
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-sm font-sans font-medium text-foreground mb-1">Might you need donor eggs?</p>
        <p className="text-xs font-sans text-muted mb-3 leading-relaxed">
          Optional. If yes, only clinics that offer donor eggs are shown.
        </p>
        <div className="flex gap-2">
          {[
            { value: true, label: "Yes, possibly" },
            { value: false, label: "No, or not sure" },
          ].map((o) => (
            <button
              key={String(o.value)}
              onClick={() => setDonorEggs(o.value)}
              className={`rounded-full px-4 py-2 text-sm font-sans transition-all duration-150 ${
                s.donorEggs === o.value
                  ? "bg-teal text-on-teal"
                  : "bg-background text-muted hover:bg-surface-hover hover:text-teal"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepTravel({ s, set }: { s: WizardState; set: (t: TravelWillingness) => void }) {
  // Pin/globe match how UK and overseas clinics are marked on the results screen.
  const options: { value: TravelWillingness; title: string; subtitle: string; icon: ReactNode }[] = [
    {
      value: "uk-only",
      title: "UK clinics only",
      subtitle: "HFEA-licensed clinics, no travel",
      icon: <MapPin className="h-5 w-5" strokeWidth={1.75} />,
    },
    {
      value: "europe",
      title: "Open to Europe",
      subtitle: "Countries whose law allows your treatment are shown",
      icon: <Plane className="h-5 w-5" strokeWidth={1.75} />,
    },
    {
      value: "anywhere",
      title: "Anywhere in the world",
      subtitle: "Europe and further afield; the same law check applies",
      icon: <Globe className="h-5 w-5" strokeWidth={1.75} />,
    },
  ];
  return (
    <div className="space-y-3">
      <p className="text-sm font-sans text-muted mb-2 leading-relaxed">
        Clinics abroad can look cheaper until you add flights and stays over{" "}
        {TRAVEL_ASSUMPTIONS.tripsPerCycle.low}–{TRAVEL_ASSUMPTIONS.tripsPerCycle.high} trips. Each result abroad shows a travel estimate for its destination.
      </p>
      {options.map((o) => (
        <OptionCard key={o.value} selected={s.travel === o.value} onClick={() => set(o.value)}
          title={o.title} subtitle={o.subtitle} icon={o.icon} />
      ))}
    </div>
  );
}

function StepBudget({ s, set, isSurrogacy }: { s: WizardState; set: (b: BudgetRange) => void; isSurrogacy: boolean }) {
  const options: { value: BudgetRange; title: string; subtitle: string }[] = [
    { value: "under5k", title: "Under £5,000", subtitle: "Usually IUI at a UK clinic" },
    { value: "5to10k", title: "£5,000 – £10,000", subtitle: "IVF headline prices at UK and most European clinics" },
    { value: "10to15k", title: "£10,000 – £15,000", subtitle: "Headline price plus travel estimate for most clinics abroad" },
    { value: "over15k", title: "Over £15,000", subtitle: "No ceiling" },
  ];

  return (
    <div className="space-y-3">
      <p className="text-sm font-sans text-muted mb-2 leading-relaxed">
        Compare this with clinic headline prices. Drugs, ICSI, donor sperm or eggs and storage are usually charged on top.
        {isSurrogacy && " The surrogate's expenses and legal fees are separate from clinic fees."}
      </p>
      {options.map((o) => (
        <OptionCard key={o.value} selected={s.budget === o.value} onClick={() => set(o.value)}
          title={o.title} subtitle={o.subtitle} />
      ))}
    </div>
  );
}

/**
 * The rate side of a match's figures row. Own-egg IVF shows the finder's
 * RateFigure for the chosen age group, so both tools quote a clinic the same
 * way; IUI and surrogacy paths have no comparable per-age figure and say so.
 */
function MatchFigure({ m, surrogacy, age }: { m: Match; surrogacy: boolean; age: AgeBracket | null }) {
  const ink = { color: "var(--card-ink)" };
  const inkMuted = { color: "var(--card-ink-muted)" };

  if (m.treatment === "iui") {
    return (
      <div>
        <FigureLabel>Success rate</FigureLabel>
        <p className="text-lg font-sans font-bold leading-tight" style={ink}>IUI</p>
        <p className="text-xs font-sans mt-0.5" style={inkMuted}>{IUI_RATE_LINE}</p>
      </div>
    );
  }
  if (surrogacy || !age) {
    return (
      <div>
        <FigureLabel>Success rate</FigureLabel>
        <p className="text-lg font-sans font-bold leading-tight" style={ink}>Donor eggs</p>
        <p className="text-xs font-sans mt-0.5 leading-relaxed" style={inkMuted}>{DONOR_EGG_RATE_NOTE}</p>
      </div>
    );
  }
  return (
    <div>
      <FigureLabel>Your age group</FigureLabel>
      <RateFigure clinic={m.clinic} bracket={age} />
    </div>
  );
}

/**
 * A matched clinic. The same card as the finder's results (`.clinic-card`:
 * fill for the edge, no stroke, every child tinted from one rule), on the
 * teal variant: the dark-green fill is the resting state and there is no
 * hover, because the card is the answer and the way in is its button.
 *
 * The card carries one accent, the verification badge; everything else is
 * the on-teal ink, in three tiers: the clinic, the two figures, the notes.
 */
function ResultCard({
  m, surrogacy, age, index,
}: {
  m: Match; surrogacy: boolean; age: AgeBracket | null; index: number;
}) {
  const c = m.clinic;
  const x = extras(c);
  const ink = { color: "var(--card-ink)" };
  const inkMuted = { color: "var(--card-ink-muted)" };
  const trips = `${TRAVEL_ASSUMPTIONS.tripsPerCycle.low}–${TRAVEL_ASSUMPTIONS.tripsPerCycle.high} trips`;

  const notes: string[] = [];
  if (x.priceIncludes) notes.push(`Headline price includes ${x.priceIncludes.replace(/\.\s*$/, "")}.`);
  if (x.publishedAllInEstimateGbp && m.treatment === "ivf") {
    notes.push(
      `Clinic's own estimate of a typical total: ${formatGbp(x.publishedAllInEstimateGbp.low)}–${formatGbp(x.publishedAllInEstimateGbp.high)}.`
    );
  }
  if (m.travel) {
    notes.push(TRAVEL_ESTIMATE_SCOPE);
    if (m.travel.destination.note) notes.push(m.travel.destination.note);
  }
  if (x.checkedOn) notes.push(`Checked ${formatCheckedDate(x.checkedOn)}.`);

  return (
    <motion.div
      key={c.slug}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35, ease: EASE }}
      className={clinicCardClasses("teal", false)}
    >
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <VerificationBadge verification={c.successRates.verification} />
      </div>

      <h3 className="text-lg font-sans font-bold leading-tight" style={ink}>
        {c.name}
      </h3>
      <p className="flex items-center gap-1.5 mt-1.5 text-xs font-sans" style={inkMuted}>
        <CountryFlag country={c.country} />
        <span className="min-w-0">
          {c.city}, {c.country}
          {c.hfeaLicensed && " · HFEA licensed"}
        </span>
      </p>

      {/* Two labelled figures: stacked on a phone, side by side from md. In
          the row the rate takes the room and the price column is capped, so
          a travel line wraps under the price instead of squeezing the rate. */}
      <div className="flex flex-col gap-5 mt-6 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 md:flex-1">
          <MatchFigure m={m} surrogacy={surrogacy} age={age} />
        </div>
        <div className="md:shrink-0 md:max-w-[11rem] md:text-right">
          <FigureLabel>Headline price</FigureLabel>
          <p className="text-2xl font-sans font-bold leading-tight" style={ink}>
            {formatGbp(m.headlineGBP)}
          </p>
          <p className="text-xs font-sans mt-0.5" style={inkMuted}>
            {m.treatment === "iui" ? "per IUI cycle" : "per IVF cycle, own eggs"}
          </p>
          {m.travel && (
            <p className="text-xs font-sans mt-0.5 leading-snug" style={inkMuted}>
              + {formatRangeGbp(m.travel)} travel (estimate, {trips})
            </p>
          )}
        </div>
      </div>

      {notes.length > 0 && (
        <div
          className="mt-5 pt-4 space-y-1.5 text-xs font-sans leading-relaxed"
          style={{ ...inkMuted, borderTop: "1px solid var(--card-rule)" }}
        >
          {notes.map((n) => <p key={n}>{n}</p>)}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-6 pt-1">
        <Link
          href={`/ivf-finder/${c.slug}`}
          className="clinic-card__control inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-xs font-semibold"
        >
          Full details and sources <ArrowRight className="h-3 w-3" aria-hidden />
        </Link>
        {m.travel && (
          <>
            <a
              href={googleFlightsUrl(m.travel.destination)}
              target="_blank"
              rel="noopener noreferrer"
              className="clinic-card__link text-xs font-sans font-medium underline underline-offset-4 transition-colors"
            >
              Check flights
            </a>
            <a
              href={staySearchUrl(m.travel.destination)}
              target="_blank"
              rel="noopener noreferrer"
              className="clinic-card__link text-xs font-sans font-medium underline underline-offset-4 transition-colors"
            >
              Places to stay
            </a>
          </>
        )}
      </div>
    </motion.div>
  );
}

function StepResults({ s, onReset }: { s: WizardState; onReset: () => void }) {
  const [sort, setSort] = useState<SortKey>("name");

  const matches = useMemo(
    () => CLINICS.map((c) => matchClinic(c, s)).filter((m): m is Match => m !== null),
    [s]
  );
  const excluded = useMemo(() => excludedCountries(s), [s]);
  const groups = useMemo(() => groupMatches(matches, sort), [matches, sort]);

  const surrogacy = isSurrogacyPath(s.family);
  const need = s.family ? getDonorNeed(s.family, s.donorEggs) : { sperm: false, egg: false };

  const notes: string[] = [];
  if (surrogacy) notes.push(SURROGACY_NOTE);
  else {
    if (need.sperm) notes.push(DONOR_SPERM_NOTE);
    if (need.egg) notes.push(DONOR_EGG_NOTE);
  }

  const exclusionLine = s.family
    ? [
        excluded.barred.length > 0
          ? `Clinics in ${joinList(excluded.barred)} are not shown because the law there does not allow treatment for ${FAMILY_PLURAL[s.family]}.`
          : null,
        excluded.unconfirmed.length > 0
          ? `Clinics in ${joinList(excluded.unconfirmed)} are not shown because we have not confirmed their law allows treatment for ${FAMILY_PLURAL[s.family]}.`
          : null,
      ]
        .filter(Boolean)
        .join(" ") || null
    : null;

  const familyGuide = s.family ? getFamilyType(FAMILY_GUIDE_SLUG[s.family]) : undefined;

  if (matches.length === 0) {
    return (
      <div className="py-6 max-w-2xl mx-auto text-center">
        <p className="text-foreground font-sans font-medium mb-2">No clinic fits these answers</p>
        <p className="text-sm font-sans text-muted mb-3 leading-relaxed">
          Try a wider travel range or a higher budget for clinic fees.
        </p>
        {exclusionLine && (
          <p className="text-sm font-sans text-muted mb-6 leading-relaxed">{exclusionLine}</p>
        )}
        <button onClick={onReset} className="text-sm font-sans text-muted hover:text-foreground underline underline-offset-4 transition-colors">
          Start over
        </button>
      </div>
    );
  }

  let index = 0;

  return (
    <div>
      {notes.length > 0 && (
        <div className="mb-6 p-4 rounded-xl bg-cream max-w-2xl mx-auto space-y-2">
          {notes.map((n) => (
            <p key={n} className="text-xs font-sans text-muted leading-relaxed">{n}</p>
          ))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <p className="text-[13px] font-[500] uppercase tracking-[0.15em] text-muted font-sans">
          {matches.length} clinic{matches.length !== 1 ? "s" : ""} match
        </p>
        <label className="flex items-center gap-2 text-[13px] font-sans text-muted whitespace-nowrap">
          Sort by
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="select-chevron rounded-full border border-border bg-background pl-4 py-1.5 text-[13px] font-sans text-foreground"
          >
            <option value="name">Name, A to Z</option>
            <option value="price">Headline price{s.travel === "uk-only" ? "" : " + travel estimate"}</option>
            {!surrogacy && <option value="rate">Published rate</option>}
          </select>
        </label>
      </div>

      {sort === "rate" && (
        <p className="text-xs font-sans text-muted leading-relaxed max-w-2xl mx-auto mb-4">{RATE_CAVEAT}</p>
      )}

      {/* Matches break out of the wizard column into a grid across the page. */}
      {groups.map((g) => (
        <div key={g.heading ?? "all"} className="mb-8">
          {g.heading && (
            <p className="text-[13px] font-[500] uppercase tracking-[0.15em] text-muted font-sans mb-3">
              {g.heading}
            </p>
          )}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {g.items.map((m) => (
              <ResultCard key={m.clinic.slug} m={m} surrogacy={surrogacy} age={s.age} index={index++} />
            ))}
          </div>
        </div>
      ))}

      {exclusionLine && (
        <p className="text-xs font-sans text-muted text-center mt-2 max-w-2xl mx-auto">{exclusionLine}</p>
      )}

      <p className="text-xs font-sans text-muted text-center mt-6 max-w-2xl mx-auto">
        Prices are headline figures from {DATA_PROVENANCE.pricesSourceLabel}, last checked on{" "}
        {new Date(`${DATA_PROVENANCE.pricesVerifiedOn}T00:00:00Z`).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        })}
        . Travel estimates cover flights and stays for{" "}
        {TRAVEL_ASSUMPTIONS.tripsPerCycle.low}–{TRAVEL_ASSUMPTIONS.tripsPerCycle.high} trips to that destination.
        Each rate shows its source, year and what it measures.
      </p>

      <div className="mt-4 max-w-2xl mx-auto">
        <RegulatorNotice />
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/ivf-finder"
          className="inline-flex items-center gap-2 rounded-full bg-teal text-on-teal px-6 py-3 text-sm font-sans font-medium hover:bg-accent hover:text-foreground transition-colors duration-200"
        >
          See full clinic comparison <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        {familyGuide && (
          <Link
            href={`/families/${familyGuide.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-background text-teal px-6 py-3 text-sm font-sans font-medium hover:bg-teal hover:text-on-teal transition-colors duration-200"
          >
            Read our {familyGuide.label} guide <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
        <button
          onClick={onReset}
          className="text-sm font-sans text-muted hover:text-foreground underline underline-offset-4 transition-colors"
        >
          Start over
        </button>
      </div>
    </div>
  );
}

// ─── Step metadata ────────────────────────────────────────────────────────────

type StepId = "family" | "age" | "travel" | "budget" | "results";

interface StepMeta {
  id: StepId;
  title: string;
  sub: string;
}

// Surrogacy paths skip the age step: the intended father's age does not bear
// on donor-egg outcomes, so there is nothing to ask.
function getSteps(family: FamilyType | null): StepMeta[] {
  const surrogacy = isSurrogacyPath(family);
  return [
    { id: "family", title: "Your family type", sub: "Decides which countries' law allows your treatment" },
    ...(surrogacy
      ? []
      : [{ id: "age" as const, title: "Your age", sub: "Clinics publish rates by age group" }]),
    { id: "travel", title: "How far will you travel?", sub: "Each result abroad shows a travel estimate" },
    { id: "budget", title: "Your budget for clinic fees", sub: "Compared with headline prices" },
    { id: "results", title: "Your matched clinics", sub: "In alphabetical order unless you change the sort" },
  ];
}

// ─── Backdrop shape ───────────────────────────────────────────────────────────

// The band's oversized mark, in the style of Section's `backdrop` but driven
// by wizard state: nothing until a family is chosen, then that family's own
// mark from the shape bank. The family step itself carries no mark, because
// any one shape there is one family's shape shown to everyone (the egg once
// stood in, and read as the old Two Dads mark). It turns a notch on every
// step and crossfades when the mark itself changes, so the journey visibly
// moves with the user. Positional classes stay on the wrapper: framer-motion
// owns `transform`, so rotate/scale live on the inner element where they
// can't clobber the offsets.
function WizardBackdrop({ shape, step }: { shape: ShapeName | null; step: number }) {
  return (
    <div
      aria-hidden
      className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-[45%] w-[20rem] md:w-[32rem] lg:w-[40rem] pointer-events-none"
      style={{ color: "var(--lime)" }}
    >
      <AnimatePresence mode="wait">
        {shape && (
          <motion.div
            key={shape}
            initial={{ opacity: 0, scale: 0.8, rotate: step * 24 }}
            animate={{ opacity: 1, scale: 1, rotate: step * 24 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <ShapeMark name={shape} className="w-full h-auto" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main wizard ──────────────────────────────────────────────────────────────

const INITIAL_STATE: WizardState = {
  family: null,
  age: null,
  donorEggs: false,
  travel: null,
  budget: null,
};

export function ClinicMatcher() {
  const [step, setStep] = useState(0);
  const [s, setS] = useState<WizardState>(INITIAL_STATE);

  const surrogacy = isSurrogacyPath(s.family);
  const STEPS = getSteps(s.family);
  const current = STEPS[step];
  const isResults = current.id === "results";

  // No mark until step one is answered, then the chosen family's own.
  const backdropShape: ShapeName | null = s.family
    ? FAMILY_SHAPES[FAMILY_GUIDE_SLUG[s.family]]
    : null;

  const canAdvance: Record<StepId, boolean> = {
    family: s.family !== null,
    age: s.age !== null,
    travel: s.travel !== null,
    budget: s.budget !== null,
    results: false,
  };

  const reset = () => {
    setStep(0);
    setS(INITIAL_STATE);
  };

  // A new family type resets the age answers, which only apply off the
  // surrogacy path.
  const setFamily = (f: FamilyType) => {
    setS((p) => ({ ...p, family: f, age: null, donorEggs: false }));
  };

  const stepContent: Record<StepId, ReactNode> = {
    family: <StepFamily key="family" s={s} set={setFamily} />,
    age: (
      <StepAge
        key="age"
        s={s}
        setAge={(a) => setS((p) => ({ ...p, age: a }))}
        setDonorEggs={(v) => setS((p) => ({ ...p, donorEggs: v }))}
      />
    ),
    travel: <StepTravel key="travel" s={s} set={(t) => setS((p) => ({ ...p, travel: t }))} />,
    budget: <StepBudget key="budget" s={s} set={(b) => setS((p) => ({ ...p, budget: b }))} isSurrogacy={surrogacy} />,
    results: <StepResults key="results" s={s} onReset={reset} />,
  };

  return (
    // The wizard runs as a centred, full-page journey: question steps live in
    // a centred column, and only the results step widens to the full container
    // so the matched clinics can lay out as a grid across the page. The band's
    // backdrop shape renders first so the relative content wrapper paints over
    // it; the section that hosts the wizard crops its bleed (overflow-hidden).
    <div className="w-full">
      <WizardBackdrop shape={backdropShape} step={step} />
      <div className="relative">
      {/* Progress: one segment per question. The results screen is the last
          entry in STEPS but is not a step the user answers, so it is excluded
          here to match the "of N" count below. */}
      <div className="mb-8 max-w-2xl mx-auto">
        <div className="flex gap-1 mb-4">
          {STEPS.slice(0, -1).map((_, i) => (
            <div
              key={i}
              className="flex-1 h-0.5 rounded-full transition-colors duration-300"
              style={{ background: i <= step ? "var(--foreground)" : "var(--border)" }}
            />
          ))}
        </div>
        {!isResults && (
          <p className="text-[13px] font-[500] uppercase tracking-[0.15em] text-muted font-sans text-center">
            Step {step + 1} of {STEPS.length - 1}
          </p>
        )}
      </div>

      {/* Step heading */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${current.id}-${surrogacy}`}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.22, ease: EASE }}
          className={isResults ? undefined : "max-w-2xl mx-auto"}
        >
          <h2
            className="font-sans font-bold text-teal mb-1 text-center"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)", lineHeight: 1.15 }}
          >
            {current.title}
          </h2>
          <p className="text-sm font-sans text-muted mb-6 leading-relaxed text-center">
            {current.sub}
          </p>
          {stepContent[current.id]}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      {!isResults && (
        <div className="max-w-2xl mx-auto flex items-center justify-between mt-8 pt-4 border-t border-border">
          <button
            onClick={() => setStep((p) => p - 1)}
            disabled={step === 0}
            className="flex items-center gap-1.5 text-sm font-sans text-muted hover:text-foreground disabled:opacity-0 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <button
            onClick={() => setStep((p) => p + 1)}
            disabled={!canAdvance[current.id]}
            className="inline-flex items-center gap-2 rounded-full bg-teal text-on-teal px-6 py-2.5 text-sm font-sans font-medium hover:bg-accent hover:text-foreground disabled:opacity-25 transition-colors duration-200"
          >
            {step === STEPS.length - 2 ? "Show my matches" : "Continue"}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
      </div>
    </div>
  );
}
