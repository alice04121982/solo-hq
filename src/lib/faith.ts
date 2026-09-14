/**
 * Content for /faith. Rules: describe, never rule; every entry has `viewsDiffer`;
 * every claim has an openable source (a tradition's own documents first, scholarly
 * overviews only where none exist); thin documentation is flagged in `note`.
 * Every source and organisation was opened and checked on 13 September 2026.
 */

export interface SourceLink {
  label: string;
  href: string;
}

export interface FaithTradition {
  slug: string;
  name: string;
  /** Collapsed-card text. Description, not verdict. */
  summary: string;
  commonlyTaught: string[];
  viewsDiffer: string[];
  questionsToAsk: string[];
  practicalNotes?: string[];
  /** Shown when the documentation behind an entry is thin. */
  note?: string;
  sources: SourceLink[];
}

export const FAITH_TRADITIONS: FaithTradition[] = [
  {
    slug: "catholicism",
    name: "Catholicism",
    summary:
      "Formal teaching does not permit IVF, while affirming the desire for a child and the grief of infertility.",
    commonlyTaught: [
      "Two documents from the Congregation for the Doctrine of the Faith (now the Dicastery for the Doctrine of the Faith) set the position: Donum Vitae (1987) and Dignitas Personae (2008). Both hold that conception should arise from the marital act, and that IVF replaces that act rather than assisting it.",
      "The objection is not to treating infertility: anything that restores the body's own capacity to conceive is encouraged. Because a person is held to exist from conception, freezing, grading and discarding surplus embryos are grave matters.",
      "Donum Vitae says that although conception through IVF \"cannot be approved\", every child \"must in any case be accepted as a living gift of the divine Goodness and must be brought up with love\".",
    ],
    viewsDiffer: [
      "Teaching is settled; practice is not. Many practising Catholics use IVF, and priests vary from strict counsel to quiet accompaniment.",
      "What should happen to embryos already frozen is unresolved in Catholic bioethics, including whether another woman may adopt and carry them.",
      "On access, the documents are uniform: Donum Vitae says artificial fertilisation of an unmarried woman \"cannot be morally justified\". Quest, a group for LGBTQ+ Catholics, is listed under Support.",
    ],
    questionsToAsk: [
      "Is there someone in this diocese who regularly accompanies people through infertility?",
      "If I have already had IVF, what does the Church say about my situation and my child?",
      "Can you help me separate what is binding teaching from what is your own view?",
    ],
    sources: [
      {
        label: "Donum Vitae (1987)",
        href: "https://www.vatican.va/roman_curia/congregations/cfaith/documents/rc_con_cfaith_doc_19870222_respect-for-human-life_en.html",
      },
      {
        label: "Dignitas Personae (2008)",
        href: "https://www.vatican.va/roman_curia/congregations/cfaith/documents/rc_con_cfaith_doc_20081208_dignitas-personae_en.html",
      },
    ],
  },
  {
    slug: "orthodox-christianity",
    name: "Orthodox Christianity",
    summary:
      "Broadly cautious. Some churches have published clear positions; others leave it to pastoral judgement.",
    commonlyTaught: [
      "Orthodox churches encourage the medical treatment of infertility and treat the desire for children as good.",
      "The Russian Orthodox Church's Bases of the Social Concept (2000) is the fullest published statement. It accepts \"artificial insemination by the husband's germ cells\" and calls \"morally inadmissible\" any IVF involving the production, storage and deliberate destruction of \"spare\" embryos, donor sperm or eggs, surrogacy \"even in those cases where it is realised on a non-commercial basis\", and prenatal diagnosis used to choose a child's sex.",
      "Many bishops who bless IVF ask couples to transfer one embryo at a time.",
    ],
    viewsDiffer: [
      "There is no single Orthodox magisterium (central teaching authority). Greek, Russian, Antiochian, Serbian and other churches have not all published the same thing, or published at all.",
      "The Church has not formally ruled on whether un-implanted or frozen embryos are persons. Economia (pastoral discretion to apply a rule with mercy in a particular case) means your spiritual father may have more latitude than a written statement suggests.",
      "On access: the Russian document says inseminating a single woman with donor cells deprives the child \"of the right to have mother and father\". We found no comparable statement from other jurisdictions.",
    ],
    questionsToAsk: [
      "What has our own church published on this, as distinct from what Orthodoxy in general is said to teach?",
      "If we transfer every embryo we create and freeze none, does that change your counsel?",
      "May we discuss this under economia, and what would that mean for us?",
    ],
    sources: [
      {
        label: "Bases of the Social Concept, XII: Russian Orthodox Church (2000)",
        href: "https://old.mospat.ru/en/documents/social-concepts/xii/",
      },
      {
        label: "Embryohood, Childhood, Personhood: Public Orthodoxy (2024)",
        href: "https://publicorthodoxy.org/2024/04/26/embryohood-childhood-personhood/",
      },
    ],
  },
  {
    slug: "protestant-anglican",
    name: "Protestant & Anglican Christianity",
    summary:
      "Generally permissive about IVF itself; the disagreement is about donors and about what happens to embryos.",
    commonlyTaught: [
      "The Church of England's 1985 report Personal Origins, commended by General Synod and revised in 1996, remains its fullest statement. Synod welcomed a statutory regulator for fertility services rather than opposing treatment, and affirmed marriage as \"the ideal context\" for raising children.",
      "Concern concentrates on surplus embryos and on whether donor gametes (donor eggs or sperm) introduce a third party into a marriage; in 1988 Synod asked for a review of donor insemination, citing psychological risks to the children conceived.",
    ],
    viewsDiffer: [
      "Liberal congregations may actively support solo parents and same-sex couples using donor gametes; conservative evangelical bodies sit closer to Catholic teaching on the embryo. The Southern Baptist Convention's 2024 resolution affirmed the right to life of every human being \"including those in an embryonic stage\" and urged care \"especially in the number of embryos generated in the IVF process\".",
      "There is no central authority. A national statement does not bind your local minister, and your minister does not bind you.",
      "Views on who may access treatment vary more within this family than views on the procedure. OneBodyOneFaith, listed under Support, works with LGBTQ+ Christians across denominations.",
    ],
    questionsToAsk: [
      "What does our denomination say, and how much weight does that carry in this congregation?",
      "Would it change your view if we created only as many embryos as we intend to transfer?",
      "If we use a donor, would our child be welcomed here without qualification?",
    ],
    sources: [
      {
        label: "Embryo research: some Christian perspectives (GS 1511), Church of England",
        href: "https://www.churchofengland.org/sites/default/files/2018-10/gs1511-embryo-research-some-christian-perspectives.pdf",
      },
      {
        label: "SBC resolution on reproductive technologies (2024)",
        href: "https://www.sbc.net/resource-library/resolutions/on-the-ethical-realities-of-reproductive-technologies-and-the-dignity-of-the-human-embryo/",
      },
    ],
  },
  {
    slug: "islam",
    name: "Islam",
    summary:
      "IVF is widely accepted within a marriage using the couple's own gametes. Third-party donation is where Sunni and Shia jurisprudence part company.",
    commonlyTaught: [
      "Fatwas from Al-Azhar in Egypt from 1980 onwards set the mainstream Sunni position: IVF is permissible where the sperm is the husband's, the egg is the wife's, and the embryo is transferred to that wife during a valid marriage.",
      "Treating infertility is regarded positively. Seeking medical help is not a failure of tawakkul (trust in God).",
      "The prohibition on third-party gametes rests on preserving nasab (lineage and certainty of parentage), which Islamic law treats as a serious public interest.",
    ],
    viewsDiffer: [
      "Since a 1999 fatwa by Ayatollah Khamenei, some Shia authorities permit donor eggs and sperm under specified conditions, a position most Sunni scholars do not share. Shia marja' (senior jurists whose rulings their followers adopt) disagree among themselves; Ayatollah Sistani opposes donation.",
      "Surrogacy is prohibited in mainstream Sunni jurisprudence and permitted by some Shia jurists.",
      "On access: because the Al-Azhar position requires a valid marriage, it does not extend to single people or same-sex couples. Imaan, listed under Support, supports LGBTQI+ Muslims.",
    ],
    questionsToAsk: [
      "Which school or marja' am I following, and what have they specifically said?",
      "Does the clinic understand that donor gametes are not an option for me, and can it document the chain of custody for our samples?",
      "How do we schedule stimulation and egg collection around Ramadan, and is fasting safe on these drugs?",
    ],
    sources: [
      {
        label: "Making Muslim Babies: Inhorn (2006)",
        href: "https://link.springer.com/article/10.1007/s11013-006-9027-x",
      },
      {
        label: "Al-Azhar fatwa on artificial insemination: Shabana, The Muslim World (2021; journal access may be needed)",
        href: "https://onlinelibrary.wiley.com/doi/10.1111/muwo.12406",
      },
      {
        label: "Sperm donation, a Shia perspective: Ghodrati (2023)",
        href: "https://jmrh.mums.ac.ir/article_21293.html",
      },
    ],
  },
  {
    slug: "judaism",
    name: "Judaism",
    summary:
      "Generally supportive: having children carries religious weight, and treatment is widely permitted.",
    commonlyTaught: [
      "The commandment to be fruitful and multiply (Genesis 1:28) gives having children religious weight, and halacha (Jewish law) generally treats medical intervention to overcome infertility as permitted and often encouraged. There is broad rabbinic agreement that IVF is acceptable with the husband's sperm and the wife's eggs.",
      "Embryos are not accorded the status of a full person in halacha, so Jewish law is comparatively relaxed about freezing. Wanton destruction is still discouraged. In observant communities, halachic supervision of the laboratory by mashgichim (trained supervisors) is increasingly common.",
    ],
    viewsDiffer: [
      "Donor gametes are the live question. Orthodox authorities are broadly cautious, particularly about donor sperm; Masorti (Conservative), Reform and Liberal authorities are generally more permissive.",
      "Egg donation raises the maternity question: is the mother the woman who provided the egg or the woman who gave birth? This is unresolved among poskim (rabbinic decisors), as is whether a non-Jewish donor is preferable.",
      "Access for single women and same-sex couples varies sharply across the movements, from full support to none. KeshetUK, listed under Support, works across the Liberal, Masorti, Orthodox and Reform communities.",
    ],
    questionsToAsk: [
      "Are there timing constraints around Shabbat and festivals that I should give the clinic before they set my protocol?",
      "Could bleeding after egg collection or transfer affect my niddah (menstrual purity) status, and what should I plan for before stimulation starts?",
      "If we need a donor, is this a question you would refer to a specialist posek?",
    ],
    practicalNotes: [
      "Chana (chana.org.uk) is a UK Jewish charity supporting people through fertility treatment and baby loss, including the halachic side.",
    ],
    sources: [
      {
        label: "Assisted Reproduction and Judaism: Jewish Virtual Library",
        href: "https://www.jewishvirtuallibrary.org/assisted-reproduction-and-judaism",
      },
      {
        label: "Orthodox Jewish law and assisted reproduction: Religion Unplugged (2022)",
        href: "https://religionunplugged.com/news/2022/2/1/how-orthodox-jewish-law-is-adapting-to-assisted-reproductive-technology",
      },
    ],
  },
  {
    slug: "hinduism",
    name: "Hinduism",
    summary:
      "No central prohibition and a generally permissive approach, with family and lineage expectations often weighing more than doctrine.",
    commonlyTaught: [
      "There is no single Hindu authority and no doctrinal ban on assisted reproduction. Having children is widely understood as part of dharma (religious duty), and classical texts contain narratives of conception outside ordinary means.",
      "Concern, where it exists, is usually about lineage (gotra, the patrilineal clan line) and the destruction of embryos, rather than the procedure.",
    ],
    viewsDiffer: [
      "Attitudes to donor gametes range from full acceptance to a preference for the couple's own on lineage grounds. Some families prefer a donor of the same community or faith; others regard that as irrelevant.",
      "With no central ruling body, what you encounter will often be a family or community position presented as a religious one. Stigma can be intense and heavily gendered even where the theology is permissive.",
    ],
    questionsToAsk: [
      "Is this objection based on scripture, or on family expectations? Both matter, but they need different conversations.",
      "Whose opinion in this family will shape how our child is treated, and do they need to be brought in early?",
      "If lineage is the concern, what would address it?",
    ],
    sources: [
      {
        label: "Impact of culture and religion on ART in India: IJRCOG",
        href: "https://www.ijrcog.org/index.php/ijrcog/article/view/17091",
      },
      {
        label: "Is the human embryo sacrosanct? Progress Educational Trust (2009)",
        href: "https://www.progress.org.uk/is-the-human-embryo-sacrosanct-gamete-donation-and-doctrine/",
      },
    ],
  },
  {
    slug: "sikhism",
    name: "Sikhism",
    summary:
      "No prohibition on IVF is recorded, and the tradition's texts do not address assisted conception directly.",
    commonlyTaught: [
      "Neither the Guru Granth Sahib nor the Sikh Rehat Maryada (code of conduct) contains an explicit injunction on assisted conception.",
      "Having a family is highly valued, and treatment for a married couple using their own gametes is generally regarded as acceptable. Conception is expected within marriage.",
      "The Progress Educational Trust's multi-faith conference recorded that Sikhism \"does not approve of any procedure which destroys or meddles with embryos\".",
    ],
    viewsDiffer: [
      "Some Sikhs read infertility as God's will and treatment as going against it; others regard doctors who treat infertility as performing sewa (selfless service).",
      "Donor sperm is regarded by some as wrong because it brings a third person into the marriage; others take a different view. Where a family cares about a donor's religious background, that is a family position rather than a ruling.",
    ],
    questionsToAsk: [
      "Is there anything in our tradition that prohibits this, or is the discomfort I am sensing about what people will say?",
      "If we use a donor, how and when do we plan to tell our child?",
      "Who in the sangat (congregation) can we trust with this while we are still deciding?",
    ],
    note: "Thinly documented. We found no statement from a Sikh religious body on assisted conception; the sources below are a conference report and a UK exam-board summary, so this entry is shorter and more hedged than the others.",
    sources: [
      {
        label: "Is the human embryo sacrosanct? Progress Educational Trust (2009)",
        href: "https://www.progress.org.uk/is-the-human-embryo-sacrosanct-gamete-donation-and-doctrine/",
      },
      {
        label: "Sikhism and bioethics: infertility (A level resource), WJEC",
        href: "https://resource.download.wjec.co.uk/vtc/2021-22/el21-22_14-1/wjec/12-wjec-a-level-sikhism-theme-4C-sikhism-and-bioethics-infertility.pdf",
      },
    ],
  },
  {
    slug: "buddhism",
    name: "Buddhism",
    summary:
      "No unified position and no central authority. Reasoning tends to run through intention and the relief of suffering.",
    commonlyTaught: [
      "There is no Buddhist governing body issuing rulings on reproductive medicine, and no scriptural prohibition on IVF. Where the question is engaged, it is usually approached through cetana (intention) and the reduction of suffering.",
      "Ahimsa (non-harm) makes the deliberate destruction of embryos the point of greatest concern. One scholarly overview describes disposing of leftover embryos after IVF as \"ethically problematic\" in Buddhist terms, with reservations about freezing.",
    ],
    viewsDiffer: [
      "Traditions differ on when a being is present in an embryo. Theravada, Mahayana and Vajrayana teachers do not answer this the same way, and the answer you receive will depend largely on the teacher you ask.",
      "Donor conception is little discussed in the sources we found, so we have not recorded a position on it.",
    ],
    questionsToAsk: [
      "How does this teacher understand the status of an early embryo?",
      "If I want to avoid creating embryos I will not transfer, what protocol would let me do that?",
      "What would a compassionate decision look like here, for everyone involved, including a future child?",
    ],
    note: "Thinly documented. We found no statement from a Buddhist body on assisted conception; the source below is a scholarly overview of several religions, not a Buddhist document.",
    sources: [
      {
        label: "Bioethics and oncofertility, insights from religious traditions: Zoloth and Henning (2010)",
        href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3086485/",
      },
    ],
  },
  {
    slug: "interfaith-and-mixed-belief",
    name: "Interfaith & mixed-belief households",
    summary:
      "Two traditions in one house, or one believer and one not. Common, rarely written about, and worth planning for.",
    commonlyTaught: [
      "The recurring flashpoints are whether to use a donor, what happens to surplus embryos, who is told, and how a child will be raised and identified. Each is easier settled in advance than in a waiting room.",
    ],
    viewsDiffer: [
      "Some couples follow the more restrictive tradition on every point; others take each decision on its merits. Drifting between the two without saying so is where most conflict comes from.",
    ],
    questionsToAsk: [
      "If we disagree about the embryos, what have we agreed to do, before we have any?",
      "Would we see a counsellor together before we start, rather than after something goes wrong?",
    ],
    sources: [
      { label: "Find a fertility counsellor: BICA", href: "https://www.bica.net/find-a-counsellor" },
      {
        label: "Rights and the law: Donor Conception Network",
        href: "https://dcnetwork.org/books-and-resources/rights-and-the-law/",
      },
    ],
  },
];

