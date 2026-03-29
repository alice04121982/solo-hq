"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { LocationSearch } from "./location-search";
import { ClinicResults } from "./clinic-results";
import { ComparisonBar } from "./comparison-bar";
import { ComparisonTable } from "./comparison-table";
import { DisclaimerBanner } from "./disclaimer-banner";
import type { ClinicData, ClinicSearchResponse } from "@/types/clinic";

const LS_KEY = "solo-hq-compare";

interface ClinicFinderProps {
  initialLocation?: string;
  initialRadius?: number;
}

export function ClinicFinder({ initialLocation, initialRadius = 25 }: ClinicFinderProps) {
  const router = useRouter();
  const tableRef = useRef<HTMLDivElement>(null);

  const [clinics, setClinics] = useState<ClinicData[]>([]);
  const [source, setSource] = useState<"live" | "seed" | undefined>();
  const [fetchedAt, setFetchedAt] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchLocation, setSearchLocation] = useState(initialLocation ?? "");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedClinics, setSelectedClinics] = useState<ClinicData[]>([]);

  // Restore comparison from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LS_KEY);
      if (stored) {
        const ids = JSON.parse(stored) as string[];
        if (Array.isArray(ids)) setSelectedIds(ids);
      }
    } catch {
      // ignore
    }
  }, []);

  // Keep selectedClinics in sync with selectedIds + clinics list
  useEffect(() => {
    setSelectedClinics((prev) => {
      const fromCurrent = clinics.filter((c) => selectedIds.includes(c.id));
      // Also keep any previously selected clinics not in current results
      const fromPrev = prev.filter(
        (c) => selectedIds.includes(c.id) && !fromCurrent.find((fc) => fc.id === c.id)
      );
      return [...fromPrev, ...fromCurrent];
    });
  }, [selectedIds, clinics]);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(selectedIds));
    } catch {
      // ignore
    }
  }, [selectedIds]);

  const fetchClinics = useCallback(async (location: string, radius: number) => {
    setIsLoading(true);
    setHasSearched(true);
    setSearchLocation(location);

    // Update URL
    const params = new URLSearchParams({ location, radius: String(radius) });
    router.replace(`/ivf-finder?${params.toString()}`, { scroll: false });

    try {
      const res = await fetch(
        `/api/clinic-search?location=${encodeURIComponent(location)}&radius=${radius}`
      );
      if (!res.ok) throw new Error("Fetch failed");
      const data = (await res.json()) as ClinicSearchResponse;
      setClinics(data.clinics);
      setSource(data.source);
      setFetchedAt(data.fetchedAt);
    } catch {
      setClinics([]);
      setSource(undefined);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Auto-search if initial location provided
  useEffect(() => {
    if (initialLocation) {
      fetchClinics(initialLocation, initialRadius);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggleCompare = useCallback((clinic: ClinicData) => {
    setSelectedIds((prev) => {
      if (prev.includes(clinic.id)) {
        return prev.filter((id) => id !== clinic.id);
      }
      if (prev.length >= 4) return prev;
      return [...prev, clinic.id];
    });
  }, []);

  const handleRemoveFromCompare = useCallback((id: string) => {
    setSelectedIds((prev) => prev.filter((i) => i !== id));
  }, []);

  const handleClearCompare = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const handleCompareNow = useCallback(() => {
    tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="pb-32">
      {/* Search */}
      <div className="rounded-[32px] bg-card-bg border border-card-border p-6 mb-6">
        <LocationSearch
          initialLocation={initialLocation}
          initialRadius={initialRadius}
          onSearch={fetchClinics}
          isLoading={isLoading}
        />
      </div>

      {/* Results */}
      {(hasSearched || isLoading) && (
        <div className="mb-6">
          <ClinicResults
            clinics={clinics}
            location={searchLocation}
            selectedIds={selectedIds}
            onToggleCompare={handleToggleCompare}
            isLoading={isLoading}
            source={source}
          />
        </div>
      )}

      {/* Comparison Table (shown when 2+ selected) */}
      {selectedClinics.length >= 2 && (
        <div ref={tableRef} className="mb-6">
          <ComparisonTable clinics={selectedClinics} />
        </div>
      )}

      {/* Disclaimer */}
      {hasSearched && !isLoading && <DisclaimerBanner fetchedAt={fetchedAt} />}

      {/* Floating comparison bar */}
      <ComparisonBar
        selected={selectedClinics}
        onRemove={handleRemoveFromCompare}
        onCompare={handleCompareNow}
        onClear={handleClearCompare}
      />
    </div>
  );
}
