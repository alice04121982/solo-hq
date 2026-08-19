"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Info } from "lucide-react";
import { DATA_PROVENANCE } from "@/lib/clinics";
import { europeTypicalTravel, TRAVEL_ASSUMPTIONS } from "@/lib/travel";

const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Types ───────────────────────────────────────────────────────────────────

type TreatmentPath = "iui" | "ivf" | "donor-egg";
type AgeGroup = "under35" | "35to37" | "38to40" | "over40";
type Location = "london" | "uk" | "abroad";
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

// Kept in step with the clinic database (src/lib/clinics.ts) and its cited
// benchmarks: the HFEA puts an IVF cycle at £5,000 on average and IUI at
// around a quarter of that. Update DATA_PROVENANCE when these change.
const BASE_COSTS: Record<TreatmentPath, Record<ClinicTier, number>> = {
  iui: { budget: 1000, mid: 1250, premium: 1600 },
  ivf: { budget: 5500, mid: 8500, premium: 12000 },
  "donor-egg": { budget: 8500, mid: 12000, premium: 16500 },
};

const LONDON_UPLIFT = 1.32;

// European clinic tiers, anchored to the finder's clinic database
// (src/lib/clinics.ts): its Europe headline IVF prices run £2,900–£5,600.
// IUI abroad is deliberately absent — cycle-timing visits make travelling
// for it impractical, matching the clinic matcher's logic.
const BASE_COSTS_ABROAD: Record<Exclude<TreatmentPath, "iui">, Record<ClinicTier, number>> = {
  ivf: { budget: 3000, mid: 4200, premium: 5600 },
  "donor-egg": { budget: 5500, mid: 7000, premium: 9500 },
};

function baseCost(path: TreatmentPath, tier: ClinicTier, location: Location): number {
  if (location === "abroad" && path !== "iui") return BASE_COSTS_ABROAD[path][tier];
  return BASE_COSTS[path][tier] * (location === "london" ? LONDON_UPLIFT : 1);
}

const SOLO_COSTS = {
  donorSperm: { label: "Donor Sperm (2 vials)", cost: 1950, note: "Average Cryos/Xytex pricing at £975/vial" },
  shipping: { label: "Shipping & Tank Rental", cost: 520, note: "International courier to your clinic" },
  counselling: { label: "Implications Counselling", cost: 185, note: "HFEA requirement for all donor conception" },
  consultation: { label: "Initial Consultation", cost: 295, note: "Solo patient assessment & treatment planning" },
};

const MEDS_COST: Record<TreatmentPath, number> = { iui: 350, ivf: 1200, "donor-egg": 800 };

const ADD_ONS = [
  { id: "icsi", label: "ICSI", cost: 1250, note: "Direct sperm injection, often recommended with donor sperm" },
  { id: "embryoscope", label: "EmbryoScope (Time-Lapse)", cost: 500, note: "Continuous embryo monitoring; evidence of benefit is debated" },
  { id: "pgta", label: "PGT-A Genetic Testing", cost: 2800, note: "Screens embryos for chromosomal abnormalities; more relevant over 37" },
  { id: "freeze", label: "Embryo Freezing", cost: 420, note: "Vitrification of surplus embryos for future cycles" },
  { id: "storage", label: "Annual Embryo Storage", cost: 350, note: "Per year; typically required from year 2 onwards" },
];

const STEPS = ["Getting Started", "You", "Clinic", "Add-ons", "Your Estimate"];

const TREATMENT_LABELS: Record<TreatmentPath, string> = { iui: "IUI", ivf: "IVF", "donor-egg": "Donor Egg IVF" };
const CLINIC_LABELS: Record<ClinicTier, string> = { budget: "NHS-affiliated / budget", mid: "Independent mid-range", premium: "Premium" };

function fmt(n: number) { return `£${Math.round(n).toLocaleString("en-GB")}`; }

interface LineItem { label: string; cost: number; perCycle?: number; note?: string; }

function calcTotal(s: Selections): { line: LineItem[]; total: number } {
  if (!s.path || !s.clinic || !s.cycles || !s.location) return { line: [], total: 0 };
  const base = baseCost(s.path, s.clinic, s.location);
  const meds = MEDS_COST[s.path] * (s.location === "london" ? LONDON_UPLIFT : 1);
  const line: LineItem[] = [
    { label: `${TREATMENT_LABELS[s.path]} (${CLINIC_LABELS[s.clinic]} clinic)`, cost: base * s.cycles, perCycle: base },
    { label: "Medications", cost: meds * s.cycles, perCycle: meds },
  ];
  if (s.location === "abroad") {
    const travel = europeTypicalTravel();
    line.push({
      label: "Travel & stays (est.)",
      cost: travel.mid * s.cycles,
      perCycle: travel.mid,
      note: `Flights + accommodation for ${TRAVEL_ASSUMPTIONS.tripsPerCycle.low}–${TRAVEL_ASSUMPTIONS.tripsPerCycle.high} trips per cycle, typical for Europe. Check live prices for your dates.`,
    });
  }
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
  return { line, total: line.reduce((sum, l) => sum + l.cost, 0) };
}

