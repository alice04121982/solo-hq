/**
 * Copy and option data for the community waitlist journey (/community).
 *
 * The community itself does not exist yet — every promise on the page is
 * scoped to "when it opens", and the waitlist answers shape what gets built
 * first. Keep that honesty when editing: nothing here may imply a live forum.
 */

export type CommunityPathway =
  | "solo-mum"
  | "solo-dad"
  | "two-mums"
  | "two-dads"
  | "mum-and-dad"
  | "exploring";

export type CommunityStage =
  | "deciding"
  | "preparing"
  | "in-treatment"
  | "pregnant"
  | "parent";

export type CommunityInterest =
  | "same-stage"
  | "been-through-it"
  | "local-meetups"
  | "donor-conception"
  | "solo-specific";

export interface CommunityOption<T extends string> {
  value: T;
  label: string;
}

/**
 * Deliberately looser than `FamilyTypeSlug` — someone can join the waitlist
 * long before they'd pick a treatment pathway, so "still deciding" is a
 * first-class answer rather than a fallback.
 */
export const PATHWAY_OPTIONS: CommunityOption<CommunityPathway>[] = [
  { value: "solo-mum", label: "Solo mum by choice" },
  { value: "solo-dad", label: "Solo dad by choice" },
  { value: "two-mums", label: "Two mums" },
  { value: "two-dads", label: "Two dads" },
  { value: "mum-and-dad", label: "Mum and dad" },
  { value: "exploring", label: "Still deciding" },
];

export const STAGE_OPTIONS: CommunityOption<CommunityStage>[] = [
  { value: "deciding", label: "Researching and deciding" },
  { value: "preparing", label: "Preparing — tests, donor, money" },
  { value: "in-treatment", label: "In treatment now" },
  { value: "pregnant", label: "Pregnant" },
  { value: "parent", label: "Already a parent" },
];

export const INTEREST_OPTIONS: CommunityOption<CommunityInterest>[] = [
  { value: "same-stage", label: "Meeting people at my stage" },
  { value: "been-through-it", label: "Hearing from people who've done it" },
  { value: "local-meetups", label: "Local meetups" },
  { value: "donor-conception", label: "Talking donor conception" },
  { value: "solo-specific", label: "Space for solo parents specifically" },
];

/** The three promises the community is being built around. */
export const COMMUNITY_FEATURES = [
  {
    title: "Find others at your stage",
    body: "Deciding, stimming, in the two-week wait, or holding a newborn — connect with people in the same week of the journey, not just the same postcode.",
  },
  {
    title: "Hear from people who've been through it",
    body: "Honest answers from members who are two steps ahead of you: what they'd repeat, what they'd skip, what nobody warned them about.",
  },
  {
    title: "Set up local meetups",
    body: "Coffee with someone who gets it beats another evening of forum threads. Find members near you and take the conversation offline.",
  },
] as const;
