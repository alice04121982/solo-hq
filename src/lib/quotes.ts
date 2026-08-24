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
 *
 * Editorial rule: illustrative quotes describe the journey, never endorse
 * Cairn or its tools — a fabricated product testimonial is a fake review,
 * label or no label.
 */
export const COMMUNITY_QUOTES: Quote[] = [
  {
    quote:
      "I'd spent two years on the fence, terrified of doing it alone. What got me moving was seeing the real numbers and real timelines — and hearing from women who'd done it that I could too.",
    name: "Gemma, 38",
    location: "Bristol",
    stage: "Mum to a toddler, conceived via donor IUI",
    featured: true,
  },
  {
    quote:
      "Nobody tells you how much the admin grinds you down. Comparing clinics properly took weeks, but it taught me which questions actually mattered.",
    name: "Sarah, 35",
    location: "Manchester",
    stage: "Currently in IVF cycle 2",
  },
  {
    quote:
      "Sitting down and pricing the whole journey, vial to birth, was the first thing that made it feel financially possible, not just a dream.",
    name: "Priya, 33",
    location: "London",
    stage: "Preparing for first IUI",
  },
  {
    quote:
      "I'm 42 and people kept telling me I'd left it too late. Then I met women who'd had their babies at 43, 44, using donor eggs.",
    name: "Claire, 42",
    location: "Edinburgh",
    stage: "Mid-treatment with donor eggs",
  },
];

/** The three that sit best together in a row, strongest voice in the middle. */
export const HOMEPAGE_QUOTES: Quote[] = [
  COMMUNITY_QUOTES[1],
  COMMUNITY_QUOTES[0],
  COMMUNITY_QUOTES[2],
];
