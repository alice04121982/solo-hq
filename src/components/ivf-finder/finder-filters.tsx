"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";
import {
  AGE_BRACKETS,
  REGIONS,
  TREATMENTS,
  type AgeBracket,
  type Clinic,
  type Region,
  type Treatment,
} from "@/types/clinic";
import {
  cheapestPublishedPrice,
  DISTANCE_SORT,
  FINDER_SORTS,
  priceBounds,
  rateFor,
  verdictFor,
  type FinderSort,
} from "@/lib/clinics";
import { DISTANCE_CEILINGS_MILES, distanceMiles, type FinderLocation } from "@/lib/geo";
import { RATE_NOTE } from "@/lib/rate-labels";
import {
  FilterTogglePill,
  MultiSelectDropdown,
  SingleSelectDropdown,
  type FilterOption,
} from "./filter-dropdown";
import { CountrySelect } from "./country-select";
import { CountryFlag } from "@/components/country-flag";

/**
 * Filter state for the Cairn clinic finder.
 *
 * Everything except the age bracket and the sort is optional and combinable,
 * and none of it gates results: the empty state matches every clinic in the
 * database. The age bracket is required because it chooses which published
 * figure a card shows, not because it narrows the list. The sort is display
 * order only and is never counted as a filter.
 */
export interface FinderFilterState {
  ageBracket: AgeBracket;
  sort: FinderSort;
  regions: Region[];
  countries: string[];
  treatments: Treatment[];
  /** GBP per cycle. null = no ceiling. */
  priceCeiling: number | null;
  donorAnonymity: "any" | "identifiable" | "anonymous";
  remoteConsultation: boolean;
  /**
   * Narrow by the published rate for the chosen age bracket. The two
   * "average" options use the HFEA's own verdict on each UK clinic, so they
   * never compare figures across clinics ourselves; overseas clinics have no
   * verdict and drop out of those two. "published" keeps any clinic with a
   * figure for the bracket, whoever published it.
   */
  successRate: SuccessRateFilter;
  /**
   * Where the reader is, when they have said. Not a filter: it orders the
   * list nearest-first and unlocks the distance ceiling below, but on its own
   * it hides nothing, so it is not counted as active and survives "Clear all".
   */
  location: FinderLocation | null;
  /** Miles from `location`. null = any distance. Ignored without a location. */
  maxDistanceMiles: number | null;
}

export type SuccessRateFilter = "any" | "above" | "consistentOrAbove" | "published";

export const DEFAULT_FINDER_FILTERS: FinderFilterState = {
  ageBracket: "under35",
  sort: "name",
  regions: [],
  countries: [],
  treatments: [],
  priceCeiling: null,
  donorAnonymity: "any",
  remoteConsultation: false,
  successRate: "any",
  location: null,
  maxDistanceMiles: null,
};

const DISTANCE_OPTIONS: FilterOption<string>[] = [
  { value: "any", label: "Any distance" },
  ...DISTANCE_CEILINGS_MILES.map((m) => ({
    value: String(m),
    label: `Within ${m} miles`,
    shortLabel: `within ${m} miles`,
  })),
];

/**
 * Filters and sort as they should stand once a location is set or cleared.
 * Setting one moves a list still in its default alphabetical order to
 * nearest-first, the same courtesy the success-rate filter extends to the
 * rate sort; clearing it drops the distance ceiling and any distance sort,
 * which mean nothing without a point to measure from.
 */
export function withLocation(f: FinderFilterState, location: FinderLocation | null): FinderFilterState {
  if (location) {
    return { ...f, location, sort: f.sort === "name" ? "distance" : f.sort };
  }
  return {
    ...f,
    location: null,
    maxDistanceMiles: null,
    sort: f.sort === "distance" ? "name" : f.sort,
  };
}

const SUCCESS_RATE_OPTIONS: FilterOption<SuccessRateFilter>[] = [
  { value: "any", label: "Any" },
  {
    value: "above",
    label: "Above the national average (HFEA)",
    shortLabel: "above national average",
  },
  {
    value: "consistentOrAbove",
    label: "At or above the national average (HFEA)",
    shortLabel: "at or above national average",
  },
  { value: "published", label: "Has a published rate", shortLabel: "published rate" },
];

const SUCCESS_RATE_NOTE =
  "The average options use the HFEA's own verdict for the chosen age group, so they show UK clinics only. Rates are averages across many patients, not a prediction for you.";

