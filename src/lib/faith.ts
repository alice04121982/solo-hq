/**
 * Content for /faith — religion, culture and belief around fertility treatment.
 *
 * Editorial rules for anything added to this file. They are not decoration;
 * this is the one area of the site where getting the tone wrong does real
 * harm to a reader who is already having a hard week.
 *
 *  1. Describe, never rule. We say what a tradition teaches. We never tell a
 *     reader what they may do, and we never imply CairnFertility has standing
 *     to issue a religious opinion.
 *  2. No tradition is a monolith. Every entry carries a `viewsDiffer` section,
 *     because the internal disagreement is usually the part a reader actually
 *     needs and the part other sites flatten out.
 *  3. Every factual claim has a source a reader can open and check. Prefer a
 *     tradition's own documents and UK regulators over fertility clinics
 *     writing marketing copy about someone else's religion.
 *  4. Where the honest answer is "this is unsettled", say that on the page
 *     rather than rounding it up to a confident sentence.
 */

export interface SourceLink {
  label: string;
  href: string;
}

export interface FaithTradition {
  slug: string;
  name: string;
  /** Shown when the card is collapsed. Must read as description, not verdict. */
  summary: string;
  /** Where formal teaching generally lands. */
  commonlyTaught: string[];
  /** Real internal disagreement, named plainly. */
  viewsDiffer: string[];
  /** Phrased as questions the reader can take to their own clergy. */
  questionsToAsk: string[];
  /** Observance that changes the treatment calendar or the clinic room. */
  practicalNotes?: string[];
  sources: SourceLink[];
}

/**
 * Ordered roughly by how often UK clinics report being asked about them, not
 * by size or seniority of tradition.
 */
