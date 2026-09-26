"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CircleHelp,
  CircleSlash,
  ExternalLink,
  Landmark,
  RotateCcw,
  Shield,
  ShoppingBag,
  HeartPulse,
} from "lucide-react";
import { OptionCard } from "@/components/option-card";
import {
  AWAITING_US_REVIEW,
  EMPTY_ANSWERS,
  LARGE_GROUP_MIN_EMPLOYEES,
  STATE_RULES,
  assessCoverage,
  isAnswered,
  stepsFor,
  type CoverageAnswers,
  type CoverageResult,
  type Provenance,
  type StepId,
  type Verdict,
} from "@/lib/us-coverage";

const EASE = [0.16, 1, 0.3, 1] as const;
const ICON = { className: "h-5 w-5", strokeWidth: 1.75 } as const;

interface Option<K extends keyof CoverageAnswers> {
  value: NonNullable<CoverageAnswers[K]>;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
}

interface Question<K extends keyof CoverageAnswers> {
  key: K;
  title: string;
  sub: string;
  options: Option<K>[];
}

const QUESTIONS: { [K in Exclude<StepId, "result">]: Question<K> } = {
  source: {
    key: "source",
    title: "Where does your health cover come from?",
    sub: "This matters more than which state you live in: it decides which rules apply.",
    options: [
      { value: "employer", title: "Through a job", subtitle: "Yours, or a spouse's, partner's or parent's", icon: <Briefcase {...ICON} /> },
      { value: "individual", title: "A plan I bought myself", subtitle: "From HealthCare.gov, your state's marketplace or an insurer", icon: <ShoppingBag {...ICON} /> },
      { value: "medicaid", title: "Medicaid", subtitle: "Including Medi-Cal in California", icon: <HeartPulse {...ICON} /> },
      { value: "fehb", title: "A federal employee plan (FEHB)", icon: <Landmark {...ICON} /> },
      { value: "tricare", title: "TRICARE", subtitle: "Military health cover", icon: <Shield {...ICON} /> },
      { value: "none", title: "No health cover", icon: <CircleSlash {...ICON} /> },
    ],
  },
  funding: {
    key: "funding",
    title: "How is the plan funded?",
    sub: "Most people don't know offhand. The plan documents say, or HR can tell you.",
    options: [
      { value: "fully-insured", title: "Fully insured", subtitle: "The employer buys a policy from an insurer. Documents say “insured by” or “underwritten by”." },
      { value: "self-funded", title: "Self-funded or level-funded", subtitle: "The employer pays claims itself and an insurer administers them. Documents say “administered by”." },
      { value: "unsure", title: "I'm not sure", icon: <CircleHelp {...ICON} /> },
    ],
  },
  state: {
    key: "state",
    title: "Which state regulates the plan?",
    sub: "Usually the state where your employer's plan was issued, which may not be where you live.",
    options: [
      { value: "CA", title: STATE_RULES.CA.name },
      { value: "NY", title: STATE_RULES.NY.name },
      { value: "other", title: "Another state", subtitle: "We've checked California and New York so far" },
    ],
  },
  size: {
    key: "size",
    title: "How many employees does your employer have?",
    sub: "State IVF laws often apply only to larger employers' plans.",
    options: [
      { value: "large", title: `${LARGE_GROUP_MIN_EMPLOYEES} or more` },
      { value: "small", title: `${LARGE_GROUP_MIN_EMPLOYEES - 1} or fewer` },
      { value: "unsure", title: "I'm not sure", icon: <CircleHelp {...ICON} /> },
    ],
  },
  benefit: {
    key: "benefit",
    title: "Do you also have a separate fertility benefit?",
    sub: "Some employers add one through a company such as Progyny, Carrot, Maven or Kindbody.",
    options: [
      { value: "yes", title: "Yes" },
      { value: "no", title: "No" },
      { value: "unsure", title: "I'm not sure", icon: <CircleHelp {...ICON} /> },
    ],
  },
};

/** Answers that depend on an earlier one, cleared when it changes. */
const DEPENDENTS: Partial<Record<keyof CoverageAnswers, (keyof CoverageAnswers)[]>> = {
  source: ["funding", "state", "size", "benefit"],
  funding: ["state", "size"],
  state: ["size"],
};

const VERDICT_LABEL: Record<Verdict, string> = {
  required: "Required by state law",
  "plan-decides": "Your plan decides",
  unlikely: "Unlikely to be covered",
  "not-checked": "Not checked yet",
};

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function DraftNotice() {
  if (!AWAITING_US_REVIEW) return null;
  return (
    <p role="note" className="rounded-2xl bg-cream px-4 py-3 text-sm font-sans text-foreground leading-relaxed">
      <strong className="font-semibold">Draft.</strong> These rules come from our own research and
      haven&rsquo;t yet been checked by a US insurance expert. Don&rsquo;t rely on them for a
      treatment decision yet.
    </p>
  );
}

