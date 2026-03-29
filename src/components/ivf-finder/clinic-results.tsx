"use client";

import { motion } from "framer-motion";
import { ClinicCard } from "./clinic-card";
import type { ClinicData } from "@/types/clinic";

interface ClinicResultsProps {
  clinics: ClinicData[];
  location: string;
  selectedIds: string[];
  onToggleCompare: (clinic: ClinicData) => void;
  isLoading: boolean;
  source?: "live" | "seed";
}

function SkeletonCard() {
  return (
    <div className="rounded-[32px] bg-card-bg border border-card-border p-5 animate-pulse">
      <div className="flex gap-2 mb-3">
        <div className="h-5 w-24 rounded-full bg-lavender-light" />
        <div className="h-5 w-20 rounded-full bg-lavender-light" />
      </div>
      <div className="h-5 w-3/4 rounded-lg bg-lavender-light mb-2" />
      <div className="h-3 w-1/2 rounded-lg bg-lavender-light mb-4" />
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-14 rounded-xl bg-warm-white" />
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
  location,
  selectedIds,
  onToggleCompare,
  isLoading,
  source,
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
      <div className="rounded-[32px] bg-warm-white border border-card-border p-12 text-center">
        <p className="text-navy font-semibold mb-1">No clinics found</p>
        <p className="text-sm text-muted">Try increasing your search radius or checking your postcode.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted">
          <strong className="text-navy">{clinics.length} clinics</strong> near{" "}
          <strong className="text-navy">{location}</strong>
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
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        {clinics.map((clinic) => (
          <ClinicCard
            key={clinic.id}
            clinic={clinic}
            isSelected={selectedIds.includes(clinic.id)}
            onToggleCompare={onToggleCompare}
            compareDisabled={selectedIds.length >= 4 && !selectedIds.includes(clinic.id)}
          />
        ))}
      </motion.div>
    </div>
  );
}
