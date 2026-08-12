"use client";

import Link from "next/link";
import { MapPin, Check, Plus } from "lucide-react";
import type { AgeBracket, Clinic } from "@/types/clinic";
import { travelEstimateForCity } from "@/lib/travel";
import { RateFigure, VerificationBadge } from "./rate-display";

interface ClinicCardProps {
  clinic: Clinic;
  ageBracket: AgeBracket;
  isSelected: boolean;
  compareDisabled: boolean;
  onToggleCompare: (clinic: Clinic) => void;
}

/**
 * A result card in the Cairn clinic finder.
 *
 * Elevation comes from surfaces and borders, never shadows: the card is a
 * bg-background surface on the cream page canvas with a 1px border, hover
 * swaps the fill, and selection draws a 2px brand outline. The outline is
 * inset over the resting border (outline-offset -2px), so selecting a card
 * never shifts its contents by a pixel.
 */
export function ClinicCard({
  clinic,
  ageBracket,
  isSelected,
  compareDisabled,
  onToggleCompare,
}: ClinicCardProps) {
  const travel = clinic.region !== "UK" ? travelEstimateForCity(clinic.city) : null;
  return (
    <div
      className={`rounded-[24px] bg-background border border-border transition-colors duration-150 hover:bg-surface-hover p-5 flex flex-col ${
        isSelected ? "outline-solid outline-2 -outline-offset-2 outline-teal" : ""
      }`}
    >
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <VerificationBadge verification={clinic.successRates.verification} />
      </div>

      <h3 className="text-base font-bold text-teal-ink leading-tight">{clinic.name}</h3>
      <div className="flex items-center gap-1 mt-1 mb-4">
        <MapPin className="h-3 w-3 text-muted shrink-0" aria-hidden />
        <p className="text-xs text-muted truncate">
          {clinic.city}, {clinic.country}
        </p>
      </div>

      <div className="flex items-end justify-between gap-3 mb-4">
        <RateFigure clinic={clinic} bracket={ageBracket} />
        <div className="text-right">
          <p className="text-sm font-bold text-teal-ink">
            {clinic.pricePerCycleGbp != null
              ? `£${clinic.pricePerCycleGbp.toLocaleString()}`
              : "Not published"}
          </p>
          <p className="text-xs text-muted">per IVF cycle</p>
          {travel && clinic.pricePerCycleGbp != null && (
            <>
              <p className="text-xs font-semibold text-teal-ink mt-0.5">
                ≈ £{(clinic.pricePerCycleGbp + travel.mid).toLocaleString()} with travel
              </p>
              <p className="text-xs text-muted">est. flights + stays</p>
            </>
          )}
          {clinic.iuiPricePerCycleGbp != null && (
            <p className="text-xs text-muted mt-0.5">
              IUI from £{clinic.iuiPricePerCycleGbp.toLocaleString()}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-2 mt-auto">
        <button
          onClick={() => onToggleCompare(clinic)}
          disabled={compareDisabled && !isSelected}
          className={`flex-1 flex items-center justify-center gap-1.5 h-9 rounded-full text-xs font-semibold border transition-colors ${
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
        <Link
          href={`/ivf-finder/${clinic.slug}`}
          className="flex items-center h-9 px-4 rounded-full border border-teal/20 text-xs font-medium text-teal hover:bg-surface-hover transition-colors"
        >
          Details
        </Link>
      </div>
    </div>
  );
}