export const FAITH_TRADITIONS: FaithTradition[] = [
  {
    slug: "catholicism",
    name: "Catholicism",
    summary:
      "Formal teaching does not permit IVF, while fully affirming the desire for a child and the grief of infertility.",
    commonlyTaught: [
      "Two documents from the Congregation for the Doctrine of the Faith set the position: Donum Vitae (1987) and Dignitas Personae (2008). Both conclude that conception should arise from the marital act, and that IVF replaces that act rather than assisting it.",
      "The objection is not to treating infertility. Investigation, surgery, hormone treatment and anything that restores the body's own capacity to conceive are encouraged, not discouraged.",
      "The status of the embryo is central. Because the Church holds that a human person exists from conception, the freezing, grading, discarding and research use of surplus embryos are treated as grave matters rather than laboratory admin.",
      "Church documents state plainly that a child conceived through IVF is fully and equally a person of full dignity. Teaching that opposes the procedure does not permit anyone to treat the resulting child, or their parents, as lesser.",
    ],
    viewsDiffer: [
      "Teaching is settled. Practice is not. Large numbers of practising Catholics use IVF, and lay opinion in most countries sits well to the permissive side of the formal position.",
      "Priests vary enormously in pastoral response — from strict counsel to quiet accompaniment. The doctrine you read is fixed; the conversation you get depends heavily on who you ask.",
      "What should happen to embryos already frozen is genuinely unresolved in Catholic bioethics, including the question of whether another woman may adopt and carry them.",
      "Restorative approaches such as NaProTechnology are promoted in some Catholic settings as an alternative to IVF. How their success rates compare with IVF is contested in mainstream fertility medicine, and you are entitled to see the underlying evidence before choosing.",
    ],
    questionsToAsk: [
      "Is there someone in this diocese who regularly accompanies couples through infertility — rather than whichever priest I can get an appointment with first?",
      "If I have already had IVF, what does the Church actually say about my situation and about my child?",
      "If we decide not to pursue IVF, what is here for us? Does anyone in this parish talk about involuntary childlessness?",
      "Can you help me separate what is binding teaching from what is your own view?",
    ],
    sources: [
      {
        label: "Donum Vitae (1987) — full text, vatican.va",
        href: "https://www.vatican.va/roman_curia/congregations/cfaith/documents/rc_con_cfaith_doc_19870222_respect-for-human-life_en.html",
      },
      {
        label: "Dignitas Personae (2008) — full text, vatican.va",
        href: "https://www.vatican.va/roman_curia/congregations/cfaith/documents/rc_con_cfaith_doc_20081208_dignitas-personae_en.html",
      },
      {
        label: "Begotten Not Made — USCCB",
        href: "https://www.usccb.org/issues-and-action/human-life-and-dignity/reproductive-technology/begotten-not-made-a-catholic-view-of-reproductive-technology",
      },
    ],
  },
  {
    slug: "orthodox-christianity",
    name: "Orthodox Christianity",
    summary:
      "Broadly cautious, with real variation between jurisdictions — and rather less central paperwork than people expect.",
    commonlyTaught: [
      "Orthodox churches encourage the medical and surgical treatment of infertility, and treat the desire for children as good.",
      "Because the Church holds that life begins at conception, the creation of surplus embryos is the sharpest point of concern. Some bishops have advised couples to fertilise and transfer as few embryos as possible to avoid producing embryos that will not be used.",
      "Third-party involvement — donor sperm, donor eggs, embryo donation, surrogacy — is widely opposed on the grounds that it introduces a third party into the marriage.",
    ],
    viewsDiffer: [
      "There is no single Orthodox magisterium issuing one binding ruling for all Orthodox Christians. Guidance is issued jurisdiction by jurisdiction, and Greek, Russian, Antiochian, Serbian and other churches have not all landed identically.",
      "Some jurisdictions permit IVF within marriage using the couple's own gametes when no embryos are discarded. Others discourage the procedure altogether. Both positions are held by serious Orthodox theologians.",
      "Economia — the pastoral discretion to apply a rule with mercy in a particular case — means your spiritual father may have more latitude than a written statement suggests. This is a conversation to have in person.",
    ],
    questionsToAsk: [
      "What has our own jurisdiction actually published on this, as distinct from what Orthodoxy in general is said to teach?",
      "If we transfer every embryo we create and freeze none, does that change your counsel?",
      "May we discuss this under economia, and what would that mean in practice for us?",
    ],
    sources: [
      {
        label: "Embryohood, Childhood, Personhood — Public Orthodoxy",
        href: "https://publicorthodoxy.org/2024/04/26/embryohood-childhood-personhood/",
      },
      {
        label: "Religious aspects of assisted reproduction — peer-reviewed overview",
        href: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5096425/",
      },
    ],
  },
  {
    slug: "protestant-anglican",
    name: "Protestant & Anglican Christianity",
    summary:
      "Generally permissive about IVF itself; the disagreement is about donors and about what happens to embryos.",
    commonlyTaught: [
      "Anglican and most mainline Protestant churches have accepted IVF within marriage since the 1980s. The common reasoning is that medicine which helps a couple conceive is a legitimate use of God-given skill.",
      "Most churches in this family accept contraception, and many have argued it would be inconsistent to accept that and then refuse assisted conception.",
      "Concern concentrates on two questions rather than on IVF as a technique: the moral status of surplus embryos, and whether donor gametes introduce a third party into a marriage.",
    ],
    viewsDiffer: [
      "This is the broadest church family on the page and the range inside it is correspondingly wide. Liberal and progressive congregations may actively support solo parents and same-sex couples using donor gametes; conservative evangelical congregations may hold positions closer to Catholic teaching on the embryo.",
      "There is no central authority. A denomination's national statement does not bind your local minister, and your local minister does not bind you.",
      "Views on who may access treatment — married couples only, or also single people and same-sex couples — vary far more within this family than views on the laboratory procedure itself.",
    ],
    questionsToAsk: [
      "What does our denomination actually say, and how much weight does that carry in this congregation?",
      "Would it change your view if we created only as many embryos as we intend to transfer?",
      "If we use a donor, would our child be welcomed here without qualification?",
    ],
    sources: [
      {
        label: "Religious aspects of assisted reproduction — peer-reviewed overview",
        href: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5096425/",
      },
      {
        label: "Is the human embryo sacrosanct? — Progress Educational Trust",
        href: "https://www.progress.org.uk/is-the-human-embryo-sacrosanct-gamete-donation-and-doctrine/",
      },
    ],
  },
  {
    slug: "islam",
    name: "Islam",
    summary:
      "IVF is widely accepted within a marriage using the couple's own gametes. Third-party donation is where Sunni and Shia jurisprudence part company.",
    commonlyTaught: [
      "Fatwas issued from Al-Azhar in Egypt from 1980 onwards established the mainstream Sunni position: IVF is permissible where the sperm is the husband's, the egg is the wife's, and the embryo is transferred to that same wife during a valid marriage.",
      "Treating infertility is regarded positively. Seeking medical help is not seen as a failure of tawakkul (trust in God).",
      "The prohibition on third-party gametes rests on preserving nasab — lineage and the certainty of parentage — which Islamic law treats as a matter of serious public interest, not private preference.",
      "Most scholars hold that treatment must end at the end of the marriage: embryos created during a marriage would not be transferred after divorce or the husband's death.",
    ],
    viewsDiffer: [
      "The Sunni–Shia divergence here is substantial and well documented. Since a 1999 fatwa by Ayatollah Khamenei, third-party egg and sperm donation has been permitted by many Shia authorities under specified conditions — a position most Sunni scholars do not share.",
      "Shia authorities do not agree among themselves either. Different marja' have reached different conclusions, and the consequences for inheritance and for the child's legal parentage are debated even where donation is allowed.",
      "Surrogacy is prohibited in mainstream Sunni jurisprudence and permitted by some Shia jurists — one of the sharpest single differences in this area.",
      "Local custom and family expectation frequently do more work than jurisprudence. Plenty of Muslim patients report that the ruling was the easy part and the family conversation was not.",
    ],
    questionsToAsk: [
      "Which school or which marja' am I following on this, and what have they specifically said — rather than what 'Islam says' in general?",
      "Does the clinic understand that donor gametes are not an option for me, and will it stop suggesting them?",
      "Can the clinic document the chain of custody for our samples so I can be confident nothing was mixed?",
      "How do we schedule stimulation and egg collection around Ramadan, and is fasting safe on these drugs?",
    ],
    practicalNotes: [
      "Fasting and stimulation drugs need planning together. Ask your consultant early whether your protocol is compatible with fasting, and remember that Islamic law itself exempts the sick and those under medical treatment from fasting.",
      "You can ask for female clinicians and sonographers, and for a chaperone. UK clinics are used to this request; make it at booking rather than at the door.",
      "If you avoid porcine- or bovine-derived ingredients, ask the clinic pharmacist for the full ingredient list of each drug you are prescribed, including capsule shells and pessary bases.",
    ],
    sources: [
      {
        label: "Making Muslim Babies: IVF and gamete donation in Sunni versus Shi'a Islam — Inhorn",
        href: "https://link.springer.com/article/10.1007/s11013-006-9027-x",
      },
      {
        label: "The Al-Azhar fatwa on artificial insemination — The Muslim World",
        href: "https://onlinelibrary.wiley.com/doi/10.1111/muwo.12406",
      },
      {
        label: "Sperm donation: a Shia perspective — Journal of Midwifery & Reproductive Health",
        href: "https://jmrh.mums.ac.ir/article_21293.html",
      },
    ],
  },
  {
    slug: "judaism",
    name: "Judaism",
    summary:
      "Among the most supportive traditions on this page. Fertility treatment is widely treated as a mitzvah rather than a concession.",
    commonlyTaught: [
      "The commandment to be fruitful and multiply (Genesis 1:28) gives having children real religious weight, and halacha generally treats medical intervention to overcome infertility as permitted and often encouraged.",
      "There is broad rabbinic agreement that IVF is acceptable where the husband's sperm and the wife's eggs are used.",
      "Embryos are not accorded the status of a full person in halacha, which is why Jewish law is comparatively relaxed about freezing. Wanton destruction is still discouraged.",
      "In observant communities, halachic supervision of the laboratory (mashgichim) is increasingly common, to guard against mix-ups and to keep genetic material accompanied.",
    ],
    viewsDiffer: [
      "Donor gametes are the live question. Orthodox authorities are broadly cautious, particularly about donor sperm; Conservative and Reform authorities are generally more permissive.",
      "Where donation is permitted, rabbis disagree about whether a non-Jewish donor is preferable — a question that turns on lineage and on the halachic definition of who the mother is.",
      "Egg donation raises the maternity question directly: is the mother the woman who provided the egg or the woman who gave birth? This is a genuine, unresolved dispute among poskim, not a settled matter.",
      "Access for single women and same-sex couples varies sharply across the movements, from full support to none.",
    ],
    questionsToAsk: [
      "Would you be willing to speak directly to my clinic about what supervision would involve?",
      "Are there timing constraints — Shabbat, yom tov, counting — that I should give the clinic before they set my protocol?",
      "If we need a donor, what would you advise, and is this a question you would refer on to a specialist posek?",
    ],
    practicalNotes: [
      "Egg collection, transfer and injection timing can collide with Shabbat and festivals. Clinics can often shift a protocol by a day if they know early; they cannot once you are mid-stimulation.",
      "Chana is a UK Jewish charity supporting people through fertility treatment, baby loss and reproductive health, including the halachic and practical sides.",
    ],
    sources: [
      {
        label: "Assisted Reproduction and Judaism — Jewish Virtual Library",
        href: "https://www.jewishvirtuallibrary.org/assisted-reproduction-and-judaism",
      },
      {
        label: "How Orthodox Jewish law is adapting to assisted reproduction — Religion Unplugged",
        href: "https://religionunplugged.com/news/2022/2/1/how-orthodox-jewish-law-is-adapting-to-assisted-reproductive-technology",
      },
      {
        label: "Chana — Jewish fertility support (UK)",
        href: "https://www.chana.org.uk/",
      },
    ],
  },
  {
    slug: "hinduism",
    name: "Hinduism",
    summary:
      "No central prohibition, and a generally permissive approach — with family and lineage expectations often weighing more than doctrine.",
    commonlyTaught: [
      "There is no single Hindu authority and no doctrinal ban on assisted reproduction. Having children is widely understood as part of dharma, which tends to make treatment to overcome infertility easy to justify.",
      "Classical texts contain narratives of conception outside ordinary means, and these are commonly cited as showing that assisted conception is not foreign to the tradition.",
      "Concern, where it exists, is usually about lineage (gotra) and about the destruction of embryos, rather than about the laboratory procedure.",
    ],
    viewsDiffer: [
      "Attitudes to donor gametes range from full acceptance to a preference for the couple's own gametes on lineage grounds. Some families prefer a donor of the same community; others regard that as irrelevant.",
      "Because there is no central ruling body, what you encounter will usually be a family or community position presented as a religious one. Those are worth separating.",
      "Stigma around infertility can be intense and heavily gendered even where the theology is permissive — which is why many Hindu patients treat secrecy as the default.",
    ],
    questionsToAsk: [
      "Is the objection I am hearing actually scriptural, or is it a family expectation wearing scripture's clothes?",
      "Whose opinion in this family will genuinely shape how our child is treated, and do they need to be brought in early?",
      "If lineage is the concern, what would address it — and is that something we are willing to do?",
    ],
    sources: [
      {
        label: "Impact of culture and religion on ART in India — IJRCOG",
        href: "https://www.ijrcog.org/index.php/ijrcog/article/view/17091",
      },
      {
        label: "Is the human embryo sacrosanct? — Progress Educational Trust",
        href: "https://www.progress.org.uk/is-the-human-embryo-sacrosanct-gamete-donation-and-doctrine/",
      },
    ],
  },
  {
    slug: "sikhism",
    name: "Sikhism",
    summary:
      "No prohibition on IVF. Where concern arises it is usually about embryos, about honesty, and about what the community will say.",
    commonlyTaught: [
      "The Sikh Rehat Maryada does not address assisted reproduction, and there is no ruling prohibiting IVF. Medical treatment for infertility is not regarded as interference with divine will.",
      "IVF and IUI using a married couple's own gametes are widely regarded as legitimate.",
      "Concern is most often expressed about the deliberate destruction of embryos, and about anonymity — transparency with a child about their origins fits the tradition's emphasis on truthfulness.",
    ],
    viewsDiffer: [
      "Anonymous donation is discouraged by some Sikh commentators and accepted by others. There is no binding position either way.",
      "Some Sikhs keep treatment private because of community stigma rather than doctrine. That is a social calculation, and a reasonable one, but it is worth naming it as separate from religious obligation.",
    ],
    questionsToAsk: [
      "Is there anything in our tradition that actually prohibits this, or is the discomfort I am sensing about what people will say?",
      "If we use a donor, how and when do we plan to tell our child?",
      "Who in the sangat can we trust with this while we are still deciding?",
    ],
    sources: [
      {
        label: "Is the human embryo sacrosanct? — Progress Educational Trust",
        href: "https://www.progress.org.uk/is-the-human-embryo-sacrosanct-gamete-donation-and-doctrine/",
      },
      {
        label: "Religious aspects of assisted reproduction — peer-reviewed overview",
        href: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5096425/",
      },
    ],
  },
  {
    slug: "buddhism",
    name: "Buddhism",
    summary:
      "No unified position and no central authority. Reasoning tends to run through intention and the relief of suffering.",
    commonlyTaught: [
      "There is no Buddhist governing body issuing rulings on reproductive medicine, and no scriptural prohibition on IVF.",
      "Where the question is engaged, it is usually approached through intention (cetana) and through the reduction of suffering — which tends to support treating infertility.",
      "Ahimsa, non-harm, makes the deliberate destruction of embryos the point of greatest concern for many Buddhist teachers.",
    ],
    viewsDiffer: [
      "Traditions differ on when a being is understood to be present in an embryo, and this shapes how seriously embryo disposal is weighed. Theravada, Mahayana and Vajrayana teachers do not answer this the same way.",
      "Donor conception is widely accepted in Buddhist discussion, often with an accompanying emphasis on the child's right to know their origins.",
      "Because so little is codified, the answer you receive will depend almost entirely on the individual teacher you ask.",
    ],
    questionsToAsk: [
      "How does this teacher understand the status of an early embryo?",
      "If I want to avoid creating embryos I will not transfer, what protocol would let me do that?",
      "What would a compassionate decision look like here, for everyone involved, including a future child?",
    ],
    sources: [
      {
        label: "Religious aspects of assisted reproduction — peer-reviewed overview",
        href: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5096425/",
      },
      {
        label: "Is the human embryo sacrosanct? — Progress Educational Trust",
        href: "https://www.progress.org.uk/is-the-human-embryo-sacrosanct-gamete-donation-and-doctrine/",
      },
    ],
  },
  {
    slug: "interfaith-and-mixed-belief",
    name: "Interfaith, convert & mixed-belief households",
    summary:
      "Two traditions in one house, or one believer and one not. Common, rarely written about, and worth planning for deliberately.",
    commonlyTaught: [
      "There is no tradition to consult here, because the situation is the meeting of two. What exists instead is a set of decisions that are much easier made in advance than in a waiting room.",
      "The recurring flashpoints are consistent: whether to use a donor, what happens to surplus embryos, who is told, and how a child will be raised and identified.",
      "Converts often carry an additional weight — being held to a stricter standard than those born into a community, or fearing that using treatment will be read as insufficient commitment.",
    ],
    viewsDiffer: [
      "Some couples resolve this by following the more restrictive tradition on every point. Others take each decision on its own merits. Neither is wrong, but drifting between the two without saying so is where most conflict comes from.",
      "Where only one partner is observant, the non-observant partner often ends up carrying the practical load of the treatment while the observant partner carries the moral weight. Naming that imbalance early tends to help.",
    ],
    questionsToAsk: [
      "If we disagree about the embryos, what have we agreed to do — before we have any?",
      "Whose community, if either, are we telling? Are we telling them the same thing?",
      "If treatment fails, do we both mean the same thing by stopping?",
      "Would we see a counsellor together before we start, rather than after something goes wrong?",
    ],
    sources: [
      {
        label: "Find a fertility counsellor — BICA",
        href: "https://www.bica.net/find-a-counsellor",
      },
      {
        label: "Rights and the law — Donor Conception Network",
        href: "https://dcnetwork.org/books-and-resources/rights-and-the-law/",
      },
    ],
  },
];

