"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import type { FaithTradition } from "@/lib/faith";

const TEAL = "var(--teal)";
const TEAL_SOFT = "rgba(0, 83, 83, 0.6)";

function Column({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p
        className="text-[12px] font-[700] uppercase tracking-[0.14em] mb-3 font-sans"
        style={{ color: TEAL_SOFT }}
      >
        {title}
      </p>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span
              className="mt-2 h-1 w-1 rounded-full shrink-0"
              style={{ background: TEAL, opacity: 0.45 }}
            />
            <p className="text-[14px] font-sans leading-relaxed" style={{ color: "var(--muted)" }}>
              {item}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TraditionExplorer({ traditions }: { traditions: FaithTradition[] }) {
  const [open, setOpen] = useState<string | null>(traditions[0]?.slug ?? null);

  return (
    <div className="border-t" style={{ borderColor: "var(--border)" }}>
      {traditions.map((t) => {
        const isOpen = open === t.slug;
        return (
          <div key={t.slug} id={t.slug} className="border-b scroll-mt-24" style={{ borderColor: "var(--border)" }}>
            <h3>
              <button
                onClick={() => setOpen(isOpen ? null : t.slug)}
                aria-expanded={isOpen}
                aria-controls={`panel-${t.slug}`}
                className="w-full flex items-start justify-between gap-6 py-6 text-left group"
              >
                <span className="flex-1">
                  <span
                    className="block font-sans font-bold text-lg md:text-xl mb-1.5 transition-opacity group-hover:opacity-70"
                    style={{ color: TEAL }}
                  >
                    {t.name}
                  </span>
                  {/* font-[400] because the global base style makes every h1–h6
                      bold, and the wrapping <h3> would otherwise embolden the
                      summary along with the tradition name. */}
                  <span
                    className="block text-sm font-sans font-[400] leading-relaxed"
                    style={{ color: "var(--muted)", maxWidth: "70ch" }}
                  >
                    {t.summary}
                  </span>
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 mt-1 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  style={{ color: TEAL_SOFT }}
                />
              </button>
            </h3>

            {isOpen && (
              <div id={`panel-${t.slug}`} className="pb-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
                  <Column title="Commonly taught" items={t.commonlyTaught} />
                  <Column title="Where views differ" items={t.viewsDiffer} />
                  <Column title="Questions worth asking" items={t.questionsToAsk} />
                </div>

                {t.practicalNotes && t.practicalNotes.length > 0 && (
                  <div
                    className="mt-8 rounded-2xl p-5 md:p-6"
                    style={{ background: "var(--cream)" }}
                  >
                    <p
                      className="text-[12px] font-[700] uppercase tracking-[0.14em] mb-3 font-sans"
                      style={{ color: TEAL_SOFT }}
                    >
                      Practical notes for treatment
                    </p>
                    <ul className="space-y-2.5">
                      {t.practicalNotes.map((note, i) => (
                        <li
                          key={i}
                          className="text-[14px] font-sans leading-relaxed"
                          style={{ color: TEAL }}
                        >
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-2">
                  {t.sources.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-sans text-[var(--teal)] transition-colors hover:bg-[var(--teal)] hover:text-white"
                      style={{ borderColor: "var(--border)" }}
                    >
                      {s.label}
                      <ExternalLink className="h-3 w-3 shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
