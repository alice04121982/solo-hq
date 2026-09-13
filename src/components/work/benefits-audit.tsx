"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import type { AuditStep } from "@/lib/work";

const TEAL = "var(--teal)";
const TEAL_SOFT = "rgba(0, 83, 83, 0.6)";

type Situation = "solo" | "same-sex" | "couple" | "unsaid";

const SITUATIONS: { value: Situation; label: string }[] = [
  { value: "solo", label: "On my own" },
  { value: "same-sex", label: "A same-sex couple" },
  { value: "couple", label: "A mixed-sex couple" },
  { value: "unsaid", label: "Rather not say" },
];

/**
 * The email is the point of this component. Everyone knows they should "ask
 * HR"; almost nobody knows which questions separate a benefit that will pay
 * for treatment from one that will not, and asking them in writing is what
 * makes the answers usable later.
 *
 * UK only. The same questions go to HR or, with a different opening, to a
 * recruiter at offer stage. Questions are numbered as they are added, so the
 * list never skips a number. It never states that the reader is in treatment,
 * whatever they select.
 */
function buildEmail(situation: Situation, applying: boolean): string {
  const questions: string[] = [
    "What support is available: a contribution, a fund, treatment cover, paid leave, or access to a support platform?",
    "Is anything included via the private medical scheme separately from the standard benefits list?",
    "What is inside the benefit: are medication, donor sperm or eggs, storage and frozen transfers covered, or charged separately?",
    "Does treatment have to be at a partner clinic?",
    "Is there a qualifying period, or is the benefit available immediately?",
    "What happens to the benefit if I leave part-way through a course of treatment?",
  ];

  if (situation !== "unsaid") {
    const who =
      situation === "solo"
        ? "someone building a family on their own"
        : situation === "same-sex"
          ? "same-sex couples"
          : "couples using donor sperm or eggs";
    questions.push(
      `Is the eligibility wording written around family building rather than an infertility diagnosis? In other words, does it cover ${who}?`,
    );
  }

  questions.push(
    "Is treatment-related absence recorded separately from ordinary sickness absence, and is time off for appointments paid?",
  );

  const opening = applying
    ? [
        "Hello [Name],",
        "",
        "Before I confirm, could you send me the benefits documentation, including anything on fertility and family forming, and confirm the following?",
      ]
    : [
        "Hello,",
        "",
        "I'm going through our benefits package properly and wanted to ask about fertility and family-forming support. Could you point me to the written policy, and confirm the following?",
      ];

  const closing = applying
    ? "The policy document itself would be ideal, rather than a summary."
    : "A copy of the policy document itself would be ideal, rather than the intranet summary.";

  return [
    ...opening,
    "",
    ...questions.map((q, i) => `${i + 1}. ${q}`),
    "",
    closing,
    "",
    "Thanks very much.",
  ].join("\n");
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

export function BenefitsAudit({ steps }: { steps: AuditStep[] }) {
  const [situation, setSituation] = useState<Situation>("unsaid");
  const [applying, setApplying] = useState(false);

  const email = buildEmail(situation, applying);

  return (
    <div className="rounded-2xl border p-6 md:p-10" style={{ borderColor: "var(--border)" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="font-sans font-bold text-base mb-1" style={{ color: TEAL }}>
            Who are you building a family as?
          </p>
          <p className="text-[13px] font-sans text-muted mb-3">
            Only changes the eligibility question in the email. Nothing here is sent anywhere.
          </p>
          <div className="flex flex-wrap gap-2">
            {SITUATIONS.map((s) => (
              <Chip key={s.value} selected={situation === s.value} onClick={() => setSituation(s.value)}>
                {s.label}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <p className="font-sans font-bold text-base mb-1" style={{ color: TEAL }}>
            Applying for a job?
          </p>
          <p className="text-[13px] font-sans text-muted mb-3">
            Swaps the opening line for one you can send a recruiter before you sign. Asking about a
            benefit is not a declaration that you will use it.
          </p>
          <div className="flex flex-wrap gap-2">
            <Chip selected={!applying} onClick={() => setApplying(false)}>
              No, asking HR
            </Chip>
            <Chip selected={applying} onClick={() => setApplying(true)}>
              Yes, asking a recruiter
            </Chip>
          </div>
        </div>
      </div>

      {/* The checklist */}
      <div className="mt-10 pt-8 border-t" style={{ borderColor: "var(--border)" }}>
        <p className="text-[12px] font-[700] uppercase tracking-[0.14em] mb-5 font-sans" style={{ color: TEAL_SOFT }}>
          Work through these in order
        </p>
        <ol className="space-y-5">
          {steps.map((s, i) => (
            <li key={s.title} className="flex items-start gap-4">
              <span className="text-[12px] font-[700] font-sans mt-1 shrink-0" style={{ color: TEAL_SOFT }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-sans font-bold text-[15px] mb-1" style={{ color: TEAL }}>
                  {s.title}
                </p>
                <p className="text-[14px] font-sans leading-relaxed text-muted" style={{ maxWidth: "66ch" }}>
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* The email */}
      <div className="mt-10 rounded-2xl p-5 md:p-6" style={{ background: "var(--lime)" }}>
        <div className="flex items-center justify-between gap-3 mb-4">
          <p
            className="inline-flex items-center gap-2 text-[12px] font-[700] uppercase tracking-[0.14em] font-sans"
            style={{ color: TEAL_SOFT }}
          >
            <Mail className="h-3.5 w-3.5" />
            {applying ? "Email to send the recruiter" : "Email to send HR"}
          </p>
          <CopyButton text={email} />
        </div>
        <pre
          className="text-[14px] font-sans leading-relaxed whitespace-pre-wrap"
          style={{ color: TEAL, fontFamily: "inherit" }}
        >
          {email}
        </pre>
      </div>

      <p className="text-[13px] font-sans leading-relaxed text-muted mt-5" style={{ maxWidth: "70ch" }}>
        The email says nothing about your own plans, and asking about a benefit is not the same as
        invoking it. Send it like any other benefits question.
      </p>
    </div>
  );
}