/**
 * The reframe that makes the tradition cards usable: faiths rarely answer
 * "is IVF allowed" as one question. They answer six or seven smaller ones,
 * and a reader who knows which one is being argued about can have a far more
 * productive conversation with their own clergy.
 */
export interface FaithQuestion {
  question: string;
  why: string;
}

export const FAITH_QUESTIONS: FaithQuestion[] = [
  {
    question: "Is conception outside the body acceptable at all?",
    why: "The narrowest objection, and the one that makes Catholic teaching distinctive. Most traditions on this page answer yes; the argument then moves on to the questions below.",
  },
  {
    question: "Whose egg and whose sperm?",
    why: "Third-party donation is the single biggest dividing line across every tradition here. Many that accept IVF without hesitation stop at a donor.",
  },
  {
    question: "What happens to embryos you do not transfer?",
    why: "Freezing, storage limits, donation to research, and discarding. For traditions that hold a person exists from conception, this — not the procedure — is the heart of the matter.",
  },
  {
    question: "Who counts as the parent?",
    why: "Lineage, inheritance and legitimacy. This is a legal and theological question at once, and it is why donor conception is treated so seriously in Islamic and Jewish law.",
  },
  {
    question: "Is surrogacy different?",
    why: "Almost always treated as its own question rather than an extension of IVF, and answered more restrictively.",
  },
  {
    question: "Who may access treatment?",
    why: "Married couples only, or also single people and same-sex couples. Traditions that agree completely about the laboratory can disagree sharply here.",
  },
  {
    question: "What about testing and selecting embryos?",
    why: "PGT and selective reduction raise separate concerns about disability, sex selection and the grounds on which an embryo may be set aside.",
  },
  {
    question: "How do I keep practising while I'm in treatment?",
    why: "Fasting, Sabbath and festival timing, modesty, prayer, medication ingredients. Rarely doctrinal, frequently the thing that actually disrupts a cycle.",
  },
];

