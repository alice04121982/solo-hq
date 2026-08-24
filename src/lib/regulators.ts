/**
 * Fertility regulators, by country.
 *
 * UK-only today, deliberately shaped as a list so other markets slot in as
 * Cairn expands: add an entry here and every surface that renders regulator
 * context picks it up. Countries without an entry render nothing rather than
 * a guess.
 */
export interface Regulator {
  /** Country names exactly as they appear in Clinic.country. */
  countries: string[];
  name: string;
  shortName: string;
  homeUrl: string;
  /** The public register where patients verify a clinic's licence. */
  registerUrl: string;
  /** The regulator's own plain-language guide to treatments and costs. */
  treatmentGuideUrl: string;
  /** One-sentence description of what the regulator is, for display. */
  description: string;
}

export const REGULATORS: Regulator[] = [
  {
    countries: ["United Kingdom"],
    name: "Human Fertilisation and Embryology Authority",
    shortName: "HFEA",
    homeUrl: "https://www.hfea.gov.uk/",
    registerUrl: "https://www.hfea.gov.uk/choose-a-clinic/clinic-search/",
    treatmentGuideUrl: "https://www.hfea.gov.uk/treatments/",
    description:
      "The UK's independent regulator of fertility treatment. Every UK clinic must be licensed and inspected by the HFEA, and its public register publishes verified success rates and inspection ratings for each one.",
  },
];

export const HFEA = REGULATORS[0];

export function regulatorFor(country: string): Regulator | undefined {
  return REGULATORS.find((r) => r.countries.includes(country));
}
