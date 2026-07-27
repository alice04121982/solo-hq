"use client";

import { motion } from "framer-motion";
import { ClinicCard } from "./clinic-card";
import type { ClinicData, AgeBracket } from "@/types/clinic";

interface ClinicResultsProps {
  clinics: ClinicData[];
  totalCount: number;
  location: string;
  selectedIds: string[];
  onToggleCompare: (clinic: ClinicData) => void;
  isLoading: boolean;
  source?: "live" | "seed";
  ageBracket: AgeBracket;
}

function SkeletonCard() {
  return (
    <div className="rounded-[32px] bg-white border border-border p-5 animate-pulse">
      <div className="flex gap-2 mb-3">
        <div className="h-5 w-24 rounded-full bg-lavender-light" />
        <div className="h-5 w-20 rounded-full bg-lavender-light" />
      </div>
      <div className="h-5 w-3/4 rounded-lg bg-lavender-light mb-2" />
      <div className="h-3 w-1/2 rounded-lg bg-lavender-light mb-4" />
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-14 rounded-xl bg-card-bg" />
        ))}
      </div>
      <div className="flex gap-2">
        <div className="h-9 flex-1 rounded-full bg-lavender-light" />
        <div className="h-9 w-20 rounded-full bg-lavender-light" />
      </div>
    </div>
  );
}

export function ClinicResults({
  clinics,
  totalCount,
  location,
  selectedIds,
  onToggleCompare,
  isLoading,
  source,
  ageBracket,
}: ClinicResultsProps) {
  if (isLoading) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-2 w-2 rounded-full bg-lavender-dark animate-pulse" />
          <p className="text-sm text-muted">
            Searching for clinics near <strong className="text-navy">{location}</strong>…
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (clinics.length === 0) {
    return (
      <div className="rounded-[32px] bg-white border border-border p-12 text-center">
        <p className="text-navy font-semibold mb-1">No clinics match your filters</p>
        <p className="text-sm text-muted">Try relaxing a filter or clearing all filters to see all results.</p>
      </div>
    );
  }

  const isFiltered = clinics.length < totalCount;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted">
          {isFiltered ? (
            <>
              <strong className="text-navy">{clinics.length}</strong>
              <span className="text-muted"> of {totalCount} clinics</span>
            </>
          ) : (
            <strong className="text-navy">{clinics.length} clinics</strong>
          )}{" "}
          near <strong className="text-navy">{location}</strong>
        </p>
        {source === "seed" && (
          <span className="text-[10px] bg-lavender-light text-lavender-dark px-2.5 py-1 rounded-full font-medium">
            Indicative data — live results loading
          </span>
        )}
        {source === "live" && (
          <span className="text-[10px] bg-lime/20 text-charcoal px-2.5 py-1 rounded-full font-medium">
            Live data
          </span>
        )}
      </div>
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {clinics.map((clinic) => (
          <ClinicCard
            key={clinic.id}
            clinic={clinic}
            isSelected={selectedIds.includes(clinic.id)}
            onToggleCompare={onToggleCompare}
            compareDisabled={selectedIds.length >= 4 && !selectedIds.includes(clinic.id)}
            ageBracket={ageBracket}
          />
        ))}
      </motion.div>
    </div>
  );
}
