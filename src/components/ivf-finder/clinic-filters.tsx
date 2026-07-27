"use client";

import { X } from "lucide-react";
import type { AgeBracket } from "@/types/clinic";

const COUNTRIES = [
  { value: "United Kingdom", label: "UK" },
  { value: "Spain", label: "Spain" },
  { value: "Greece", label: "Greece" },
  { value: "Czech Republic", label: "Czech Republic" },
];

export const AGE_BRACKETS: { value: AgeBracket; label: string }[] = [
  { value: "any", label: "Any age" },
  { value: "under35", label: "Under 35" },
  { value: "age35to37", label: "35–37" },
  { value: "age38to39", label: "38–39" },
  { value: "age40to42", label: "40–42" },
  { value: "age43plus", label: "43+" },
];

const SUCCESS_OPTS = [
  { value: null, label: "Any" },
  { value: 20, label: "20%+" },
  { value: 30, label: "30%+" },
  { value: 40, label: "40%+" },
  { value: 50, label: "50%+" },
];

const PRICE_OPTS = [
  { value: null, label: "Any" },
  { value: 5000, label: "Under £5k" },
  { value: 7500, label: "Under £7.5k" },
  { value: 10000, label: "Under £10k" },
];

export interface FilterState {
  countries: string[];
  ageBracket: AgeBracket;
  minSuccessRate: number | null;
  maxPrice: number | null;
}

export const DEFAULT_FILTERS: FilterState = {
  countries: [],
  ageBracket: "any",
  minSuccessRate: null,
  maxPrice: null,
};

function Chip({
  label,
  active,
  disabled,
  onClick,
}: {
  label: string;
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="rounded-full px-3 py-1 text-xs font-sans font-[500] transition-all duration-150"
      style={{
        background: active ? "#1A3A25" : disabled ? "transparent" : "white",
        color: active ? "#f9c6da" : disabled ? "rgba(61,13,27,0.25)" : "#3D0D1B",
        border: `1px solid ${active ? "#1A3A25" : disabled ? "rgba(61,13,27,0.1)" : "rgba(61,13,27,0.2)"}`,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {label}
    </button>
  );
}

interface ClinicFiltersProps {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  availableCountries: string[];
}

export function ClinicFilters({ filters, onChange, availableCountries }: ClinicFiltersProps) {
  const hasActive =
    filters.countries.length > 0 ||
    filters.ageBracket !== "any" ||
    filters.minSuccessRate !== null ||
    filters.maxPrice !== null;

  const toggleCountry = (c: string) => {
    onChange({
      ...filters,
      countries: filters.countries.includes(c)
        ? filters.countries.filter((x) => x !== c)
        : [...filters.countries, c],
    });
  };

  return (
    <div
      className="rounded-2xl border border-card-border p-5 mb-5"
      style={{ background: "#FDE8F2" }}
    >
      <div className="flex items-center justify-between mb-4">
        <p
          className="text-[10px] font-[600] uppercase tracking-[0.15em] font-sans"
          style={{ color: "rgba(61,13,27,0.5)" }}
        >
          Filter results
        </p>
        {hasActive && (
          <button
            onClick={() => onChange(DEFAULT_FILTERS)}
            className="inline-flex items-center gap-1 text-xs font-sans hover:opacity-70 transition-opacity"
            style={{ color: "#3D0D1B" }}
          >
            <X className="h-3 w-3" />
            Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Country */}
        <div>
          <p className="text-[11px] font-[600] font-sans mb-2" style={{ color: "#3D0D1B" }}>
            Country
          </p>
          <div className="flex flex-wrap gap-1.5">
            {COUNTRIES.map((c) => (
              <Chip
                key={c.value}
                label={c.label}
                active={filters.countries.includes(c.value)}
                disabled={
                  availableCountries.length > 0 && !availableCountries.includes(c.value)
                }
                onClick={() => toggleCountry(c.value)}
              />
            ))}
          </div>
        </div>

        {/* Age bracket */}
        <div>
          <p className="text-[11px] font-[600] font-sans mb-2" style={{ color: "#3D0D1B" }}>
            Age bracket
          </p>
          <div className="flex flex-wrap gap-1.5">
            {AGE_BRACKETS.map((b) => (
              <Chip
                key={b.value}
                label={b.label}
                active={filters.ageBracket === b.value}
                onClick={() => onChange({ ...filters, ageBracket: b.value })}
              />
            ))}
          </div>
        </div>

        {/* Min success rate */}
        <div>
          <p className="text-[11px] font-[600] font-sans mb-2" style={{ color: "#3D0D1B" }}>
            Min. success rate
          </p>
          <div className="flex flex-wrap gap-1.5">
            {SUCCESS_OPTS.map((opt) => (
              <Chip
                key={String(opt.value)}
                label={opt.label}
                active={filters.minSuccessRate === opt.value}
                onClick={() => onChange({ ...filters, minSuccessRate: opt.value })}
              />
            ))}
          </div>
        </div>

        {/* Max price */}
        <div>
          <p className="text-[11px] font-[600] font-sans mb-2" style={{ color: "#3D0D1B" }}>
            Max. price
          </p>
          <div className="flex flex-wrap gap-1.5">
            {PRICE_OPTS.map((opt) => (
              <Chip
                key={String(opt.value)}
                label={opt.label}
                active={filters.maxPrice === opt.value}
                onClick={() => onChange({ ...filters, maxPrice: opt.value })}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
