"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { ChevronDown, X } from "lucide-react";
import {
  InternationalClinic,
  ClinicCountry,
  COUNTRY_FLAGS,
  COUNTRY_NAMES,
} from "@/types/international-clinic";
import { InternationalClinicCard } from "./international-clinic-card";

const ALL_COUNTRIES = ["GB", "ES", "CZ", "GR", "DK", "CY"] as const;

const TREATMENT_OPTIONS = [
  { label: "IVF", field: "offers_ivf" },
  { label: "Donor Egg IVF", field: "offers_donor_eggs" },
  { label: "IUI", field: "offers_iui" },
  { label: "Egg Freezing", field: "offers_egg_freezing" },
] as const;

type AgeGroup = "under35" | "35_37" | "38_39" | "40_42";

const AGE_GROUP_OPTIONS: {
  key: AgeGroup;
  label: string;
  rateField: "success_rate_ivf_under_35" | "success_rate_ivf_35_to_37" | "success_rate_ivf_38_to_39" | "success_rate_ivf_40_to_42";
}[] = [
  { key: "under35", label: "Under 35", rateField: "success_rate_ivf_under_35" },
  { key: "35_37",   label: "35–37",    rateField: "success_rate_ivf_35_to_37" },
  { key: "38_39",   label: "38–39",    rateField: "success_rate_ivf_38_to_39" },
  { key: "40_42",   label: "40–42",    rateField: "success_rate_ivf_40_to_42" },
];

type SortKey = "default" | "success_rate" | "price_low" | "price_high";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "default", label: "Best match" },
  { key: "success_rate", label: "Success rate" },
  { key: "price_low", label: "Price: low to high" },
  { key: "price_high", label: "Price: high to low" },
];

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
  label,
  activeCount,
  isOpen,
  onToggle,
  onClose,
  align = "left",
  children,
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
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute top-full mt-1 z-50 bg-white border border-border rounded-xl shadow-lg min-w-[200px] py-1.5 ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Radio option inside dropdown ─────────────────────────────────────────

