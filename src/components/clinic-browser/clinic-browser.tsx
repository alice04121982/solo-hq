"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { ChevronDown, X, Check, MapPin, LocateFixed, Loader2 } from "lucide-react";
import {
  InternationalClinic,
  ClinicCountry,
  COUNTRY_FLAGS,
  COUNTRY_NAMES,
} from "@/types/international-clinic";
import { InternationalClinicCard } from "./international-clinic-card";

// ─── City coordinate lookup (used for distance calculation) ───────────────

const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  // UK
  London: { lat: 51.5074, lng: -0.1278 },
  Cambridge: { lat: 52.2053, lng: 0.1218 },
  Nottingham: { lat: 52.9548, lng: -1.1581 },
  Birmingham: { lat: 52.4862, lng: -1.8904 },
  Sheffield: { lat: 53.3811, lng: -1.4701 },
  Manchester: { lat: 53.4808, lng: -2.2426 },
  Leeds: { lat: 53.8008, lng: -1.5491 },
  Bristol: { lat: 51.4545, lng: -2.5879 },
  Edinburgh: { lat: 55.9533, lng: -3.1883 },
  Glasgow: { lat: 55.8642, lng: -4.2518 },
  Cardiff: { lat: 51.4816, lng: -3.1791 },
  Liverpool: { lat: 53.4084, lng: -2.9916 },
  Newcastle: { lat: 54.9784, lng: -1.6174 },
  Oxford: { lat: 51.752, lng: -1.2577 },
  Brighton: { lat: 50.8225, lng: -0.1372 },
  Southampton: { lat: 50.9097, lng: -1.4044 },
  Epsom: { lat: 51.3362, lng: -0.2689 },
  Guildford: { lat: 51.2362, lng: -0.5704 },
  Coventry: { lat: 52.4068, lng: -1.5197 },
  Leicester: { lat: 52.6369, lng: -1.1398 },
  // Spain
  Barcelona: { lat: 41.3851, lng: 2.1734 },
  Madrid: { lat: 40.4168, lng: -3.7038 },
  Seville: { lat: 37.3891, lng: -5.9845 },
  Valencia: { lat: 39.4699, lng: -0.3763 },
  Alicante: { lat: 38.3452, lng: -0.481 },
  Málaga: { lat: 36.7213, lng: -4.4214 },
  Malaga: { lat: 36.7213, lng: -4.4214 },
  Bilbao: { lat: 43.263, lng: -2.935 },
  Marbella: { lat: 36.5101, lng: -4.8825 },
  // Czech Republic
  Prague: { lat: 50.0755, lng: 14.4378 },
  Brno: { lat: 49.1951, lng: 16.6068 },
  Ostrava: { lat: 49.8209, lng: 18.2625 },
  // Greece
  Athens: { lat: 37.9838, lng: 23.7275 },
  Thessaloniki: { lat: 40.6401, lng: 22.9444 },
  // Denmark
  Copenhagen: { lat: 55.6761, lng: 12.5683 },
  Aarhus: { lat: 56.1629, lng: 10.2039 },
  // Cyprus
  Nicosia: { lat: 35.1856, lng: 33.3823 },
  Limassol: { lat: 34.6851, lng: 33.0332 },
  Paphos: { lat: 34.7754, lng: 32.4235 },
  Larnaca: { lat: 34.9009, lng: 33.6369 },
};

function clinicCoords(clinic: InternationalClinic): { lat: number; lng: number } | null {
  // Check explicit lat/lng on the record first, then fall back to city lookup
  if (clinic.lat != null && clinic.lng != null) return { lat: clinic.lat, lng: clinic.lng };
  const key = Object.keys(CITY_COORDS).find(
    (k) => k.toLowerCase() === clinic.city?.toLowerCase()
  );
  return key ? CITY_COORDS[key] : null;
}

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3958.8;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDistance(miles: number): string {
  if (miles < 1) return "< 1 mile away";
  if (miles < 10) return `${Math.round(miles)} miles away`;
  return `${Math.round(miles / 5) * 5} miles away`;
}

// ─── Constants ─────────────────────────────────────────────────────────────

const ALL_COUNTRIES = ["GB", "ES", "CZ", "GR", "DK", "CY"] as const;

const TREATMENT_OPTIONS = [
  { label: "IVF", field: "offers_ivf" },
  { label: "Donor Egg IVF", field: "offers_donor_eggs" },
  { label: "IUI", field: "offers_iui" },
  { label: "Egg Freezing", field: "offers_egg_freezing" },
] as const;

