"use client";

import { useState } from "react";
import { AlertTriangle, ArrowRight, CheckCircle2, Info, RotateCcw } from "lucide-react";
import Link from "next/link";

/**
 * A self-check against the criteria that NHS fertility policies have in
 * common. It deliberately does not pretend to be a decision: in England the
 * decision belongs to 42 different written policies we cannot read from here,
 * so the honest output is "here is what usually blocks people, here is what
 * usually gates them, go and read your policy".
 */

const TEAL = "var(--teal)";
const TEAL_SOFT = "rgba(0, 83, 83, 0.6)";

type Field = "nation" | "age" | "children" | "situation" | "smoking" | "bmi" | "inseminations";

interface Question {
  id: Field;
  /** A function where the wording depends on who the treatment is for. */
  label: string | ((a: Answers) => string);
  help?: string;
  options: { value: string; label: string }[];
  /** Only asked when the answers so far make it relevant. */
  when?: (a: Answers) => boolean;
}

type Answers = Partial<Record<Field, string>>;

/** True once we know there is nobody else in the picture. */
function isSolo(a: Answers) {
  return a.situation === "solo";
}

const QUESTIONS: Question[] = [
  {
    id: "nation",
    label: "Where do you live?",
    help: "This is the single biggest factor. England has no national policy — 36 local boards (down from 42 after the April 2026 mergers) each set their own.",
    options: [
      { value: "england", label: "England" },
      { value: "scotland", label: "Scotland" },
      { value: "wales", label: "Wales" },
      { value: "northern-ireland", label: "Northern Ireland" },
    ],
  },
  {
    id: "age",
    label: "Age of the person who would carry",
    help: "Policies apply the limit when treatment starts, not when you are referred.",
    options: [
      { value: "under-35", label: "Under 35" },
      { value: "35-39", label: "35–39" },
      { value: "40-41", label: "40–41" },
      { value: "42-plus", label: "42 or over" },
    ],
  },
  {
    id: "situation",
    label: "Who is the treatment for?",
    options: [
      { value: "solo", label: "Me, on my own" },
      { value: "two-women", label: "Two women" },
      { value: "mixed", label: "A man and a woman" },
      { value: "other", label: "Something else" },
    ],
  },
  {
    id: "children",
    label: (a) =>
      isSolo(a) ? "Do you already have a living child?" : "Does either of you already have a living child?",
    help: "Most policies count a partner's children, children living elsewhere, and adopted children.",
    options: [
      { value: "no", label: "No" },
      { value: "yes", label: "Yes" },
    ],
  },
  {
    id: "smoking",
    label: (a) => (isSolo(a) ? "Do you smoke or vape?" : "Does either of you smoke or vape?"),
    options: [
      { value: "no", label: "No" },
      { value: "yes", label: "Yes" },
    ],
  },
  {
    id: "bmi",
    label: "Is your BMI between 19 and 30?",
    help: "The most common range, though some policies are wider or narrower.",
    options: [
      { value: "in-range", label: "Yes" },
      { value: "outside", label: "No" },
      { value: "unsure", label: "Not sure" },
    ],
  },
  {
    id: "inseminations",
    label: "How many donor insemination cycles have you had at a licensed UK clinic?",
    help: "Home insemination and unlicensed arrangements are generally not counted, and carry legal-parenthood consequences too.",
    when: (a) => a.situation === "solo" || a.situation === "two-women",
    options: [
      { value: "none", label: "None" },
      { value: "1-5", label: "One to five" },
      { value: "6-plus", label: "Six or more" },
    ],
  },
];

type Verdict = "unlikely" | "conditional" | "worth-pursuing";

interface Result {
  verdict: Verdict;
  blockers: string[];
  conditions: string[];
  steps: string[];
}

const VERDICT_COPY: Record<Verdict, { title: string; body: string }> = {
  unlikely: {
    title: "Unlikely on the criteria most policies use",
    body: "One or more of your answers is a criterion that NHS policies apply strictly. That does not always mean no — some of these change, and some are worth challenging — but plan on funding treatment another way while you check.",
  },
  conditional: {
    title: "Possible, with a condition to clear first",
    body: "Nothing in your answers rules you out, but there is a requirement standing between you and a funding decision. What it costs you to clear it is the thing to work out before anything else.",
  },
  "worth-pursuing": {
    title: "Worth pursuing — start with your GP",
    body: "Nothing in your answers matches the criteria that usually exclude people. The remaining question is what your local policy actually commissions, which is written down and which you can read.",
  },
};

