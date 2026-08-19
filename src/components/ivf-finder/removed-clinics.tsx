"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink, MinusCircle } from "lucide-react";
import type { ClinicExclusion } from "@/lib/clinic-exclusions";

/**
 * Clinics removed from the finder, shown in the finder.
 *
 * A clinic that quietly is not in the list looks identical to a clinic nobody
 * has got round to adding, and the difference matters most to the person who
 * has already been sent the clinic's brochure. So the removals sit under the
 * results with their reasons and their sources, and they answer a geography
 * filter the same way a listed clinic would: filter to where a removed clinic
 * operates and this is what comes back, rather than an empty list.
 *
 * It stays collapsed by default — it is context, not a result — and opens
 * itself when the filters point at it.
 */
interface RemovedClinicsProps {
  /** Exclusions matching the current geography filters. */
  exclusions: ClinicExclusion[];
  /**
   * Whether the filters point specifically at these, rather than matching
   * them because nothing is filtered. Drives the opened-by-default state.
   */
  targeted: boolean;
  /** No clinic matched the filters, so this panel is the whole answer. */
  resultsEmpty: boolean;
}

export function RemovedClinics({ exclusions, targeted, resultsEmpty }: RemovedClinicsProps) {
  const shouldOpen = targeted || (resultsEmpty && exclusions.length > 0);

  // The panel follows the filters, but a reader who has closed it keeps it
  // closed until the filters move again. Storing the override rather than the
  // open state is what lets both be true: it is dropped whenever the filters
  // change what the panel should be doing.
  const [override, setOverride] = useState<boolean | null>(null);
  const [lastShouldOpen, setLastShouldOpen] = useState(shouldOpen);
  if (lastShouldOpen !== shouldOpen) {
    setLastShouldOpen(shouldOpen);
    setOverride(null);
  }
  const open = override ?? shouldOpen;

  if (exclusions.length === 0) return null;

  const count = exclusions.length;
  const countries = [...new Set(exclusions.map((x) => x.country))];

  return (
    <div
      className={`rounded-2xl border bg-background p-4 ${
        shouldOpen ? "border-teal/30" : "border-border-warm"
      }`}
    >
      <button
        type="button"
        onClick={() => setOverride(!open)}
        aria-expanded={open}
        className="flex w-full items-start gap-3 text-left"
      >
        <MinusCircle className="h-4 w-4 text-muted shrink-0 mt-0.5" aria-hidden />
        <span className="flex-1 text-xs text-muted leading-relaxed">
          <strong className="text-teal-ink">
            {count === 1 ? "1 clinic has" : `${count} clinics have`} been removed from this
            list
          </strong>{" "}
          {countries.length === 1 ? `in ${countries[0]}` : `across ${countries.join(", ")}`}.{" "}
          {shouldOpen && !open
            ? "They match your filters, so nothing here is hidden from you."
            : "We do not list them, and we say why."}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-muted shrink-0 mt-0.5 transition-transform duration-150 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>

      {open && (
        <div className="mt-4 space-y-5 pl-7">
          {exclusions.map((x) => (
            <div key={x.name} className="border-l-2 border-teal/15 pl-4">
              <p className="text-sm font-semibold text-teal-ink">
                {x.name} &mdash; {x.country}
              </p>
              <p className="text-xs text-muted leading-relaxed mt-1">{x.reason}</p>
              {x.response && (
                <p className="text-xs text-muted leading-relaxed mt-2">
                  <span className="font-medium text-teal-ink">Their response:</span> {x.response}
                </p>
              )}
              <p className="text-xs text-muted leading-relaxed mt-2">
                Sources:{" "}
                {x.sources.map((src, i) => (
                  <span key={src.url}>
                    {i > 0 && "; "}
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-teal hover:underline underline-offset-2"
                    >
                      {src.label}
                      <ExternalLink className="inline h-3 w-3 ml-1 align-baseline" aria-hidden />
                    </a>
                  </span>
                ))}
                .
              </p>
            </div>
          ))}
          <p className="text-xs text-muted leading-relaxed">
            Removing a clinic is not a finding against it, and nothing here is an allegation of
            ours. Each entry records what a named publication has reported and is reviewed on
            the date held with it &mdash; see{" "}
            <a
              href="/about#methodology"
              className="font-medium text-teal hover:underline underline-offset-2"
            >
              how we decide what goes in the finder
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}
