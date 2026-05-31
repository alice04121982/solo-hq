"use client";

import { Globe, ShieldCheck, Heart } from "lucide-react";
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

function BoolCell({ value }: { value?: boolean | null }) {
  if (value == null) return <span className="text-muted">—</span>;
  return value ? (
    <span className="text-lime-dark font-bold">✓</span>
  ) : (
    <span className="text-muted">✗</span>
  );
}

interface PriceRow {
  label: string;
  getter: (c: ClinicData) => number | undefined;
}

const PRICE_ROWS: PriceRow[] = [
  { label: "Basic IVF cycle", getter: (c) => c.prices.basicIvf },
  { label: "IVF + ICSI", getter: (c) => c.prices.ivfIcsi },
  { label: "Donor Sperm IVF", getter: (c) => c.prices.donorSpermIvf },
  { label: "Donor Egg IVF", getter: (c) => c.prices.donorEggIvf },
  { label: "Embryo Freezing (per year)", getter: (c) => c.prices.embryoStorage },
  { label: "Solo / Single Parent Package", getter: (c) => c.prices.soloPackage },
  { label: "Initial Consultation", getter: (c) => c.prices.consultation },
];

export function ComparisonTable({ clinics }: ComparisonTableProps) {
  if (clinics.length < 2) return null;

  return (
    <div id="comparison-table" className="rounded-[32px] bg-card-bg border border-card-border overflow-hidden">
      <div className="p-6 border-b border-card-border">
        <h2 className="text-lg font-bold text-navy">Side-by-Side Comparison</h2>
        <p className="text-sm text-muted mt-0.5">
          Lowest price per row highlighted in green
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          {/* Sticky clinic headers */}
          <thead>
            <tr className="border-b border-card-border">
              <th className="text-left p-4 w-[200px] text-xs font-semibold uppercase tracking-wider text-muted bg-warm-white sticky left-0">
                Feature
              </th>
              {clinics.map((clinic) => (
                <th key={clinic.id} className="p-4 text-left">
                  <div className="flex flex-wrap gap-1.5 mb-1">
                    {clinic.hfeaLicensed && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-lime/20 px-1.5 py-0.5 text-[9px] font-semibold text-charcoal">
                        <ShieldCheck className="h-2.5 w-2.5" />
                        HFEA
                      </span>
                    )}
                    {clinic.soloFriendly && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-lavender px-1.5 py-0.5 text-[9px] font-semibold text-navy">
                        <Heart className="h-2.5 w-2.5" />
                        Solo
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-bold text-navy leading-tight">{clinic.name}</p>
                  {clinic.distanceMiles != null && (
                    <p className="text-xs text-muted">{clinic.distanceMiles} miles away</p>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* Price rows */}
            <tr>
              <td colSpan={clinics.length + 1} className="px-4 pt-4 pb-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">Pricing</p>
              </td>
            </tr>
            {PRICE_ROWS.map((row) => {
              const min = findMin(clinics, row.getter);
              return (
                <tr key={row.label} className="border-t border-card-border/50">
                  <td className="p-4 text-xs text-muted sticky left-0 bg-card-bg">{row.label}</td>
                  {clinics.map((clinic) => {
                    const val = row.getter(clinic);
                    const isMin = min != null && val === min;
                    return (
                      <td key={clinic.id} className="p-4">
                        <span
                          className={`text-sm font-semibold ${
                            isMin ? "text-lime-dark" : "text-navy"
                          }`}
                        >
                          {fmt(val)}
                          {isMin && val != null && (
                            <span className="ml-1 text-[9px] bg-lime/20 text-charcoal px-1 py-0.5 rounded">
                              lowest
                            </span>
                          )}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}

            {/* Packages & bundles */}
            <tr>
              <td colSpan={clinics.length + 1} className="px-4 pt-5 pb-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">Packages &amp; Bundles</p>
              </td>
            </tr>
            <tr className="border-t border-card-border/50 align-top">
              <td className="p-4 text-xs text-muted sticky left-0 bg-card-bg">Available packages</td>
              {clinics.map((clinic) => (
                <td key={clinic.id} className="p-4">
                  {clinic.packages && clinic.packages.length > 0 ? (
                    <div className="space-y-2">
                      {clinic.packages.map((pkg) => (
                        <div key={pkg.name} className="rounded-lg bg-warm-white px-2.5 py-2">
                          <p className="text-[12px] font-semibold text-navy leading-snug">{pkg.name}</p>
                          <p className="text-xs font-bold text-navy mt-0.5">
                            {pkg.price === 0 ? "Free / NHS" : `£${pkg.price.toLocaleString()}`}
                          </p>
                          {pkg.saves != null && pkg.saves > 0 && (
                            <p className="text-[10px] font-semibold text-lime-dark">
                              Save £{pkg.saves.toLocaleString()}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted text-sm">—</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Success rates */}
            <tr>
              <td colSpan={clinics.length + 1} className="px-4 pt-5 pb-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                  Live Birth Rates (HFEA data)
                </p>
              </td>
            </tr>
            {[
              { label: "Success rate (under 35)", getter: (c: ClinicData) => c.successRates.under35 },
              { label: "Success rate (35–37)", getter: (c: ClinicData) => c.successRates.age35to37 },
              { label: "Success rate (38–39)", getter: (c: ClinicData) => c.successRates.age38to39 },
              { label: "Success rate (40–42)", getter: (c: ClinicData) => c.successRates.age40to42 },
              { label: "Success rate (43+)", getter: (c: ClinicData) => c.successRates.age43plus },
            ].map((row) => {
              const max = Math.max(
                ...clinics.map(row.getter).filter((v): v is number => v != null)
              );
              return (
                <tr key={row.label} className="border-t border-card-border/50">
                  <td className="p-4 text-xs text-muted sticky left-0 bg-card-bg">{row.label}</td>
                  {clinics.map((clinic) => {
                    const val = row.getter(clinic);
                    const isBest = val != null && val === max && max > 0;
                    return (
                      <td key={clinic.id} className="p-4">
                        <span className={`text-sm font-semibold ${isBest ? "text-lime-dark" : "text-navy"}`}>
                          {val != null ? `${val}%` : "—"}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}

            {/* Clinic details */}
            <tr>
              <td colSpan={clinics.length + 1} className="px-4 pt-5 pb-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">Clinic Details</p>
              </td>
            </tr>
            {[
              {
                label: "HFEA Licensed",
                render: (c: ClinicData) => <BoolCell value={c.hfeaLicensed} />,
              },
              {
                label: "Solo / Single Women",
                render: (c: ClinicData) => <BoolCell value={c.soloFriendly} />,
              },
              {
                label: "NHS Referrals Accepted",
                render: (c: ClinicData) => <BoolCell value={c.nhsReferrals} />,
              },
              {
                label: "Payment Plans",
                render: (c: ClinicData) => <BoolCell value={c.paymentPlans} />,
              },
              {
                label: "Waiting Time (approx)",
                render: (c: ClinicData) => (
                  <span className="text-sm text-navy">
                    {c.waitingTimeWeeks != null ? `${c.waitingTimeWeeks} weeks` : "—"}
                  </span>
                ),
              },
              {
                label: "Website",
                render: (c: ClinicData) =>
                  c.website ? (
                    <a
                      href={c.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-lavender-dark hover:text-navy transition-colors"
                    >
                      <Globe className="h-3 w-3" />
                      Visit
                    </a>
                  ) : (
                    <span className="text-muted">—</span>
                  ),
              },
            ].map((row) => (
              <tr key={row.label} className="border-t border-card-border/50">
                <td className="p-4 text-xs text-muted sticky left-0 bg-card-bg">{row.label}</td>
                {clinics.map((clinic) => (
                  <td key={clinic.id} className="p-4">
                    {row.render(clinic)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
