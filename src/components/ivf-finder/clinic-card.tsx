"use client";

import Link from "next/link";
import { Check, Plus } from "lucide-react";
import type { AgeBracket, Clinic } from "@/types/clinic";
import { formatCheckedDate } from "@/lib/clinics";
import { travelEstimateForCity, TRAVEL_ASSUMPTIONS, TRAVEL_ESTIMATE_SCOPE } from "@/lib/travel";
import { PRICE_HEADLINE } from "@/lib/rate-labels";
import { eligibilitySummary } from "@/lib/country-eligibility";
import { CountryFlag } from "@/components/country-flag";
import {
  clinicCardClasses,
  DEFAULT_RESULT_VARIANT,
  type ClinicCardVariant,
} from "@/lib/card-style";
import { RateFigure, VerificationBadge } from "./rate-display";

interface ClinicCardProps {
  clinic: Clinic;
  ageBracket: AgeBracket;
  isSelected: boolean;
  compareDisabled: boolean;
  variant?: ClinicCardVariant;
  /** "12 miles from Cambridge", when the finder has a location to measure from. */
  distanceText?: string;
  onToggleCompare: (clinic: Clinic) => void;
}

/**
 * A result card in the Cairn clinic finder.
 *
 * Elevation comes from surfaces and edges, never shadows, and never from grey:
 * these cards sit on the cream band, where a grey hairline reads as dirt over
 * the warm tone. Hovering fills the card with the brand teal and inverts
 * everything on it, and selection draws a 2px ring inset over the resting
 * border, so selecting a card never shifts its contents by a pixel.
 *
 * Every colour below is read from a custom property set by `.clinic-card`, so
 * the hover inversion needs no group-hover class on any child.
 */
export function ClinicCard({
  clinic,
  ageBracket,
  isSelected,
  compareDisabled,
  variant = DEFAULT_RESULT_VARIANT,
  distanceText,
  onToggleCompare,
}: ClinicCardProps) {
  const travel = clinic.region !== "UK" ? travelEstimateForCity(clinic.city) : null;
  const ink = { color: "var(--card-ink)" };
  const inkMuted = { color: "var(--card-ink-muted)" };
  const trips = `${TRAVEL_ASSUMPTIONS.tripsPerCycle.low}–${TRAVEL_ASSUMPTIONS.tripsPerCycle.high} trips`;

  return (
    <div className={clinicCardClasses(variant, isSelected)}>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <VerificationBadge verification={clinic.successRates.verification} />
      </div>

      <h3 className="text-base font-bold leading-tight" style={ink}>
        {clinic.name}
      </h3>
      <div className="flex items-center gap-1.5 mt-1 mb-4">
        <CountryFlag country={clinic.country} />
        <p className="text-xs truncate" style={inkMuted}>
          {clinic.city}, {clinic.country}
          {distanceText && <span> · {distanceText}</span>}
        </p>
      </div>
      {clinic.region !== "UK" && (
        <p className="text-xs -mt-2 mb-4" style={inkMuted}>
          {eligibilitySummary(clinic.country)}
        </p>
      )}

      <div className="flex items-end justify-between gap-3 mb-4">
        <RateFigure clinic={clinic} bracket={ageBracket} />
        <div className="text-right">
          <p className="text-sm font-bold" style={ink}>
            {clinic.pricePerCycleGbp != null
              ? `£${clinic.pricePerCycleGbp.toLocaleString()}`
              : "Not published"}
          </p>
          <p className="text-xs" style={inkMuted}>
            {PRICE_HEADLINE.toLowerCase()}, per IVF cycle
          </p>
          {travel && clinic.pricePerCycleGbp != null && (
            <p className="text-xs mt-0.5" style={inkMuted}>
              + £{travel.low.toLocaleString()}–£{travel.high.toLocaleString()} travel (estimate, {trips})
            </p>
          )}
          {clinic.iuiPricePerCycleGbp != null && (
            <p className="text-xs mt-0.5" style={inkMuted}>
              IUI from £{clinic.iuiPricePerCycleGbp.toLocaleString()}
            </p>
          )}
          {clinic.checkedOn && (
            <p className="text-xs mt-0.5" style={inkMuted}>
              Checked {formatCheckedDate(clinic.checkedOn)}
            </p>
          )}
        </div>
      </div>
      {travel && clinic.pricePerCycleGbp != null && (
        <p className="text-[11px] leading-snug -mt-2 mb-4" style={inkMuted}>
          {TRAVEL_ESTIMATE_SCOPE}
        </p>
      )}

      <div className="flex gap-2 mt-auto">
        <button
          onClick={() => onToggleCompare(clinic)}
          disabled={compareDisabled && !isSelected}
          className={`clinic-card__control ${
            isSelected ? "clinic-card__control--active" : ""
          } flex-1 flex items-center justify-center gap-1.5 h-9 rounded-full text-xs font-semibold`}
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
          className="clinic-card__control flex items-center h-9 px-4 rounded-full text-xs font-medium"
        >
          Details
        </Link>
      </div>
    </div>
  );
}
