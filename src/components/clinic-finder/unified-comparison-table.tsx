"use client";

import { Globe, ShieldCheck, Heart, Plane } from "lucide-react";
import type { ComparableClinic } from "@/types/comparable-clinic";

function fmtPrice(val?: { min?: number; max?: number }): string {
  if (!val || (val.min == null && val.max == null)) return "—";
  if (val.min != null && val.max != null)
    return `£${val.min.toLocaleString()} – £${val.max.toLocaleString()}`;
  if (val.min != null) return `£${val.min.toLocaleString()}`;
  if (val.max != null) return `£${val.max.toLocaleString()}`;
  return "—";
}

function findMinPrice(
  clinics: ComparableClinic[],
  getter: (c: ComparableClinic) => number | undefined
): number | null {
  const vals = clinics.map(getter).filter((v): v is number => v != null);
  return vals.length > 0 ? Math.min(...vals) : null;
}

function BoolCell({ value }: { value?: boolean | null }) {
  if (value == null) return <span className="text-muted text-sm">—</span>;
  return value ? (
    <span className="text-lime-dark font-bold text-sm">✓</span>
  ) : (
    <span className="text-muted text-sm">✗</span>
  );
}

interface UnifiedComparisonTableProps {
  clinics: ComparableClinic[];
}