// ─── Option row — list style with left-border selected state ─────────────────

function OptionRow({
  selected, onClick, title, subtitle, badge, tag,
}: {
  selected: boolean; onClick: () => void; title: string; subtitle?: string; badge?: string; tag?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left py-4 px-0 flex items-start justify-between gap-4 border-t border-border transition-all duration-150 group ${
        selected ? "pl-4 border-l-2 border-l-foreground" : "pl-0 border-l-2 border-l-transparent hover:pl-2"
      }`}
    >
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-sans leading-snug ${selected ? "text-foreground" : "text-foreground/70 group-hover:text-foreground"} transition-colors`}>
          {title}
        </p>
        {subtitle && (
          <p className="text-xs font-sans text-muted mt-0.5 leading-relaxed">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0 pt-0.5">
        {tag && (
          <span className="text-[12px] font-[500] uppercase tracking-[0.1em] text-teal font-sans">{tag}</span>
        )}
        {badge && (
          <span className="text-xs font-sans text-muted">{badge}</span>
        )}
        <div className={`h-4 w-4 rounded-full border flex items-center justify-center transition-colors ${
          selected ? "border-foreground bg-foreground" : "border-border"
        }`}>
          {selected && <span className="block h-1.5 w-1.5 rounded-full bg-background" />}
        </div>
      </div>
    </button>
  );
}

// ─── Step sub-components ──────────────────────────────────────────────────────

function StepTreatment({ s, set }: { s: Selections; set: (p: TreatmentPath) => void }) {
  return (
    <div>
      <OptionRow selected={s.path === "iui"} onClick={() => set("iui")} title="IUI with donor sperm" subtitle="Less invasive, lower cost, lower success rates per cycle. Often a good first step under 35." tag="Most accessible" />
      <OptionRow selected={s.path === "ivf"} onClick={() => set("ivf")} title="IVF with donor sperm" subtitle="Higher success rates, more clinical steps. The most common path for solo mums by choice." tag="Most common" />
      <OptionRow selected={s.path === "donor-egg"} onClick={() => set("donor-egg")} title="IVF with donor eggs" subtitle="Uses eggs from a donor combined with donor sperm. Typically recommended where egg quality or reserve is a concern." tag="Best over 40" />
      <div className="border-t border-border" />
    </div>
  );
}

function StepYou({ s, setAge, setLocation, setCycles }: { s: Selections; setAge: (a: AgeGroup) => void; setLocation: (l: Location) => void; setCycles: (c: CycleCount) => void; }) {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-[13px] font-[500] uppercase tracking-[0.15em] text-muted mb-2 font-sans">Your age group</p>
        {(["under35", "35to37", "38to40", "over40"] as AgeGroup[]).map((a) => (
          <OptionRow key={a} selected={s.age === a} onClick={() => setAge(a)}
            title={{ under35: "Under 35", "35to37": "35–37", "38to40": "38–40", over40: "Over 40" }[a]}
            subtitle={{ under35: "Higher success rates per cycle", "35to37": "Good results with own eggs", "38to40": "Consider PGT-A", over40: "Donor eggs often recommended" }[a]}
          />
        ))}
        <div className="border-t border-border" />
      </div>
      <div>
        <p className="text-[13px] font-[500] uppercase tracking-[0.15em] text-muted mb-2 font-sans">Location</p>
        <OptionRow selected={s.location === "uk"} onClick={() => setLocation("uk")} title="Outside London" subtitle="Rest of UK pricing" />
        <OptionRow selected={s.location === "london"} onClick={() => setLocation("london")} title="London" subtitle="+32% average premium" tag="Higher cost" />
        {s.path !== "iui" && (
          <OptionRow selected={s.location === "abroad"} onClick={() => setLocation("abroad")} title="Abroad (Europe)" subtitle="Spain, Greece, Czechia and similar. Lower clinic prices; we add flights and stays." tag="Travel added" />
        )}
        <div className="border-t border-border" />
        {s.path === "iui" && (
          <p className="text-xs font-sans text-muted mt-2 leading-relaxed">
            Treatment abroad isn&rsquo;t shown for IUI: its cycle-timing visits make travelling impractical.
          </p>
        )}
      </div>
      <div>
        <p className="text-[13px] font-[500] uppercase tracking-[0.15em] text-muted mb-2 font-sans">Cycles to budget for</p>
        {([1, 2, 3] as CycleCount[]).map((c) => (
          <OptionRow key={c} selected={s.cycles === c} onClick={() => setCycles(c)}
            title={c === 1 ? "1 cycle" : c === 2 ? "2 cycles" : "3 cycles"}
            subtitle={c === 1 ? "Optimistic" : c === 2 ? "Realistic" : "Cautious"}
          />
        ))}
        <div className="border-t border-border" />
      </div>
    </div>
  );
}

