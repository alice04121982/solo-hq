"use client";

import Link from "next/link";
import { Check, X } from "lucide-react";
import type { AgeBracket, Clinic, Treatment } from "@/types/clinic";
import { priceForTreatment, pricedTreatment, rateFor } from "@/lib/clinics";
import { VerificationBadge } from "./rate-display";

interface ComparisonTableProps {
  clinics: Clinic[];
  ageBracket: AgeBracket;
  ageBracketLabel: string;
  /** Prices the table on the same treatment as the result cards. */
  selectedTreatments: Treatment[];
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
export function ComparisonTable({
  clinics,
  ageBracket,
  ageBracketLabel,
  selectedTreatments,
  onRemove,
}: ComparisonTableProps) {
  if (clinics.length < 2) return null;

  const rates = clinics.map((c) => rateFor(c, ageBracket));
  const bestRate = Math.max(...rates.filter((r): r is number => r != null));

  // An IUI-only search compares IUI prices; anything else compares IVF cycle
  // prices, so the column and its "best" badge match the result cards.
  const pricedOn = pricedTreatment(selectedTreatments) === "IUI" ? "IUI" : "IVF";
  const priceOf = (c: Clinic) => priceForTreatment(c, pricedOn);
  const prices = clinics.map(priceOf).filter((p): p is number => p != null);
  const bestPrice = prices.length > 0 ? Math.min(...prices) : null;

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

      <div className="rounded-[24px] border border-border bg-background overflow-x-auto">
        <table className="w-full border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-border">
              <th className={`${headerCell} sticky left-0 z-10 bg-background border-r border-border`}>
                Clinic
              </th>
              <th className={headerCell}>Success rate, {ageBracketLabel.toLowerCase()}</th>
              <th className={headerCell}>Source</th>
              <th className={headerCell}>Price per {pricedOn} cycle</th>
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
              const price = priceOf(clinic);
              const isBestPrice = bestPrice != null && price === bestPrice;
              return (
                <tr
                  key={clinic.slug}
                  className={i < clinics.length - 1 ? "border-b border-border" : ""}
                >
                  <td className={`${bodyCell} sticky left-0 z-10 bg-background border-r border-border`}>
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
                    {price != null ? (
                      <>
                        <span className="font-semibold">£{price.toLocaleString()}</span>
                        {isBestPrice && <BestBadge />}
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
        not directly comparable with HFEA verified UK figures.
      </p>
    </div>
  );
}