export function UnifiedComparisonTable({ clinics }: UnifiedComparisonTableProps) {
  if (clinics.length < 2) return null;

  const minIvf = findMinPrice(clinics, (c) => c.price_ivf?.min);
  const minDonorSperm = findMinPrice(clinics, (c) => c.price_donor_sperm?.min);
  const minDonorEgg = findMinPrice(clinics, (c) => c.price_donor_egg?.min);
  const maxSr35 = Math.max(...clinics.map((c) => c.sr_under35 ?? 0));
  const maxSr3537 = Math.max(...clinics.map((c) => c.sr_35_37 ?? 0));
  const maxSr3839 = Math.max(...clinics.map((c) => c.sr_38_39 ?? 0));

  return (
    <div id="comparison-table" className="rounded-[32px] bg-card-bg border border-card-border overflow-hidden">
      <div className="p-6 border-b border-card-border">
        <h2 className="text-lg font-bold text-navy">Side-by-Side Comparison</h2>
        <p className="text-sm text-muted mt-0.5">
          Lowest price and highest success rate highlighted. All prices in GBP.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-card-border">
              <th className="text-left p-4 w-[200px] text-xs font-semibold uppercase tracking-wider text-muted bg-warm-white sticky left-0">
                Feature
              </th>
              {clinics.map((clinic) => (
                <th key={clinic.id} className="p-4 text-left align-top">
                  <div className="flex flex-wrap gap-1.5 mb-1.5">
                    {clinic.type === "uk" && clinic.hfea && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-lime/20 px-1.5 py-0.5 text-[9px] font-semibold text-charcoal">
                        <ShieldCheck className="h-2.5 w-2.5" /> HFEA
                      </span>
                    )}
                    {clinic.type === "abroad" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-1.5 py-0.5 text-[9px] font-semibold text-accent">
                        <Plane className="h-2.5 w-2.5" /> Abroad
                      </span>
                    )}
                    {clinic.soloFriendly && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-lavender px-1.5 py-0.5 text-[9px] font-semibold text-navy">
                        <Heart className="h-2.5 w-2.5" /> Solo
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-bold text-navy leading-tight">
                    {clinic.flag} {clinic.name}
                  </p>
                  <p className="text-xs text-muted mt-0.5">{clinic.location}</p>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* Pricing */}
            <tr>
              <td colSpan={clinics.length + 1} className="px-4 pt-4 pb-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                  Pricing (GBP)
                </p>
              </td>
            </tr>
            {[
              {
                label: "IVF cycle",
                getMin: (c: ComparableClinic) => c.price_ivf?.min,
                getDisplay: (c: ComparableClinic) => fmtPrice(c.price_ivf),
                bestMin: minIvf,
              },
              {
                label: "Donor Sperm IVF",
                getMin: (c: ComparableClinic) => c.price_donor_sperm?.min,
                getDisplay: (c: ComparableClinic) => fmtPrice(c.price_donor_sperm),
                bestMin: minDonorSperm,
              },
              {
                label: "Donor Egg IVF",
                getMin: (c: ComparableClinic) => c.price_donor_egg?.min,
                getDisplay: (c: ComparableClinic) => fmtPrice(c.price_donor_egg),
                bestMin: minDonorEgg,
              },
            ].map(({ label, getMin, getDisplay, bestMin }) => (
              <tr key={label} className="border-t border-card-border/50">
                <td className="p-4 text-xs text-muted sticky left-0 bg-card-bg">{label}</td>
                {clinics.map((clinic) => {
                  const minVal = getMin(clinic);
                  const isLowest = bestMin != null && minVal != null && minVal === bestMin;
                  return (
                    <td key={clinic.id} className="p-4">
                      <span
                        className={`text-sm font-semibold ${isLowest ? "text-lime-dark" : "text-navy"}`}
                      >
                        {getDisplay(clinic)}
                        {isLowest && minVal != null && (
                          <span className="ml-1 text-[9px] bg-lime/20 text-charcoal px-1 py-0.5 rounded">
                            lowest
                          </span>
                        )}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}

            {/* Success rates */}
            <tr>
              <td colSpan={clinics.length + 1} className="px-4 pt-5 pb-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                  Live Birth / Success Rates
                </p>
              </td>
            </tr>
            {[
              {
                label: "Under 35",
                getter: (c: ComparableClinic) => c.sr_under35,
                best: maxSr35,
              },
              {
                label: "35–37",
                getter: (c: ComparableClinic) => c.sr_35_37,
                best: maxSr3537,
              },
              {
                label: "38–39",
                getter: (c: ComparableClinic) => c.sr_38_39,
                best: maxSr3839,
              },
            ].map(({ label, getter, best }) => (
              <tr key={label} className="border-t border-card-border/50">
                <td className="p-4 text-xs text-muted sticky left-0 bg-card-bg">
                  Success rate ({label})
                </td>
                {clinics.map((clinic) => {
                  const val = getter(clinic);
                  const isBest = val != null && val === best && best > 0;
                  return (
                    <td key={clinic.id} className="p-4">
                      <span
                        className={`text-sm font-semibold ${isBest ? "text-lime-dark" : "text-navy"}`}
                      >
                        {val != null ? `${val}%` : "—"}
                        {isBest && val != null && (
                          <span className="ml-1 text-[9px] bg-lime/20 text-charcoal px-1 py-0.5 rounded">
                            highest
                          </span>
                        )}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}

            {/* Clinic details */}
            <tr>
              <td colSpan={clinics.length + 1} className="px-4 pt-5 pb-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                  Clinic Details
                </p>
              </td>
            </tr>
            <tr className="border-t border-card-border/50">
              <td className="p-4 text-xs text-muted sticky left-0 bg-card-bg">Solo-friendly</td>
              {clinics.map((c) => (
                <td key={c.id} className="p-4">
                  <BoolCell value={c.soloFriendly} />
                </td>
              ))}
            </tr>
            <tr className="border-t border-card-border/50">
              <td className="p-4 text-xs text-muted sticky left-0 bg-card-bg">
                HFEA / Regulatory body
              </td>
              {clinics.map((c) => (
                <td key={c.id} className="p-4">
                  {c.type === "uk" ? (
                    <BoolCell value={c.hfea} />
                  ) : (
                    <span className="text-xs text-navy">{c.regulatory ?? "—"}</span>
                  )}
                </td>
              ))}
            </tr>
            <tr className="border-t border-card-border/50">
              <td className="p-4 text-xs text-muted sticky left-0 bg-card-bg">
                Waiting time / Travel
              </td>
              {clinics.map((c) => (
                <td key={c.id} className="p-4">
                  <span className="text-sm text-navy">
                    {c.type === "uk"
                      ? c.waiting_weeks != null
                        ? `${c.waiting_weeks} weeks`
                        : "—"
                      : c.travel_visits != null
                        ? `${c.travel_visits} visits`
                        : "—"}
                  </span>
                </td>
              ))}
            </tr>
            <tr className="border-t border-card-border/50">
              <td className="p-4 text-xs text-muted sticky left-0 bg-card-bg">
                Payment plans / Meds included
              </td>
              {clinics.map((c) => (
                <td key={c.id} className="p-4">
                  {c.type === "uk" ? (
                    <BoolCell value={c.payment_plans} />
                  ) : (
                    <BoolCell value={c.price_includes_meds} />
                  )}
                </td>
              ))}
            </tr>
            <tr className="border-t border-card-border/50">
              <td className="p-4 text-xs text-muted sticky left-0 bg-card-bg">Website</td>
              {clinics.map((c) => (
                <td key={c.id} className="p-4">
                  {c.website ? (
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
                    <span className="text-muted text-sm">—</span>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
