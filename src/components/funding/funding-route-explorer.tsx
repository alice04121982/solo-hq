"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import type { FundingRoute, RouteGroup } from "@/lib/funding";
import { ROUTE_GROUPS } from "@/lib/funding";

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

export function FundingRouteExplorer({ routes }: { routes: FundingRoute[] }) {
  const [group, setGroup] = useState<RouteGroup | "all">("all");
  const [open, setOpen] = useState<string | null>(routes[0]?.slug ?? null);

  const shown = group === "all" ? routes : routes.filter((r) => r.group === group);
  const activeGroup = ROUTE_GROUPS.find((g) => g.id === group);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setGroup("all")}
          aria-pressed={group === "all"}
          className="rounded-full border px-4 py-2 text-sm font-sans transition-colors duration-150"
          style={
            group === "all"
              ? { background: TEAL, borderColor: TEAL, color: "#FFFFFF" }
              : { borderColor: "var(--border)", color: TEAL }
          }
        >
          Everything ({routes.length})
        </button>
        {ROUTE_GROUPS.map((g) => {
          const count = routes.filter((r) => r.group === g.id).length;
          const selected = group === g.id;
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => setGroup(g.id)}
              aria-pressed={selected}
              className="rounded-full border px-4 py-2 text-sm font-sans transition-colors duration-150"
              style={
                selected
                  ? { background: TEAL, borderColor: TEAL, color: "#FFFFFF" }
                  : { borderColor: "var(--border)", color: TEAL }
              }
            >
              {g.label} ({count})
            </button>
          );
        })}
      </div>

      {activeGroup && (
        <p className="text-[15px] font-sans leading-relaxed text-muted mt-5" style={{ maxWidth: "62ch" }}>
          {activeGroup.blurb}
        </p>
      )}

      {/* Routes */}
      <div className="border-t mt-8" style={{ borderColor: "var(--border)" }}>
        {shown.map((r) => {
          const isOpen = open === r.slug;
          const groupLabel = ROUTE_GROUPS.find((g) => g.id === r.group)?.label;
          return (
            <div key={r.slug} id={r.slug} className="border-b scroll-mt-24" style={{ borderColor: "var(--border)" }}>
              <h3>
                <button
                  onClick={() => setOpen(isOpen ? null : r.slug)}
                  aria-expanded={isOpen}
                  aria-controls={`route-${r.slug}`}
                  className="w-full flex items-start justify-between gap-6 py-6 text-left group"
                >
                  <span className="flex-1">
                    <span
                      className="block text-[12px] font-[600] font-sans uppercase tracking-[0.12em] mb-2"
                      style={{ color: TEAL_SOFT }}
                    >
                      {groupLabel}
                    </span>
                    <span
                      className="block font-sans font-bold text-lg md:text-xl mb-1.5 transition-opacity group-hover:opacity-70"
                      style={{ color: TEAL }}
                    >
                      {r.name}
                    </span>
                    {/* font-[400]: the global base style bolds every h1–h6, and
                        the wrapping <h3> would otherwise embolden the summary. */}
                    <span
                      className="block text-sm font-sans font-[400] leading-relaxed"
                      style={{ color: "var(--muted)", maxWidth: "70ch" }}
                    >
                      {r.summary}
                    </span>
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 mt-1 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    style={{ color: TEAL_SOFT }}
                  />
                </button>
              </h3>

              {isOpen && (
                <div id={`route-${r.slug}`} className="pb-10">
                  {/* The two facts that decide whether a route is right: what it
                      costs, and who is out of pocket when a cycle fails. */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="rounded-2xl p-5" style={{ background: "var(--background-alt)" }}>
                      <p
                        className="text-[12px] font-[700] uppercase tracking-[0.14em] mb-2 font-sans"
                        style={{ color: TEAL_SOFT }}
                      >
                        What it costs
                      </p>
                      <p className="text-[14px] font-sans leading-relaxed" style={{ color: TEAL }}>
                        {r.typicalCost}
                      </p>
                    </div>
                    <div className="rounded-2xl p-5" style={{ background: "var(--background-alt)" }}>
                      <p
                        className="text-[12px] font-[700] uppercase tracking-[0.14em] mb-2 font-sans"
                        style={{ color: TEAL_SOFT }}
                      >
                        Who carries the risk
                      </p>
                      <p className="text-[14px] font-sans leading-relaxed" style={{ color: TEAL }}>
                        {r.riskHolder}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
                    <Column title="How it works" items={r.howItWorks} />
                    <Column title="Who it suits" items={r.suits} />
                    <Column title="Watch out for" items={r.watchOuts} />
                  </div>

                  {/* The route is usually universal; the companies named are
                      not, so say which market this card is describing. */}
                  {r.where && (
                    <p className="text-[13px] font-sans leading-relaxed text-muted mt-8" style={{ maxWidth: "70ch" }}>
                      <span className="font-[600] uppercase tracking-[0.12em] text-[12px]" style={{ color: TEAL_SOFT }}>
                        Where this applies ·{" "}
                      </span>
                      {r.where}
                    </p>
                  )}

                  {r.sources && r.sources.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {r.sources.map((s) => (
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
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