/** Faiths rarely answer "is IVF allowed" as one question. They answer several smaller ones. */
export interface FaithQuestion {
  question: string;
  why: string;
}

export const FAITH_QUESTIONS: FaithQuestion[] = [
  {
    question: "Is conception outside the body acceptable at all?",
    why: "The narrowest objection, and the one that makes Catholic teaching distinctive. Most traditions here answer yes.",
  },
  {
    question: "Whose egg and whose sperm?",
    why: "Third-party donation is the biggest dividing line across every tradition here. Many that accept IVF stop at a donor.",
  },
  {
    question: "What happens to embryos you do not transfer?",
    why: "Freezing, storage, donation to research, discarding. For traditions that hold a person exists from conception, this is the heart of the matter.",
  },
  {
    question: "Who counts as the parent?",
    why: "Lineage, inheritance and legitimacy: why donor conception is treated so seriously in Islamic and Jewish law.",
  },
  {
    question: "Is surrogacy different?",
    why: "Almost always treated as its own question, and answered more restrictively.",
  },
  {
    question: "Who may access treatment?",
    why: "Married couples only, or also single people and same-sex couples. Traditions that agree about the laboratory can disagree sharply here.",
  },
  {
    question: "What about testing and selecting embryos?",
    why: "Testing embryos (PGT) raises questions about disability and the grounds for setting an embryo aside. In the UK, choosing an embryo's sex for non-medical reasons is illegal.",
  },
  {
    question: "How do I keep practising while I'm in treatment?",
    why: "Fasting, Sabbath and festival timing, modesty, medication ingredients. Rarely doctrinal, frequently the thing that disrupts a cycle.",
  },
];

