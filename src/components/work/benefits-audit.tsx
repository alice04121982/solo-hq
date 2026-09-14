"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { HR_FIRST_EMAIL } from "@/lib/work";

const TEAL = "var(--teal)";
const TEAL_SOFT = "rgba(0, 83, 83, 0.6)";

type Variant = "short" | "hr" | "recruiter";

const VARIANTS: { value: Variant; label: string; heading: string; note: string }[] = [
  {
    value: "short",
    label: "A quick first ask",
    heading: "Email to send HR",
    note: "You do not need to say why you are asking.",
  },
  {
    value: "hr",
    label: "The full questions, to HR",
    heading: "Email to send HR",
    note: "Asking about a benefit is not the same as invoking it. Send it like any other benefits question.",
  },
  {
    value: "recruiter",
    label: "The full questions, to a recruiter",
    heading: "Email to send the recruiter",
    note: "Asking before you sign is not a declaration that you will use the benefit.",
  },
];

/**
 * Five questions separate a benefit that will pay for treatment from one
 * that will not. The eligibility question names every family type, so the
 * email says nothing about the sender's own situation whichever version
 * they send. UK only.
 */
const QUESTIONS = [
  "What support is available: a contribution, a fund, treatment cover, paid leave, or a support platform? Is anything included through the private medical scheme?",
  "What is inside it: are medication, donor sperm or eggs, storage and frozen transfers covered, or charged separately?",
  "Is it open to solo parents, same-sex couples and people using donor sperm or eggs?",
  "Does treatment have to be at a partner clinic, is there a qualifying period, and what happens if I leave part-way through treatment?",
  "Is treatment-related absence recorded separately from sickness absence, and is time off for appointments paid?",
];

function buildEmail(variant: Variant): string {
  if (variant === "short") return HR_FIRST_EMAIL;

  const recruiter = variant === "recruiter";
  const opening = recruiter
    ? "Before I confirm, could you send me the benefits documentation, including anything on fertility and family forming, and confirm the following?"
    : "I'm going through our benefits package properly and wanted to ask about fertility and family-forming support. Could you point me to the written policy, and confirm the following?";
  const closing = recruiter
    ? "The policy document itself would be ideal, rather than a summary."
    : "A copy of the policy document itself would be ideal, rather than the intranet summary.";

  return [
    recruiter ? "Hello [Name]," : "Hello,",
    "",
    opening,
    "",
    ...QUESTIONS.map((q, i) => `${i + 1}. ${q}`),
    "",
    closing,
    "",
    "Thanks very much.",
  ].join("\n");
}

export function BenefitsAudit() {
  const [variant, setVariant] = useState<Variant>("short");
  const current = VARIANTS.find((v) => v.value === variant) ?? VARIANTS[0];
  const email = buildEmail(variant);

  return (
    <div className="rounded-2xl border p-6 md:p-10" style={{ borderColor: "var(--border)" }}>
      <p className="font-sans font-bold text-base mb-3" style={{ color: TEAL }}>
        Which email?
      </p>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Email versions">
        {VARIANTS.map((v) => {
          const selected = v.value === variant;
          return (
            <button
              key={v.value}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setVariant(v.value)}
              className="rounded-full border px-4 py-2 text-sm font-sans transition-colors duration-150"
              style={
                selected
                  ? { background: TEAL, borderColor: TEAL, color: "#FFFFFF" }
                  : { borderColor: "var(--border)", color: TEAL, background: "var(--background)" }
              }
            >
              {v.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl p-5 md:p-6" style={{ background: "var(--lime)" }}>
        <div className="flex items-center justify-between gap-3 mb-4">
          <p
            className="inline-flex items-center gap-2 text-[12px] font-[700] uppercase tracking-[0.14em] font-sans"
            style={{ color: TEAL_SOFT }}
          >
            <Mail className="h-3.5 w-3.5" />
            {current.heading}
          </p>
          <CopyButton text={email} />
        </div>
        <pre
          className="text-[15px] font-sans leading-relaxed whitespace-pre-wrap"
          style={{ color: TEAL, fontFamily: "inherit" }}
        >
          {email}
        </pre>
      </div>

      <p className="text-[13px] font-sans leading-relaxed text-muted mt-5" style={{ maxWidth: "70ch" }}>
        {current.note}
      </p>
    </div>
  );
}
