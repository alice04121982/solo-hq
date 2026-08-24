"use client";

import { useState, useMemo, type ReactNode } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getFamilyType, type FamilyTypeSlug } from "@/lib/family-types";
import { CLINICS as DB_CLINICS, DATA_PROVENANCE } from "@/lib/clinics";
import {
  travelEstimateForCity,
  googleFlightsUrl,
  staySearchUrl,
  formatRangeGbp,
  TRAVEL_ASSUMPTIONS,
  type TravelEstimate,
} from "@/lib/travel";
import type { AgeBracket, Treatment } from "@/types/clinic";
import { RegulatorNotice } from "@/components/regulator-notice";
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
  Search,
  Handshake,
  Hospital,
  Compass,
  Plane,
  ShieldCheck,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Types ────────────────────────────────────────────────────────────────────

type FamilyType = "solo-mum" | "solo-dad" | "female-couple" | "male-couple" | "straight-couple";
type AgeGroup = "under35" | "35to37" | "38to40" | "over40";
// For surrogacy paths this represents egg-donor age preference, not the user's own age
type Condition = "pcos" | "low-reserve" | "endometriosis" | "recurrent-loss" | "male-factor" | "none";
type SurrogacyStage = "exploring" | "matching" | "have-surrogate" | "open";
type TravelWillingness = "uk-only" | "europe" | "anywhere";
type BudgetRange = "under5k" | "5to10k" | "10to15k" | "over15k" | "surrogacy-mid" | "surrogacy-full" | "surrogacy-premium";
type DonorNeed = "sperm" | "egg" | "both" | "neither";

