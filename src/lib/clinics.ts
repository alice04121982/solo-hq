import type { AgeBracket, Clinic, Region } from "@/types/clinic";

/**
 * Cairn's clinic database: one list, UK and international together.
 *
 * Indicative seed data. Figures follow each clinic's published shape (which
 * denominator, which year, which brackets) but should be re-verified against
 * the cited source before anything here is treated as current. The finder
 * shows a standing disclaimer to the same effect.
 *
 * Editorial rules for this file:
 * - UK figures carry verification "hfea" and cite the HFEA register.
 * - Overseas figures carry verification "clinic": self-reported, and clinics
 *   differ in denominator. Record the denominator the clinic actually uses.
 * - A bracket the clinic has not published is simply absent. Never guess a
 *   value, never write 0 for "unknown".
 * - A clinic gets "IUI" in treatments only together with iuiPricePerCycleGbp,
 *   so the budget filter can price the treatment it is offering.
 * - Any price change must update DATA_PROVENANCE.pricesVerifiedOn.
 *   `npm run check:data` enforces these invariants and flags stale data.
 */

const HFEA_SOURCE = {
  sourceUrl: "https://www.hfea.gov.uk/choose-a-clinic/clinic-search/",
  sourceLabel: "HFEA Choose a Clinic register",
} as const;

/**
 * Where the numbers on the finder come from, and when they were last checked.
 * Surfaced in the UI wherever prices render; the freshness check fails once
 * pricesVerifiedOn is older than its staleness window.
 */
export const DATA_PROVENANCE = {
  /** ISO date this file's prices and treatment lists were last re-verified. */
  pricesVerifiedOn: "2026-08-12",
  pricesSourceLabel: "each clinic's published price list",
  /** National benchmarks the figures are sanity-checked against. */
  benchmarks: [
    {
      label: "HFEA — In vitro fertilisation (IVF)",
      url: "https://www.hfea.gov.uk/treatments/explore-all-treatments/in-vitro-fertilisation-ivf/",
      note: "One cycle of IVF costs £5,000 on average, though this varies considerably.",
    },
    {
      label: "HFEA — Intrauterine insemination (IUI)",
      url: "https://www.hfea.gov.uk/treatments/explore-all-treatments/intrauterine-insemination-iui/",
      note: "One cycle of IUI is typically around a quarter of the price of one IVF cycle.",
    },
    {
      label: "NHS — IVF availability and cost",
      url: "https://www.nhs.uk/conditions/ivf/availability/",
      note: "One cycle of private IVF can cost up to £5,000 or more.",
    },
  ],
  successRates: {
    uk: {
      label: "HFEA Choose a Clinic register (independently verified)",
      url: HFEA_SOURCE.sourceUrl,
    },
    overseas: {
      label: "Self-reported by each clinic (not independently verified)",
    },
    /**
     * Latest national dataset to re-verify against: "Fertility treatment
     * 2024: trends and figures", published June 2026, covering treatment
     * year 2024. The per-clinic Choose a Clinic dashboard currently shows
     * 2023 birth-rate data (flagged preliminary by HFEA).
     */
    latestNationalReportUrl:
      "https://www.hfea.gov.uk/about-us/publications/research-and-data/fertility-treatment-2024-trends-and-figures/",
  },
} as const;