/** Cross-tradition practicalities a clinic can accommodate if asked early. */
export const OBSERVANCE_NOTES: { title: string; body: string }[] = [
  {
    title: "Say it at booking, not at the door",
    body: "Requests for a female sonographer, a chaperone, a room for prayer, or scheduling around a festival are routine for UK clinics if they arrive before the rota and your protocol are set. Put them in writing when you book.",
  },
  {
    title: "Fasting and stimulation drugs",
    body: "Ramadan, Yom Kippur and other fasts can overlap a stimulation cycle. Ask your consultant whether your protocol is safe alongside fasting. Many traditions allow exemptions for illness; ask your religious adviser whether that applies to you, with your consultant's answer in hand.",
  },
  {
    title: "Check what is in your medication",
    body: "If you avoid porcine, bovine or alcohol-derived ingredients, ask the clinic pharmacist for the full ingredient list of every drug, including capsule shells and pessary bases. Alternatives sometimes exist.",
  },
  {
    title: "You can ask for a faith-aware counsellor",
    body: "UK clinics must offer you counselling before you consent to treatment. You can ask for someone who understands your tradition, or find your own outside the clinic.",
  },
  {
    title: "Limiting the embryos you create",
    body: "If surplus embryos are your sticking point, ask what a protocol that fertilises fewer eggs looks like, and what it costs you in success rate.",
  },
];

