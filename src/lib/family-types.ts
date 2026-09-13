/**
 * Owner decision: invented stories and quotes are not shown on any public
 * page until real, consented accounts exist. The `Story` type and the (now
 * empty) `stories` arrays are kept only so `PersonalStories` still compiles.
 * No story may endorse Cairn itself.
 *
 * Sources for the shared lines below (verified 13 September 2026): HFEA
 * Family Formations 2022 (NHS funding by family type; the 2024 trends report
 * has no such split); HFEA surrogacy page (expenses); Brilliant Beginnings
 * budget page (£50,000 to £60,000); PET 19 May 2025 (reform postponed, April
 * 2025 statement); HFE Act 2008 s54A; Golombok et al. 2016, J Fam Psychol
 * 30(4) 409-418.
 */
export type FamilyTypeSlug =
  | "solo-mum"
  | "same-sex-female"
  | "same-sex-male"
  | "single-dad"
  | "heterosexual-couple";

export interface ProcessStep {
  number: number;
  title: string;
  body: string;
}

export interface Story {
  name: string;
  age: number;
  location: string;
  tag: string;
  title: string;
  body: string;
  /**
   * A line lifted verbatim from `body`, pulled out as a speech-bubble quote
   * near the top of the guide. Optional, only the lead story of each family
   * type carries one, since that is the only place a quote is rendered.
   */
  quote?: string;
  treatment: string;
  /**
   * Optional so a story can ship before its photograph exists. Where it is
   * absent the story renders as text alone; do not reuse the family type's
   * own image here, since the guide hero on the same page already shows it.
   */
  image?: string;
  imageAlt?: string;
}

export interface FamilyType {
  slug: FamilyTypeSlug;
  /**
   * The family type category. Doubles as the hero eyebrow, so it deliberately
   * names the family only, routes and donation types vary far too much within
   * a category (home insemination, IUI, a known donor) to be pinned down here.
   */
  label: string;
  headline: string;
  heroCopy: string;
  cardSummary: string;
  /**
   * Optional so a guide can ship before its photograph has been licensed.
   * Where it is absent the hero renders a designed panel instead, never
   * substitute a stock photo of someone else's family to fill the gap.
   */
  image?: string;
  imageAlt?: string;
  hideHeroImage?: boolean;
  /**
   * Renders the family's shape mark (per `FAMILY_SHAPES`) as an oversized
   * backdrop cropped by the hero's top edge, the band-backdrop treatment
   * from `Section`, applied to the guide hero.
   */
  heroShapeBackdrop?: boolean;
  treatmentHighlight: string;
  steps: ProcessStep[];
  stories: Story[];
  clinicNote: string;
  resources: string[];
}

/**
 * Contract C6, adjusted after verification: the family-type split of NHS
 * funding is published only in Family Formations 2022, so the line says 2022.
 */
const NHS_FUNDING_BY_FAMILY_TYPE =
  "In 2022, 18% of single patients and 16% of female same-sex couples aged 18 to 39 had NHS funding for their first IVF cycle, against 52% of opposite-sex couples in the same age group (HFEA, Family Formations 2022).";

const SURROGACY_COSTS =
  "Surrogates can receive only reasonable expenses, typically £10,000 to £15,000 (HFEA). Brilliant Beginnings suggests an overall UK budget of £50,000 to £60,000 once IVF, donor eggs, screening and legal fees are included.";

const SURROGACY_REFORM =
  "Reform proposed by the Law Commission in 2023 has been postponed; the current parental-order process applies.";

