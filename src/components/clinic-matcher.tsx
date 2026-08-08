"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, MapPin, Globe, Check } from "lucide-react";

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

// ─── Clinic data ──────────────────────────────────────────────────────────────

type TreatmentType = "ivf" | "icsi" | "iui" | "donor-egg" | "donor-sperm" | "double-donor";
type AgeKey = "under35" | "age35to37" | "age38to39" | "age40to42" | "age43plus";

interface Clinic {
  id: string;
  name: string;
  location: string;
  country: string;
  region: "uk" | "abroad";
  treatments: TreatmentType[];
  successRates: Record<AgeKey, number>;
  priceTransparency: number;
  soloFriendliness: number;
  lgbtqFriendliness: number;
  reviewCount: number;
  basePriceGBP: number;
  realPriceGBP: number;
}

const CLINICS: Clinic[] = [
  {
    id: "london-womens",
    name: "London Women's Clinic",
    location: "London, UK",
    country: "UK",
    region: "uk",
    treatments: ["ivf", "icsi", "iui", "donor-egg", "donor-sperm"],
    successRates: { under35: 44, age35to37: 37, age38to39: 28, age40to42: 16, age43plus: 6 },
    priceTransparency: 4,
    soloFriendliness: 5,
    lgbtqFriendliness: 5,
    reviewCount: 127,
    basePriceGBP: 4500,
    realPriceGBP: 7200,
  },
  {
    id: "argc",
    name: "ARGC",
    location: "London, UK",
    country: "UK",
    region: "uk",
    treatments: ["ivf", "icsi", "donor-egg", "donor-sperm"],
    successRates: { under35: 52, age35to37: 44, age38to39: 35, age40to42: 20, age43plus: 8 },
    priceTransparency: 2,
    soloFriendliness: 3,
    lgbtqFriendliness: 3,
    reviewCount: 89,
    basePriceGBP: 5000,
    realPriceGBP: 12000,
  },
  {
    id: "create",
    name: "Create Fertility",
    location: "London / Birmingham / Bristol",
    country: "UK",
    region: "uk",
    treatments: ["ivf", "icsi", "iui", "donor-egg", "donor-sperm"],
    successRates: { under35: 38, age35to37: 31, age38to39: 22, age40to42: 12, age43plus: 4 },
    priceTransparency: 5,
    soloFriendliness: 5,
    lgbtqFriendliness: 5,
    reviewCount: 203,
    basePriceGBP: 3500,
    realPriceGBP: 5800,
  },
  {
    id: "care",
    name: "CARE Fertility",
    location: "Multiple UK locations",
    country: "UK",
    region: "uk",
    treatments: ["ivf", "icsi", "iui", "donor-egg", "donor-sperm", "double-donor"],
    successRates: { under35: 41, age35to37: 34, age38to39: 26, age40to42: 14, age43plus: 5 },
    priceTransparency: 3,
    soloFriendliness: 4,
    lgbtqFriendliness: 4,
    reviewCount: 156,
    basePriceGBP: 4200,
    realPriceGBP: 8100,
  },
  {
    id: "manchester-fertility",
    name: "Manchester Fertility",
    location: "Manchester, UK",
    country: "UK",
    region: "uk",
    treatments: ["ivf", "icsi", "iui", "donor-egg", "donor-sperm"],
    successRates: { under35: 39, age35to37: 32, age38to39: 24, age40to42: 13, age43plus: 4 },
    priceTransparency: 4,
    soloFriendliness: 4,
    lgbtqFriendliness: 4,
    reviewCount: 64,
    basePriceGBP: 3800,
    realPriceGBP: 6500,
  },
  {
    id: "ivi-madrid",
    name: "IVI Madrid",
    location: "Madrid, Spain",
    country: "Spain",
    region: "abroad",
    treatments: ["ivf", "icsi", "iui", "donor-egg", "donor-sperm", "double-donor"],
    successRates: { under35: 58, age35to37: 50, age38to39: 42, age40to42: 28, age43plus: 14 },
    priceTransparency: 4,
    soloFriendliness: 5,
    lgbtqFriendliness: 5,
    reviewCount: 312,
    basePriceGBP: 3200,
    realPriceGBP: 5500,
  },
  {
    id: "reprofit-brno",
    name: "Reprofit International",
    location: "Brno, Czech Republic",
    country: "Czech Republic",
    region: "abroad",
    treatments: ["ivf", "icsi", "donor-egg", "donor-sperm", "double-donor"],
    successRates: { under35: 54, age35to37: 47, age38to39: 39, age40to42: 25, age43plus: 11 },
    priceTransparency: 5,
    soloFriendliness: 5,
    lgbtqFriendliness: 4,
    reviewCount: 248,
    basePriceGBP: 2800,
    realPriceGBP: 4800,
  },
  {
    id: "serum-athens",
    name: "SERUM Athens",
    location: "Athens, Greece",
    country: "Greece",
    region: "abroad",
    treatments: ["ivf", "icsi", "iui", "donor-egg", "donor-sperm", "double-donor"],
    successRates: { under35: 56, age35to37: 49, age38to39: 40, age40to42: 26, age43plus: 12 },
    priceTransparency: 4,
    soloFriendliness: 5,
    lgbtqFriendliness: 4,
    reviewCount: 189,
    basePriceGBP: 3000,
    realPriceGBP: 5100,
  },
];

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
  clinic: Clinic;
  score: number;
  matchReasons: string[];
  travelNote: string | null;
}

