export interface ClinicPackage {
  name: string;
  cycles?: number;
  price_gbp?: number;
  includes_meds?: boolean;
  money_back?: boolean;
  money_back_terms?: string;
  saves_gbp?: number;
  description?: string;
}

export interface ClinicCountry {
  code: string;
  name: string;
  donor_anonymity: "anonymous" | "identifiable" | "mixed";
  regulatory_body: string | null;
  regulatory_url: string | null;
  single_women_eligible: boolean;
  lgbtq_eligible: boolean;
  age_limit_treatment: number | null;
  age_limit_donor_eggs: number | null;
  embryo_transfer_limit: number | null;
  notes: string | null;
  updated_at: string | null;
}

export interface InternationalClinic {
  id: string;
  slug: string;
  name: string;
  country_code: string;
  city: string;
  address: string | null;
  website: string | null;
  phone: string | null;
  email: string | null;
  offers_ivf: boolean;
  offers_iui: boolean;
  offers_icsi: boolean;
  offers_egg_freezing: boolean;
  offers_donor_eggs: boolean;
  offers_donor_sperm: boolean;
  offers_donor_embryo: boolean;
  offers_pgt_a: boolean;
  offers_pgt_m: boolean;
  offers_reciprocal_ivf: boolean;
  treats_single_women: boolean;
  treats_lgbtq: boolean;
  price_ivf_cycle_gbp_min: number | null;
  price_ivf_cycle_gbp_max: number | null;
  price_donor_sperm_iui_gbp_min: number | null;
  price_donor_sperm_iui_gbp_max: number | null;
  price_donor_egg_ivf_gbp_min: number | null;
  price_donor_egg_ivf_gbp_max: number | null;
  price_egg_freezing_gbp_min: number | null;
  price_egg_freezing_gbp_max: number | null;
  price_includes_meds: boolean | null;
  price_notes: string | null;
  success_rate_ivf_under_35: number | null;
  success_rate_ivf_35_to_37: number | null;
  success_rate_ivf_38_to_39: number | null;
  success_rate_ivf_40_to_42: number | null;
  success_rate_ivf_43_plus: number | null;
  success_rate_year: number | null;
  success_rate_metric: string | null;
  success_rate_source_url: string | null;
  english_speaking: boolean;
  remote_initial_consultation: boolean;
  travel_required_visits: number | null;
  shortest_stay_days: number | null;
  packages?: ClinicPackage[] | null;
  data_sources: Record<string, string>;
  last_verified_at: string;
  verification_status: "ai_researched" | "human_verified" | "clinic_confirmed";
  created_at: string;
  updated_at: string;
  // Approximate coordinates (resolved from city lookup, not stored in DB)
  lat?: number | null;
  lng?: number | null;
  // Joined from clinic_countries
  country?: ClinicCountry;
}

export const COUNTRY_FLAGS: Record<string, string> = {
  GB: "🇬🇧",
  ES: "🇪🇸",
  CZ: "🇨🇿",
  GR: "🇬🇷",
  DK: "🇩🇰",
  CY: "🇨🇾",
};

export const COUNTRY_NAMES: Record<string, string> = {
  GB: "United Kingdom",
  ES: "Spain",
  CZ: "Czech Republic",
  GR: "Greece",
  DK: "Denmark",
  CY: "Cyprus",
};

export function formatPriceRange(min: number | null, max: number | null): string {
  if (!min && !max) return "Price on request";
  if (min && max) return `£${min.toLocaleString()} – £${max.toLocaleString()}`;
  if (min) return `From £${min.toLocaleString()}`;
  if (max) return `Up to £${max.toLocaleString()}`;
  return "Price on request";
}

export function formatSuccessRate(rate: number | null): string {
  if (rate === null) return "—";
  return `${rate}%`;
}