const DONOR_OPTIONS: FilterOption<FinderFilterState["donorAnonymity"]>[] = [
  { value: "any", label: "Any" },
  { value: "identifiable", label: "Identifiable donors only", shortLabel: "identifiable only" },
  { value: "anonymous", label: "Anonymous available", shortLabel: "anonymous available" },
];

/**
 * Budget ceilings offered in the price filter. A ladder of round numbers reads
 * faster than a slider and states exactly what it will do; the ones outside
 * the published price range are dropped, so no option returns everything or
 * nothing.
 */
const PRICE_CEILINGS = [1500, 2500, 3500, 4500, 5500, 7500, 10000];

export function priceCeilingOptions(): FilterOption<string>[] {
  const { min, max } = priceBounds();
  return [
    { value: "any", label: "Any price" },
    ...PRICE_CEILINGS.filter((c) => c > min && c < max).map((c) => ({
      value: String(c),
      label: `Up to £${c.toLocaleString()}`,
      shortLabel: `up to £${c.toLocaleString()}`,
    })),
  ];
}

/**
 * The price the ceiling filter compares against, priced per treatment: IUI is
 * a fraction of an IVF cycle, so a £1,500 budget with IUI selected must look
 * at the IUI price, not the IVF headline. With no treatment selected, the
 * clinic's cheapest published price counts, "treatment under £5k" includes
 * IUI, not just IVF. Undefined means nothing relevant is published, and the
 * clinic is excluded while a ceiling is set.
 */
function priceForCeiling(clinic: Clinic, selected: Treatment[]): number | undefined {
  if (selected.length === 0) return cheapestPublishedPrice(clinic);
  const prices = selected
    .map((t) => (t === "IUI" ? clinic.iuiPricePerCycleGbp : clinic.pricePerCycleGbp))
    .filter((p): p is number => p != null);
  return prices.length > 0 ? Math.min(...prices) : undefined;
}

export function matchesFilters(clinic: Clinic, f: FinderFilterState): boolean {
  // Region and country narrow the same list. Either matching keeps the
  // clinic, so adding a country never silently blanks out a selected region.
  const geoActive = f.regions.length > 0 || f.countries.length > 0;
  if (geoActive && !f.regions.includes(clinic.region) && !f.countries.includes(clinic.country)) {
    return false;
  }

  if (f.treatments.length > 0 && !f.treatments.every((t) => clinic.treatments.includes(t))) {
    return false;
  }

  if (f.priceCeiling != null) {
    const price = priceForCeiling(clinic, f.treatments);
    if (price == null || price > f.priceCeiling) {
      return false;
    }
  }

  if (f.donorAnonymity === "identifiable" && clinic.donorAnonymity !== "identifiable") {
    return false;
  }
  if (
    f.donorAnonymity === "anonymous" &&
    clinic.donorAnonymity !== "anonymous" &&
    clinic.donorAnonymity !== "both"
  ) {
    return false;
  }

  if (f.remoteConsultation && !clinic.remoteConsultation) return false;

  if (
    f.location &&
    f.maxDistanceMiles != null &&
    distanceMiles(f.location, clinic.coordinates) > f.maxDistanceMiles
  ) {
    return false;
  }

  if (f.successRate === "published" && rateFor(clinic, f.ageBracket) == null) return false;
  if (f.successRate === "above" && verdictFor(clinic, f.ageBracket) !== "above") return false;
  if (f.successRate === "consistentOrAbove") {
    const verdict = verdictFor(clinic, f.ageBracket);
    if (verdict !== "above" && verdict !== "consistent") return false;
  }

  return true;
}

/**
 * Every optional filter off, keeping what is not a filter: the age bracket,
 * the sort, and the location.
 */
export function clearedFilters(f: FinderFilterState): FinderFilterState {
  return { ...DEFAULT_FINDER_FILTERS, ageBracket: f.ageBracket, sort: f.sort, location: f.location };
}

export function countActiveFilters(f: FinderFilterState): number {
  return (
    f.regions.length +
    f.countries.length +
    f.treatments.length +
    (f.priceCeiling != null ? 1 : 0) +
    (f.donorAnonymity !== "any" ? 1 : 0) +
    (f.remoteConsultation ? 1 : 0) +
    (f.successRate !== "any" ? 1 : 0) +
    (f.location && f.maxDistanceMiles != null ? 1 : 0)
  );
}