function scoreClinic(clinic: Clinic, s: WizardState): ScoredClinic | null {
  if (!s.family || !s.age || !s.travel || !s.budget) return null;

  const surrogacy = isSurrogacyPath(s.family);

  // Hard filter: travel
  if (s.travel === "uk-only" && clinic.region === "abroad") return null;

  // Hard filter: budget (real price — includes a rough travel cost for abroad)
  const travelEstimate = clinic.region === "abroad" ? 1500 : 0;
  const effectiveCost = clinic.realPriceGBP + travelEstimate;
  // For surrogacy paths the surrogacy org/legal cost is separate; don't apply same budget ceiling
  if (!surrogacy && effectiveCost > budgetMax(s.budget)) return null;

  // Hard filter: donor need
  const donorNeed = getDonorNeed(s.family, s.conditions);
  if (donorNeed === "both" && !clinic.treatments.includes("double-donor")) return null;
  if (donorNeed === "egg" && !clinic.treatments.includes("donor-egg")) return null;
  if (donorNeed === "sperm" && !clinic.treatments.includes("donor-sperm")) return null;

  // For surrogacy: use donor-egg success rates (age key based on donor preference, defaults to under35)
  const ageKey = ageToKey(s.age);
  const successRate = clinic.successRates[ageKey];
  const matchReasons: string[] = [];
  let score = 0;

  // Success rate (max 40 pts)
  score += (successRate / 60) * 40;

  // Family-type friendliness
  const isLgbtq = s.family === "female-couple" || s.family === "male-couple";
  if (isLgbtq) {
    score += (clinic.lgbtqFriendliness / 5) * 25;
    if (clinic.lgbtqFriendliness === 5) matchReasons.push("Highly rated for LGBTQ+ patients");
  } else {
    score += (clinic.soloFriendliness / 5) * 25;
    if (clinic.soloFriendliness === 5) matchReasons.push("Excellent solo patient support");
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
    if (s.conditions.has("low-reserve") && clinic.treatments.includes("donor-egg")) {
      score += 10;
      matchReasons.push("Offers donor egg IVF for low ovarian reserve");
    }
  }

  // Double-donor bonus for surrogacy paths
  if (surrogacy && clinic.treatments.includes("double-donor")) {
    score += 15;
    matchReasons.push("Offers double-donor IVF for surrogacy");
  }

  // Travel note
  let travelNote: string | null = null;
  if (clinic.region === "abroad") {
    travelNote = `Add ~£1,500 for flights + hotel (est. real total: £${effectiveCost.toLocaleString("en-GB")})`;
  }

  // Success rate reason — label differs for surrogacy
  if (surrogacy) {
    matchReasons.push(`${successRate}% donor egg success rate`);
  } else {
    matchReasons.push(`${successRate}% success rate for your age group`);
  }

  return { clinic, score, matchReasons, travelNote };
}

