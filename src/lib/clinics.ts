// Relative, extensioned imports: scripts/check-data.ts runs this file under
// Node's type stripping, which cannot resolve the "@/" alias for runtime values.
import {
  AGE_BRACKETS,
  HFEA_BANDS,
  type AgeBracket,
  type Clinic,
  type HfeaBand,
  type Region,
} from "../types/clinic.ts";
import { excludedCountriesByRegion, exclusionFor } from "./clinic-exclusions.ts";

/**
 * Cairn's clinic database: one list, UK and international together.
 *
 * Every figure here was read from the cited page on the clinic's checkedOn
 * date. Where a page could not be read, or published nothing usable, the
 * field is absent and the finder renders "Not published".
 *
 * Editorial rules for this file:
 * - UK success rates carry verification "hfea", cite the clinic's own Choose
 *   a Clinic page, and hold the register's three bands (under 38, 38 and
 *   over, all ages) in byHfeaBand. byBracket stays empty for UK clinics.
 * - Overseas success rates carry verification "clinic". byBracket holds live
 *   birth figures only where the clinic publishes them in matching age
 *   bands; publishedBands holds the clinic's own bands where they differ.
 *   Pregnancy rates and cumulative rates are never entered as live births.
 * - The results link goes to the page the figures were read from. Where no
 *   results page exists, sourceLabel is NO_RESULTS_PAGE_LABEL and the detail
 *   page shows no link.
 * - A clinic gets "IUI" in treatments only together with iuiPricePerCycleGbp,
 *   so the budget filter can price the treatment it is offering.
 * - Overseas prices record the local figure in localPrice and convert at the
 *   rate in DATA_PROVENANCE.fxNote.
 * - A clinic covered by `src/lib/clinic-exclusions.ts` does not belong in
 *   this file at all. `CLINIC_RECORDS` is filtered through that policy on the
 *   way to `CLINICS` so an excluded clinic can never reach a page, and
 *   `npm run check:data` fails if one is added here anyway.
 *
 * `npm run check:data` enforces these invariants and flags stale data.
 */

const HFEA_SOURCE_LABEL = "HFEA Choose a Clinic page for this clinic";

/** sourceLabel for an overseas clinic with no results page. The detail page renders it without a link. */
export const NO_RESULTS_PAGE_LABEL = "No published results page found";

const CHECKED = "2026-09-13";

/**
 * Where the numbers on the finder come from, and when they were last checked.
 * Surfaced in the UI wherever prices render; the freshness check fails once
 * pricesVerifiedOn is older than its staleness window.
 */
export const DATA_PROVENANCE = {
  /** The earliest per-clinic checkedOn in the file, never later than any clinic's own date. */
  pricesVerifiedOn: "2026-09-13",
  pricesSourceLabel: "each clinic's published price list",
  /**
   * Overseas prices are converted at European Central Bank reference rates of
   * 11 September 2026: EUR 1 = GBP 0.858, USD 1 = GBP 0.740, DKK 1 = GBP 0.115,
   * ZAR 1 = GBP 0.0458. The local figure is kept on each record.
   */
  fxNote: "Converted at ECB reference rates of 11 September 2026 (EUR 0.858, USD 0.740, DKK 0.115, ZAR 0.0458 to the pound), rounded to the nearest £5.",
  fxRatesUrl:
    "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html",
  /** National benchmarks the figures are sanity-checked against. */
  benchmarks: [
    {
      label: "HFEA: In vitro fertilisation (IVF)",
      url: "https://www.hfea.gov.uk/treatments/explore-all-treatments/in-vitro-fertilisation-ivf/",
      note: "One cycle of IVF costs £5,000 on average, though this varies considerably.",
    },
    {
      label: "HFEA: Intrauterine insemination (IUI)",
      url: "https://www.hfea.gov.uk/treatments/explore-all-treatments/intrauterine-insemination-iui/",
      note: "One cycle of IUI is typically around a quarter of the price of one IVF cycle.",
    },
  ],
  successRates: {
    uk: {
      label: "HFEA Choose a Clinic register",
      url: "https://www.hfea.gov.uk/choose-a-clinic/clinic-search/",
      /** What the register shows today, and how we describe it. */
      description:
        "From the HFEA's Choose a Clinic page for this clinic, which currently shows 2023 births per embryo transferred for two age groups: under 38, and 38 and over. The HFEA marks some recent years' birth data as preliminary.",
    },
    overseas: {
      label: "Published by each clinic; not checked by us",
    },
    /**
     * Latest national dataset: "Fertility treatment 2024: trends and
     * figures", published June 2026, covering treatment year 2024. It says
     * birth rates for 2020-21 and 2024 are preliminary and not validated.
     */
    latestNationalReportUrl:
      "https://www.hfea.gov.uk/about-us/publications/research-and-data/fertility-treatment-2024-trends-and-figures/",
  },
} as const;

