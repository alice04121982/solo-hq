/**
 * Who each country's law lets a clinic treat, by family type.
 *
 * The matcher hard-filters on this: a clinic is only shown when the country's
 * entry for the user's family type is `true`. `false` means the law excludes
 * that group; `null` means we could not confirm it from a primary source
 * today, and the matcher treats `null` the same as `false`.
 *
 * Every entry was checked on `checkedOn` against the sources listed. For the
 * United States the law is set state by state, so the entry describes
 * Colorado, where the only listed US clinic is. Change the entry if a clinic
 * in another state is added.
 */

export interface CountryEligibility {
  /** Exactly as Clinic.country. */
  country: string;
  singleWomen: boolean | null;
  femaleCouples: boolean | null;
  differentSexCouples: boolean | null;
  surrogacyForMaleIntendedParents: boolean | null;
  donorEggs: boolean | null;
  donorSperm: boolean | null;
  /** One plain sentence. */
  summary: string;
  sources: { label: string; url: string }[];
  /** ISO date the sources were last read. */
  checkedOn: string;
}

const CHECKED_ON = "2026-09-13";

export const COUNTRY_ELIGIBILITY: CountryEligibility[] = [
  {
    country: "United Kingdom",
    singleWomen: true,
    femaleCouples: true,
    differentSexCouples: true,
    surrogacyForMaleIntendedParents: true,
    donorEggs: true,
    donorSperm: true,
    summary:
      "UK law: licensed clinics treat single women, female couples and couples of a man and a woman; surrogacy is lawful on an expenses-only basis, with a parental order after birth.",
    sources: [
      {
        label: "HFEA, Fertility treatment for single women",
        url: "https://www.hfea.gov.uk/i-am/single-women/",
      },
      {
        label: "HFEA, Fertility treatment for LGBT+ people",
        url: "https://www.hfea.gov.uk/i-am/fertility-treatment-for-lgbt-people/",
      },
      {
        label: "HFEA, Surrogacy",
        url: "https://www.hfea.gov.uk/treatments/explore-all-treatments/surrogacy/",
      },
      {
        label: "Human Fertilisation and Embryology Act 1990, s.13(5)",
        url: "https://www.legislation.gov.uk/ukpga/1990/37/section/13",
      },
      {
        label: "Human Fertilisation and Embryology Act 2008, s.54A (parental order, one applicant)",
        url: "https://www.legislation.gov.uk/ukpga/2008/22/section/54A",
      },
    ],
    checkedOn: CHECKED_ON,
  },
  {
    country: "Spain",
    singleWomen: true,
    femaleCouples: true,
    differentSexCouples: true,
    surrogacyForMaleIntendedParents: false,
    donorEggs: true,
    donorSperm: true,
    summary:
      "Spanish law: any adult woman can be treated regardless of marital status or sexual orientation; donors are anonymous; surrogacy contracts are void.",
    sources: [
      {
        label: "Ley 14/2006 sobre técnicas de reproducción humana asistida, arts. 5, 6 and 10 (BOE consolidated text)",
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2006-9292",
      },
    ],
    checkedOn: CHECKED_ON,
  },
  {
    country: "Czech Republic",
    singleWomen: false,
    femaleCouples: false,
    differentSexCouples: true,
    surrogacyForMaleIntendedParents: null,
    donorEggs: true,
    donorSperm: true,
    summary:
      "Czech law: clinics treat a woman and a man who apply together only; donors are anonymous; the law has no provision for surrogacy.",
    sources: [
      {
        label: "Zákon č. 373/2011 Sb. o specifických zdravotních službách, § 6 and § 10 (text in force 1 January 2026)",
        url: "https://www.zakonyprolidi.cz/cs/2011-373",
      },
      {
        label: "PRONATAL, Legislation (clinic summary of Act 373/2011)",
        url: "https://pronatal.cz/en/legislation",
      },
    ],
    checkedOn: CHECKED_ON,
  },
  {
    country: "Greece",
    singleWomen: true,
    femaleCouples: null,
    differentSexCouples: true,
    surrogacyForMaleIntendedParents: false,
    donorEggs: true,
    donorSperm: true,
    summary:
      "Greek law: single women and couples of a man and a woman can be treated; surrogacy is only for a woman who cannot carry a pregnancy for medical reasons; we have not confirmed treatment of a female couple as a couple.",
    sources: [
      {
        label: "National Authority for Medically Assisted Reproduction, frequently asked questions (Greek)",
        url: "https://eaiya.gov.gr/συχνές-ερωτήσεις/",
      },
      {
        label: "National Authority for Medically Assisted Reproduction, legislation index (Laws 3089/2002, 3305/2005, 4958/2022)",
        url: "https://eaiya.gov.gr/en/legislation/",
      },
    ],
    checkedOn: CHECKED_ON,
  },
  {
    country: "Denmark",
    singleWomen: true,
    femaleCouples: true,
    differentSexCouples: true,
    surrogacyForMaleIntendedParents: false,
    donorEggs: true,
    donorSperm: true,
    summary:
      "Danish law: single women and couples can be treated up to age 45; clinics may not treat where there is a surrogacy agreement.",
    sources: [
      {
        label: "Bekendtgørelse af lov om assisteret reproduktion (LBK nr 902 af 23/08/2019), §§ 1 a, 5, 6 and 13",
        url: "https://www.retsinformation.dk/eli/lta/2019/902",
      },
      {
        label: "Nordisk Post, 6 December 2025: government considering allowing clinics to treat surrogates (ban still in force)",
        url: "https://www.nordiskpost.com/2025/12/06/denmark-government-considering-allowing-fertility-clinics-surrogate-mothers/",
      },
    ],
    checkedOn: CHECKED_ON,
  },
  {
    country: "United States",
    singleWomen: true,
    femaleCouples: true,
    differentSexCouples: true,
    surrogacyForMaleIntendedParents: true,
    donorEggs: true,
    donorSperm: true,
    summary:
      "US law is set by each state. Colorado, where the listed clinic is, bars clinics from refusing patients on marital status or sexual orientation and enforces surrogacy agreements for intended parents, married or unmarried, when treatment takes place in the state.",
    sources: [
      {
        label: "Colorado Surrogacy Agreement Act, C.R.S. 19-4.5-103 (definitions)",
        url: "https://colorado.public.law/statutes/crs_19-4.5-103",
      },
      {
        label: "C.R.S. 19-4.5-104 (eligibility) and 19-4.5-105 (process requirements)",
        url: "https://colorado.public.law/statutes/crs_19-4.5-105",
      },
      {
        label: "C.R.S. 19-4-106 (assisted reproduction; a donor is not a parent)",
        url: "https://colorado.public.law/statutes/crs_19-4-106",
      },
      {
        label: "C.R.S. 24-34-601 (discrimination in places of public accommodation)",
        url: "https://colorado.public.law/statutes/crs_24-34-601",
      },
    ],
    checkedOn: CHECKED_ON,
  },
  {
    country: "South Africa",
    singleWomen: true,
    femaleCouples: null,
    differentSexCouples: true,
    surrogacyForMaleIntendedParents: false,
    donorEggs: true,
    donorSperm: true,
    summary:
      "South African law: any woman can be a recipient of donor gametes, with her consent alone; a surrogacy agreement is only valid if a commissioning parent is domiciled in South Africa; we have not confirmed treatment of a female couple as a couple.",
    sources: [
      {
        label: "Children's Act 38 of 2005, ss. 292, 294 and 295",
        url: "https://www.justice.gov.za/legislation/acts/2005-038%20childrensact.pdf",
      },
      {
        label: "Regulations Relating to Artificial Fertilisation of Persons, GN R175 of 2 March 2012 (definition of recipient; regs. 10 and 19)",
        url: "https://www.gov.za/sites/default/files/gcis_document/201409/35099rg9699gon175.pdf",
      },
    ],
    checkedOn: CHECKED_ON,
  },
  {
    country: "Turkey",
    singleWomen: false,
    femaleCouples: false,
    differentSexCouples: true,
    surrogacyForMaleIntendedParents: false,
    donorEggs: false,
    donorSperm: false,
    summary:
      "Turkish regulation: treatment is for married couples using the wife's eggs and the husband's sperm only.",
    sources: [
      {
        label: "Üremeye Yardımcı Tedavi Uygulamaları ve Üremeye Yardımcı Tedavi Merkezleri Hakkında Yönetmelik (RG 29135, 30 September 2014), arts. 1, 4(ğ) and 19(2)",
        url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=20085&MevzuatTur=7&MevzuatTertip=5",
      },
    ],
    checkedOn: CHECKED_ON,
  },
];

export function eligibilityFor(country: string): CountryEligibility | undefined {
  return COUNTRY_ELIGIBILITY.find((e) => e.country === country);
}

/** The country's one-sentence summary, or "Not confirmed" when we have no entry. */
export function eligibilitySummary(country: string): string {
  return eligibilityFor(country)?.summary ?? "Not confirmed";
}
