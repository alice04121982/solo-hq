"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Landmark,
  Search,
  Stethoscope,
  Heart,
  ChevronDown,
  Check,
} from "lucide-react";

interface Phase {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  colour: string;
  description: string;
  actions: string[];
}

const PHASES: Phase[] = [
  {
    id: "foundations",
    number: 1,
    title: "Foundations",
    subtitle: "Before you begin",
    icon: <Landmark className="h-6 w-6" />,
    colour: "bg-lavender",
    description:
      "The solo IVF journey starts long before a clinic appointment. This phase is about getting your finances, support network, and mindset ready. It's the most overlooked — and arguably the most important.",
    actions: [
      "Complete a full financial audit (treatment + 12 months of solo maternity costs)",
      "Build your 'village' — identify 3–5 reliable people who will show up",
      "Research your employer's fertility and maternity policies",
      "Sit with the 'SMC Choice' — journaling, therapy, or community groups",
      "Set a realistic timeline and budget ceiling before contacting clinics",
    ],
  },
  {
    id: "donor-hunt",
    number: 2,
    title: "The Donor Hunt",
    subtitle: "Navigating the sperm bank world",
    icon: <Search className="h-6 w-6" />,
    colour: "bg-lime",
    description:
      "Choosing a donor is deeply personal and logistically complex. You'll navigate international sperm banks, shipping regulations, and the Open-ID vs. Anonymous debate — all while managing the emotional weight of selecting half your child's genetics.",
    actions: [
      "Create accounts at major banks (Cryos, Xytex, European Sperm Bank, London Sperm Bank)",
      "Understand Open-ID donors (child can contact at 18) vs. Anonymous (where still legal)",
      "Budget for 2–4 vials per cycle attempt, plus long-term storage for siblings",
      "Coordinate shipping logistics and tank rental with your clinic",
      "Consider CMV status, blood type, and extended donor profile information",
    ],
  },
  {
    id: "protocol",
    number: 3,
    title: "The Protocol",
    subtitle: "Treatment decisions",
    icon: <Stethoscope className="h-6 w-6" />,
    colour: "bg-lavender-light",
    description:
      "IUI or IVF? Natural or medicated? These decisions depend on your age, AMH levels, and clinical history. Understanding the protocols helps you advocate for yourself in consultations and avoid unnecessary upselling.",
    actions: [
      "Get baseline bloods done (AMH, FSH, TSH, prolactin) and an antral follicle count",
      "Discuss IUI vs. IVF with your consultant — IUI is cheaper but has lower success rates",
      "Understand stimulation protocols: long, short, and natural-modified",
      "Prepare for the Two-Week Wait (2WW) — plan distractions and support",
      "Know your rights: you can always ask for a second opinion or switch clinics",
    ],
  },
  {
    id: "resilience",
    number: 4,
    title: "Resilience & Recovery",
    subtitle: "When it doesn't go to plan",
    icon: <Heart className="h-6 w-6" />,
    colour: "bg-warm-white",
    description:
      "Not every cycle works. Miscarriage, failed transfers, and negative tests are part of many journeys — and facing them solo adds a unique layer of grief. This phase exists because no one should navigate loss without a plan.",
    actions: [
      "Have a 'Plan B' conversation with yourself before starting treatment",
      "Identify a counsellor who specialises in fertility loss (not just general therapy)",
      "Connect with the SMC community — those who've been there understand",
      "Give yourself permission to grieve between cycles without a timeline",
      "Review and adjust your financial plan — know when to pause vs. continue",
    ],
  },
];

export function JourneyMap() {
  const [expandedId, setExpandedId] = useState<string | null>("foundations");

  return (
    <div className="p-6 md:p-10">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-navy">
          The Solo Navigator
        </h2>
        <p className="text-sm text-muted mt-1">
          Your step-by-step journey map — because nobody handed us a roadmap
        </p>
      </div>

      <div className="space-y-4">
        {PHASES.map((phase) => {
          const isExpanded = expandedId === phase.id;
          return (
            <div key={phase.id} className="relative">
              {/* Connector Line */}
              {phase.number < PHASES.length && (
                <div className="absolute left-7 top-[72px] w-0.5 h-[calc(100%-40px)] bg-card-border z-0" />
              )}

              <button
                onClick={() =>
                  setExpandedId(isExpanded ? null : phase.id)
                }
                className={`relative z-10 w-full flex items-center gap-4 rounded-2xl p-4 text-left transition-all duration-200 ${
                  isExpanded
                    ? "bg-warm-white shadow-sm"
                    : "hover:bg-warm-white/50"
                }`}
              >
                <div
                  className={`h-14 w-14 rounded-2xl ${phase.colour} flex items-center justify-center shrink-0 text-charcoal`}
                >
                  {phase.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-lavender-dark">
                      PHASE {phase.number}
                    </span>
                    <span className="text-xs text-muted">
                      {phase.subtitle}
                    </span>
                  </div>
                  <p className="text-base font-bold text-navy mt-0.5">
                    {phase.title}
                  </p>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-muted transition-transform duration-200 shrink-0 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-[72px] pr-4 pb-4">
                      <p className="text-sm text-navy/80 leading-relaxed mb-4">
                        {phase.description}
                      </p>
                      <div className="space-y-2">
                        {phase.actions.map((action) => (
                          <div
                            key={action}
                            className="flex items-start gap-2.5"
                          >
                            <div className="h-5 w-5 rounded-full bg-lime/30 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="h-3 w-3 text-charcoal" />
                            </div>
                            <p className="text-sm text-navy/70 leading-relaxed">
                              {action}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
