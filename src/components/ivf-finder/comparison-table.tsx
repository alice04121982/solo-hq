"use client";

import { Globe, ShieldCheck, Heart, Check, X } from "lucide-react";
import type { ClinicData } from "@/types/clinic";

interface ComparisonTableProps {
  clinics: ClinicData[];
}

function fmt(n?: number | null): string {
  if (n == null) return "—";
  return `£${n.toLocaleString()}`;
}

function findMin(clinics: ClinicData[], getter: (c: ClinicData) => number | undefined): number | null {
  const vals = clinics.map(getter).filter((v): v is number => v != null);
  return vals.length > 0 ? Math.min(...vals) : null;
}

function findMax(clinics: ClinicData[], getter: (c: ClinicData) => number | undefined): number | null {
  const vals = clinics.map(getter).filter((v): v is number => v != null);
  return vals.length > 0 ? Math.max(...vals) : null;
}

const PRICE_ROWS = [
  { label: "Basic IVF", getter: (c: ClinicData) => c.prices.basicIvf },
  { label: "IVF + ICSI", getter: (c: ClinicData) => c.prices.ivfIcsi },
  { label: "Donor Sperm IVF", getter: (c: ClinicData) => c.prices.donorSpermIvf },
  { label: "Donor Egg IVF", getter: (c: ClinicData) => c.prices.donorEggIvf },
  { label: "Embryo storage / yr", getter: (c: ClinicData) => c.prices.embryoStorage },
  { label: "Solo package", getter: (c: ClinicData) => c.prices.soloPackage },
  { label: "Consultation", getter: (c: ClinicData) => c.prices.consultation },
];

const SUCCESS_ROWS = [
  { label: "Under 35", getter: (c: ClinicData) => c.successRates.under35 },
  { label: "35–37", getter: (c: ClinicData) => c.successRates.age35to37 },
  { label: "38–39", getter: (c: ClinicData) => c.successRates.age38to39 },
  { label: "40–42", getter: (c: ClinicData) => c.successRates.age40to42 },
  { label: "43+", getter: (c: ClinicData) => c.successRates.age43plus },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-[700] uppercase tracking-[0.12em] text-muted mb-2 mt-4 first:mt-0">
      {children}
    </p>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-2 py-2 border-t border-border/60 first:border-t-0">
      <span className="text-xs text-muted shrink-0">{label}</span>
      <span
        className={`text-xs font-semibold text-right ${
          highlight ? "text-[#1A3A25]" : "text-foreground"
        }`}
      >
        {value}
        {highlight && (
          <span className="ml-1 inline-block bg-[#C5E600]/20 text-[#1A3A25] text-[9px] font-bold px-1 py-0.5 rounded">
            best
          </span>
        )}
      </span>
    </div>
  );
}

function BoolRow({ label, value }: { label: string; value?: boolean | null }) {
  return (
    <div className="flex items-center justify-between gap-2 py-2 border-t border-border/60">
      <span className="text-xs text-muted shrink-0">{label}</span>
      {value == null ? (
        <span className="text-xs text-muted">—</span>
      ) : value ? (
        <span className="inline-flex items-center gap-0.5 text-[#1A3A25] text-xs font-semibold">
          <Check className="h-3 w-3" /> Yes
        </span>
      ) : (
        <span className="inline-flex items-center gap-0.5 text-muted text-xs">
          <X className="h-3 w-3" /> No
        </span>
      )}
    </div>
  );
}

