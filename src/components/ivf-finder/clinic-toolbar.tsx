"use client";

import { Search, LocateFixed, SlidersHorizontal, X } from "lucide-react";
import { AGE_BRACKETS } from "./clinic-filters";
import type { FilterState } from "./clinic-filters";

const PRICE_LABELS: Record<number, string> = {
  5000: "Under £5k",
  7500: "Under £7.5k",
  10000: "Under £10k",
};

interface ClinicToolbarProps {
  location: string;
  onLocationChange: (v: string) => void;
  onSearch: (e?: React.FormEvent) => void;
  onGeolocate: () => void;
  geoLoading: boolean;
  onOpenFilters: () => void;
  activeFilterCount: number;
  filters: FilterState;
  onFiltersChange: (f: FilterState) => void;
  locationMode: "uk" | "international";
  selectedCountry: string | null;
  radius: number;
  onClearCountry: () => void;
}

export function ClinicToolbar({
  location,
  onLocationChange,
  onSearch,
  onGeolocate,
  geoLoading,
  onOpenFilters,
  activeFilterCount,
  filters,
  onFiltersChange,
  locationMode,
  selectedCountry,
  radius,
  onClearCountry,
}: ClinicToolbarProps) {
  const ageBracketLabel = AGE_BRACKETS.find((b) => b.value === filters.ageBracket)?.label;
  const hasActiveFilters =
    (locationMode === "international" && selectedCountry) ||
    (locationMode === "uk" && radius !== 25) ||
    filters.ageBracket !== "any" ||
    filters.minSuccessRate !== null ||
    filters.maxPrice !== null;

  const chipClass =
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border";

  return (
    <div>
      {/* ── Search row ── */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(e);
        }}
        className="flex items-center gap-3"
      >
        {/* Location input */}
        <div
          className="flex flex-1 items-center gap-3 rounded-full border bg-white px-5 py-3 min-w-0"
          style={{ borderColor: "#E8E8E8" }}
        >
          <Search className="h-4 w-4 shrink-0" style={{ color: "var(--muted)" }} />

          {locationMode === "international" && selectedCountry ? (
            <div className="flex flex-1 items-center gap-2 min-w-0">
              <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                {selectedCountry}
              </span>
              <button
                type="button"
                onClick={onClearCountry}
                className="shrink-0 text-muted hover:text-navy transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <input
              type="text"
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
              placeholder="Postcode or town — e.g. London, SW1, Cambridge"
              className="flex-1 bg-transparent text-sm focus:outline-none min-w-0"
              style={{ color: "var(--foreground)" }}
            />
          )}

          <button
            type="button"
            onClick={onGeolocate}
            disabled={geoLoading}
            title="Use my location"
            className="shrink-0 flex items-center gap-1.5 text-xs font-medium transition-colors disabled:opacity-50"
            style={{ color: "var(--muted)" }}
          >
            <LocateFixed
              className={`h-3.5 w-3.5 ${geoLoading ? "animate-spin" : ""}`}
            />
            <span className="hidden sm:inline">Locate me</span>
          </button>
        </div>

        {/* Filters button */}
        <button
          type="button"
          onClick={onOpenFilters}
          className="shrink-0 flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-colors hover:bg-surface-hover"
          style={{ borderColor: "#E8E8E8", color: "var(--foreground)" }}
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">Filters</span>
          {activeFilterCount > 0 && (
            <span
              className="flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold"
              style={{ background: "var(--teal)", color: "#f9c6da" }}
            >
              {activeFilterCount}
            </span>
          )}
        </button>
      </form>

      {/* ── Active filter chips ── */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mt-3">
          {locationMode === "international" && selectedCountry && (
            <span
              className={chipClass}
              style={{ borderColor: "var(--teal)", background: "var(--teal)", color: "#f9c6da" }}
            >
              {selectedCountry}
              <button
                type="button"
                onClick={onClearCountry}
                className="hover:opacity-70 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {locationMode === "uk" && radius !== 25 && (
            <span
              className={chipClass}
              style={{ borderColor: "var(--teal)", background: "var(--teal)", color: "#f9c6da" }}
            >
              Within {radius} mi
              <button
                type="button"
                onClick={() => onFiltersChange({ ...filters })}
                className="hover:opacity-70 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {filters.ageBracket !== "any" && (
            <span
              className={chipClass}
              style={{ borderColor: "var(--teal)", background: "var(--teal)", color: "#f9c6da" }}
            >
              Age: {ageBracketLabel}
              <button
                type="button"
                onClick={() => onFiltersChange({ ...filters, ageBracket: "any" })}
                className="hover:opacity-70 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {filters.minSuccessRate !== null && (
            <span
              className={chipClass}
              style={{ borderColor: "var(--teal)", background: "var(--teal)", color: "#f9c6da" }}
            >
              Success: {filters.minSuccessRate}%+
              <button
                type="button"
                onClick={() => onFiltersChange({ ...filters, minSuccessRate: null })}
                className="hover:opacity-70 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {filters.maxPrice !== null && (
            <span
              className={chipClass}
              style={{ borderColor: "var(--teal)", background: "var(--teal)", color: "#f9c6da" }}
            >
              {PRICE_LABELS[filters.maxPrice] ?? `Under £${filters.maxPrice}`}
              <button
                type="button"
                onClick={() => onFiltersChange({ ...filters, maxPrice: null })}
                className="hover:opacity-70 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          <button
            type="button"
            onClick={() => {
              onFiltersChange({ countries: [], ageBracket: "any", minSuccessRate: null, maxPrice: null });
              onClearCountry();
            }}
            className="text-xs font-medium underline underline-offset-2 transition-opacity hover:opacity-70"
            style={{ color: "var(--muted)" }}
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
