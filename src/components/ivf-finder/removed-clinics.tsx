"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink, MinusCircle } from "lucide-react";
import type { ClinicExclusion } from "@/lib/clinic-exclusions";

/**
 * Clinics the finder does not list, shown in the finder.
 *
 * A clinic that quietly is not in the list looks identical to a clinic nobody
 * has got round to adding, and the difference matters most to the person who
 * has already been sent the clinic's brochure. So the exclusions sit under the
 * results with their reasons and their sources, and they answer a geography
 * filter the same way a listed clinic would: filter to where an excluded
 * clinic operates and this is what comes back, rather than an empty list.
 *
 * It stays collapsed by default (it is context, not a result) and opens
 * itself when the filters point at it.
 */

const HFEA_EMOTIONAL_SUPPORT_URL =
  "https://www.hfea.gov.uk/treatments/explore-all-treatments/getting-emotional-support/";
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
  const reasons = [...new Set(exclusions.map((x) => x.reason))];
  const sources = exclusions
    .flatMap((x) => x.sources)
    .filter((src, i, all) => all.findIndex((s) => s.url === src.url) === i);

  return (
    <div
      className={`rounded-2xl border bg-background p-4 ${
        shouldOpen ? "border-teal/30" : "border-transparent"
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
            {count === 1 ? "1 clinic" : `${count} clinics`} in {countries.join(" and ")}{" "}
            {count === 1 ? "is" : "are"} not listed.
          </strong>{" "}
          See why.
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
          {/* Neutral wording (see src/lib/clinic-exclusions.ts): one shared
              reason, no clinic names, and the sources deduplicated across
              entries, so nothing here attaches an allegation to a named clinic. */}
          {reasons.map((reason) => (
            <p key={reason} className="text-xs text-muted leading-relaxed">
              {reason}
            </p>
          ))}
          <p className="text-xs text-muted leading-relaxed">
            Reporting:{" "}
            {sources.map((src, i) => (
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
          <p className="text-xs text-muted leading-relaxed">
            Each entry records what a named publication has reported and is reviewed on the
            date held with it. See{" "}
            <a
              href="/about#methodology"
              className="font-medium text-teal hover:underline underline-offset-2"
            >
              how we decide what goes in the finder
            </a>
            .
          </p>
          <p className="text-xs text-muted leading-relaxed">
            If you were treated at one of these clinics, your clinic&apos;s counsellor or the{" "}
            <a
              href={HFEA_EMOTIONAL_SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-teal hover:underline underline-offset-2"
            >
              HFEA&apos;s emotional support page
              <ExternalLink className="inline h-3 w-3 ml-1 align-baseline" aria-hidden />
            </a>{" "}
            can help with next steps.
          </p>
        </div>
      )}
    </div>
  );
}
