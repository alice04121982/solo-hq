/**
 * Cairn clinic model.
 *
 * One schema for every clinic, UK and international. Location is a filter
 * dimension, never a mode: nothing in this model forces a geography choice
 * before results can exist.
 */

/** Age brackets the finder filters on. Overseas clinics that publish by age use these. */
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

/**
 * The age groups the HFEA's Choose a Clinic page publishes per clinic. UK
 * figures are stored in these bands exactly as the register shows them; the
 * six finder brackets are mapped onto them for display (see rateFor).
 */
export type HfeaBand = "under38" | "age38plus" | "all";

export const HFEA_BANDS: { value: HfeaBand; label: string }[] = [
  { value: "under38", label: "Under 38" },
  { value: "age38plus", label: "38 and over" },
  { value: "all", label: "All ages" },
];

/** The HFEA's verdict on a clinic's figure against the national average. */
export type NationalAverageVerdict = "above" | "consistent" | "below";

/** One HFEA band figure, copied from the register page. */
export interface HfeaBandFigure {
  /** Births per embryo transferred, per cent. */
  rate: number;
  /** The HFEA's range around the rate, per cent. */
  range: { low: number; high: number };
  /** Embryos transferred in the period. */
  count: number;
  /** National average for the band in the same period, per cent. */
  nationalAverage: number;
  vsNationalAverage: NationalAverageVerdict;
}

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
 * number is. "per embryo transferred" is the HFEA's wording.
 */
export type RateDenominator =
  | "per embryo transferred"
  | "per cycle started"
  | "per egg collection"
  | "per intended egg retrieval";

/**
 * hfea: copied from the HFEA's Choose a Clinic page for the clinic.
 * clinic: published by the clinic (or a registry it reports to); not checked by us.
 */
export type RateVerification = "hfea" | "clinic";

/**
 * A clinic's published live birth rates, as one report: every figure in it
 * shares a source, a year, a denominator and a verification status.
 *
 * UK reports carry byHfeaBand (the register's three bands) and leave
 * byBracket empty. Overseas reports carry byBracket where the clinic
 * publishes live births in matching age bands, and publishedBands where its
 * bands differ. An empty report renders "Not published"; nothing is ever
 * imputed, estimated, or rendered as a zero.
 */
export interface SuccessReport {
  verification: RateVerification;
  denominator: RateDenominator;
  /** The year the figures cover. Not displayed when the report is empty. */
  year: number;
  sourceUrl: string;
  sourceLabel: string;
  /** Live birth rate percentages by finder bracket. Absent = not published. */
  byBracket: Partial<Record<AgeBracket, number>>;
  /** UK only: the register's figures per HFEA band. */
  byHfeaBand?: Partial<Record<HfeaBand, HfeaBandFigure>>;
  /** UK only: the register's all-ages verdict against the national average. */
  vsNationalAverage?: NationalAverageVerdict;
  /** Overseas: bands exactly as the clinic publishes them, where they do not match AgeBracket. */
  publishedBands?: { label: string; rate: number }[];
  /** ISO date the source page was last read. */
  checkedOn?: string;
}

export type DonorAnonymity = "identifiable" | "anonymous" | "both";

export type LocalCurrency = "GBP" | "EUR" | "USD" | "DKK" | "ZAR";

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
  /** UK only: the licence expiry date shown on the HFEA register page (ISO). */
  licenceExpiry?: string;
  treatments: Treatment[];
  /**
   * Headline own-egg IVF cycle price in GBP (converted at the rate in
   * DATA_PROVENANCE.fxNote for overseas clinics). Drives the price ceiling
   * filter; absent means the clinic does not publish a package price, and the
   * clinic is excluded when a ceiling is set.
   */
  pricePerCycleGbp?: number;
  /**
   * Headline IUI cycle price in GBP, excluding drugs and donor sperm. Only
   * present when the clinic offers IUI and publishes a price, so a low ceiling
   * surfaces IUI options rather than returning nothing.
   */
  iuiPricePerCycleGbp?: number;
  /** The published figure in the clinic's own currency, before conversion. */
  localPrice?: { amount: number; currency: LocalCurrency; note?: string };
  /** The clinic's own published price list, for re-verification. */
  priceListUrl?: string;
  /** What the clinic says the headline price does and does not include. */
  priceIncludes?: string;
  /** The clinic's own published estimate of a typical total for one cycle. */
  publishedAllInEstimateGbp?: { low: number; high: number; sourceUrl: string };
  /** ISO date the price, address and treatment list were last checked. */
  checkedOn?: string;
  /** Donor recruitment rules that apply at this clinic. Absent = not confirmed or no donor treatment. */
  donorAnonymity?: DonorAnonymity;
  /** Shown in place of a donor label when donorAnonymity is absent for a clinic that offers donor treatment. */
  donorAnonymityNote?: string;
  /** ISO date the donor law behind donorAnonymity was last checked. */
  donorLawCheckedOn?: string;
  remoteConsultation: boolean;
  successRates: SuccessReport;
  /**
   * Where the clinic is, for the finder's distance sort and "within" filter.
   * Read from the street address where one is recorded, otherwise the
   * clinic's own published location, to roughly a kilometre; enough to order
   * clinics by distance, never a substitute for the address on their site.
   */
  coordinates: GeoPoint;
}

/** A point on the earth, decimal degrees. */
export interface GeoPoint {
  lat: number;
  lng: number;
}