function StepClinic({ s, set }: { s: Selections; set: (t: ClinicTier) => void }) {
  const badge = (tier: ClinicTier) =>
    s.path && s.location ? fmt(baseCost(s.path, tier, s.location)) : undefined;
  return (
    <div>
      <OptionRow selected={s.clinic === "budget"} onClick={() => set("budget")} title={s.location === "abroad" ? "Budget clinic" : "NHS-affiliated or budget clinic"} subtitle="Lower headline prices, often shorter add-on menus. Good for straightforward cases." badge={badge("budget")} />
      <OptionRow selected={s.clinic === "mid"} onClick={() => set("mid")} title="Independent mid-range clinic" subtitle="The sweet spot for most solo patients. Good success rates, modern labs, clearer communication." badge={badge("mid")} />
      <OptionRow selected={s.clinic === "premium"} onClick={() => set("premium")} title="Premium clinic" subtitle="Top-tier labs and consultants. Highest costs but may offer more specialist support." badge={badge("premium")} />
      <div className="border-t border-border" />
    </div>
  );
}

function StepAddOns({ s, toggle }: { s: Selections; toggle: (id: string) => void }) {
  const ageOver37 = s.age === "38to40" || s.age === "over40";
  return (
    <div>
      {ADD_ONS.filter((ao) => !(ao.id === "icsi" && s.path === "donor-egg")).map((ao) => (
        <OptionRow key={ao.id} selected={s.addOns.has(ao.id)} onClick={() => toggle(ao.id)}
          title={ao.label}
          subtitle={ao.note}
          badge={fmt(ao.cost)}
          tag={ao.id === "pgta" && ageOver37 ? "Recommended for your age" : undefined}
        />
      ))}
      <div className="border-t border-border" />
    </div>
  );
}

