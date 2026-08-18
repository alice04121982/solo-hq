/**
 * In the media: coverage Cairn is pointing readers at.
 *
 * This is a reading list, not a publication. Every item links straight out to
 * the original publisher and carries their headline; the only words of ours
 * on the page are the short `note` explaining why the piece is worth someone's
 * time and what it bears on. We never reproduce a publisher's copy here.
 *
 * Editorial rules for this file:
 * - `url` is the original publisher's page: no aggregators, and no syndicated
 *   reprints where the original is reachable. Open every link in a browser
 *   before it ships. The seed set below was compiled from publisher indexes
 *   in a sandbox that could not reach the pages themselves, so it wants one
 *   click-through pass.
 * - `title` is the publisher's headline, verbatim. If their headline is
 *   loaded, that is their editorial choice to own, not ours to soften.
 * - `note` is Cairn's own summary in Cairn's own words: what the piece found,
 *   and what it changes for someone choosing treatment. It never asserts
 *   more than the piece does.
 * - `published` is the publisher's date, and is omitted rather than guessed.
 *   `addedOn` is when it went on this list, and is what the page sorts by:
 *   a roundup is ordered by when we surfaced something, not by the age of
 *   the source.
 * - Reporting about a named clinic that also changes what we list belongs in
 *   `src/lib/clinic-exclusions.ts` as well. The two files cite each other's
 *   sources on purpose.
 *
 * `npm run check:data` checks the shape of every item here: absolute https
 * links, real dates, no duplicate ids.
 */

export type NewsTopic =
  | "Safety & regulation"
  | "Donor conception"
  | "Costs & funding"
  | "Science & evidence"
  | "Policy"
  | "Community";

export const NEWS_TOPICS: NewsTopic[] = [
  "Safety & regulation",
  "Donor conception",
  "Costs & funding",
  "Science & evidence",
  "Policy",
  "Community",
];

export type NewsKind = "Article" | "Investigation" | "Documentary" | "Report" | "Statement";