/**
 * Every clinic record in the file, excluded ones included. Nothing renders
 * from this: it exists so `npm run check:data` can see what was written here
 * before the exclusion policy is applied. Pages import `CLINICS`.
 */
export const CLINIC_RECORDS: Clinic[] = [
  // ── UK ──
  {
    slug: "bourn-hall",
    name: "Bourn Hall Clinic",
    city: "Cambridge",
    country: "United Kingdom",
    region: "UK",
    address: "Bourn, Cambridge, CB23 2TN",
    phone: "01954 719 111",
    website: "https://www.bournhall.co.uk",
    hfeaLicensed: true,
    hfeaNumber: "0100",
    licenceExpiry: "2027-03-31",
    treatments: ["IVF", "ICSI", "IUI", "Donor eggs", "Donor sperm", "Egg freezing"],
    pricePerCycleGbp: 4495,
    iuiPricePerCycleGbp: 1150,
    priceListUrl: "https://www.bournhall.co.uk/fees-funding/our-prices/",
    priceIncludes:
      "Monitoring, scans, IV sedation, egg collection, embryo transfer, counselling and the HFEA fee included; medication charged separately.",
    checkedOn: CHECKED,
    donorAnonymity: "identifiable",
    donorLawCheckedOn: CHECKED,
    remoteConsultation: true,
    successRates: {
      verification: "hfea",
      denominator: "per embryo transferred",
      year: 2023,
      sourceUrl: "https://www.hfea.gov.uk/choose-a-clinic/clinic-search/results/100/",
      sourceLabel: HFEA_SOURCE_LABEL,
      byBracket: {},
      byHfeaBand: {
        under38: { rate: 29, range: { low: 25, high: 34 }, count: 905, nationalAverage: 34, vsNationalAverage: "consistent" },
        age38plus: { rate: 14, range: { low: 9, high: 20 }, count: 345, nationalAverage: 16, vsNationalAverage: "consistent" },
        all: { rate: 25, range: { low: 21, high: 29 }, count: 1260, nationalAverage: 28, vsNationalAverage: "consistent" },
      },
      vsNationalAverage: "consistent",
      checkedOn: CHECKED,
    },
  },
  {
    slug: "herts-essex",
    name: "Herts & Essex Fertility Centre",
    city: "Cheshunt",
    country: "United Kingdom",
    region: "UK",
    address: "Bishop's College, Churchgate, Cheshunt, EN8 9XP",
    phone: "01992 785 060",
    website: "https://www.hertsandessexfertility.com",
    hfeaLicensed: true,
    hfeaNumber: "0030",
    licenceExpiry: "2026-11-25",
    treatments: ["IVF", "ICSI", "IUI", "Donor eggs", "Donor sperm", "Egg freezing"],
    pricePerCycleGbp: 3995,
    iuiPricePerCycleGbp: 1250,
    priceListUrl: "https://hertsandessexfertility.com/price-list/",
    priceIncludes:
      "Monitoring, scans, sedation, egg collection, fresh embryo transfer and counselling included; medication, blastocyst culture (£725) and the HFEA fee (£115) charged separately.",
    checkedOn: CHECKED,
    donorAnonymity: "identifiable",
    donorLawCheckedOn: CHECKED,
    remoteConsultation: false,
    successRates: {
      verification: "hfea",
      denominator: "per embryo transferred",
      year: 2023,
      sourceUrl: "https://www.hfea.gov.uk/choose-a-clinic/clinic-search/results/30/",
      sourceLabel: HFEA_SOURCE_LABEL,
      byBracket: {},
      byHfeaBand: {
        under38: { rate: 36, range: { low: 29, high: 44 }, count: 382, nationalAverage: 34, vsNationalAverage: "consistent" },
        age38plus: { rate: 20, range: { low: 13, high: 30 }, count: 226, nationalAverage: 16, vsNationalAverage: "consistent" },
        all: { rate: 30, range: { low: 25, high: 36 }, count: 612, nationalAverage: 28, vsNationalAverage: "consistent" },
      },
      vsNationalAverage: "consistent",
      checkedOn: CHECKED,
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
    licenceExpiry: "2030-03-28",
    treatments: ["IVF", "ICSI", "IUI", "Donor eggs", "Donor sperm", "Double donor", "PGT-A", "Egg freezing"],
    pricePerCycleGbp: 3995,
    iuiPricePerCycleGbp: 1050,
    priceListUrl: "https://www.londonwomensclinic.com/about/prices/",
    priceIncludes:
      "Monitoring scans, egg collection, preparation of eggs and sperm, one fresh embryo transfer and a pregnancy blood test included; medication, sedation, monitoring bloods and the HFEA fee charged separately.",
    publishedAllInEstimateGbp: {
      low: 9140,
      high: 10640,
      sourceUrl: "https://www.londonwomensclinic.com/about/prices/",
    },
    checkedOn: CHECKED,
    donorAnonymity: "identifiable",
    donorLawCheckedOn: CHECKED,
    remoteConsultation: true,
    successRates: {
      verification: "hfea",
      denominator: "per embryo transferred",
      year: 2023,
      sourceUrl: "https://www.hfea.gov.uk/choose-a-clinic/clinic-search/results/105/",
      sourceLabel: HFEA_SOURCE_LABEL,
      byBracket: {},
      byHfeaBand: {
        under38: { rate: 37, range: { low: 33, high: 41 }, count: 1298, nationalAverage: 34, vsNationalAverage: "consistent" },
        age38plus: { rate: 17, range: { low: 13, high: 22 }, count: 585, nationalAverage: 16, vsNationalAverage: "consistent" },
        all: { rate: 31, range: { low: 28, high: 34 }, count: 1906, nationalAverage: 28, vsNationalAverage: "consistent" },
      },
      vsNationalAverage: "consistent",
      checkedOn: CHECKED,
    },
  },
  {
    slug: "create-fertility",
    name: "CREATE Fertility, London St Paul's",
    city: "London",
    country: "United Kingdom",
    region: "UK",
    address: "150 Cheapside, London, EC2V 6ET",
    phone: "020 3319 9490",
    website: "https://www.createfertility.co.uk",
    hfeaLicensed: true,
    hfeaNumber: "9129",
    licenceExpiry: "2028-07-22",
    treatments: ["IVF", "ICSI", "IUI", "Donor eggs", "Donor sperm", "Egg freezing"],
    pricePerCycleGbp: 3795,
    iuiPricePerCycleGbp: 1250,
    priceListUrl: "https://www.createfertility.co.uk/costs",
    priceIncludes:
      "Egg collection, fertilisation, embryo culture and a single fresh transfer included; medication, ICSI, freezing and storage charged separately. IUI price from the clinic's IUI page.",
    checkedOn: CHECKED,
    donorAnonymity: "identifiable",
    donorLawCheckedOn: CHECKED,
    remoteConsultation: true,
    successRates: {
      verification: "hfea",
      denominator: "per embryo transferred",
      year: 2023,
      sourceUrl: "https://www.hfea.gov.uk/choose-a-clinic/clinic-search/results/9129/",
      sourceLabel: HFEA_SOURCE_LABEL,
      byBracket: {},
      byHfeaBand: {
        under38: { rate: 33, range: { low: 29, high: 37 }, count: 1166, nationalAverage: 34, vsNationalAverage: "consistent" },
        age38plus: { rate: 15, range: { low: 11, high: 21 }, count: 445, nationalAverage: 16, vsNationalAverage: "consistent" },
        all: { rate: 28, range: { low: 24, high: 31 }, count: 1611, nationalAverage: 28, vsNationalAverage: "consistent" },
      },
      vsNationalAverage: "consistent",
      checkedOn: CHECKED,
    },
  },
  {
    slug: "lister-fertility",
    name: "The Lister Fertility Clinic",
    city: "London",
    country: "United Kingdom",
    region: "UK",
    address: "The Lister Hospital, Chelsea Bridge Road, London, SW1W 8RH",
    phone: "020 7730 5932",
    website: "https://www.listerfertility.co.uk",
    hfeaLicensed: true,
    hfeaNumber: "0006",
    licenceExpiry: "2027-02-28",
    treatments: ["IVF", "ICSI", "IUI", "Donor eggs", "Donor sperm", "PGT-A", "Egg freezing"],
    pricePerCycleGbp: 4510,
    iuiPricePerCycleGbp: 1305,
    priceListUrl:
      "https://hcil-p-001.sitecorecontenthub.cloud/api/public/content/cb20b29071134cab9f0eecd830d3ff84?v=c8a302b8",
    priceIncludes:
      "Cycle fee includes the HFEA fee, nurse consultation and counselling; medication charged separately. Price list valid from 1 February 2026.",
    checkedOn: CHECKED,
    donorAnonymity: "identifiable",
    donorLawCheckedOn: CHECKED,
    remoteConsultation: true,
    successRates: {
      verification: "hfea",
      denominator: "per embryo transferred",
      year: 2023,
      sourceUrl: "https://www.hfea.gov.uk/choose-a-clinic/clinic-search/results/6/",
      sourceLabel: HFEA_SOURCE_LABEL,
      byBracket: {},
      byHfeaBand: {
        under38: { rate: 39, range: { low: 34, high: 45 }, count: 692, nationalAverage: 34, vsNationalAverage: "above" },
        age38plus: { rate: 14, range: { low: 10, high: 20 }, count: 539, nationalAverage: 16, vsNationalAverage: "consistent" },
        all: { rate: 28, range: { low: 25, high: 33 }, count: 1232, nationalAverage: 28, vsNationalAverage: "consistent" },
      },
      vsNationalAverage: "consistent",
      checkedOn: CHECKED,
    },
  },
  {
    slug: "kings-fertility",
    name: "King's Fertility",
    city: "London",
    country: "United Kingdom",
    region: "UK",
    address: "Fetal Medicine Research Institute, 16-20 Windsor Walk, Denmark Hill, London, SE5 8BB",
    phone: "020 3957 7950",
    website: "https://www.kingsfertility.co.uk",
    hfeaLicensed: true,
    hfeaNumber: "0109",
    licenceExpiry: "2026-09-30",
    treatments: ["IVF", "ICSI", "IUI", "Donor sperm", "Egg freezing"],
    pricePerCycleGbp: 4090,
    iuiPricePerCycleGbp: 880,
    priceListUrl: "https://www.kingsfertility.co.uk/wp-content/uploads/2026/05/KF-Price-List-Revamp-20.05.26.pdf",
    priceIncludes:
      "Cycle set-up, monitoring scans and bloods, egg collection, embryo transfer and an early pregnancy scan included; ICSI (£1,250), embryo freezing, storage and medication charged separately. Price list valid from 1 April 2026.",
    checkedOn: CHECKED,
    donorAnonymity: "identifiable",
    donorLawCheckedOn: CHECKED,
    remoteConsultation: false,
    successRates: {
      verification: "hfea",
      denominator: "per embryo transferred",
      year: 2023,
      sourceUrl: "https://www.hfea.gov.uk/choose-a-clinic/clinic-search/results/109/",
      sourceLabel: HFEA_SOURCE_LABEL,
      byBracket: {},
      byHfeaBand: {
        under38: { rate: 39, range: { low: 35, high: 43 }, count: 1290, nationalAverage: 34, vsNationalAverage: "above" },
        age38plus: { rate: 19, range: { low: 15, high: 24 }, count: 665, nationalAverage: 16, vsNationalAverage: "consistent" },
        all: { rate: 32, range: { low: 29, high: 36 }, count: 1961, nationalAverage: 28, vsNationalAverage: "above" },
      },
      vsNationalAverage: "above",
      checkedOn: CHECKED,
    },
  },
  {
    slug: "cambridge-ivf",
    name: "Cambridge IVF",
    city: "Cambridge",
    country: "United Kingdom",
    region: "UK",
    address: "Kefford House, Maris Lane, Trumpington, Cambridge, CB2 9LG",
    phone: "01223 349 010",
    website: "https://www.cambridge-ivf.nhs.uk",
    hfeaLicensed: true,
    hfeaNumber: "0051",
    licenceExpiry: "2026-09-30",
    treatments: ["IVF", "ICSI", "IUI", "Donor sperm"],
    pricePerCycleGbp: 5240,
    iuiPricePerCycleGbp: 998,
    priceListUrl: "https://www.cambridge-ivf.nhs.uk/prices/",
    priceIncludes:
      "The Pure package includes medication up to the pregnancy test (one drug excepted), sedation, scans, the HFEA fee, blastocyst culture and two counselling sessions. A first-cycle package is published at £2,900.",
    checkedOn: CHECKED,
    donorAnonymity: "identifiable",
    donorLawCheckedOn: CHECKED,
    remoteConsultation: false,
    successRates: {
      verification: "hfea",
      denominator: "per embryo transferred",
      year: 2023,
      sourceUrl: "https://www.hfea.gov.uk/choose-a-clinic/clinic-search/results/51/",
      sourceLabel: HFEA_SOURCE_LABEL,
      byBracket: {},
      byHfeaBand: {
        under38: { rate: 32, range: { low: 25, high: 40 }, count: 367, nationalAverage: 34, vsNationalAverage: "consistent" },
        age38plus: { rate: 14, range: { low: 9, high: 22 }, count: 276, nationalAverage: 16, vsNationalAverage: "consistent" },
        all: { rate: 24, range: { low: 20, high: 30 }, count: 648, nationalAverage: 28, vsNationalAverage: "consistent" },
      },
      vsNationalAverage: "consistent",
      checkedOn: CHECKED,
    },
  },

  // ── Europe ──
  {
    slug: "ivi-valencia",
    name: "IVI Valencia",
    city: "Valencia",
    country: "Spain",
    region: "Europe",
    website: "https://ivi-fertility.com/clinics/valencia/",
    hfeaLicensed: false,
    treatments: ["IVF", "ICSI", "Donor eggs", "Donor sperm", "Double donor", "PGT-A", "Egg freezing"],
    pricePerCycleGbp: 4590,
    localPrice: { amount: 5350, currency: "EUR", note: "IVI Spain 'from' price" },
    priceListUrl: "https://ivi-fertility.com/ivf-invitro-price/",
    priceIncludes:
      "Egg collection, laboratory work, ICSI and embryo transfer included; diagnostic tests and complementary techniques charged separately.",
    checkedOn: CHECKED,
    donorAnonymity: "anonymous",
    donorLawCheckedOn: "2026-08-12",
    remoteConsultation: true,
    successRates: {
      verification: "clinic",
      denominator: "per cycle started",
      year: 2024,
      sourceUrl: "https://ivi-fertility.com/faqs/success-rates/",
      sourceLabel:
        "IVI group results page: cumulative pregnancy rates per cycle for 2024, not live births by age, so no figure is shown",
      byBracket: {},
      checkedOn: CHECKED,
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
    // No price list found on the clinic's site (2026-09-13); its IVF page gives only a Spain-wide range.
    checkedOn: CHECKED,
    donorAnonymity: "anonymous",
    donorLawCheckedOn: "2026-08-12",
    remoteConsultation: true,
    successRates: {
      verification: "clinic",
      denominator: "per embryo transferred",
      year: 2024,
      sourceUrl: "https://www.institutobernabeu.com/en/statistics/",
      sourceLabel:
        "Instituto Bernabeu statistics page: positive pregnancy test rates for 2024, not live births, so no figure is shown",
      byBracket: {},
      checkedOn: CHECKED,
    },
  },
  {
    slug: "reprofit-brno",
    name: "Reprofit International",
    city: "Brno",
    country: "Czech Republic",
    region: "Europe",
    website: "https://www.reprofit.cz/en/",
    hfeaLicensed: false,
    treatments: ["IVF", "ICSI", "Donor eggs", "Donor sperm", "Double donor", "Egg freezing"],
    pricePerCycleGbp: 2785,
    localPrice: { amount: 3245, currency: "EUR" },
    priceListUrl:
      "https://www.reprofit.cz/media/filer_public/b2/ec/b2ecc36d-426d-40e9-8b2a-4ed81925eeac/reprofit_-_cenik_ivf_eng.pdf",
    priceIncludes:
      "Consultation, monitoring, egg collection, ICSI, extended culture and a fresh transfer included; STD tests, general anaesthetic, time-lapse and freezing charged separately. Price list valid from 1 January 2026.",
    checkedOn: CHECKED,
    donorAnonymity: "anonymous",
    donorLawCheckedOn: "2026-08-12",
    remoteConsultation: true,
    successRates: {
      verification: "clinic",
      denominator: "per embryo transferred",
      year: 2024,
      sourceUrl: "https://www.reprofit.cz/en/treatment-success-rate/",
      sourceLabel:
        "Reprofit results page: one overall figure with no year, age bands or measure stated, so no figure is shown",
      byBracket: {},
      checkedOn: CHECKED,
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
    pricePerCycleGbp: 2740,
    localPrice: { amount: 3190, currency: "EUR" },
    priceListUrl:
      "https://www.gennet.cz/media/filer_public/c9/50/c95076b4-4317-47d7-a9e4-4f114253813d/assisted-reproduction-price-list-self-paying-patients.pdf",
    priceIncludes:
      "Consultation, monitoring, egg collection, fertilisation and transfer included, paid in three stages; medication charged separately. Price list dated 1 September 2026.",
    checkedOn: CHECKED,
    donorAnonymity: "anonymous",
    donorLawCheckedOn: "2026-08-12",
    remoteConsultation: true,
    successRates: {
      verification: "clinic",
      denominator: "per cycle started",
      year: 2023,
      sourceUrl: "https://www.gennet.cz/en/",
      sourceLabel: NO_RESULTS_PAGE_LABEL,
      byBracket: {},
      checkedOn: CHECKED,
    },
  },
  {
    slug: "embryolab-thessaloniki",
    name: "Embryolab",
    city: "Thessaloniki",
    country: "Greece",
    region: "Europe",
    website: "https://embryolab.eu/",
    hfeaLicensed: false,
    treatments: ["IVF", "ICSI", "Donor eggs", "Donor sperm", "Double donor", "Egg freezing"],
    // The clinic's FAQ says to ask for prices; nothing is published (2026-09-13).
    checkedOn: CHECKED,
    // Greek known-donor rules changed in 2022 and again in 2024 and 2026. The
    // National Authority's 2026 guidance could not be read, so nothing is claimed.
    donorAnonymityNote: "Not confirmed; ask the clinic",
    donorLawCheckedOn: CHECKED,
    remoteConsultation: true,
    successRates: {
      verification: "clinic",
      denominator: "per embryo transferred",
      year: 2023,
      sourceUrl: "https://embryolab.eu/",
      sourceLabel: NO_RESULTS_PAGE_LABEL,
      byBracket: {},
      checkedOn: CHECKED,
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
    pricePerCycleGbp: 2870,
    iuiPricePerCycleGbp: 515,
    localPrice: { amount: 25000, currency: "DKK", note: "IUI DKK 4,500 for patients without a Danish referral" },
    priceListUrl: "https://www.copenhagenfertilitycenter.com/priser.htm",
    priceIncludes:
      "Consultations, pregnancy test and a week-7 scan included; medication and ICSI (DKK 4,500) charged separately. Price list dated 1 September 2022.",
    checkedOn: CHECKED,
    donorAnonymity: "both",
    donorLawCheckedOn: "2026-08-12",
    remoteConsultation: true,
    successRates: {
      verification: "clinic",
      denominator: "per cycle started",
      year: 2023,
      sourceUrl: "https://www.copenhagenfertilitycenter.com/behandlingen/resultater.htm",
      sourceLabel:
        "Copenhagen Fertility Center results page: pregnancy per cycle for 2023 to 2024 in the clinic's own age bands, not live births, so no figure is shown",
      byBracket: {},
      checkedOn: CHECKED,
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
    pricePerCycleGbp: 9370,
    localPrice: { amount: 12660, currency: "USD", note: "Low end of the clinic's quoted $12,660 to $30,780" },
    priceListUrl: "https://www.ccrmivf.com/location/us/colorado/treatment-costs/",
    priceIncludes:
      "The clinic quotes $12,660 to $30,780 a cycle depending on cycle type; medication and pre-cycle diagnostic testing (about $4,165) charged separately.",
    checkedOn: CHECKED,
    donorAnonymity: "both",
    donorLawCheckedOn: "2026-08-12",
    remoteConsultation: true,
    successRates: {
      verification: "clinic",
      denominator: "per intended egg retrieval",
      year: 2023,
      sourceUrl: "https://www.sartcorsonline.com/rptcsr_publicmultyear.aspx?clinicpkid=1902",
      sourceLabel: "SART clinic summary report, 2023 final: live births per intended egg retrieval, all transfers",
      byBracket: {
        under35: 54,
        age35to37: 42,
      },
      publishedBands: [
        { label: "Under 35", rate: 53.6 },
        { label: "35 to 37", rate: 42.2 },
        { label: "38 to 40", rate: 31.1 },
        { label: "41 to 42", rate: 14.8 },
        { label: "Over 42", rate: 1.6 },
      ],
      checkedOn: CHECKED,
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
    pricePerCycleGbp: 2980,
    localPrice: { amount: 65000, currency: "ZAR", note: "Low end of the clinic's quoted R65,000 to R75,000" },
    priceListUrl: "https://capefertility.co.za/ivf-and-icsi-costs-in-south-africa/",
    priceIncludes:
      "The clinic quotes R65,000 to R75,000 a cycle with ICSI included; medication charged separately. The page is undated.",
    checkedOn: CHECKED,
    donorAnonymity: "anonymous",
    donorLawCheckedOn: "2026-08-12",
    remoteConsultation: true,
    successRates: {
      verification: "clinic",
      denominator: "per embryo transferred",
      year: 2023,
      sourceUrl: "https://capefertility.co.za/about-us/our-success-rates/",
      sourceLabel: "Cape Fertility success-rates page: a chart image with no readable figures, so no figure is shown",
      byBracket: {},
      checkedOn: CHECKED,
    },
  },
  {
    slug: "bahceci-istanbul",
    name: "Bahceci Fertility",
    city: "Istanbul",
    country: "Turkey",
    region: "Rest of world",
    website: "https://bahceci.com/uk/",
    hfeaLicensed: false,
    // Donor treatment is not permitted in Turkey, so no donor options here.
    treatments: ["IVF", "ICSI", "PGT-A", "Egg freezing"],
    pricePerCycleGbp: 3450,
    localPrice: { amount: 3450, currency: "GBP", note: "Basic package, priced in pounds by the clinic" },
    priceListUrl: "https://bahceci.com/uk/price/",
    priceIncludes:
      "Consultation, stimulation, egg collection, ICSI, embryoscope and transfer included; pre-IVF tests and medication charged separately.",
    checkedOn: CHECKED,
    remoteConsultation: true,
    successRates: {
      verification: "clinic",
      denominator: "per cycle started",
      year: 2023,
      sourceUrl: "https://bahceci.com/uk/success-rates/",
      sourceLabel: "Bahceci success-rates page: no figures published, so no figure is shown",
      byBracket: {},
      checkedOn: CHECKED,
    },
  },
];

/**
 * The clinic database as every page sees it: the records above, minus any
 * clinic Cairn has decided not to list (see `src/lib/clinic-exclusions.ts`).
 *
 * The filter is the guarantee, not the process. An excluded clinic is meant
 * to be absent from `CLINIC_RECORDS` in the first place, and the data check
 * fails if one is present: this is what keeps it off the site in the window
 * between the mistake and the check.
 */
export const CLINICS: Clinic[] = CLINIC_RECORDS.filter((c) => exclusionFor(c) === undefined);

export function getClinic(slug: string): Clinic | undefined {
  return CLINICS.find((c) => c.slug === slug);
}

/** The HFEA band a finder bracket falls in. */
export function hfeaBandFor(bracket: AgeBracket): HfeaBand {
  return bracket === "under35" || bracket === "age35to37" ? "under38" : "age38plus";
}

/**
 * The clinic's published live birth rate for a bracket, or undefined if not
 * published. UK reports answer from the HFEA band the bracket falls in;
 * overseas reports answer from byBracket.
 */
export function rateFor(clinic: Clinic, bracket: AgeBracket): number | undefined {
  const report = clinic.successRates;
  if (report.byHfeaBand) return report.byHfeaBand[hfeaBandFor(bracket)]?.rate;
  return report.byBracket[bracket];
}

/** The age group a displayed rate covers: the HFEA band for UK clinics, the finder bracket otherwise. */
export function rateBandLabel(clinic: Clinic, bracket: AgeBracket): string {
  if (clinic.successRates.byHfeaBand) {
    const band = hfeaBandFor(bracket);
    return HFEA_BANDS.find((b) => b.value === band)?.label.toLowerCase() ?? band;
  }
  return AGE_BRACKETS.find((b) => b.value === bracket)?.label.toLowerCase() ?? bracket;
}

/** The register's verdict for the band a bracket falls in (UK clinics only). */
export function verdictFor(clinic: Clinic, bracket: AgeBracket) {
  return clinic.successRates.byHfeaBand?.[hfeaBandFor(bracket)]?.vsNationalAverage;
}

export type FinderSort = "name" | "price" | "rate";

export const FINDER_SORTS: { value: FinderSort; label: string }[] = [
  { value: "name", label: "Name (A to Z)" },
  { value: "price", label: "Headline price" },
  { value: "rate", label: "Published rate" },
];

/**
 * Order a list of clinics. Name is the default. Price sorts by headline IVF
 * price, lowest first, clinics without one last. Rate sorts by the published
 * figure for the bracket, highest first, clinics without one last. Ties fall
 * back to name. Callers sorting by rate must split HFEA and clinic figures
 * into separate groups before calling; see groupByVerification.
 */
export function sortClinics(clinics: Clinic[], sort: FinderSort, bracket: AgeBracket): Clinic[] {
  const byName = (a: Clinic, b: Clinic) => a.name.localeCompare(b.name);
  if (sort === "name") return [...clinics].sort(byName);
  const key =
    sort === "price"
      ? (c: Clinic) => c.pricePerCycleGbp
      : (c: Clinic) => rateFor(c, bracket);
  const direction = sort === "price" ? 1 : -1;
  return [...clinics].sort((a, b) => {
    const ka = key(a);
    const kb = key(b);
    if (ka == null && kb == null) return byName(a, b);
    if (ka == null) return 1;
    if (kb == null) return -1;
    if (ka !== kb) return (ka - kb) * direction;
    return byName(a, b);
  });
}

/** HFEA figures first, then clinics' own figures. Used whenever a list is sorted by rate. */
export function groupByVerification(clinics: Clinic[]): { hfea: Clinic[]; clinic: Clinic[] } {
  return {
    hfea: clinics.filter((c) => c.successRates.verification === "hfea"),
    clinic: clinics.filter((c) => c.successRates.verification === "clinic"),
  };
}

/**
 * Countries present in the database, grouped by region in display order.
 *
 * Includes countries that have only excluded clinics. Someone filtering to
 * where a clinic operates should be told it was removed and why, which is
 * what the finder shows for those countries.
 */
export function countriesByRegion(): { region: Region; countries: string[] }[] {
  const regions: Region[] = ["UK", "Europe", "Rest of world"];
  return regions.map((region) => ({
    region,
    countries: [
      ...new Set([
        ...CLINICS.filter((c) => c.region === region).map((c) => c.country),
        ...excludedCountriesByRegion(region),
      ]),
    ].sort(),
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

/** Formats an ISO date the way the finder shows checked dates. */
export function formatCheckedDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