/**
 * A filter Tag: user-owned and removable, unlike the read-only verification
 * Badges on the result cards. Active Tags carry an inline remove affordance.
 */
function FilterTag({
  label,
  active,
  onToggle,
}: {
  label: ReactNode;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      className={`group inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "bg-teal text-on-teal hover:text-white"
          : "bg-background text-teal hover:bg-teal hover:text-white"
      }`}
    >
      {label}
      {active && <X className="h-3 w-3 group-hover:text-on-teal transition-colors" aria-hidden />}
    </button>
  );
}

interface FilterControlsProps {
  filters: FinderFilterState;
  onChange: (f: FinderFilterState) => void;
}

/**
 * The finder's filter controls: one horizontal row of dropdowns, wrapping on
 * narrow screens. Every filter is the same pill-and-panel shape, so the row
 * scans in one pass and the explanatory copy lives inside the panel it
 * belongs to instead of padding out the page.
 *
 * Each pill states its own selection, so where the row itself is visible it is
 * the whole account of the current narrowing, no second strip repeating it.
 *
 * Rendered inline on desktop and inside the filter sheet on mobile, so both
 * share one source of truth.
 */
export function FilterControls({ filters, onChange, onClearAll }: FilterControlsProps & {
  /**
   * Renders a reset at the end of the row once anything is active. Omitted
   * where a surrounding surface already offers one, as the mobile sheet does.
   */
  onClearAll?: () => void;
}) {
  const ageOptions: FilterOption<AgeBracket>[] = AGE_BRACKETS.map((b) => ({
    value: b.value,
    label: b.label,
  }));
  const regionOptions: FilterOption<Region>[] = REGIONS.map((r) => ({ value: r, label: r }));
  const treatmentOptions: FilterOption<Treatment>[] = TREATMENTS.map((t) => ({
    value: t,
    label: t,
  }));
  const priceOptions = priceCeilingOptions();
  // Distance is only an order once there is somewhere to measure from.
  const sortOptions: FilterOption<FinderSort>[] = [
    ...(filters.location ? [DISTANCE_SORT] : []),
    ...FINDER_SORTS,
  ].map((s) => ({
    value: s.value,
    label: s.label,
    shortLabel: s.label.toLowerCase(),
  }));

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Age chooses which published figure each card shows, so it is
          required and always shows its value. */}
      <SingleSelectDropdown
        label="Age"
        options={ageOptions}
        value={filters.ageBracket}
        defaultValue={DEFAULT_FINDER_FILTERS.ageBracket}
        alwaysShowValue
        onChange={(ageBracket) => onChange({ ...filters, ageBracket })}
        note={RATE_NOTE}
      />

      {/* Only meaningful with a location set, so it appears with one. */}
      {filters.location && (
        <SingleSelectDropdown
          label="Distance"
          options={DISTANCE_OPTIONS}
          value={filters.maxDistanceMiles == null ? "any" : String(filters.maxDistanceMiles)}
          defaultValue="any"
          onChange={(value) =>
            onChange({ ...filters, maxDistanceMiles: value === "any" ? null : Number(value) })
          }
          note={`Straight-line miles from ${
            filters.location.source === "device" ? "your location" : filters.location.label
          }. Clinics abroad stay in the list at "Any distance".`}
        />
      )}

      {/* Region and country narrow the same list; neither gates it. */}
      <MultiSelectDropdown
        label="Region"
        options={regionOptions}
        selected={filters.regions}
        onChange={(regions) => onChange({ ...filters, regions })}
      />
      <CountrySelect
        selected={filters.countries}
        onChange={(countries) => onChange({ ...filters, countries })}
      />

      <MultiSelectDropdown
        label="Treatment"
        options={treatmentOptions}
        selected={filters.treatments}
        onChange={(treatments) => onChange({ ...filters, treatments })}
      />

      <SingleSelectDropdown
        label="Price"
        options={priceOptions}
        value={filters.priceCeiling == null ? "any" : String(filters.priceCeiling)}
        defaultValue="any"
        onChange={(value) =>
          onChange({ ...filters, priceCeiling: value === "any" ? null : Number(value) })
        }
        note="Filters on IUI price if you pick IUI, otherwise on the IVF price."
      />

      <SingleSelectDropdown
        label="Donor anonymity"
        options={DONOR_OPTIONS}
        value={filters.donorAnonymity}
        defaultValue="any"
        onChange={(donorAnonymity) => onChange({ ...filters, donorAnonymity })}
      />

      <FilterTogglePill
        label="Remote consultations"
        active={filters.remoteConsultation}
        onToggle={() => onChange({ ...filters, remoteConsultation: !filters.remoteConsultation })}
      />

      {/* Someone narrowing by rate wants the strongest figures first, so
          choosing an option here also moves the list into rate order when
          it is still in the default alphabetical order. The sort stays
          theirs to change afterwards. */}
      <SingleSelectDropdown
        label="Success rate"
        options={SUCCESS_RATE_OPTIONS}
        value={filters.successRate}
        defaultValue="any"
        onChange={(successRate) =>
          onChange({
            ...filters,
            successRate,
            sort: successRate !== "any" && filters.sort === "name" ? "rate" : filters.sort,
          })
        }
        note={SUCCESS_RATE_NOTE}
      />

      {/* Display order, not a filter: it never narrows the list and is not
          counted in the active-filter badge. */}
      <SingleSelectDropdown
        label="Sort"
        options={sortOptions}
        value={filters.sort}
        defaultValue={DEFAULT_FINDER_FILTERS.sort}
        alwaysShowValue
        onChange={(sort) => onChange({ ...filters, sort })}
        note="Sorting by rate shows HFEA register figures and clinics' own figures as two separate groups, because the measures differ."
      />

      {onClearAll && countActiveFilters(filters) > 0 && (
        <button
          type="button"
          onClick={onClearAll}
          className="ml-1 px-2 py-2 text-sm font-medium text-muted underline underline-offset-2 hover:text-teal transition-colors"
        >
          Clear all
        </button>
      )}
    </div>
  );
}

