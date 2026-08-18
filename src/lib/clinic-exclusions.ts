/**
 * Clinics Cairn will not list.
 *
 * The finder exists to help people choose a clinic, so the list of clinics we
 * decline to put in front of anyone is an editorial decision that has to be
 * written down, sourced, and reviewable — not a quiet deletion from
 * `src/lib/clinics.ts` that nobody can audit later.
 *
 * How it is enforced, twice over:
 * - `CLINICS` in `src/lib/clinics.ts` is filtered through `exclusionFor`, so
 *   an excluded clinic cannot reach the finder, the Get Started wizard or the
 *   cost calculator even if one is added to the database by mistake.
 * - `npm run check:data` fails if a clinic in the database matches an entry
 *   here, so the mistake is caught in CI rather than sitting behind a filter.
 *
 * Editorial rules for this file:
 * - An entry states only what a named, linkable source has published, and
 *   attributes it. It is a record of why we are not listing a clinic, never
 *   an allegation of our own and never a finding of fact against anyone.
 * - Where a clinic or clinician has denied the reporting, the denial is
 *   recorded in the same entry.
 * - Every entry carries a `reviewOn` date. An exclusion tied to an open
 *   investigation is a holding position, and holding positions are supposed
 *   to be revisited, not left to calcify.
 * - Individuals are never named here. The unit of the decision is the clinic.
 */

export interface ClinicExclusion {
  /** The clinic's primary trading name, for display. */
  name: string;
  /**
   * Every name the clinic is known by, including `name`. A database entry is
   * excluded when its name contains any of these (case and punctuation
   * insensitive) and its country matches `countries`.
   */
  names: string[];
  /**
   * Country fragments the exclusion is scoped to, so a same-named clinic in
   * an unrelated jurisdiction is not caught by it.
   */
  countries: string[];
  /** The jurisdiction the exclusion is about, as displayed. */
  location: string;
  /** What was reported, by whom, and why that means we are not listing it. */
  reason: string;
  /** Any denial or response on the record, in the clinic's own terms. */
  response?: string;
  sources: { label: string; url: string }[];
  /** ISO date the exclusion was added. */
  excludedOn: string;
  /** ISO date by which the entry should be re-checked against its sources. */
  reviewOn: string;
}

export const CLINIC_EXCLUSIONS: ClinicExclusion[] = [
  {
    name: "Dogus IVF Centre",
    names: ["dogus ivf", "dogus hospital", "dogus fertility"],
    countries: ["cyprus"],
    location: "Northern Cyprus",
    reason:
      "BBC News reported in August 2026 that at least 30 children, most of them British, are " +
      "feared to have been conceived in northern Cyprus using sperm or egg donors other than " +
      "the ones their parents selected, and that half of those children were born from " +
      "procedures at this clinic. The territory's Ministry of Health has said it opened an " +
      "official investigation. Cryos International, the sperm bank the clinic advertised as a " +
      "supplier, told the BBC it has no record of ever delivering sperm to the clinic and has " +
      "blacklisted it since 2016. Donor provenance is the one thing a patient cannot check " +
      "for themselves afterwards, so while that is unresolved we will not put the clinic in " +
      "front of anyone as an option.",
    sources: [
      {
        label: "BBC News — Sunshine & Secrets: The Hidden Side of IVF (File on 4 investigation)",
        url: "https://www.youtube.com/watch?v=1kzwW2yO2T4",
      },
      {
        label: "Cyprus Mail — North launches probe into IVF clinic after sperm mix-up claims",
        url: "https://cyprus-mail.com/2026/04/02/north-launches-probe-into-ivf-clinic-after-sperm-mix-up-claims",
      },
      {
        label: "Progress Educational Trust — UK families treated with wrong donor sperm in Northern Cyprus",
        url: "https://www.progress.org.uk/uk-families-treated-with-wrong-donor-sperm-in-northern-cyprus/",
      },
    ],
    excludedOn: "2026-08-18",
    reviewOn: "2027-02-18",
  },
  {
    name: "Miracle IVF",
    names: ["miracle ivf"],
    countries: ["cyprus"],
    location: "Northern Cyprus",
    reason:
      "Named in the same BBC News reporting, which linked further cases of the same kind to " +
      "the clinic. Cryos International told the BBC it has suspended supplying the clinic " +
      "until the northern Cyprus Ministry of Health investigation concludes. We are holding " +
      "to the same line as the sperm bank: not listed while the investigation is open.",
    response:
      "The clinic says it has always complied with the law, that patients sign consent forms " +
      "explaining how donors are chosen, and that it has been cleared of breaching any laws. " +
      "The BBC reported it was unable to confirm that clearance with the Ministry of Health.",
    sources: [
      {
        label: "BBC News — Sunshine & Secrets: The Hidden Side of IVF (File on 4 investigation)",
        url: "https://www.youtube.com/watch?v=1kzwW2yO2T4",
      },
      {
        label: "Progress Educational Trust — UK families treated with wrong donor sperm in Northern Cyprus",
        url: "https://www.progress.org.uk/uk-families-treated-with-wrong-donor-sperm-in-northern-cyprus/",
      },
    ],
    excludedOn: "2026-08-18",
    reviewOn: "2027-02-18",
  },
];

/** Lowercase, unaccent, and reduce every run of punctuation to one space. */
function normalise(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * The exclusion covering a clinic, or undefined if it is listable.
 *
 * Matching is on name and country together: "Miracle IVF" in northern Cyprus
 * is excluded, a same-named clinic somewhere else is a different clinic and
 * is not.
 */
export function exclusionFor(clinic: { name: string; country: string }): ClinicExclusion | undefined {
  const name = normalise(clinic.name);
  const country = normalise(clinic.country);
  return CLINIC_EXCLUSIONS.find(
    (x) =>
      x.names.some((n) => name.includes(normalise(n))) &&
      x.countries.some((c) => country.includes(normalise(c)))
  );
}
