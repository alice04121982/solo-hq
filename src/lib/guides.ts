/**
 * The resource library: ten guides, each with the sources it rests on and the
 * date it was last read against them. Every source URL was fetched on the
 * lastReviewed date and returned the page cited. scripts/check-data.ts fails
 * the build when a guide's review date goes stale.
 */

import type { SupportAnchor } from "@/lib/support";

export interface GuideSource {
  label: string;
  href: string;
}

export interface GuideLink {
  label: string;
  href: string;
}

export interface GuideSection {
  heading: string;
  body: string[];
  bullets?: string[];
  postBody?: string[];
  postBullets?: string[];
  numbered?: string[];
  callout?: string;
  calloutDownload?: string;
  /** Internal links rendered after the section's text. */
  links?: GuideLink[];
}

export interface Guide {
  slug: string;
  title: string;
  type: "Guide" | "Checklist" | "Template" | "Explainer" | "Reading list";
  category: string;
  categorySlug: string;
  readTime: string;
  intro: string;
  sections: GuideSection[];
  keyTakeaways?: string[];
  /** At least one. Rendered under Key takeaways. */
  sources: GuideSource[];
  /** Display form, e.g. "13 September 2026". check-data.ts parses it. */
  lastReviewed: string;
  /** When set, the guide header links to /support#<anchor>. */
  supportAnchor?: SupportAnchor;
}

const REVIEWED = "13 September 2026";

// Sources shared between guides. Each was fetched on the review date.
const SRC = {
  cma: {
    label: "CMA, Fertility treatment: a guide to your consumer rights (10 June 2021)",
    href: "https://www.gov.uk/government/publications/fertility-treatment-a-guide-to-your-consumer-rights/a-guide-to-your-consumer-rights",
  },
  hfeaIcsi: {
    label: "HFEA, Intracytoplasmic sperm injection (ICSI)",
    href: "https://www.hfea.gov.uk/treatments/explore-all-treatments/intracytoplasmic-sperm-injection-icsi/",
  },
  hfeaAddOns: {
    label: "HFEA, Treatment add-ons (reviewed 26 February 2026)",
    href: "https://www.hfea.gov.uk/treatments/treatment-add-ons/",
  },
  hfeaIvf: {
    label: "HFEA, In vitro fertilisation (IVF)",
    href: "https://www.hfea.gov.uk/treatments/explore-all-treatments/in-vitro-fertilisation-ivf/",
  },
  hfeaIui: {
    label: "HFEA, Intrauterine insemination (IUI)",
    href: "https://www.hfea.gov.uk/treatments/explore-all-treatments/intrauterine-insemination-iui/",
  },
  hfea2024: {
    label: "HFEA, Fertility treatment 2024: trends and figures (16 June 2026)",
    href: "https://www.hfea.gov.uk/about-us/publications/research-and-data/fertility-treatment-2024-trends-and-figures",
  },
  hfea2019: {
    label: "HFEA, Fertility treatment 2019: trends and figures",
    href: "https://www.hfea.gov.uk/about-us/publications/research-and-data/fertility-treatment-2019-trends-and-figures/",
  },
  hfeaChoose: {
    label: "HFEA, Choose a fertility clinic",
    href: "https://www.hfea.gov.uk/choose-a-fertility-clinic/",
  },
  hfeaCounselling: {
    label: "HFEA, Getting emotional support",
    href: "https://www.hfea.gov.uk/treatments/explore-all-treatments/getting-emotional-support",
  },
  hfeaDonatingSperm: {
    label: "HFEA, Donating your sperm",
    href: "https://www.hfea.gov.uk/donation/donors/donating-your-sperm/",
  },
  hfeaDonorFaqs: {
    label: "HFEA, FAQs for donors, donor-conceived people and their parents",
    href: "https://www.hfea.gov.uk/donation/donors/faqs-for-donors-donor-conceived-people-and-their-parents/",
  },
  hfeaUnregulated: {
    label: "HFEA, FAQs relating to unregulated sperm donation",
    href: "https://www.hfea.gov.uk/about-us/media-centre/faqs-relating-to-unregulated-sperm-donation",
  },
  hfeaFindingOut: {
    label: "HFEA, Finding out about your donor",
    href: "https://www.hfea.gov.uk/donation/finding-out-about-your-donor/",
  },
  hfeaDsl: {
    label: "HFEA, Donor Sibling Link",
    href: "https://www.hfea.gov.uk/donation/finding-out-about-your-donor/donor-sibling-link-dsl/",
  },
  hfeaSurrogacy: {
    label: "HFEA, Surrogacy",
    href: "https://www.hfea.gov.uk/treatments/explore-all-treatments/surrogacy/",
  },
  hfeaCop2021: {
    label: "HFEA, Code of Practice update, October 2021 (guidance note 11, donor screening and quarantine)",
    href: "https://www.hfea.gov.uk/media/3437/code-of-practice-annexes-october-2021.pdf",
  },
  hfeAct2008Part2: {
    label: "Human Fertilisation and Embryology Act 2008, Part 2 (parenthood)",
    href: "https://www.legislation.gov.uk/ukpga/2008/22/part/2",
  },
  hfeActS33: {
    label: "Human Fertilisation and Embryology Act 2008, section 33 (meaning of mother)",
    href: "https://www.legislation.gov.uk/ukpga/2008/22/section/33",
  },
  hfeActS54: {
    label: "Human Fertilisation and Embryology Act 2008, section 54 (parental orders: two applicants)",
    href: "https://www.legislation.gov.uk/ukpga/2008/22/section/54",
  },
  hfeActS54A: {
    label: "Human Fertilisation and Embryology Act 2008, section 54A (parental orders: one applicant)",
    href: "https://www.legislation.gov.uk/ukpga/2008/22/section/54A",
  },
  nice257: {
    label: "NICE guideline NG257, Fertility problems: assessment and treatment (2026)",
    href: "https://www.nice.org.uk/guidance/ng257",
  },
  createCosts: {
    label: "CREATE Fertility, IVF and fertility treatment costs (read September 2026)",
    href: "https://www.createfertility.co.uk/costs",
  },
  lwcPrices: {
    label: "London Women's Clinic, prices (read September 2026)",
    href: "https://www.londonwomensclinic.com/about/prices/",
  },
  bournHallPrices: {
    label: "Bourn Hall, our prices (read September 2026)",
    href: "https://www.bournhall.co.uk/fees-funding/our-prices/",
  },
  lsb: {
    label: "London Sperm Bank, sample types and prices (read September 2026)",
    href: "https://www.londonspermbank.com/catalogue/our-sample-types-ivficsi-ici-iui/",
  },
  esb: {
    label: "European Sperm Bank, donor sperm prices (read September 2026)",
    href: "https://www.europeanspermbank.com/en/ordering/donor-sperm-prices",
  },
  ilioi2017: {
    label: "Ilioi et al. 2017, J Child Psychol Psychiatry: age of disclosure and adolescent wellbeing (PMC5324532)",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5324532/",
  },
  golombok2016: {
    label: "Golombok et al. 2016, J Fam Psychol: single mothers by choice (PMC4886836)",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4886836/",
  },
  dcnBooks: {
    label: "Donor Conception Network, Telling & Talking books",
    href: "https://dcnetwork.org/telling-and-talking/books/",
  },
} as const satisfies Record<string, GuideSource>;