// Difficult conversations

export interface ConversationScenario {
  slug: string;
  label: string;
  situation: string;
  whatsHappening: string[];
  /** Written to be said out loud. */
  tryThis: string[];
  notYourJob: string[];
  exitLine: string;
}

export const CONVERSATION_SCENARIOS: ConversationScenario[] = [
  {
    slug: "family-objects",
    label: "A relative objects, or says it wouldn't be your child",
    situation:
      "A parent, grandparent or elder tells you that what you are doing is against your faith, or that a donor-conceived child would not be yours.",
    whatsHappening: [
      "Sometimes this is a sincere doctrinal objection, which can be discussed with a source. Often it is fear, about your standing in the community or about the child, in the most authoritative language available. Where lineage carries religious weight, \"it wouldn't be your child\" may be meant as a fact rather than an insult.",
    ],
    tryThis: [
      "\"I know you're saying this because you care. Can you tell me what specifically worries you? I'd rather understand it than guess.\"",
      "\"Our child's parents are defined by law, not by DNA, and that's settled. If the question is religious, I've already asked someone qualified.\"",
    ],
    notYourJob: ["Justifying your family to someone who has already decided."],
    exitLine: "\"I've heard you. I'm not going to keep discussing it, but I'm not going anywhere either.\"",
  },
  {
    slug: "community",
    label: "The community is talking",
    situation:
      "Word has spread. You are being discussed at the mosque, the shul, the temple, the church hall, and someone has forwarded you a sermon clip about IVF.",
    whatsHappening: [
      "Community stigma around infertility is often more forceful than doctrine, and frequently gendered: the woman is assumed to be the problem, whatever the diagnosis. You cannot control gossip; you can control who hears it from you first and how much energy it gets.",
    ],
    tryThis: [
      "Tell two or three people properly, before the story arrives without you in it. Then use one repeatable line: \"We're dealing with some health stuff. We'll share news when there's news.\"",
      "For forwarded videos and articles: \"Please don't send me things like this while I'm in treatment. If you want to talk about it properly some time, I'm up for that, but not by link.\"",
    ],
    notYourJob: ["Correcting every version of the story, or fact-checking everything anyone sends you."],
    exitLine: "\"There's nothing to update. When there is, you'll hear it from me.\"",
  },
  {
    slug: "religious-leader",
    label: "Your religious leader isn't supportive",
    situation:
      "You went to your priest, imam, rabbi or teacher for guidance and came away feeling judged.",
    whatsHappening: [
      "Clergy are not uniformly trained in reproductive medicine or pastoral care around infertility; a cold response is often inexperience rather than doctrine. You can seek a second person within the same tradition.",
    ],
    tryThis: [
      "\"Can you help me understand which part of that is binding teaching and which is your own view?\"",
      "\"Is there someone in the community who has accompanied people through fertility treatment before? I'd like to speak to them.\"",
    ],
    notYourJob: ["Going back to a person who makes it worse."],
    exitLine: "\"Thank you for your time. I'm going to speak to someone else about this as well.\"",
  },
  {
    slug: "partner",
    label: "You and your partner disagree",
    situation:
      "One of you believes this is permitted and the other does not, or one of you has stopped being sure.",
    whatsHappening: [
      "Very often the disagreement is not about doctrine but about who carries the physical burden, who carries the moral weight, and whether both of you chose this. A neutral professional helps most here: clinics must offer counselling, and BICA lists independent counsellors.",
    ],
    tryThis: [
      "\"Can we separate what you believe from what you're afraid of? I want to hear both, but I want to know which is which.\"",
      "\"Can we agree a limit now (cycles, money, time) so we're not deciding this while we're exhausted?\"",
    ],
    notYourJob: ["Talking your partner into a procedure they object to, or abandoning your own conviction to keep the peace."],
    exitLine: "\"Let's stop here for tonight. Neither of us decides anything while we're this tired.\"",
  },
  {
    slug: "your-own-doubt",
    label: "You have your own doubts",
    situation:
      "Nobody is challenging you. You believe your tradition disapproves, and you want this anyway.",
    whatsHappening: [
      "The argument here is internal. Guilt and belief are not the same thing; many people carry guilt about a decision they have thought through and would make again.",
    ],
    tryThis: [
      "Write down what you believe, separately from what you were taught to say. Look at the gap without rushing to close it.",
      "Take the specific question to someone who knows the tradition well. \"Is this prohibited?\" often has a more nuanced answer than the version that circulates informally.",
    ],
    notYourJob: ["Resolving a centuries-old theological debate before your next appointment."],
    exitLine: "\"I don't have to have this settled to take the next step. I can keep thinking while I keep going.\"",
  },
];

