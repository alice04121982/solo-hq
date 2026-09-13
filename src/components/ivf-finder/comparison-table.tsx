"use client";

import Link from "next/link";
import { Check, X } from "lucide-react";
import type { AgeBracket, Clinic } from "@/types/clinic";
import { rateBandLabel, rateFor } from "@/lib/clinics";
import { travelEstimateForCity, TRAVEL_ASSUMPTIONS } from "@/lib/travel";
import {
  BADGE_CLINIC,
  BADGE_HFEA,
  PRICE_HEADLINE,
  PRICE_HEADLINE_TRAVEL,
  rateLine,
} from "@/lib/rate-labels";
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

/**
 * Side-by-side comparison, one clinic per row. The table scrolls horizontally
 * on narrow screens with the clinic name column pinned, so a row never loses
 * its identity mid-scroll. Cells sit flat on the card surface: separation is
 * borders only, no shadows. Nothing in the table is marked "best": the
 * figures carry different measures and the HFEA advises against reading
 * small differences as a ranking.
 */
export function ComparisonTable({ clinics, ageBracket, ageBracketLabel, onRemove }: ComparisonTableProps) {
  if (clinics.length < 2) return null;

  const headerCell =
    "px-4 py-3 text-left text-[12px] font-[700] uppercase tracking-[0.12em] text-muted whitespace-nowrap";
  const bodyCell = "px-4 py-3 text-sm text-foreground align-top whitespace-nowrap";
  const bodyCellWrap = "px-4 py-3 text-sm text-foreground align-top max-w-[220px] whitespace-normal";

  return (
    <div id="comparison-table">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-base font-bold text-teal-ink">
          Comparing {clinics.length} clinics
        </h2>
        <p className="text-xs text-muted">Rates shown for {ageBracketLabel.toLowerCase()}</p>
      </div>

      <div className="rounded-[24px] bg-background overflow-x-auto">
        <table className="w-full border-collapse min-w-[1020px]">
          <thead>
            <tr className="border-b border-border-warm">
              <th className={`${headerCell} sticky left-0 z-10 bg-background border-r border-border-warm`}>
                Clinic
              </th>
              <th className={headerCell}>Published rate, {ageBracketLabel.toLowerCase()}</th>
              <th className={headerCell}>Source</th>
              <th className={headerCell}>{PRICE_HEADLINE}</th>
              <th className={headerCell}>{PRICE_HEADLINE_TRAVEL}</th>
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
              const travel = clinic.region !== "UK" ? travelEstimateForCity(clinic.city) : null;
              const price = clinic.pricePerCycleGbp;
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
                        <p className="text-xs text-muted mt-0.5">{rateLine(clinic)}</p>
                        {clinic.successRates.verification === "hfea" && (
                          <p className="text-xs text-muted">HFEA band: {rateBandLabel(clinic, ageBracket)}</p>
                        )}
                      </>
                    ) : (
                      <span className="text-muted">Not published</span>
                    )}
                  </td>
                  <td className={bodyCell}>
                    <VerificationBadge verification={clinic.successRates.verification} />
                  </td>
                  <td className={bodyCell}>
                    {price != null ? (
                      <>
                        <span className="font-semibold">£{price.toLocaleString()}</span>
                        <p className="text-xs text-muted mt-0.5">per IVF cycle, own eggs</p>
                      </>
                    ) : (
                      <span className="text-muted">Not published</span>
                    )}
                  </td>
                  <td className={bodyCell}>
                    {price != null && travel != null ? (
                      <>
                        <span className="font-semibold">
                          £{(price + travel.low).toLocaleString()}–£{(price + travel.high).toLocaleString()}
                        </span>
                        <p className="text-xs text-muted mt-0.5">
                          incl. £{travel.low.toLocaleString()}–£{travel.high.toLocaleString()} flights and stays
                        </p>
                      </>
                    ) : price != null ? (
                      <>
                        <span className="font-semibold">£{price.toLocaleString()}</span>
                        <p className="text-xs text-muted mt-0.5">no travel estimate added</p>
                      </>
                    ) : (
                      <span className="text-muted">Not published</span>
                    )}
                  </td>
                  <td className={bodyCell}>{clinic.region}</td>
                  <td className={bodyCell}>
                    {clinic.donorAnonymity != null ? (
                      DONOR_LABELS[clinic.donorAnonymity]
                    ) : clinic.donorAnonymityNote ? (
                      <span className="text-muted">{clinic.donorAnonymityNote}</span>
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
                  <td className={bodyCellWrap}>
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
        Figures marked &ldquo;{BADGE_CLINIC}&rdquo; use different measures and are not directly
        comparable with figures marked &ldquo;{BADGE_HFEA}&rdquo;. The travel estimate adds our
        destination figure for flights and stays across {TRAVEL_ASSUMPTIONS.tripsPerCycle.low}–
        {TRAVEL_ASSUMPTIONS.tripsPerCycle.high} trips to the headline price; drugs, ICSI, donor
        material and storage are usually charged on top. Check live prices for your own dates.
      </p>
    </div>
  );
}
