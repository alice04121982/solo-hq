"use client";

import { useState } from "react";
import { AlertTriangle, ArrowRight, CheckCircle2, Info, RotateCcw } from "lucide-react";
import Link from "next/link";
import { NATION_POLICIES, SHARED_LINES } from "@/lib/funding";

/**
 * A self-check against the criteria that NHS fertility policies have in
 * common. It deliberately does not pretend to be a decision: in England the
 * decision belongs to 36 different written policies we cannot read from here,
 * so the honest output is "here is what usually blocks people, here is what
 * usually gates them, go and read your policy".
 *
 * Two situations (a solo dad, or two dads, who need an egg donor and a
 * surrogate) skip the criteria questions altogether, because the route is
 * self-funded outside Scotland and no criterion changes that. Shared facts
 * come from SHARED_LINES in src/lib/funding.ts rather than being retyped.
 */

const TEAL = "var(--teal)";
const TEAL_SOFT = "rgba(0, 83, 83, 0.6)";

type Field = "nation" | "situation" | "age" | "children" | "smoking" | "bmi" | "inseminations";

interface Option {
  value: string;
  label: string;
}

interface Question {
  id: Field;
  /** A function where the wording depends on who the treatment is for. */
  label: string | ((a: Answers) => string);
  help?: string;
  /** A function where the choices depend on who the treatment is for. */
  options: Option[] | ((a: Answers) => Option[]);
  /** Only asked when the answers so far make it relevant. */
  when?: (a: Answers) => boolean;
}

type Answers = Partial<Record<Field, string>>;

/** True once we know there is nobody else in the picture. */
function isSolo(a: Answers) {
  return a.situation === "solo";
}

/** Solo dads and two dads: an egg donor and a surrogate are needed. */
function isSurrogacy(a: Answers) {
  return a.situation === "solo-surrogacy" || a.situation === "two-men";
}

/** The criteria questions only apply once we know surrogacy is not the route. */
function criteriaApply(a: Answers) {
  return a.situation !== undefined && !isSurrogacy(a);
}

const QUESTIONS: Question[] = [
  {
    id: "nation",
    label: "Where do you live?",
    help: "This is the single biggest factor. England has no national policy: 36 local boards (down from 42 after the April 2026 mergers) each set their own.",
    options: [
      { value: "england", label: "England" },
      { value: "scotland", label: "Scotland" },
      { value: "wales", label: "Wales" },
      { value: "northern-ireland", label: "Northern Ireland" },
    ],
  },
  {
    id: "situation",
    label: "Who is the treatment for?",
    options: [
      { value: "solo", label: "Me, on my own (I would carry)" },
      { value: "two-women", label: "Two women" },
      { value: "mixed", label: "A man and a woman" },
      { value: "solo-surrogacy", label: "Me, on my own (I need an egg donor and a surrogate)" },
      { value: "two-men", label: "Two men" },
    ],
  },
  {
    id: "age",
    label: "Age of the person who would carry",
    help: SHARED_LINES.ageAtTreatment,
    when: criteriaApply,
    options: [
      { value: "under-35", label: "Under 35" },
      { value: "35-39", label: "35–39" },
      { value: "40-41", label: "40–41" },
      { value: "42", label: "42" },
      { value: "43-plus", label: "43 or over" },
    ],
  },
  {
    id: "children",
    label: (a) =>
      isSolo(a) ? "Do you already have a living child?" : "Does either of you already have a living child?",
    help: "Most policies count a partner's children, children living elsewhere, and adopted children.",
    when: criteriaApply,
    options: (a) =>
      isSolo(a)
        ? [
            { value: "no", label: "No" },
            { value: "yes", label: "Yes" },
          ]
        : [
            { value: "no", label: "No" },
            { value: "one-free", label: "Yes, but one of us has no children" },
            { value: "both", label: "Yes, both of us have children" },
          ],
  },
  {
    id: "smoking",
    label: (a) => (isSolo(a) ? "Do you smoke or vape?" : "Does either of you smoke or vape?"),
    when: criteriaApply,
    options: [
      { value: "no", label: "No" },
      { value: "yes", label: "Yes" },
    ],
  },
  {
    id: "bmi",
    label: "Is your BMI between 19 and 30?",
    help: "The most common range, though some policies are wider or narrower.",
    when: criteriaApply,
    options: [
      { value: "in-range", label: "Yes" },
      { value: "outside", label: "No" },
      { value: "unsure", label: "Not sure" },
    ],
  },
  {
    id: "inseminations",
    label: "How many donor insemination cycles have you had at a licensed UK clinic?",
    help: SHARED_LINES.homeInsemination,
    when: (a) => a.situation === "solo" || a.situation === "two-women",
    options: [
      { value: "none", label: "None" },
      { value: "1-5", label: "One to five" },
      { value: "6-plus", label: "Six or more" },
    ],
  },
];

