"use client";

import { useState } from "react";
import { PlusCircle, MinusCircle } from "lucide-react";

const STAGES = [
  {
    id: "considering",
    label: "Considering",
    content:
      "You're in the earliest (and often hardest) stage. Weighing the idea of solo parenthood against financial reality, social pressure, and your own timeline. There's no deadline to decide, and exploring doesn't commit you to anything.",
  },
  {
    id: "donor",
    label: "Choosing a donor",
    content:
      "Sperm donor or egg donor: known vs anonymous, identity-release options, bank matching vs clinic-arranged donors. We break down what to look for, what the research says about donor-conceived children, and how to feel confident in your choice.",
  },
  {
    id: "preparing",
    label: "Preparing for treatment",
    content:
      "Tests, consultations, clinic selection, and financial planning: getting everything in order before your first cycle. This is the stage most people underestimate. Good preparation makes every cycle after it feel calmer.",
  },
  {
    id: "treatment",
    label: "In treatment",
    content:
      "IUI, IVF, egg freezing, or embryo transfer: each has its own rhythm of monitoring appointments, injections, retrieval, and the two-week wait. We cover the clinical reality alongside the emotional side no one prepares you for.",
  },
  {
    id: "loss",
    label: "Loss",
    content:
      "Failed cycles, miscarriage, the grief that doesn't get talked about enough. Loss is part of many people's journeys, and it deserves honest, compassionate space. You are not alone, and your grief is valid no matter the stage.",
  },
  {
    id: "pregnancy",
    label: "Pregnancy",
    content:
      "Navigating pregnancy as a solo parent, from the strange joy of a positive test to telling people, choosing a support team, and planning for birth without a co-parent beside you. Practical and emotional guidance for every trimester.",
  },
];

function AccordionItem({
  label,
  content,
  open,
  onToggle,
}: {
  label: string;
  content: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border-secondary last:border-b-0">
      <button
        className="flex w-full items-center justify-between py-5 text-left gap-4 group"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span
          className="font-display font-semibold text-text-primary transition-colors group-hover:text-text-brand-secondary"
          style={{ fontSize: "clamp(1rem, 1.2vw, 1.125rem)", letterSpacing: "-0.01em" }}
        >
          {label}
        </span>
        {open ? (
          <MinusCircle className="h-5 w-5 text-fg-brand-primary shrink-0" />
        ) : (
          <PlusCircle className="h-5 w-5 text-fg-quaternary shrink-0 group-hover:text-fg-brand-primary transition-colors" />
        )}
      </button>

      {open && (
        <p className="pb-5 text-md font-sans text-text-secondary leading-relaxed" style={{ maxWidth: "64ch" }}>
          {content}
        </p>
      )}
    </div>
  );
}

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <section className="bg-bg-secondary border-y border-border-secondary" id="journey">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">

          {/* Left — sticky copy */}
          <div className="md:sticky md:top-24 md:self-start">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-brand-secondary font-sans mb-5">
              Support
            </p>
            <h2
              className="font-display font-bold text-text-primary mb-6"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
            >
              Where are you on{" "}
              <em className="not-italic text-text-brand-secondary">
                your journey?
              </em>
            </h2>
            <p className="text-md font-sans text-text-secondary leading-relaxed" style={{ maxWidth: "40ch" }}>
              Seven stages of honest guidance, real tools, and a community who
              gets it, from &ldquo;am I really doing this?&rdquo; to thriving
              as a solo family.
            </p>
          </div>

          {/* Right — accordion */}
          <div>
            {STAGES.map((s) => (
              <AccordionItem
                key={s.id}
                label={s.label}
                content={s.content}
                open={openId === s.id}
                onToggle={() => toggle(s.id)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
