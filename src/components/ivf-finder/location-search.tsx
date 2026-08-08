"use client";

import { useState, useCallback } from "react";
import { Search, LocateFixed, X } from "lucide-react";
import { motion } from "framer-motion";
import { AGE_BRACKETS, DEFAULT_FILTERS } from "./clinic-filters";
import type { FilterState } from "./clinic-filters";

const RADIUS_OPTIONS = [10, 25, 50, 100];

const ABROAD_COUNTRIES = [
  { value: "Spain", label: "Spain" },
  { value: "Greece", label: "Greece" },
  { value: "Czech Republic", label: "Czech Republic" },
];

const SUCCESS_OPTS = [
  { value: null as number | null, label: "Any" },
  { value: 20, label: "20%+" },
  { value: 30, label: "30%+" },
  { value: 40, label: "40%+" },
  { value: 50, label: "50%+" },
];

const PRICE_OPTS = [
  { value: null as number | null, label: "Any" },
  { value: 5000, label: "Under £5k" },
  { value: 7500, label: "Under £7.5k" },
  { value: 10000, label: "Under £10k" },
];

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-150 whitespace-nowrap"
      style={{
        background: active ? "#1A3A25" : "#F0F0F0",
        color: active ? "#e8f5d8" : "var(--teal)",
      }}
    >
      {label}
    </button>
  );
}

type SearchMode = "nearby" | "abroad";

interface LocationSearchProps {
  initialLocation?: string;
  initialRadius?: number;
  filters: FilterState;
  onFiltersChange: (f: FilterState) => void;
  onSearch: (location: string, radius: number) => void;
  isLoading?: boolean;
}

function isValidLocation(value: string): boolean {
  return value.trim().length >= 2;
}