type Verdict = "unlikely" | "conditional" | "worth-pursuing" | "self-funded";

interface Result {
  verdict: Verdict;
  blockers: string[];
  conditions: string[];
  steps: string[];
  /** Where to go next; defaults to the clinic finder. */
  next: { href: string; label: string };
}

const FIND_CLINICS = { href: "/get-started", label: "Find clinics that treat your family type" };

const VERDICT_COPY: Record<Verdict, { title: string; body: string }> = {
  unlikely: {
    title: "Unlikely on the criteria most policies use",
    body: "One or more of your answers is a criterion that NHS policies apply strictly. That does not always mean no (some of these change, and some are worth challenging), but plan on funding treatment another way while you check.",
  },
  conditional: {
    title: "Possible, with a condition to clear first",
    body: "Nothing in your answers rules you out, but there is a requirement standing between you and a funding decision. What it costs you to clear it is the thing to work out before anything else.",
  },
  "worth-pursuing": {
    title: "Worth pursuing: start with your GP",
    body: "Nothing in your answers matches the criteria that usually exclude people. The remaining question is what your local policy actually commissions, which is written down and which you can read.",
  },
  "self-funded": {
    title: "Self-funded, with one exception in Scotland",
    body: SHARED_LINES.surrogacy,
  },
};

function nationCycles(nation: string | undefined): string | null {
  return NATION_POLICIES.find((n) => n.slug === nation)?.cycles ?? null;
}

/**
 * Solo dads and two dads. No criterion question is asked because none changes
 * the answer outside Scotland. Grant eligibility is the Fertility Foundation's
 * own published list (fertilityfoundation.org/ivf-grants, read 13 September
 * 2026), which names male couples but not single men.
 */
function evaluateSurrogacy(a: Answers): Result {
  const twoMen = a.situation === "two-men";
  const conditions: string[] = [];
  const steps: string[] = [];

  if (a.nation === "scotland") {
    conditions.push(
      twoMen
        ? "NHS Lothian's Edinburgh Fertility Centre offers an NHS surrogacy service to male couples. Other health boards may refer to it; ask yours."
        : `${SHARED_LINES.scotlandSingle} NHS Lothian's Edinburgh Fertility Centre describes its NHS surrogacy service as being for male couples.`,
    );
  }
  conditions.push(
    twoMen
      ? "The Fertility Foundation grant (up to £3,000) is open to male couples. It does not cover surrogacy costs, only treatment."
      : "The Fertility Foundation does not list single men among the applicants eligible for its grant.",
  );
  conditions.push(
    "Surrogates' expenses in the UK are typically £10,000 to £15,000 (HFEA), on top of egg donation, IVF and legal fees.",
  );

  if (a.nation === "scotland" && twoMen) {
    steps.push("Ask your GP for a referral and ask your health board what its surrogacy pathway is.");
  }
  steps.push("Check your employer's benefits before paying for anything privately; many schemes cover surrogacy-related treatment.");
  steps.push("Get itemised quotes for egg donation and IVF from more than one clinic, and ask what happens if a cycle is cancelled.");

  return {
    verdict: "self-funded",
    blockers: [],
    conditions,
    steps,
    next: twoMen
      ? { href: "/families/same-sex-male", label: "The two-dads guide: surrogacy, cost and legal parenthood" }
      : { href: "/families/single-dad", label: "The solo-dad guide: surrogacy, cost and legal parenthood" },
  };
}

