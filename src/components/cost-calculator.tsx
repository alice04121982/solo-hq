"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, ArrowRight, ArrowLeft, Check, Info } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type TreatmentPath = "iui" | "ivf" | "donor-egg";
type AgeGroup = "under35" | "35to37" | "38to40" | "over40";
type Location = "london" | "uk";
type CycleCount = 1 | 2 | 3;
type ClinicTier = "budget" | "mid" | "premium";

interface Selections {
  path: TreatmentPath | null;
  age: AgeGroup | null;
  location: Location | null;
  cycles: CycleCount | null;
  clinic: ClinicTier | null;
  addOns: Set<string>;
}

// ─── Cost data ────────────────────────────────────────────────────────────────

const BASE_COSTS: Record<TreatmentPath, Record<ClinicTier, number>> = {
  iui: { budget: 1200, mid: 1700, premium: 2400 },
  ivf: { budget: 5500, mid: 8500, premium: 12000 },
  "donor-egg": { budget: 8500, mid: 12000, premium: 16500 },
};

const LONDON_UPLIFT = 1.32;

const SOLO_COSTS = {
  donorSperm: { label: "Donor Sperm (2 vials)", cost: 1950, note: "Average Cryos/Xytex pricing at £975/vial" },
  shipping: { label: "Shipping & Tank Rental", cost: 520, note: "International courier to UK clinic" },
  counselling: { label: "Implications Counselling", cost: 185, note: "HFEA requirement for all donor conception" },
  consultation: { label: "Initial Consultation", cost: 295, note: "Solo patient assessment & treatment planning" },
};

const MEDS_COST: Record<TreatmentPath, number> = {
  iui: 350,
  ivf: 1200,
  "donor-egg": 800,
};

const ADD_ONS = [
  { id: "icsi", label: "ICSI", cost: 1250, note: "Direct sperm injection — often recommended with donor sperm" },
  { id: "embryoscope", label: "EmbryoScope (Time-Lapse)", cost: 500, note: "Continuous embryo monitoring; evidence of benefit is debated" },
  { id: "pgta", label: "PGT-A Genetic Testing", cost: 2800, note: "Screens embryos for chromosomal abnormalities; more relevant over 37" },
  { id: "freeze", label: "Embryo Freezing", cost: 420, note: "Vitrification of surplus embryos for future cycles" },
  { id: "storage", label: "Annual Embryo Storage", cost: 350, note: "Per year; typically required from year 2 onwards" },
];

// ─── Step config ─────────────────────────────────────────────────────────────

const STEPS = ["Treatment", "You", "Clinic", "Add-ons", "Your Estimate"];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return `£${Math.round(n).toLocaleString("en-GB")}`;
}

function calcTotal(s: Selections): { line: LineItem[]; total: number } {
  if (!s.path || !s.clinic || !s.cycles || !s.location) return { line: [], total: 0 };

  const uplift = s.location === "london" ? LONDON_UPLIFT : 1;
  const base = BASE_COSTS[s.path][s.clinic] * uplift;
  const meds = MEDS_COST[s.path] * uplift;

  const line: LineItem[] = [
    { label: `${TREATMENT_LABELS[s.path]} (${CLINIC_LABELS[s.clinic]} clinic)`, cost: base * s.cycles, perCycle: base },
    { label: "Medications", cost: meds * s.cycles, perCycle: meds },
  ];

  if (s.path !== "donor-egg") {
    line.push({ label: SOLO_COSTS.donorSperm.label, cost: SOLO_COSTS.donorSperm.cost, note: SOLO_COSTS.donorSperm.note });
    line.push({ label: SOLO_COSTS.shipping.label, cost: SOLO_COSTS.shipping.cost, note: SOLO_COSTS.shipping.note });
  }

  line.push({ label: SOLO_COSTS.counselling.label, cost: SOLO_COSTS.counselling.cost, note: SOLO_COSTS.counselling.note });
  line.push({ label: SOLO_COSTS.consultation.label, cost: SOLO_COSTS.consultation.cost * s.cycles, perCycle: SOLO_COSTS.consultation.cost });

  for (const id of s.addOns) {
    const ao = ADD_ONS.find((a) => a.id === id)!;
    line.push({ label: ao.label, cost: ao.cost, note: ao.note });
  }

  const total = line.reduce((sum, l) => sum + l.cost, 0);
  return { line, total };
}