/** Cross-tradition practicalities a clinic can accommodate if asked early. */
export const OBSERVANCE_NOTES: { title: string; body: string }[] = [
  {
    title: "Say it at booking, not at the door",
    body: "Requests for a female sonographer, a chaperone, a private room for prayer, or scheduling around a festival are routine for UK clinics — but only if they land before the rota and your protocol are set. Put them in writing when you book.",
  },
  {
    title: "Fasting and stimulation drugs",
    body: "Ramadan, Yom Kippur and other fasts can overlap a stimulation cycle. Ask your consultant specifically whether your protocol is safe alongside fasting, and take that medical answer to your own religious adviser — most traditions exempt those under medical treatment.",
  },
  {
    title: "Check what is in your medication",
    body: "If you avoid porcine, bovine or alcohol-derived ingredients, ask the clinic pharmacist for the full ingredient list of every drug, including capsule shells and pessary bases. Alternatives sometimes exist; nobody will offer them unprompted.",
  },
  {
    title: "You can ask for a faith-aware counsellor",
    body: "UK clinics are required to offer counselling before you consent to treatment. You are allowed to ask for someone who understands your tradition, or to go outside the clinic and find your own.",
  },
  {
    title: "Limiting the embryos you create",
    body: "If surplus embryos are your sticking point, this is a clinical conversation, not only a religious one. Ask what a protocol looks like that fertilises fewer eggs, and ask honestly what it costs you in success rate so you are choosing with the real numbers.",
  },
  {
    title: "Bring your adviser into the room",
    body: "Rabbis, imams and priests can and do speak to clinics directly. A ten-minute call between your adviser and your embryologist resolves more than a month of second-hand messages.",
  },
];