function DropdownOption({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2.5 text-sm font-sans flex items-center gap-3 transition-colors hover:bg-background-alt ${
        selected ? "text-foreground font-semibold" : "text-muted"
      }`}
    >
      <span
        className={`w-3.5 h-3.5 rounded-full border-2 shrink-0 transition-colors ${
          selected ? "border-foreground bg-foreground" : "border-border bg-transparent"
        }`}
      />
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

export function ClinicBrowser({
  clinics,
  selectedSlugs,
  onToggleCompare,
  maxReached = false,
  selectedCount = 0,
}: ClinicBrowserProps) {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null);
  const [soloOnly, setSoloOnly] = useState(false);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("default");
  const [openPanel, setOpenPanel] = useState<"country" | "treatment" | "agegroup" | "sort" | null>(null);

  const toggle = useCallback(
    (panel: "country" | "treatment" | "agegroup" | "sort") =>
      setOpenPanel((prev) => (prev === panel ? null : panel)),
    []
  );
  const close = useCallback(() => setOpenPanel(null), []);

  // ── Filtered + sorted results ──────────────────────────────────────────
  const results = useMemo(() => {
    const filtered = clinics.filter((c) => {
      if (selectedCountry && c.country_code !== selectedCountry) return false;
      if (selectedTreatment) {
        const opt = TREATMENT_OPTIONS.find((t) => t.label === selectedTreatment);
        if (opt && !c[opt.field]) return false;
      }
      if (soloOnly && !c.treats_single_women) return false;
      return true;
    });

    if (sortKey === "success_rate") {
      const rateField = AGE_GROUP_OPTIONS.find((ag) => ag.key === selectedAgeGroup)?.rateField
        ?? "success_rate_ivf_under_35";
      return [...filtered].sort((a, b) => {
        const ar = (a[rateField] as number | null) ?? -1;
        const br = (b[rateField] as number | null) ?? -1;
        return br - ar;
      });
    }
    if (sortKey === "price_low") {
      return [...filtered].sort((a, b) => {
        const ap = getHeadlinePrice(a) ?? Infinity;
        const bp = getHeadlinePrice(b) ?? Infinity;
        return ap - bp;
      });
    }
    if (sortKey === "price_high") {
      return [...filtered].sort((a, b) => {
        const ap = getHeadlinePrice(a) ?? -Infinity;
        const bp = getHeadlinePrice(b) ?? -Infinity;
        return bp - ap;
      });
    }
    return filtered;
  }, [clinics, selectedCountry, selectedTreatment, soloOnly, sortKey, selectedAgeGroup]);

  // ── Active filter chips ────────────────────────────────────────────────
  const activeChips: { label: string; onRemove: () => void }[] = [];
  if (selectedCountry)
    activeChips.push({
      label: `${COUNTRY_FLAGS[selectedCountry]} ${COUNTRY_NAMES[selectedCountry]}`,
      onRemove: () => setSelectedCountry(null),
    });
  if (selectedTreatment)
    activeChips.push({
      label: selectedTreatment,
      onRemove: () => setSelectedTreatment(null),
    });
  if (soloOnly)
    activeChips.push({ label: "Solo-friendly", onRemove: () => setSoloOnly(false) });
  if (selectedAgeGroup) {
    const label = AGE_GROUP_OPTIONS.find((ag) => ag.key === selectedAgeGroup)?.label;
    activeChips.push({ label: `Age: ${label}`, onRemove: () => setSelectedAgeGroup(null) });
  }

  function clearAll() {
    setSelectedCountry(null);
    setSelectedTreatment(null);
    setSoloOnly(false);
    setSelectedAgeGroup(null);
  }

  const currentSortLabel =
    SORT_OPTIONS.find((s) => s.key === sortKey)?.label ?? "Best match";

  return (
    <div>
      {/* ── Nike-style filter bar ────────────────────────────────────────── */}
      <div className="border-b border-border mb-0">
        <div className="flex items-center justify-between gap-2">
          {/* Left: filter dropdowns */}
          <div className="flex items-center">
            <FilterDropdown
              label="Country"
              activeCount={selectedCountry ? 1 : 0}
              isOpen={openPanel === "country"}
              onToggle={() => toggle("country")}
              onClose={close}
            >
              <DropdownOption
                label="All countries"
                selected={selectedCountry === null}
                onClick={() => {
                  setSelectedCountry(null);
                  close();
                }}
              />
              {ALL_COUNTRIES.map((code) => (
                <DropdownOption
                  key={code}
                  label={`${COUNTRY_FLAGS[code]} ${COUNTRY_NAMES[code]}`}
                  selected={selectedCountry === code}
                  onClick={() => {
                    setSelectedCountry(code);
                    close();
                  }}
                />
              ))}
            </FilterDropdown>

            <FilterDropdown
              label="Treatment"
              activeCount={selectedTreatment ? 1 : 0}
              isOpen={openPanel === "treatment"}
              onToggle={() => toggle("treatment")}
              onClose={close}
            >
              <DropdownOption
                label="All treatments"
                selected={selectedTreatment === null}
                onClick={() => {
                  setSelectedTreatment(null);
                  close();
                }}
              />
              {TREATMENT_OPTIONS.map((t) => (
                <DropdownOption
                  key={t.label}
                  label={t.label}
                  selected={selectedTreatment === t.label}
                  onClick={() => {
                    setSelectedTreatment(t.label);
                    close();
                  }}
                />
              ))}
            </FilterDropdown>

            {/* Solo-friendly inline toggle */}
            <button
              onClick={() => setSoloOnly((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-4 py-3 text-sm font-sans font-medium border-b-2 transition-colors whitespace-nowrap ${
                soloOnly
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              Solo-friendly
              {soloOnly && (
                <span className="inline-flex items-center justify-center rounded-full w-[18px] h-[18px] text-[10px] font-bold bg-foreground text-background leading-none">
                  1
                </span>
              )}
            </button>

            {/* Age group dropdown */}
            <FilterDropdown
              label="Age group"
              activeCount={selectedAgeGroup ? 1 : 0}
              isOpen={openPanel === "agegroup"}
              onToggle={() => toggle("agegroup")}
              onClose={close}
            >
              <DropdownOption
                label="All ages"
                selected={selectedAgeGroup === null}
                onClick={() => { setSelectedAgeGroup(null); close(); }}
              />
              {AGE_GROUP_OPTIONS.map((ag) => (
                <DropdownOption
                  key={ag.key}
                  label={ag.label}
                  selected={selectedAgeGroup === ag.key}
                  onClick={() => { setSelectedAgeGroup(ag.key); close(); }}
                />
              ))}
            </FilterDropdown>
          </div>

          {/* Right: sort */}
          <FilterDropdown
            label={`Sort: ${currentSortLabel}`}
            isOpen={openPanel === "sort"}
            onToggle={() => toggle("sort")}
            onClose={close}
            align="right"
          >
            {SORT_OPTIONS.map((opt) => (
              <DropdownOption
                key={opt.key}
                label={opt.label}
                selected={sortKey === opt.key}
                onClick={() => {
                  setSortKey(opt.key);
                  close();
                }}
              />
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
          <button
            onClick={clearAll}
            className="text-[12px] font-sans text-muted hover:text-foreground transition-colors underline underline-offset-2 ml-1"
          >
            Clear all
          </button>
        </div>
      )}

      {/* ── Results count row ────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mt-6 mb-6">
        <p className="text-[12px] font-[500] uppercase tracking-[0.15em] text-muted font-sans">
          {results.length} clinic{results.length !== 1 ? "s" : ""}
          {selectedCountry ? ` in ${COUNTRY_NAMES[selectedCountry]}` : ""}
        </p>
        {selectedCount > 0 && (
          <p
            className="text-[12px] font-[500] uppercase tracking-[0.15em] font-sans"
            style={{ color: "var(--primary)" }}
          >
            {selectedCount} selected
          </p>
        )}
      </div>

      {/* ── Grid ─────────────────────────────────────────────────────────── */}
      {results.length === 0 ? (
        <div className="rounded-xl bg-background-alt border border-border p-10 text-center">
          <p className="font-sans text-muted">No clinics match your current filters.</p>
          <button
            onClick={clearAll}
            className="mt-4 rounded-full bg-foreground text-background px-6 py-2.5 text-sm font-sans font-medium hover:bg-accent transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
          {results.map((clinic) => {
            const agOpt = AGE_GROUP_OPTIONS.find((ag) => ag.key === selectedAgeGroup);
            return (
              <InternationalClinicCard
                key={clinic.slug}
                clinic={clinic}
                isSelected={selectedSlugs.includes(clinic.slug)}
                onToggleCompare={onToggleCompare}
                compareDisabled={maxReached && !selectedSlugs.includes(clinic.slug)}
                ageGroupLabel={agOpt?.label}
                ageGroupRate={agOpt ? (clinic[agOpt.rateField] as number | null) : undefined}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