/** Every fact must be checkable via its link. */
export const GROUNDING_FACTS: { fact: string; source: SourceLink }[] = [
  {
    fact: "Every UK fertility clinic must hold an HFEA licence and, by law, is inspected at least every two years. Treatment here is not unregulated.",
    source: { label: "How we regulate: HFEA", href: "https://www.hfea.gov.uk/about-us/how-we-regulate/" },
  },
  {
    fact: "Donor anonymity ended in the UK in 2005. People conceived from donations made after 1 April 2005 can apply to the HFEA for identifying information about their donor when they turn 18.",
    source: {
      label: "Rules around releasing donor information: HFEA",
      href: "https://www.hfea.gov.uk/donation/donors/rules-around-releasing-donor-information/",
    },
  },
  {
    fact: "Surplus embryos do not have to be discarded. They can be kept in storage, donated to another patient, or donated to research or training. Consent can be varied or withdrawn at any time before the embryos are used.",
    source: {
      label: "Embryo freezing: HFEA",
      href: "https://www.hfea.gov.uk/treatments/fertility-preservation/embryo-freezing/",
    },
  },
  {
    fact: "All clinics licensed by the HFEA must offer you the opportunity to talk to a counsellor before you start treatment.",
    source: {
      label: "Getting emotional support: HFEA",
      href: "https://www.hfea.gov.uk/treatments/explore-all-treatments/getting-emotional-support/",
    },
  },
  {
    fact: "Legal parenthood in donor conception is set by UK law, not by genetics, and depends on the consent forms completed at the clinic. In surrogacy, it passes to the intended parents through a parental order after the birth.",
    source: {
      label: "Legal rights when using surrogates and donors: GOV.UK",
      href: "https://www.gov.uk/legal-rights-when-using-surrogates-and-donors",
    },
  },
];