// ─── Difficult conversations ────────────────────────────────────────────────

export interface ConversationScenario {
  slug: string;
  /** Tab label. Short. */
  label: string;
  situation: string;
  /** What is usually driving it — helps a reader respond to the real thing. */
  whatsHappening: string[];
  /** Things a reader can actually say. Written to be said out loud. */
  tryThis: string[];
  /** What they are not obliged to do. */
  notYourJob: string[];
  /** A line to end the conversation with. */
  exitLine: string;
}

export const CONVERSATION_SCENARIOS: ConversationScenario[] = [
  {
    slug: "relative-objects",
    label: "A relative objects on religious grounds",
    situation:
      "A parent, grandparent or elder tells you that what you are doing is against your faith.",
    whatsHappening: [
      "Sometimes this is a genuine doctrinal objection held sincerely. Often it is fear — about your standing in the community, about the child, about being blamed for your choices — reaching for the most authoritative language available.",
      "It is worth finding out which one you are dealing with, because they need different responses. A doctrinal objection can be discussed with a source. Fear cannot be argued down, only reassured or left alone.",
    ],
    tryThis: [
      "\"I know you're saying this because you care. Can you tell me what specifically worries you? I'd rather understand it than guess.\"",
      "\"I've read what our tradition says about this, and I've spoken to someone about it. I'm not doing this casually.\"",
      "\"You don't have to agree with me. I'm not asking for your permission — I'm telling you because you matter to me.\"",
      "\"Can we agree that whatever you think of the treatment, this child will be your grandchild?\"",
    ],
    notYourJob: [
      "Winning a theological argument. You are not obliged to out-scholar anyone about your own body.",
      "Producing a ruling that satisfies them. If they want a religious authority, they can go and consult one themselves.",
      "Managing their feelings about your infertility on top of your own.",
    ],
    exitLine:
      "\"I've heard you. I'm not going to keep discussing it, but I'm not going anywhere either.\"",
  },
  {
    slug: "not-really-yours",
    label: "\"It wouldn't really be your child\"",
    situation:
      "Someone challenges donor conception directly — the child won't be yours, won't be part of the family, won't count.",
    whatsHappening: [
      "This one lands harder than almost anything else, because it goes at the thing you are most afraid of rather than at the procedure.",
      "In traditions where lineage carries legal and religious weight, the person saying it may believe they are stating a fact rather than an insult. That does not make it hurt less, and it does not oblige you to absorb it.",
    ],
    tryThis: [
      "\"That's my child you're talking about. I need you to be careful with how you say that.\"",
      "\"In UK law I am the legal parent from birth. If the question is religious, that's a question for a rabbi/imam/priest — and it's one I've already asked.\"",
      "\"Our child will know exactly where they came from. We're not hiding it, and we're not ashamed of it.\"",
      "\"You can have your view. You can't say that in front of my child.\"",
    ],
    notYourJob: [
      "Justifying your family's legitimacy to someone who has already decided.",
      "Explaining the biology in detail to someone using it as a weapon.",
      "Keeping the peace at your child's expense.",
    ],
    exitLine:
      "\"That's not something I'm willing to debate. Let's talk about something else.\"",
  },
  {
    slug: "community-talk",
    label: "The community is talking",
    situation:
      "Word has spread. You are being discussed at the mosque, the shul, the temple, the church hall, the school gate.",
    whatsHappening: [
      "Community stigma around infertility is often more forceful than any doctrine, and it is frequently gendered — the woman is assumed to be the problem, regardless of the diagnosis.",
      "You have less control over gossip than over any other conversation on this page. What you can control is what is true, who hears it from you first, and how much of your energy it gets.",
    ],
    tryThis: [
      "Choose two or three people and tell them properly, before the story arrives without you in it.",
      "Give a short, flat, repeatable line and use the same one every time: \"We're dealing with some health stuff. We'll share news when there's news.\"",
      "\"I know people are talking. I'd rather you asked me than wondered.\"",
      "If someone brings you gossip: \"I'd rather not hear what other people are saying about me. Thanks for telling me you care.\"",
    ],
    notYourJob: [
      "Correcting every version of the story in circulation.",
      "Attending everything to prove you are fine.",
      "Being the community's teaching example about infertility while you are still in the middle of it.",
    ],
    exitLine:
      "\"There's nothing to update. When there is, you'll hear it from me.\"",
  },
  {
    slug: "unsupportive-leader",
    label: "Your religious leader isn't supportive",
    situation:
      "You went to your priest, imam, rabbi or teacher for guidance and came away feeling judged.",
    whatsHappening: [
      "Clergy are not uniformly trained in reproductive medicine or in pastoral care around infertility. A cold response is often inexperience rather than doctrine.",
      "A tradition's teaching and one representative's delivery of it are different things. You are allowed to seek out a second person within the same tradition without leaving it.",
    ],
    tryThis: [
      "\"Can you help me understand which part of that is binding teaching and which is your own view?\"",
      "\"Is there someone in the community who has accompanied couples through fertility treatment before? I'd like to speak to them.\"",
      "\"I came here for support rather than a ruling. Is that something you're able to offer me?\"",
      "Ask your clinic's counsellor whether they have worked with patients from your tradition — many have, and will not be shocked by any of it.",
    ],
    notYourJob: [
      "Accepting the first answer you are given as the whole of your tradition.",
      "Leaving your faith because one representative handled you badly.",
      "Going back to a person who makes it worse.",
    ],
    exitLine:
      "\"Thank you for your time. I'm going to speak to someone else about this as well.\"",
  },
  {
    slug: "anti-ivf-content",
    label: "Someone sends you anti-IVF content",
    situation:
      "A well-meaning friend forwards a video, an article or a sermon clip about the evils of IVF.",
    whatsHappening: [
      "Much of the anti-IVF material circulating online mixes genuine ethical argument with straightforwardly incorrect claims about the science and the law.",
      "You are allowed to not read it. You are also allowed to check it — some of the ethical arguments in this space are serious and worth engaging with once you are ready, on your own timetable rather than an algorithm's.",
    ],
    tryThis: [
      "\"I'm not going to watch that. I'm in the middle of it and I need to protect my head a bit.\"",
      "\"I've done a lot of reading on this. If you want to talk about it properly some time, I'm up for that — but not by forwarded link.\"",
      "\"Please don't send me things like this while I'm in treatment.\"",
      "Mute, don't argue. You do not owe a group chat a debate.",
    ],
    notYourJob: [
      "Fact-checking everything anyone sends you.",
      "Staying in a group chat that is making treatment harder.",
      "Explaining why the video is wrong to someone who found it convincing.",
    ],
    exitLine:
      "\"I'd rather we didn't do this over text. Let's leave it.\"",
  },
  {
    slug: "partner-disagreement",
    label: "You and your partner disagree",
    situation:
      "One of you believes this is permitted and the other does not — or one of you has stopped being sure.",
    whatsHappening: [
      "This is the hardest conversation on the page, because there is no third party to set a boundary against. It is also the one most improved by a neutral professional in the room.",
      "Very often the disagreement is not really about doctrine. It is about who is carrying the physical burden, who is carrying the moral weight, and whether both of you actually chose this.",
    ],
    tryThis: [
      "\"Can we separate what you believe from what you're afraid of? I want to hear both, but I want to know which is which.\"",
      "\"What would have to be true for you to be at peace with this?\"",
      "\"Can we agree a limit now — cycles, money, time — so we're not deciding this while we're exhausted?\"",
      "\"I'd like us to see a fertility counsellor together. Not because we're in trouble, because this is hard.\"",
    ],
    notYourJob: [
      "Talking your partner into a procedure they object to.",
      "Abandoning your own conviction to keep the peace.",
      "Pretending to be certain when you are not.",
    ],
    exitLine:
      "\"Let's stop here for tonight. Neither of us decides anything while we're this tired.\"",
  },
  {
    slug: "your-own-doubt",
    label: "You have your own doubts",
    situation:
      "Nobody is challenging you. You believe your tradition disapproves, and you want this anyway.",
    whatsHappening: [
      "This is more common than the page's other scenarios and far less discussed, because there is no opponent to describe — the argument is internal.",
      "Guilt and belief are not the same thing. Plenty of people carry guilt about a decision they have thought through carefully and would make again, and plenty of traditions have more room in them than a person under pressure remembers.",
    ],
    tryThis: [
      "Write down what you actually believe, separately from what you were taught to say. Look at the gap without rushing to close it.",
      "Take the specific question to someone who knows the tradition well. \"Is this prohibited?\" often has a more nuanced answer than the version that circulates informally.",
      "Ask whether you are carrying guilt about the treatment or grief about the infertility. They feel similar and need different care.",
      "Find one person from your own background who has done this. It changes the conversation from theory to lived experience faster than anything else.",
    ],
    notYourJob: [
      "Resolving a centuries-old theological debate before your next appointment.",
      "Being a perfect representative of your tradition while you are grieving.",
      "Deciding today.",
    ],
    exitLine:
      "\"I don't have to have this settled to take the next step. I can keep thinking while I keep going.\"",
  },
  {
    slug: "family-gatherings",
    label: "Festivals and family gatherings",
    situation:
      "Eid, Christmas, Diwali, Pesach, a wedding, a naming. Everyone is there and everyone asks.",
    whatsHappening: [
      "Religious calendars are built around family, which makes them precisely the hardest days. The question \"any news?\" is usually affection, badly aimed.",
      "The single most effective thing is deciding your answer and your exit before you walk in, rather than improvising while holding a plate.",
    ],
    tryThis: [
      "Agree one line with your partner and both use it: \"Nothing to report — how are you?\" The redirect does most of the work.",
      "Bring your own transport. Being able to leave changes how the whole day feels, whether or not you use it.",
      "Brief one ally in the room. Someone who can change the subject is worth more than a perfect script.",
      "\"I'll tell you the moment there's anything to tell. Ask me about literally anything else.\"",
      "Decide in advance which parts you will skip. Missing the baby-heavy hour is not a failure of faith.",
    ],
    notYourJob: [
      "Attending every event to prove nothing is wrong.",
      "Holding the newborn if you cannot do it today.",
      "Explaining your absence in detail.",
    ],
    exitLine: "\"We're going to head off — it's been lovely. See you soon.\"",
  },
];

