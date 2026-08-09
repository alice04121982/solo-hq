export interface Quote {
  quote: string;
  name: string;
  location: string;
  stage: string;
  /**
   * Round portrait for the card's avatar variant. None of the community
   * quotes carry one yet — there is no portrait asset for these contributors,
   * and borrowing a story photograph would put one face against two names.
   * Drop a real portrait in here and the card picks up the variant.
   */
  avatar?: string;
  featured?: boolean;
}

/**
 * Community voices. Short enough to read as speech rather than prose — these
 * are rendered as speech-bubble cards, so anything longer than about forty
 * words will unbalance a row of them.
 *
 * ILLUSTRATIVE CONTENT: these quotes do not come from real people and are
 * labelled as illustrative where they render. Replace with real, consented
 * quotes before removing those labels.
 */
export const COMMUNITY_QUOTES: Quote[] = [
  {
    quote:
      "I'd spent two years on the fence, terrified of doing it alone. Cairn gave me the real numbers, the real timelines, and the community that told me — you can do this. My son Arlo is 14 months old.",
    name: "Gemma, 38",
    location: "Bristol",
    stage: "Mum to Arlo, conceived via donor IUI",
    featured: true,
  },
  {
    quote:
      "Nobody tells you how much the admin grinds you down. The clinic comparisons here saved me weeks of research and helped me ask the right questions.",
    name: "Sarah, 35",
    location: "Manchester",
    stage: "Currently in IVF cycle 2",
  },
  {
    quote:
      "The cost calculator was the first thing that made me feel like this was financially possible, not just a dream.",
    name: "Priya, 33",
    location: "London",
    stage: "Preparing for first IUI",
  },
  {
    quote:
      "I'm 42 and people kept telling me I'd left it too late. This community showed me women who'd had their babies at 43, 44, using donor eggs.",
    name: "Claire, 42",
    location: "Edinburgh",
    stage: "Pregnant — due in August",
  },
];

/** The three that sit best together in a row, strongest voice in the middle. */
export const HOMEPAGE_QUOTES: Quote[] = [
  COMMUNITY_QUOTES[1],
  COMMUNITY_QUOTES[0],
  COMMUNITY_QUOTES[2],
];