function evaluate(a: Answers): Result {
  const blockers: string[] = [];
  const conditions: string[] = [];
  const steps: string[] = [];

  const solo = a.situation === "solo";
  const twoWomen = a.situation === "two-women";
  const donorRoute = solo || twoWomen || a.situation === "other";

  if (a.age === "42-plus") {
    blockers.push(
      "From 42, NICE does not recommend NHS-funded IVF on cost-effectiveness grounds, and virtually no policy funds it.",
    );
  }
  if (a.children === "yes") {
    blockers.push(
      "Almost every policy requires that you — and a partner, if you have one — have no living child. That includes children from a previous relationship, children living elsewhere, and adopted children.",
    );
  }
  if (a.smoking === "yes") {
    blockers.push(
      "Non-smoking is a near-universal criterion, often for a stated period before treatment, and many policies now treat vaping the same way.",
    );
  }
  if (a.bmi === "outside") {
    blockers.push(
      "A BMI range, usually 19–30, is applied by most policies and is reassessed before treatment starts rather than at referral.",
    );
  }
  if (a.bmi === "unsure") {
    conditions.push(
      "Find out your BMI before your GP appointment — it is checked against the policy range at the point treatment starts, so it is worth knowing early.",
    );
  }

  if (a.age === "40-41") {
    conditions.push(
      "At 40 or 41, NICE recommends a single full cycle and only where there has been no previous IVF. Time matters more than anything else here: the limit applies when treatment begins.",
    );
  }

  if (a.nation === "england") {
    conditions.push(
      "In England there is no national entitlement. Your Integrated Care Board decides, most fund one cycle rather than the three NICE recommends, and a few fund none.",
    );
  }
  if (a.nation === "scotland") {
    conditions.push(
      "Scotland applies national criteria and funds up to three cycles, so eligibility is far more predictable than in England.",
    );
  }
  if (a.nation === "wales") {
    conditions.push(
      "Wales applies national criteria, funds two cycles, and provides treatment to single women as well as couples.",
    );
  }
  if (a.nation === "northern-ireland") {
    conditions.push(
      "Northern Ireland funds one full cycle for eligible women under 40, under national criteria — since the 2024 expansion that includes transferring all frozen embryos from the cycle.",
    );
  }

  if (donorRoute) {
    if (a.nation === "scotland") {
      conditions.push(
        "Scotland is the most inclusive route in the UK for donor insemination: NHS-funded DI cycles, commonly up to six, before IVF is considered.",
      );
    } else if (a.inseminations === "6-plus") {
      conditions.push(
        "You have likely already met the insemination requirement most policies impose. Make sure your clinic's written record of every cycle goes with your referral.",
      );
    } else {
      conditions.push(
        "Expect to be asked for six or more donor insemination cycles at a licensed clinic before IVF funding is considered — and outside Scotland you will usually be paying for those cycles, and for the donor sperm, yourself.",
      );
    }
  }

  if (solo && a.nation === "england") {
    conditions.push(
      "Solo parents are not usually excluded by name in England. The insemination requirement is what excludes most of them in practice, so read that clause of your ICB's policy specifically.",
    );
  }

  steps.push(
    a.nation === "england"
      ? "Find your Integrated Care Board by postcode and download its assisted conception policy — the full document, not a summary page."
      : "Read the national access criteria for your nation and note the version date.",
  );
  steps.push(
    "Book a GP appointment, ask for fertility investigations and a referral, and say plainly which criteria you meet.",
  );
  if (donorRoute && a.nation !== "scotland") {
    steps.push(
      "Price the insemination requirement before you commit to it: six licensed cycles with donor sperm is a substantial cost, and it may be better spent on IVF directly.",
    );
  }
  if (blockers.length > 0) {
    steps.push(
      "Ask for any refusal in writing, with the specific criterion you failed — policies are reviewed periodically, and there is an Individual Funding Request route for genuinely unusual clinical circumstances.",
    );
  }
  steps.push("Whatever the answer, check your employer's benefits before paying for anything privately.");

  const verdict: Verdict =
    blockers.length > 0
      ? "unlikely"
      : donorRoute && a.nation !== "scotland" && a.inseminations !== "6-plus"
        ? "conditional"
        : "worth-pursuing";

  return { verdict, blockers, conditions, steps };
}

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className="rounded-full border px-4 py-2 text-sm font-sans transition-colors duration-150"
      style={
        selected
          ? { background: TEAL, borderColor: TEAL, color: "#FFFFFF" }
          : { borderColor: "var(--border)", color: TEAL, background: "var(--background)" }
      }
    >
      {children}
    </button>
  );
}

