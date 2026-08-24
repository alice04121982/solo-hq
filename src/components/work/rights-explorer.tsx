"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink, Scale, CircleSlash } from "lucide-react";
import type { RightsEntry } from "@/lib/work";

const TEAL = "var(--teal)";
const TEAL_SOFT = "rgba(0, 83, 83, 0.6)";

/**
 * Rights, split into what the law gives you and what it does not. The split is
 * the whole point of the component: nearly every published piece on this
 * subject blurs statutory rights into employer policy, and a reader who acts
 * on that blur is the person this page exists for.
 */
export function RightsExplorer({ entries }: { entries: RightsEntry[] }) {
  const [open, setOpen] = useState<string | null>(entries[0]?.slug ?? null);

  return (
    <div className="border-t" style={{ borderColor: "var(--border)" }}>
      {entries.map((e) => {
        const isOpen = open === e.slug;
        return (
          <div key={e.slug} id={e.slug} className="border-b scroll-mt-24" style={{ borderColor: "var(--border)" }}>
            <h3>
              <button
                onClick={() => setOpen(isOpen ? null : e.slug)}
                aria-expanded={isOpen}
                aria-controls={`rights-${e.slug}`}
                className="w-full flex items-start justify-between gap-6 py-6 text-left group"
              >
                <span className="flex-1">
                  <span
                    className="block font-sans font-bold text-lg md:text-xl mb-1.5 transition-opacity group-hover:opacity-70"
                    style={{ color: TEAL }}
                  >
                    {e.name}
                  </span>
                  {/* font-[400]: the global base style bolds every h1–h6, and the
                      wrapping <h3> would otherwise embolden the summary too. */}
                  <span
                    className="block text-sm font-sans font-[400] leading-relaxed"
                    style={{ color: "var(--muted)", maxWidth: "70ch" }}
                  >
                    {e.summary}
                  </span>
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 mt-1 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  style={{ color: TEAL_SOFT }}
                />
              </button>
            </h3>

            {isOpen && (
              <div id={`rights-${e.slug}`} className="pb-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="rounded-2xl p-5 md:p-6" style={{ background: "var(--lime)" }}>
                    <p
                      className="inline-flex items-center gap-2 text-[12px] font-[700] uppercase tracking-[0.14em] mb-4 font-sans"
                      style={{ color: TEAL_SOFT }}
                    >
                      <Scale className="h-3.5 w-3.5" />
                      What the law gives you
                    </p>
                    <ul className="space-y-3">
                      {e.theLaw.map((item) => (
                        <li key={item} className="text-[14px] font-sans leading-relaxed" style={{ color: TEAL }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border p-5 md:p-6" style={{ borderColor: "var(--border)" }}>
                    <p
                      className="inline-flex items-center gap-2 text-[12px] font-[700] uppercase tracking-[0.14em] mb-4 font-sans"
                      style={{ color: TEAL_SOFT }}
                    >
                      <CircleSlash className="h-3.5 w-3.5" />
                      What it does not
                    </p>
                    <ul className="space-y-3">
                      {e.notTheLaw.map((item) => (
                        <li key={item} className="text-[14px] font-sans leading-relaxed text-muted">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  <p
                    className="text-[12px] font-[700] uppercase tracking-[0.14em] mb-3 font-sans"
                    style={{ color: TEAL_SOFT }}
                  >
                    Using it
                  </p>
                  <ul className="space-y-2.5">
                    {e.useIt.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-2 h-1 w-1 rounded-full shrink-0" style={{ background: TEAL, opacity: 0.45 }} />
                        <p className="text-[14px] font-sans leading-relaxed text-muted">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {e.sources.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-sans transition-colors hover:bg-[var(--teal)] hover:text-white"
                      style={{ borderColor: "var(--border)", color: TEAL }}
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
