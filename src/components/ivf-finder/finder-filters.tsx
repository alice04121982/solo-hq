"use client";

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
import { cheapestPublishedPrice, priceBounds } from "@/lib/clinics";
import { CountrySelect, COUNTRY_FLAGS } from "./country-select";

/**
 * Filter state for the Cairn clinic finder.
 *
 * Everything except the age bracket is optional and combinable, and none of it
 * gates results: the empty state matches every clinic in the database. The age
 * bracket is required because it drives the ranking, not because it narrows
 * the list.
 */
export interface FinderFilterState {
  ageBracket: AgeBracket;
  regions: Region[];
  countries: string[];
  treatments: Treatment[];
  /** GBP per cycle. null = no ceiling. */
  priceCeiling: number | null;
  donorAnonymity: "any" | "identifiable" | "anonymous";
  remoteConsultation: boolean;
}

export const DEFAULT_FINDER_FILTERS: FinderFilterState = {
  ageBracket: "under35",
  regions: [],
  countries: [],
  treatments: [],
  priceCeiling: null,
  donorAnonymity: "any",
  remoteConsultation: false,
};

const DONOR_OPTIONS: { value: FinderFilterState["donorAnonymity"]; label: string }[] = [
  { value: "any", label: "Any" },
  { value: "identifiable", label: "Identifiable donors only" },
  { value: "anonymous", label: "Anonymous available" },
];

const PRICE_STEP = 250;

/** Slider bounds, rounded outward so every clinic price fits inside them. */
export function sliderBounds(): { min: number; max: number } {
  const { min, max } = priceBounds();
  return {
    min: Math.floor(min / PRICE_STEP) * PRICE_STEP,
    max: Math.ceil(max / PRICE_STEP) * PRICE_STEP,
  };
}

/**
 * The price the ceiling filter compares against, priced per treatment: IUI is
 * a fraction of an IVF cycle, so a £1,500 budget with IUI selected must look
 * at the IUI price, not the IVF headline. With no treatment selected, the
 * clinic's cheapest published price counts — "treatment under £5k" includes
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

  return true;
}

export function countActiveFilters(f: FinderFilterState): number {
  return (
    f.regions.length +
    f.countries.length +
    f.treatments.length +
    (f.priceCeiling != null ? 1 : 0) +
    (f.donorAnonymity !== "any" ? 1 : 0) +
    (f.remoteConsultation ? 1 : 0)
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
  label: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "bg-teal border-teal text-on-teal"
          : "bg-background border-teal/20 text-teal hover:bg-surface-hover"
      }`}
    >
      {label}
      {active && <X className="h-3 w-3" aria-hidden />}
    </button>
  );
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12px] font-[700] uppercase tracking-[0.14em] text-teal/50 mb-2.5">
      {children}
    </p>
  );
}

interface FilterControlsProps {
  filters: FinderFilterState;
  onChange: (f: FinderFilterState) => void;
}

/**
 * The finder's filter controls. Rendered inline on desktop and inside the
 * filter sheet on mobile, so both share one source of truth.
 */