export function ComparisonTable({ clinics }: ComparisonTableProps) {
  if (clinics.length < 2) return null;

  // Pre-compute best values across all clinics
  const priceMins = PRICE_ROWS.map((r) => findMin(clinics, r.getter));
  const successMaxes = SUCCESS_ROWS.map((r) => findMax(clinics, r.getter));
  const minWait = findMin(clinics, (c) => c.waitingTimeWeeks);

  const colClass =
    clinics.length === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : clinics.length === 3
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4";

  return (
    <div id="comparison-table">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-base font-bold text-navy">
          Comparing {clinics.length} clinics
        </h2>
        <p className="text-xs text-muted">Best values highlighted</p>
      </div>

      <div className={`grid ${colClass} gap-4`}>
        {clinics.map((clinic) => (
          <div
            key={clinic.id}
            className="rounded-2xl border border-border bg-white p-5 flex flex-col"
          >
            {/* Clinic header */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1 mb-2">
                {clinic.hfeaLicensed && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#C5E600]/20 px-2 py-0.5 text-[9px] font-semibold text-[#1A3A25]">
                    <ShieldCheck className="h-2.5 w-2.5" />
                    HFEA
                  </span>
                )}
                {clinic.soloFriendly && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#E8E8E8] px-2 py-0.5 text-[9px] font-semibold text-navy">
                    <Heart className="h-2.5 w-2.5" />
                    Solo-friendly
                  </span>
                )}
              </div>
              <p className="text-sm font-bold text-navy leading-snug">{clinic.name}</p>
              {clinic.distanceMiles != null && (
                <p className="text-xs text-muted mt-0.5">{clinic.distanceMiles} miles away</p>
              )}
            </div>

            {/* Pricing */}
            <SectionLabel>Pricing</SectionLabel>
            {PRICE_ROWS.map((row, i) => {
              const val = row.getter(clinic);
              const min = priceMins[i];
              const isMin = min != null && val != null && val === min;
              return (
                <Row
                  key={row.label}
                  label={row.label}
                  value={val != null ? fmt(val) : "—"}
                  highlight={isMin}
                />
              );
            })}

            {/* Packages */}
            {clinic.packages && clinic.packages.length > 0 && (
              <>
                <SectionLabel>Packages</SectionLabel>
                <div className="space-y-1.5">
                  {clinic.packages.map((pkg) => (
                    <div key={pkg.name} className="rounded-lg bg-[#F5F5F5] px-3 py-2">
                      <p className="text-[11px] font-semibold text-navy leading-snug">{pkg.name}</p>
                      <p className="text-xs font-bold text-navy mt-0.5">
                        {pkg.price === 0 ? "Free / NHS" : `£${pkg.price.toLocaleString()}`}
                      </p>
                      {pkg.saves != null && pkg.saves > 0 && (
                        <p className="text-[10px] font-semibold text-[#1A3A25]">
                          Save £{pkg.saves.toLocaleString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Success rates */}
            <SectionLabel>Live Birth Rates</SectionLabel>
            {SUCCESS_ROWS.map((row, i) => {
              const val = row.getter(clinic);
              const max = successMaxes[i];
              const isBest = max != null && val != null && val === max && max > 0;
              return (
                <Row
                  key={row.label}
                  label={row.label}
                  value={val != null ? `${val}%` : "—"}
                  highlight={isBest}
                />
              );
            })}

            {/* Clinic details */}
            <SectionLabel>Clinic Details</SectionLabel>
            <BoolRow label="HFEA licensed" value={clinic.hfeaLicensed} />
            <BoolRow label="Solo / single women" value={clinic.soloFriendly} />
            <BoolRow label="NHS referrals" value={clinic.nhsReferrals} />
            <BoolRow label="Payment plans" value={clinic.paymentPlans} />
            <Row
              label="Waiting time"
              value={clinic.waitingTimeWeeks != null ? `${clinic.waitingTimeWeeks} wks` : "—"}
              highlight={
                minWait != null &&
                clinic.waitingTimeWeeks != null &&
                clinic.waitingTimeWeeks === minWait
              }
            />
            {clinic.website && (
              <div className="flex items-center justify-between gap-2 py-2 border-t border-border/60">
                <span className="text-xs text-muted">Website</span>
                <a
                  href={clinic.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-muted hover:text-navy transition-colors font-semibold"
                >
                  <Globe className="h-3 w-3" />
                  Visit
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