export interface NewsItem {
  /** Stable slug, used as the React key and for linking to a single item. */
  id: string;
  /** The publisher's headline, verbatim. */
  title: string;
  /** Absolute https link to the original. */
  url: string;
  outlet: string;
  kind: NewsKind;
  topic: NewsTopic;
  /** Publisher's date, ISO. Omitted when it cannot be established. */
  published?: string;
  /** ISO date this went on the list. Drives the order of the page. */
  addedOn: string;
  /** Cairn's note: what it found, and what it changes for a patient. */
  note: string;
  /** Where on this site the piece bears on, when it bears on somewhere. */
  related?: { label: string; href: string };
  /** At most one item runs as the lead. */
  featured?: boolean;
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "bbc-sunshine-and-secrets-northern-cyprus",
    title: "Sunshine & Secrets: The Hidden Side of IVF",
    url: "https://www.youtube.com/watch?v=1kzwW2yO2T4",
    outlet: "BBC News",
    kind: "Investigation",
    topic: "Donor conception",
    addedOn: "2026-08-18",
    featured: true,
    note:
      "The BBC's File on 4 investigation into fertility clinics in northern Cyprus, where " +
      "British parents who chose a donor on medical history, appearance and identity-release " +
      "status found, sometimes years later, that a different donor appears to have been used. " +
      "Reporting since has put the number of children affected at 30 or more, and the " +
      "territory's Ministry of Health has opened an investigation. Northern Cyprus sits " +
      "outside both EU law and the HFEA's remit, which is exactly why donor provenance there " +
      "is so hard for a patient to check afterwards. Two clinics named in this reporting are " +
      "excluded from our finder while the investigation is open.",
    related: { label: "How we decide which clinics to list", href: "/about#methodology" },
  },
  {
    id: "cyprus-mail-north-probe-ivf-clinic",
    title: "North launches probe into IVF clinic after sperm mix-up claims",
    url: "https://cyprus-mail.com/2026/04/02/north-launches-probe-into-ivf-clinic-after-sperm-mix-up-claims",
    outlet: "Cyprus Mail",
    kind: "Article",
    topic: "Safety & regulation",
    published: "2026-04-02",
    addedOn: "2026-08-18",
    note:
      "The local reporting on the official response: northern Cyprus's health ministry " +
      "confirming an investigation into the clinic at the centre of the BBC's findings. " +
      "Worth reading beside the BBC piece for what the regulatory picture actually looks " +
      "like in a territory only Turkey recognises.",
  },
  {
    id: "pet-uk-families-wrong-donor-sperm-northern-cyprus",
    title: "UK families treated with wrong donor sperm in Northern Cyprus",
    url: "https://www.progress.org.uk/uk-families-treated-with-wrong-donor-sperm-in-northern-cyprus/",
    outlet: "Progress Educational Trust (BioNews)",
    kind: "Report",
    topic: "Donor conception",
    addedOn: "2026-08-18",
    note:
      "BioNews's write-up of the same cases, including the forensic genetics behind them. " +
      "PET is the closest thing the UK has to a specialist fertility news desk, and its " +
      "summaries are a good way to check a headline against what the evidence supports.",
  },
  {
    id: "dcn-statement-northern-cyprus",
    title: "DCN statement on File on 4 programme on Northern Cyprus",
    url: "https://dcnetwork.org/dcn-statement-on-file-on-4-programme-on-northern-cyprus/",
    outlet: "Donor Conception Network",
    kind: "Statement",
    topic: "Donor conception",
    addedOn: "2026-08-18",
    note:
      "The response from the charity that has supported donor-conceived families in the UK " +
      "for decades. If you are reading the Cyprus coverage and recognising your own " +
      "treatment in it, this is the place with people who have been here before.",
    related: { label: "Donor conception resources", href: "/resources" },
  },
  {
    id: "pet-icbs-one-nhs-funded-ivf-cycle",
    title: "Nearly 70 percent of ICBs in England offer only one NHS-funded IVF cycle",
    url: "https://www.progress.org.uk/nearly-70-percent-of-icbs-in-england-offer-only-one-nhs-funded-ivf-cycle/",
    outlet: "Progress Educational Trust (BioNews)",
    kind: "Report",
    topic: "Costs & funding",
    addedOn: "2026-08-18",
    note:
      "NICE recommends up to three cycles. Most integrated care boards in England now fund " +
      "one, and several have cut their offer in the past year. If you are working out what " +
      "you might be entitled to, start from your own ICB's current policy rather than the " +
      "national guideline.",
    related: { label: "Check your NHS eligibility", href: "/funding#check" },
  },
  {
    id: "bbc-fall-in-nhs-funded-ivf-cycles",
    title: "Fall in proportion of IVF cycles funded by NHS",
    url: "https://www.bbc.co.uk/news/articles/c134vvxd80go",
    outlet: "BBC News",
    kind: "Article",
    topic: "Costs & funding",
    addedOn: "2026-08-18",
    note:
      "The long-run trend behind the funding cuts: a shrinking share of UK IVF paid for by " +
      "the NHS, and a growing share paid for privately. Useful context for why the price of " +
      "a cycle matters more to more people every year.",
    related: { label: "Funding and payment options", href: "/funding" },
  },
  {
    id: "hfea-add-ons-ratings",
    title: "UK fertility regulator launches improved ratings for fertility treatment 'add-ons'",
    url: "https://www.hfea.gov.uk/about-us/news-and-press-releases/2023-news-and-press-releases/uk-fertility-regulator-launches-improved-ratings-for-fertility-treatment-add-ons/",
    outlet: "HFEA",
    kind: "Statement",
    topic: "Science & evidence",
    addedOn: "2026-08-18",
    note:
      "The regulator's five-category rating system for treatment add-ons, and its plain " +
      "statement that for most patients the evidence behind them is missing or unreliable. " +
      "The single most useful page to have open when a clinic offers you an extra at a " +
      "price. The HFEA does not endorse this site.",
    related: { label: "What a cycle really costs", href: "/resources" },
  },
];

/**
 * Where this list comes from and when it was last swept. The page shows the
 * date, so a roundup that has quietly stopped being kept up is visible as
 * such rather than passing for current.
 */
export const NEWS_PROVENANCE = {
  /** ISO date the list was last added to or swept. */
  listUpdatedOn: "2026-08-18",
  /** Where to send something for the list. */
  submitEmail: "stories@cairnfertility.co.uk",
} as const;

/**
 * The list in page order: newest addition first, and within a day, the
 * featured item leads.
 */
export function newsInOrder(items: NewsItem[] = NEWS_ITEMS): NewsItem[] {
  return [...items].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if (a.addedOn !== b.addedOn) return a.addedOn < b.addedOn ? 1 : -1;
    return a.title.localeCompare(b.title);
  });
}

/** Topics that actually have items, in the canonical display order. */
export function topicsInUse(items: NewsItem[] = NEWS_ITEMS): NewsTopic[] {
  const present = new Set(items.map((i) => i.topic));
  return NEWS_TOPICS.filter((t) => present.has(t));
}

/** "18 August 2026" — the date format used across the site. */
export function formatNewsDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** The publisher's own domain, for showing where a link goes before it is clicked. */
export function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}