// ─── Shared UI ────────────────────────────────────────────────────────────────

function OptionCard({
  selected, onClick, title, subtitle, icon,
}: {
  selected: boolean; onClick: () => void; title: string; subtitle?: string; icon?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-150 ${
        selected ? "border-foreground bg-foreground/5" : "border-border hover:border-foreground/40"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {icon && <span className="text-xl shrink-0 mt-0.5">{icon}</span>}
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
          selected ? "border-foreground bg-foreground" : "border-border"
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
          ? "border-foreground bg-foreground text-background"
          : "border-border text-muted hover:border-foreground/40 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

// ─── Steps ────────────────────────────────────────────────────────────────────

function StepFamily({ s, set }: { s: WizardState; set: (f: FamilyType) => void }) {
  const options: { value: FamilyType; title: string; subtitle: string; icon: string }[] = [
    { value: "solo-mum", title: "Solo mum by choice", subtitle: "Single woman using donor sperm", icon: "🌟" },
    { value: "female-couple", title: "Two mums", subtitle: "Female same-sex couple — donor sperm needed", icon: "🌈" },
    { value: "male-couple", title: "Two dads", subtitle: "Male same-sex couple — surrogacy and donor egg pathway", icon: "🏳️‍🌈" },
    { value: "straight-couple", title: "Mum and dad", subtitle: "Heterosexual couple — IVF, ICSI, or donor options", icon: "💛" },
    { value: "solo-dad", title: "Solo dad by choice", subtitle: "Solo dad by choice — surrogacy with donor egg", icon: "⭐" },
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
    { value: "under35", title: "Under 35", subtitle: "Higher success rates per cycle — IUI may be worth trying first" },
    { value: "35to37", title: "35–37", subtitle: "Good outcomes with own eggs — time still on your side" },
    { value: "38to40", title: "38–40", subtitle: "IVF usually recommended — consider genetic testing of embryos" },
    { value: "over40", title: "Over 40", subtitle: "Donor eggs often give the best chance — clinics vary on this threshold" },
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
      <div className="mb-5 p-4 rounded-xl border border-border bg-background-alt">
        <p className="text-xs font-sans text-muted leading-relaxed">
          <strong className="text-foreground">For surrogacy, your age doesn&apos;t affect success rates.</strong>{" "}
          What matters is the egg donor&apos;s age — most donors are under 35, which is why donor-egg success rates
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
          subtitle="Most clinics use donors under 35 — this is the most common and highest-success route"
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
          subtitle="Using someone you know as an egg donor — clinic requirements will vary; discuss suitability with your chosen clinic"
        />
        <OptionCard
          selected={s.age === "over40"}
          onClick={() => set("over40")}
          title="Haven&apos;t decided yet"
          subtitle="I&apos;m still exploring — just show me what&apos;s available"
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
  const options: { value: SurrogacyStage; title: string; subtitle: string; icon: string }[] = [
    {
      value: "exploring",
      title: "Just starting to explore",
      subtitle: "I&apos;m at the research stage — understanding my options before committing",
      icon: "🔍",
    },
    {
      value: "matching",
      title: "In the surrogate matching process",
      subtitle: "I&apos;m working with a surrogacy organisation (e.g. Brilliant Beginnings, COTS) to find a match",
      icon: "🤝",
    },
    {
      value: "have-surrogate",
      title: "I have a surrogate — need an IVF clinic",
      subtitle: "The match is made; now I need a clinic experienced in surrogacy arrangements",
      icon: "🏥",
    },
    {
      value: "open",
      title: "Open to exploring all routes",
      subtitle: "I haven&apos;t decided yet — show me the full picture",
      icon: "🌍",
    },
  ];
  return (
    <div>
      <div className="mb-5 p-4 rounded-xl border border-border bg-background-alt">
        <p className="text-xs font-sans text-muted leading-relaxed">
          Solo fatherhood via surrogacy is genuinely achievable — but it takes longer and costs more than other
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
  const options: { value: TravelWillingness; title: string; subtitle: string; icon: string }[] = [
    {
      value: "uk-only",
      title: "UK clinics only",
      subtitle: isSurrogacy
        ? "UK surrogacy is well-regulated — most intended fathers start here"
        : "I want HFEA regulation and no travel logistics",
      icon: "🇬🇧",
    },
    {
      value: "europe",
      title: "Open to Europe",
      subtitle: "Happy to travel to Spain, Greece, Czech Republic etc.",
      icon: "✈️",
    },
    {
      value: "anywhere",
      title: "Anywhere in the world",
      subtitle: "I'll go wherever gives me the best chance",
      icon: "🌍",
    },
  ];
  return (
    <div className="space-y-3">
      {!isSurrogacy && (
        <p className="text-sm font-sans text-muted mb-2 leading-relaxed">
          Clinics abroad can look cheaper — until you add flights, hotels, and 2–4 trips. We factor this into the real cost.
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
    { value: "under5k", title: "Under £5,000", subtitle: "One IUI cycle or a very budget IVF — limited options" },
    { value: "5to10k", title: "£5,000 – £10,000", subtitle: "1–2 IVF cycles at a budget or mid-range UK clinic" },
    { value: "10to15k", title: "£10,000 – £15,000", subtitle: "2–3 cycles, or premium UK/abroad" },
    { value: "over15k", title: "Over £15,000", subtitle: "Multiple cycles or premium options anywhere" },
  ];

  const surrogacyOptions: { value: BudgetRange; title: string; subtitle: string }[] = [
    {
      value: "surrogacy-mid",
      title: "Up to £30,000",
      subtitle: "Covers IVF costs and some surrogate expenses — you'll likely need additional funds for the full journey",
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
          : "This is your total budget — not just the headline clinic quote. We include donor costs, medications, and travel where relevant."
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
        sperm: "You'll need donor sperm — budget an extra £1,950–£2,500 for 2 vials + shipping.",
        egg: "Donor eggs will significantly increase per-cycle cost — expect £8,000–£14,000 total.",
        both: "Double-donor cycles (egg + sperm) are complex. Only a handful of clinics offer this.",
        neither: null,
      }[donorNeed];

  const successLabel = surrogacy ? "Donor egg rate" : "Success rate";
  const successSub = surrogacy ? "per transfer" : "your age group";

  if (results.length === 0) {
    return (
      <div className="py-6">
        <p className="text-foreground font-sans font-medium mb-2">No exact matches</p>
        <p className="text-sm font-sans text-muted mb-6 leading-relaxed">
          {surrogacy
            ? "Try widening your travel preference — some of the best-equipped clinics for surrogacy arrangements are in Europe."
            : "Your current filters (especially budget and travel preference) are quite tight. Try increasing your budget or opening up to European clinics."
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
        <div className="mb-6 p-4 rounded-xl border border-border bg-background-alt">
          <p className="text-xs font-sans text-muted leading-relaxed">
            <strong className="text-foreground">Heads up: </strong>{donorNote}
          </p>
        </div>
      )}

      <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
        {results.length} clinic{results.length !== 1 ? "s" : ""} matched — ranked for you
      </p>

      <div className="space-y-4">
        {results.map((r, idx) => (
          <motion.div
            key={r.clinic.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.06, duration: 0.35, ease: EASE }}
            className="rounded-xl border border-border overflow-hidden"
          >
            <div className="flex items-start justify-between gap-4 p-4 border-b border-border">
              <div className="flex items-start gap-3">
                <span className="font-sans text-muted/50 text-lg font-medium leading-none shrink-0 mt-0.5">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-sans font-medium text-foreground leading-tight">{r.clinic.name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {r.clinic.region === "abroad"
                      ? <Globe className="h-3 w-3 text-muted" />
                      : <MapPin className="h-3 w-3 text-muted" />}
                    <p className="text-xs font-sans text-muted">{r.clinic.location}</p>
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-sans text-muted line-through">
                  £{r.clinic.basePriceGBP.toLocaleString()} quoted
                </p>
                <p className="font-sans font-medium text-foreground text-lg leading-tight">
                  £{r.clinic.realPriceGBP.toLocaleString()}
                </p>
                <p className="text-[10px] font-sans text-muted">IVF est. real cost</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-px bg-border">
              <div className="bg-background p-3">
                <p className="text-[10px] font-[500] uppercase tracking-[0.1em] text-muted font-sans mb-1.5">
                  {successLabel}
                </p>
                <p className="font-sans font-medium text-foreground text-lg leading-none">
                  {r.clinic.successRates[ageKey]}%
                </p>
                <p className="text-[10px] font-sans text-muted mt-0.5">{successSub}</p>
              </div>
              <div className="bg-background p-3">
                <p className="text-[10px] font-[500] uppercase tracking-[0.1em] text-muted font-sans mb-1.5">
                  {s.family === "female-couple" || s.family === "male-couple" ? "LGBTQ+" : "Solo friendly"}
                </p>
                <Dots rating={s.family === "female-couple" || s.family === "male-couple"
                  ? r.clinic.lgbtqFriendliness : r.clinic.soloFriendliness} />
              </div>
              <div className="bg-background p-3">
                <p className="text-[10px] font-[500] uppercase tracking-[0.1em] text-muted font-sans mb-1.5">
                  Pricing
                </p>
                <Dots rating={r.clinic.priceTransparency} />
              </div>
            </div>

            <div className="p-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {r.matchReasons.slice(0, 3).map((reason) => (
                  <span key={reason} className="text-[11px] font-sans px-2.5 py-1 rounded-full"
                    style={{ background: "var(--accent)", color: "var(--foreground)" }}>
                    {reason}
                  </span>
                ))}
              </div>
              {r.travelNote && (
                <p className="text-[11px] font-sans text-muted leading-relaxed border-t border-border pt-3">
                  ✈️ {r.travelNote}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <a
          href="/ivf-finder"
          className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-sans font-medium hover:bg-accent hover:text-foreground transition-colors duration-200"
        >
          See full clinic comparison <ArrowRight className="h-3.5 w-3.5" />
        </a>
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
      sub:   surrogacy ? "Success rates depend on donor age, not yours" : "Success rates vary significantly — this shapes our recommendations",
    },
    {
      id: "conditions",
      title: surrogacy ? "Where are you in the process?" : "Any known conditions?",
      sub:   surrogacy ? "So we can tailor the results to where you are" : "Optional — helps us flag relevant specialisms",
    },
    { id: "travel",     title: "How far will you travel?", sub: "We factor in flights and hotels in the real cost" },
    {
      id: "budget",
      title: "Your total budget",
      sub: surrogacy ? "Surrogacy has significant costs beyond IVF alone" : "All-in — not just the clinic's headline quote",
    },
    { id: "results",    title: "Your matched clinics",   sub: "Ranked by fit — not just success rate" },
  ];
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
      next.has(c) ? next.delete(c) : next.add(c);
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
    // Width and alignment are the page's to decide — the wizard fills whatever
    // column it is given, so it can share the page header's left edge.
    <div className="w-full">
      {/* Progress — one segment per question. The results screen is the last
          entry in STEPS but is not a step the user answers, so it is excluded
          here to match the "of N" count below. */}
      <div className="mb-8">
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
          <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted font-sans">
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
        >
          <h2
            className="font-sans font-bold text-foreground mb-1"
            style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", lineHeight: 1.15 }}
          >
            {STEPS[step].title}
          </h2>
          <p className="text-sm font-sans text-muted mb-6 leading-relaxed">
            {STEPS[step].sub}
          </p>
          {stepContent[step]}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      {!isResults && (
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-border">
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
            className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-2.5 text-sm font-sans font-medium hover:bg-accent hover:text-foreground disabled:opacity-25 transition-colors duration-200"
          >
            {step === STEPS.length - 2 ? "Show my matches" : "Continue"}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
