"use client";

import { ClinicCard } from "./clinic-card";
import { DEFAULT_RESULT_VARIANT, type ClinicCardVariant } from "@/lib/card-style";
import type { AgeBracket, Clinic } from "@/types/clinic";

interface ClinicResultsProps {
  clinics: Clinic[];
  totalCount: number;
  ageBracketLabel: string;
  ageBracket: AgeBracket;
  selectedSlugs: string[];
  variant?: ClinicCardVariant;
  onToggleCompare: (clinic: Clinic) => void;
}

export function ClinicResults({
  clinics,
  totalCount,
  ageBracketLabel,
  ageBracket,
  selectedSlugs,
  variant = DEFAULT_RESULT_VARIANT,
  onToggleCompare,
}: ClinicResultsProps) {
  if (clinics.length === 0) {
    return (
      <div className="rounded-[24px] bg-background border border-border-warm p-12 text-center">
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
            isSelected={selectedSlugs.includes(clinic.slug)}
            compareDisabled={selectedSlugs.length >= 4}
            variant={variant}
            onToggleCompare={onToggleCompare}
          />
        ))}
      </div>
    </div>
  );
}
