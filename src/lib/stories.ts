import type { FamilyTypeSlug } from "./family-types";

/**
 * A cross-cutting subject a story also belongs to, independent of family type.
 * A story can be a solo-mum story *and* a faith story; the family type filter
 * and the theme filter are deliberately separate axes.
 */
export type StoryTheme = "faith";

export interface Story {
  id: string;
  familyType: FamilyTypeSlug | "all";
  familyLabel: string;
  name: string;
  age: number;
  location: string;
  tag: string;
  title: string;
  excerpt: string;
  body: string;
  treatment: string;
  /**
   * Optional so a story can ship before its photograph has been licensed.
   * Where it is absent the card renders a typographic panel instead — never
   * substitute a stock photo of someone else's community to fill the gap.
   */
  image?: string;
  imageAlt?: string;
  theme?: StoryTheme;
  /** The tradition a faith story is told from. Shown as a chip. */
  tradition?: string;
}

export const ALL_STORIES: Story[] = [
  {
    id: "alice-iris",
    familyType: "solo-mum",
    familyLabel: "Solo Mum by Choice",
    name: "Alice",
    age: 37,
    location: "Bristol",
    tag: "Solo mum by choice",
    title: "From 'someday' to mum of one in 22 months",
    excerpt: "Two IUI rounds, one IVF cycle, and one very determined woman. Alice's story about trusting herself to make the biggest decision of her life — alone.",
    body: "I started researching solo IVF after a relationship ended in my mid-thirties. I gave myself three months to decide. Two IUI rounds and one IVF cycle later, my daughter Iris was born in 2023. The hardest part wasn't the injections or the waiting — it was trusting myself to make this decision without anyone to share it with.",
    treatment: "IUI × 2, IVF × 1",
    image: "/photos/story-solo-mum.webp",
    imageAlt: "A mother holding her young child, looking out at the sky",
  },
  {
    id: "sarah-priya-maya",
    familyType: "same-sex-female",
    familyLabel: "Same-Sex Female Couple",
    name: "Sarah & Priya",
    age: 35,
    location: "London",
    tag: "Same-sex female couple",
    title: "We both wanted to be part of making her",
    excerpt: "Reciprocal IVF meant one of them provided the eggs and the other carried the pregnancy. Their daughter Maya has both of them in her completely.",
    body: "We agonised over who would carry. Then our consultant mentioned reciprocal IVF and something clicked. Priya provided the eggs, they were fertilised with our chosen donor's sperm, and I carried the embryo. Our daughter Maya was born in 2024. She has Priya's eyes. She has both of us completely.",
    treatment: "Reciprocal IVF",
    image: "/photos/story-two-mums.webp",
    imageAlt: "Two women sitting together, one kissing the other on the cheek",
  },
  {
    id: "natalie-twins",
    familyType: "solo-mum",
    familyLabel: "Solo Mum by Choice",
    name: "Natalie",
    age: 40,
    location: "London",
    tag: "Donor egg IVF",
    title: "I used donor eggs and I'm not ashamed of it",
    excerpt: "After three failed cycles with her own eggs, Natalie chose donor eggs. Her twins Evi and Rosa are two and a half — and she tells them their story regularly.",
    body: "After three failed IVF cycles with my own eggs, my consultant suggested donor eggs. I was devastated, then slowly curious, then — after reading a dozen stories from women who'd been exactly here — at peace with it. My twins Evi and Rosa are two and a half. I tell them their origin story regularly, and they think it's completely normal. Because it is.",
    treatment: "Donor egg IVF",
    image: "/photos/hands.webp",
    imageAlt: "An adult hand holding a small child's hand",
  },
  {
    id: "tom-marcus-elliot",
    familyType: "same-sex-male",
    familyLabel: "Same-Sex Male Couple",
    name: "Tom & Marcus",
    age: 38,
    location: "London",
    tag: "Same-sex male couple",
    title: "We met our surrogate at a barbecue. She changed our lives.",
    excerpt: "A UK surrogacy journey that took 18 months, built a profound friendship, and ended with their son Elliot — who now calls their surrogate his auntie.",
    body: "We'd been matched through a surrogacy organisation for six months when we met Jo at an introductory event. By the end of the night we knew she was right. Three months later, treatment started. Our son Elliot was born in 2023. Jo is his auntie. It's messier and more beautiful than we expected.",
    treatment: "IVF, UK surrogate",
    image: "/photos/story-two-dads.webp",
    imageAlt: "Two men embracing and smiling at each other",
  },
  {
    id: "emma-david-isla",
    familyType: "heterosexual-couple",
    familyLabel: "Heterosexual Couple",
    name: "Emma & David",
    age: 34,
    location: "London",
    tag: "Unexplained infertility",
    title: "Two years of trying. Three months of IVF. One daughter.",
    excerpt: "Everything came back 'normal'. Unexplained infertility is its own kind of maddening. First IVF cycle, first transfer — their daughter Isla is 18 months.",
    body: "We tried naturally for two years before getting investigated. Everything came back 'normal'. Unexplained infertility is its own kind of maddening — there's nothing to fix, nothing to point at. Our consultant recommended IVF. First cycle, first transfer. Our daughter Isla is 18 months.",
    treatment: "IVF × 1",
    image: "/photos/story-mirror-family.webp",
    imageAlt: "Couple embracing warmly",
  },
  {
    id: "james-oscar",
    familyType: "single-dad",
    familyLabel: "Solo Dad by Choice",
    name: "James",
    age: 42,
    location: "London",
    tag: "Solo dad by choice",
    title: "I decided at 40. My son was born at 43.",
    excerpt: "Two years of preparation, the right surrogate, one IVF cycle. James on what it means to become a solo father — and why every conversation mattered.",
    body: "The decision took me two years to fully commit to. Not because I doubted it — I've always wanted to be a father — but because I needed to understand what I was doing before I began. The matching process, the legal preparation, the IVF cycle — all of it was manageable because I'd done the groundwork. Oscar is three. He is everything.",
    treatment: "IVF with donor eggs, UK surrogate",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Man smiling warmly, portrait",
  },

  // ─── Faith, culture & belief ──────────────────────────────────────────────
  // PRE-LAUNCH: these are written examples showing the shape and tone the
  // section needs. They are not yet accounts from named, consenting people.
  // Replace them with real contributors before this page goes public —
  // attributing a religious position to a named individual who did not say it
  // is the one mistake this section cannot afford. See
  // docs/faith-section-brief.md for the sourcing and photography checklist.
  {
    id: "aisha-yusuf",
    familyType: "heterosexual-couple",
    familyLabel: "Heterosexual Couple",
    name: "Aisha & Yusuf",
    age: 33,
    location: "Birmingham",
    tag: "Muslim · Own gametes",
    tradition: "Islam",
    theme: "faith",
    title: "Our imam knew more about IVF than our first consultant did",
    excerpt:
      "Four years of being told to be patient, one very direct conversation at the mosque, and a cycle timed carefully around Ramadan.",
    body: "We spent four years being told to be patient and make du'a, as though seeing a doctor was the opposite of that. When we finally asked our imam directly, he was completely matter-of-fact: treatment using our own gametes is permitted, seeking medicine is not a failure of trust, and would we like him to speak to the clinic. He knew the Al-Azhar position better than our first consultant knew what Ramadan was.\n\nThe donor question was the one that mattered. When my results came back poor, the clinic offered donor eggs at the second appointment, and kept offering after we said no. That got exhausting. We eventually wrote it into our notes in capital letters.\n\nWe timed stimulation to finish before Ramadan, which our consultant sorted in about ten minutes once we asked early enough. Our son was born last spring. My mother still tells people he was a gift from Allah, which he was, and also there were forty-one injections.",
    treatment: "IVF × 2, own gametes",
  },
  {
    id: "rivka-daniel",
    familyType: "heterosexual-couple",
    familyLabel: "Heterosexual Couple",
    name: "Rivka & Daniel",
    age: 29,
    location: "Manchester",
    tag: "Orthodox Jewish · Supervised IVF",
    tradition: "Judaism",
    theme: "faith",
    title: "A mashgiach in the lab, and a rabbi on speed dial",
    excerpt:
      "Halachic supervision sounded complicated until it wasn't. The harder part was being twenty-nine in a community where everyone marries early.",
    body: "I was twenty-seven when we started, which in our community felt late, because everyone around us had married at twenty-two and had two children by twenty-five. That's the part nobody prepares you for — not the theology, the arithmetic of other people's families.\n\nHalacha was the straightforward bit. Our rav was clear that IVF with our own gametes is not only permitted but a mitzvah, and he arranged supervision in the lab. The clinic had done it before and barely blinked. Our embryologist and our mashgiach got on well, which I did not expect.\n\nWhat I'd tell someone starting: give the clinic your calendar on day one. Shabbat, yom tov, the whole thing. Ours moved a collection by a day without any drama because we asked in week one rather than week four.",
    treatment: "IVF × 3, halachic supervision",
  },
  {
    id: "maria-catholic",
    familyType: "heterosexual-couple",
    familyLabel: "Heterosexual Couple",
    name: "Maria",
    age: 38,
    location: "Liverpool",
    tag: "Catholic · IVF",
    tradition: "Catholicism",
    theme: "faith",
    title: "I went ahead knowing the Church disagreed. I didn't stop going to Mass.",
    excerpt:
      "The hardest conversation Maria had about IVF was not with her family or her parish. It was the one she kept having with herself.",
    body: "I read Donum Vitae properly, which I'd recommend to anyone in my position, because the version that gets repeated informally is harsher than the actual document. It is still a no. But it also says, in plain terms, that a child conceived this way is fully a person and that the desire for a child is good. That mattered to me more than I expected.\n\nI went ahead anyway. I want to be honest that I did not resolve it — I decided, which is a different thing. I still go to Mass. I told one priest, who was kind, and didn't tell the other, who I suspect would not have been.\n\nThe guilt and the grief turned out to be two separate things wearing the same coat. It took a counsellor to point that out. Once I could tell them apart, the guilt got much smaller and the grief got easier to carry.",
    treatment: "IVF × 2",
  },
  {
    id: "preeti-anand",
    familyType: "heterosexual-couple",
    familyLabel: "Heterosexual Couple",
    name: "Preeti & Anand",
    age: 41,
    location: "Leicester",
    tag: "Hindu · Donor eggs",
    tradition: "Hinduism",
    theme: "faith",
    title: "Nothing in our religion forbade it. Everything in our family did.",
    excerpt:
      "The objection sounded scriptural and turned out to be about lineage, reputation and what the aunties would say.",
    body: "When we said donor eggs, the reaction from Anand's side of the family was immediate and framed entirely in religious language. It took us months to work out that there was no scriptural objection underneath it at all. It was about gotra, and about what people would say, and about a fear that the child wouldn't count.\n\nOnce we could name that, it got easier to answer, because those are answerable. The pandit we spoke to was completely relaxed about it and slightly puzzled that we'd asked.\n\nWe told the family we were doing it, not asking. Two relatives stopped speaking to us for a year. Both of them now come to birthdays. Our daughter is three and knows the outline of her story already — we decided early that she would never have a day where she found out.",
    treatment: "IVF with donor eggs",
  },
  {
    id: "grace-solo",
    familyType: "solo-mum",
    familyLabel: "Solo Mum by Choice",
    name: "Grace",
    age: 36,
    location: "Leeds",
    tag: "Evangelical Christian · Solo mum",
    tradition: "Protestant & Anglican Christianity",
    theme: "faith",
    title: "My church didn't have a category for me",
    excerpt:
      "Grace's congregation had no objection to IVF and no idea what to do with a single woman using donor sperm.",
    body: "My church has no problem with IVF in principle — several couples there have been through it and been prayed for openly. A single woman using donor sperm was a different matter. There wasn't a rule against it. There just wasn't a category.\n\nI told my small group before I told my parents, which sounds odd, but I needed to know whether I was going to lose the community before I took on anything else. Some of them were wonderful. Two weren't. The leadership landed somewhere in the middle, which I've made my peace with.\n\nWhat helped was finding one other woman, two churches over, who had done the same thing four years earlier. One conversation with her was worth about six months of reading. If you're the first person in your congregation to do this, go and find someone who was the first in theirs.",
    treatment: "IUI × 3, IVF × 1, donor sperm",
  },
  {
    id: "hannah-ruth",
    familyType: "same-sex-female",
    familyLabel: "Same-Sex Female Couple",
    name: "Hannah & Ruth",
    age: 34,
    location: "Cardiff",
    tag: "Christian · Reciprocal IVF",
    tradition: "Protestant & Anglican Christianity",
    theme: "faith",
    title: "We kept the faith and changed the church",
    excerpt:
      "Two women, one congregation that couldn't agree about them, and a decision to stop waiting for permission.",
    body: "We'd both grown up in church and neither of us wanted to give that up to have a family. For a while we tried to hold both by being quiet, which worked until I was visibly pregnant.\n\nThe congregation split about us, fairly politely. Our vicar was supportive; a section of the congregation was not; nobody was rude to our faces. We eventually moved to a church twenty minutes further away where the question simply didn't arise, and I wish we'd done it two years earlier instead of treating it as a defeat.\n\nReciprocal IVF itself was the easy part — Ruth's eggs, my body, our donor. The theology we'd already worked out for ourselves years before. What took longer was accepting that we didn't need a committee to ratify it.",
    treatment: "Reciprocal IVF",
  },
  {
    id: "jaspreet-harjit",
    familyType: "heterosexual-couple",
    familyLabel: "Heterosexual Couple",
    name: "Jaspreet & Harjit",
    age: 35,
    location: "Wolverhampton",
    tag: "Sikh · IVF",
    tradition: "Sikhism",
    theme: "faith",
    title: "We told the whole gurdwara in the end. It was a relief.",
    excerpt:
      "Three years of secrecy, one accidental disclosure, and the discovery that four other couples had been hiding the same thing.",
    body: "There is nothing in Sikhi that prohibits IVF. We checked properly, twice, because the silence around it in our community made us assume there must be something. There isn't. The secrecy was entirely social.\n\nWe hid it for three years. Fake work trips to cover appointments, that sort of thing. Then Harjit's mother worked it out and told one person, and within a fortnight everyone knew.\n\nIt was a relief. Four other couples came to us privately in the following months, all of whom had been doing exactly what we'd been doing, none of whom had told each other. That's what stigma does — it makes five families each think they're the only one. If we'd said something at the start we'd have had four years of company.",
    treatment: "ICSI × 2",
  },
];

export const FEATURED_STORIES = ALL_STORIES.slice(0, 3);

/** Stories told through the lens of religion, culture or belief. Used by /faith. */
export const FAITH_STORIES = ALL_STORIES.filter((s) => s.theme === "faith");