interface WizardState {
  family: FamilyType | null;
  age: AgeGroup | null;
  conditions: Set<Condition>;
  surrogacyStage: SurrogacyStage | null;
  travel: TravelWillingness | null;
  budget: BudgetRange | null;
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

// ─── Clinic data ──────────────────────────────────────────────────────────────
//
// One source of truth: the wizard matches over the same clinic database as the
// finder (src/lib/clinics.ts), so a price is never stale here while fresh
// there. This file only adds the wizard's editorial layer on top.

type AgeKey = AgeBracket;

/**
 * Editorial ratings the canonical database deliberately doesn't carry, keyed
 * by clinic slug. Indicative seed judgements, same caveat as the price data;
 * a slug with no entry gets DEFAULT_PROFILE rather than an invented score.
 */
interface MatcherProfile {
  priceTransparency: number;
  soloFriendliness: number;
  lgbtqFriendliness: number;
  /** Override for the estimated non-headline IVF costs (meds, scans, fees). */
  ivfExtrasGBP?: number;
}

const DEFAULT_PROFILE: MatcherProfile = {
  priceTransparency: 3,
  soloFriendliness: 4,
  lgbtqFriendliness: 4,
};

const PROFILES: Record<string, MatcherProfile> = {
  "london-womens-clinic": { priceTransparency: 4, soloFriendliness: 5, lgbtqFriendliness: 5, ivfExtrasGBP: 2700 },
  "create-fertility": { priceTransparency: 5, soloFriendliness: 5, lgbtqFriendliness: 5 },
  "bourn-hall": { priceTransparency: 4, soloFriendliness: 5, lgbtqFriendliness: 4 },
  "herts-essex": { priceTransparency: 4, soloFriendliness: 4, lgbtqFriendliness: 4 },
  "lister-fertility": { priceTransparency: 2, soloFriendliness: 4, lgbtqFriendliness: 4 },
  "kings-fertility": { priceTransparency: 4, soloFriendliness: 4, lgbtqFriendliness: 4 },
  addenbrookes: { priceTransparency: 3, soloFriendliness: 3, lgbtqFriendliness: 3 },
  "ivi-valencia": { priceTransparency: 4, soloFriendliness: 5, lgbtqFriendliness: 5 },
  "reprofit-brno": { priceTransparency: 5, soloFriendliness: 5, lgbtqFriendliness: 4 },
  "embryolab-thessaloniki": { priceTransparency: 4, soloFriendliness: 5, lgbtqFriendliness: 4 },
  "copenhagen-fertility-center": { priceTransparency: 4, soloFriendliness: 5, lgbtqFriendliness: 5 },
};

// Estimated costs a headline quote leaves out, aligned with the cost
// calculator's assumptions: meds, consultations, scans and admin. Donor
// sperm is surfaced separately in the results note, as before.
const IVF_EXTRAS_UK_GBP = 2300;
const IVF_EXTRAS_ABROAD_GBP = 2000;
const IUI_EXTRAS_GBP = 650;

interface MatchClinic {
  slug: string;
  name: string;
  city: string;
  location: string;
  region: "uk" | "abroad";
  hfeaLicensed: boolean;
  treatments: Treatment[];
  successRates: Partial<Record<AgeKey, number>>;
  priceTransparency: number;
  soloFriendliness: number;
  lgbtqFriendliness: number;
  ivfBaseGBP?: number;
  ivfRealGBP?: number;
  iuiBaseGBP?: number;
  iuiRealGBP?: number;
}

const CLINICS: MatchClinic[] = DB_CLINICS.map((c) => {
  const profile = PROFILES[c.slug] ?? DEFAULT_PROFILE;
  const region = c.region === "UK" ? "uk" : "abroad";
  const ivfExtras =
    profile.ivfExtrasGBP ?? (region === "uk" ? IVF_EXTRAS_UK_GBP : IVF_EXTRAS_ABROAD_GBP);
  return {
    slug: c.slug,
    name: c.name,
    city: c.city,
    location: `${c.city}, ${c.country}`,
    region,
    hfeaLicensed: c.hfeaLicensed,
    treatments: c.treatments,
    successRates: c.successRates.byBracket,
    priceTransparency: profile.priceTransparency,
    soloFriendliness: profile.soloFriendliness,
    lgbtqFriendliness: profile.lgbtqFriendliness,
    ivfBaseGBP: c.pricePerCycleGbp,
    ivfRealGBP: c.pricePerCycleGbp != null ? c.pricePerCycleGbp + ivfExtras : undefined,
    iuiBaseGBP: c.iuiPricePerCycleGbp,
    iuiRealGBP: c.iuiPricePerCycleGbp != null ? c.iuiPricePerCycleGbp + IUI_EXTRAS_GBP : undefined,
  };
});

/**
 * Indicative IUI live birth rates per cycle by age, national ranges rather
 * than per-clinic figures: clinics rarely publish IUI rates by bracket, and
 * we never invent per-clinic numbers. Bands bracket HFEA-derived national
 * figures (~15.8% under 35, ~11% at 35–39, ~4.7% at 40–42) and match the
 * treatment guide in src/lib/guides.ts.
 */
const IUI_SUCCESS_BAND: Partial<Record<AgeKey, string>> = {
  under35: "14–17%",
  age35to37: "10–13%",
  age38to39: "8–11%",
  age40to42: "3–6%",
};

// ─── Matching logic ───────────────────────────────────────────────────────────

function ageToKey(age: AgeGroup): AgeKey {
  return { under35: "under35", "35to37": "age35to37", "38to40": "age38to39", over40: "age40to42" }[age] as AgeKey;
}

function budgetMax(b: BudgetRange): number {
  return {
    "under5k": 5000,
    "5to10k": 10000,
    "10to15k": 15000,
    "over15k": Infinity,
    "surrogacy-mid": 30000,
    "surrogacy-full": 50000,
    "surrogacy-premium": Infinity,
  }[b];
}

function getDonorNeed(family: FamilyType, conditions: Set<Condition>): DonorNeed {
  if (family === "male-couple") return "both";
  if (family === "solo-dad") return "both";
  const needsEgg = conditions.has("low-reserve");
  const needsSperm = family === "solo-mum" || family === "female-couple";
  if (needsEgg && needsSperm) return "both";
  if (needsEgg) return "egg";
  if (needsSperm) return "sperm";
  return "neither";
}

interface ScoredClinic {
  clinic: MatchClinic;
  /** What the match is priced on: IVF by default, IUI when only IUI fits. */
  treatment: "ivf" | "iui";
  baseGBP: number;
  realGBP: number;
  score: number;
  matchReasons: string[];
  travelNote: string | null;
  travel: TravelEstimate | null;
}

function scoreClinic(clinic: MatchClinic, s: WizardState): ScoredClinic | null {
  if (!s.family || !s.age || !s.travel || !s.budget) return null;

  const surrogacy = isSurrogacyPath(s.family);

  // Hard filter: travel
  if (s.travel === "uk-only" && clinic.region === "abroad") return null;

  // Hard filter: donor need
  const donorNeed = getDonorNeed(s.family, s.conditions);
  if (donorNeed === "both" && !clinic.treatments.includes("Double donor")) return null;
  if (donorNeed === "egg" && !clinic.treatments.includes("Donor eggs")) return null;
  if (donorNeed === "sperm" && !clinic.treatments.includes("Donor sperm")) return null;

  // Budget: price IVF at its real (all-in) cost first — including the
  // destination's flights + stays estimate for abroad — and when that breaks
  // the budget, fall back to IUI where it is clinically and practically
  // sensible: own eggs, and a UK clinic, because IUI's cycle-timing visits
  // make travelling impractical. This is what makes "Under £5,000" return
  // the IUI options it promises instead of nothing. Surrogacy paths keep the
  // old behaviour: the wider journey budget is not a ceiling on the IVF
  // element alone.
  const travel = clinic.region === "abroad" ? travelEstimateForCity(clinic.city) : null;
  const travelEstimate = travel?.mid ?? 0;
  const matchReasons: string[] = [];
  const ivfReal = clinic.ivfRealGBP != null ? clinic.ivfRealGBP + travelEstimate : null;

  let treatment: "ivf" | "iui";
  let baseGBP: number;
  let realGBP: number;

  if (surrogacy) {
    if (clinic.ivfBaseGBP == null || ivfReal == null) return null;
    treatment = "ivf";
    baseGBP = clinic.ivfBaseGBP;
    realGBP = ivfReal;
  } else if (clinic.ivfBaseGBP != null && ivfReal != null && ivfReal <= budgetMax(s.budget)) {
    treatment = "ivf";
    baseGBP = clinic.ivfBaseGBP;
    realGBP = ivfReal;
  } else {
    const iuiSuitable =
      donorNeed !== "egg" &&
      donorNeed !== "both" &&
      clinic.region === "uk" &&
      clinic.treatments.includes("IUI") &&
      clinic.iuiBaseGBP != null &&
      clinic.iuiRealGBP != null;
    if (!iuiSuitable || clinic.iuiRealGBP! > budgetMax(s.budget)) return null;
    treatment = "iui";
    baseGBP = clinic.iuiBaseGBP!;
    realGBP = clinic.iuiRealGBP!;
    matchReasons.push("IUI cycles fit your budget");
  }
  const effectiveCost = realGBP;

  const ageKey = ageToKey(s.age);
  const successRate = clinic.successRates[ageKey];
  let score = 0;

  // Success rate (max 40 pts). Absent = not published; scores 0 rather than
  // an invented figure, and sorts accordingly. For IUI matches the clinic's
  // IVF rate still orders results: it is the published signal of lab quality.
  if (successRate != null) score += (successRate / 60) * 40;

  // Family-type friendliness
  const isLgbtq = s.family === "female-couple" || s.family === "male-couple";
  if (isLgbtq) {
    score += (clinic.lgbtqFriendliness / 5) * 25;
    if (clinic.lgbtqFriendliness === 5) matchReasons.push("Strong LGBTQ+ patient support");
  } else {
    score += (clinic.soloFriendliness / 5) * 25;
    if (clinic.soloFriendliness === 5) {
      matchReasons.push(
        s.family === "straight-couple"
          ? "Strong patient support"
          : "Strong solo patient support"
      );
    }
  }

  // Price transparency (max 15 pts)
  score += (clinic.priceTransparency / 5) * 15;
  if (clinic.priceTransparency >= 4) matchReasons.push("Transparent pricing");

  // Cost efficiency (max 20 pts)
  if (!surrogacy) {
    const costScore = Math.max(0, 1 - (effectiveCost - 3000) / 15000);
    score += costScore * 20;
  }

  // Condition-based bonuses (non-surrogacy only)
  if (!surrogacy) {
    if (s.conditions.has("low-reserve") && clinic.treatments.includes("Donor eggs")) {
      score += 10;
      matchReasons.push("Offers donor egg IVF for low ovarian reserve");
    }
  }

  // Double-donor bonus for surrogacy paths
  if (surrogacy && clinic.treatments.includes("Double donor")) {
    score += 15;
    matchReasons.push("Offers double-donor IVF for surrogacy");
  }

  // Travel note
  let travelNote: string | null = null;
  if (travel) {
    travelNote =
      `Add ${formatRangeGbp(travel)} for flights + stays over ` +
      `${TRAVEL_ASSUMPTIONS.tripsPerCycle.low}–${TRAVEL_ASSUMPTIONS.tripsPerCycle.high} trips ` +
      `(est. real total: £${effectiveCost.toLocaleString("en-GB")})`;
  }

  // Success rate reason. IUI matches get the national range, never the
  // clinic's IVF percentage dressed up as an IUI figure.
  if (treatment === "iui") {
    const band = IUI_SUCCESS_BAND[ageKey];
    if (band) matchReasons.push(`${band} IUI success nationally for your age group`);
  } else if (successRate != null) {
    matchReasons.push(
      surrogacy
        ? `${successRate}% donor egg success rate`
        : `${successRate}% success rate for your age group`
    );
  }

  return { clinic, treatment, baseGBP, realGBP, score, matchReasons, travelNote, travel };
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

function ConditionChip({ selected, onClick, label }: { selected: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-sans transition-all duration-150 ${
        selected
          ? "border-teal bg-teal text-on-teal"
          : "border-border text-muted hover:border-teal/40 hover:text-teal"
      }`}
    >
      {label}
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
      subtitle: "Female same-sex couple, donor sperm needed",
      icon: <ParentPair symbol="venus" />,
    },
    {
      value: "male-couple",
      title: "Two dads",
      subtitle: "Male same-sex couple, surrogacy and donor egg pathway",
      icon: <ParentPair symbol="mars" />,
    },
    {
      value: "straight-couple",
      title: "Mum and dad",
      subtitle: "Heterosexual couple: IVF, ICSI, or donor options",
      icon: <VenusAndMars className="h-5 w-5" strokeWidth={1.75} />,
    },
    {
      value: "solo-dad",
      title: "Solo dad",
      subtitle: "Single man using surrogacy with a donor egg",
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

// Standard age step — for mums and couples (relates to egg quality)
function StepAgeStandard({ s, set }: { s: WizardState; set: (a: AgeGroup) => void }) {
  const options: { value: AgeGroup; title: string; subtitle: string }[] = [
    { value: "under35", title: "Under 35", subtitle: "Higher success rates per cycle; IUI may be worth trying first" },
    { value: "35to37", title: "35–37", subtitle: "Good outcomes with own eggs, and time still on your side" },
    { value: "38to40", title: "38–40", subtitle: "IVF usually recommended; consider genetic testing of embryos" },
    { value: "over40", title: "Over 40", subtitle: "Donor eggs often give the best chance, though clinics vary on this threshold" },
  ];
  return (
    <div className="space-y-3">
      {options.map((o) => (
        <OptionCard key={o.value} selected={s.age === o.value} onClick={() => set(o.value)}
          title={o.title} subtitle={o.subtitle} />
      ))}
    </div>
  );
}

// Surrogacy path age step — about egg donor preference, not the intended father's age
function StepAgeSurrogacy({ s, set }: { s: WizardState; set: (a: AgeGroup) => void }) {
  return (
    <div>
      <div className="mb-5 p-4 rounded-xl border border-border bg-background">
        <p className="text-xs font-sans text-muted leading-relaxed">
          <strong className="text-foreground">For surrogacy, your age doesn&apos;t affect success rates.</strong>{" "}
          What matters is the egg donor&apos;s age. Most donors are under 35, which is why donor-egg success rates
          are often 50–60% per transfer regardless of the intended father&apos;s age.
        </p>
      </div>
      <p className="text-sm font-sans text-muted mb-4 leading-relaxed">
        Tell us about your egg donor situation so we can show you the most relevant clinics:
      </p>
      <div className="space-y-3">
        <OptionCard
          selected={s.age === "under35"}
          onClick={() => set("under35")}
          title="Standard donor pool (under 35)"
          subtitle="Most clinics use donors under 35; this is the most common and highest-success route"
        />
        <OptionCard
          selected={s.age === "35to37"}
          onClick={() => set("35to37")}
          title="Slightly older or unknown donor age"
          subtitle="If using a known donor or a clinic with a broader age range"
        />
        <OptionCard
          selected={s.age === "38to40"}
          onClick={() => set("38to40")}
          title="Known donor (friend or family member)"
          subtitle="Using someone you know as an egg donor. Clinic requirements will vary; discuss suitability with your chosen clinic"
        />
        <OptionCard
          selected={s.age === "over40"}
          onClick={() => set("over40")}
          title="Haven&apos;t decided yet"
          subtitle="I&apos;m still exploring; just show me what&apos;s available"
        />
      </div>
    </div>
  );
}

// Conditions step — for families who may have relevant fertility conditions
function StepConditionsStandard({
  s, toggle, family,
}: {
  s: WizardState; toggle: (c: Condition) => void; family: FamilyType | null;
}) {
  // male-factor is only relevant when there is a male partner providing sperm
  const showMaleFactor = family === "straight-couple";

  const options: { value: Condition; label: string }[] = [
    { value: "pcos", label: "PCOS" },
    { value: "low-reserve", label: "Low ovarian reserve / high FSH" },
    { value: "endometriosis", label: "Endometriosis" },
    { value: "recurrent-loss", label: "Recurrent miscarriage" },
    ...(showMaleFactor ? [{ value: "male-factor" as Condition, label: "Male factor (low sperm quality)" }] : []),
    { value: "none", label: "No known conditions" },
  ];

  const handleToggle = (c: Condition) => {
    if (c === "none") {
      const toRemove = ["pcos", "low-reserve", "endometriosis", "recurrent-loss", "male-factor"] as Condition[];
      toRemove.forEach((x) => { if (s.conditions.has(x)) toggle(x); });
      if (!s.conditions.has("none")) toggle("none");
    } else {
      if (s.conditions.has("none")) toggle("none");
      toggle(c);
    }
  };

  return (
    <div>
      <p className="text-sm font-sans text-muted mb-4 leading-relaxed">
        Select any that apply. This helps us flag clinics with the right specialisms. Skip if you&apos;re not sure.
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <ConditionChip key={o.value} selected={s.conditions.has(o.value)}
            onClick={() => handleToggle(o.value)} label={o.label} />
        ))}
      </div>
    </div>
  );
}

// Conditions step — surrogacy path (different concerns entirely)
function StepConditionsSurrogacy({
  s, set,
}: {
  s: WizardState; set: (stage: SurrogacyStage) => void;
}) {
  const options: { value: SurrogacyStage; title: string; subtitle: string; icon: ReactNode }[] = [
    {
      value: "exploring",
      title: "Just starting to explore",
      subtitle: "I'm at the research stage, understanding my options before committing",
      icon: <Search className="h-5 w-5" strokeWidth={1.75} />,
    },
    {
      value: "matching",
      title: "In the surrogate matching process",
      subtitle: "I'm working with a surrogacy organisation (e.g. Brilliant Beginnings, COTS) to find a match",
      icon: <Handshake className="h-5 w-5" strokeWidth={1.75} />,
    },
    {
      value: "have-surrogate",
      title: "I have a surrogate and need an IVF clinic",
      subtitle: "The match is made; now I need a clinic experienced in surrogacy arrangements",
      icon: <Hospital className="h-5 w-5" strokeWidth={1.75} />,
    },
    {
      value: "open",
      title: "Open to exploring all routes",
      subtitle: "I haven't decided yet; show me the full picture",
      icon: <Compass className="h-5 w-5" strokeWidth={1.75} />,
    },
  ];
  return (
    <div>
      <div className="mb-5 p-4 rounded-xl border border-border bg-background">
        <p className="text-xs font-sans text-muted leading-relaxed">
          Solo fatherhood via surrogacy is achievable, but it takes longer and costs more than other
          routes. UK surrogacy is legal and altruistic; you&apos;ll need a parental order after birth to become the
          legal parent. Getting a specialist solicitor on board early is essential.
        </p>
      </div>
      <p className="text-sm font-sans text-muted mb-4 leading-relaxed">
        Where are you in the process?
      </p>
      <div className="space-y-3">
        {options.map((o) => (
          <OptionCard key={o.value} selected={s.surrogacyStage === o.value} onClick={() => set(o.value)}
            title={o.title} subtitle={o.subtitle} icon={o.icon} />
        ))}
      </div>
    </div>
  );
}

function StepTravel({ s, set, isSurrogacy }: { s: WizardState; set: (t: TravelWillingness) => void; isSurrogacy: boolean }) {
  // Pin/globe match how UK and overseas clinics are marked on the results screen.
  const options: { value: TravelWillingness; title: string; subtitle: string; icon: ReactNode }[] = [
    {
      value: "uk-only",
      title: "UK clinics only",
      subtitle: isSurrogacy
        ? "UK surrogacy is well-regulated; most intended fathers start here"
        : "I want HFEA regulation and no travel logistics",
      icon: <MapPin className="h-5 w-5" strokeWidth={1.75} />,
    },
    {
      value: "europe",
      title: "Open to Europe",
      subtitle: "Happy to travel to Spain, Greece, Czech Republic etc.",
      icon: <Plane className="h-5 w-5" strokeWidth={1.75} />,
    },
    {
      value: "anywhere",
      title: "Anywhere in the world",
      subtitle: "I'll go wherever gives me the best chance",
      icon: <Globe className="h-5 w-5" strokeWidth={1.75} />,
    },
  ];
  return (
    <div className="space-y-3">
      {!isSurrogacy && (
        <p className="text-sm font-sans text-muted mb-2 leading-relaxed">
          Clinics abroad can look cheaper until you add flights, stays, and 2–3 trips. We factor this into the real cost, per destination.
        </p>
      )}
      {options.map((o) => (
        <OptionCard key={o.value} selected={s.travel === o.value} onClick={() => set(o.value)}
          title={o.title} subtitle={o.subtitle} icon={o.icon} />
      ))}
    </div>
  );
}

function StepBudget({ s, set, isSurrogacy }: { s: WizardState; set: (b: BudgetRange) => void; isSurrogacy: boolean }) {
  const standardOptions: { value: BudgetRange; title: string; subtitle: string }[] = [
    { value: "under5k", title: "Under £5,000", subtitle: "Covers IUI cycles at a UK clinic; IVF all-in usually costs more" },
    { value: "5to10k", title: "£5,000 – £10,000", subtitle: "1–2 IVF cycles at a budget or mid-range UK clinic" },
    { value: "10to15k", title: "£10,000 – £15,000", subtitle: "2–3 cycles, or premium UK/abroad" },
    { value: "over15k", title: "Over £15,000", subtitle: "Multiple cycles or premium options anywhere" },
  ];

  const surrogacyOptions: { value: BudgetRange; title: string; subtitle: string }[] = [
    {
      value: "surrogacy-mid",
      title: "Up to £30,000",
      subtitle: "Covers IVF costs and some surrogate expenses; you'll likely need additional funds for the full journey",
    },
    {
      value: "surrogacy-full",
      title: "£30,000 – £50,000",
      subtitle: "Realistic budget for a UK surrogacy journey: IVF, surrogate expenses, legal fees, and counselling",
    },
    {
      value: "surrogacy-premium",
      title: "Over £50,000",
      subtitle: "Covers multiple cycles, premium clinic choice, or international options",
    },
  ];

  const options = isSurrogacy ? surrogacyOptions : standardOptions;

  return (
    <div className="space-y-3">
      <p className="text-sm font-sans text-muted mb-2 leading-relaxed">
        {isSurrogacy
          ? "UK surrogacy typically costs £30,000–£50,000 all-in: IVF (£5,000–£12,000), surrogate expenses (£15,000–£25,000), legal fees (~£5,000), and counselling. This is separate from any egg donor costs."
          : "This is your total budget, not just the headline clinic quote. We include donor costs, medications, and travel where relevant."
        }
      </p>
      {options.map((o) => (
        <OptionCard key={o.value} selected={s.budget === o.value} onClick={() => set(o.value)}
          title={o.title} subtitle={o.subtitle} />
      ))}
    </div>
  );
}

function Dots({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className="h-1.5 w-1.5 rounded-full"
          style={{ background: i < rating ? "var(--accent)" : "var(--border)" }} />
      ))}
    </div>
  );
}

function StepResults({ s, onReset }: { s: WizardState; onReset: () => void }) {
  const results = useMemo(() => {
    return CLINICS
      .map((c) => scoreClinic(c, s))
      .filter((r): r is ScoredClinic => r !== null)
      .sort((a, b) => b.score - a.score);
  }, [s]);

  const ageKey = s.age ? ageToKey(s.age) : "under35";
  const surrogacy = isSurrogacyPath(s.family);
  const donorNeed = s.family ? getDonorNeed(s.family, s.conditions) : "neither";

  const donorNote = surrogacy
    ? "You'll need a surrogate matched separately through a UK organisation (e.g. Brilliant Beginnings or COTS). The clinics below handle the IVF element. Budget £15,000–£25,000 on top for surrogate expenses and legal fees."
    : {
        sperm: "You'll need donor sperm: budget an extra £1,950–£2,500 for 2 vials + shipping.",
        egg: "Donor eggs will significantly increase per-cycle cost; expect £8,000–£14,000 total.",
        both: "Double-donor cycles (egg + sperm) are complex. Only a handful of clinics offer this.",
        neither: null,
      }[donorNeed];

  const successLabel = surrogacy ? "Donor egg rate" : "Success rate";
  const successSub = surrogacy ? "per transfer" : "your age group";

  const familyGuide = s.family ? getFamilyType(FAMILY_GUIDE_SLUG[s.family]) : undefined;

  if (results.length === 0) {
    return (
      <div className="py-6 max-w-2xl mx-auto text-center">
        <p className="text-foreground font-sans font-medium mb-2">No exact matches</p>
        <p className="text-sm font-sans text-muted mb-6 leading-relaxed">
          {surrogacy
            ? "Try widening your travel preference; some of the best-equipped clinics for surrogacy arrangements are in Europe."
            : "Your current filters (especially budget and travel preference) are quite tight. IVF typically costs £5,500 or more all-in per cycle, and donor egg cycles considerably more, so try increasing your budget or opening up to European clinics."
          }
        </p>
        <button onClick={onReset} className="text-sm font-sans text-muted hover:text-foreground underline underline-offset-4 transition-colors">
          Start over
        </button>
      </div>
    );
  }

  return (
    <div>
      {donorNote && (
        <div className="mb-6 p-4 rounded-xl border border-border bg-background max-w-2xl mx-auto">
          <p className="text-xs font-sans text-muted leading-relaxed">
            <strong className="text-foreground">Heads up: </strong>{donorNote}
          </p>
        </div>
      )}

      <p className="text-[13px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans text-center">
        {results.length} clinic{results.length !== 1 ? "s" : ""} matched, ranked for you
      </p>

      {/* Matches break out of the wizard column into a grid across the page. */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {results.map((r, idx) => (
          <motion.div
            key={r.clinic.slug}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.06, duration: 0.35, ease: EASE }}
            // Opaque so the band's backdrop shape never washes through the data
            className="rounded-xl border border-border overflow-hidden flex flex-col bg-background"
          >
            <div className="flex items-start justify-between gap-4 p-4 border-b border-border">
              <div className="flex items-start gap-3">
                <span className="font-sans text-muted/50 text-lg font-medium leading-none shrink-0 mt-0.5">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-sans font-medium text-teal leading-tight">{r.clinic.name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {r.clinic.region === "abroad"
                      ? <Globe className="h-3 w-3 text-muted" />
                      : <MapPin className="h-3 w-3 text-muted" />}
                    <p className="text-xs font-sans text-muted">{r.clinic.location}</p>
                  </div>
                  {r.clinic.hfeaLicensed && (
                    <div className="flex items-center gap-1 mt-1">
                      <ShieldCheck className="h-3 w-3 text-muted" />
                      <p className="text-xs font-sans text-muted">HFEA licensed</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-sans text-muted line-through">
                  £{r.baseGBP.toLocaleString()} quoted
                </p>
                <p className="font-sans font-medium text-teal text-lg leading-tight">
                  £{r.realGBP.toLocaleString()}
                </p>
                <p className="text-[12px] font-sans text-muted">
                  {r.treatment === "iui" ? "IUI" : "IVF"} est. real cost
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-px bg-border">
              <div className="bg-background p-3">
                <p className="text-[12px] font-[500] uppercase tracking-[0.1em] text-muted font-sans mb-1.5">
                  {r.treatment === "iui" ? "IUI success" : successLabel}
                </p>
                <p className="font-sans font-medium text-teal text-lg leading-none">
                  {r.treatment === "iui"
                    ? IUI_SUCCESS_BAND[ageKey] ?? "—"
                    : r.clinic.successRates[ageKey] != null
                      ? `${r.clinic.successRates[ageKey]}%`
                      : "—"}
                </p>
                <p className="text-[12px] font-sans text-muted mt-0.5">
                  {r.treatment === "iui"
                    ? "per cycle, national range"
                    : r.clinic.successRates[ageKey] != null
                      ? successSub
                      : "not published"}
                </p>
              </div>
              <div className="bg-background p-3">
                <p className="text-[12px] font-[500] uppercase tracking-[0.1em] text-muted font-sans mb-1.5">
                  {s.family === "female-couple" || s.family === "male-couple"
                    ? "LGBTQ+"
                    : s.family === "straight-couple"
                      ? "Patient support"
                      : "Solo patients"}
                </p>
                <Dots rating={s.family === "female-couple" || s.family === "male-couple"
                  ? r.clinic.lgbtqFriendliness : r.clinic.soloFriendliness} />
              </div>
              <div className="bg-background p-3">
                <p className="text-[12px] font-[500] uppercase tracking-[0.1em] text-muted font-sans mb-1.5">
                  Pricing
                </p>
                <Dots rating={r.clinic.priceTransparency} />
              </div>
            </div>

            <div className="p-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {r.matchReasons.slice(0, 3).map((reason) => (
                  <span key={reason} className="text-[13px] font-sans px-2.5 py-1 rounded-full"
                    style={{ background: "var(--accent)", color: "var(--foreground)" }}>
                    {reason}
                  </span>
                ))}
              </div>
              {r.travelNote && (
                <div className="border-t border-border pt-3">
                  <p className="flex items-start gap-1.5 text-[13px] font-sans text-muted leading-relaxed">
                    <Plane className="h-3.5 w-3.5 shrink-0 mt-px" strokeWidth={1.75} />
                    <span>{r.travelNote}</span>
                  </p>
                  {r.travel?.destination.note && (
                    <p className="text-[13px] font-sans text-muted leading-relaxed mt-1.5 pl-5">
                      {r.travel.destination.note}
                    </p>
                  )}
                  {r.travel && (
                    <p className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 pl-5">
                      <a
                        href={googleFlightsUrl(r.travel.destination)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] font-sans font-medium text-muted hover:text-foreground underline underline-offset-4 transition-colors"
                      >
                        Check live flight prices
                      </a>
                      <a
                        href={staySearchUrl(r.travel.destination)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] font-sans font-medium text-muted hover:text-foreground underline underline-offset-4 transition-colors"
                      >
                        Check places to stay
                      </a>
                    </p>
                  )}
                </div>
              )}
              <Link
                href={`/ivf-finder/${r.clinic.slug}`}
                className="inline-flex items-center gap-1.5 text-[13px] font-sans font-medium text-muted hover:text-foreground underline underline-offset-4 transition-colors mt-3"
              >
                Full details and sources <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-xs font-sans text-muted text-center mt-6">
        Prices are indicative, compiled from {DATA_PROVENANCE.pricesSourceLabel} and last
        verified on{" "}
        {new Date(`${DATA_PROVENANCE.pricesVerifiedOn}T00:00:00Z`).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        })}
        . &ldquo;Real cost&rdquo; adds our estimate of medications, consultations and fees to
        the clinic&apos;s headline quote; for clinics abroad it also adds
        destination-specific flights and stays across{" "}
        {TRAVEL_ASSUMPTIONS.tripsPerCycle.low}–{TRAVEL_ASSUMPTIONS.tripsPerCycle.high} trips.
        Solo, LGBTQ+ and pricing scores are Cairn&apos;s own
        editorial assessments of published clinic information — not patient reviews or
        independently verified ratings.
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
            className="inline-flex items-center gap-2 rounded-full border border-teal text-teal px-6 py-3 text-sm font-sans font-medium hover:bg-teal hover:text-on-teal transition-colors duration-200"
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

// ─── Step metadata (titles adapt to family type) ──────────────────────────────

function getSteps(family: FamilyType | null) {
  const surrogacy = isSurrogacyPath(family);
  return [
    { id: "family",     title: "Your family type",      sub: "So we can match clinics to your specific situation" },
    {
      id: "age",
      title: surrogacy ? "About the egg donor"          : "Your age",
      sub:   surrogacy ? "Success rates depend on donor age, not yours" : "Success rates vary significantly; this shapes our recommendations",
    },
    {
      id: "conditions",
      title: surrogacy ? "Where are you in the process?" : "Any known conditions?",
      sub:   surrogacy ? "So we can tailor the results to where you are" : "Optional; helps us flag relevant specialisms",
    },
    { id: "travel",     title: "How far will you travel?", sub: "We factor in flights and hotels in the real cost" },
    {
      id: "budget",
      title: "Your total budget",
      sub: surrogacy ? "Surrogacy has significant costs beyond IVF alone" : "All-in, not just the clinic's headline quote",
    },
    { id: "results",    title: "Your matched clinics",   sub: "Ranked by fit, not just success rate" },
  ];
}

// ─── Backdrop shape ───────────────────────────────────────────────────────────

// The band's oversized mark, in the style of Section's `backdrop` but driven
// by wizard state: a neutral egg until a family is chosen, then that family's
// own mark from the shape bank. It turns a notch on every step and crossfades
// when the mark itself changes, so the journey visibly moves with the user.
// Positional classes stay on the wrapper — framer-motion owns `transform`, so
// rotate/scale live on the inner element where they can't clobber the offsets.
function WizardBackdrop({ shape, step }: { shape: ShapeName; step: number }) {
  return (
    <div
      aria-hidden
      className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-[45%] w-[20rem] md:w-[32rem] lg:w-[40rem] pointer-events-none"
      style={{ color: "var(--lime)" }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={shape}
          initial={{ opacity: 0, scale: 0.8, rotate: step * 24 }}
          animate={{ opacity: 1, scale: 1, rotate: step * 24 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <ShapeMark name={shape} className="w-full h-auto" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Main wizard ──────────────────────────────────────────────────────────────

export function ClinicMatcher() {
  const [step, setStep] = useState(0);
  const [s, setS] = useState<WizardState>({
    family: null,
    age: null,
    conditions: new Set(),
    surrogacyStage: null,
    travel: null,
    budget: null,
  });

  const surrogacy = isSurrogacyPath(s.family);
  const STEPS = getSteps(s.family);
  const isResults = step === STEPS.length - 1;

  // Neutral egg mark until step one is answered, then the chosen family's own.
  const backdropShape: ShapeName = s.family ? FAMILY_SHAPES[FAMILY_GUIDE_SLUG[s.family]] : "egg";

  const canAdvance = [
    s.family !== null,
    s.age !== null,
    true,              // conditions/stage is optional
    s.travel !== null,
    s.budget !== null,
    false,
  ][step];

  const toggleCondition = (c: Condition) => {
    setS((prev) => {
      const next = new Set(prev.conditions);
      if (next.has(c)) {
        next.delete(c);
      } else {
        next.add(c);
      }
      return { ...prev, conditions: next };
    });
  };

  const reset = () => {
    setStep(0);
    setS({ family: null, age: null, conditions: new Set(), surrogacyStage: null, travel: null, budget: null });
  };

  // When family type changes, reset age + conditions since they're context-dependent
  const setFamily = (f: FamilyType) => {
    setS((p) => ({ ...p, family: f, age: null, conditions: new Set(), surrogacyStage: null }));
  };

  const stepContent = [
    <StepFamily key="family" s={s} set={setFamily} />,
    surrogacy
      ? <StepAgeSurrogacy key="age-surrogacy" s={s} set={(a) => setS((p) => ({ ...p, age: a }))} />
      : <StepAgeStandard key="age-standard" s={s} set={(a) => setS((p) => ({ ...p, age: a }))} />,
    surrogacy
      ? <StepConditionsSurrogacy key="conditions-surrogacy" s={s} set={(stage) => setS((p) => ({ ...p, surrogacyStage: stage }))} />
      : <StepConditionsStandard key="conditions-standard" s={s} toggle={toggleCondition} family={s.family} />,
    <StepTravel key="travel" s={s} set={(t) => setS((p) => ({ ...p, travel: t }))} isSurrogacy={surrogacy} />,
    <StepBudget key="budget" s={s} set={(b) => setS((p) => ({ ...p, budget: b }))} isSurrogacy={surrogacy} />,
    <StepResults key="results" s={s} onReset={reset} />,
  ];

  return (
    // The wizard runs as a centred, full-page journey: question steps live in
    // a centred column, and only the results step widens to the full container
    // so the matched clinics can lay out as a grid across the page. The band's
    // backdrop shape renders first so the relative content wrapper paints over
    // it; the section that hosts the wizard crops its bleed (overflow-hidden).
    <div className="w-full">
      <WizardBackdrop shape={backdropShape} step={step} />
      <div className="relative">
      {/* Progress — one segment per question. The results screen is the last
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
          key={`${step}-${surrogacy}`}
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
            {STEPS[step].title}
          </h2>
          <p className="text-sm font-sans text-muted mb-6 leading-relaxed text-center">
            {STEPS[step].sub}
          </p>
          {stepContent[step]}
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
            disabled={!canAdvance}
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