export interface FaithSupportEntry {
  name: string;
  href: string;
  scope: string;
  body: string;
  /** Further organisations for a card that covers several. */
  links?: SourceLink[];
}

export const FAITH_SUPPORT: FaithSupportEntry[] = [
  {
    name: "Chana",
    href: "https://www.chana.org.uk/",
    scope: "Jewish community · UK",
    body: "Support through infertility and baby loss for the Jewish community, covering the emotional, practical and halachic sides. Confidential helpline and specialist fertility psychotherapists.",
  },
  {
    name: "LGBTQ+ and single people of faith",
    href: "https://www.keshetuk.org/",
    scope: "Faith-specific LGBTQ+ groups · UK",
    body: "None of these is a fertility service. Each is a place to find people from your own tradition who will not be surprised by your family, and who often know which clergy to approach.",
    links: [
      { label: "KeshetUK (Jewish)", href: "https://www.keshetuk.org/" },
      { label: "Imaan (Muslim)", href: "https://imaanlgbtqi.carrd.co/" },
      { label: "Quest (Catholic)", href: "https://questlgbti.uk/" },
      { label: "OneBodyOneFaith (Christian)", href: "https://www.onebodyonefaith.org.uk/" },
    ],
  },
  {
    name: "BICA: Find a Counsellor",
    href: "https://www.bica.net/find-a-counsellor",
    scope: "All faiths and none · UK",
    body: "The professional association for UK fertility counsellors. Choose someone independent of your clinic if you want to talk about belief without it going in your notes.",
  },
  {
    name: "Donor Conception Network",
    href: "https://dcnetwork.org/",
    scope: "Donor-conceived families · UK",
    body: "The UK charity for families created with donor gametes, for all family types, and the best source on how and when to tell a child their story.",
  },
  {
    name: "Your own clinic's counselling service",
    href: "/ivf-finder",
    scope: "Ask before you consent",
    body: "Clinics must offer implications counselling. Ask whether anyone on the team has worked with patients from your tradition.",
  },
];
