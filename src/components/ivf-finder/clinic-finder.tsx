"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ClinicToolbar } from "./clinic-toolbar";
import { FilterPanel } from "./filter-panel";
import { ClinicResults } from "./clinic-results";
import { DEFAULT_FILTERS } from "./clinic-filters";
import { ComparisonBar } from "./comparison-bar";
import { ComparisonTable } from "./comparison-table";
import { DisclaimerBanner } from "./disclaimer-banner";
import type { ClinicData, ClinicSearchResponse } from "@/types/clinic";
import type { FilterState } from "./clinic-filters";

const LS_KEY = "solo-hq-compare";
const DEFAULT_LOCATION = "London";
const DEFAULT_RADIUS = 25;

interface ClinicFinderProps {
  initialLocation?: string;
  initialRadius?: number;
}

export function ClinicFinder({ initialLocation, initialRadius = DEFAULT_RADIUS }: ClinicFinderProps) {
  const router = useRouter();
  const tableRef = useRef<HTMLDivElement>(null);

  // Search state
  const [clinics, setClinics] = useState<ClinicData[]>([]);
  const [source, setSource] = useState<"live" | "seed" | undefined>();
  const [fetchedAt, setFetchedAt] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  // Location state
  const [toolbarLocation, setToolbarLocation] = useState(initialLocation ?? "");
  const [activeLocation, setActiveLocation] = useState(initialLocation ?? DEFAULT_LOCATION);
  const [locationMode, setLocationMode] = useState<"uk" | "international">("uk");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [radius, setRadius] = useState(initialRadius);

  // Filter state
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  // Comparison state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedClinics, setSelectedClinics] = useState<ClinicData[]>([]);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  // Geolocation
  const [geoLoading, setGeoLoading] = useState(false);

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

  // Keep selectedClinics in sync
  useEffect(() => {
    setSelectedClinics((prev) => {
      const fromCurrent = clinics.filter((c) => selectedIds.includes(c.id));
      const fromPrev = prev.filter(
        (c) => selectedIds.includes(c.id) && !fromCurrent.find((fc) => fc.id === c.id)
      );
      return [...fromPrev, ...fromCurrent];
    });
  }, [selectedIds, clinics]);

  // Persist comparison to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(selectedIds));
    } catch {
      // ignore
    }
  }, [selectedIds]);

  const fetchClinics = useCallback(async (location: string, searchRadius: number) => {
    setIsLoading(true);
    setActiveLocation(location);

    const params = new URLSearchParams({ location, radius: String(searchRadius) });
    router.replace(`/ivf-finder?${params.toString()}`, { scroll: false });

    try {
      const res = await fetch(
        `/api/clinic-search?location=${encodeURIComponent(location)}&radius=${searchRadius}`
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

  // Auto-load on mount
  useEffect(() => {
    const loc = initialLocation ?? DEFAULT_LOCATION;
    const r = initialLocation ? initialRadius : 100;
    fetchClinics(loc, r);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply filters
  const filteredClinics = useMemo(() => {
    return clinics.filter((c) => {
      // Country filter
      if (filters.countries.length > 0) {
        const country = c.country ?? "United Kingdom";
        if (!filters.countries.includes(country)) return false;
      }

      // Max price
      if (filters.maxPrice !== null) {
        const low = Math.min(
          c.prices.basicIvf ?? Infinity,
          c.prices.donorSpermIvf ?? Infinity
        );
        if (low === Infinity || low > filters.maxPrice) return false;
      }

      // Min success rate
      if (filters.minSuccessRate !== null) {
        const bracketKey =
          filters.ageBracket === "any" ? "under35" : filters.ageBracket;
        const rate = c.successRates[bracketKey];
        if (rate == null || rate < filters.minSuccessRate) return false;
      }

      return true;
    });
  }, [clinics, filters]);

  // Active filter count (excludes location — that's shown via chips already)
  const activeFilterCount =
    (locationMode === "international" && selectedCountry ? 1 : 0) +
    (locationMode === "uk" && radius !== DEFAULT_RADIUS ? 1 : 0) +
    (filters.ageBracket !== "any" ? 1 : 0) +
    (filters.minSuccessRate !== null ? 1 : 0) +
    (filters.maxPrice !== null ? 1 : 0);

  const handleToolbarSearch = useCallback(() => {
    if (toolbarLocation.trim().length >= 2) {
      fetchClinics(toolbarLocation.trim(), radius);
    }
  }, [toolbarLocation, radius, fetchClinics]);

  const handleGeolocate = useCallback(() => {
    if (!navigator.geolocation) return;
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `https://api.postcodes.io/postcodes?lon=${pos.coords.longitude}&lat=${pos.coords.latitude}&limit=1`
          );
          const data = await res.json();
          if (data.result?.[0]?.postcode) {
            const pc = data.result[0].postcode as string;
            setToolbarLocation(pc);
            setLocationMode("uk");
            setSelectedCountry(null);
            fetchClinics(pc, radius);
          }
        } catch {
          // ignore
        } finally {
          setGeoLoading(false);
        }
      },
      () => setGeoLoading(false)
    );
  }, [radius, fetchClinics]);

  const handleFilterApply = useCallback(
    (
      newFilters: FilterState,
      newRadius: number,
      newMode: "uk" | "international",
      newCountry: string | null
    ) => {
      setFilters(newFilters);
      setRadius(newRadius);
      setLocationMode(newMode);
      setSelectedCountry(newCountry);

      if (newMode === "international" && newCountry) {
        // Search by country
        fetchClinics(newCountry, 0);
      } else if (newMode === "uk") {
        // Re-search with updated radius
        const loc = toolbarLocation.trim() || activeLocation;
        fetchClinics(loc, newRadius);
      }
    },
    [toolbarLocation, activeLocation, fetchClinics]
  );

  const handleClearCountry = useCallback(() => {
    setSelectedCountry(null);
    setLocationMode("uk");
    const loc = toolbarLocation.trim() || DEFAULT_LOCATION;
    fetchClinics(loc, radius);
  }, [toolbarLocation, radius, fetchClinics]);

  const handleToggleCompare = useCallback((clinic: ClinicData) => {
    setSelectedIds((prev) => {
      if (prev.includes(clinic.id)) return prev.filter((id) => id !== clinic.id);
      if (prev.length >= 4) return prev;
      return [...prev, clinic.id];
    });
  }, []);

  const handleRemoveFromCompare = useCallback((id: string) => {
    setSelectedIds((prev) => prev.filter((i) => i !== id));
  }, []);

  const handleClearCompare = useCallback(() => setSelectedIds([]), []);

  const handleCompareNow = useCallback(() => {
    tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className={selectedClinics.length >= 2 ? "pb-32" : ""}>
      {/* ── Toolbar ── */}
      <div className="mb-6">
        <ClinicToolbar
          location={toolbarLocation}
          onLocationChange={(v) => {
            setToolbarLocation(v);
            if (locationMode === "international") setLocationMode("uk");
          }}
          onSearch={handleToolbarSearch}
          onGeolocate={handleGeolocate}
          geoLoading={geoLoading}
          onOpenFilters={() => setFilterPanelOpen(true)}
          activeFilterCount={activeFilterCount}
          filters={filters}
          onFiltersChange={setFilters}
          locationMode={locationMode}
          selectedCountry={selectedCountry}
          radius={radius}
          onClearCountry={handleClearCountry}
        />
      </div>

      {/* ── Results ── */}
      <div className="mb-6">
        <ClinicResults
          clinics={filteredClinics}
          totalCount={clinics.length}
          location={locationMode === "international" && selectedCountry ? selectedCountry : activeLocation}
          selectedIds={selectedIds}
          onToggleCompare={handleToggleCompare}
          isLoading={isLoading}
          source={source}
          ageBracket={filters.ageBracket}
        />
      </div>

      {/* ── Comparison Table ── */}
      {selectedClinics.length >= 2 && (
        <div ref={tableRef} className="mb-6">
          <ComparisonTable clinics={selectedClinics} />
        </div>
      )}

      {/* ── Disclaimer ── */}
      {!isLoading && clinics.length > 0 && (
        <DisclaimerBanner fetchedAt={fetchedAt} />
      )}

      {/* ── Floating comparison bar ── */}
      <ComparisonBar
        selected={selectedClinics}
        onRemove={handleRemoveFromCompare}
        onCompare={handleCompareNow}
        onClear={handleClearCompare}
      />

      {/* ── Filter panel ── */}
      <FilterPanel
        isOpen={filterPanelOpen}
        onClose={() => setFilterPanelOpen(false)}
        filters={filters}
        radius={radius}
        locationMode={locationMode}
        selectedCountry={selectedCountry}
        onApply={handleFilterApply}
      />
    </div>
  );
}
