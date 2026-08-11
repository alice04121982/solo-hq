"use client";

import { Check, Plus } from "lucide-react";
import Link from "next/link";
import type { AgeBracket, Clinic } from "@/types/clinic";
import { rateFor } from "@/lib/clinics";
import { RateFigure, VerificationBadge } from "./rate-display";

interface TopPerformersProps {
  /** The current filtered set. The strip derives from it, slot by slot. */
  clinics: Clinic[];
  ageBracket: AgeBracket;
  selectedSlugs: string[];
  compareDisabled: boolean;
  onToggleCompare: (clinic: Clinic) => void;
}

interface Slot {
  label: string;
  clinic: Clinic;
}

function bestOf(clinics: Clinic[], bracket: AgeBracket): Clinic | undefined {
  let best: Clinic | undefined;
  let bestRate = -1;
  for (const c of clinics) {
    const r = rateFor(c, bracket);
    if (r != null && r > bestRate) {
      best = c;
      bestRate = r;
    }
  }
  return best;
}

/**
 * Three cards above the main list: highest success rate in the UK, in Europe,
 * and worldwide, always computed from the current filtered set at the current
 * age bracket. A slot emptied by an active filter is hidden rather than
 * rendered blank, and a clinic topping two slots appears once with both
 * labels.
 */
export function TopPerformers({
  clinics,
  ageBracket,
  selectedSlugs,
  compareDisabled,
  onToggleCompare,
}: TopPerformersProps) {
  const slots: Slot[] = [];
  const ukBest = bestOf(clinics.filter((c) => c.region === "UK"), ageBracket);
  const europeBest = bestOf(clinics.filter((c) => c.region === "Europe"), ageBracket);
  const worldBest = bestOf(clinics, ageBracket);
  if (ukBest) slots.push({ label: "Highest rate, UK", clinic: ukBest });
  if (europeBest) slots.push({ label: "Highest rate, Europe", clinic: europeBest });
  if (worldBest) slots.push({ label: "Highest rate, worldwide", clinic: worldBest });

  // Merge slots that resolve to the same clinic, keeping every label.
  const merged = new Map<string, { clinic: Clinic; labels: string[] }>();
  for (const slot of slots) {
    const existing = merged.get(slot.clinic.slug);
    if (existing) existing.labels.push(slot.label);
    else merged.set(slot.clinic.slug, { clinic: slot.clinic, labels: [slot.label] });
  }

  if (merged.size === 0) return null;

  return (
    <div>
      <p className="text-[13px] font-[500] uppercase tracking-[0.15em] text-muted mb-3">
        Top performers for this search
      </p>
      {/* Horizontal scroll on mobile, a row of equal cards from md up. */}
      <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 md:grid md:grid-cols-3 md:overflow-visible">
        {[...merged.values()].map(({ clinic, labels }) => {
          const isSelected = selectedSlugs.includes(clinic.slug);
          return (
            <div
              key={clinic.slug}
              className={`min-w-[260px] md:min-w-0 rounded-[24px] bg-background border border-border transition-colors duration-150 hover:bg-surface-hover p-5 flex flex-col ${
                isSelected ? "outline-solid outline-2 -outline-offset-2 outline-teal" : ""
              }`}
            >
              <p className="text-[12px] font-[700] uppercase tracking-[0.12em] text-teal mb-2">
                {labels.join(" · ")}
              </p>
              <div className="mb-2">
                <VerificationBadge verification={clinic.successRates.verification} />
              </div>
              <Link
                href={`/ivf-finder/${clinic.slug}`}
                className="text-sm font-bold text-teal-ink leading-snug hover:underline underline-offset-2"
              >
                {clinic.name}
              </Link>
              <p className="text-xs text-muted mb-3">
                {clinic.city}, {clinic.country}
              </p>
              <RateFigure clinic={clinic} bracket={ageBracket} />
              <button
                onClick={() => onToggleCompare(clinic)}
                disabled={compareDisabled && !isSelected}
                className={`mt-4 flex items-center justify-center gap-1.5 h-9 rounded-full text-xs font-semibold border transition-colors ${
                  isSelected
                    ? "bg-teal border-teal text-on-teal hover:opacity-90"
                    : compareDisabled
                      ? "bg-background border-border text-muted cursor-not-allowed"
                      : "bg-background border-teal/20 text-teal hover:bg-surface-hover"
                }`}
              >
                {isSelected ? (
                  <>
                    <Check className="h-3.5 w-3.5" aria-hidden />
                    In comparison
                  </>
                ) : (
                  <>
                    <Plus className="h-3.5 w-3.5" aria-hidden />
                    Add to compare
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
