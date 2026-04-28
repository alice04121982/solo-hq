"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ShieldAlert } from "lucide-react";
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

function PackagePill({ pkg }: { pkg: ClinicPackage }) {
  return (
    <div className="rounded-xl border border-border bg-background p-3">
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-sans font-semibold text-foreground leading-snug">
            {pkg.name}
          </p>
          {pkg.cycles && (
            <p className="text-xs font-sans text-muted mt-0.5">
              {pkg.cycles} cycles
              {pkg.includes_meds ? " · meds included" : ""}
            </p>
          )}
        </div>
        <div className="text-right shrink-0">
          {pkg.price_gbp != null && (
            <p className="text-sm font-sans font-bold text-foreground">
              £{pkg.price_gbp.toLocaleString()}
            </p>
          )}
          {pkg.saves_gbp != null && pkg.saves_gbp > 0 && (
            <p className="text-[11px] font-sans font-semibold" style={{ color: "var(--primary)" }}>
              Save £{pkg.saves_gbp.toLocaleString()}
            </p>
          )}
        </div>
      </div>

      {pkg.money_back && (
        <div className="flex items-start gap-1.5 mt-2">
          <ShieldAlert className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: "var(--primary)" }} />
          <p className="text-[12px] font-sans text-muted leading-relaxed">
            {pkg.money_back_terms ?? "Money-back guarantee if unsuccessful"}
          </p>
        </div>
      )}

      {pkg.description && !pkg.money_back && (
        <p className="text-[12px] font-sans text-muted mt-1.5 leading-relaxed">
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

  const displayRate = ageGroupRate !== undefined ? ageGroupRate : clinic.success_rate_ivf_under_35;
  const displayAgeLabel = ageGroupLabel ?? "under 35";
  const successRate = formatSuccessRate(displayRate);

  const treatments: string[] = [];
  if (clinic.offers_ivf) treatments.push("IVF");
  if (clinic.offers_donor_eggs) treatments.push("Donor Eggs");
  if (clinic.offers_iui) treatments.push("IUI");
  if (clinic.offers_egg_freezing) treatments.push("Egg Freezing");

  const checkboxDisabled = !isSelected && compareDisabled;

  return (
    <div className="rounded-2xl bg-white border border-border shadow-sm flex flex-col gap-4 relative overflow-hidden">
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
              className="w-4 h-4 rounded accent-[color:var(--accent)] cursor-pointer"
            />
            <span className="text-[12px] font-[500] uppercase tracking-[0.1em] text-muted font-sans">
              Compare
            </span>
          </label>
        )}

        {/* Location + distance */}
        <div className="flex items-center gap-2 pr-20">
          <p className="text-[12px] font-[500] uppercase tracking-[0.15em] text-muted font-sans">
            {flag} {clinic.city}
          </p>
          {distanceMiles != null && (
            <span className="text-[11px] font-sans font-medium text-muted bg-background-alt border border-border rounded-full px-2 py-0.5 whitespace-nowrap">
              {formatDistance(distanceMiles)}
            </span>
          )}
        </div>

        {/* Clinic name */}
        <h3 className="font-serif font-semibold text-foreground text-xl leading-snug pr-4">
          {clinic.name}
        </h3>

        {/* Treatment badges */}
        {treatments.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {treatments.map((t) => (
              <span
                key={t}
                className="rounded-full bg-accent/10 text-accent text-[12px] font-[500] uppercase tracking-[0.15em] px-2.5 py-1"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        {priceLabel && priceType && (
          <div>
            <p className="text-[12px] font-[500] uppercase tracking-[0.15em] text-muted font-sans mb-0.5">
              {priceType}
            </p>
            <p className="text-base font-sans font-medium text-foreground">{priceLabel}</p>
          </div>
        )}

        {/* Success rate */}
        {displayRate !== null && (
          <div>
            <p className="text-[12px] font-[500] uppercase tracking-[0.15em] text-muted font-sans mb-0.5">
              Success rate ({displayAgeLabel})
            </p>
            <p className="text-base font-sans font-medium text-foreground">{successRate}</p>
          </div>
        )}

        {/* Status badges */}
        <div className="flex flex-wrap gap-1.5">
          {clinic.treats_single_women && (
            <span className="rounded-full bg-green-50 text-green-700 text-[12px] font-[500] uppercase tracking-[0.15em] px-2.5 py-1">
              Solo-friendly
            </span>
          )}
          {clinic.remote_initial_consultation && (
            <span className="rounded-full bg-accent/10 text-accent text-[12px] font-[500] uppercase tracking-[0.15em] px-2.5 py-1">
              Remote consult
            </span>
          )}
          {hasMoneyBack && (
            <span
              className="rounded-full text-[12px] font-[500] uppercase tracking-[0.15em] px-2.5 py-1"
              style={{ background: "color-mix(in srgb, var(--primary) 12%, transparent)", color: "var(--primary)" }}
            >
              Money-back available
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2 mt-auto">
          {hasPackages && (
            <button
              onClick={() => setPackagesOpen((v) => !v)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border text-foreground px-6 py-2.5 text-sm font-sans font-medium hover:border-primary hover:text-primary transition-colors"
            >
              {packagesOpen ? "Hide" : "View"} packages ({clinic.packages!.length})
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${packagesOpen ? "rotate-180" : ""}`}
              />
            </button>
          )}
          <Link
            href={`/clinics/${clinic.slug}`}
            className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-6 py-2.5 text-sm font-sans font-medium hover:bg-accent transition-colors"
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
            <div className="px-6 pb-6 border-t border-border pt-4 space-y-3">
              <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted font-sans mb-3">
                Packages &amp; bundles
              </p>
              {clinic.packages!.map((pkg) => (
                <PackagePill key={pkg.name} pkg={pkg} />
              ))}
              <p className="text-[11px] font-sans text-muted mt-2">
                Prices are estimates in GBP. Confirm directly with the clinic.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
