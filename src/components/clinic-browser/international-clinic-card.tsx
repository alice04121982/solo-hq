"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ShieldAlert, Info } from "lucide-react";
import {
  InternationalClinic,
  ClinicPackage,
  COUNTRY_FLAGS,
  formatPriceRange,
  formatSuccessRate,
} from "@/types/international-clinic";

interface InternationalClinicCardProps {
  clinic: InternationalClinic;
  isSelected?: boolean;
  onToggleCompare?: (slug: string) => void;
  compareDisabled?: boolean;
  showCompare?: boolean;
  /** Override which age group's success rate to display */
  ageGroupLabel?: string;
  ageGroupRate?: number | null;
  /** Distance from user's location in miles */
  distanceMiles?: number;
}

function SuccessRateTooltip({ countryCode, ageLabel }: { countryCode: string; ageLabel: string }) {
  const [open, setOpen] = useState(false);
  const isUK = countryCode === "GB";
  const source = isUK
    ? "UK figures are from the HFEA (mandatory annual reporting to the UK regulator)."
    : "International figures are self-reported by the clinic. Ask for equivalent regulatory data during your consultation.";

  return (
    <span className="relative inline-flex items-center">
      <button
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        className="text-fg-tertiary hover:text-fg-secondary transition-colors cursor-help focus:outline-none"
        aria-label="What does this success rate mean?"
        type="button"
      >
        <Info className="h-3.5 w-3.5" />
      </button>
      {open && (
        <span
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 rounded-xl p-3 shadow-lg z-50 pointer-events-none bg-bg-overlay text-text-white"
          role="tooltip"
        >
          <span className="block text-xs font-sans leading-relaxed">
            <strong className="font-semibold">Live births per cycle started</strong> for women aged {ageLabel}. Out of 100 women who began a cycle, this many had a baby.
          </span>
          <span className="block text-xs font-sans leading-relaxed mt-1.5 opacity-80">
            {source}
          </span>
          {/* Arrow — colour matches bg-bg-overlay (#1C1C1A) */}
          <span
            className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
            style={{ borderTopColor: "#1C1C1A" }}
            aria-hidden="true"
          />
        </span>
      )}
    </span>
  );
}

function PackagePill({ pkg }: { pkg: ClinicPackage }) {
  return (
    <div className="rounded-xl border border-border-secondary bg-bg-secondary p-3">
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-sans font-semibold text-text-primary leading-snug">
            {pkg.name}
          </p>
          {pkg.cycles && (
            <p className="text-xs font-sans text-text-tertiary mt-0.5">
              {pkg.cycles} cycles
              {pkg.includes_meds ? " · meds included" : ""}
            </p>
          )}
        </div>
        <div className="text-right shrink-0">
          {pkg.price_gbp != null && (
            <p className="text-sm font-sans font-bold text-text-primary">
              £{pkg.price_gbp.toLocaleString()}
            </p>
          )}
          {pkg.saves_gbp != null && pkg.saves_gbp > 0 && (
            <p className="text-xs font-sans font-semibold text-text-brand-secondary">
              Save £{pkg.saves_gbp.toLocaleString()}
            </p>
          )}
        </div>
      </div>

      {pkg.money_back && (
        <div className="flex items-start gap-1.5 mt-2">
          <ShieldAlert className="h-3.5 w-3.5 shrink-0 mt-0.5 text-fg-brand-primary" />
          <p className="text-xs font-sans text-text-tertiary leading-relaxed">
            {pkg.money_back_terms ?? "Money-back guarantee if unsuccessful"}
          </p>
        </div>
      )}

      {pkg.description && !pkg.money_back && (
        <p className="text-xs font-sans text-text-tertiary mt-1.5 leading-relaxed">
          {pkg.description}
        </p>
      )}
    </div>
  );
}

function formatDistance(miles: number): string {
  if (miles < 1) return "< 1 mile away";
  if (miles < 10) return `${Math.round(miles)} miles away`;
  return `${Math.round(miles / 5) * 5} miles away`;
}