/** Short, reusable lines. Rendered with a copy button so they can be kept on a phone. */
export const BOUNDARY_LINES: string[] = [
  "I'm not discussing this today, but thank you for caring.",
  "We've thought about it a lot, and we've made our decision.",
  "That's between me and my doctor.",
  "I'd rather not talk about it here.",
  "You can disagree with me and still be kind to me.",
  "Please don't bring this up in front of other people.",
  "I'll share news when there's news.",
  "I know you mean well. It's still not something I want to discuss.",
  "That's a question for my rabbi/imam/priest, not for me to argue at dinner.",
  "I need you to be on my side right now, even if you don't understand it.",
];

/**
 * Verifiable points a reader can reach for when a conversation is running on
 * misinformation. Everything here must be checkable via the linked source —
 * do not add persuasive-sounding claims without one.
 */
export const GROUNDING_FACTS: { fact: string; source: SourceLink }[] = [
  {
    fact: "Every UK fertility clinic is licensed and inspected by the HFEA, the statutory regulator. Treatment here is not unregulated.",
    source: { label: "HFEA", href: "https://www.hfea.gov.uk/" },
  },
  {
    fact: "Donor anonymity ended in the UK in 2005. People conceived from donations made after 1 April 2005 can apply to the HFEA for identifying information about their donor when they turn 18.",
    source: {
      label: "Rules around releasing donor information — HFEA",
      href: "https://www.hfea.gov.uk/donation/donors/rules-around-releasing-donor-information/",
    },
  },
  {
    fact: "Surplus embryos do not have to be discarded. They can be kept in storage, donated to another patient, or donated to research — the choice is recorded on your consent forms and you can change it.",
    source: { label: "HFEA", href: "https://www.hfea.gov.uk/" },
  },
  {
    fact: "Clinics must give you the opportunity to receive counselling about the implications of treatment before you consent to it.",
    source: { label: "HFEA", href: "https://www.hfea.gov.uk/" },
  },
  {
    fact: "Legal parenthood in donor conception is set by UK law, not by genetics. Support with the paperwork exists, and getting it right at the clinic stage matters.",
    source: {
      label: "Rights and the law — Donor Conception Network",
      href: "https://dcnetwork.org/books-and-resources/rights-and-the-law/",
    },
  },
];