export const FAMILY_TYPES: FamilyType[] = [
  {
    slug: "solo-mum",
    label: "Solo Mums",
    headline: "Having a baby\non your own.",
    heroCopy:
      "This guide covers the route to solo motherhood: deciding, choosing a donor and a clinic, treatment, pregnancy and the first year. Start at the step you are on.",
    cardSummary:
      "For anyone who will carry a pregnancy on their own: the decision, treatment, and the first year.",
    image: "/photos/story-solo-mum.webp",
    imageAlt: "A mother holding her young child, looking out at the sky",
    hideHeroImage: true,
    treatmentHighlight: "IUI · IVF · ICSI · Donor Sperm · Donor Eggs · Double Donation",
    steps: [
      {
        number: 1,
        title: "Understand your fertility baseline",
        body: "Start with a fertility MOT: AMH (anti-Müllerian hormone), AFC (antral follicle count), and baseline bloods. These tests show where you stand and help you decide between IUI (simpler, less costly) and IVF (more intensive, higher success rates). AMH can be tested on any day; the AFC scan is timed to the start of your cycle. Set a budget ceiling and a stopping point before you start.",
      },
      {
        number: 2,
        title: "Choose your treatment route",
        body: "IUI uses donor sperm inserted directly into the uterus during ovulation. It's less invasive. IUI typically costs about a quarter of an IVF cycle, plus donor sperm; success rates are around a third of IVF's (HFEA). IVF involves stimulating your ovaries, retrieving eggs, fertilising them in the lab, and transferring an embryo. For women under 35 with good fertility markers, IUI is often a sensible first step.",
      },
      {
        number: 3,
        title: "Select your sperm donor",
        body: "In the UK, HFEA law requires that donors are traceable: your child can access identifying information at 18. You can use a UK sperm bank, or an overseas bank whose donors meet UK rules; your clinic will tell you which banks it accepts. Profiles typically include physical traits, health history, and a personal statement.",
      },
      {
        number: 4,
        title: "Choose your clinic",
        body: `Every UK fertility clinic must be HFEA-licensed. Compare clinics on HFEA-reported success rates for your age bracket, whether they routinely treat single patients, pricing transparency, and waiting times. Our comparison tool lets you do this side by side. ${NHS_FUNDING_BY_FAMILY_TYPE} Check your own ICB or health board's policy before assuming you will pay privately.`,
      },
      {
        number: 5,
        title: "Start treatment",
        body: "Depending on your route, you'll either have a monitored natural or stimulated IUI cycle, or begin IVF stimulation injections. Most clinics assign you a dedicated nurse coordinator. Treatment cycles typically run 2–4 weeks from start to result.",
      },
      {
        number: 6,
        title: "Embryo banking (optional)",
        body: "If you want the option of a second child, you can create and freeze embryos across several egg collections before your first transfer. This is sometimes called 'batch IVF'. Ask your clinic for the cost of each extra collection and of storage before deciding.",
      },
      {
        number: 7,
        title: "Pregnancy and birth",
        body: "Tell your midwife you had fertility treatment. Decide early who will come to scans and who will be your birth partner: a friend, a family member or a doula.",
      },
      {
        number: 8,
        title: "Life ahead as a solo parent",
        body: "A Cambridge study (Golombok and colleagues, 2016) compared 51 solo-mother families with 52 two-parent families, all with children aged 4 to 9 conceived by donor insemination, and found no differences in child adjustment. Our guide on talking to your child about their donor covers what to say and when.",
      },
    ],
    stories: [],
    clinicNote:
      "Filter our comparison tool for donor sperm and IUI or IVF, then compare success rates for your age group alongside cost and waiting times. Ask each clinic whether it routinely treats single patients.",
    resources: [
      "complete-solo-ivf-cost-breakdown",
      "how-to-choose-a-sperm-donor",
      "consultation-questions",
      "donor-conception-legal-parenthood",
      "iui-vs-ivf-vs-donor-eggs",
      "talking-to-child-donor-conception",
    ],
  },
  {
    slug: "same-sex-female",
    label: "Two Mums",
    headline: "Two mums:\nwho carries, and how.",
    heroCopy:
      "For two women building a family together: who carries, reciprocal IVF, and legal parenthood for both of you. Start at the step you are on.",
    cardSummary:
      "For two women building a family: who carries, the routes open to you, and legal parenthood for both mums.",
    heroShapeBackdrop: true,
    treatmentHighlight: "IUI · IVF · ICSI · Reciprocal IVF · Donor Sperm · Donor Eggs · Double Donation",
    steps: [
      {
        number: 1,
        title: "Decide who carries (or both)",
        body: "The first decision is whether one of you will carry, both of you will carry (reciprocal IVF), or you'll take turns. The choice depends on fertility markers, physical health, how each of you feels about pregnancy, and practical factors such as work.",
      },
      {
        number: 2,
        title: "Fertility assessments for the carrying partner(s)",
        body: "The partner who will carry (or both, if considering reciprocal IVF) should have a fertility MOT: AMH, AFC, and baseline bloods. This helps your clinic recommend IUI (simpler) or IVF (more effective). If egg quality turns out to be a problem, donor eggs and double donation are open to you as to any other patient.",
      },
      {
        number: 3,
        title: "Explore reciprocal IVF",
        body: "Reciprocal IVF (also called ROPA, Reception of Oocytes from Partner) means one partner provides the eggs, those eggs are fertilised with donor sperm, and the resulting embryo is carried by the other partner. Ask clinics for an itemised quote, since it involves treatment for both of you. Legally, the partner who gives birth is the mother. Providing the eggs does not make the other partner a parent on its own; marriage, civil partnership or signed consent forms before treatment do.",
      },
      {
        number: 4,
        title: "Choose your sperm donor",
        body: "UK law requires donors to be traceable: your child can request identifying information at 18. You can use donor sperm from an overseas bank, but a UK clinic will only accept donors who meet UK rules, including being identifiable to your child at 18. Ask your clinic which banks it works with.",
      },
      {
        number: 5,
        title: "Choose your clinic",
        body: `Ask HFEA-licensed clinics about their experience with same-sex couples and reciprocal IVF, their waiting times, and whether both partners are included in consultations and monitoring. ${NHS_FUNDING_BY_FAMILY_TYPE} Check your own ICB or health board's policy before assuming you will pay privately.`,
      },
      {
        number: 6,
        title: "Treatment and the two-week wait",
        body: "For IUI, the carrying partner attends for insemination during ovulation. For IVF, stimulation injections begin around day 2 of the cycle. For reciprocal IVF, the egg-providing partner goes through stimulation and retrieval while the carrying partner takes hormones to prepare her uterus for transfer.",
      },
      {
        number: 7,
        title: "Legal parenthood for both partners",
        body: "In the UK, if you conceive at an HFEA-licensed clinic, the non-carrying partner can be a legal parent from birth. If you are married or in a civil partnership at the time of treatment, she is the second legal parent automatically (unless she does not consent). If you are not married or civilly partnered, she can still become the second legal parent by signing the clinic's parenthood consent forms with you before treatment starts, under the Human Fertilisation and Embryology Act 2008. Ask your clinic for these forms early, and get legal advice if anything is unclear.",
      },
      {
        number: 8,
        title: "Pregnancy, birth, and building your family",
        body: "Pregnancy as a same-sex couple is medically the same as any other pregnancy. Expect other people's assumptions about who the mother is. The Donor Conception Network runs groups for two-mum families.",
      },
    ],
    stories: [],
    clinicNote:
      "Filter our comparison tool for donor sperm and IUI or IVF, then compare success rates for your age group alongside cost and waiting times. The tool does not flag reciprocal IVF; ask each clinic directly.",
    resources: [
      "iui-vs-ivf-vs-donor-eggs",
      "how-to-choose-a-sperm-donor",
      "consultation-questions",
      "donor-conception-legal-parenthood",
      "talking-to-child-donor-conception",
      "understanding-hfea-success-rates",
    ],
  },
  {
    slug: "same-sex-male",
    label: "Two Dads",
    headline: "Two dads:\nsurrogacy, step by step.",
    heroCopy:
      "For two men becoming fathers through surrogacy in the UK: finding a surrogate, IVF with donor eggs, and the parental order that makes you the legal parents. Matching and the court process both take time.",
    cardSummary:
      "For two men building a family: finding a surrogate, treatment, and becoming legal parents.",
    treatmentHighlight: "Surrogacy · IVF · ICSI · Donor Eggs",
    steps: [
      {
        number: 1,
        title: "Understand UK surrogacy law",
        body: `In the UK, surrogacy is legal but commercial surrogacy is not. ${SURROGACY_COSTS} The surrogate is the legal mother at birth, even if she has no genetic connection to the child. A parental order after birth makes you the legal parents: this is possible, but it often takes a long time and involves a court process. ${SURROGACY_REFORM}`,
      },
      {
        number: 2,
        title: "Find a surrogate",
        body: "Many intended parents find a surrogate through a not-for-profit organisation such as Surrogacy UK, Brilliant Beginnings or My Surrogacy Journey. There are more intended parents than surrogates, so matching is not guaranteed and can take a long time. The matching process involves detailed conversations about expectations, values, and the type of ongoing relationship you want.",
      },
      {
        number: 3,
        title: "Choose your egg donor",
        body: "You'll need an egg donor. UK egg donation is altruistic and donor-conceived individuals have the right to identifying information at 18. UK egg banks are available. A UK clinic can also import eggs from an overseas bank, but only from donors who meet UK rules, including being identifiable to your child at 18. Ask your clinic to confirm this before you choose. Decide together which of you (or both, using two separate embryos) will provide the sperm for fertilisation.",
      },
      {
        number: 4,
        title: "Get legal advice before treatment starts",
        body: "Get advice from a specialist fertility or surrogacy solicitor before treatment starts. Many intended parents and surrogates write down what they have agreed (contact, expenses, difficult scenarios). This helps everyone, but UK surrogacy agreements are not legally enforceable.",
      },
      {
        number: 5,
        title: "IVF at an HFEA-licensed clinic",
        body: "The eggs are fertilised with one or both partners' sperm using IVF or ICSI. The resulting embryos are graded, and selected embryos are transferred to your surrogate. Many couples create multiple embryos to freeze, providing options for future pregnancies. Choose a clinic with experience in surrogacy arrangements.",
      },
      {
        number: 6,
        title: "Support your surrogate through pregnancy",
        body: "Your surrogate is carrying your child and her wellbeing directly affects the pregnancy. Most surrogacy arrangements involve regular contact and attending scans. Agree boundaries and expectations early, and revisit them as the pregnancy goes on.",
      },
      {
        number: 7,
        title: "Birth and immediate legal steps",
        body: "At birth, your surrogate is the legal mother. If she is married or in a civil partnership, her spouse is normally the second legal parent unless they did not consent, whatever your own relationship status. A parental order transfers legal parenthood to you. Apply within 6 months of the birth.",
      },
      {
        number: 8,
        title: "Life as two dads",
        body: "Research so far finds children in two-dad families do as well as others. The route is longer than most, and the conversations you have before and during it (with each other, your surrogate and your donor's clinic) are the ones your child will later ask about; our guide on talking to your child covers them.",
      },
    ],
    stories: [],
    clinicNote:
      "Filter our comparison tool for donor egg IVF and ICSI, then ask each clinic how many surrogacy arrangements it has treated and how it works with your surrogate's own GP and hospital.",
    resources: [
      "consultation-questions",
      "donor-conception-legal-parenthood",
      "complete-solo-ivf-cost-breakdown",
      "understanding-hfea-success-rates",
      "talking-to-child-donor-conception",
    ],
  },
  {
    slug: "single-dad",
    label: "Solo Dads",
    headline: "Solo fatherhood\nvia surrogacy.",
    heroCopy:
      "For a man having a baby on his own through surrogacy with donor eggs: the legal steps, finding a surrogate, treatment, and the parental order. It is possible, but it often takes a long time and involves a court process.",
    cardSummary:
      "For men having a baby on their own: the surrogacy process, the legal steps, and life as a solo dad.",
    treatmentHighlight: "Surrogacy · IVF · ICSI · Donor Eggs",
    steps: [
      {
        number: 1,
        title: "Know your legal landscape",
        body: `UK surrogacy is legal and altruistic. ${SURROGACY_COSTS} The surrogate is the legal mother at birth, regardless of genetics. Since 3 January 2019 a single applicant can apply for a parental order (section 54A of the Human Fertilisation and Embryology Act 2008) if your own sperm was used, the child's home is with you and you are domiciled in the UK. ${SURROGACY_REFORM} Get specialist legal advice from a surrogacy solicitor at the start.`,
      },
      {
        number: 2,
        title: "Connect with the surrogacy organisations",
        body: "Solo fatherhood via surrogacy is less common than for couples. Surrogacy UK, Brilliant Beginnings and My Surrogacy Journey match intended parents with surrogates; ask each whether it works with single intended fathers. There are more intended parents than surrogates, so matching can take a long time.",
      },
      {
        number: 3,
        title: "Find your surrogate",
        body: "The matching process involves conversations about values, expectations for the relationship during and after pregnancy, and what role (if any) your surrogate would like in your child's life.",
      },
      {
        number: 4,
        title: "Choose your egg donor",
        body: "In the UK, egg donors are identifiable at your child's request from age 18. UK egg banks are available. A UK clinic can also import eggs from an overseas bank, but only from donors who meet UK rules, including being identifiable to your child at 18. Ask your clinic to confirm this before you choose. When choosing, consider health screening and whether the donor has donated before.",
      },
      {
        number: 5,
        title: "IVF treatment",
        body: "Your sperm is used to fertilise the donor eggs via IVF or ICSI at an HFEA-licensed clinic. Resulting embryos are graded and a selected embryo is transferred to your surrogate. Many dads freeze additional embryos at this stage, preserving the option for a second child from the same donor.",
      },
      {
        number: 6,
        title: "Supporting your surrogate",
        body: "Most arrangements involve regular contact and attending scans where invited. Agree boundaries and expectations early, and revisit them as the pregnancy goes on.",
      },
      {
        number: 7,
        title: "Birth and parental order",
        body: "Apply for your parental order within 6 months of the birth. As a single applicant you must show that your sperm was used, that the child's home is with you and that you are domiciled in the UK; the surrogate's consent counts only once the child is at least six weeks old. The process is possible, but it often takes a long time and involves a court process. A specialist solicitor usually prepares the application.",
      },
      {
        number: 8,
        title: "Solo fatherhood: building your village",
        body: "Arrange practical childcare, trusted family or friends, and contact with other solo parents before your child arrives. The wider solo parent networks include solo dads by choice.",
      },
    ],
    stories: [],
    clinicNote:
      "Filter our comparison tool for donor egg IVF and ICSI, then ask each clinic how many single intended fathers and surrogacy arrangements it has treated.",
    resources: [
      "consultation-questions",
      "donor-conception-legal-parenthood",
      "complete-solo-ivf-cost-breakdown",
      "understanding-hfea-success-rates",
      "talking-to-child-donor-conception",
    ],
  },
  {
    slug: "heterosexual-couple",
    label: "Couples (opposite-sex)",
    headline: "When getting pregnant\nneeds help.",
    heroCopy:
      "For couples who need help conceiving: investigations, diagnosis, NHS and private options, and treatment from stimulation to transfer. Start at the step you are on.",
    cardSummary:
      "For couples who need help conceiving: investigations, diagnoses, and choosing a treatment.",
    treatmentHighlight: "IUI · IVF · ICSI · Donor Sperm · Donor Eggs · Double Donation",
    steps: [
      {
        number: 1,
        title: "Initial investigations for both of you",
        body: "Fertility investigation is a two-person process. For women: AMH, AFC, day 2/3 bloods, and ideally a HyCoSy (tube patency test). For men: a semen analysis covering count, motility, and morphology. These tests take 2–4 weeks and give your clinic the information they need to recommend the right treatment route.",
      },
      {
        number: 2,
        title: "Understand your diagnosis",
        body: "The most common diagnoses are male factor infertility (MFI, which is common), PCOS (polycystic ovary syndrome), endometriosis, low ovarian reserve, or 'unexplained infertility' (no identifiable cause, about 1 in 4 couples according to the NHS). Each has different treatment implications. Ask your consultant to explain the evidence for your specific situation.",
      },
      {
        number: 3,
        title: "Explore your treatment options",
        body: "IUI (intrauterine insemination) works for mild MFI and ovulatory dysfunction; it's less invasive and cheaper. IVF suits moderate-to-severe MFI, tubal issues, or unexplained infertility after IUI fails. ICSI (injecting a single sperm directly into an egg) is used for severe MFI or fertilisation failure. Donor eggs or sperm are options when your own gametes aren't viable. If you need a surrogate (after a hysterectomy, for example), the surrogacy steps in our two-dads guide are the same for any couple.",
      },
      {
        number: 4,
        title: "NHS vs private: understanding your options",
        body: "NHS IVF funding in England varies by Integrated Care Board. Most English boards fund one cycle, and only two fund the three NICE recommends (PET, February 2026). Check your local criteria carefully; they vary by age, BMI and existing children. If you don't qualify or can't wait, private treatment gives you more control over timing and clinic choice.",
      },
      {
        number: 5,
        title: "Starting IVF: stimulation and egg collection",
        body: "IVF begins with ovarian stimulation injections (typically 10–14 days). You'll have regular monitoring scans to track follicle growth. Egg collection is a day-case procedure under sedation. Your partner provides a sperm sample the same day. Fertilisation happens in the lab overnight. You'll hear how many embryos have developed the next morning.",
      },
      {
        number: 6,
        title: "Embryo transfer and the two-week wait",
        body: "The best embryo is selected for transfer, usually on day 5 (blastocyst stage). Transfer is usually quick and feels similar to a smear test; tell your clinic if smears are difficult for you. Then comes the two-week wait before a pregnancy test.",
      },
      {
        number: 7,
        title: "After a cycle: the review",
        body: "Most IVF cycles don't succeed first time. After a failed cycle your consultant should offer a review: what happened, what (if anything) can be changed, and whether to proceed with a frozen embryo transfer (if you have frozen embryos) or a new cycle.",
      },
      {
        number: 8,
        title: "Pregnancy after IVF",
        body: "Anxiety in pregnancy after fertility treatment is common, even when everything looks fine. Stay in contact with your clinic until the midwife handover, and tell your midwife you've been through IVF; it changes the care they offer.",
      },
    ],
    stories: [],
    clinicNote:
      "Use our comparison tool to filter by the treatment you need (IVF, ICSI, IUI or donor gametes), then compare success rates for your age group alongside cost, waiting times and how the clinic treats patients. A clinic's rate is an average, not your personal chance.",
    resources: [
      "iui-vs-ivf-vs-donor-eggs",
      "consultation-questions",
      "understanding-hfea-success-rates",
      "complete-solo-ivf-cost-breakdown",
      "ivf-budget-template",
      "donor-conception-legal-parenthood",
    ],
  },
];

export function getFamilyType(slug: string): FamilyType | undefined {
  return FAMILY_TYPES.find((f) => f.slug === slug);
}