export const GUIDES: Guide[] = [
  // Finance & Costs
  {
    slug: "complete-solo-ivf-cost-breakdown",
    title: "What IVF really costs",
    type: "Guide",
    category: "Finance & Costs",
    categorySlug: "finance-costs",
    readTime: "8 min read",
    supportAnchor: "money",
    intro:
      "The headline IVF price on a clinic's website covers the core cycle. Drugs, donor sperm or eggs, tests, ICSI and storage are usually charged on top. This guide lists each line, with the price ranges we found on published UK price lists, so you can build a budget before you begin. The worked example uses donor sperm; the last section shows which lines change for other families.",
    sections: [
      {
        heading: "What the headline price covers",
        body: [
          "Most headline figures cover the core IVF cycle: monitoring, egg collection, fertilisation and embryo transfer. Drugs, donor sperm or eggs, pre-treatment tests, ICSI, freezing and storage are usually separate lines. Under consumer law, a clinic's advertised price should not leave out costs it knows you will have to pay, and you are entitled to a written, costed treatment plan before you agree to treatment (CMA, 'Fertility treatment: a guide to your consumer rights').",
          "Ask each clinic for an itemised written quote. Verbal estimates are not reliable, and costs vary between clinics.",
        ],
      },
      {
        heading: "The full cost breakdown",
        body: [
          "These are the cost categories for one IVF cycle using donor sperm at a UK clinic. Ranges are from published price lists checked in September 2026:",
        ],
        bullets: [
          "IVF cycle (headline price): £3,500–£6,500 depending on clinic and location",
          "ICSI: £800–£1,500 if not included. Not routinely needed with good-quality donor sperm; some clinics recommend it depending on the vial. Ask why if it is on your quote.",
          "Stimulation drugs: £1,000–£2,500 per cycle (varies with protocol)",
          "Monitoring scans (if not included): £200–£600",
          "Donor sperm: roughly £1,000–£1,800 a vial at UK-facing banks, plus VAT on imports, a family-slot or reservation fee and shipping (bank price lists, September 2026)",
          "Sperm import and handling fee: £300–£600",
          "CMV testing and additional screening: £100–£300",
          "Counselling: clinics must offer it. Some include it in the price; others charge. Ask.",
          "Initial consultation: £150–£300",
          "Baseline blood tests and scans: £200–£500",
          "Embryo freezing: £300–£500, charged once",
          "Embryo storage: £300–£500 per year",
          "Frozen embryo transfer (FET) cycle: £1,200–£2,500 per transfer",
          "Add-ons (optional, £500–£3,000): the HFEA rates most, including PGT-A, embryo glue and assisted hatching, as not shown to improve your chance of a baby, and says that for most patients routine cycles of proven treatment are effective without any add-ons. Check its traffic-light ratings before paying.",
        ],
      },
      {
        heading: "A worked example",
        body: [
          "Adding the lines above for one IVF cycle with one vial of donor sperm, and no ICSI, freezing or add-ons: consultation £150–£300, baseline tests £200–£500, IVF cycle £3,500–£6,500, drugs £1,000–£2,500, monitoring £200–£600, one vial £1,000–£1,800, import and handling £300–£600. Total: roughly £6,350–£12,800. ICSI adds £800–£1,500; freezing plus a year's storage adds £600–£1,000; each frozen transfer adds £1,200–£2,500.",
          "For scale, headline IVF prices on published lists checked in September 2026 were from £3,795 at CREATE Fertility (excludes drugs, monitoring bloods, sedation and the HFEA fee), £3,995 at London Women's Clinic and £4,495 at Bourn Hall (includes monitoring, scans, sedation, counselling and the HFEA fee; drugs extra). London Women's Clinic's own estimate of a typical total is £9,140–£10,640. The HFEA says one cycle of IVF costs about £5,000 on average.",
          "Many people need more than one cycle, and chances depend a lot on age. If you can, find out in advance what a second attempt would cost, so that money is not the only thing deciding what happens next. Ask the clinic what happens to the fee if a cycle is cancelled part way through.",
        ],
      },
      {
        heading: "Costs you can reduce",
        body: ["Not all of these costs are fixed. Where there is room to reduce spend:"],
        bullets: [
          "Sperm banks: compare banks' total costs, including slot and shipping fees, not just the vial price. Donors are usually listed by one bank, so the same donor is rarely cheaper elsewhere.",
          "Drug prices vary between pharmacies. Ask your clinic whether you can get quotes from more than one.",
          "Multi-cycle packages: some clinics offer them. They save money only if you go on to need more than one cycle; ask for the terms in writing, including what happens to the balance if you conceive on the first.",
          "Monitoring scans: some clinics allow you to do mid-cycle monitoring scans at a local clinic or hospital rather than travelling back to the treating clinic for every appointment.",
          "Consultations: ask which follow-ups are charged and whether some questions can be handled by your nurse coordinator.",
        ],
      },
      {
        heading: "If this doesn't match your family",
        body: ["The list above is for one patient using donor sperm. Adjust it like this:"],
        bullets: [
          "Partner sperm (a woman and a man, or anyone using a partner's sperm): drop the donor sperm, import and handling, and CMV lines. A semen analysis is usually part of the baseline tests.",
          "Reciprocal IVF (one partner provides the eggs, the other carries): add a second patient's baseline tests, consultations and monitoring, and ask for one itemised quote that covers both of you.",
          "Donor eggs: replace the donor sperm lines with the clinic's egg donation programme price. It usually includes the donor's screening and drugs; ask what it excludes.",
          "Two dads and solo dads: add an egg donation programme, priced separately by each clinic; the surrogate's expenses, which the HFEA says are typically £10,000 to £15,000; and legal fees for the parental order. The surrogacy family guides cover the process.",
        ],
        links: [
          { label: "Two dads: the surrogacy route", href: "/families/same-sex-male" },
          { label: "Solo dads: the surrogacy route", href: "/families/single-dad" },
        ],
      },
    ],
    keyTakeaways: [
      "Ask for a full itemised written quote; you are entitled to a written, costed treatment plan before you agree to treatment",
      "Drugs, donor sperm, tests, ICSI and storage are usually charged on top of the headline price",
      "One IVF cycle with one vial of donor sperm commonly comes to roughly £6,350–£12,800 before ICSI, freezing, add-ons or frozen transfers",
      "ICSI is not routinely needed with good-quality donor sperm; ask why if it is on your quote",
      "Add-ons are optional; check the HFEA's traffic-light ratings before paying",
    ],
    sources: [
      SRC.cma,
      SRC.hfeaIcsi,
      SRC.hfeaAddOns,
      SRC.hfeaIvf,
      SRC.hfeaCounselling,
      SRC.createCosts,
      SRC.lwcPrices,
      SRC.bournHallPrices,
      SRC.lsb,
      SRC.esb,
      SRC.hfeaSurrogacy,
    ],
    lastReviewed: REVIEWED,
  },

  {
    slug: "ivf-budget-template",
    title: "IVF budget template (donor sperm)",
    type: "Template",
    category: "Finance & Costs",
    categorySlug: "finance-costs",
    readTime: "3 min read",
    intro:
      "A budget template built around one IVF cycle using donor sperm. Drop the donor lines if they do not apply, and replace the ranges with the figures on your clinic's itemised written quote.",
    sections: [
      {
        heading: "How to use this template",
        body: [
          "Enter the figures from your clinic's written quote, and use the contingency column for costs the quote does not cover. The line-by-line guide explains what each item is and what it commonly costs.",
        ],
        links: [{ label: "What IVF really costs", href: "/resources/complete-solo-ivf-cost-breakdown" }],
      },
      {
        heading: "One-time and annual costs",
        body: ["These costs occur once, or once a year, regardless of how many cycles you complete:"],
        bullets: [
          "Initial consultation fee: £150–£300",
          "Baseline tests (AMH and FSH bloods, AFC scan, blood panel): £200–£500",
          "Counselling: clinics must offer it. Ask whether it is in your quote.",
          "Donor sperm selection (bank registration fee): £0–£150",
          "Sperm vials: roughly £1,000–£1,800 a vial at UK-facing banks, plus VAT on imports, a family-slot or reservation fee and shipping (bank price lists, September 2026). Multiply by the number of vials you buy. Some people buy extra vials for a possible sibling. Ask about storage costs and whether unused vials can be sold back.",
          "Sperm import and quarantine: £300–£600",
          "Sperm storage at clinic (annual): £200–£400/year",
          "Embryo storage (annual): £300–£500 per year",
        ],
      },
      {
        heading: "Per-cycle costs",
        body: ["These costs apply to every treatment cycle:"],
        bullets: [
          "IVF base fee: £3,500–£6,500",
          "ICSI: £800–£1,500 if not included. Not routinely needed with good-quality donor sperm; some clinics recommend it depending on the vial. Ask why if it is on your quote.",
          "Stimulation drugs: £1,000–£2,500 (request an estimate based on your AMH)",
          "Monitoring scans (if not included): £200–£600",
          "Embryo freezing (if applicable): £300–£500, charged once per cycle that produces embryos to freeze",
        ],
      },
      {
        heading: "Frozen embryo transfer (FET) costs",
        body: ["If you have frozen embryos from a stimulated cycle, each transfer costs less than a full cycle:"],
        bullets: [
          "FET cycle fee: £1,200–£2,500",
          "Endometrial preparation drugs (usually progesterone and oestrogen): £200–£500",
          "Monitoring scans: £200–£400 (or included in FET fee)",
        ],
      },
      {
        heading: "Contingency and total",
        body: [
          "Add a 15–20% contingency for extra consultations, medication changes, cancelled cycles, courier fees for drugs and time off work.",
          "Working formula: (one-time costs) + (per-cycle costs × planned cycles) + (FET costs × expected transfers) + contingency.",
        ],
        callout: "Download the Cairn budget template (CSV), replace its figures with the ones on your own quotes, and the totals and running balance are worked out for you.",
        calloutDownload: "/downloads/cairn-ivf-budget-template.csv",
      },
    ],
    keyTakeaways: [
      "Work from itemised written quotes, not website prices",
      "Compare sperm banks' total costs, including slot, shipping and storage fees",
      "Add 15–20% contingency to your total estimated cost",
      "Frozen transfers cost less than fresh cycles; track your frozen embryos",
    ],
    sources: [SRC.cma, SRC.hfeaIcsi, SRC.hfeaCounselling, SRC.lsb, SRC.esb],
    lastReviewed: REVIEWED,
  },

  // Treatment & Clinics
  {
    slug: "iui-vs-ivf-vs-donor-eggs",
    title: "IUI vs IVF vs donor eggs: which is right for you?",
    type: "Guide",
    category: "Treatment & Clinics",
    categorySlug: "treatment-clinics",
    readTime: "6 min read",
    supportAnchor: "stopping",
    intro:
      "The three main treatment routes (IUI, IVF and donor egg IVF) differ in success rates, cost and physical demands. The right starting point depends on the age and ovarian reserve of whoever provides the eggs, on whether the sperm is a partner's or a donor's, and, for two women, on whether one of you will carry an embryo made from the other's eggs (reciprocal IVF). This guide sets out the options in plain terms.",
    sections: [
      {
        heading: "IUI (intrauterine insemination)",
        body: [
          "IUI places prepared sperm, from a partner or a donor, directly into the uterus at the point of ovulation, in a natural cycle or after mild hormonal stimulation. It is the least invasive and least expensive option.",
          "Success rates are lower than IVF: the HFEA says IUI success rates are around a third of IVF's. For people using donor insemination who have not conceived after six cycles, NICE says clinics should offer six cycles of unstimulated donor IUI before considering IVF, where there is no known cause of infertility (NG257, recommendation 1.37.2). NICE also prefers donor IUI to intracervical insemination because it improves pregnancy rates. Your clinic may advise differently based on your tests.",
          "IUI is a common starting point for people using donor sperm who have no known tube or egg-quality issues and want to begin with a lower financial and physical commitment.",
        ],
        callout:
          "Cost: the HFEA puts one cycle of IUI at around a quarter of the price of an IVF cycle. As an example, London Women's Clinic lists natural-cycle IUI at £1,050 (September 2026), excluding medication, monitoring bloods and the HFEA fee. Donor sperm is charged on top. Several cycles may be needed, so compare the cumulative cost with one IVF cycle.",
      },
      {
        heading: "IVF",
        body: [
          "IVF is the most common route whether you use a partner's sperm or donor sperm. Ovaries are stimulated with hormonal injections to produce several eggs; the eggs are fertilised in the laboratory; embryos are assessed and one is transferred to the uterus, with any remaining good-quality embryos frozen. In reciprocal IVF, one partner goes through stimulation and egg collection and the other has the embryo transfer.",
          "Success is measured per embryo transferred, not per cycle started, and falls with the age of whoever provides the eggs. The national figures by age are in our HFEA success rates explainer.",
          "IVF is usually suggested first for people over 35, anyone with a diagnosis that reduces the chance of conception, or those who want the higher per-attempt chance from the outset.",
        ],
        bullets: [
          "Allows embryo freezing: gives you future FET attempts from a single stimulation",
          "Enables genetic testing of embryos (PGT-A) if relevant to your situation; the HFEA rates it red for improving the chance of a baby for most patients",
          "One stimulated cycle can yield several embryos for future siblings",
          "Higher chance of pregnancy per attempt than IUI",
        ],
        links: [{ label: "Understanding HFEA success rates", href: "/resources/understanding-hfea-success-rates" }],
      },
      {
        heading: "Donor egg IVF",
        body: [
          "Donor egg IVF uses eggs from a screened, identity-release donor. It is typically suggested when egg quality or quantity is significantly reduced, usually from around 42 to 43 or after several failed IVF cycles with your own eggs.",
          "With donor eggs, the donor's age matters more than the recipient's. UK birth rates with donor eggs are above 30% per embryo transferred at every recipient age (HFEA, 2019 data: 34% under 35, 31% at 45 to 50).",
          "Donors registered since 1 April 2005 are identity-release. You can ask the HFEA for non-identifying information about your donor at any time; your child can from 16, and from 18 can request the donor's name, date of birth and last known address. Neither side has to make contact.",
        ],
      },
      {
        heading: "Making the decision",
        body: [
          "Your consultant will make a recommendation based on your test results, particularly AMH (a blood test that estimates egg reserve), antral follicle count, age and any relevant medical history. Use this as the primary clinical guidance.",
          "Beyond the clinical picture, consider the financial and emotional implications of each route. IUI is lower commitment but may be a less efficient use of money and time over 35. IVF with your own eggs is the most common choice. Donor eggs give much better odds from the early 40s. Deciding to use them often takes time; implications counselling is offered by every clinic.",
        ],
        callout:
          "Ask your consultant: 'Based on my AMH and AFC, what is the realistic chance of a birth per cycle with IUI, with my own eggs, and with donor eggs?' Numbers for your own situation are more useful than any general guide.",
      },
    ],
    keyTakeaways: [
      "IUI is lowest cost and least invasive; the HFEA puts its success rate at around a third of IVF's",
      "For donor insemination without a known cause of infertility, NICE says to offer six unstimulated donor IUI cycles before IVF",
      "IVF is the most common route with partner or donor sperm and allows embryo freezing",
      "With donor eggs, birth rates are above 30% per embryo transferred at every recipient age (HFEA, 2019 data)",
      "Ask for success rates specific to your age group and ovarian reserve, not clinic averages",
    ],
    sources: [SRC.hfeaIui, SRC.nice257, SRC.hfea2024, SRC.hfea2019, SRC.hfeaAddOns, SRC.lwcPrices, SRC.hfeaDonorFaqs, SRC.hfeaCounselling],
    lastReviewed: REVIEWED,
  },

  {
    slug: "consultation-questions",
    title: "Questions to ask at your first consultation",
    type: "Checklist",
    category: "Treatment & Clinics",
    categorySlug: "treatment-clinics",
    readTime: "5 min read",
    intro:
      "A first fertility consultation is often 30 to 60 minutes and covers a lot of ground quickly. Going in with prepared questions means you leave with the information you need. This checklist covers what is worth asking; pick the questions that fit your situation.",
    sections: [
      {
        heading: "About your specific situation",
        body: ["Start with your own clinical picture:"],
        numbered: [
          "What do my test results (AMH, FSH, AFC) tell you about my ovarian reserve, and how does this compare to what you would expect for my age?",
          "Based on my results, what treatment do you recommend as a first-line approach: IUI or IVF?",
          "What is the realistic birth rate per cycle for someone with my profile at this clinic?",
          "Are there any investigations you would want to do before we start treatment?",
          "Is there anything about my history that would change your recommendation?",
        ],
      },
      {
        heading: "About the clinic",
        body: ["These questions help you assess whether this is the right clinic for you:"],
        numbered: [
          "Do you routinely treat families like mine, whether that is solo patients, same-sex couples, or another situation? What proportion of your patients are in the same position?",
          "What are your success rates for my age group and treatment type? (Ask to see the HFEA-reported figures specifically, not internal marketing data.)",
          "Can I see your patient ratings and inspection rating on the HFEA's Choose a Fertility Clinic site?",
          "How many consultants work here, and will I see the same person throughout my treatment?",
          "What is your policy on add-ons such as PGT-A, embryo glue and endometrial scratch? How do you advise patients on these, and what is the HFEA rating for each?",
          "Is counselling included in the price, and what support do you offer during treatment and after a failed cycle?",
          "How responsive are you between appointments? Is there a nurse coordinator I can contact with questions?",
        ],
      },
      {
        heading: "About costs",
        body: ["Always leave with a written cost breakdown:"],
        numbered: [
          "Can you provide me with a full itemised quote in writing that covers everything: drugs, ICSI, donor gamete handling if relevant, counselling, storage, and any standard add-ons?",
          "What is not included in your standard IVF quote?",
          "Do you offer multi-cycle packages, and what do they cost?",
          "What are your cancellation and refund policies if a cycle needs to be stopped?",
          "Do you offer any funding schemes, payment plans, or finance options?",
        ],
      },
      {
        heading: "About donor sperm",
        body: ["If you are using donor sperm, these are particularly important:"],
        numbered: [
          "Do you have a preferred list of sperm banks, or can I choose my own and ship to you?",
          "What are your sperm import procedures and timelines? How far in advance do I need to organise this?",
          "Do you have any recommendations on how many vials to purchase for sibling potential?",
          "What CMV matching policy do you follow?",
          "If I need to cancel a cycle after sperm has been imported, what happens to it?",
        ],
      },
      {
        heading: "About the process",
        body: ["Understanding what treatment involves day-to-day:"],
        numbered: [
          "How many monitoring scans will I need, and can any of these be done at a clinic closer to where I live or work?",
          "What does the stimulation protocol typically involve in terms of daily injections?",
          "How much time off work should I plan for egg collection?",
          "What is your embryo transfer policy: single embryo transfer only?",
          "What support do you offer if a cycle fails or if I have a pregnancy loss?",
        ],
      },
    ],
    keyTakeaways: [
      "Ask for a full itemised written quote before you leave; verbal estimates are not reliable",
      "Ask for HFEA-reported success rates for your specific age group, not headline clinic averages",
      "Confirm the clinic's experience with families like yours, whether solo, same-sex, or couple",
      "Understand the monitoring scan schedule before you commit; it affects your working life",
      "Leave knowing what happens next and who your nurse coordinator is",
    ],
    sources: [SRC.hfeaChoose, SRC.hfeaAddOns, SRC.hfeaCounselling, SRC.cma],
    lastReviewed: REVIEWED,
  },

  {
    slug: "understanding-hfea-success-rates",
    title: "Understanding HFEA success rates",
    type: "Explainer",
    category: "Treatment & Clinics",
    categorySlug: "treatment-clinics",
    readTime: "5 min read",
    intro:
      "The HFEA (Human Fertilisation and Embryology Authority) publishes success rate data for every licensed UK fertility clinic. The numbers are often misread. This guide explains what the figures mean, how to compare them fairly, and what to ask when a clinic quotes you a headline success rate.",
    sections: [
      {
        heading: "What the HFEA measures, and what it does not",
        body: [
          "The HFEA's Choose a Clinic pages show two measures: births per egg collection and births per embryo transferred. Its national reports use births per embryo transferred, the proportion of transfers that result in a baby. Neither is the same as 'per cycle started', which counts cycles that never reach transfer and so gives a lower figure.",
          "Be wary of clinics that quote 'pregnancy rate' rather than 'birth rate'. Pregnancy rates, which include biochemical pregnancies and miscarriages, are higher and less useful for planning. Ask for the birth rate and how it was calculated.",
          "The HFEA's national reports group patients by age at egg collection: 18 to 34, 35 to 37, 38 to 39, 40 to 42 and 43 to 44. Its Choose a Clinic pages currently show two groups, under 38 and 38 and over. The age of the egg at collection is what matters, not your age at transfer. If you are using frozen embryos created two years ago when you were 37, use the 35 to 37 figures.",
        ],
      },
      {
        heading: "Why clinic comparison is harder than it looks",
        body: [
          "Raw success rates are not a fair basis for comparison without context. The HFEA says small differences in rates are usually down to the different types of patients treated. Factors that move a clinic's numbers:",
        ],
        bullets: [
          "Patient mix: a clinic that treats more older patients or patients with a poorer prognosis will have lower headline rates even if it is good at what it does",
          "Data lag: figures are published 18 months to two years after treatment. The HFEA's 2024 national data was published in June 2026, and clinic pages lag behind that.",
          "Volume: clinics with lower patient numbers have more statistical noise in their rates, so a few percentage points either way is usually chance",
        ],
        postBody: [
          "The HFEA suggests looking at how patients and its inspectors rate a clinic, and at practical factors such as location, opening hours and counselling, alongside success rates.",
        ],
        callout:
          "Ask each clinic for its birth rate for your age group and treatment type, such as own eggs with donor sperm, and how many patients that figure is based on. A rate built on a small number of patients tells you little.",
      },
      {
        heading: "How to find a clinic's HFEA data",
        body: [
          "All licensed UK clinic data is publicly available at hfea.gov.uk/choose-a-fertility-clinic. You can search by location or clinic name.",
          "When reviewing a clinic's page, look at:",
        ],
        bullets: [
          "Births per embryo transferred and births per egg collection, with the year the data covers",
          "How the number compares with the national average, as marked on the page",
          "Patient ratings and inspection ratings",
          "Multiple birth rate",
        ],
      },
      {
        heading: "National benchmarks",
        body: [
          "In 2024 the UK average birth rate per embryo transferred was 30%: 38% for patients aged 18 to 34 and 8% at 43 to 44 (HFEA, preliminary figures).",
          "These figures combine fresh and frozen transfers using the patient's own eggs, grouped by age at egg collection, and the HFEA says they are not directly comparable with its earlier reports. The report's charts also cover 35 to 37, 38 to 39 and 40 to 42; read them in the HFEA's Fertility treatment 2024: trends and figures report rather than relying on rounded figures here.",
        ],
        postBody: [
          "With donor eggs, birth rates are above 30% per embryo transferred at every recipient age (HFEA, 2019 data: 34% under 35, 31% at 45 to 50).",
        ],
      },
    ],
    keyTakeaways: [
      "Ask for the birth rate, not the pregnancy rate, and ask how it was calculated",
      "Compare success rates for your age group, not the clinic's overall average",
      "Use the egg's age at collection, not your current age, when selecting the right age group",
      "The HFEA says small differences between clinics are usually down to the patients treated; look at patient and inspection ratings as well",
      "HFEA clinic data is at hfea.gov.uk/choose-a-fertility-clinic and is publicly available for every licensed clinic",
    ],
    sources: [SRC.hfeaChoose, SRC.hfea2024, SRC.hfea2019],
    lastReviewed: REVIEWED,
  },

  {
    slug: "how-to-choose-a-sperm-donor",
    title: "How to choose a sperm donor",
    type: "Guide",
    category: "Treatment & Clinics",
    categorySlug: "treatment-clinics",
    readTime: "7 min read",
    intro:
      "Choosing a sperm donor is one of the most personal decisions in donor conception. This guide covers the legal framework in the UK, what information is available about donors, what vials cost, and how to approach the decision.",
    sections: [
      {
        heading: "UK legal framework: what you need to know",
        body: [
          "In the UK, all sperm donors used through HFEA-licensed clinics must be registered with the HFEA. Anonymous donation has not been permitted since 1 April 2005; donor-conceived people can ask for their donor's name, date of birth and last known address when they turn 18.",
          "This is known as an identity-release or open-ID system. Donors are not anonymous, but contact is not obligatory in either direction. Clinics and sperm banks refer to UK-compliant donors as 'open-ID' or 'ID release' donors.",
          "You can use an overseas sperm bank, but a UK clinic will only accept donors who meet UK rules, including agreeing to be identifiable when your child turns 18. Your clinic will tell you which banks it works with.",
        ],
      },
      {
        heading: "What information is available about donors",
        body: ["Banks publish a profile for each donor. What it contains varies by bank, and commonly includes:"],
        bullets: [
          "Physical characteristics: height, weight, eye colour, hair colour, ethnicity",
          "Education and occupation",
          "Motivations for donating (a personal statement)",
          "Medical and genetic history (screening is required before donation)",
          "CMV (cytomegalovirus) status",
          "Family availability. In the UK a donor can be used for up to 10 families, not counting their own. Donors from overseas banks may also have families abroad under that bank's own limit, so ask the bank what its global limit is. Banks usually sell UK family slots rather than showing a live count.",
          "Extended profiles at some banks include audio messages, staff impressions and childhood photographs",
        ],
        postBody: [
          "What you do not get: contact details or anything about the donor's current life. From 18 your child can request the donor's name, date of birth and last known address. Neither side has to make contact.",
        ],
      },
      {
        heading: "Sperm banks operating in the UK",
        body: [
          "You can use a UK bank or an overseas bank that ships to the UK. The main differences are cost, donor pool size and the depth of profile information available.",
          "Examples, not recommendations; not exhaustive. Donor sperm costs roughly £1,000–£1,800 a vial at UK-facing banks, plus VAT on imports, a family-slot or reservation fee and shipping (bank price lists, September 2026). Compare banks' total costs, including slot and shipping fees.",
        ],
        bullets: [
          "London Sperm Bank (londonspermbank.com): UK bank. £1,800 for one vial, £4,860 for three, all sample types (price list, September 2026). No import step.",
          "European Sperm Bank (europeanspermbank.com): Danish bank. ID-release straws from €1,150 excluding VAT, plus 20% VAT on UK orders, a €550 UK pregnancy-slot fee and shipping (price list, September 2026).",
          "Cryos International (cryosinternational.com): Danish bank. Prices vary by donor profile; check the UK price list.",
          "Manchester Fertility (manchesterfertility.com): UK clinic with its own donor bank.",
          "California Cryobank (cryobank.com): US bank. Ask your clinic whether it accepts imports from it.",
        ],
      },
      {
        heading: "How to approach the selection",
        body: ["There is no single right way to choose. Some people approach it analytically; others react to profiles. A few things that help:"],
        bullets: [
          "Decide early which attributes matter to you and which do not; this prevents decision paralysis across hundreds of profiles",
          "Physical resemblance to you can make donor conception conversations with your child slightly easier, but is not essential",
          "The personal statement is often the most informative part of a profile",
          "CMV matching: if you are CMV negative, some clinics recommend a CMV-negative donor. Discuss with your consultant.",
          "Some people buy extra vials for a possible sibling. Ask about storage costs and whether unused vials can be sold back before deciding.",
        ],
      },
    ],
    keyTakeaways: [
      "UK law requires identity-release donors; your child can request identifying information at 18",
      "UK clinics only accept sperm from banks and donors that meet UK rules",
      "A donor can be used for up to 10 UK families, not counting their own; ask overseas banks about their global limit",
      "Compare banks' total costs, including slot, shipping and storage fees, before buying vials",
      "Decide which attributes matter before you start browsing profiles",
    ],
    sources: [SRC.hfeaDonatingSperm, SRC.hfeaDonorFaqs, SRC.lsb, SRC.esb],
    lastReviewed: REVIEWED,
  },

  // Law & your child
  {
    slug: "donor-conception-legal-parenthood",
    title: "Donor conception and legal parenthood explained",
    type: "Explainer",
    category: "Law & your child",
    categorySlug: "law-your-child",
    readTime: "7 min read",
    intro:
      "This explainer covers the legal principles behind donor conception in the UK: who is a legal parent, what position the donor is in, what your child can find out and when, and what changes if you use a surrogate. It applies to solo parents, couples of any kind and two dads or solo dads.",
    sections: [
      {
        heading: "Who is the legal parent?",
        body: [
          "When you conceive through treatment at an HFEA-licensed clinic using donor sperm, the donor is not a legal parent of your child. The donor has no parental status, no parental rights or responsibilities and no obligation to pay child maintenance.",
          "This is set out in the Human Fertilisation and Embryology Act 2008. For single women and unmarried couples, this protection only applies to treatment at a UK licensed clinic.",
          "If you are solo and unmarried, you are the sole legal parent from birth. If you are married or in a civil partnership, your spouse or civil partner is normally the second legal parent unless they did not consent to the treatment. If you are a couple who are neither married nor in a civil partnership, the non-carrying partner becomes the second legal parent by signing the clinic's parenthood consent forms before treatment: ask your clinic about this before you start.",
        ],
        callout:
          "If you are single or unmarried and conceive at home or outside a UK licensed clinic, the donor is normally your child's legal father, with the rights and responsibilities that brings, whatever you agree in writing. If you are unmarried, your partner will not automatically be a legal parent. If you are married or in a civil partnership and conceive by artificial insemination, your spouse is normally the other legal parent unless they did not consent; this does not cover conception through sex. Get specialist legal advice before trying at home.",
      },
      {
        heading: "The donor's legal position",
        body: ["A sperm donor who donates through an HFEA-licensed clinic:"],
        bullets: [
          "Has no legal parental status",
          "Has no rights over any child conceived from their donation",
          "Has no obligation to financially support any child",
          "Cannot be named on the birth certificate",
          "Can be identified by a donor-conceived person who has reached 18, through the HFEA Register",
        ],
        postBody: [
          "Donors registered since 1 April 2005 cannot donate anonymously. Separately, a donor can withdraw consent to their sperm being used up to the point it is used.",
        ],
      },
      {
        heading: "Your child's right to information",
        body: [
          "The HFEA Register holds information about every licensed fertility treatment in the UK since 1 August 1991, including each donor's identifying details (name, date of birth, last known address at donation) and non-identifying details (physical description, year and country of birth, ethnicity, medical information, any personal statement). Your clinic reports your treatment to the Register; you do not need to register anything.",
          "Access is by application to the HFEA, and applying is free:",
        ],
        bullets: [
          "As a parent, you can apply now for non-identifying information about your donor and the number, sex and year of birth of donor siblings",
          "From 16, your child can apply for the same non-identifying information and the number, sex and year of birth of donor siblings",
          "From 18, your child can apply for the donor's name, date of birth and last known address, for donations made from 1 April 2005",
          "From 18, your child can join Donor Sibling Link to exchange contact details with donor siblings who have also joined",
        ],
        postBody: [
          "Neither the donor nor your child is obliged to respond to contact. The HFEA recommends talking to a qualified counsellor before applying for identifying information; some clinics offer a few free sessions, otherwise counselling is paid.",
          "Because this information exists, and because consumer DNA tests can reveal a genetic connection without anyone applying for anything, the research and the HFEA both point the same way: tell your child early. Our guide on talking to your child covers how, and the Donor Conception Network publishes books for each family type.",
        ],
        links: [{ label: "Talking to your child about donor conception", href: "/resources/talking-to-child-donor-conception" }],
      },
      {
        heading: "Birth registration",
        body: [
          "If you are a solo parent, you register the birth as the sole parent and the birth certificate shows your name only; there is no donor entry. If there is a second legal parent through marriage, civil partnership or the clinic's parenthood consent forms, both names go on the birth certificate.",
          "Whether to tell your GP about the donor conception is your choice.",
        ],
      },
      {
        heading: "If you are using a surrogate",
        body: [
          "The woman who gives birth is the legal mother, even after treatment at a licensed clinic (HFE Act 2008, section 33), and if she is married or in a civil partnership her spouse is normally the second legal parent. Legal parenthood passes to you through a parental order, which you apply for within 6 months of the birth (section 54). A single intended parent who is a biological parent of the child can apply alone (section 54A). Get specialist legal advice early.",
        ],
        links: [
          { label: "Two dads: the surrogacy route", href: "/families/same-sex-male" },
          { label: "Solo dads: the surrogacy route", href: "/families/single-dad" },
        ],
      },
    ],
    keyTakeaways: [
      "After treatment at a UK licensed clinic with the right consent forms, the donor is not a legal parent",
      "If you are single or unmarried and conceive at home, the donor is normally your child's legal father; get specialist legal advice first",
      "You can apply to the HFEA now, free, for non-identifying donor information and the number, sex and year of birth of donor siblings; your child can from 16, and can request identifying information from 18",
      "With a surrogate, the woman who gives birth is the legal mother until a parental order is made; apply within 6 months",
      "Birth registration is straightforward, whether as a sole parent or with a second legal parent",
    ],
    sources: [
      SRC.hfeAct2008Part2,
      SRC.hfeActS33,
      SRC.hfeActS54,
      SRC.hfeActS54A,
      SRC.hfeaUnregulated,
      SRC.hfeaDonorFaqs,
      SRC.hfeaFindingOut,
      SRC.hfeaDsl,
      SRC.hfeaDonatingSperm,
    ],
    lastReviewed: REVIEWED,
  },

  {
    slug: "known-donor-legal-agreements",
    title: "Known donors: legal agreements you need",
    type: "Guide",
    category: "Law & your child",
    categorySlug: "law-your-child",
    readTime: "5 min read",
    intro:
      "Some people use a known donor, such as a friend. The safest way is through a UK licensed clinic. This guide covers what changes legally depending on how you conceive, the written agreement worth having anyway, and the questions to settle with your donor first.",
    sections: [
      {
        heading: "The critical difference: licensed clinic vs home insemination",
        body: [
          "How you use a known donor determines the entire legal picture.",
          "If you use your known donor's sperm through an HFEA-licensed clinic, the same legal protections apply as with any other clinic treatment: the donor is not a legal parent, and your spouse, civil partner or a partner who signed the clinic's parenthood consent forms is the second legal parent. Known donor sperm is screened and quarantined before use, usually for 3 to 6 months depending on the clinic's testing (the HFEA Code of Practice sets a minimum of 180 days, or three months where NAT testing is used). Ask your clinic.",
          "If you are single or unmarried and conceive at home or outside a UK licensed clinic, the donor is normally your child's legal father, with the rights and responsibilities that brings, whatever you agree in writing. If you are unmarried, your partner will not automatically be a legal parent. If you are married or in a civil partnership and conceive by artificial insemination, your spouse is normally the other legal parent unless they did not consent; this does not cover conception through sex. Get specialist legal advice before trying at home.",
          "Donors used outside a licensed clinic, including people met online, will not have had a clinic's health checks, so there is a risk of infections and of passing on conditions such as cystic fibrosis, sickle cell disease or thalassaemia (HFEA).",
        ],
        callout:
          "A written agreement with a known donor that says 'he will have no parental rights' is not legally enforceable in the UK outside the licensed clinic system. Courts look at the welfare of the child, not the terms of private contracts.",
      },
      {
        heading: "The legal agreement you should still have",
        body: [
          "Even if you use a licensed clinic, where the legal protections are already in place, it is advisable to have a written agreement with your known donor that sets out your mutual intentions. This is not for legal enforcement, but to:",
        ],
        bullets: [
          "Document that everyone understood and agreed to the arrangement",
          "Reduce the risk of future misunderstandings about the donor's role in the child's life",
          "Provide clarity if circumstances change (for example, the donor later marries and their partner has concerns)",
          "Form a record for your child about the intention behind their conception",
        ],
        postBody: [
          "The agreement should be prepared by a solicitor who specialises in family or fertility law. It typically covers the agreed role (or no role) of the donor in the child's life, agreement on identity disclosure, financial expectations, and what happens if either party's circumstances change.",
        ],
      },
      {
        heading: "Finding a fertility law solicitor",
        body: ["Specialist fertility law solicitors can be found through:"],
        bullets: [
          "NGA Law (ngalaw.co.uk, formerly Natalie Gamble Associates): specialists in donor conception and fertility law",
          "The Law Society's solicitor finder (solicitors.lawsociety.org.uk) filtered by 'family' and 'surrogacy and fertility'",
        ],
      },
      {
        heading: "The conversation with your known donor",
        body: ["Beyond the legal agreement, settle the practical questions before you start:"],
        bullets: [
          "What role, if any, does the donor want to play in the child's life?",
          "How do you plan to describe the donor to your child: donor, biological parent, family friend?",
          "What happens if the donor forms a new relationship? What does their partner need to know?",
          "What medical information will the donor provide, and how can your child contact them if they want to in adulthood?",
          "What happens if either of you changes your mind about the arrangement?",
        ],
      },
    ],
    keyTakeaways: [
      "At a UK licensed clinic the donor is not a legal parent; if you are single or unmarried and conceive at home, the donor is normally your child's legal father",
      "A written agreement cannot change who is a legal parent",
      "A written agreement is still advisable even with a licensed clinic, for clarity, not enforcement",
      "Known donor sperm is quarantined before clinic use, usually for 3 to 6 months depending on the testing",
      "Use a solicitor who specialises in fertility law, and settle the donor's intended role before you start",
    ],
    sources: [SRC.hfeaUnregulated, SRC.hfeaCop2021, SRC.hfeAct2008Part2],
    lastReviewed: REVIEWED,
  },

  {
    slug: "talking-to-child-donor-conception",
    title: "Talking to your child about donor conception",
    type: "Guide",
    category: "Law & your child",
    categorySlug: "law-your-child",
    readTime: "5 min read",
    intro:
      "Children who learn about their donor conception early, from their parents, in age-appropriate language, do better than those who find out later or from someone else. This guide gives language and a framework for these conversations at different ages. It applies whether you are a solo parent, two mums, two dads using an egg donor and a surrogate, or a couple using donor sperm or eggs.",
    sections: [
      {
        heading: "The case for early disclosure",
        body: [
          "UK research following families from birth found that children told before age 7 fared best: at 14 they reported better family relationships and higher wellbeing than those told later (Ilioi et al. 2017, University of Cambridge). Many families start in the toddler years. Early telling means the story is part of family life rather than a revelation, and it removes the risk of accidental disclosure.",
          "Consumer DNA tests have changed the picture. A cousin or half-sibling taking a test can reveal a genetic connection you have not disclosed. Planning your own disclosure keeps it in your hands.",
          "Research on solo-mother families is consistent with this: a 2016 University of Cambridge study found children in solo-mother families as well adjusted as those in two-parent donor families, with lower mother-child conflict (Golombok et al. 2016).",
        ],
      },
      {
        heading: "Language for young children (0 to 7)",
        body: [
          "At this stage, the story needs to be simple and woven into normal family conversation. You do not need a specific 'disclosure conversation'; it is part of how you talk about your family.",
          "A starting script. This example is written for a solo mum using a sperm donor; keep the shape and adapt the details to your own family, whether that means two parents, an egg donor or a surrogate:",
        ],
        bullets: [
          "'Some families have a mummy and a daddy. Our family has just you and me, and I wanted you so much that I got help from a kind man called a donor to help make you.'",
          "'A donor is someone who helps a family by giving something special. Our donor helped by giving me what I needed to make you.'",
          "'You grew in my tummy, and you are our family.'",
        ],
        postBody: [
          "At this age, children take this in straightforwardly. Their questions are simple and literal: 'Where did I come from?' 'What is a donor?' Answer simply.",
        ],
        callout:
          "The Donor Conception Network publishes 'Our Story' picture books for children aged 0 to 7, in over 40 versions for different family and donation types, and 'Telling & Talking' booklets for parents, by child's age (0 to 7, 8 to 11, 12 to 16, 17 and over).",
      },
      {
        heading: "The middle years (8 to 12)",
        body: [
          "Children in this age range ask more detailed questions and may compare their family to friends'. This is a common developmental stage, not a sign of distress.",
          "It helps to explain more about what a donor is and is not:",
        ],
        bullets: [
          "The donor is not a parent; they helped make the family possible but are not involved in the child's life as a mum or dad",
          "They may have donor siblings: other children from the same donor who they might one day meet if both are interested",
          "They can find out more about their donor when they are older if they want to",
          "Their family is complete as it is",
        ],
      },
      {
        heading: "Teenage years and adulthood",
        body: [
          "Teenagers often revisit their conception story with more complexity: questions of identity, belonging and difference. This is a common stage and does not mean disclosure was done badly.",
          "Stay open to their questions without defending your choices. 'How do you feel about it?' is more useful than 'Are you okay with it?'",
          "From 16 your child can apply to the HFEA for non-identifying information about the donor and the number, sex and year of birth of donor siblings, and from 18 for the donor's name, date of birth and last known address. Whether to apply is their choice. The details are in the register section of our legal parenthood explainer.",
        ],
        links: [
          {
            label: "Your child's right to information (legal parenthood explainer)",
            href: "/resources/donor-conception-legal-parenthood#your-childs-right-to-information",
          },
        ],
      },
    ],
    keyTakeaways: [
      "Tell your child early: in UK research, children told before age 7 fared best",
      "Weave it into normal family conversation rather than making it a single event",
      "Consumer DNA tests mean your child may find out another way; being the one to tell them keeps it in your hands",
      "The Donor Conception Network's 'Our Story' books and 'Telling & Talking' booklets cover each family type and age",
      "From 16 and 18 your child can apply to the HFEA for information about the donor; the choice is theirs",
    ],
    sources: [SRC.ilioi2017, SRC.golombok2016, SRC.dcnBooks, SRC.hfeaDonorFaqs],
    lastReviewed: REVIEWED,
  },

  // Support & community
  {
    slug: "recommended-books",
    title: "Books: a short list",
    type: "Reading list",
    category: "Support & community",
    categorySlug: "support-community",
    readTime: "2 min read",
    intro:
      "Seven books, checked against publisher or retailer pages in September 2026. We have no affiliation with any of them.",
    sections: [
      {
        heading: "Deciding and preparing",
        body: [],
        bullets: [
          "Choosing Single Motherhood: The Thinking Woman's Guide, by Mikki Morrissette: the decision, the routes, and a child's later questions.",
          "Single Mothers by Choice: A Guidebook for Single Women Who Are Considering or Have Chosen Motherhood, by Jane Mattes: a guidebook from the founder of the Single Mothers by Choice organisation.",
          "Maybe Baby, edited by Lori Leibovich: 28 writers on deciding whether to have a child, including ambivalence and solo parenthood.",
        ],
      },
      {
        heading: "Memoir",
        body: [],
        bullets: [
          "Going Solo: My choice to become a single mother using a donor, by Genevieve Roberts (Piatkus, 2019): a UK journalist's account of solo motherhood by donor conception.",
        ],
      },
      {
        heading: "For your child",
        body: [],
        bullets: [
          "The Pea That Was Me, by Kimberly Kluger-Bell: picture books for ages 3 and up, in separate volumes for single mums and other family and donation types.",
          "Before You Were Born: Our Wish for a Baby, by Janice Grimes (X, Y and Me, 2004 onwards): picture books for ages 3 to 5, in versions for donor sperm, donor egg, surrogacy, solo mums, solo dads and couples.",
        ],
      },
      {
        heading: "If treatment ends without a child",
        body: [],
        bullets: [
          "Living the Life Unexpected: How to find hope, meaning and a fulfilling future without children, by Jody Day (Bluebird, 2020), founder of Gateway Women.",
        ],
      },
    ],
    sources: [
      {
        label: "Barnes & Noble, Choosing Single Motherhood (Morrissette)",
        href: "https://www.barnesandnoble.com/w/choosing-single-motherhood-mikki-morrissette/1100303548",
      },
      {
        label: "Barnes & Noble, Single Mothers by Choice (Mattes)",
        href: "https://www.barnesandnoble.com/w/single-mothers-by-choice-jane-mattes/1102302068",
      },
      {
        label: "Barnes & Noble, Maybe Baby (Leibovich)",
        href: "https://www.barnesandnoble.com/w/maybe-baby-lori-leibovich/1111511159",
      },
      {
        label: "Little, Brown Book Group, Going Solo (Roberts)",
        href: "https://www.littlebrown.co.uk/titles/genevieve-roberts/going-solo/9780349421506/",
      },
      {
        label: "Barnes & Noble, The Pea That Was Me, volume 4 (Kluger-Bell)",
        href: "https://www.barnesandnoble.com/w/the-pea-that-was-me-lmft-kimberly-kluger-bell/1117801369?ean=9781493574544",
      },
      {
        label: "AbeBooks, Before You Were Born: Our Wish for a Baby (Grimes)",
        href: "https://www.abebooks.com/9780975502877/Before-Born...Our-Wish-Baby-Story-0975502875/plp",
      },
      {
        label: "Pan Macmillan, Living the Life Unexpected (Day)",
        href: "https://www.panmacmillan.com/authors/jody-day/living-the-life-unexpected/9781529036138",
      },
    ],
    lastReviewed: REVIEWED,
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getGuidesByCategory(categorySlug: string): Guide[] {
  return GUIDES.filter((g) => g.categorySlug === categorySlug);
}

export const CATEGORY_MAP: Record<string, string> = {
  "finance-costs": "Finance & Costs",
  "treatment-clinics": "Treatment & Clinics",
  "law-your-child": "Law & your child",
  "support-community": "Support & community",
};