interface LineItem {
  label: string;
  cost: number;
  perCycle?: number;
  note?: string;
}

const TREATMENT_LABELS: Record<TreatmentPath, string> = {
  iui: "IUI",
  ivf: "IVF",
  "donor-egg": "Donor Egg IVF",
};

const CLINIC_LABELS: Record<ClinicTier, string> = {
  budget: "NHS-affiliated / budget",
  mid: "Independent mid-range",
  premium: "Premium",
};

// ─── Step components ─────────────────────────────────────────────────────────

function OptionCard({
  selected,
  onClick,
  title,
  subtitle,
  badge,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  subtitle?: string;
  badge?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-2xl border-2 p-4 transition-all duration-150 ${
        selected
          ? "border-navy bg-navy text-white"
          : "border-card-border bg-card-bg hover:border-navy/30"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className={`font-semibold text-sm ${selected ? "text-white" : "text-navy"}`}>{title}</p>
          {subtitle && (
            <p className={`text-xs mt-0.5 leading-relaxed ${selected ? "text-white/60" : "text-muted"}`}>
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {badge && (
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${selected ? "bg-lime text-charcoal" : "bg-lavender-light text-lavender-dark"}`}>
              {badge}
            </span>
          )}
          <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selected ? "border-white bg-white" : "border-card-border"}`}>
            {selected && <Check className="h-3 w-3 text-navy" />}
          </div>
        </div>
      </div>
    </button>
  );
}

function StepTreatment({ s, set }: { s: Selections; set: (p: TreatmentPath) => void }) {
  return (
    <div className="space-y-3">
      <OptionCard
        selected={s.path === "iui"}
        onClick={() => set("iui")}
        title="IUI with donor sperm"
        subtitle="Intrauterine insemination — less invasive, lower cost, lower success rates per cycle. Often a good first step under 35."
        badge="Most accessible"
      />
      <OptionCard
        selected={s.path === "ivf"}
        onClick={() => set("ivf")}
        title="IVF with donor sperm"
        subtitle="In vitro fertilisation — higher success rates, more clinical steps. The most common path for solo mums by choice."
        badge="Most common"
      />
      <OptionCard
        selected={s.path === "donor-egg"}
        onClick={() => set("donor-egg")}
        title="IVF with donor eggs"
        subtitle="Uses eggs from a donor combined with donor sperm. Typically recommended where egg quality or reserve is a concern."
        badge="Best over 40"
      />
    </div>
  );
}

function StepYou({ s, setAge, setLocation, setCycles }: {
  s: Selections;
  setAge: (a: AgeGroup) => void;
  setLocation: (l: Location) => void;
  setCycles: (c: CycleCount) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">Your age group</p>
        <div className="grid grid-cols-2 gap-2">
          {(["under35", "35to37", "38to40", "over40"] as AgeGroup[]).map((a) => (
            <OptionCard
              key={a}
              selected={s.age === a}
              onClick={() => setAge(a)}
              title={{ under35: "Under 35", "35to37": "35–37", "38to40": "38–40", over40: "Over 40" }[a]}
              subtitle={{ under35: "Higher success rates per cycle", "35to37": "Good results with own eggs", "38to40": "Consider PGT-A", over40: "Donor eggs often recommended" }[a]}
            />
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">Location</p>
        <div className="grid grid-cols-2 gap-2">
          <OptionCard selected={s.location === "uk"} onClick={() => setLocation("uk")} title="Outside London" subtitle="Rest of UK pricing" />
          <OptionCard selected={s.location === "london"} onClick={() => setLocation("london")} title="London" subtitle="+32% average premium" badge="Higher cost" />
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">How many cycles are you budgeting for?</p>
        <div className="grid grid-cols-3 gap-2">
          {([1, 2, 3] as CycleCount[]).map((c) => (
            <OptionCard
              key={c}
              selected={s.cycles === c}
              onClick={() => setCycles(c)}
              title={c === 1 ? "1 cycle" : c === 2 ? "2 cycles" : "3 cycles"}
              subtitle={c === 1 ? "Optimistic" : c === 2 ? "Realistic" : "Cautious"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StepClinic({ s, set }: { s: Selections; set: (t: ClinicTier) => void }) {
  return (
    <div className="space-y-3">
      <OptionCard
        selected={s.clinic === "budget"}
        onClick={() => set("budget")}
        title="NHS-affiliated or budget clinic"
        subtitle="Lower headline prices, often shorter add-on menus. May have longer waiting times. Good for straightforward cases."
        badge={s.path ? fmt(BASE_COSTS[s.path!].budget * (s.location === "london" ? LONDON_UPLIFT : 1)) : undefined}
      />
      <OptionCard
        selected={s.clinic === "mid"}
        onClick={() => set("mid")}
        title="Independent mid-range clinic"
        subtitle="The sweet spot for most solo patients. Good success rates, modern labs, clearer communication."
        badge={s.path ? fmt(BASE_COSTS[s.path!].mid * (s.location === "london" ? LONDON_UPLIFT : 1)) : undefined}
      />
      <OptionCard
        selected={s.clinic === "premium"}
        onClick={() => set("premium")}
        title="Premium clinic"
        subtitle="Top-tier labs and consultants, often in central London. Highest costs but may offer more specialist support."
        badge={s.path ? fmt(BASE_COSTS[s.path!].premium * (s.location === "london" ? LONDON_UPLIFT : 1)) : undefined}
      />
    </div>
  );
}

function StepAddOns({ s, toggle }: { s: Selections; toggle: (id: string) => void }) {
  const ageOver37 = s.age === "38to40" || s.age === "over40";
  return (
    <div className="space-y-3">
      {ADD_ONS.filter((ao) => {
        if (ao.id === "icsi" && s.path === "donor-egg") return false;
        return true;
      }).map((ao) => (
        <button
          key={ao.id}
          onClick={() => toggle(ao.id)}
          className={`w-full text-left rounded-2xl border-2 p-4 transition-all duration-150 ${
            s.addOns.has(ao.id)
              ? "border-navy bg-navy text-white"
              : "border-card-border bg-card-bg hover:border-navy/30"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <p className={`font-semibold text-sm ${s.addOns.has(ao.id) ? "text-white" : "text-navy"}`}>{ao.label}</p>
                {ao.id === "pgta" && ageOver37 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-lime text-charcoal font-medium">Recommended for your age</span>
                )}
              </div>
              <p className={`text-xs mt-0.5 leading-relaxed ${s.addOns.has(ao.id) ? "text-white/60" : "text-muted"}`}>{ao.note}</p>
            </div>
            <div className="text-right shrink-0">
              <p className={`text-sm font-bold ${s.addOns.has(ao.id) ? "text-lime" : "text-navy"}`}>{fmt(ao.cost)}</p>
              <div className={`mt-1 h-5 w-10 rounded-full transition-colors duration-200 relative ml-auto ${s.addOns.has(ao.id) ? "bg-lime-dark" : "bg-card-border"}`}>
                <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${s.addOns.has(ao.id) ? "translate-x-5" : "translate-x-0.5"}`} />
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

function StepResults({ s }: { s: Selections }) {
  const { line, total } = calcTotal(s);
  const clinicQuote = s.path && s.clinic && s.location
    ? BASE_COSTS[s.path][s.clinic] * (s.location === "london" ? LONDON_UPLIFT : 1) * s.cycles!
    : 0;
  const gap = total - clinicQuote;

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="rounded-2xl border border-card-border p-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">Clinic quote</p>
          <p className="text-2xl font-bold text-navy">{fmt(clinicQuote)}</p>
          <p className="text-xs text-muted mt-1">Treatment only</p>
        </div>
        <div className="rounded-2xl bg-lime p-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/70 mb-1">Your real total</p>
          <motion.p key={total} initial={{ scale: 1.1 }} animate={{ scale: 1 }} className="text-2xl font-bold text-charcoal">
            {fmt(total)}
          </motion.p>
          <p className="text-xs text-charcoal/70 mt-1">Everything included</p>
        </div>
      </div>

      <div className="rounded-2xl bg-lavender-light/60 border border-lavender/30 p-4 mb-5 flex gap-2">
        <Info className="h-4 w-4 text-lavender-dark shrink-0 mt-0.5" />
        <p className="text-xs text-navy leading-relaxed">
          The gap between what clinics advertise and what solo mums actually pay is{" "}
          <strong>{fmt(gap)}</strong>. This estimate is based on average UK pricing for 2024/25 — your clinic may vary.
        </p>
      </div>

      <div className="space-y-2">
        {line.map((item, i) => (
          <div key={i} className="flex items-start justify-between gap-3 rounded-xl bg-card-bg border border-card-border px-4 py-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-navy truncate">{item.label}</p>
              {item.note && <p className="text-xs text-muted mt-0.5 leading-snug">{item.note}</p>}
              {item.perCycle && s.cycles! > 1 && (
                <p className="text-xs text-muted mt-0.5">{fmt(item.perCycle)} × {s.cycles} cycles</p>
              )}
            </div>
            <p className="text-sm font-bold text-navy shrink-0">{fmt(item.cost)}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl bg-navy p-5 flex items-center justify-between">
        <div>
          <p className="text-xs text-white/50 uppercase tracking-wider">Estimated total</p>
          <p className="text-xs text-white/30 mt-0.5">
            {s.cycles} {s.cycles === 1 ? "cycle" : "cycles"} · {s.location === "london" ? "London" : "UK"} · {TREATMENT_LABELS[s.path!]}
          </p>
        </div>
        <p className="text-3xl font-bold text-lime">{fmt(total)}</p>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function CostCalculator() {
  const [step, setStep] = useState(0);
  const [s, setS] = useState<Selections>({
    path: null,
    age: null,
    location: null,
    cycles: null,
    clinic: null,
    addOns: new Set(),
  });

  const canAdvance = [
    s.path !== null,
    s.age !== null && s.location !== null && s.cycles !== null,
    s.clinic !== null,
    true, // add-ons always optional
    false, // last step
  ][step];

  const toggle = (id: string) =>
    setS((prev) => {
      const next = new Set(prev.addOns);
      next.has(id) ? next.delete(id) : next.add(id);
      return { ...prev, addOns: next };
    });

  const stepContent = [
    <StepTreatment key="treatment" s={s} set={(p) => setS((prev) => ({ ...prev, path: p }))} />,
    <StepYou key="you" s={s}
      setAge={(a) => setS((prev) => ({ ...prev, age: a }))}
      setLocation={(l) => setS((prev) => ({ ...prev, location: l }))}
      setCycles={(c) => setS((prev) => ({ ...prev, cycles: c }))}
    />,
    <StepClinic key="clinic" s={s} set={(t) => setS((prev) => ({ ...prev, clinic: t }))} />,
    <StepAddOns key="addons" s={s} toggle={toggle} />,
    <StepResults key="results" s={s} />,
  ];

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-2xl bg-lime/20 flex items-center justify-center shrink-0">
          <Calculator className="h-5 w-5 text-charcoal" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-navy">Cost Calculator</h2>
          <p className="text-sm text-muted">What you'll actually pay as a solo mum</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-1.5 mb-6">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-1.5 flex-1">
            <div className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i <= step ? "bg-navy" : "bg-card-border"}`} />
          </div>
        ))}
      </div>

      {/* Step label */}
      <p className="text-xs font-semibold uppercase tracking-widest text-lavender-dark mb-1">
        Step {step + 1} of {STEPS.length}
      </p>
      <h3 className="text-lg font-bold text-navy mb-4">{STEPS[step]}</h3>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.2 }}
        >
          {stepContent[step]}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-card-border">
        <button
          onClick={() => setStep((p) => p - 1)}
          disabled={step === 0}
          className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-navy disabled:opacity-0 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        {step < STEPS.length - 1 && (
          <button
            onClick={() => setStep((p) => p + 1)}
            disabled={!canAdvance}
            className="flex items-center gap-2 rounded-full bg-navy text-white px-5 py-2 text-sm font-semibold disabled:opacity-30 hover:bg-charcoal transition-colors"
          >
            {step === STEPS.length - 2 ? "See my estimate" : "Next"}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
        {step === STEPS.length - 1 && (
          <button
            onClick={() => { setStep(0); setS({ path: null, age: null, location: null, cycles: null, clinic: null, addOns: new Set() }); }}
            className="flex items-center gap-2 rounded-full border border-navy/20 text-navy px-5 py-2 text-sm font-semibold hover:bg-navy/5 transition-colors"
          >
            Start over
          </button>
        )}
      </div>
    </div>
  );
}
