"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { ClinicBrowser } from "@/components/clinic-browser/clinic-browser";
import { UnifiedComparisonBar } from "./unified-comparison-bar";
import { UnifiedComparisonTable } from "./unified-comparison-table";
import type { InternationalClinic } from "@/types/international-clinic";
import type { ComparableClinic } from "@/types/comparable-clinic";
import { intlClinicToComparable } from "@/types/comparable-clinic";

const LS_KEY = "solo-hq-compare-v2";
const MAX_COMPARE = 4;

interface UnifiedClinicFinderProps {
  intlClinics: InternationalClinic[];
}

export function UnifiedClinicFinder({ intlClinics }: UnifiedClinicFinderProps) {
  const tableRef = useRef<HTMLDivElement>(null);
  const [comparedItems, setComparedItems] = useState<ComparableClinic[]>([]);

  // Restore comparison from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LS_KEY);
      if (stored) {
        const items = JSON.parse(stored) as ComparableClinic[];
        if (Array.isArray(items)) setComparedItems(items);
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist comparison to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(comparedItems));
    } catch {
      // ignore
    }
  }, [comparedItems]);

  const handleToggleCompare = useCallback(
    (slug: string) => {
      setComparedItems((prev) => {
        const exists = prev.find((c) => c.id === slug);
        if (exists) return prev.filter((c) => c.id !== slug);
        if (prev.length >= MAX_COMPARE) return prev;
        const clinic = intlClinics.find((c) => c.slug === slug);
        if (!clinic) return prev;
        return [...prev, intlClinicToComparable(clinic)];
      });
    },
    [intlClinics]
  );

  const handleRemove = useCallback(
    (id: string) => setComparedItems((prev) => prev.filter((c) => c.id !== id)),
    []
  );

  const handleClear = useCallback(() => setComparedItems([]), []);

  const handleCompareNow = useCallback(() => {
    tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const selectedSlugs = comparedItems.map((c) => c.id);
  const maxReached = comparedItems.length >= MAX_COMPARE;

  return (
    <div className={comparedItems.length >= 1 ? "pb-32" : ""}>
      <ClinicBrowser
        clinics={intlClinics}
        countries={[]}
        selectedSlugs={selectedSlugs}
        onToggleCompare={handleToggleCompare}
        maxReached={maxReached}
        selectedCount={comparedItems.length}
      />

      {/* Unified comparison table — visible when 2+ selected */}
      {comparedItems.length >= 2 && (
        <div ref={tableRef} className="mt-10 mb-6">
          <UnifiedComparisonTable clinics={comparedItems} />
        </div>
      )}

      {/* Floating comparison bar */}
      <UnifiedComparisonBar
        selected={comparedItems}
        onRemove={handleRemove}
        onCompare={handleCompareNow}
        onClear={handleClear}
      />
    </div>
  );
}
