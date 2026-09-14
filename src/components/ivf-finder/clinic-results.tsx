"use client";

import { ClinicCard } from "./clinic-card";
import { DEFAULT_RESULT_VARIANT, type ClinicCardVariant } from "@/lib/card-style";
import { groupByVerification, type FinderSort } from "@/lib/clinics";
import { distanceText, type FinderLocation } from "@/lib/geo";
import { GROUP_CLINIC, GROUP_HFEA, RATE_CAVEAT } from "@/lib/rate-labels";
import type { AgeBracket, Clinic } from "@/types/clinic";

interface ClinicResultsProps {
  /** Already in display order (see sortClinics). */
  clinics: Clinic[];
  totalCount: number;
  /** Clinics removed from the list that the current filters also reach. */
  removedCount: number;
  sort: FinderSort;
  ageBracketLabel: string;
  ageBracket: AgeBracket;
  selectedSlugs: string[];
  variant?: ClinicCardVariant;
  /** Where distances are measured from, once the reader has said. */
  origin?: FinderLocation | null;
  /**
   * When the distance ceiling alone empties the list: the nearest clinic that
   * would otherwise match, so the empty state can say how far away it is.
   */
  nearestBeyondCeiling?: Clinic | null;
  onToggleCompare: (clinic: Clinic) => void;
}

export function ClinicResults({
  clinics,
  totalCount,
  removedCount,
  sort,
  ageBracketLabel,
  ageBracket,
  selectedSlugs,
  variant = DEFAULT_RESULT_VARIANT,
  origin = null,
  nearestBeyondCeiling = null,
  onToggleCompare,
}: ClinicResultsProps) {
  if (clinics.length === 0) {
    return (
      <div className="rounded-[24px] bg-background p-12 text-center">
        <p className="text-teal-ink font-semibold mb-1">No clinics match your filters</p>
        <p className="text-sm text-muted">
          {origin && nearestBeyondCeiling
            ? // Distance was the filter that emptied the list, so the useful
              // answer is how far the nearest one actually is.
              `The nearest clinic that fits your other filters is ${nearestBeyondCeiling.name}, ${distanceText(
                origin,
                nearestBeyondCeiling.coordinates
              )}. Widen the distance to see it.`
            : removedCount > 0
            ? // Empty because what was there was taken out is a different
              // answer from empty because nothing fits, and sending someone
              // off to relax a filter would bury the reason sitting below.
              `${removedCount === 1 ? "One clinic" : `${removedCount} clinics`} matching your filters ${
                removedCount === 1 ? "is" : "are"
              } not listed. The reasons are below.`
            : "Relax a filter or clear all filters to see every clinic again."}
        </p>
      </div>
    );
  }

  const isFiltered = clinics.length < totalCount;
  const orderLabel =
    sort === "name"
      ? "in alphabetical order"
      : sort === "price"
        ? "by headline price"
        : sort === "distance" && origin
          ? `nearest to ${origin.source === "device" ? "you" : origin.label} first`
          : sort === "distance"
            ? "in alphabetical order"
            : `by published rate for ${ageBracketLabel.toLowerCase()}, in two groups`;

  const grid = (list: Clinic[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {list.map((clinic) => (
        <ClinicCard
          key={clinic.slug}
          clinic={clinic}
          ageBracket={ageBracket}
          isSelected={selectedSlugs.includes(clinic.slug)}
          compareDisabled={selectedSlugs.length >= 4}
          variant={variant}
          distanceText={origin ? distanceText(origin, clinic.coordinates) : undefined}
          onToggleCompare={onToggleCompare}
        />
      ))}
    </div>
  );

  // Sorted by rate, HFEA figures and clinics' own figures are never one
  // interleaved list: the measures differ, so the order would mean nothing.
  const groups = sort === "rate" ? groupByVerification(clinics) : null;

  return (
    <div>
      <p className="text-sm text-muted mb-4">
        {isFiltered ? (
          <>
            <strong className="text-teal-ink">{clinics.length}</strong> of {totalCount} clinics,
          </>
        ) : (
          <>
            <strong className="text-teal-ink">{clinics.length} clinics</strong>,
          </>
        )}{" "}
        {orderLabel}
      </p>

      {groups ? (
        <div className="space-y-8">
          <p className="text-xs text-muted" style={{ maxWidth: "70ch" }}>
            {RATE_CAVEAT}
          </p>
          {groups.hfea.length > 0 && (
            <section aria-label={GROUP_HFEA}>
              <h3 className="text-[12px] font-[700] uppercase tracking-[0.12em] text-muted mb-3">
                {GROUP_HFEA}
              </h3>
              {grid(groups.hfea)}
            </section>
          )}
          {groups.clinic.length > 0 && (
            <section aria-label={GROUP_CLINIC}>
              <h3 className="text-[12px] font-[700] uppercase tracking-[0.12em] text-muted mb-3">
                {GROUP_CLINIC}
              </h3>
              {grid(groups.clinic)}
            </section>
          )}
        </div>
      ) : (
        grid(clinics)
      )}
    </div>
  );
}
