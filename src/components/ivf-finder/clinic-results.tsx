"use client";

import { ClinicCard } from "./clinic-card";
import type { AgeBracket, Clinic, Treatment } from "@/types/clinic";

interface ClinicResultsProps {
  clinics: Clinic[];
  totalCount: number;
  ageBracketLabel: string;
  ageBracket: AgeBracket;
  /** Passed to the cards so each shows the price the search was priced on. */
  selectedTreatments: Treatment[];
  selectedSlugs: string[];
  onToggleCompare: (clinic: Clinic) => void;
}

export function ClinicResults({
  clinics,
  totalCount,
  ageBracketLabel,
  ageBracket,
  selectedTreatments,
  selectedSlugs,
  onToggleCompare,
}: ClinicResultsProps) {
  if (clinics.length === 0) {
    return (
      <div className="rounded-[24px] bg-background border border-border p-12 text-center">
        <p className="text-teal-ink font-semibold mb-1">No clinics match your filters</p>
        <p className="text-sm text-muted">
          Relax a filter or clear all filters to see every clinic again.
        </p>
      </div>
    );
  }

  const isFiltered = clinics.length < totalCount;

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
        ranked by live birth rate for {ageBracketLabel.toLowerCase()}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {clinics.map((clinic) => (
          <ClinicCard
            key={clinic.slug}
            clinic={clinic}
            ageBracket={ageBracket}
            selectedTreatments={selectedTreatments}
            isSelected={selectedSlugs.includes(clinic.slug)}
            compareDisabled={selectedSlugs.length >= 4}
            onToggleCompare={onToggleCompare}
          />
        ))}
      </div>
    </div>
  );
}
