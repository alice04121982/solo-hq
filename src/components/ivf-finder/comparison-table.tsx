"use client";

import Link from "next/link";
import { Check, X } from "lucide-react";
import type { AgeBracket, Clinic } from "@/types/clinic";
import { rateFor } from "@/lib/clinics";
import { travelEstimateForCity, TRAVEL_ASSUMPTIONS } from "@/lib/travel";
import { VerificationBadge } from "./rate-display";

interface ComparisonTableProps {
  clinics: Clinic[];
  ageBracket: AgeBracket;
  ageBracketLabel: string;
  onRemove: (slug: string) => void;
}

const DONOR_LABELS: Record<NonNullable<Clinic["donorAnonymity"]>, string> = {
  identifiable: "Identifiable donors",
  anonymous: "Anonymous donors",
  both: "Identifiable and anonymous",
};

function BestBadge() {
  return (
    <span className="ml-1.5 inline-block bg-accent/20 text-teal-ink text-[11px] font-bold px-1 py-0.5 rounded align-middle">
      best
    </span>
  );
}

/**
 * Side-by-side comparison, one clinic per row. The table scrolls horizontally
 * on narrow screens with the clinic name column pinned, so a row never loses
 * its identity mid-scroll. Cells sit flat on the card surface: separation is
 * borders only, no shadows.
 */
export function ComparisonTable({ clinics, ageBracket, ageBracketLabel, onRemove }: ComparisonTableProps) {
  if (clinics.length < 2) return null;

  const rates = clinics.map((c) => rateFor(c, ageBracket));
  const bestRate = Math.max(...rates.filter((r): r is number => r != null));

  // "Best" is judged on the travel-inclusive true cost, never the headline
  // price: comparing a Brno quote with a London one without the flights is
  // exactly the distortion this table exists to remove.
  const trueCostFor = (c: Clinic): number | null => {
    if (c.pricePerCycleGbp == null) return null;
    const travel = c.region !== "UK" ? travelEstimateForCity(c.city) : null;
    return c.pricePerCycleGbp + (travel?.mid ?? 0);
  };
  const trueCosts = clinics.map(trueCostFor).filter((p): p is number => p != null);
  const bestTrueCost = trueCosts.length > 0 ? Math.min(...trueCosts) : null;

  const headerCell =
    "px-4 py-3 text-left text-[12px] font-[700] uppercase tracking-[0.12em] text-muted whitespace-nowrap";
  const bodyCell = "px-4 py-3 text-sm text-foreground align-top whitespace-nowrap";

  return (
    <div id="comparison-table">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-base font-bold text-teal-ink">
          Comparing {clinics.length} clinics
        </h2>
        <p className="text-xs text-muted">Success rates shown for {ageBracketLabel.toLowerCase()}</p>
      </div>

      <div className="rounded-[24px] border border-border-warm bg-background overflow-x-auto">
        <table className="w-full border-collapse min-w-[1020px]">
          <thead>
            <tr className="border-b border-border-warm">
              <th className={`${headerCell} sticky left-0 z-10 bg-background border-r border-border-warm`}>
                Clinic
              </th>
              <th className={headerCell}>Success rate, {ageBracketLabel.toLowerCase()}</th>
              <th className={headerCell}>Source</th>
              <th className={headerCell}>Price per cycle</th>
              <th className={headerCell}>True cost with travel</th>
              <th className={headerCell}>Location</th>
              <th className={headerCell}>Donor anonymity</th>
              <th className={headerCell}>Remote consultation</th>
              <th className={headerCell}>Treatments</th>
              <th className={headerCell}>
                <span className="sr-only">Remove</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {clinics.map((clinic, i) => {
              const rate = rateFor(clinic, ageBracket);
              const isBestRate = rate != null && rate === bestRate;
              const travel = clinic.region !== "UK" ? travelEstimateForCity(clinic.city) : null;
              const trueCost = trueCostFor(clinic);
              const isBestTrueCost = bestTrueCost != null && trueCost === bestTrueCost;
              return (
                <tr
                  key={clinic.slug}
                  className={i < clinics.length - 1 ? "border-b border-border-warm" : ""}
                >
                  <td className={`${bodyCell} sticky left-0 z-10 bg-background border-r border-border-warm`}>
                    <Link
                      href={`/ivf-finder/${clinic.slug}`}
                      className="font-bold text-teal-ink hover:underline underline-offset-2"
                    >
                      {clinic.name}
                    </Link>
                    <p className="text-xs text-muted mt-0.5">
                      {clinic.city}, {clinic.country}
                    </p>
                  </td>
                  <td className={bodyCell}>
                    {rate != null ? (
                      <>
                        <span className="font-bold text-teal-ink">{rate}%</span>
                        {isBestRate && <BestBadge />}
                        <p className="text-xs text-muted mt-0.5">
                          {clinic.successRates.denominator}, {clinic.successRates.year}
                        </p>
                      </>
                    ) : (
                      <span className="text-muted">Not published</span>
                    )}
                  </td>
                  <td className={bodyCell}>
                    <VerificationBadge verification={clinic.successRates.verification} />
                  </td>
                  <td className={bodyCell}>
                    {clinic.pricePerCycleGbp != null ? (
                      <span className="font-semibold">
                        £{clinic.pricePerCycleGbp.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-muted">Not published</span>
                    )}
                  </td>
                  <td className={bodyCell}>
                    {trueCost != null ? (
                      <>
                        <span className="font-semibold">≈ £{trueCost.toLocaleString()}</span>
                        {isBestTrueCost && <BestBadge />}
                        <p className="text-xs text-muted mt-0.5">
                          {travel != null
                            ? `incl. ~£${travel.mid.toLocaleString()} flights + stays`
                            : "no travel needed"}
                        </p>
                      </>
                    ) : (
                      <span className="text-muted">Not published</span>
                    )}
                  </td>
                  <td className={bodyCell}>{clinic.region}</td>
                  <td className={bodyCell}>
                    {clinic.donorAnonymity != null ? (
                      DONOR_LABELS[clinic.donorAnonymity]
                    ) : (
                      <span className="text-muted">No donor treatment</span>
                    )}
                  </td>
                  <td className={bodyCell}>
                    {clinic.remoteConsultation ? (
                      <span className="inline-flex items-center gap-1 text-teal-ink font-semibold">
                        <Check className="h-3.5 w-3.5" aria-hidden /> Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-muted">
                        <X className="h-3.5 w-3.5" aria-hidden /> No
                      </span>
                    )}
                  </td>
                  <td className={`${bodyCell} max-w-[220px] whitespace-normal`}>
                    <span className="text-xs text-muted">{clinic.treatments.join(", ")}</span>
                  </td>
                  <td className={bodyCell}>
                    <button
                      onClick={() => onRemove(clinic.slug)}
                      aria-label={`Remove ${clinic.name} from comparison`}
                      className="p-1.5 rounded-full text-muted hover:bg-surface-hover hover:text-teal transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted mt-3">
        Figures marked Clinic reported are self-published, use different denominators, and are
        not directly comparable with HFEA verified UK figures. True cost adds our
        destination-specific estimate of flights and stays across{" "}
        {TRAVEL_ASSUMPTIONS.tripsPerCycle.low}–{TRAVEL_ASSUMPTIONS.tripsPerCycle.high} trips to
        the headline price; check live prices for your own dates before budgeting.
      </p>
    </div>
  );
}
