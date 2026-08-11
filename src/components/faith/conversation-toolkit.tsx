"use client";

import { useState } from "react";
import { MessageSquareQuote, ShieldOff, DoorOpen } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import type { ConversationScenario } from "@/lib/faith";

const TEAL = "var(--teal)";
const TEAL_SOFT = "rgba(0, 83, 83, 0.6)";

export function ConversationToolkit({
  scenarios,
}: {
  scenarios: ConversationScenario[];
}) {
  const [active, setActive] = useState(scenarios[0].slug);
  const scenario = scenarios.find((s) => s.slug === active) ?? scenarios[0];

  return (
    <div>
      {/* Scenario picker */}
      <div
        role="tablist"
        aria-label="Difficult conversations"
        className="flex flex-wrap gap-2 mb-10"
      >
        {scenarios.map((s) => {
          const isActive = s.slug === active;
          return (
            <button
              key={s.slug}
              role="tab"
              aria-selected={isActive}
              aria-controls={`scenario-${s.slug}`}
              id={`tab-${s.slug}`}
              onClick={() => setActive(s.slug)}
              className={`rounded-full border text-xs font-sans px-4 py-2 text-left transition-colors duration-150 ${
                isActive
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`scenario-${scenario.slug}`}
        aria-labelledby={`tab-${scenario.slug}`}
      >
        <p
          className="font-sans font-bold mb-8"
          style={{ fontSize: "clamp(1.625rem, 2.2vw, 2.25rem)", lineHeight: 1.2, color: TEAL, maxWidth: "34ch" }}
        >
          {scenario.situation}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16">
          {/* What's going on */}
          <div>
            <p
              className="text-[12px] font-[700] uppercase tracking-[0.14em] mb-3 font-sans"
              style={{ color: TEAL_SOFT }}
            >
              What&rsquo;s usually going on
            </p>
            {scenario.whatsHappening.map((para, i) => (
              <p
                key={i}
                className="text-[15px] font-sans leading-relaxed mb-3"
                style={{ color: "var(--muted)" }}
              >
                {para}
              </p>
            ))}

            <div
              className="mt-8 rounded-2xl border p-5"
              style={{ borderColor: "var(--border)" }}
            >
              <p
                className="inline-flex items-center gap-2 text-[12px] font-[700] uppercase tracking-[0.14em] mb-3 font-sans"
                style={{ color: TEAL_SOFT }}
              >
                <ShieldOff className="h-3.5 w-3.5" />
                Not your job
              </p>
              <ul className="space-y-2">
                {scenario.notYourJob.map((item, i) => (
                  <li
                    key={i}
                    className="text-[14px] font-sans leading-relaxed"
                    style={{ color: "var(--muted)" }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Scripts */}
          <div>
            <p
              className="inline-flex items-center gap-2 text-[12px] font-[700] uppercase tracking-[0.14em] mb-4 font-sans"
              style={{ color: TEAL_SOFT }}
            >
              <MessageSquareQuote className="h-3.5 w-3.5" />
              Things you can actually say
            </p>
            <ul className="space-y-3">
              {scenario.tryThis.map((line, i) => (
                <li
                  key={i}
                  className="rounded-2xl p-4 md:p-5 flex items-start justify-between gap-4"
                  style={{ background: "var(--lime)" }}
                >
                  <p
                    className="text-[15px] font-sans leading-relaxed font-[500]"
                    style={{ color: TEAL }}
                  >
                    {line}
                  </p>
                  <span className="shrink-0 pt-0.5">
                    <CopyButton text={line.replace(/^"|"$/g, "")} />
                  </span>
                </li>
              ))}
            </ul>

            <div
              className="mt-6 rounded-2xl p-5"
              style={{ background: "var(--teal)" }}
            >
              <p
                className="inline-flex items-center gap-2 text-[12px] font-[700] uppercase tracking-[0.14em] mb-2 font-sans"
                style={{ color: "var(--on-teal-muted)" }}
              >
                <DoorOpen className="h-3.5 w-3.5" />
                A way out
              </p>
              <p
                className="text-[15px] font-sans leading-relaxed font-[500]"
                style={{ color: "var(--on-teal)" }}
              >
                {scenario.exitLine}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
