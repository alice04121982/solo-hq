/**
 * Cairn clinic model.
 *
 * One schema for every clinic, UK and international. Location is a filter
 * dimension, never a mode: nothing in this model forces a geography choice
 * before results can exist.
 */

/** HFEA age banding, so UK register data maps onto brackets without translation. */
export type AgeBracket =
  | "under35"
  | "age35to37"
  | "age38to39"
  | "age40to42"
  | "age43to44"
  | "age45plus";

export const AGE_BRACKETS: { value: AgeBracket; label: string }[] = [
  { value: "under35", label: "Under 35" },
  { value: "age35to37", label: "35 to 37" },
  { value: "age38to39", label: "38 to 39" },
  { value: "age40to42", label: "40 to 42" },
  { value: "age43to44", label: "43 to 44" },
  { value: "age45plus", label: "45 and over" },
];

export type Region = "UK" | "Europe" | "Rest of world";

export const REGIONS: Region[] = ["UK", "Europe", "Rest of world"];

export type Treatment =
  | "IVF"
  | "ICSI"
  | "IUI"
  | "Donor eggs"
  | "Donor sperm"
  | "Double donor"
  | "PGT-A"
  | "Egg freezing";

export const TREATMENTS: Treatment[] = [
  "IVF",
  "ICSI",
  "IUI",
  "Donor eggs",
  "Donor sperm",
  "Double donor",
  "PGT-A",
  "Egg freezing",
];

/**
 * What the published percentage was calculated on. Clinics differ, and the
 * difference moves the number materially, so it is displayed wherever the
 * number is.
 */
export type RateDenominator =
  | "per embryo transfer"
  | "per cycle started"
  | "per egg collection";

/**
 * hfea: from the HFEA register, independently verified.
 * clinic: self-reported by the clinic, not independently verified.
 */
export type RateVerification = "hfea" | "clinic";

/**
 * A clinic's published live birth rates, as one report: every figure in it
 * shares a source, a year, a denominator and a verification status.
 *
 * A bracket missing from byBracket means the clinic has published nothing for
 * it. That absence is displayed as "Not published" and sorted to the bottom.
 * It is never imputed, estimated, or rendered as a zero.
 */
export interface SuccessReport {
  verification: RateVerification;
  denominator: RateDenominator;
  /** The year the figures cover. */
  year: number;
  sourceUrl: string;
  sourceLabel: string;
  /** Live birth rate percentages by age bracket. Absent = not published. */
  byBracket: Partial<Record<AgeBracket, number>>;
}

export type DonorAnonymity = "identifiable" | "anonymous" | "both";

export interface Clinic {
  slug: string;
  name: string;
  city: string;
  country: string;
  region: Region;
  address?: string;
  phone?: string;
  website?: string;
  hfeaLicensed: boolean;
  hfeaNumber?: string;
  treatments: Treatment[];
  /**
   * Headline own-egg IVF cycle price in GBP (converted at an indicative rate
   * for overseas clinics). Drives the price ceiling filter; absent means the
   * clinic does not publish a package price, and the clinic is excluded when
   * a ceiling is set.
   */
  pricePerCycleGbp?: number;
  /**
   * Headline IUI cycle price in GBP, excluding drugs and donor sperm. Only
   * present when the clinic offers IUI and publishes a price. This is what
   * makes budget filtering honest at the low end: IUI is typically around a
   * quarter of the price of an IVF cycle (per the HFEA), so a low ceiling
   * should surface IUI options rather than returning nothing.
   */
  iuiPricePerCycleGbp?: number;
  /** The clinic's own published price list, for re-verification. */
  priceListUrl?: string;
  /** Donor recruitment rules that apply at this clinic. */
  donorAnonymity?: DonorAnonymity;
  remoteConsultation: boolean;
  successRates: SuccessReport;
}