export function LocationSearch({
  initialLocation = "",
  initialRadius = 25,
  filters,
  onFiltersChange,
  onSearch,
  isLoading = false,
}: LocationSearchProps) {
  const [mode, setMode] = useState<SearchMode>("nearby");
  const [location, setLocation] = useState(initialLocation);
  const [radius, setRadius] = useState(initialRadius);
  const [abroadCountry, setAbroadCountry] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);

  const hasActiveFilters =
    filters.ageBracket !== "any" ||
    filters.minSuccessRate !== null ||
    filters.maxPrice !== null;

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (mode === "nearby") {
        if (!isValidLocation(location)) {
          setError("Please enter a postcode or town name.");
          return;
        }
        setError(null);
        onSearch(location.trim(), radius);
      } else {
        if (!abroadCountry) {
          setError("Please select a country.");
          return;
        }
        setError(null);
        onSearch(abroadCountry, 0);
      }
    },
    [mode, location, radius, abroadCountry, onSearch]
  );

  const handleGeolocate = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
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
            setLocation(pc);
            setError(null);
            onSearch(pc, radius);
          } else {
            setError("Could not determine your postcode. Please type it manually.");
          }
        } catch {
          setError("Could not get your location. Please type your postcode.");
        } finally {
          setGeoLoading(false);
        }
      },
      () => {
        setError("Location access denied. Please type your postcode.");
        setGeoLoading(false);
      }
    );
  }, [radius, onSearch]);

  const switchMode = (next: SearchMode) => {
    setMode(next);
    setError(null);
    onFiltersChange(DEFAULT_FILTERS);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* ── Mode toggle ── */}
      <div className="flex border-b border-[#EFEFEF]">
        {(["nearby", "abroad"] as SearchMode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => switchMode(m)}
            className="flex-1 py-3.5 text-xs font-semibold font-sans transition-colors duration-150"
            style={{
              background: mode === m ? "#1A3A25" : "transparent",
              color: mode === m ? "#e8f5d8" : "var(--teal)",
            }}
          >
            {m === "nearby" ? "Search nearby" : "Browse abroad"}
          </button>
        ))}
      </div>

      {mode === "nearby" ? (
        <>
          {/* ── Location input ── */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[#EFEFEF]">
            <Search className="h-4 w-4 text-muted shrink-0" />
            <input
              type="text"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setError(null);
              }}
              placeholder="Postcode or town — e.g. Cambridge, SW1"
              className="flex-1 bg-transparent text-sm text-navy placeholder:text-muted focus:outline-none"
            />
            <button
              type="button"
              onClick={handleGeolocate}
              disabled={geoLoading}
              title="Use my location"
              className="shrink-0 flex items-center gap-1.5 text-xs text-muted hover:text-navy transition-colors disabled:opacity-50"
            >
              <LocateFixed className={`h-3.5 w-3.5 ${geoLoading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline font-medium">Locate me</span>
            </button>
          </div>

          {/* ── Radius ── */}
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-[#EFEFEF]">
            <span className="text-[10px] font-[700] uppercase tracking-[0.12em] text-muted shrink-0">
              Within
            </span>
            <div className="flex gap-1.5 flex-wrap">
              {RADIUS_OPTIONS.map((r) => (
                <Chip
                  key={r}
                  label={`${r} mi`}
                  active={radius === r}
                  onClick={() => setRadius(r)}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        /* ── Abroad country ── */
        <div className="px-5 py-4 border-b border-[#EFEFEF]">
          <p className="text-[10px] font-[700] uppercase tracking-[0.12em] text-muted mb-3">
            Country
          </p>
          <div className="flex flex-wrap gap-1.5">
            {ABROAD_COUNTRIES.map((c) => (
              <Chip
                key={c.value}
                label={c.label}
                active={abroadCountry === c.value}
                onClick={() => {
                  setAbroadCountry(prev => prev === c.value ? null : c.value);
                  setError(null);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Shared filters ── */}
      <div className="px-5 py-4 border-b border-[#EFEFEF] space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-[700] uppercase tracking-[0.12em] text-muted">
            Filters
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => onFiltersChange(DEFAULT_FILTERS)}
              className="flex items-center gap-1 text-[10px] text-muted hover:text-navy transition-colors"
            >
              <X className="h-3 w-3" />
              Clear all
            </button>
          )}
        </div>

        {/* Age bracket */}
        <div>
          <p className="text-[10px] font-[600] text-muted mb-2">Age bracket</p>
          <div className="flex flex-wrap gap-1.5">
            {AGE_BRACKETS.map((b) => (
              <Chip
                key={b.value}
                label={b.label}
                active={filters.ageBracket === b.value}
                onClick={() => onFiltersChange({ ...filters, ageBracket: b.value })}
              />
            ))}
          </div>
        </div>

        {/* Min success rate */}
        <div>
          <p className="text-[10px] font-[600] text-muted mb-2">Min. success rate</p>
          <div className="flex flex-wrap gap-1.5">
            {SUCCESS_OPTS.map((opt) => (
              <Chip
                key={String(opt.value)}
                label={opt.label}
                active={filters.minSuccessRate === opt.value}
                onClick={() => onFiltersChange({ ...filters, minSuccessRate: opt.value })}
              />
            ))}
          </div>
        </div>

        {/* Max price */}
        <div>
          <p className="text-[10px] font-[600] text-muted mb-2">Max. price</p>
          <div className="flex flex-wrap gap-1.5">
            {PRICE_OPTS.map((opt) => (
              <Chip
                key={String(opt.value)}
                label={opt.label}
                active={filters.maxPrice === opt.value}
                onClick={() => onFiltersChange({ ...filters, maxPrice: opt.value })}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Submit ── */}
      <div className="px-5 py-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 rounded-full bg-lime text-[#1A3A25] text-sm font-bold hover:bg-lime-dark transition-colors disabled:opacity-60"
        >
          {isLoading
            ? "Searching…"
            : mode === "nearby"
            ? "Find clinics"
            : "Browse clinics"}
        </button>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-xs text-red-500 text-center"
          >
            {error}
          </motion.p>
        )}
      </div>
    </form>
  );
}