/**
 * Removable Tags for every active optional filter. These stand in for the
 * filter row where it is not on screen, on mobile, where the controls live
 * behind the sheet, so the current narrowing is still visible and reversible
 * in one tap. The age bracket is not here: it is required, so it has no
 * removed state.
 */
export function ActiveFilterTags({ filters, onChange }: FilterControlsProps) {
  const active = countActiveFilters(filters);
  if (active === 0) return null;

  const remove = (patch: Partial<FinderFilterState>) => onChange({ ...filters, ...patch });

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.location && filters.maxDistanceMiles != null && (
        <FilterTag
          label={`Within ${filters.maxDistanceMiles} miles`}
          active
          onToggle={() => remove({ maxDistanceMiles: null })}
        />
      )}
      {filters.regions.map((r) => (
        <FilterTag
          key={r}
          label={r}
          active
          onToggle={() => remove({ regions: filters.regions.filter((x) => x !== r) })}
        />
      ))}
      {filters.countries.map((c) => (
        <FilterTag
          key={c}
          label={
            <>
              <CountryFlag country={c} />
              {c}
            </>
          }
          active
          onToggle={() => remove({ countries: filters.countries.filter((x) => x !== c) })}
        />
      ))}
      {filters.treatments.map((t) => (
        <FilterTag
          key={t}
          label={t}
          active
          onToggle={() => remove({ treatments: filters.treatments.filter((x) => x !== t) })}
        />
      ))}
      {filters.priceCeiling != null && (
        <FilterTag
          label={`Up to £${filters.priceCeiling.toLocaleString()}`}
          active
          onToggle={() => remove({ priceCeiling: null })}
        />
      )}
      {filters.donorAnonymity !== "any" && (
        <FilterTag
          label={DONOR_OPTIONS.find((o) => o.value === filters.donorAnonymity)?.label ?? ""}
          active
          onToggle={() => remove({ donorAnonymity: "any" })}
        />
      )}
      {filters.remoteConsultation && (
        <FilterTag
          label="Remote consultations"
          active
          onToggle={() => remove({ remoteConsultation: false })}
        />
      )}
      {filters.successRate !== "any" && (
        <FilterTag
          label={SUCCESS_RATE_OPTIONS.find((o) => o.value === filters.successRate)?.label ?? ""}
          active
          onToggle={() => remove({ successRate: "any" })}
        />
      )}
      <button
        type="button"
        onClick={() => onChange(clearedFilters(filters))}
        className="text-xs font-medium text-muted underline underline-offset-2 hover:opacity-70 transition-opacity"
      >
        Clear all
      </button>
    </div>
  );
}