function evaluate(a: Answers): Result {
  if (isSurrogacy(a)) return evaluateSurrogacy(a);

  const blockers: string[] = [];
  const conditions: string[] = [];
  const steps: string[] = [];

  const solo = a.situation === "solo";
  const twoWomen = a.situation === "two-women";
  const donorRoute = solo || twoWomen;

  const niChildren =
    "Northern Ireland's published criteria do not include a rule on existing children. Check your local criteria.";

  if (a.age === "43-plus") {
    blockers.push("NHS policies across the UK do not fund IVF from age 43.");
  }
  if (a.age === "42") {
    if (a.nation === "england") {
      blockers.push(
        "From 42, NICE does not recommend NHS-funded IVF on cost-effectiveness grounds, and virtually no policy funds it.",
      );
    } else if (a.nation === "scotland" || a.nation === "wales") {
      conditions.push(
        "In Scotland and Wales, one cycle may be funded at 40–42 if you have not had IVF before and there is no evidence of low ovarian reserve.",
      );
    } else if (a.nation === "northern-ireland") {
      conditions.push(
        "In Northern Ireland, one cycle may be funded at 40–42 if you have not had IVF before and there is no evidence of low ovarian reserve.",
      );
    }
  }

  if (a.children === "yes" || a.children === "both") {
    if (a.nation === "northern-ireland") {
      conditions.push(niChildren);
    } else if (a.nation === "wales" && a.children === "both") {
      conditions.push(
        "Wales requires that you have no children together or one of you has none. If any of your children are together, you will not qualify.",
      );
    } else if (a.nation === "scotland" && a.children === "both") {
      blockers.push("In Scotland, couples where both partners already have a child are not currently eligible.");
    } else {
      blockers.push(
        "Almost every policy requires that you (and a partner, if you have one) have no living child. That includes children from a previous relationship, children living elsewhere, and adopted children.",
      );
    }
  }
  if (a.children === "one-free") {
    if (a.nation === "england") {
      blockers.push(SHARED_LINES.partnersChild);
    } else if (a.nation === "scotland") {
      conditions.push("Scotland only requires one partner to have no living biological child.");
    } else if (a.nation === "wales") {
      conditions.push("Wales requires that you have no children together or one of you has none.");
    } else if (a.nation === "northern-ireland") {
      conditions.push(niChildren);
    }
  }

  if (solo && a.nation === "scotland") {
    blockers.push(SHARED_LINES.scotlandSingle);
  }
  if (a.nation === "scotland" && !solo && !twoWomen) {
    conditions.push("In Scotland, couples must have lived together for at least two years.");
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
      "Find out your BMI before your GP appointment. It is checked against the policy range at the point treatment starts.",
    );
  }

  if (a.age === "40-41") {
    conditions.push(
      `At 40 or 41, NICE recommends a single full cycle and only where there has been no previous IVF. ${SHARED_LINES.ageAtTreatment}`,
    );
  }

  const cycles = nationCycles(a.nation);
  if (cycles) {
    conditions.push(a.nation === "england" ? `In England there is no national entitlement. ${cycles}` : cycles);
  }
  if (a.nation === "wales" && solo) {
    conditions.push("Wales funds treatment for single women as well as couples.");
  }

  if (donorRoute) {
    if (a.nation === "scotland") {
      if (twoWomen) {
        conditions.push(
          "NHS Scotland funds donor insemination and then IVF for female couples who have lived together for at least two years. The national criteria refer to six to eight insemination cycles; check the number with your health board.",
        );
      }
    } else if (a.inseminations === "6-plus") {
      conditions.push(
        "You have likely already met the insemination requirement most policies impose. Make sure your clinic's written record of every cycle goes with your referral.",
      );
    } else {
      conditions.push(SHARED_LINES.diRequirement);
    }
  }

  if (solo && a.nation === "england") {
    conditions.push(
      `Solo parents are not usually excluded by name in England; the insemination requirement is the clause to read in your ICB's policy. ${SHARED_LINES.nhsFundedByFamilyType}`,
    );
  }

  steps.push(
    a.nation === "england"
      ? "Find your Integrated Care Board by postcode and download its assisted conception policy: the full document, not a summary page."
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
      "Ask for any refusal in writing, with the specific criterion you failed. Policies are reviewed periodically, and there is an Individual Funding Request route for genuinely unusual clinical circumstances.",
    );
  }
  steps.push("Whatever the answer, check your employer's benefits before paying for anything privately.");

  const verdict: Verdict =
    blockers.length > 0
      ? "unlikely"
      : donorRoute && a.nation !== "scotland" && a.inseminations !== "6-plus"
        ? "conditional"
        : "worth-pursuing";

  return { verdict, blockers, conditions, steps, next: FIND_CLINICS };
}

/** Answers to questions no longer on screen would skew the result; drop them. */
function pruneHidden(next: Answers): Answers {
  for (const q of QUESTIONS) {
    if (q.when && !q.when(next)) delete next[q.id];
  }
  return next;
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
              {(typeof q.options === "function" ? q.options(answers) : q.options).map((o) => (
                <Chip
                  key={o.value}
                  selected={answers[q.id] === o.value}
                  onClick={() =>
                    setAnswers((prev) => {
                      const next: Answers = { ...prev, [q.id]: o.value };
                      // Solo and couple applicants get different children
                      // options, so drop an answer the new list no longer offers.
                      if (q.id === "situation" && next.children) {
                        const childrenQ = QUESTIONS.find((x) => x.id === "children");
                        const opts = childrenQ
                          ? typeof childrenQ.options === "function"
                            ? childrenQ.options(next)
                            : childrenQ.options
                          : [];
                        if (!opts.some((x) => x.value === next.children)) {
                          delete next.children;
                        }
                      }
                      return pruneHidden(next);
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
              {result.verdict === "unlikely" || result.verdict === "self-funded" ? (
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
              href={result.next.href}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-sans font-medium transition-opacity hover:opacity-90"
              style={{ background: "var(--accent)", color: "var(--on-accent)" }}
            >
              {result.next.label}
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
