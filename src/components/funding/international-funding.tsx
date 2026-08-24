"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import type { CountryFunding } from "@/lib/funding";

const TEAL = "var(--teal)";
const TEAL_SOFT = "rgba(0, 83, 83, 0.6)";

function Column({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-[12px] font-[700] uppercase tracking-[0.14em] mb-3 font-sans" style={{ color: TEAL_SOFT }}>
        {title}
      </p>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span className="mt-2 h-1 w-1 rounded-full shrink-0" style={{ background: TEAL, opacity: 0.45 }} />
            <p className="text-[14px] font-sans leading-relaxed" style={{ color: "var(--muted)" }}>
              {item}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function InternationalFunding({ countries }: { countries: CountryFunding[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="border-t" style={{ borderColor: "var(--border)" }}>
      {countries.map((c) => {
        const isOpen = open === c.slug;
        return (
          <div key={c.slug} id={c.slug} className="border-b scroll-mt-24" style={{ borderColor: "var(--border)" }}>
            <h3>
              <button
                onClick={() => setOpen(isOpen ? null : c.slug)}
                aria-expanded={isOpen}
                aria-controls={`country-${c.slug}`}
                className="w-full flex items-start justify-between gap-6 py-6 text-left group"
              >
                <span className="flex-1">
                  <span
                    className="block font-sans font-bold text-lg md:text-xl mb-1.5 transition-opacity group-hover:opacity-70"
                    style={{ color: TEAL }}
                  >
                    {c.name}
                  </span>
                  {/* font-[400]: the global base style bolds every h1–h6, and the
                      wrapping <h3> would otherwise embolden the summary too. */}
                  <span
                    className="block text-sm font-sans font-[400] leading-relaxed"
                    style={{ color: "var(--muted)", maxWidth: "70ch" }}
                  >
                    {c.summary}
                  </span>
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 mt-1 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  style={{ color: TEAL_SOFT }}
                />
              </button>
            </h3>

            {isOpen && (
              <div id={`country-${c.slug}`} className="pb-10">
                <div className="rounded-2xl p-5 mb-8 bg-cream">
                  <p
                    className="text-[12px] font-[700] uppercase tracking-[0.14em] mb-2 font-sans"
                    style={{ color: TEAL_SOFT }}
                  >
                    Who can actually access it
                  </p>
                  <p className="text-[14px] font-sans leading-relaxed" style={{ color: TEAL }}>
                    {c.access}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                  <Column title="What the state funds" items={c.publicFunding} />
                  <Column title="Paying for the rest" items={c.privateRoutes} />
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {c.sources.map((s) => (
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
