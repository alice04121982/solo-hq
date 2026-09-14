import type { Clinic } from "@/types/clinic";

/**
 * The words that sit beside every success rate on the site. Exported from one
 * place so the finder, the detail pages and the matcher say the same thing.
 */

/** Badge on a figure copied from the HFEA's Choose a Clinic page. */
export const BADGE_HFEA = "From the HFEA register";

/** Badge on a figure the clinic (or a registry it reports to) published and nobody here has checked. */
export const BADGE_CLINIC = "Clinic's own figure, not checked";

/** One line under the age filter. */
export const RATE_NOTE = "These are averages across many patients, not a prediction for you.";

/** Shown whenever a list is sorted by rate. */
export const RATE_CAVEAT =
  "These are averages across many patients, not a prediction for you. The HFEA advises using success rates as a rough guide: a difference of one or two percentage points is usually down to chance, and differences between clinics usually reflect the patients they treat.";

/** Group headings when a list is sorted by rate. Never one interleaved list. */
export const GROUP_HFEA = BADGE_HFEA;
export const GROUP_CLINIC = "Clinic's own figures (measures differ)";

/** Price labels. */
export const PRICE_HEADLINE = "Headline price";
export const PRICE_HEADLINE_TRAVEL = "Headline price + travel estimate";
export const PRICE_CLINIC_ESTIMATE = "Clinic's own estimate of a typical total";

/** The line under a rate: what it measures, which year, and who published it. */
export function rateLine(clinic: Clinic): string {
  const { denominator, year, verification } = clinic.successRates;
  return verification === "hfea"
    ? `live births ${denominator}, ${year} (HFEA)`
    : `live births ${denominator}, ${year} (clinic's own figure)`;
}

export const VERDICT_LABELS = {
  above: "Above the national average",
  consistent: "Consistent with the national average",
  below: "Below the national average",
} as const;