export function InternationalClinicCard({
  clinic,
  isSelected = false,
  onToggleCompare,
  compareDisabled = false,
  showCompare = true,
  ageGroupLabel,
  ageGroupRate,
  distanceMiles,
}: InternationalClinicCardProps) {
  const [packagesOpen, setPackagesOpen] = useState(false);

  const flag = COUNTRY_FLAGS[clinic.country_code] ?? "";
  const hasPackages = clinic.packages && clinic.packages.length > 0;
  const hasMoneyBack = hasPackages && clinic.packages!.some((p) => p.money_back);

  const priceLabel = clinic.offers_ivf
    ? formatPriceRange(clinic.price_ivf_cycle_gbp_min, clinic.price_ivf_cycle_gbp_max)
    : clinic.offers_donor_eggs
      ? formatPriceRange(clinic.price_donor_egg_ivf_gbp_min, clinic.price_donor_egg_ivf_gbp_max)
      : null;

  const priceType = clinic.offers_ivf
    ? "IVF cycle"
    : clinic.offers_donor_eggs
      ? "Donor egg IVF"
      : null;

  // ageGroupRate is undefined when no filter is active, null when the clinic has no data for that age group.
  // We fall back to the under-35 rate in both "no filter" and "no data for selected group" cases so
  // the rate section never disappears unexpectedly when a user changes the age-group selector.
  const hasAgeGroupSelected = ageGroupRate !== undefined;
  const hasAgeGroupData = ageGroupRate !== undefined && ageGroupRate !== null;
  const displayRate = hasAgeGroupData
    ? ageGroupRate
    : clinic.success_rate_ivf_under_35;
  const displayAgeLabel = hasAgeGroupData ? (ageGroupLabel ?? "under 35") : "under 35";
  // True when the user picked a specific group but we're showing under-35 data as a fallback.
  const showingFallback = hasAgeGroupSelected && !hasAgeGroupData && displayRate !== null;
  const successRate = formatSuccessRate(displayRate);

  const treatments: string[] = [];
  if (clinic.offers_ivf) treatments.push("IVF");
  if (clinic.offers_donor_eggs) treatments.push("Donor Eggs");
  if (clinic.offers_donor_sperm) treatments.push("Donor Sperm");
  if (clinic.offers_iui) treatments.push("IUI");
  if (clinic.offers_egg_freezing) treatments.push("Egg Freezing");
  if (clinic.offers_reciprocal_ivf) treatments.push("Reciprocal IVF");

  const checkboxDisabled = !isSelected && compareDisabled;

  return (
    <div className="rounded-2xl bg-bg-primary border border-border-secondary shadow-sm flex flex-col gap-4 relative overflow-hidden">
      <div className="p-6 flex flex-col gap-4">
        {/* Compare checkbox */}
        {showCompare && onToggleCompare && (
          <label
            className={`absolute top-4 right-4 flex items-center gap-1.5 cursor-pointer select-none ${
              checkboxDisabled ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            <input
              type="checkbox"
              checked={isSelected}
              disabled={checkboxDisabled}
              onChange={() => onToggleCompare(clinic.slug)}
              className="w-4 h-4 rounded accent-[color:var(--color-bg-brand-solid)] cursor-pointer"
            />
            <span className="text-xs font-medium uppercase tracking-[0.1em] text-text-tertiary font-sans">
              Compare
            </span>
          </label>
        )}

        {/* Location + distance */}
        <div className="flex items-center gap-2 pr-20">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-tertiary font-sans">
            {flag} {clinic.city}
          </p>
          {distanceMiles != null && (
            <span className="text-xs font-sans font-medium text-text-tertiary bg-bg-tertiary border border-border-secondary rounded-full px-2 py-0.5 whitespace-nowrap">
              {formatDistance(distanceMiles)}
            </span>
          )}
        </div>

        {/* Clinic name */}
        <h3 className="font-serif font-semibold text-text-primary text-xl leading-snug pr-4">
          {clinic.name}
        </h3>

        {/* Treatment badges */}
        {treatments.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {treatments.map((t) => (
              <span
                key={t}
                className="rounded-full bg-bg-brand-primary text-text-brand-secondary text-xs font-medium uppercase tracking-[0.15em] px-2.5 py-1"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        {priceLabel && priceType && (
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-tertiary font-sans mb-0.5">
              {priceType}
            </p>
            <p className="text-md font-sans font-medium text-text-primary">{priceLabel}</p>
          </div>
        )}

        {/* Success rate */}
        {displayRate !== null ? (
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-tertiary font-sans">
                Success rate ({displayAgeLabel})
              </p>
              <SuccessRateTooltip countryCode={clinic.country_code} ageLabel={displayAgeLabel} />
            </div>
            <p className="text-md font-sans font-medium text-text-primary">{successRate}</p>
            {showingFallback && (
              <p className="text-xs font-sans text-text-tertiary mt-0.5">
                No data for {ageGroupLabel}, showing under 35
              </p>
            )}
          </div>
        ) : hasAgeGroupSelected ? (
          /* Age group filter active but absolutely no success rate data for this clinic */
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-tertiary font-sans">
                Success rate ({ageGroupLabel})
              </p>
            </div>
            <p className="text-sm font-sans text-text-tertiary">No data available</p>
          </div>
        ) : null}

        {/* Status badges */}
        <div className="flex flex-wrap gap-1.5">
          {clinic.treats_single_women && (
            <span className="rounded-full bg-bg-success-primary text-text-success-primary text-xs font-medium uppercase tracking-[0.15em] px-2.5 py-1">
              Solo-friendly
            </span>
          )}
          {clinic.remote_initial_consultation && (
            <span className="rounded-full bg-bg-brand-primary text-text-brand-secondary text-xs font-medium uppercase tracking-[0.15em] px-2.5 py-1">
              Remote consult
            </span>
          )}
          {hasMoneyBack && (
            <span className="rounded-full bg-bg-brand-primary text-text-brand-secondary text-xs font-medium uppercase tracking-[0.15em] px-2.5 py-1">
              Money-back available
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2 mt-auto">
          {hasPackages && (
            <button
              onClick={() => setPackagesOpen((v) => !v)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border-secondary text-text-primary px-6 py-2.5 text-sm font-sans font-medium hover:border-border-brand hover:text-text-brand-secondary transition-colors"
            >
              {packagesOpen ? "Hide" : "View"} packages ({clinic.packages!.length})
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${packagesOpen ? "rotate-180" : ""}`}
              />
            </button>
          )}
          <Link
            href={`/clinics/${clinic.slug}`}
            className="inline-flex items-center justify-center rounded-full bg-bg-brand-solid text-text-white px-6 py-2.5 text-sm font-sans font-medium hover:bg-bg-brand-solid-hover transition-colors"
          >
            View clinic
          </Link>
        </div>
      </div>

      {/* Expandable packages panel */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: packagesOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 260ms ease-out",
        }}
      >
        <div className="overflow-hidden">
          {hasPackages && (
            <div className="px-6 pb-6 border-t border-border-secondary pt-4 space-y-3">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-tertiary font-sans mb-3">
                Packages &amp; bundles
              </p>
              {clinic.packages!.map((pkg) => (
                <PackagePill key={pkg.name} pkg={pkg} />
              ))}
              <p className="text-xs font-sans text-text-tertiary mt-2">
                Prices are estimates in GBP. Confirm directly with the clinic.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
