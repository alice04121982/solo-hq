import type { ClinicData } from "./clinic";
import type { InternationalClinic } from "./international-clinic";
import { COUNTRY_FLAGS, COUNTRY_NAMES } from "./international-clinic";

export interface ComparableClinic {
  id: string;
  name: string;
  location: string;       // e.g. "Cambridge, UK" or "Barcelona, Spain"
  type: "uk" | "abroad";
  flag: string;           // emoji
  soloFriendly: boolean;
  hfea?: boolean;         // UK: hfeaLicensed
  regulatory?: string;   // Abroad: regulatory body name

  price_ivf?: { min?: number; max?: number };
  price_donor_sperm?: { min?: number; max?: number };
  price_donor_egg?: { min?: number; max?: number };

  sr_under35?: number;
  sr_35_37?: number;
  sr_38_39?: number;

  waiting_weeks?: number;      // UK
  travel_visits?: number;      // Abroad
  payment_plans?: boolean;     // UK
  price_includes_meds?: boolean; // Abroad

  website?: string;
}

export function ukClinicToComparable(c: ClinicData): ComparableClinic {
  const parts = c.address.split(",").map((s) => s.trim());
  const city = parts.length >= 2 ? parts[parts.length - 2] : parts[0] ?? "";

  return {
    id: c.id,
    name: c.name,
    location: city ? `${city}, UK` : "UK",
    type: "uk",
    flag: "🇬🇧",
    soloFriendly: c.soloFriendly,
    hfea: c.hfeaLicensed,
    price_ivf:
      c.prices.basicIvf != null
        ? { min: c.prices.basicIvf }
        : c.prices.ivfIcsi != null
          ? { min: c.prices.ivfIcsi }
          : undefined,
    price_donor_sperm:
      c.prices.donorSpermIvf != null ? { min: c.prices.donorSpermIvf } : undefined,
    price_donor_egg:
      c.prices.donorEggIvf != null ? { min: c.prices.donorEggIvf } : undefined,
    sr_under35: c.successRates.under35 ?? undefined,
    sr_35_37: c.successRates.age35to37 ?? undefined,
    sr_38_39: c.successRates.age38to39 ?? undefined,
    waiting_weeks: c.waitingTimeWeeks ?? undefined,
    payment_plans: c.paymentPlans ?? undefined,
    website: c.website ?? undefined,
  };
}

export function intlClinicToComparable(c: InternationalClinic): ComparableClinic {
  const countryName = c.country?.name ?? COUNTRY_NAMES[c.country_code] ?? c.country_code;
  const flag = COUNTRY_FLAGS[c.country_code] ?? "🌍";

  return {
    id: c.slug,
    name: c.name,
    location: `${c.city}, ${countryName}`,
    type: "abroad",
    flag,
    soloFriendly: c.treats_single_women,
    regulatory: c.country?.regulatory_body ?? undefined,
    price_ivf:
      c.price_ivf_cycle_gbp_min != null || c.price_ivf_cycle_gbp_max != null
        ? {
            min: c.price_ivf_cycle_gbp_min ?? undefined,
            max: c.price_ivf_cycle_gbp_max ?? undefined,
          }
        : undefined,
    price_donor_sperm:
      c.price_donor_sperm_iui_gbp_min != null || c.price_donor_sperm_iui_gbp_max != null
        ? {
            min: c.price_donor_sperm_iui_gbp_min ?? undefined,
            max: c.price_donor_sperm_iui_gbp_max ?? undefined,
          }
        : undefined,
    price_donor_egg:
      c.price_donor_egg_ivf_gbp_min != null || c.price_donor_egg_ivf_gbp_max != null
        ? {
            min: c.price_donor_egg_ivf_gbp_min ?? undefined,
            max: c.price_donor_egg_ivf_gbp_max ?? undefined,
          }
        : undefined,
    sr_under35: c.success_rate_ivf_under_35 ?? undefined,
    sr_35_37: c.success_rate_ivf_35_to_37 ?? undefined,
    sr_38_39: c.success_rate_ivf_38_to_39 ?? undefined,
    travel_visits: c.travel_required_visits ?? undefined,
    price_includes_meds: c.price_includes_meds ?? undefined,
    website: c.website ?? undefined,
  };
}
