"use client";

import { Check, Plus } from "lucide-react";
import Link from "next/link";
import type { AgeBracket, Clinic } from "@/types/clinic";
import { rateFor } from "@/lib/clinics";
import { CountryFlag } from "@/components/country-flag";
import {
  clinicCardClasses,
  DEFAULT_TOP_PERFORMER_VARIANT,
  type ClinicCardVariant,
} from "@/lib/card-style";
import { RateFigure, VerificationBadge } from "./rate-display";

interface TopPerformersProps {
  /** The current filtered set. The strip derives from it, slot by slot. */
  clinics: Clinic[];
  ageBracket: AgeBracket;
  selectedSlugs: string[];
  compareDisabled: boolean;
  variant?: ClinicCardVariant;
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
 *
 * The strip is meant to read as picked out of the list below it, so it takes
 * the pale citrus fill by default while the results grid stays on white.
 */
export function TopPerformers({
  clinics,
  ageBracket,
  selectedSlugs,
  compareDisabled,
  variant = DEFAULT_TOP_PERFORMER_VARIANT,
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
              className={`${clinicCardClasses(variant, isSelected)} min-w-[260px] md:min-w-0`}
            >
              <p
                className="text-[12px] font-[700] uppercase tracking-[0.12em] mb-2"
                style={{ color: "var(--card-ink)" }}
              >
                {labels.join(" · ")}
              </p>
              <div className="mb-2">
                <VerificationBadge verification={clinic.successRates.verification} />
              </div>
              <Link
                href={`/ivf-finder/${clinic.slug}`}
                className="text-sm font-bold leading-snug hover:underline underline-offset-2"
                style={{ color: "var(--card-ink)" }}
              >
                {clinic.name}
              </Link>
              <div className="flex items-center gap-1.5 mb-3">
                <CountryFlag country={clinic.country} />
                <p className="text-xs truncate" style={{ color: "var(--card-ink-muted)" }}>
                  {clinic.city}, {clinic.country}
                </p>
              </div>
              <RateFigure clinic={clinic} bracket={ageBracket} />
              <button
                onClick={() => onToggleCompare(clinic)}
                disabled={compareDisabled && !isSelected}
                className={`clinic-card__control ${
                  isSelected ? "clinic-card__control--active" : ""
                } mt-4 flex items-center justify-center gap-1.5 h-9 rounded-full text-xs font-semibold`}
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
