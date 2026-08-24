"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { AGE_BRACKETS, type Clinic } from "@/types/clinic";
import { DATA_PROVENANCE, rankBySuccessRate } from "@/lib/clinics";
import { exclusionsMatchingGeography } from "@/lib/clinic-exclusions";
import {
  CARD_VARIANT_PARAM,
  DEFAULT_RESULT_VARIANT,
  DEFAULT_TOP_PERFORMER_VARIANT,
  parseCardVariant,
} from "@/lib/card-style";
import { RegulatorNotice } from "@/components/regulator-notice";

function formatVerifiedDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
import {
  ActiveFilterTags,
  DEFAULT_FINDER_FILTERS,
  FilterControls,
  countActiveFilters,
  matchesFilters,
  type FinderFilterState,
} from "./finder-filters";
import { FilterSheet } from "./filter-sheet";
import { TopPerformers } from "./top-performers";
import { ClinicResults } from "./clinic-results";
import { ComparisonBar } from "./comparison-bar";
import { ComparisonTable } from "./comparison-table";
import { DisclaimerBanner } from "./disclaimer-banner";
import { RemovedClinics } from "./removed-clinics";

const COMPARE_PARAM = "compare";
const COMPARE_CAP = 4;

interface ClinicFinderProps {
  clinics: Clinic[];
}

/**
 * The Cairn clinic finder: one search across every clinic in the database, UK
 * and international together. Geography is a filter like any other, never a
 * gate ahead of results.
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

  const rankedClinics = useMemo(
    () => rankBySuccessRate(filteredClinics, filters.ageBracket),
    [filteredClinics, filters.ageBracket]
  );

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

  // ?cards=paper|citrus|outline forces both grids onto one card treatment, so
  // the options can be compared on the real page with the real data. Absent or
  // unrecognised, each grid keeps its own default.
  const cardOverride = parseCardVariant(searchParams.get(CARD_VARIANT_PARAM));

  return (
    <div className={selectedClinics.length >= 2 ? "pb-32" : ""}>
      {/* ── Filters: inline on desktop, a sheet on mobile ── */}
      <div className="hidden md:block rounded-[24px] bg-background p-6 mb-4">
        <FilterControls
          filters={filters}
          onChange={setFilters}
          onClearAll={() =>
            setFilters({ ...DEFAULT_FINDER_FILTERS, ageBracket: filters.ageBracket })
          }
        />
      </div>
      <div className="md:hidden mb-4">
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="flex items-center gap-2 rounded-full border border-teal/20 bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover"
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden />
          Filters
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

      {/* Standing context: the lines that must sit above every result. What
          this list is comes first — a reader comparing three clinics needs to
          know it is a checked selection, not a register of everything that
          exists, before they read anything into a clinic's absence. */}
      <p className="text-xs text-muted mb-6">
        These are {clinics.length} clinics we have checked by hand, not a complete register of
        every clinic in the world: a clinic missing from this list has usually not been added
        yet. Tell us what is missing at{" "}
        <a
          href="mailto:stories@cairnfertility.com"
          className="font-medium text-teal hover:underline underline-offset-2"
        >
          stories@cairnfertility.com
        </a>
        . UK success rates come from the HFEA register and are independently verified. Overseas
        figures are self-reported by clinics and are not directly comparable. Prices are
        indicative, compiled from {DATA_PROVENANCE.pricesSourceLabel}, and were last verified
        on {formatVerifiedDate(DATA_PROVENANCE.pricesVerifiedOn)}.
      </p>

      {/* ── Top performers ── */}
      <div className="mb-8">
        <TopPerformers
          clinics={filteredClinics}
          ageBracket={filters.ageBracket}
          selectedSlugs={selectedSlugs}
          compareDisabled={selectedSlugs.length >= COMPARE_CAP}
          variant={cardOverride ?? DEFAULT_TOP_PERFORMER_VARIANT}
          onToggleCompare={handleToggleCompare}
        />
      </div>

      {/* ── Results ── */}
      <div className="mb-6">
        <ClinicResults
          clinics={rankedClinics}
          totalCount={clinics.length}
          removedCount={geoFiltered ? relevantExclusions.length : 0}
          ageBracketLabel={bracketLabel}
          ageBracket={filters.ageBracket}
          selectedSlugs={selectedSlugs}
          variant={cardOverride ?? DEFAULT_RESULT_VARIANT}
          onToggleCompare={handleToggleCompare}
        />
      </div>

      {/* Sits with the results, not with the small print below: what has been
          taken out of this list is part of the answer to a search. */}
      <div className="mb-6">
        <RemovedClinics
          exclusions={relevantExclusions}
          targeted={geoFiltered}
          resultsEmpty={rankedClinics.length === 0}
        />
      </div>

      {/* ── Comparison table ── */}
      {selectedClinics.length >= 2 && (
        <div ref={tableRef} className="mb-6">
          <ComparisonTable
            clinics={selectedClinics}
            ageBracket={filters.ageBracket}
            ageBracketLabel={bracketLabel}
            onRemove={handleRemove}
          />
        </div>
      )}

      <div className="space-y-4">
        <RegulatorNotice />
        <DisclaimerBanner />
      </div>

      <ComparisonBar
        selected={selectedClinics}
        onRemove={handleRemove}
        onCompare={handleCompareNow}
        onClear={handleClear}
      />

      <FilterSheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        filters={filters}
        onChange={setFilters}
        resultCount={rankedClinics.length}
      />
    </div>
  );
}