export const CLINICS: Clinic[] = [
  // ── UK ──
  {
    slug: "bourn-hall",
    name: "Bourn Hall Clinic",
    city: "Cambridge",
    country: "United Kingdom",
    region: "UK",
    address: "Bourn, Cambridge, CB23 2TN",
    phone: "01954 717 400",
    website: "https://www.bournhall.co.uk",
    hfeaLicensed: true,
    hfeaNumber: "0100",
    treatments: ["IVF", "ICSI", "IUI", "Donor eggs", "Donor sperm", "Egg freezing"],
    pricePerCycleGbp: 4500,
    iuiPricePerCycleGbp: 1150,
    donorAnonymity: "identifiable",
    remoteConsultation: true,
    successRates: {
      verification: "hfea",
      denominator: "per embryo transfer",
      year: 2022,
      ...HFEA_SOURCE,
      sourceUrl: "https://www.hfea.gov.uk/choose-a-clinic/clinic-search/results/100/",
      byBracket: {
        under35: 44,
        age35to37: 36,
        age38to39: 25,
        age40to42: 14,
        age43to44: 5,
      },
    },
  },
  {
    slug: "herts-essex",
    name: "Herts & Essex Fertility Centre",
    city: "Cheshunt",
    country: "United Kingdom",
    region: "UK",
    address: "Bishops' College, Churchgate, Cheshunt, EN8 9XQ",
    phone: "01992 78 50 60",
    website: "https://www.hertsandessexfertility.com",
    hfeaLicensed: true,
    hfeaNumber: "0030",
    treatments: ["IVF", "ICSI", "IUI", "Donor eggs", "Donor sperm", "Egg freezing"],
    pricePerCycleGbp: 3950,
    iuiPricePerCycleGbp: 1000,
    donorAnonymity: "identifiable",
    remoteConsultation: false,
    successRates: {
      verification: "hfea",
      denominator: "per embryo transfer",
      year: 2022,
      ...HFEA_SOURCE,
      sourceUrl: "https://www.hfea.gov.uk/choose-a-clinic/clinic-search/results/30/",
      byBracket: {
        under35: 38,
        age35to37: 30,
        age38to39: 20,
        age40to42: 11,
        age43to44: 3,
      },
    },
  },
  {
    slug: "london-womens-clinic",
    name: "London Women's Clinic",
    city: "London",
    country: "United Kingdom",
    region: "UK",
    address: "113-115 Harley Street, London, W1G 6AP",
    phone: "020 7563 4309",
    website: "https://www.londonwomensclinic.com",
    hfeaLicensed: true,
    hfeaNumber: "0105",
    treatments: ["IVF", "ICSI", "IUI", "Donor eggs", "Donor sperm", "Double donor", "PGT-A", "Egg freezing"],
    pricePerCycleGbp: 4800,
    iuiPricePerCycleGbp: 1350,
    priceListUrl: "https://www.londonwomensclinic.com/about/prices/",
    donorAnonymity: "identifiable",
    remoteConsultation: true,
    successRates: {
      verification: "hfea",
      denominator: "per embryo transfer",
      year: 2022,
      ...HFEA_SOURCE,
      sourceUrl: "https://www.hfea.gov.uk/choose-a-clinic/clinic-search/results/105/",
      byBracket: {
        under35: 45,
        age35to37: 37,
        age38to39: 26,
        age40to42: 15,
        age43to44: 5,
        age45plus: 1,
      },
    },
  },
  {
    slug: "create-fertility",
    name: "Create Fertility",
    city: "London",
    country: "United Kingdom",
    region: "UK",
    address: "150 Cheapside, London, EC2V 6ET",
    phone: "0333 202 0475",
    website: "https://www.createfertility.co.uk",
    hfeaLicensed: true,
    hfeaNumber: "9129",
    treatments: ["IVF", "ICSI", "IUI", "Donor eggs", "Donor sperm", "Egg freezing"],
    pricePerCycleGbp: 3795,
    iuiPricePerCycleGbp: 1050,
    donorAnonymity: "identifiable",
    remoteConsultation: true,
    successRates: {
      verification: "hfea",
      denominator: "per embryo transfer",
      year: 2022,
      ...HFEA_SOURCE,
      sourceUrl: "https://www.hfea.gov.uk/choose-a-clinic/clinic-search/results/9129/",
      byBracket: {
        under35: 36,
        age35to37: 28,
        age38to39: 19,
        age40to42: 10,
        age43to44: 3,
      },
    },
  },
  {
    slug: "lister-fertility",
    name: "Lister Fertility Clinic",
    city: "London",
    country: "United Kingdom",
    region: "UK",
    address: "Chelsea Bridge Road, London, SW1W 8RH",
    phone: "020 7881 9001",
    website: "https://www.listerfertility.co.uk",
    hfeaLicensed: true,
    hfeaNumber: "0006",
    treatments: ["IVF", "ICSI", "IUI", "Donor eggs", "Donor sperm", "PGT-A", "Egg freezing"],
    pricePerCycleGbp: 5200,
    iuiPricePerCycleGbp: 1500,
    donorAnonymity: "identifiable",
    remoteConsultation: true,
    successRates: {
      verification: "hfea",
      denominator: "per embryo transfer",
      year: 2022,
      ...HFEA_SOURCE,
      sourceUrl: "https://www.hfea.gov.uk/choose-a-clinic/clinic-search/results/6/",
      byBracket: {
        under35: 48,
        age35to37: 40,
        age38to39: 28,
        age40to42: 17,
        age43to44: 6,
        age45plus: 2,
      },
    },
  },
  {
    slug: "kings-fertility",
    name: "King's Fertility",
    city: "London",
    country: "United Kingdom",
    region: "UK",
    address: "Denmark Hill, London, SE5 9RS",
    phone: "020 3299 3637",
    website: "https://www.kingsfertility.co.uk",
    hfeaLicensed: true,
    hfeaNumber: "0109",
    treatments: ["IVF", "ICSI", "IUI", "Donor sperm", "Egg freezing"],
    pricePerCycleGbp: 4100,
    iuiPricePerCycleGbp: 1050,
    donorAnonymity: "identifiable",
    remoteConsultation: false,
    successRates: {
      verification: "hfea",
      denominator: "per embryo transfer",
      year: 2022,
      ...HFEA_SOURCE,
      sourceUrl: "https://www.hfea.gov.uk/choose-a-clinic/clinic-search/results/109/",
      byBracket: {
        under35: 39,
        age35to37: 31,
        age38to39: 21,
        age40to42: 11,
        age43to44: 3,
      },
    },
  },
  {
    slug: "addenbrookes",
    name: "Addenbrooke's Assisted Conception Unit",
    city: "Cambridge",
    country: "United Kingdom",
    region: "UK",
    address: "Cambridge University Hospitals, Hills Road, CB2 0QQ",
    phone: "01223 216 859",
    website: "https://www.cuh.nhs.uk/our-services/assisted-conception-unit",
    hfeaLicensed: true,
    hfeaNumber: "0051",
    treatments: ["IVF", "ICSI", "IUI", "Donor sperm"],
    pricePerCycleGbp: 3800,
    iuiPricePerCycleGbp: 950,
    donorAnonymity: "identifiable",
    remoteConsultation: false,
    successRates: {
      verification: "hfea",
      denominator: "per embryo transfer",
      year: 2022,
      ...HFEA_SOURCE,
      sourceUrl: "https://www.hfea.gov.uk/choose-a-clinic/clinic-search/results/51/",
      byBracket: {
        under35: 37,
        age35to37: 29,
        age38to39: 18,
        age40to42: 9,
        age43to44: 2,
      },
    },
  },

  // ── Europe ──
  {
    slug: "ivi-valencia",
    name: "IVI Valencia",
    city: "Valencia",
    country: "Spain",
    region: "Europe",
    website: "https://ivi.uk",
    hfeaLicensed: false,
    treatments: ["IVF", "ICSI", "Donor eggs", "Donor sperm", "Double donor", "PGT-A", "Egg freezing"],
    pricePerCycleGbp: 5600,
    donorAnonymity: "anonymous",
    remoteConsultation: true,
    successRates: {
      verification: "clinic",
      denominator: "per embryo transfer",
      year: 2023,
      sourceUrl: "https://ivi.uk",
      sourceLabel: "IVI published results",
      byBracket: {
        under35: 47,
        age35to37: 42,
        age38to39: 34,
        age40to42: 23,
        age43to44: 11,
      },
    },
  },
  {
    slug: "instituto-bernabeu",
    name: "Instituto Bernabeu",
    city: "Alicante",
    country: "Spain",
    region: "Europe",
    website: "https://www.institutobernabeu.com/en/",
    hfeaLicensed: false,
    treatments: ["IVF", "ICSI", "Donor eggs", "Donor sperm", "Double donor", "PGT-A", "Egg freezing"],
    pricePerCycleGbp: 5300,
    donorAnonymity: "anonymous",
    remoteConsultation: true,
    successRates: {
      verification: "clinic",
      denominator: "per cycle started",
      year: 2023,
      sourceUrl: "https://www.institutobernabeu.com/en/",
      sourceLabel: "Instituto Bernabeu published results",
      byBracket: {
        under35: 41,
        age35to37: 36,
        age38to39: 28,
        age40to42: 18,
      },
    },
  },
  {
    slug: "reprofit-brno",
    name: "Reprofit International",
    city: "Brno",
    country: "Czech Republic",
    region: "Europe",
    website: "https://www.reprofit.eu",
    hfeaLicensed: false,
    treatments: ["IVF", "ICSI", "Donor eggs", "Donor sperm", "Double donor", "Egg freezing"],
    pricePerCycleGbp: 2900,
    donorAnonymity: "anonymous",
    remoteConsultation: true,
    successRates: {
      verification: "clinic",
      denominator: "per embryo transfer",
      year: 2024,
      sourceUrl: "https://www.reprofit.eu",
      sourceLabel: "Reprofit published results",
      byBracket: {
        under35: 44,
        age35to37: 38,
        age38to39: 29,
        age40to42: 17,
      },
    },
  },
  {
    slug: "gennet-prague",
    name: "Gennet",
    city: "Prague",
    country: "Czech Republic",
    region: "Europe",
    website: "https://www.gennet.cz/en/",
    hfeaLicensed: false,
    treatments: ["IVF", "ICSI", "Donor eggs", "Donor sperm", "PGT-A", "Egg freezing"],
    pricePerCycleGbp: 3100,
    donorAnonymity: "anonymous",
    remoteConsultation: true,
    successRates: {
      verification: "clinic",
      denominator: "per cycle started",
      year: 2023,
      sourceUrl: "https://www.gennet.cz/en/",
      sourceLabel: "Gennet published results",
      byBracket: {
        under35: 39,
        age35to37: 33,
        age38to39: 25,
        age40to42: 14,
      },
    },
  },
  {
    slug: "embryolab-thessaloniki",
    name: "Embryolab",
    city: "Thessaloniki",
    country: "Greece",
    region: "Europe",
    website: "https://www.embryolab.eu/en/",
    hfeaLicensed: false,
    treatments: ["IVF", "ICSI", "Donor eggs", "Donor sperm", "Double donor", "Egg freezing"],
    pricePerCycleGbp: 3400,
    donorAnonymity: "anonymous",
    remoteConsultation: true,
    successRates: {
      verification: "clinic",
      denominator: "per embryo transfer",
      year: 2023,
      sourceUrl: "https://www.embryolab.eu/en/",
      sourceLabel: "Embryolab published results",
      byBracket: {
        under35: 42,
        age35to37: 36,
        age38to39: 27,
        age40to42: 15,
        age43to44: 6,
      },
    },
  },
  {
    slug: "copenhagen-fertility-center",
    name: "Copenhagen Fertility Center",
    city: "Copenhagen",
    country: "Denmark",
    region: "Europe",
    website: "https://www.copenhagenfertilitycenter.com",
    hfeaLicensed: false,
    treatments: ["IVF", "ICSI", "IUI", "Donor sperm", "Egg freezing"],
    pricePerCycleGbp: 4300,
    iuiPricePerCycleGbp: 1050,
    donorAnonymity: "both",
    remoteConsultation: true,
    successRates: {
      verification: "clinic",
      denominator: "per cycle started",
      year: 2023,
      sourceUrl: "https://www.copenhagenfertilitycenter.com",
      sourceLabel: "Copenhagen Fertility Center published results",
      byBracket: {
        under35: 38,
        age35to37: 31,
        age38to39: 24,
        age40to42: 12,
      },
    },
  },

  // ── Rest of world ──
  {
    slug: "ccrm-denver",
    name: "CCRM Fertility Denver",
    city: "Denver",
    country: "United States",
    region: "Rest of world",
    website: "https://www.ccrmivf.com",
    hfeaLicensed: false,
    treatments: ["IVF", "ICSI", "Donor eggs", "Donor sperm", "Double donor", "PGT-A", "Egg freezing"],
    pricePerCycleGbp: 14500,
    donorAnonymity: "both",
    remoteConsultation: true,
    successRates: {
      verification: "clinic",
      denominator: "per embryo transfer",
      year: 2023,
      sourceUrl: "https://www.ccrmivf.com",
      sourceLabel: "CCRM published results",
      byBracket: {
        under35: 54,
        age35to37: 48,
        age38to39: 39,
        age40to42: 26,
        age43to44: 10,
      },
    },
  },
  {
    slug: "cape-fertility",
    name: "Cape Fertility",
    city: "Cape Town",
    country: "South Africa",
    region: "Rest of world",
    website: "https://www.capefertility.co.za",
    hfeaLicensed: false,
    treatments: ["IVF", "ICSI", "Donor eggs", "Donor sperm", "Egg freezing"],
    pricePerCycleGbp: 3600,
    donorAnonymity: "anonymous",
    remoteConsultation: true,
    successRates: {
      verification: "clinic",
      denominator: "per embryo transfer",
      year: 2023,
      sourceUrl: "https://www.capefertility.co.za",
      sourceLabel: "Cape Fertility published results",
      byBracket: {
        under35: 43,
        age35to37: 36,
        age38to39: 26,
        age40to42: 14,
      },
    },
  },
  {
    slug: "bahceci-istanbul",
    name: "Bahceci Fertility",
    city: "Istanbul",
    country: "Turkey",
    region: "Rest of world",
    website: "https://bahceci.com/en/",
    hfeaLicensed: false,
    // Donor treatment is not permitted in Turkey, so no donor options here.
    treatments: ["IVF", "ICSI", "PGT-A", "Egg freezing"],
    pricePerCycleGbp: 2700,
    remoteConsultation: true,
    successRates: {
      verification: "clinic",
      denominator: "per cycle started",
      year: 2023,
      sourceUrl: "https://bahceci.com/en/",
      sourceLabel: "Bahceci published results",
      byBracket: {
        under35: 45,
        age35to37: 39,
        age38to39: 30,
        age40to42: 16,
      },
    },
  },
];

