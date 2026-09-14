"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Info, SlidersHorizontal } from "lucide-react";
import { AGE_BRACKETS, type Clinic } from "@/types/clinic";
import { sortClinics } from "@/lib/clinics";
import type { FinderLocation } from "@/lib/geo";
import { exclusionsMatchingGeography } from "@/lib/clinic-exclusions";
import { CARD_VARIANT_PARAM, DEFAULT_RESULT_VARIANT, parseCardVariant } from "@/lib/card-style";
import { RegulatorNotice } from "@/components/regulator-notice";
import {
  ActiveFilterTags,
  DEFAULT_FINDER_FILTERS,
  FilterControls,
  clearedFilters,
  countActiveFilters,
  matchesFilters,
  withLocation,
  type FinderFilterState,
} from "./finder-filters";
import { FilterSheet } from "./filter-sheet";
import { LocationSearch } from "./location-search";
import { AboutFiguresDrawer } from "./about-figures-drawer";
import { ClinicResults } from "./clinic-results";
import { ComparisonBar } from "./comparison-bar";
import { ComparisonTable } from "./comparison-table";
import { RemovedClinics } from "./removed-clinics";

const COMPARE_PARAM = "compare";
const COMPARE_CAP = 4;

interface ClinicFinderProps {
  clinics: Clinic[];
}

/**
 * The Cairn clinic finder: one search across every clinic in the database, UK
 * and international together. Geography is a filter like any other, never a
 * gate ahead of results. The default order is alphabetical; nothing is ranked
 * unless the reader asks for a sort, and a sort by rate keeps HFEA figures
 * and clinics' own figures in separate groups.
 *
 * Saying where you are puts the nearest clinics first, with the rest of the
 * world following in the same list, and adds a distance ceiling to the
 * filters. The location lives in component state only, never in the URL,
 * so a shared link carries the comparison and not where someone lives.
 *
 * The comparison selection lives in the URL (?compare=slug-a,slug-b), so it
 * survives refreshes, can be shared, and persists untouched while filters
 * change around it.
 */