function StepResults({ s }: { s: Selections }) {
  const { line, total } = calcTotal(s);
  const clinicQuote = s.path && s.clinic && s.location
    ? baseCost(s.path, s.clinic, s.location) * s.cycles!
    : 0;
  const gap = total - clinicQuote;

  return (
    <div>
      {/* Large number summary */}
      <div className="flex gap-8 mb-8 pt-2">
        <div>
          <p className="text-[13px] font-[500] uppercase tracking-[0.15em] text-muted mb-1 font-sans">Clinic quote</p>
          <p className="font-serif text-foreground/40" style={{ fontSize: "2rem" }}>{fmt(clinicQuote)}</p>
        </div>
        <div>
          <p className="text-[13px] font-[500] uppercase tracking-[0.15em] text-muted mb-1 font-sans">Your real total</p>
          <motion.p key={total} initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} className="font-serif text-foreground" style={{ fontSize: "2.5rem", fontOpticalSizing: "auto" as never }}>
            {fmt(total)}
          </motion.p>
        </div>
      </div>

      <div className="flex gap-2 mb-6 p-4 bg-cream rounded-xl">
        <Info className="h-4 w-4 text-muted shrink-0 mt-0.5" />
        <p className="text-xs font-sans text-muted leading-relaxed">
          The hidden gap is <strong className="text-foreground">{fmt(gap)}</strong>: costs clinics don&rsquo;t include in their headline price.
        </p>
      </div>

      {/* Line items */}
      <div>
        {line.map((item, i) => (
          <div key={i} className="flex items-start justify-between gap-4 py-3 border-t border-border">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-sans text-foreground">{item.label}</p>
              {item.note && <p className="text-xs font-sans text-muted mt-0.5">{item.note}</p>}
              {item.perCycle && s.cycles! > 1 && (
                <p className="text-xs font-sans text-muted mt-0.5">{fmt(item.perCycle)} × {s.cycles} cycles</p>
              )}
            </div>
            <p className="text-sm font-sans text-foreground shrink-0 font-[500]">{fmt(item.cost)}</p>
          </div>
        ))}
        <div className="border-t border-border" />
      </div>

      <div className="mt-6 flex items-end justify-between">
        <p className="text-[13px] font-[500] uppercase tracking-[0.15em] text-muted font-sans">
          {s.cycles} {s.cycles === 1 ? "cycle" : "cycles"} &nbsp;·&nbsp; {s.location === "london" ? "London" : s.location === "abroad" ? "Abroad (Europe)" : "UK"} &nbsp;·&nbsp; {TREATMENT_LABELS[s.path!]}
        </p>
        <p className="font-serif text-foreground" style={{ fontSize: "2rem" }}>{fmt(total)}</p>
      </div>

      <p className="text-xs font-sans text-muted mt-6 leading-relaxed">
        Estimates use typical published clinic prices (UK tiers, with European tiers anchored
        to the clinics in our finder), last verified on{" "}
        {new Date(`${DATA_PROVENANCE.pricesVerifiedOn}T00:00:00Z`).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        })}
        , sanity-checked against the{" "}
        <a
          href={DATA_PROVENANCE.benchmarks[0].url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline underline-offset-2 hover:text-foreground transition-colors"
        >
          HFEA&apos;s treatment cost guidance
        </a>{" "}
        and the{" "}
        <a
          href={DATA_PROVENANCE.benchmarks[2].url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline underline-offset-2 hover:text-foreground transition-colors"
        >
          NHS
        </a>
        . Always confirm against a written quote from your clinic. Your answers stay in
        your browser: nothing you enter in this calculator is sent to us or stored.
      </p>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function CostCalculator() {
  const [step, setStep] = useState(0);
  const [s, setS] = useState<Selections>({ path: null, age: null, location: null, cycles: null, clinic: null, addOns: new Set() });

  const canAdvance = [s.path !== null, s.age !== null && s.location !== null && s.cycles !== null, s.clinic !== null, true, false][step];

  const toggle = (id: string) => setS((prev) => {
    const next = new Set(prev.addOns);
    next.has(id) ? next.delete(id) : next.add(id);
    return { ...prev, addOns: next };
  });

  const stepContent = [
    // Switching to IUI drops an abroad location: the calculator, like the
    // matcher, does not price IUI abroad.
    <StepTreatment key="treatment" s={s} set={(p) => setS((prev) => ({ ...prev, path: p, location: p === "iui" && prev.location === "abroad" ? null : prev.location }))} />,
    <StepYou key="you" s={s} setAge={(a) => setS((p) => ({ ...p, age: a }))} setLocation={(l) => setS((p) => ({ ...p, location: l }))} setCycles={(c) => setS((p) => ({ ...p, cycles: c }))} />,
    <StepClinic key="clinic" s={s} set={(t) => setS((prev) => ({ ...prev, clinic: t }))} />,
    <StepAddOns key="addons" s={s} toggle={toggle} />,
    <StepResults key="results" s={s} />,
  ];

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <p className="text-[13px] font-[500] uppercase tracking-[0.15em] text-muted mb-2 font-sans">
          Step {step + 1} of {STEPS.length}
        </p>
        {/* Progress bar */}
        <div className="flex gap-1 mb-4">
          {STEPS.map((_, i) => (
            <div key={i} className="flex-1 h-px transition-colors duration-300" style={{ background: i <= step ? "var(--foreground)" : "var(--border)" }} />
          ))}
        </div>
        <h2 className="font-sans font-bold text-foreground text-2xl">{STEPS[step]}</h2>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.25, ease: EASE }}
        >
          {stepContent[step]}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6 pt-4">
        <button
          onClick={() => setStep((p) => p - 1)}
          disabled={step === 0}
          className="flex items-center gap-1.5 text-sm font-sans text-muted hover:text-foreground disabled:opacity-0 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        {step < STEPS.length - 1 && (
          <button
            onClick={() => setStep((p) => p + 1)}
            disabled={!canAdvance}
            className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-2.5 text-sm font-sans hover:bg-accent disabled:opacity-25 transition-colors duration-200"
          >
            {step === STEPS.length - 2 ? "See my estimate" : "Continue"}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
        {step === STEPS.length - 1 && (
          <button
            onClick={() => { setStep(0); setS({ path: null, age: null, location: null, cycles: null, clinic: null, addOns: new Set() }); }}
            className="text-sm font-sans text-muted hover:text-foreground transition-colors underline underline-offset-4"
          >
            Start over
          </button>
        )}
      </div>
    </div>
  );
}