type AgeGroup = "under35" | "35_37" | "38_39" | "40_42" | "43_plus";

const AGE_GROUP_OPTIONS: {
  key: AgeGroup;
  label: string;
  rateField: "success_rate_ivf_under_35" | "success_rate_ivf_35_to_37" | "success_rate_ivf_38_to_39" | "success_rate_ivf_40_to_42" | "success_rate_ivf_43_plus";
}[] = [
  { key: "under35",  label: "Under 35",    rateField: "success_rate_ivf_under_35" },
  { key: "35_37",    label: "35–37",       rateField: "success_rate_ivf_35_to_37" },
  { key: "38_39",    label: "38–39",       rateField: "success_rate_ivf_38_to_39" },
  { key: "40_42",    label: "40–42",       rateField: "success_rate_ivf_40_to_42" },
  { key: "43_plus",  label: "43 and over", rateField: "success_rate_ivf_43_plus"  },
];

type SortKey = "default" | "nearest" | "success_rate" | "price_low" | "price_high";

function getSortOptions(hasLocation: boolean): { key: SortKey; label: string }[] {
  return [
    { key: "default", label: "Best match" },
    ...(hasLocation ? [{ key: "nearest" as SortKey, label: "Nearest first" }] : []),
    { key: "success_rate", label: "Success rate" },
    { key: "price_low", label: "Price: low to high" },
    { key: "price_high", label: "Price: high to low" },
  ];
}

function getHeadlinePrice(c: InternationalClinic): number | null {
  if (c.offers_ivf && c.price_ivf_cycle_gbp_min != null) return c.price_ivf_cycle_gbp_min;
  if (c.offers_donor_eggs && c.price_donor_egg_ivf_gbp_min != null) return c.price_donor_egg_ivf_gbp_min;
  if (c.offers_iui && c.price_donor_sperm_iui_gbp_min != null) return c.price_donor_sperm_iui_gbp_min;
  return null;
}

// ─── Filter dropdown ───────────────────────────────────────────────────────

interface FilterDropdownProps {
  label: string;
  activeCount?: number;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  align?: "left" | "right";
  children: React.ReactNode;
}

function FilterDropdown({
  label, activeCount, isOpen, onToggle, onClose, align = "left", children,
}: FilterDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen, onClose]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={onToggle}
        className={`inline-flex items-center gap-1.5 px-4 py-3 text-sm font-sans font-medium border-b-2 transition-colors whitespace-nowrap ${
          isOpen || (activeCount && activeCount > 0)
            ? "border-foreground text-foreground"
            : "border-transparent text-muted hover:text-foreground"
        }`}
      >
        {label}
        {activeCount && activeCount > 0 ? (
          <span className="inline-flex items-center justify-center rounded-full w-[18px] h-[18px] text-[10px] font-bold bg-foreground text-background leading-none">
            {activeCount}
          </span>
        ) : null}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className={`absolute top-full mt-1 z-50 bg-white border border-border rounded-xl shadow-lg min-w-[200px] py-1.5 ${align === "right" ? "right-0" : "left-0"}`}>
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Checkbox option ──────────────────────────────────────────────────────

function CheckboxOption({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2.5 text-sm font-sans flex items-center gap-3 transition-colors hover:bg-background-alt ${selected ? "text-foreground font-semibold" : "text-muted"}`}
    >
      <span className={`w-3.5 h-3.5 rounded border-2 shrink-0 transition-colors flex items-center justify-center ${selected ? "border-foreground bg-foreground" : "border-border bg-transparent"}`}>
        {selected && <Check className="h-2.5 w-2.5 text-background" strokeWidth={3} />}
      </span>
      {label}
    </button>
  );
}

// ─── Radio option ─────────────────────────────────────────────────────────

function RadioOption({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2.5 text-sm font-sans flex items-center gap-3 transition-colors hover:bg-background-alt ${selected ? "text-foreground font-semibold" : "text-muted"}`}
    >
      <span className={`w-3.5 h-3.5 rounded-full border-2 shrink-0 transition-colors ${selected ? "border-foreground bg-foreground" : "border-border bg-transparent"}`} />
      {label}
    </button>
  );
}

