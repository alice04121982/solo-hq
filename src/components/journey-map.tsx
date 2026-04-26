"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Landmark, Search, Stethoscope, FlaskConical, Heart, Baby, Sunrise, Users, ChevronDown, Check } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Phase {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  description: string;
  actions: string[];
}

const PHASES: Phase[] = [
  {
    id: "decision", number: 1, title: "The Decision", subtitle: "Am I really doing this?",
    icon: <Lightbulb className="h-4 w-4" />,
    description: "For most solo mums by choice, the decision takes months or years. There's no right timeline. This phase is about getting honest with yourself — about what you want, what you fear, and what 'good enough' conditions look like before you start.",
    actions: ["Sit with the question without rushing to an answer — most women take 6–24 months to decide", "Read memoirs and join SMC communities before committing to anything clinical", "Talk to a therapist experienced in fertility and solo parenthood — not to be talked out of it, but to be properly prepared", "Have the honest conversation about your support network: who will actually show up?", "Set a personal 'decision deadline' so the thinking doesn't go on forever"],
  },
  {
    id: "foundations", number: 2, title: "Foundations", subtitle: "Building your base",
    icon: <Landmark className="h-4 w-4" />,
    description: "Before you book a consultation, do the groundwork. Financial clarity, employer research, and a realistic support structure are what separate women who feel prepared from those who feel blindsided.",
    actions: ["Complete a full financial audit: treatment costs + 12 months of solo maternity costs", "Research your employer's fertility and enhanced maternity policies", "Build your 'village' — identify 3–5 reliable people who will actually show up", "Set a budget ceiling and a 'stop' point before you start", "Explore fertility finance options: loans, employer schemes, NHS criteria"],
  },
  {
    id: "donor", number: 3, title: "The Donor Hunt", subtitle: "Navigating sperm banks",
    icon: <Search className="h-4 w-4" />,
    description: "Choosing a donor is deeply personal and logistically complex. You'll navigate international sperm banks, shipping regulations, open-ID vs. anonymous debates, and the emotional weight of selecting half your child's genetics.",
    actions: ["Create accounts at major banks: Cryos International, Xytex, European Sperm Bank, London Sperm Bank", "Understand open-ID donors (child can contact at 18) vs. anonymous — UK law requires traceability", "Budget for 2–4 vials per cycle attempt, plus additional storage for siblings", "Coordinate shipping logistics and tank rental with your chosen clinic in advance", "Consider CMV status, blood type matching, and extended family health history"],
  },
  {
    id: "clinic", number: 4, title: "Choosing a Clinic", subtitle: "More than just success rates",
    icon: <Stethoscope className="h-4 w-4" />,
    description: "HFEA success rates are a starting point, not the whole story. For solo patients, solo-friendliness, all-in pricing transparency, and communication quality matter as much as headline numbers.",
    actions: ["Always ask: 'Do you routinely treat single women?' — not all clinics are equally welcoming", "Request a written quote covering everything: ICSI, donor sperm admin, counselling, storage", "Check HFEA success rates for your age group — not the clinic's overall headline figure", "Ask about waiting times for appointments and treatment slots", "Consider location vs. cost: London clinics are 30–40% pricier on average"],
  },
  {
    id: "treatment", number: 5, title: "Treatment", subtitle: "IUI, IVF, or donor eggs",
    icon: <FlaskConical className="h-4 w-4" />,
    description: "The clinical phase is intense — injections, scans, and a lot of waiting. Understanding your protocol helps you advocate for yourself and avoid costly add-ons with little evidence base.",
    actions: ["Get baseline bloods done: AMH, FSH, LH, TSH, prolactin, and an antral follicle count", "Discuss IUI vs. IVF with your consultant — IUI is cheaper but lower success rates per cycle", "Understand your stimulation protocol: long, short, or natural/modified", "Know which add-ons have HFEA amber/green traffic light status and which are unproven", "Prepare for the two-week wait — plan distractions, not obsessive symptom-tracking"],
  },
  {
    id: "resilience", number: 6, title: "Resilience & Loss", subtitle: "When it doesn't go to plan",
    icon: <Heart className="h-4 w-4" />,
    description: "Not every cycle works. Miscarriage, failed transfers, and negative tests are part of many journeys — and facing them alone adds a unique layer of grief. This phase exists because no one should navigate loss without a plan.",
    actions: ["Have a 'plan B' conversation with yourself before starting — not as defeat, but preparation", "Identify a counsellor who specialises in fertility loss before you need one", "Connect with the SMC community — those who've been there understand in a way others can't", "Give yourself permission to grieve between cycles without a timeline or explanation", "Review your financial plan: know when to pause, pivot, or stop"],
  },
  {
    id: "pregnancy", number: 7, title: "Pregnancy", subtitle: "Growing your family solo",
    icon: <Baby className="h-4 w-4" />,
    description: "A positive test is thrilling and terrifying in equal measure. Solo pregnancy comes with unique logistics — from who comes to scans to how you'll manage the physical demands without a partner at home.",
    actions: ["Decide who you'll tell and when — there's no single right answer here", "Book a trusted 'scan buddy' for your 12-week and 20-week appointments", "Review your maternity leave entitlement and start the employer conversation early", "Arrange your birth partner: a close friend, doula, or both", "Start thinking about childcare early — waiting lists are long in most areas"],
  },
  {
    id: "birth", number: 8, title: "Birth & Early Days", subtitle: "Your village matters most now",
    icon: <Sunrise className="h-4 w-4" />,
    description: "The fourth trimester is relentless for every new parent — and doing it without a co-parent is hard in specific, practical ways. Planning ahead for the first 12 weeks makes a real difference.",
    actions: ["Create a postnatal support rota before you give birth — meals, visits, and practical help", "Research local NCT groups and solo parent meetups in your area", "If you can, book a postnatal doula or night nanny for the first few weeks", "Set up your home for single-handed operation: formula prep, changing station, safe sleeping", "Know the signs of postnatal depression and have someone to call — solo mums are at higher risk"],
  },
  {
    id: "life-ahead", number: 9, title: "Life Ahead", subtitle: "Thriving as a solo family",
    icon: <Users className="h-4 w-4" />,
    description: "Solo parenthood gets more manageable as your child grows — and often more joyful. The questions shift from 'can I do this?' to 'how do I talk to my child about their donor?' and 'how do I build a full life alongside this?'",
    actions: ["Start thinking about donor disclosure early — the research clearly supports honesty from the beginning", "Connect with donor-conceived adult communities for perspective on what children actually want to know", "Build solo parent friendships — the shared experience is irreplaceable", "Review finances annually: childcare, schooling, and your own retirement planning as a sole earner", "Give yourself credit — choosing this, doing this, and being present for it is extraordinary"],
  },
];