export const FAITH_SUPPORT: {
  name: string;
  href: string;
  scope: string;
  body: string;
}[] = [
  {
    name: "Chana",
    href: "https://www.chana.org.uk/",
    scope: "Jewish community · UK",
    body: "Support through infertility, baby loss and reproductive health for the Jewish community, covering the emotional, practical and halachic sides together. Confidential helpline and specialist fertility psychotherapists.",
  },
  {
    name: "BICA — Find a Counsellor",
    href: "https://www.bica.net/find-a-counsellor",
    scope: "All faiths and none · UK",
    body: "The professional association for fertility counsellors in the UK. You can search the directory yourself and choose someone independent of your clinic — useful if you want to talk about belief without it going in your notes.",
  },
  {
    name: "Donor Conception Network",
    href: "https://dcnetwork.org/",
    scope: "Donor-conceived families · UK",
    body: "The UK charity for families created with donor gametes. Particularly useful on how and when to tell a child their story — the question that most often follows a religious objection about lineage.",
  },
  {
    name: "HFEA",
    href: "https://www.hfea.gov.uk/",
    scope: "Statutory regulator · UK",
    body: "The regulator's own patient information: what clinics must do, what your consent covers, what happens to embryos, and what donor-conceived people are entitled to know.",
  },
  {
    name: "Your own clinic's counselling service",
    href: "/ivf-finder",
    scope: "Ask before you consent",
    body: "Clinics must offer implications counselling. Ask specifically whether anyone on the team has worked with patients from your tradition — and if the answer is no, ask them to find someone who has.",
  },
];