function Sources({ provenance }: { provenance: Provenance[] }) {
  const sources = provenance.flatMap((p) => p.sources);
  if (sources.length === 0) return null;
  const checked = provenance.map((p) => p.checkedOn).sort()[0];
  return (
    <div className="border-t border-border-warm pt-5">
      <h3 className="text-sm font-sans font-semibold text-foreground mb-2">Sources</h3>
      <ul className="space-y-1.5">
        {sources.map((s) => (
          <li key={s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start gap-1.5 text-sm font-sans text-teal underline underline-offset-2 hover:opacity-70"
            >
              {s.label}
              <ExternalLink className="h-3.5 w-3.5 mt-[0.2em] shrink-0" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs font-sans text-muted">Checked {formatDate(checked)}.</p>
    </div>
  );
}

function Result({ result, onReset }: { result: CoverageResult; onReset: () => void }) {
  const required = result.verdict === "required";
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-cream p-6 md:p-8 space-y-5">
        <p
          className="inline-block rounded-full px-3 py-1 text-xs font-sans font-semibold"
          style={
            required
              ? { background: "var(--accent)", color: "var(--on-accent)" }
              : { background: "var(--background)", color: "var(--teal)" }
          }
        >
          {VERDICT_LABEL[result.verdict]}
        </p>
        <h3
          className="font-sans font-bold text-teal text-balance"
          style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: 1.2 }}
        >
          {result.headline}
        </h3>
        <div className="space-y-3 font-sans text-foreground leading-relaxed" style={{ maxWidth: "68ch" }}>
          {result.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        {result.requires && (
          <div>
            <h4 className="text-sm font-sans font-semibold text-foreground mb-2">What the law requires</h4>
            <ul className="list-disc pl-5 space-y-1 font-sans text-foreground marker:text-teal">
              {result.requires.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <h4 className="text-sm font-sans font-semibold text-foreground mb-2">What to do next</h4>
          <ul className="list-disc pl-5 space-y-2 font-sans text-foreground leading-relaxed marker:text-teal" style={{ maxWidth: "68ch" }}>
            {result.nextSteps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <Sources provenance={result.provenance} />
      </div>

      <p className="text-xs font-sans text-muted leading-relaxed" style={{ maxWidth: "68ch" }}>
        This explains what the law requires of plans like yours. It isn&rsquo;t a coverage decision:
        only your insurer or plan administrator can confirm what your plan pays for.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 text-sm font-sans font-medium text-teal hover:opacity-70 transition-opacity"
      >
        <RotateCcw className="h-4 w-4" aria-hidden />
        Start again
      </button>
    </div>
  );
}

/**
 * The US coverage checker. Asks where cover comes from, then (for employer
 * plans) how it's funded, the state and employer size, and shows what the
 * law requires of a plan like that, with sources. Runs entirely in the
 * browser; nothing is sent or stored.
 */
export function CoverageChecker() {
  const [answers, setAnswers] = useState<CoverageAnswers>(EMPTY_ANSWERS);
  const [step, setStep] = useState(0);

  const steps = stepsFor(answers);
  const current = steps[Math.min(step, steps.length - 1)];
  const isResult = current === "result";
  // Only once this question is answered is it known whether another follows.
  const nextIsResult = isAnswered(current, answers) && steps[step + 1] === "result";

  const answer = <K extends keyof CoverageAnswers>(key: K, value: CoverageAnswers[K]) => {
    setAnswers((prev) => {
      const next = { ...prev, [key]: value };
      if (prev[key] !== value) for (const d of DEPENDENTS[key] ?? []) next[d] = null;
      return next;
    });
  };

  const reset = () => {
    setAnswers(EMPTY_ANSWERS);
    setStep(0);
  };

  let content: ReactNode;
  if (isResult) {
    content = <Result result={assessCoverage(answers)} onReset={reset} />;
  } else {
    const q = QUESTIONS[current] as Question<keyof CoverageAnswers>;
    content = (
      <div className="space-y-3" role="group" aria-label={q.title}>
        {q.options.map((o) => (
          <OptionCard
            key={String(o.value)}
            selected={answers[q.key] === o.value}
            onClick={() => answer(q.key, o.value)}
            title={o.title}
            subtitle={o.subtitle}
            icon={o.icon}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <DraftNotice />

      {!isResult && (
        // No "of N" and no progress bar: how many questions there are
        // depends on the answers, so any total shown up front would be wrong.
        <p className="mt-8 mb-6 text-sm font-sans text-muted text-center">Question {step + 1}</p>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.22, ease: EASE }}
          className={isResult ? "mt-8" : undefined}
        >
          {!isResult && (
            <>
              <h2
                className="font-sans font-bold text-teal mb-1 text-center text-balance"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)", lineHeight: 1.15 }}
              >
                {QUESTIONS[current].title}
              </h2>
              <p className="text-sm font-sans text-muted mb-6 leading-relaxed text-center">
                {QUESTIONS[current].sub}
              </p>
            </>
          )}
          {content}
        </motion.div>
      </AnimatePresence>

      {!isResult && (
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-border">
          <button
            type="button"
            onClick={() => setStep((p) => p - 1)}
            disabled={step === 0}
            className="flex items-center gap-1.5 text-sm font-sans text-muted hover:text-foreground disabled:opacity-0 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back
          </button>
          <button
            type="button"
            onClick={() => setStep((p) => p + 1)}
            disabled={!isAnswered(current, answers)}
            className="inline-flex items-center gap-2 rounded-full bg-teal text-on-teal px-6 py-2.5 text-sm font-sans font-medium hover:bg-accent hover:text-foreground disabled:opacity-25 transition-colors duration-200"
          >
            {nextIsResult ? "See what applies" : "Continue"}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}