export function JourneyMap() {
  const [expandedId, setExpandedId] = useState<string | null>("decision");

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-3 font-sans">
          Full lifecycle
        </p>
        <h2 className="font-serif font-normal text-foreground text-2xl leading-tight">
          The Solo Navigator
        </h2>
        <p className="text-sm font-sans text-muted mt-1 leading-relaxed">
          From &ldquo;am I really doing this?&rdquo; to thriving as a solo family.
        </p>
      </div>

      <div>
        {PHASES.map((phase, idx) => {
          const isExpanded = expandedId === phase.id;
          return (
            <div key={phase.id}>
              <button
                onClick={() => setExpandedId(isExpanded ? null : phase.id)}
                className="w-full flex items-center gap-4 py-4 border-t border-border text-left group"
              >
                {/* Number */}
                <span
                  className="font-serif leading-none shrink-0 w-8 transition-colors duration-150"
                  style={{
                    fontSize: "1.5rem",
                    color: isExpanded ? "var(--accent)" : "var(--border)",
                    fontOpticalSizing: "auto" as never,
                  }}
                >
                  {String(phase.number).padStart(2, "0")}
                </span>

                <div className="flex-1 min-w-0">
                  <p className={`font-serif font-normal text-base leading-tight transition-colors duration-150 ${isExpanded ? "text-foreground" : "text-foreground/60 group-hover:text-foreground"}`}>
                    {phase.title}
                  </p>
                  <p className="text-xs font-sans text-muted mt-0.5">{phase.subtitle}</p>
                </div>

                <ChevronDown className={`h-4 w-4 text-muted transition-transform duration-200 shrink-0 ${isExpanded ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="pl-12 pr-2 pb-6">
                      <p className="text-sm font-sans text-muted leading-relaxed mb-4">
                        {phase.description}
                      </p>
                      <div className="space-y-2">
                        {phase.actions.map((action) => (
                          <div key={action} className="flex items-start gap-2.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0 mt-2" />
                            <p className="text-xs font-sans text-muted leading-relaxed">{action}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {idx === PHASES.length - 1 && <div className="border-t border-border" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
