"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { JOURNEY_STAGES, type CardType } from "@/lib/journey-stages";

/* ── Type badge colours ───────────────────────────────────────── */
const TYPE_STYLES: Record<
  CardType,
  { bg: string; text: string; label: string }
> = {
  GUIDE: {
    bg: "var(--primary-tint)",
    text: "var(--primary-dark)",
    label: "Guide",
  },
  TOOL: {
    bg: "var(--accent-soft)",
    text: "var(--accent)",
    label: "Tool",
  },
  COMMUNITY: {
    bg: "var(--background-alt)",
    text: "var(--foreground)",
    label: "Community",
  },
  ARTICLE: {
    bg: "var(--background-alt)",
    text: "var(--muted)",
    label: "Article",
  },
};

export function JourneyAccordion() {
  const [openId, setOpenId] = useState<string>(JOURNEY_STAGES[0].id);

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? "" : id));
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-16 md:pb-24">
      <div>
        {JOURNEY_STAGES.map((stage) => {
          const isOpen = openId === stage.id;
          const panelId = `nav-panel-${stage.id}`;
          const triggerId = `nav-trigger-${stage.id}`;

          return (
            <div
              key={stage.id}
              id={stage.id}
              className="border-t border-border"
            >
              {/* Row trigger */}
              <button
                id={triggerId}
                onClick={() => toggle(stage.id)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="w-full flex items-center gap-5 md:gap-8 py-6 md:py-7 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 rounded-sm"
              >
                {/* Stage number */}
                <span
                  className="shrink-0 font-serif text-[16px] leading-none select-none tabular-nums"
                  style={{ color: "var(--muted)", width: "2.25rem" }}
                  aria-hidden="true"
                >
                  {String(stage.number).padStart(2, "0")}
                </span>

                {/* Title + subtitle + resource count */}
                <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
                  <span className="font-serif font-semibold text-foreground text-xl leading-snug">
                    {stage.title}
                  </span>
                  <span className="text-[14px] font-sans text-muted mt-0.5 sm:mt-0 italic leading-relaxed">
                    &ldquo;{stage.subtitle}&rdquo;
                  </span>
                </div>

                {/* Resource count badge */}
                <span className="shrink-0 hidden sm:inline-flex items-center gap-1 text-[12px] font-sans text-muted mr-2">
                  {stage.cards.length} resources
                </span>

                {/* Chevron */}
                <ChevronDown
                  className="shrink-0 h-5 w-5 transition-transform duration-200"
                  style={{
                    color: "var(--primary)",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                  aria-hidden="true"
                />
              </button>

              {/* Expandable panel — grid-template-rows smooth animation */}
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                style={{
                  display: "grid",
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  transition: "grid-template-rows 300ms ease-out",
                }}
              >
                <div className="overflow-hidden">
                  <div className="pb-10">
                    {/* Stage description */}
                    <p
                      className="text-[15px] font-sans text-muted leading-relaxed mb-7"
                      style={{
                        paddingLeft: "calc(2.25rem + 1.25rem)",
                        maxWidth: "62ch",
                      }}
                    >
                      {stage.description}
                    </p>

                    {/* Inner cards grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {stage.cards.map((card) => {
                        const style = TYPE_STYLES[card.type];
                        return (
                          <div
                            key={card.title}
                            className="rounded-2xl border border-border bg-white p-5 flex flex-col gap-3 hover:border-foreground/20 transition-colors duration-150"
                          >
                            {/* Type badge */}
                            <span
                              className="self-start text-[10px] font-[600] uppercase tracking-[0.18em] font-sans px-2.5 py-1 rounded-full"
                              style={{
                                background: style.bg,
                                color: style.text,
                              }}
                            >
                              {style.label}
                            </span>

                            {/* Title */}
                            <h3 className="font-serif font-semibold text-foreground text-[15px] leading-snug flex-1">
                              {card.title}
                            </h3>

                            {/* Description */}
                            <p className="text-[13px] font-sans text-muted leading-relaxed">
                              {card.description}
                            </p>

                            {/* Visit link */}
                            <a
                              href={card.href ?? "#"}
                              className="inline-flex items-center gap-1 text-[12px] font-sans font-semibold mt-auto transition-colors duration-150"
                              style={{ color: "var(--primary)" }}
                            >
                              Visit
                              <ArrowRight className="h-3 w-3" />
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Bottom border */}
        <div className="border-t border-border" />
      </div>
    </div>
  );
}