// ─── Active filter chip ────────────────────────────────────────────────────

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      onClick={onRemove}
      className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background text-[12px] font-[500] px-3 py-1.5 hover:bg-accent transition-colors"
    >
      {label}
      <X className="h-3 w-3 shrink-0" />
    </button>
  );
}

// ─── Main component ────────────────────────────────────────────────────────

interface ClinicBrowserProps {
  clinics: InternationalClinic[];
  countries: ClinicCountry[];
  selectedSlugs: string[];
  onToggleCompare: (slug: string) => void;
  maxReached?: boolean;
  selectedCount?: number;
}

interface UserLocation {
  lat: number;
  lng: number;
  label: string;
}

export function ClinicBrowser({
  clinics, selectedSlugs, onToggleCompare, maxReached = false, selectedCount = 0,
}: ClinicBrowserProps) {
  // ── Filter state ──────────────────────────────────────────────────────
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedTreatments, setSelectedTreatments] = useState<string[]>([]);
  const [soloOnly, setSoloOnly] = useState(false);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("default");
  const [openPanel, setOpenPanel] = useState<"country" | "treatment" | "agegroup" | "sort" | null>(null);

  // ── Location state ────────────────────────────────────────────────────
  const [locationQuery, setLocationQuery] = useState("");
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const toggle = useCallback(
    (panel: "country" | "treatment" | "agegroup" | "sort") =>
      setOpenPanel((prev) => (prev === panel ? null : panel)),
    []
  );
  const close = useCallback(() => setOpenPanel(null), []);

  function toggleCountry(code: string) {
    setSelectedCountries((prev) => prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]);
  }
  function toggleTreatment(label: string) {
    setSelectedTreatments((prev) => prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label]);
  }

  // ── Geocoding helpers ─────────────────────────────────────────────────
  async function geocodeQuery(q: string) {
    setLocationLoading(true);
    setLocationError(null);
    try {
      const res = await fetch(`/api/geocode?q=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error("Location not found");
      const data = await res.json();
      setUserLocation({ lat: data.lat, lng: data.lng, label: data.label });
      if (sortKey === "default") setSortKey("nearest");
    } catch {
      setLocationError("Couldn't find that location. Try a postcode or city name.");
    } finally {
      setLocationLoading(false);
    }
  }

  function useMyLocation() {
    if (!navigator.geolocation) {
      setLocationError("Geolocation isn't supported by your browser.");
      return;
    }
    setLocationLoading(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          label: "Your location",
        });
        setLocationQuery("Your location");
        if (sortKey === "default") setSortKey("nearest");
        setLocationLoading(false);
      },
      () => {
        setLocationError("Couldn't get your location. Try entering a postcode instead.");
        setLocationLoading(false);
      }
    );
  }

  function clearLocation() {
    setUserLocation(null);
    setLocationQuery("");
    setLocationError(null);
    if (sortKey === "nearest") setSortKey("default");
  }

  // ── Precompute distances ───────────────────────────────────────────────
  const distances = useMemo<Map<string, number>>(() => {
    const map = new Map<string, number>();
    if (!userLocation) return map;
    for (const clinic of clinics) {
      const coords = clinicCoords(clinic);
      if (coords) {
        map.set(clinic.slug, haversineDistance(userLocation.lat, userLocation.lng, coords.lat, coords.lng));
      }
    }
    return map;
  }, [clinics, userLocation]);

  // ── Filtered + sorted results ──────────────────────────────────────────
  const results = useMemo(() => {
    const filtered = clinics.filter((c) => {
      if (selectedCountries.length > 0 && !selectedCountries.includes(c.country_code)) return false;
      if (selectedTreatments.length > 0) {
        const hasAny = selectedTreatments.some((t) => {
          const opt = TREATMENT_OPTIONS.find((o) => o.label === t);
          return opt ? c[opt.field] : false;
        });
        if (!hasAny) return false;
      }
      if (soloOnly && !c.treats_single_women) return false;
      return true;
    });

    if (sortKey === "nearest") {
      return [...filtered].sort((a, b) => {
        const da = distances.get(a.slug) ?? Infinity;
        const db = distances.get(b.slug) ?? Infinity;
        return da - db;
      });
    }
    if (sortKey === "success_rate") {
      const rateField = AGE_GROUP_OPTIONS.find((ag) => ag.key === selectedAgeGroup)?.rateField ?? "success_rate_ivf_under_35";
      return [...filtered].sort((a, b) => ((b[rateField] as number | null) ?? -1) - ((a[rateField] as number | null) ?? -1));
    }
    if (sortKey === "price_low") {
      return [...filtered].sort((a, b) => (getHeadlinePrice(a) ?? Infinity) - (getHeadlinePrice(b) ?? Infinity));
    }
    if (sortKey === "price_high") {
      return [...filtered].sort((a, b) => (getHeadlinePrice(b) ?? -Infinity) - (getHeadlinePrice(a) ?? -Infinity));
    }
    return filtered;
  }, [clinics, selectedCountries, selectedTreatments, soloOnly, sortKey, selectedAgeGroup, distances]);

  // ── Active filter chips ────────────────────────────────────────────────
  const activeChips: { label: string; onRemove: () => void }[] = [];
  selectedCountries.forEach((code) =>
    activeChips.push({ label: `${COUNTRY_FLAGS[code]} ${COUNTRY_NAMES[code]}`, onRemove: () => setSelectedCountries((prev) => prev.filter((c) => c !== code)) })
  );
  selectedTreatments.forEach((t) =>
    activeChips.push({ label: t, onRemove: () => setSelectedTreatments((prev) => prev.filter((x) => x !== t)) })
  );
  if (soloOnly) activeChips.push({ label: "Solo-friendly", onRemove: () => setSoloOnly(false) });
  if (selectedAgeGroup) {
    const label = AGE_GROUP_OPTIONS.find((ag) => ag.key === selectedAgeGroup)?.label;
    activeChips.push({ label: `Age: ${label}`, onRemove: () => setSelectedAgeGroup(null) });
  }

  function clearAll() {
    setSelectedCountries([]);
    setSelectedTreatments([]);
    setSoloOnly(false);
    setSelectedAgeGroup(null);
  }

  const sortOptions = getSortOptions(!!userLocation);
  const currentSortLabel = sortOptions.find((s) => s.key === sortKey)?.label ?? "Best match";

  return (
    <div>
      {/* ── Location search bar ──────────────────────────────────────────── */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 max-w-md">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
            <input
              type="text"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && locationQuery.trim()) geocodeQuery(locationQuery.trim());
              }}
              placeholder="Enter postcode or city to find nearby clinics"
              className="w-full pl-9 pr-9 py-2.5 text-sm font-sans border border-border rounded-full bg-white text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-colors"
            />
            {locationQuery && (
              <button
                onClick={clearLocation}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                aria-label="Clear location"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => locationQuery.trim() ? geocodeQuery(locationQuery.trim()) : useMyLocation()}
            disabled={locationLoading}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2.5 text-sm font-sans font-medium text-foreground hover:border-foreground transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {locationLoading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <LocateFixed className="h-3.5 w-3.5" />
            )}
            {locationQuery.trim() ? "Search" : "Use my location"}
          </button>

          {userLocation && (
            <p className="text-sm font-sans text-muted truncate max-w-[200px]">
              📍 {userLocation.label}
            </p>
          )}
        </div>

        {locationError && (
          <p className="mt-2 text-sm font-sans text-red-500 pl-1">{locationError}</p>
        )}
      </div>

      {/* ── Nike-style filter bar ────────────────────────────────────────── */}
      <div className="border-b border-border mb-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center">
            <FilterDropdown
              label="Country"
              activeCount={selectedCountries.length}
              isOpen={openPanel === "country"}
              onToggle={() => toggle("country")}
              onClose={close}
            >
              {ALL_COUNTRIES.map((code) => (
                <CheckboxOption
                  key={code}
                  label={`${COUNTRY_FLAGS[code]} ${COUNTRY_NAMES[code]}`}
                  selected={selectedCountries.includes(code)}
                  onClick={() => toggleCountry(code)}
                />
              ))}
              {selectedCountries.length > 0 && (
                <>
                  <div className="mx-3 my-1 border-t border-border" />
                  <button onClick={() => { setSelectedCountries([]); close(); }} className="w-full text-left px-4 py-2 text-xs font-sans text-muted hover:text-foreground transition-colors">
                    Clear selection
                  </button>
                </>
              )}
            </FilterDropdown>

            <FilterDropdown
              label="Treatment"
              activeCount={selectedTreatments.length}
              isOpen={openPanel === "treatment"}
              onToggle={() => toggle("treatment")}
              onClose={close}
            >
              {TREATMENT_OPTIONS.map((t) => (
                <CheckboxOption
                  key={t.label}
                  label={t.label}
                  selected={selectedTreatments.includes(t.label)}
                  onClick={() => toggleTreatment(t.label)}
                />
              ))}
              {selectedTreatments.length > 0 && (
                <>
                  <div className="mx-3 my-1 border-t border-border" />
                  <button onClick={() => { setSelectedTreatments([]); close(); }} className="w-full text-left px-4 py-2 text-xs font-sans text-muted hover:text-foreground transition-colors">
                    Clear selection
                  </button>
                </>
              )}
            </FilterDropdown>

            <button
              onClick={() => setSoloOnly((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-4 py-3 text-sm font-sans font-medium border-b-2 transition-colors whitespace-nowrap ${soloOnly ? "border-foreground text-foreground" : "border-transparent text-muted hover:text-foreground"}`}
            >
              Solo-friendly
              {soloOnly && (
                <span className="inline-flex items-center justify-center rounded-full w-[18px] h-[18px] text-[10px] font-bold bg-foreground text-background leading-none">1</span>
              )}
            </button>

            <FilterDropdown
              label="Age group"
              activeCount={selectedAgeGroup ? 1 : 0}
              isOpen={openPanel === "agegroup"}
              onToggle={() => toggle("agegroup")}
              onClose={close}
            >
              <RadioOption label="All ages" selected={selectedAgeGroup === null} onClick={() => { setSelectedAgeGroup(null); close(); }} />
              {AGE_GROUP_OPTIONS.map((ag) => (
                <RadioOption key={ag.key} label={ag.label} selected={selectedAgeGroup === ag.key} onClick={() => { setSelectedAgeGroup(ag.key); close(); }} />
              ))}
            </FilterDropdown>
          </div>

          <FilterDropdown
            label={`Sort: ${currentSortLabel}`}
            isOpen={openPanel === "sort"}
            onToggle={() => toggle("sort")}
            onClose={close}
            align="right"
          >
            {sortOptions.map((opt) => (
              <RadioOption key={opt.key} label={opt.label} selected={sortKey === opt.key} onClick={() => { setSortKey(opt.key); close(); }} />
            ))}
          </FilterDropdown>
        </div>
      </div>

      {/* ── Active filter chips ──────────────────────────────────────────── */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-4 pb-2">
          {activeChips.map((chip) => (
            <FilterChip key={chip.label} label={chip.label} onRemove={chip.onRemove} />
          ))}
          <button onClick={clearAll} className="text-[12px] font-sans text-muted hover:text-foreground transition-colors underline underline-offset-2 ml-1">
            Clear all
          </button>
        </div>
      )}

      {/* ── Results count row ────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mt-6 mb-6">
        <p className="text-[12px] font-[500] uppercase tracking-[0.15em] text-muted font-sans">
          {results.length} clinic{results.length !== 1 ? "s" : ""}
          {selectedCountries.length === 1 ? ` in ${COUNTRY_NAMES[selectedCountries[0]]}` : ""}
          {userLocation && sortKey === "nearest" ? ` near ${userLocation.label}` : ""}
        </p>
        {selectedCount > 0 && (
          <p className="text-[12px] font-[500] uppercase tracking-[0.15em] font-sans" style={{ color: "var(--primary)" }}>
            {selectedCount} selected
          </p>
        )}
      </div>

      {/* ── Grid ─────────────────────────────────────────────────────────── */}
      {results.length === 0 ? (
        <div className="rounded-xl bg-background-alt border border-border p-10 text-center">
          <p className="font-sans text-muted">No clinics match your current filters.</p>
          <button onClick={clearAll} className="mt-4 rounded-full bg-foreground text-background px-6 py-2.5 text-sm font-sans font-medium hover:bg-accent transition-colors">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
          {results.map((clinic) => {
            const agOpt = AGE_GROUP_OPTIONS.find((ag) => ag.key === selectedAgeGroup);
            const distanceMiles = distances.get(clinic.slug);
            return (
              <InternationalClinicCard
                key={clinic.slug}
                clinic={clinic}
                isSelected={selectedSlugs.includes(clinic.slug)}
                onToggleCompare={onToggleCompare}
                compareDisabled={maxReached && !selectedSlugs.includes(clinic.slug)}
                ageGroupLabel={agOpt?.label}
                ageGroupRate={agOpt ? (clinic[agOpt.rateField] as number | null) : undefined}
                distanceMiles={distanceMiles}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
