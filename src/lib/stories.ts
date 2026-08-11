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
  /**
   * A line lifted verbatim from `body`, used when this story is quoted on
   * another page. It is never rendered alongside its own body — a pull quote
   * sitting directly under the sentence it came from just reads as a stutter.
   */
  quote: string;
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

/**
 * ILLUSTRATIVE CONTENT: none of these stories describe real people. They
 * exist to establish the shape and tone of the section and are labelled as
 * illustrative wherever they render. Replace with real, consented accounts
 * (via stories@cairnfertility.co.uk) before removing those labels.
 */
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
    excerpt: "Two IUI rounds, one IVF cycle, and one very determined woman. Alice's story about trusting herself to make the biggest decision of her life, alone.",
    body: "I started researching solo IVF after a relationship ended in my mid-thirties. I wasn't heartbroken about the relationship, if I'm honest. I was heartbroken about the timeline. I'd always assumed the family would arrive with the partner, in that order, and suddenly the order was gone and the years were not.\n\nI gave myself three months to decide. That deadline mattered more than anything else I did. Without it, I think I would still be deciding now. I read everything: the memoirs, the forums, the HFEA pages, the clinic price lists that never quite added up to the number you actually pay. I told two friends and my sister, and I asked them not to give me opinions, just to listen while I worked mine out.\n\nThe fertility MOT came back fine for my age, which at 35 meant fine with an asterisk. My consultant was straightforward with me: IUI was cheaper and gentler, IVF gave better odds per cycle. I decided I'd give IUI two rounds before moving on. Choosing the donor took me longer than choosing the clinic. I spent three weekends reading profiles before I realised I was looking for a person, when what I was choosing was a beginning. After that it got easier.\n\nThe first IUI failed quietly. The second failed on a morning I had a big work presentation, and I gave the presentation anyway, and nobody in that room knew. That was the loneliest moment of the whole thing. Not the appointments. The pretending.\n\nIVF was more demanding and somehow easier. There was a plan, a calendar, injections at the same time every evening. My sister came to the egg collection and cried more than I did. One embryo made it to transfer. During the two-week wait I booked something for every single evening, on advice from a woman in an online group, and it worked: I was too busy to symptom-spot.\n\nIris was born in 2023, twenty-two months after I first typed 'solo IVF UK' into a search bar. The hardest part wasn't the injections or the waiting. It was trusting myself to make this decision without anyone to share it with.\n\nWhat I'd tell anyone standing where I stood: set yourself a decision deadline, budget for more than one round so a failed cycle is a setback and not a catastrophe, and find your people early. You are allowed to want this on your own. Wanting it on your own is not a lesser version of wanting it.",
    quote: "The hardest part wasn't the injections or the waiting. It was trusting myself to make this decision without anyone to share it with.",
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
    body: "We agonised over who would carry. For about a year it was the question underneath every other conversation we had. Priya is a planner and had spreadsheets; I mostly had feelings I couldn't organise into columns. We both wanted to be part of making our child, and neither of us could say that out loud without it sounding like we were competing.\n\nThen our consultant mentioned reciprocal IVF and something clicked. One of us provides the eggs, the embryo is carried by the other. Both of us in it, differently. We sat in the car park afterwards and neither of us said anything for a minute, and then we both started talking at once.\n\nThe practical route: Priya went through stimulation and egg collection, the eggs were fertilised with our chosen donor's sperm, and I took the hormones to prepare to carry. Choosing the donor together was actually one of the good parts. We read profiles aloud to each other over dinner for a fortnight. We chose someone whose personal statement made us both laugh, which felt like the right test.\n\nNobody warns you about the admin. Because we're married, the legal parenthood side was straightforward, but we checked everything twice anyway, and I'd tell any couple to do the same before treatment starts, not after. The right clinic matters too. Ours never once asked which of us was 'the patient'. We'd met one, earlier on, that couldn't get its head around two mums, and we walked.\n\nThe transfer worked first time, which we know is luck as much as anything. Pregnancy was pregnancy: sickness, scans, Priya narrating what the baby was up to with total confidence and no evidence.\n\nOur daughter Maya was born in 2024. She has Priya's eyes. She has both of us completely.\n\nIf you're a two-mum couple starting out: ask about reciprocal IVF even if you think you've already decided who carries. It isn't the right answer for everyone. It was so much the right answer for us that the year of agonising now looks like the wrong question.",
    quote: "She has Priya's eyes. She has both of us completely.",
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
    excerpt: "After three failed cycles with her own eggs, Natalie chose donor eggs. Her twins Evi and Rosa are two and a half, and she tells them their story regularly.",
    body: "After three failed IVF cycles with my own eggs, my consultant suggested donor eggs. I heard the words and went somewhere else in my head for the rest of the appointment. I'd carried a picture of a child with my grandmother's nose through three rounds of injections, and it felt like being asked to grieve someone who had never existed.\n\nI was devastated, then slowly curious, then, after reading a dozen stories from women who'd been exactly here, at peace with it. That order matters, and I don't think you can skip a stage. My counsellor said something that stuck: I wasn't giving up on a child, I was giving up on one route to a child. The destination hadn't moved.\n\nThe practical side was gentler than the emotional side. The success rates for donor egg IVF at my age were three or four times what my own eggs could offer, which at 40 is simply information worth having. My donor was a woman in her twenties who had donated before. Under UK rules my children can access her identifying information at 18, and I'm glad of that. It means their story has no locked doors in it.\n\nI transferred one embryo and froze the rest. The one split. Nobody plans for the sentence 'it's twins' when you have spent two years planning for the possibility of nobody.\n\nMy twins Evi and Rosa are two and a half. They have each other's laugh and, apparently, my scowl, which shouldn't be genetically possible and yet here we are. Epigenetics or imitation, I've stopped caring which.\n\nI tell them their origin story regularly, and they think it's completely normal. Because it is. We have the picture books, and 'the kind lady who helped' is part of the furniture of their lives. There will be harder questions when they're older and I'd rather meet those questions in the open than have them find a locked drawer.\n\nIf you're staring at the donor egg conversation and it hurts: let it hurt for a while. Then read the stories of people who are on the other side of it. Not the statistics. The stories. That's what moved me, in the end.",
    quote: "I tell them their origin story regularly, and they think it's completely normal. Because it is.",
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
    excerpt: "A UK surrogacy journey that took 18 months, built a profound friendship, and ended with their son Elliot, who now calls their surrogate his auntie.",
    body: "We'd been matched through a surrogacy organisation for six months when we met Jo at an introductory event. It was a barbecue in a community hall garden, and Marcus spent most of it talking to the wrong woman while I ate my body weight in coleslaw and tried not to look like a man auditioning to be a father. Then Jo sat down next to us, said she'd read our profile, and asked what took us so long.\n\nBy the end of the night we knew she was right. Knowing it and proceeding are different things, though, and the organisation was firm about that in a way we're grateful for now. There were structured conversations over months: what contact would look like during pregnancy and after, what expenses covered, what would happen if something went wrong at any stage. UK surrogacy is altruistic, and the honest price of that is time and talking. We did the talking.\n\nWe'd already chosen an egg donor by then, and we'd decided Marcus's sperm would be used for the first embryo, mine for the second if we ever got that far. The legal advice came before any treatment: agreements, wills, and the plan for the parental order after birth, because the law makes the surrogate the legal mother until that order goes through. None of it is romantic. All of it is what let us relax later.\n\nThree months later, treatment started. The transfer worked on the second attempt. Pregnancy meant a lot of motorway miles: we went to every scan, and Jo's kids started calling us 'the uncles', which we pretended to take in our stride and privately found overwhelming.\n\nOur son Elliot was born in 2023, with both of us in the room and Jo's husband in the corridor with sandwiches. The parental order went through six months later without drama.\n\nJo is his auntie. It's messier and more beautiful than we expected. She comes to birthdays; Elliot knows who carried him; nothing about it is a secret and so nothing about it has power over him.\n\nWhat we'd tell two men starting out: budget more time than money, and you'll need to budget plenty of money. Use a proper organisation. Get the legal advice before treatment, not after. And when someone asks what took you so long, have an answer ready.",
    quote: "Jo is his auntie. It's messier and more beautiful than we expected.",
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
    excerpt: "Everything came back 'normal'. Unexplained infertility is its own kind of maddening. First IVF cycle, first transfer. Their daughter Isla is 18 months.",
    body: "We tried naturally for two years before getting investigated. For the first year we told ourselves the usual things: stress, timing, David's cycling. In the second year the things we told ourselves ran out.\n\nThe investigations themselves were quick once we started. Bloods and a tube check for me, a semen analysis for David, which he made exactly one joke about and then went very quiet for a few days. Everything came back 'normal'. I remember thinking we'd be relieved. We weren't.\n\nUnexplained infertility is its own kind of maddening: there's nothing to fix, nothing to point at. No villain, no plan of attack, and a strange guilt that comes from grieving when every test says nothing is wrong. People with a diagnosis get a noun. We got a shrug with statistics attached.\n\nOur consultant recommended IVF, partly for the odds and partly, she was honest, because the process itself sometimes reveals what the tests can't. We qualified for one NHS-funded cycle in our area, which we know from the waiting room conversations makes us lucky in a postcode sense.\n\nThe cycle was a strange mix of industrial and intimate. Eleven eggs, seven fertilised, two made it to day five. The two-week wait was the worst fortnight of the whole two-and-a-half years, and I say that having done twenty-nine months of waiting by then. We only told my mum and one friend, which was right for us: enough support to lean on, not so many people that a negative would have needed a press release.\n\nFirst cycle, first transfer. We still don't know why it took IVF, and we've stopped needing to. Somewhere in month twenty I thought an answer would fix me. It turned out a baby was not an answer, and didn't need to be.\n\nOur daughter Isla is 18 months. The frozen embryo is still frozen, and that's a conversation for another year. If you're in the unexplained camp: it isn't your fault, the not-knowing is a real loss you're allowed to hate, and a plan, even a hard one, is kinder to live inside than a mystery.",
    quote: "Unexplained infertility is its own kind of maddening: there's nothing to fix, nothing to point at.",
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
    excerpt: "Two years of preparation, the right surrogate, one IVF cycle. James on what it means to become a solo father, and why every conversation mattered.",
    body: "The decision took me two years to fully commit to. Not because I doubted it (I've always wanted to be a father) but because I needed to understand what I was doing before I began. There's no script for a single man who wants a child. When I told people the plan, the first question was always 'is that even possible?', and for the first six months my honest answer was that I was finding out.\n\nIt is possible. The route for a solo dad in the UK is surrogacy with a donor egg, and the order of operations matters. I started with a specialist solicitor before I'd contacted a single clinic, because the thing that scared me most was the legal side: the surrogate is the legal mother at birth, and as a single father I'd need a parental order, which the law had only recently opened to single applicants. I wanted to know the ground was solid before I asked anyone to stand on it with me.\n\nThe surrogacy organisation was blunt with me at the first meeting: fewer surrogates choose single intended fathers, so expect the matching to take longer. It took fourteen months. I used the time to choose an egg donor through an HFEA-registered bank, do the counselling properly rather than as a box-tick, and build the village every guide tells you to build. My mother, my brother's family, two close friends who signed up for specific jobs rather than vague support. I ran the numbers until I could fund two cycles without touching the emergency fund, because I'd read enough to know first transfers fail often.\n\nWhen the match came, it was Sarah, a mother of two who said she wanted to do one more extraordinary thing before she was done. We spent four months talking before anyone went near a clinic. The IVF itself was almost an anticlimax: one cycle, a good embryo, a transfer that worked.\n\nThe matching process, the legal preparation, the IVF cycle. All of it was manageable because I'd done the groundwork. I needed to understand what I was doing before I began. That sentence was my whole method, and I'd hand it to any man considering this.\n\nOscar was born when I was 43. The parental order took five months. Sarah and her family are part of his life, in the open, the way these things should be.\n\nOscar is three. He is everything. The two years of deciding, the fourteen months of waiting: from here they look like the price of a certainty I've never once questioned since.",
    quote: "I needed to understand what I was doing before I began.",
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
    quote: "He knew the Al-Azhar position better than our first consultant knew what Ramadan was.",
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
    quote: "That's the part nobody prepares you for — not the theology, the arithmetic of other people's families.",
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
    quote: "The guilt and the grief turned out to be two separate things wearing the same coat.",
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
    quote: "We told the family we were doing it, not asking.",
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
    quote: "There wasn't a rule against it. There just wasn't a category.",
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
    quote: "What took longer was accepting that we didn't need a committee to ratify it.",
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
    quote: "That's what stigma does — it makes five families each think they're the only one.",
    treatment: "ICSI × 2",
  },
];

export const FEATURED_STORIES = ALL_STORIES.slice(0, 3);

/** Stories told through the lens of religion, culture or belief. Used by /faith. */
export const FAITH_STORIES = ALL_STORIES.filter((s) => s.theme === "faith");