export function getClinic(slug: string): Clinic | undefined {
  return CLINICS.find((c) => c.slug === slug);
}

/** The clinic's published live birth rate for a bracket, or undefined if not published. */
export function rateFor(clinic: Clinic, bracket: AgeBracket): number | undefined {
  return clinic.successRates.byBracket[bracket];
}

/**
 * Rank for the default result order: live birth rate for the selected bracket,
 * descending. Clinics with nothing published for the bracket sort to the
 * bottom, alphabetically, and are never given an imputed value.
 */
export function rankBySuccessRate(clinics: Clinic[], bracket: AgeBracket): Clinic[] {
  return [...clinics].sort((a, b) => {
    const ra = rateFor(a, bracket);
    const rb = rateFor(b, bracket);
    if (ra == null && rb == null) return a.name.localeCompare(b.name);
    if (ra == null) return 1;
    if (rb == null) return -1;
    if (rb !== ra) return rb - ra;
    return a.name.localeCompare(b.name);
  });
}

/** Countries present in the database, grouped by region in display order. */
export function countriesByRegion(): { region: Region; countries: string[] }[] {
  const regions: Region[] = ["UK", "Europe", "Rest of world"];
  return regions.map((region) => ({
    region,
    countries: [...new Set(CLINICS.filter((c) => c.region === region).map((c) => c.country))].sort(),
  }));
}

/**
 * The cheapest price a clinic publishes for any treatment it offers. This is
 * what a bare price ceiling compares against, so a low budget surfaces the
 * clinics whose IUI fits it instead of returning nothing.
 */
export function cheapestPublishedPrice(clinic: Clinic): number | undefined {
  const prices = [clinic.pricePerCycleGbp, clinic.iuiPricePerCycleGbp].filter(
    (p): p is number => p != null
  );
  return prices.length > 0 ? Math.min(...prices) : undefined;
}

/** Bounds for the price ceiling slider, from every published cycle price. */
export function priceBounds(): { min: number; max: number } {
  const prices = CLINICS.flatMap((c) => [c.pricePerCycleGbp, c.iuiPricePerCycleGbp]).filter(
    (p): p is number => p != null
  );
  return { min: Math.min(...prices), max: Math.max(...prices) };
}
