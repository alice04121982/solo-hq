"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { LocationSearch } from "./location-search";
import { ClinicResults } from "./clinic-results";
import { DisclaimerBanner } from "./disclaimer-banner";
import type { ClinicData, ClinicSearchResponse } from "@/types/clinic";

interface ClinicFinderProps {
  initialLocation?: string;
  initialRadius?: number;
  /** IDs currently selected in the unified comparison (UK clinics only) */
  selectedIds: string[];
  /** Called when user adds/removes a UK clinic from comparison */
  onToggleCompare: (clinic: ClinicData) => void;
  /** True when the global comparison pool is at max capacity */
  maxReached?: boolean;
}

export function ClinicFinder({
  initialLocation,
  initialRadius = 25,
  selectedIds,
  onToggleCompare,
  maxReached = false,
}: ClinicFinderProps) {
  const router = useRouter();

  const [clinics, setClinics] = useState<ClinicData[]>([]);
  const [source, setSource] = useState<"live" | "seed" | undefined>();
  const [fetchedAt, setFetchedAt] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchLocation, setSearchLocation] = useState(initialLocation ?? "");

  const fetchClinics = useCallback(
    async (location: string, radius: number) => {
      setIsLoading(true);
      setHasSearched(true);
      setSearchLocation(location);

      // Sync location + radius into URL (keep tab param)
      const url = new URL(window.location.href);
      url.searchParams.set("tab", "uk");
      url.searchParams.set("location", location);
      url.searchParams.set("radius", String(radius));
      router.replace(url.pathname + "?" + url.searchParams.toString(), { scroll: false });

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
    },
    [router]
  );

  // Auto-search if initial location provided
  useEffect(() => {
    if (initialLocation) {
      fetchClinics(initialLocation, initialRadius);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
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
        <ClinicResults
          clinics={clinics}
          location={searchLocation}
          selectedIds={selectedIds}
          onToggleCompare={onToggleCompare}
          isLoading={isLoading}
          source={source}
          maxReached={maxReached}
        />
      )}

      {/* Disclaimer */}
      {hasSearched && !isLoading && <DisclaimerBanner fetchedAt={fetchedAt} />}
    </div>
  );
}
