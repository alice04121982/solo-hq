/**
 * Copy and option data for the community journey (/community).
 *
 * The community is real now, and small on purpose. It is not a forum on this
 * site and it never will be: there is no posting, no comments, no profiles,
 * and no follower counts anywhere in this codebase. The conversation happens
 * in a private messaging group; the site is only the door.
 *
 * Getting through that door is: apply → a person reads it → if approved, a
 * single-use invite arrives by email → redeeming it reveals the group link.
 * Copy in this file must not imply anything faster or more automatic than
 * that, and must not imply the group is public or joinable on demand.
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
 * Deliberately looser than `FamilyTypeSlug` — someone can apply long before
 * they'd pick a treatment pathway, so "still deciding" is a first-class
 * answer rather than a fallback.
 *
 * These values are also enforced in the database
 * (`submit_community_application`), so adding one here means adding it to
 * `supabase/migrations` too.
 */
export const PATHWAY_OPTIONS: CommunityOption<CommunityPathway>[] = [
  { value: "solo-mum", label: "Solo mum" },
  { value: "solo-dad", label: "Solo dad" },
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

export const PATHWAY_VALUES = PATHWAY_OPTIONS.map((o) => o.value);
export const STAGE_VALUES = STAGE_OPTIONS.map((o) => o.value);
export const INTEREST_VALUES = INTEREST_OPTIONS.map((o) => o.value);

/** The three promises the community is being built around. */
export const COMMUNITY_FEATURES = [
  {
    title: "Find others at your stage",
    body: "Deciding, stimming, in the two-week wait, or holding a newborn — talk to people in the same week of the journey, not just the same postcode.",
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

/* ── How joining works ─────────────────────────────────────────────────── */

/**
 * The four steps, written to set expectations honestly: applications are read
 * by a person, that takes days not seconds, and not everyone gets in.
 */
export const JOIN_STEPS = [
  {
    title: "You apply",
    body: "A short form — who you are, where you are in the journey, and why you want in. The last part matters most: it is what a person reads.",
  },
  {
    title: "A person reads it",
    body: "Not an algorithm, and not instantly. Usually within a few days. We are a small group and we would rather grow slowly than let the wrong person in.",
  },
  {
    title: "You get a personal invite",
    body: "If you're in, we email you a link that works once, for you, and expires. It is the only way the group link is ever handed out.",
  },
  {
    title: "You're in",
    body: "The link takes you into the group on your phone. No account here, no password, nothing else to set up.",
  },
] as const;

/**
 * The safety promises, stated on the page because a member's decision to
 * share something painful depends on them being true. Each one is a claim
 * this codebase or the group's settings has to keep — check before editing.
 */
export const SAFETY_PROMISES = [
  {
    title: "Every member is checked by a person",
    body: "Nobody joins by finding a link. Every single member applied, was read, and was approved individually.",
  },
  {
    title: "The invite link is never public",
    body: "It is not on this site, not in a search result, and not in an email you can forward usefully. Each invite works once and dies after seven days.",
  },
  {
    title: "No clinics, no brands, no recruiters",
    body: "No selling, no scouting for patients, no influencers building an audience. If you work in the sector, tell us when you apply.",
  },
  {
    title: "We ask for as little as we can",
    body: "No phone number is ever collected by this website. No address, no date of birth, no medical records. What you write in the form is deleted once it has done its job.",
  },
] as const;

/* ── Group rules ───────────────────────────────────────────────────────── */

export interface CommunityRule {
  title: string;
  body: string;
}

/**
 * The rules every applicant has to accept before applying, and again before
 * redeeming an invite. Kept short enough that people actually read them —
 * a code of conduct nobody finishes protects nobody.
 */
export const COMMUNITY_RULES: CommunityRule[] = [
  {
    title: "What is said here stays here",
    body: "No screenshots, no forwarding, no quoting members anywhere else — not to a partner, not to a journalist, not on social media. This is the rule that makes every other one worth having, and breaking it is the fastest way out.",
  },
  {
    title: "Nobody's numbers are yours to keep",
    body: "You will be able to see other members' phone numbers, because that is how group messaging works. Do not save them, add them to anything, or message anyone privately who has not said you can.",
  },
  {
    title: "Share your own story, not someone else's",
    body: "Your donor, your ex, your clinic staff, your family — they did not join this group. Keep them unidentifiable.",
  },
  {
    title: "No medical advice, ever",
    body: "Say what happened to you. Do not tell anyone what to take, what to ask for, or what to stop. Protocols are between a person and their clinic.",
  },
  {
    title: "No selling, promoting, or recruiting",
    body: "No clinics, no supplements, no coaching, no affiliate links, no research recruitment, no press requests. If you have a professional interest in fertility, say so when you apply and ask before you post.",
  },
  {
    title: "Loss and pregnancy both belong here",
    body: "Flag hard news before you tell it, so people can choose their moment. Nobody has to read it, and nobody has to hide it either.",
  },
  {
    title: "No toxic positivity, no advice you weren't asked for",
    body: "\"Just relax\" and \"have you tried\" are not welcome. Ask people what they want before you offer it: to be heard, or to be helped.",
  },
  {
    title: "Tell an admin, don't handle it alone",
    body: "If someone makes you uncomfortable, message an admin. You will not have to explain yourself twice and you will never be asked to sort it out with them directly.",
  },
];

/**
 * The one thing the site cannot engineer away, said plainly rather than
 * buried. Group messaging exposes members' phone numbers to each other; every
 * applicant is told before they apply and again before they redeem.
 */
export const PHONE_NUMBER_NOTICE =
  "The group runs on a messaging app, which means members can see each other's phone numbers. We cannot change that, and we would rather you knew now than found out later. If that is not a trade you want to make, this is the wrong group — and that is a completely reasonable place to land.";

/** Grounds for removal, stated up front so removal is never a surprise. */
export const REMOVAL_GROUNDS = [
  "Sharing anything from the group outside it",
  "Messaging a member privately who has not invited it",
  "Selling, promoting, or recruiting",
  "Giving medical instructions",
  "Any harassment, abuse, or bigotry, once",
] as const;