export function NHSEligibilityChecker() {
  const [answers, setAnswers] = useState<Answers>({});

  const visible = QUESTIONS.filter((q) => !q.when || q.when(answers));
  const answered = visible.every((q) => answers[q.id]);
  const result = answered ? evaluate(answers) : null;

  return (
    <div className="rounded-2xl border p-6 md:p-10" style={{ borderColor: "var(--border)" }}>
      <div className="space-y-8">
        {visible.map((q, i) => (
          <fieldset key={q.id}>
            <legend className="mb-1">
              <span className="text-[12px] font-[700] font-sans mr-2" style={{ color: TEAL_SOFT }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-sans font-bold text-base" style={{ color: TEAL }}>
                {typeof q.label === "function" ? q.label(answers) : q.label}
              </span>
            </legend>
            {q.help && (
              <p className="text-[14px] font-sans leading-relaxed text-muted mb-3" style={{ maxWidth: "62ch" }}>
                {q.help}
              </p>
            )}
            <div className="flex flex-wrap gap-2 mt-3">
              {q.options.map((o) => (
                <Chip
                  key={o.value}
                  selected={answers[q.id] === o.value}
                  onClick={() =>
                    setAnswers((prev) => {
                      const next = { ...prev, [q.id]: o.value };
                      // Changing who the treatment is for can retire the
                      // insemination question, and a stale answer to a
                      // question no longer on screen would skew the result.
                      if (q.id === "situation" && !(o.value === "solo" || o.value === "two-women")) {
                        delete next.inseminations;
                      }
                      return next;
                    })
                  }
                >
                  {o.label}
                </Chip>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      {!result && (
        <p className="text-[14px] font-sans text-muted mt-8 flex items-start gap-2">
          <Info className="h-4 w-4 shrink-0 mt-0.5" style={{ color: TEAL_SOFT }} />
          Answer every question to see what the criteria most policies share would say about your situation.
        </p>
      )}

      {result && (
        <div className="mt-10 pt-8 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="rounded-2xl p-6 md:p-8" style={{ background: "var(--lime)" }}>
            <p
              className="inline-flex items-center gap-2 text-[12px] font-[700] uppercase tracking-[0.14em] mb-3 font-sans"
              style={{ color: TEAL_SOFT }}
            >
              {result.verdict === "unlikely" ? (
                <AlertTriangle className="h-3.5 w-3.5" />
              ) : (
                <CheckCircle2 className="h-3.5 w-3.5" />
              )}
              What this suggests
            </p>
            <h3 className="font-sans font-bold text-xl md:text-2xl mb-3" style={{ color: TEAL }}>
              {VERDICT_COPY[result.verdict].title}
            </h3>
            <p
              className="text-[15px] font-sans leading-relaxed"
              style={{ color: "rgba(0, 83, 83, 0.75)", maxWidth: "64ch" }}
            >
              {VERDICT_COPY[result.verdict].body}
            </p>
          </div>

          {result.blockers.length > 0 && (
            <div className="mt-8">
              <p className="text-[12px] font-[700] uppercase tracking-[0.14em] mb-4 font-sans" style={{ color: TEAL_SOFT }}>
                Criteria your answers run into
              </p>
              <ul className="space-y-3">
                {result.blockers.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "var(--lavender-dark)" }} />
                    <p className="text-[15px] font-sans leading-relaxed text-muted">{b}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.conditions.length > 0 && (
            <div className="mt-8">
              <p className="text-[12px] font-[700] uppercase tracking-[0.14em] mb-4 font-sans" style={{ color: TEAL_SOFT }}>
                What applies where you live
              </p>
              <ul className="space-y-3">
                {result.conditions.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: TEAL, opacity: 0.45 }} />
                    <p className="text-[15px] font-sans leading-relaxed text-muted">{c}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8">
            <p className="text-[12px] font-[700] uppercase tracking-[0.14em] mb-4 font-sans" style={{ color: TEAL_SOFT }}>
              What to do next
            </p>
            <ol className="space-y-3">
              {result.steps.map((s, i) => (
                <li key={s} className="flex items-start gap-3">
                  <span className="text-[12px] font-[700] font-sans mt-1 shrink-0" style={{ color: TEAL_SOFT }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[15px] font-sans leading-relaxed text-muted">{s}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/get-started"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-sans font-medium transition-opacity hover:opacity-90"
              style={{ background: "var(--accent)", color: "#1A3A25" }}
            >
              Find clinics that treat your family type
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <button
              type="button"
              onClick={() => setAnswers({})}
              className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-sans transition-colors hover:bg-surface-hover"
              style={{ borderColor: "var(--border)", color: TEAL }}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Start again
            </button>
          </div>

          <p className="text-[13px] font-sans leading-relaxed text-muted mt-6" style={{ maxWidth: "70ch" }}>
            This is a guide to the criteria NHS fertility policies have in common, not a decision and not
            medical advice. The only thing that decides your case is the written policy in force where you
            live, applied by the service you are referred to.
          </p>
        </div>
      )}
    </div>
  );
}
