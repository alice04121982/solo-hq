"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { CATEGORY_MAP, GUIDES } from "@/lib/guides";
import { GuideTypeBadge, type GuideType } from "./guide-type";
import { ShapeMark, type ShapeName } from "./shapes";

/**
 * The browsable library: every guide as a card, grouped by category, with a
 * format filter keyed to the shape bank. Formats with one entry are grouped
 * with their nearest sibling so the filter row stays scannable; each card's
 * badge still shows its precise format.
 */
const FORMAT_GROUPS: {
  key: string;
  label: string;
  mark: ShapeName;
  types: GuideType[];
}[] = [
  { key: "guide", label: "Guides", mark: "bloom", types: ["Guide"] },
  { key: "explainer", label: "Explainers", mark: "egg", types: ["Explainer"] },
  { key: "checklist", label: "Checklists", mark: "cross", types: ["Checklist"] },
  { key: "template", label: "Templates & scripts", mark: "pause", types: ["Template", "Script"] },
  { key: "directory", label: "Directories & lists", mark: "asterisk", types: ["Directory", "Reading list"] },
  { key: "stories", label: "Stories", mark: "spark", types: ["Stories"] },
];

const CATEGORIES = Object.values(CATEGORY_MAP);

export function ResourceLibrary() {
  const [format, setFormat] = useState<string>("all");

  const activeTypes =
    format === "all" ? null : FORMAT_GROUPS.find((g) => g.key === format)?.types ?? null;

  const visible = activeTypes ? GUIDES.filter((g) => activeTypes.includes(g.type)) : GUIDES;

  return (
    <div>
      {/* Format filter — the shape bank as a legend */}
      <div className="flex flex-wrap gap-2 mb-12">
        <button
          onClick={() => setFormat("all")}
          className={`rounded-full border text-xs font-sans px-4 py-2 transition-colors duration-150 ${
            format === "all"
              ? "border-foreground bg-foreground text-background"
              : "border-[var(--teal-20)] text-teal bg-background hover:border-[var(--teal-35)]"
          }`}
        >
          All formats
          <span className={`ml-1.5 ${format === "all" ? "opacity-60" : "text-muted"}`}>
            {GUIDES.length}
          </span>
        </button>
        {FORMAT_GROUPS.map((g) => {
          const count = GUIDES.filter((guide) => g.types.includes(guide.type)).length;
          const active = format === g.key;
          return (
            <button
              key={g.key}
              onClick={() => setFormat(active ? "all" : g.key)}
              className={`inline-flex items-center gap-2 rounded-full border text-xs font-sans px-4 py-2 transition-colors duration-150 ${
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-[var(--teal-20)] text-teal bg-background hover:border-[var(--teal-35)]"
              }`}
            >
              <ShapeMark name={g.mark} size={12} style={{ color: "var(--lavender)" }} />
              {g.label}
              <span className={active ? "opacity-60" : "text-muted"}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Category groups */}
      <div className="space-y-14">
        {CATEGORIES.map((category) => {
          const guides = visible.filter((g) => g.category === category);
          if (guides.length === 0) return null;
          return (
            <div key={category}>
              <h3 className="font-sans font-bold text-foreground text-xl mb-6">{category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {guides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/resources/${guide.slug}`}
                    className="group flex flex-col gap-3 rounded-2xl border border-border bg-background p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <GuideTypeBadge type={guide.type} />
                    <p className="text-sm font-sans font-[600] text-foreground leading-snug flex-1 group-hover:underline decoration-[var(--teal-20)] underline-offset-2">
                      {guide.title}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-sans text-muted pt-3 border-t border-border">
                      <Clock className="h-3 w-3" />
                      {guide.readTime}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