export function FilterControls({ filters, onChange }: FilterControlsProps) {
  const bounds = sliderBounds();
  const sliderValue = filters.priceCeiling ?? bounds.max;

  const toggleIn = <T,>(list: T[], value: T): T[] =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  return (
    <div className="space-y-6">
      {/* Age bracket: a Select, because it holds a form value. It drives the
          ranking, so it is required and has no empty option. */}
      <div>
        <label htmlFor="cairn-age-bracket" className="block text-[12px] font-[700] uppercase tracking-[0.14em] text-teal/50 mb-2.5">
          Your age
        </label>
        <select
          id="cairn-age-bracket"
          value={filters.ageBracket}
          onChange={(e) => onChange({ ...filters, ageBracket: e.target.value as AgeBracket })}
          className="w-full max-w-xs rounded-full border border-teal/20 bg-background px-4 py-2 text-sm text-foreground focus:outline-solid focus:outline-2 focus:outline-teal"
        >
          {AGE_BRACKETS.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>
        <p className="text-xs text-muted mt-1.5">
          Results rank by live birth rate for this age group.
        </p>
      </div>

      {/* Region, with countries nested beneath. Filters the list, never gates it. */}
      <div>
        <GroupLabel>Region</GroupLabel>
        <div className="flex flex-wrap gap-2">
          {REGIONS.map((r) => (
            <FilterTag
              key={r}
              label={r}
              active={filters.regions.includes(r)}
              onToggle={() => onChange({ ...filters, regions: toggleIn(filters.regions, r) })}
            />
          ))}
        </div>
        <div className="mt-3">
          <CountrySelect
            selected={filters.countries}
            onChange={(countries) => onChange({ ...filters, countries })}
          />
        </div>
      </div>

      {/* Treatments */}
      <div>
        <GroupLabel>Treatment</GroupLabel>
        <div className="flex flex-wrap gap-2">
          {TREATMENTS.map((t) => (
            <FilterTag
              key={t}
              label={t}
              active={filters.treatments.includes(t)}
              onToggle={() => onChange({ ...filters, treatments: toggleIn(filters.treatments, t) })}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Price ceiling */}
        <div>
          <label htmlFor="cairn-price-ceiling" className="block text-[12px] font-[700] uppercase tracking-[0.14em] text-teal/50 mb-2.5">
            Price per cycle
          </label>
          <input
            id="cairn-price-ceiling"
            type="range"
            min={bounds.min}
            max={bounds.max}
            step={PRICE_STEP}
            value={sliderValue}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              onChange({ ...filters, priceCeiling: v >= bounds.max ? null : v });
            }}
            className="w-full accent-(--teal)"
          />
          <p className="text-xs text-muted mt-1">
            {filters.priceCeiling != null
              ? `Up to £${filters.priceCeiling.toLocaleString()} per cycle`
              : "Any price"}
          </p>
          <p className="text-xs text-muted mt-1">
            Compares the cheapest published price for your selected treatments
            — IUI prices where IUI is selected, all treatments when none are.
          </p>
        </div>

        {/* Donor anonymity */}
        <div>
          <label htmlFor="cairn-donor-anonymity" className="block text-[12px] font-[700] uppercase tracking-[0.14em] text-teal/50 mb-2.5">
            Donor anonymity
          </label>
          <select
            id="cairn-donor-anonymity"
            value={filters.donorAnonymity}
            onChange={(e) =>
              onChange({
                ...filters,
                donorAnonymity: e.target.value as FinderFilterState["donorAnonymity"],
              })
            }
            className="w-full rounded-full border border-teal/20 bg-background px-4 py-2 text-sm text-foreground focus:outline-solid focus:outline-2 focus:outline-teal"
          >
            {DONOR_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Remote consultation toggle */}
      <div className="flex items-center justify-between gap-4">
        <span id="cairn-remote-label" className="text-sm text-foreground">
          Offers remote consultations
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={filters.remoteConsultation}
          aria-labelledby="cairn-remote-label"
          onClick={() => onChange({ ...filters, remoteConsultation: !filters.remoteConsultation })}
          className={`relative h-6 w-11 shrink-0 rounded-full border transition-colors ${
            filters.remoteConsultation
              ? "bg-teal border-teal"
              : "bg-surface-sunken border-border"
          }`}
        >
          <span
            aria-hidden
            className={`absolute top-0.5 h-[18px] w-[18px] rounded-full bg-background border border-border transition-all ${
              filters.remoteConsultation ? "left-[22px]" : "left-0.5"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

/**
 * Removable Tags for every active optional filter, shown above the results so
 * the current narrowing is always visible and reversible in one tap. The age
 * bracket is not here: it is required, so it has no removed state.
 */
export function ActiveFilterTags({ filters, onChange }: FilterControlsProps) {
  const active = countActiveFilters(filters);
  if (active === 0) return null;

  const remove = (patch: Partial<FinderFilterState>) => onChange({ ...filters, ...patch });

  return (
    <div className="flex flex-wrap items-center gap-2">
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
          label={`${COUNTRY_FLAGS[c] ?? ""} ${c}`.trim()}
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
      <button
        type="button"
        onClick={() =>
          onChange({ ...DEFAULT_FINDER_FILTERS, ageBracket: filters.ageBracket })
        }
        className="text-xs font-medium text-muted underline underline-offset-2 hover:opacity-70 transition-opacity"
      >
        Clear all
      </button>
    </div>
  );
}