export function ClinicFinder({ clinics }: ClinicFinderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tableRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState<FinderFilterState>(DEFAULT_FINDER_FILTERS);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const setLocation = useCallback(
    (location: FinderLocation | null) => setFilters((f) => withLocation(f, location)),
    []
  );
  const closeAbout = useCallback(() => setAboutOpen(false), []);

  const knownSlugs = useMemo(() => new Set(clinics.map((c) => c.slug)), [clinics]);
  const selectedSlugs = useMemo(() => {
    const raw = searchParams.get(COMPARE_PARAM);
    if (!raw) return [];
    return [...new Set(raw.split(","))].filter((s) => knownSlugs.has(s)).slice(0, COMPARE_CAP);
  }, [searchParams, knownSlugs]);

  const setSelectedSlugs = useCallback(
    (slugs: string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      if (slugs.length > 0) params.set(COMPARE_PARAM, slugs.join(","));
      else params.delete(COMPARE_PARAM);
      // Slugs are url-safe, so keep the commas literal and the URL shareable.
      const query = params.toString().replace(/%2C/g, ",");
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const handleToggleCompare = useCallback(
    (clinic: Clinic) => {
      if (selectedSlugs.includes(clinic.slug)) {
        setSelectedSlugs(selectedSlugs.filter((s) => s !== clinic.slug));
      } else if (selectedSlugs.length < COMPARE_CAP) {
        setSelectedSlugs([...selectedSlugs, clinic.slug]);
      }
    },
    [selectedSlugs, setSelectedSlugs]
  );

  const handleRemove = useCallback(
    (slug: string) => setSelectedSlugs(selectedSlugs.filter((s) => s !== slug)),
    [selectedSlugs, setSelectedSlugs]
  );

  const handleClear = useCallback(() => setSelectedSlugs([]), [setSelectedSlugs]);

  const handleCompareNow = useCallback(() => {
    tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // The selection is resolved against the full database, not the filtered
  // list, so a compared clinic stays compared when a filter hides it.
  const selectedClinics = useMemo(
    () =>
      selectedSlugs
        .map((slug) => clinics.find((c) => c.slug === slug))
        .filter((c): c is Clinic => c != null),
    [selectedSlugs, clinics]
  );

  const filteredClinics = useMemo(
    () => clinics.filter((c) => matchesFilters(c, filters)),
    [clinics, filters]
  );

  const sortedClinics = useMemo(
    () => sortClinics(filteredClinics, filters.sort, filters.ageBracket, filters.location),
    [filteredClinics, filters.sort, filters.ageBracket, filters.location]
  );

  // When the distance ceiling is what emptied the list, find the nearest
  // clinic the other filters would still allow, so the empty state can say
  // how far away it is instead of just asking for a looser filter.
  const nearestBeyondCeiling = useMemo(() => {
    if (sortedClinics.length > 0 || !filters.location || filters.maxDistanceMiles == null) return null;
    const relaxed = { ...filters, maxDistanceMiles: null };
    const candidates = clinics.filter((c) => matchesFilters(c, relaxed));
    return sortClinics(candidates, "distance", filters.ageBracket, filters.location)[0] ?? null;
  }, [sortedClinics.length, clinics, filters]);

  // Removals answer the geography filters like a clinic would, so filtering
  // to somewhere we have removed a clinic from returns the removal rather
  // than an empty list.
  const geoFiltered = filters.regions.length > 0 || filters.countries.length > 0;
  const relevantExclusions = useMemo(
    () => exclusionsMatchingGeography(filters.regions, filters.countries),
    [filters.regions, filters.countries]
  );

  const bracketLabel =
    AGE_BRACKETS.find((b) => b.value === filters.ageBracket)?.label ?? "";
  const activeFilterCount = countActiveFilters(filters);

  // ?cards=paper|outline forces the grid onto one card treatment, so the
  // options can be compared on the real page with the real data.
  const cardOverride = parseCardVariant(searchParams.get(CARD_VARIANT_PARAM));

  const clearAll = () => setFilters(clearedFilters(filters));

  return (
    <div className={selectedClinics.length >= 2 ? "pb-32" : ""}>
      {/* ── Where are you? Nearest first, the rest of the world after ── */}
      <div className="rounded-[24px] bg-background p-4 md:p-6 mb-4">
        <LocationSearch value={filters.location} onChange={setLocation} />
      </div>

      {/* ── Filters and sort: inline on desktop, a sheet on mobile ── */}
      <div className="hidden md:block rounded-[24px] bg-background p-6 mb-4">
        <FilterControls filters={filters} onChange={setFilters} onClearAll={clearAll} />
      </div>
      <div className="md:hidden mb-4">
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="flex items-center gap-2 rounded-full bg-surface-hover px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-teal-10"
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden />
          Filters and sort
          {activeFilterCount > 0 && (
            <span className="flex items-center justify-center w-5 h-5 rounded-full text-[13px] font-bold bg-teal text-on-teal">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* The active-filter Tags stand in for the filter row on mobile, where it
          sits behind the sheet. On desktop the row states its own selections,
          so repeating them here would be the same list twice. */}
      <div className="md:hidden mb-6">
        <ActiveFilterTags filters={filters} onChange={setFilters} />
      </div>

      {/* ── About these figures: one line, the detail behind the info icon ── */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-6 text-sm">
        <button
          type="button"
          onClick={() => setAboutOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={aboutOpen}
          className="inline-flex items-center gap-1.5 font-semibold text-teal-ink hover:text-teal transition-colors"
        >
          About these figures
          <Info className="h-4 w-4" aria-hidden />
          <span className="sr-only">: where they come from and what they measure</span>
        </button>
        <Link href="/about#methodology" className="font-medium text-teal hover:underline underline-offset-2">
          How we check these figures
        </Link>
        <Link href="/support" className="font-medium text-teal hover:underline underline-offset-2">
          Looking after yourself
        </Link>
      </div>

      {/* ── Results ── */}
      <div className="mb-6">
        <ClinicResults
          clinics={sortedClinics}
          totalCount={clinics.length}
          removedCount={geoFiltered ? relevantExclusions.length : 0}
          sort={filters.sort}
          ageBracketLabel={bracketLabel}
          ageBracket={filters.ageBracket}
          selectedSlugs={selectedSlugs}
          variant={cardOverride ?? DEFAULT_RESULT_VARIANT}
          origin={filters.location}
          nearestBeyondCeiling={nearestBeyondCeiling}
          onToggleCompare={handleToggleCompare}
        />
      </div>

      {/* Sits with the results, not with the small print below: what has been
          left out of this list is part of the answer to a search. */}
      <div className="mb-6">
        <RemovedClinics
          exclusions={relevantExclusions}
          targeted={geoFiltered}
          resultsEmpty={sortedClinics.length === 0}
        />
      </div>

      {/* ── Comparison table ── */}
      {selectedClinics.length >= 2 && (
        <div ref={tableRef} className="mb-6">
          <ComparisonTable
            clinics={selectedClinics}
            ageBracket={filters.ageBracket}
            ageBracketLabel={bracketLabel}
            origin={filters.location}
            onRemove={handleRemove}
          />
        </div>
      )}

      <p className="text-xs text-muted mb-4">
        A clinic missing from this list has usually not been added yet. Tell us what is missing at{" "}
        <a
          href="mailto:stories@cairnfertility.com"
          className="font-medium text-teal hover:underline underline-offset-2"
        >
          stories@cairnfertility.com
        </a>
        .
      </p>

      <RegulatorNotice />

      <ComparisonBar
        selected={selectedClinics}
        onRemove={handleRemove}
        onCompare={handleCompareNow}
        onClear={handleClear}
      />

      <AboutFiguresDrawer isOpen={aboutOpen} onClose={closeAbout} clinicCount={clinics.length} />

      <FilterSheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        filters={filters}
        onChange={setFilters}
        resultCount={sortedClinics.length}
      />
    </div>
  );
}
