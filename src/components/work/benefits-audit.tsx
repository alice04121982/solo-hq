"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import type { AuditStep } from "@/lib/work";

const TEAL = "var(--teal)";
const TEAL_SOFT = "rgba(0, 83, 83, 0.6)";

type Market = "uk" | "ireland" | "europe" | "usa";
type Situation = "solo" | "same-sex" | "couple" | "unsaid";

const MARKETS: { value: Market; label: string }[] = [
  { value: "uk", label: "United Kingdom" },
  { value: "ireland", label: "Ireland" },
  { value: "europe", label: "Elsewhere in Europe" },
  { value: "usa", label: "United States" },
];

const SITUATIONS: { value: Situation; label: string }[] = [
  { value: "solo", label: "On my own" },
  { value: "same-sex", label: "A same-sex couple" },
  { value: "couple", label: "A mixed-sex couple" },
  { value: "unsaid", label: "Rather not say" },
];

/**
 * The email is the point of this component. Everyone knows they should "ask
 * HR"; almost nobody knows which six questions separate a benefit that will
 * pay for treatment from one that will not — and asking them in writing is
 * what makes the answers usable later.
 *
 * It never states that the reader is in treatment, whatever they select.
 */
function buildEmail(market: Market, situation: Situation): string {
  const lines: string[] = [
    "Hello,",
    "",
    "I'm going through our benefits package properly and wanted to ask about fertility and family-forming support. Could you point me to the written policy, and confirm the following?",
    "",
    "1. What support is available — a contribution, a fund, treatment cover, paid leave, or access to a support platform?",
    "2. Is anything included via the private medical scheme separately from the standard benefits list?",
    "3. What is inside the benefit: are medication, donor sperm or eggs, storage and frozen transfers covered, or charged separately?",
    "4. Does treatment have to be at a partner clinic?",
    "5. Is there a qualifying period, or is the benefit available immediately?",
    "6. What happens to the benefit if I leave part-way through a course of treatment?",
  ];

  if (situation !== "unsaid") {
    const who =
      situation === "solo"
        ? "someone building a family on their own"
        : situation === "same-sex"
          ? "same-sex couples"
          : "couples using donor gametes";
    lines.push(`7. Is the eligibility wording written around family building rather than an infertility diagnosis — in other words, does it cover ${who}?`);
  }

  if (market === "usa") {
    lines.push(
      "8. Is our health plan fully insured or self-funded?",
      "9. What definition of infertility does the plan document use for fertility benefit eligibility?",
    );
  }

  if (market === "uk" || market === "ireland") {
    lines.push(
      `${situation !== "unsaid" ? "8" : "7"}. Is treatment-related absence recorded separately from ordinary sickness absence, and is time off for appointments paid?`,
    );
  }

  if (market === "europe") {
    lines.push(
      `${situation !== "unsaid" ? "8" : "7"}. If we are part of an international group, does the group fertility policy apply to employees in this country?`,
    );
  }

  lines.push(
    "",
    "A copy of the policy document itself would be ideal, rather than the intranet summary.",
    "",
    "Thanks very much.",
  );

  return lines.join("\n");
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
  const [market, setMarket] = useState<Market>("uk");
  const [situation, setSituation] = useState<Situation>("unsaid");

  const shown = steps.filter((s) => !s.usOnly || market === "usa");
  const email = buildEmail(market, situation);

  return (
    <div className="rounded-2xl border p-6 md:p-10" style={{ borderColor: "var(--border)" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="font-sans font-bold text-base mb-3" style={{ color: TEAL }}>
            Where do you work?
          </p>
          <div className="flex flex-wrap gap-2">
            {MARKETS.map((m) => (
              <Chip key={m.value} selected={market === m.value} onClick={() => setMarket(m.value)}>
                {m.label}
              </Chip>
            ))}
          </div>
        </div>

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
      </div>

      {/* The checklist */}
      <div className="mt-10 pt-8 border-t" style={{ borderColor: "var(--border)" }}>
        <p className="text-[12px] font-[700] uppercase tracking-[0.14em] mb-5 font-sans" style={{ color: TEAL_SOFT }}>
          Work through these in order
        </p>
        <ol className="space-y-5">
          {shown.map((s, i) => (
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
            Email to send HR
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
        invoking it. Send it from your work address like any other benefits question.
      </p>
    </div>
  );
}
