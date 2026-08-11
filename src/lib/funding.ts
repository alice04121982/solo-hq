/**
 * Content for /funding — how people actually pay for fertility treatment in
 * the UK, and what is free on the NHS.
 *
 * Editorial rules for anything added to this file. Money copy goes wrong in a
 * different way to the rest of the site: a reader acts on it, signs something,
 * and finds out twelve months later that the sentence was optimistic.
 *
 *  1. Name the number, then name what the number excludes. Every price on this
 *     page is a range with its exclusions attached, because the exclusions are
 *     what the reader gets caught by.
 *  2. Say who carries the risk. Every funding route moves the risk of a failed
 *     cycle somewhere — onto the patient, the clinic, a lender or an insurer.
 *     That is the thing being bought, so it is stated on every card.
 *  3. Eligibility is local. NICE recommends; the NHS body where you live
 *     decides. Never state a national rule that is actually an ICB policy.
 *  4. No affiliate relationships, ever. Companies are listed because a reader
 *     needs to know they exist, not because they pay to be here, and every
 *     listing carries its watch-outs.
 *  5. Where the honest answer is "this depends on a policy we cannot see from
 *     here", say that rather than rounding it up to a confident sentence.
 */

export interface SourceLink {
  label: string;
  href: string;
}

/** When the funding facts on the page were last checked against sources. */
export const LAST_REVIEWED = "August 2026";

/* ── The order of operations ─────────────────────────────────────────────── */

export interface FundingStep {
  title: string;
  body: string;
}

/**
 * The sequence matters more than any individual route: money spent in step 4
 * cannot be un-spent when step 1 turns out to have been available.
 */
export const ORDER_OF_OPERATIONS: FundingStep[] = [
  {
    title: "Check what the NHS owes you first",
    body: "Even where funding is unlikely, NHS investigations, diagnosis and referral are usually free, and a diagnosis changes which private route is sensible. Checking costs a GP appointment and can be worth five figures.",
  },
  {
    title: "Check whether someone else already pays",
    body: "Employer fertility benefits are the most under-claimed money in this whole list. Grants, hardship funds and corporate health schemes sit here too. None of them require you to borrow anything.",
  },
  {
    title: "Reduce the price of the treatment itself",
    body: "Egg sharing, mild or low-cost protocols, sourcing drugs at a lower price and declining add-ons with no evidence behind them all cut the bill before you have to fund it. A cheaper cycle is better than a cleverly financed expensive one.",
  },
  {
    title: "Decide who carries the risk of failure",
    body: "Multi-cycle packages, refund programmes and insurance-backed plans cost more up front and pay off only if treatment fails or takes several rounds. That is a judgement about your odds, and your clinic's own estimate of them is the input.",
  },
  {
    title: "Only then borrow, and only for the cycle in front of you",
    body: "0% clinic plans, fertility loans and credit are the last step, not the first. Borrow for one cycle at a time so that stopping — for any reason — does not leave you paying for treatment you never had.",
  },
];

/* ── NHS funding ─────────────────────────────────────────────────────────── */

export interface NationPolicy {
  slug: string;
  name: string;
  /** Headline entitlement, as commissioned rather than as recommended. */
  cycles: string;
  /** HFEA's measure of how much treatment is actually NHS-funded there. */
  nhsFundedShare: string;
  /** How the nation treats solo parents and female same-sex couples. */
  donorRoute: string;
  criteria: string[];
  sources: SourceLink[];
}

/**
 * Four nations, four answers. England is the outlier: it has no national
 * policy at all, only 42 local ones.
 */
export const NATION_POLICIES: NationPolicy[] = [
  {
    slug: "england",
    name: "England",
    cycles:
      "Set locally by your Integrated Care Board, not nationally. Most ICBs fund one full cycle; a minority fund the three NICE recommends, and a few fund none.",
    nhsFundedShare:
      "25% of IVF cycles in England were NHS-funded in 2024, down from 32% in 2019 — and it ranged from 51% in the North East to 20% in the South West and East Midlands.",
    donorRoute:
      "Most ICBs ask for evidence of six or more cycles of donor insemination at a licensed clinic before IVF funding is considered, and most do not pay for those insemination cycles or for the donor sperm. That requirement is what excludes the majority of solo parents and two-mum families in England, rather than any explicit ban.",
    criteria: [
      "Age at the point treatment starts, not at referral — commonly under 40, with a narrower band in some areas",
      "BMI within a stated range, usually 19–30",
      "Both partners non-smoking, often for at least three months, with vaping treated the same way in some policies",
      "No living children — in most policies this includes a partner's children and adopted children",
      "Neither partner sterilised, and no previous NHS-funded IVF",
      "Resident in the ICB's area, sometimes with a minimum period of registration with a local GP",
    ],
    sources: [
      { label: "HFEA — fertility treatment 2024 trends and figures", href: "https://www.hfea.gov.uk/about-us/publications/research-and-data/fertility-treatment-2024-trends-and-figures" },
      { label: "Fertility Network UK — NHS funding by area", href: "https://fertilitynetworkuk.org/access-support/nhs-funding/" },
    ],
  },
  {
    slug: "scotland",
    name: "Scotland",
    cycles:
      "Up to three full cycles for those who meet the criteria, under a single national access policy rather than local ones.",
    nhsFundedShare: "54% of IVF cycles in Scotland were NHS-funded in 2024 — the highest in the UK.",
    donorRoute:
      "The most inclusive route in the UK: NHS Scotland funds donor insemination for female same-sex couples and single women, commonly up to six cycles, before moving to one to three IVF cycles if the access criteria are met.",
    criteria: [
      "National criteria applied by every health board, so the postcode lottery within Scotland is far smaller",
      "Age, BMI and non-smoking requirements still apply, and the age band is assessed at treatment",
      "No living children in the relationship, on the same terms as elsewhere",
      "Waiting times vary by board even though the criteria do not",
    ],
    sources: [
      { label: "NHS Inform — fertility treatment in Scotland", href: "https://www.nhsinform.scot/tests-and-treatments/medical-procedures/fertility-treatment/" },
    ],
  },
  {
    slug: "wales",
    name: "Wales",
    cycles: "Two full cycles for those who meet the criteria, under national access criteria.",
    nhsFundedShare: "35% of IVF cycles in Wales were NHS-funded in 2024.",
    donorRoute:
      "Wales funds treatment for single women as well as couples, and female same-sex couples are generally expected to complete donor insemination cycles before IVF funding.",
    criteria: [
      "At least one partner child-free",
      "BMI 19–30 and non-smoking",
      "National criteria, so eligibility does not change between health boards",
    ],
    sources: [
      { label: "NHS 111 Wales — fertility services", href: "https://111.wales.nhs.uk/fertility/" },
    ],
  },
  {
    slug: "northern-ireland",
    name: "Northern Ireland",
    cycles: "One full cycle for eligible women under 40.",
    nhsFundedShare: "50% of IVF cycles in Northern Ireland were NHS-funded in 2024.",
    donorRoute:
      "Single women and female same-sex couples are generally expected to have completed donor insemination cycles first, and donor gametes are not usually funded.",
    criteria: [
      "Both partners with a BMI of 19–30",
      "Neither partner sterilised",
      "Non-smoking, and no living children",
    ],
    sources: [
      { label: "nidirect — fertility treatment", href: "https://www.nidirect.gov.uk/articles/fertility-treatment" },
    ],
  },
];

/**
 * What NICE actually says, kept separate from what gets commissioned, because
 * conflating the two is the single most common error in fertility funding copy.
 */
export const NICE_POSITION: { heading: string; body: string }[] = [
  {
    heading: "The guideline was rewritten in 2026",
    body: "NG257 replaced the 2013 guideline (CG156) that had governed NHS fertility care for over a decade. It moves the NHS towards individualised, diagnosis-led pathways and widens who can access NHS fertility preservation, including some people with conditions such as severe endometriosis.",
  },
  {
    heading: "Three cycles, and possibly three more",
    body: "For people under 40, NICE recommends an initial three full cycles of IVF, and — new in 2026 — that clinicians consider up to three further full cycles if the first three have not worked and the person is still under 40. For those aged 40 or 41 with no previous IVF, one full cycle is recommended. It is not recommended from 42 on cost-effectiveness grounds.",
  },
  {
    heading: "A 'full cycle' is more than one transfer",
    body: "NICE defines a full cycle as one round of ovarian stimulation and the transfer of any resulting fresh and frozen embryos. A local policy that funds one stimulation and a single fresh transfer is funding less than NICE means by the word 'cycle' — worth checking, because it changes the value of the offer considerably.",
  },
  {
    heading: "Donor insemination before IVF",
    body: "For people using donor sperm, NG257 recommends six cycles of unstimulated IUI before considering IVF, and twelve cycles for people who cannot have vaginal intercourse because of a diagnosed physical disability or psychosexual problem. It recommends these be done at a licensed clinic, for clinical safety and for legal parenthood.",
  },
  {
    heading: "What the guideline still does not settle",
    body: "The update was criticised by the HFEA and by patient groups for leaving access and funding for single people and same-sex couples largely unaddressed, despite the sharp rise in treatment among those groups. NICE also has no power to make anyone fund anything: in England, commissioning sits with 42 Integrated Care Boards, which is why the guideline and the offer on the ground can differ so widely.",
  },
];

/** How to actually get to a funding decision, in order. */
export const NHS_APPLICATION_STEPS: FundingStep[] = [
  {
    title: "Find the exact policy that governs you",
    body: "In England, search for your Integrated Care Board by postcode and then for its assisted conception or fertility policy — the published PDF, not a summary. In Scotland, Wales and Northern Ireland there are national criteria. Read the version in force, note its review date, and keep a copy.",
  },
  {
    title: "See your GP and be specific",
    body: "Ask for fertility investigations and a referral to an NHS fertility service. Say plainly which criteria you meet. GPs are not expected to know their ICB's fertility policy in detail, and arriving with the relevant page of it is entirely reasonable.",
  },
  {
    title: "Get the investigations done",
    body: "Blood tests, AMH, an assessment of the fallopian tubes, and semen analysis where there is a male partner. These are usually NHS-funded even where treatment is not, and a diagnosis is what determines whether IUI, IVF or something else is the sensible route.",
  },
  {
    title: "Document every self-funded cycle",
    body: "If your area requires donor insemination cycles first, keep the clinic's written record of each one. Cycles at a licensed UK clinic count; home insemination and unlicensed arrangements almost never do, and they carry legal-parenthood consequences as well.",
  },
  {
    title: "Watch the age clock, not the referral date",
    body: "Most policies apply the age limit at the point treatment starts. Waiting lists and the insemination requirement can quietly consume the years between the two, so work backwards from the age limit when deciding what to do first.",
  },
  {
    title: "If you are refused, ask for it in writing",
    body: "Ask which specific criterion you failed and request the decision in writing. Where there is a genuinely unusual clinical reason, there is an Individual Funding Request route — a high bar, but a real one. Policies are also reviewed periodically, so a refusal is not always permanent.",
  },
];

/** The criteria people most often fall foul of without expecting to. */
export const NHS_PITFALLS: { title: string; body: string }[] = [
  {
    title: "A partner's child counts",
    body: "Most policies require that neither partner has a living child, including children from previous relationships, children who live elsewhere, and adopted children.",
  },
  {
    title: "Donor sperm is usually not funded",
    body: "Even where IVF itself is funded, many policies exclude the cost of donor gametes and their storage — which for solo parents and two-mum families can be several thousand pounds of the bill left uncovered.",
  },
  {
    title: "Previous private cycles can count against you",
    body: "Some policies reduce or remove entitlement if you have already self-funded IVF. Check before paying for a private cycle, because the order in which you do things can be worth a funded cycle.",
  },
  {
    title: "BMI and smoking are checked at treatment",
    body: "Meeting the threshold at referral is not enough; it is generally reassessed before treatment starts. Some policies specify a minimum period of not smoking, and treat vaping the same way.",
  },
  {
    title: "The insemination requirement is expensive",
    body: "Six cycles of donor insemination at a licensed clinic, with sperm, typically runs to several thousand pounds — and in most of England it is a precondition of funding rather than something the NHS pays for.",
  },
  {
    title: "Storage and add-ons sit outside the funding",
    body: "Embryo storage beyond a set period, and any treatment add-ons, are almost always charged to you even within a funded cycle.",
  },
];

/* ── Funding routes ──────────────────────────────────────────────────────── */

export type RouteGroup = "nhs" | "reduce" | "third-party" | "share" | "spread";

export const ROUTE_GROUPS: { id: RouteGroup; label: string; blurb: string }[] = [
  { id: "nhs", label: "NHS-funded", blurb: "Treatment the state pays for, where you qualify." },
  { id: "reduce", label: "Reduce the price", blurb: "Ways to make the treatment itself cost less." },
  { id: "third-party", label: "Someone else pays", blurb: "Employers, insurers and charitable funds." },
  { id: "share", label: "Share the risk", blurb: "Packages and plans that pay out if it does not work." },
  { id: "spread", label: "Spread the cost", blurb: "Credit: cheapest last, and only for the cycle in front of you." },
];

export interface FundingRoute {
  slug: string;
  name: string;
  group: RouteGroup;
  /** One line, shown collapsed. */
  summary: string;
  /** Ballpark figures, with exclusions attached. */
  typicalCost: string;
  /** Who is out of pocket if the treatment does not work. */
  riskHolder: string;
  howItWorks: string[];
  suits: string[];
  watchOuts: string[];
  sources?: SourceLink[];
}

export const FUNDING_ROUTES: FundingRoute[] = [
  /* ── NHS ── */
  {
    slug: "nhs-treatment",
    name: "NHS-funded IVF, IUI and donor insemination",
    group: "nhs",
    summary:
      "Free at the point of use where you meet the criteria — which depend on where you live far more than on your diagnosis.",
    typicalCost:
      "Free, apart from prescription charges in England and any element your policy excludes, commonly donor sperm and storage.",
    riskHolder: "The NHS. A funded cycle that fails costs you nothing but the year.",
    howItWorks: [
      "Your GP refers you into an NHS fertility service after investigations. The funding decision is made against the written policy of the NHS body where you live.",
      "NICE guideline NG257 recommends up to three full cycles under 40 and one at 40–41, but in England each Integrated Care Board decides what it commissions.",
      "Scotland funds up to three cycles under national criteria, Wales two, Northern Ireland one.",
    ],
    suits: [
      "Everyone, as the first thing to check, regardless of how unlikely you have been told it is",
      "People in Scotland and Wales, where the criteria are national and more predictable",
      "Anyone under 40 who has not yet self-funded a cycle",
    ],
    watchOuts: [
      "In England the criteria are local: age bands, BMI, smoking, existing children — including a partner's — and residency all vary by ICB.",
      "Solo parents and female same-sex couples are usually required to complete six or more self-funded donor insemination cycles at a licensed clinic first.",
      "Age limits are applied when treatment starts, not when you are referred.",
    ],
    sources: [
      { label: "NICE NG257 — fertility problems: assessment and treatment", href: "https://www.nice.org.uk/guidance/ng257" },
      { label: "HFEA — costs and funding", href: "https://www.hfea.gov.uk/treatments/explore-all-treatments/costs-and-funding/" },
    ],
  },
  {
    slug: "nhs-fertility-preservation",
    name: "NHS fertility preservation",
    group: "nhs",
    summary:
      "Egg, sperm and embryo freezing funded on medical grounds — a wider group since the 2026 guideline than most people assume.",
    typicalCost: "Free where funded, though storage beyond the funded period is usually charged.",
    riskHolder: "The NHS, for the freezing itself. Later treatment using what you stored is a separate funding question.",
    howItWorks: [
      "Funding is offered where treatment or a condition threatens fertility — cancer treatment being the long-standing example.",
      "NG257 broadened the recommended group to include people with conditions affecting their reproductive organs, such as severe and recurrent endometriosis.",
      "People undergoing gender-affirming treatment are also within scope of NHS preservation policies, though local policies vary.",
    ],
    suits: [
      "Anyone facing chemotherapy, radiotherapy or surgery that may affect fertility",
      "People with severe endometriosis or another condition likely to damage ovarian reserve",
      "Trans and non-binary people considering gender-affirming treatment",
    ],
    watchOuts: [
      "Ask about preservation before treatment for the underlying condition begins; afterwards is often too late.",
      "Funded storage runs for a set period. Diarise the renewal date — storage lapses have caused real losses.",
      "Freezing being funded does not mean later IVF using those eggs or embryos is funded.",
    ],
    sources: [{ label: "NICE NG257 — fertility preservation", href: "https://www.nice.org.uk/guidance/ng257" }],
  },

  /* ── Reduce the price ── */
  {
    slug: "egg-sharing",
    name: "Egg sharing and freeze-and-share",
    group: "reduce",
    summary:
      "You donate half the eggs from your cycle to another patient, and the clinic funds most or all of your own treatment.",
    typicalCost:
      "Typically free or heavily discounted IVF, sometimes leaving only the HFEA licence fee and drugs. The largest single saving available to anyone who qualifies.",
    riskHolder:
      "Shared. If too few eggs are collected the share may not go ahead and the discount can fall away, so ask what happens then before you start.",
    howItWorks: [
      "You have IVF as normal, and the eggs collected are split between you and a recipient who cannot use their own.",
      "Clinics set their own criteria; commonly under 35 or 36, a BMI in range, good ovarian reserve (AMH thresholds are typical), and meeting HFEA donor screening.",
      "Freeze-and-share applies the same principle to elective egg freezing.",
    ],
    suits: [
      "Younger patients with good ovarian reserve who are comfortable with donation",
      "People who would otherwise be unable to fund any cycle at all",
    ],
    watchOuts: [
      "Donation in the UK is identity-release: any child born from your donated eggs can obtain your identifying details from the HFEA at 18. This is the real decision, not the money.",
      "Counselling is required, and worth taking seriously rather than treating as a formality.",
      "If your response to stimulation is poor, you may end up sharing eggs you would rather have kept, or losing the discount. Get the clinic's rule in writing.",
    ],
    sources: [{ label: "HFEA — egg sharing", href: "https://www.hfea.gov.uk/donation/donors/egg-sharing/" }],
  },
  {
    slug: "low-cost-ivf",
    name: "Low-cost, mild and natural-cycle IVF",
    group: "reduce",
    summary:
      "Lower drug doses and a leaner service model cut the per-cycle price, at the cost of fewer eggs per attempt.",
    typicalCost:
      "Advertised cycles from roughly £2,500–£3,500 against £5,000–£7,000 for standard IVF, though the realistic all-in figure is usually well above the headline.",
    riskHolder: "You. A cheaper cycle is still a cycle you have paid for.",
    howItWorks: [
      "Mild and natural protocols use little or no stimulation, so the drug bill — often £1,000–£2,500 in standard IVF — drops sharply.",
      "Low-cost providers also strip out inclusions: consultations, scans, freezing and ICSI may all be charged separately.",
    ],
    suits: [
      "Younger patients, and those who respond poorly to high-dose stimulation anyway",
      "People who would rather fund several small attempts than one large one",
    ],
    watchOuts: [
      "Fewer eggs per cycle usually means more cycles. Compare the cost of a baby, not the cost of a cycle.",
      "Ask for a written itemised quote including drugs, ICSI, freezing, storage and donor sperm before comparing anything.",
      "Check the clinic's HFEA-published results for patients like you rather than its headline success rate.",
    ],
    sources: [{ label: "HFEA — choose a clinic", href: "https://www.hfea.gov.uk/choose-a-clinic/" }],
  },
  {
    slug: "medication-sourcing",
    name: "Sourcing your medication elsewhere",
    group: "reduce",
    summary:
      "Drugs are typically £1,000–£2,500 a cycle and clinics do not have to be the pharmacy you buy them from.",
    typicalCost: "Savings of a few hundred pounds a cycle are common; occasionally more.",
    riskHolder: "You, and the saving is real but modest against the whole bill.",
    howItWorks: [
      "Ask your clinic for a copy of the prescription and quotes from more than one specialist fertility pharmacy.",
      "Prices for identical products differ meaningfully between pharmacies, and protocols differ enormously in cost between patients.",
    ],
    suits: ["Anyone self-funding a stimulated cycle"],
    watchOuts: [
      "Buy only from a registered UK pharmacy. Medication offered privately by other patients or through social media is unlawful to supply and unsafe to use.",
      "Cold-chain handling matters for some drugs — check delivery arrangements.",
      "Never change a prescribed protocol to save money without your clinician.",
    ],
  },
  {
    slug: "avoiding-add-ons",
    name: "Declining add-ons that have no evidence behind them",
    group: "reduce",
    summary:
      "The HFEA rates treatment add-ons by evidence, and most are rated as not proven to improve the chance of a live birth.",
    typicalCost: "Add-ons commonly run £150–£3,000 each; declining them is the cheapest decision on this page.",
    riskHolder: "You — this is money spent, not risk transferred.",
    howItWorks: [
      "The HFEA publishes a traffic-light rating for each add-on based on the evidence from randomised trials.",
      "Ask any clinic proposing one: what is its HFEA rating, what would it cost, and what is the evidence it improves live birth for someone with my diagnosis?",
    ],
    suits: ["Everyone paying privately, and anyone being offered a long list of extras at consultation"],
    watchOuts: [
      "A red or grey rating does not mean fraudulent — it means the evidence is not there yet, and you are paying for that uncertainty.",
      "Some add-ons are clinically indicated for specific diagnoses. The question is whether yours is one of them.",
    ],
    sources: [{ label: "HFEA — treatment add-ons ratings", href: "https://www.hfea.gov.uk/treatments/treatment-add-ons/" }],
  },
  {
    slug: "treatment-abroad",
    name: "Treatment abroad",
    group: "reduce",
    summary:
      "Cycle prices in parts of Europe run well below UK levels, with travel, law and follow-up as the trade-offs.",
    typicalCost:
      "Roughly €2,500–€4,500 a cycle in the Czech Republic and around €5,000–€6,000 in Spain, before drugs, travel, accommodation and repeat visits.",
    riskHolder: "You, with less regulatory protection than the HFEA provides at home.",
    howItWorks: [
      "Monitoring is often done in the UK and the collection and transfer abroad, which means coordinating two clinics.",
      "Donor law differs by country, and that difference is the main reason to choose one over another.",
    ],
    suits: [
      "People who have exhausted UK options, or who need donor eggs, where waiting lists and prices differ most",
    ],
    watchOuts: [
      "Access is not universal: Spain and Greece treat single women and female same-sex couples, while some countries — the Czech Republic among them — restrict donor treatment to heterosexual couples.",
      "Donor anonymity abroad means a donor-conceived child may have no route to identifying information, which UK law would have given them. Weigh that as a decision about your child, not about the price.",
      "Add travel, accommodation, time off work and repeat trips to the quoted figure, and check what happens if a cycle is cancelled mid-way.",
      "Complications are managed by the NHS at home, by a team that did not do the treatment.",
    ],
  },

  /* ── Someone else pays ── */
  {
    slug: "employer-benefits",
    name: "Employer fertility benefits",
    group: "third-party",
    summary:
      "The most under-claimed money in UK fertility, and the only route on this page where the treatment can be genuinely free to you.",
    typicalCost:
      "Anything from a £500 contribution to funds covering multiple cycles; the largest UK schemes run to tens of thousands.",
    riskHolder: "Your employer, up to the limit of the benefit.",
    howItWorks: [
      "Employers buy fertility benefits through providers such as Carrot Fertility, Fertifa, Peppy, Maven and Apryl, who manage the funding and the clinical support.",
      "Cover is generally family-building rather than infertility-specific, so solo parents and same-sex couples are usually included where the scheme is well designed.",
      "Some employers also offer paid leave for treatment as part of the same policy.",
    ],
    suits: [
      "Anyone employed, particularly in financial services, tech, law, consultancy and parts of the public sector",
      "People whose partner is employed somewhere with a scheme — many cover partners",
    ],
    watchOuts: [
      "Search the benefits portal for 'fertility', 'family forming' and 'IVF' before asking HR: schemes are often live but unadvertised.",
      "Check whether treatment must be at a partner clinic, and whether drugs and donor gametes are included.",
      "Ask how the benefit is treated for tax and what happens if you leave, and get the answer in writing.",
      "There is no statutory right in Great Britain to paid time off for fertility appointments. Whether you get it depends on your contract and your employer's policy.",
    ],
  },
  {
    slug: "private-medical-insurance",
    name: "Private medical insurance",
    group: "third-party",
    summary:
      "The honest answer: individual policies almost never pay for IVF, and buying one for that purpose does not work.",
    typicalCost: "Nothing for treatment. Some policies cover investigations where infertility follows an acute condition.",
    riskHolder: "You. This route mostly does not exist in the UK.",
    howItWorks: [
      "Standard individual policies from the major UK insurers exclude assisted conception, and existing fertility diagnoses are excluded as pre-existing conditions.",
      "Where insurers do cover fertility, it is generally as an add-on sold to corporate clients — so the route back to it is your employer, not the insurer.",
    ],
    suits: ["People whose employer's corporate health scheme includes an advanced fertility module"],
    watchOuts: [
      "Buying a policy in the hope of covering treatment you are already planning will not work, and may invalidate a claim.",
      "Do not confuse this with insurance-backed IVF plans, which are a different product sold directly to patients.",
      "Ask your insurer specifically what diagnostic investigations are covered — that part is sometimes worth having.",
    ],
  },
  {
    slug: "grants",
    name: "Grants and charitable funds",
    group: "third-party",
    summary: "Money that does not have to be repaid, in small amounts, awarded competitively.",
    typicalCost: "UK grants are typically up to around £3,000 and are usually paid direct to the clinic.",
    riskHolder: "The charity, for the amount awarded.",
    howItWorks: [
      "The Fertility Foundation is the main UK grant-maker, with an annual application round that opens in January and decisions by around the end of April.",
      "Some clinics run their own hardship or bursary schemes, which are rarely advertised — ask directly.",
    ],
    suits: ["People who can fund part of a cycle but not all of it, and who can apply within the annual window"],
    watchOuts: [
      "Read the eligibility criteria before investing time: The Fertility Foundation's published criteria require a cohabiting couple, with at least one applicant in full-time employment, which rules out solo applicants.",
      "Grants rarely cover a whole cycle, and most schemes ask for proof you can fund the remainder including drugs.",
      "Anything asking for an application fee, or promising funded IVF in exchange for a payment, should be treated as a scam.",
    ],
    sources: [{ label: "The Fertility Foundation — IVF grants", href: "https://www.fertilityfoundation.org/ivf-grants" }],
  },

  /* ── Share the risk ── */
  {
    slug: "multi-cycle-refund",
    name: "Multi-cycle and refund programmes",
    group: "share",
    summary:
      "A fixed fee for two or three cycles, with part or all of it refunded if you do not have a baby.",
    typicalCost:
      "A discount of roughly a third against paying cycle by cycle, in exchange for paying up front. Refund levels are commonly 50%, 70% or 100% of the programme fee depending on age and plan.",
    riskHolder:
      "Shared, and priced accordingly. The provider carries the risk of failure; you carry the risk of succeeding first time and having pre-paid for cycles you never needed.",
    howItWorks: [
      "Access Fertility is the main UK provider, sold through a large number of clinics; several clinics also run their own packages.",
      "Programmes typically bundle two or three fresh cycles with unlimited frozen embryo transfers from those cycles.",
      "Medical eligibility applies — these are underwritten products and not everyone is accepted.",
    ],
    suits: [
      "People who expect to need more than one cycle and want a known ceiling on the cost",
      "Anyone for whom a failed cycle with no money left would end the attempt entirely",
    ],
    watchOuts: [
      "Read what the refund excludes. Drugs, donor gametes, ICSI, storage and consultations are frequently outside the fee and are not refunded.",
      "Check the definition of success that ends the refund — usually a live birth, sometimes a clinical pregnancy, which are not the same thing.",
      "Check what happens if you stop early, if a cycle is cancelled before collection, or if you are withdrawn on medical grounds.",
      "Understand that paying first time and succeeding first time means you have paid more than you needed to. That is the trade.",
    ],
    sources: [{ label: "Access Fertility — refund programmes", href: "https://www.accessfertility.com/" }],
  },
  {
    slug: "insurance-backed-plans",
    name: "Insurance-backed IVF plans",
    group: "share",
    summary:
      "You pay a monthly premium; the plan pays for the treatment, and you only repay the cost if you have a child.",
    typicalCost:
      "A premium priced on your own predicted odds, with the treatment cost repaid over a period of years if you have a baby.",
    riskHolder: "The insurer, which is the entire point of the product — and it prices that risk from your clinical data.",
    howItWorks: [
      "Gaia is the established UK provider. It assesses your data, prices a plan, and covers the cost of treatment if it does not result in a child.",
      "If you do have a child, you repay the treatment cost in instalments over a period of years, on top of the premiums already paid.",
    ],
    suits: [
      "People with reasonable predicted odds who cannot fund several cycles up front",
      "Anyone for whom the worst outcome — no baby and a large debt — is the risk they most need to remove",
    ],
    watchOuts: [
      "Eligibility is underwritten and not everyone can be offered a plan; the odds that make a plan cheap are the odds that make it hardest to get.",
      "Work out the total you pay in the success case, not just the monthly figure, and compare it against paying the clinic directly.",
      "Check exactly what is inside the covered cost — drugs and donor gametes especially — and what happens if you stop treatment.",
    ],
    sources: [{ label: "Gaia — IVF plans", href: "https://gaiafamily.com/en-gb" }],
  },

  /* ── Spread the cost ── */
  {
    slug: "clinic-payment-plans",
    name: "Clinic 0% payment plans",
    group: "spread",
    summary:
      "Interest-free credit arranged at the clinic, usually over 10–12 months, through a regulated healthcare lender.",
    typicalCost: "No interest over the promotional term; watch for arrangement fees and monthly account charges.",
    riskHolder: "You. Credit does not reduce the cost or the risk, it only moves when you pay.",
    howItWorks: [
      "Clinics partner with regulated lenders — Chrysalis Finance and Novuna are the ones most often seen — and the application is made at the point of treatment.",
      "Longer terms are usually available at an interest rate rather than at 0%.",
    ],
    suits: ["People who can clear the balance within the interest-free period from income"],
    watchOuts: [
      "Confirm the total amount payable, not the monthly figure, and whether any fee applies.",
      "Check what happens if treatment is cancelled: the credit agreement is with the lender and generally does not pause because your cycle did.",
      "Only borrow for the cycle in front of you.",
    ],
  },
  {
    slug: "loans-and-credit",
    name: "Personal loans, credit unions and cards",
    group: "spread",
    summary: "Ordinary borrowing, which is often cheaper than a product with the word 'fertility' on it.",
    typicalCost: "Whatever the APR is. Compare against the clinic's plan before assuming the clinic's is better.",
    riskHolder: "You, entirely.",
    howItWorks: [
      "A personal loan from a bank or a credit union is frequently the lowest-cost option, and is not tied to one clinic.",
      "A 0% purchase credit card can work for a smaller sum if you are certain of clearing it inside the promotional period.",
    ],
    suits: ["People with the credit profile to access a low rate, who want to stay free to change clinic"],
    watchOuts: [
      "Borrowing for the full projected cost of three cycles at the outset is the most common financial mistake in fertility. Borrow per cycle.",
      "Any lender must be FCA-authorised; check the register before signing anything.",
      "If treatment ends without a baby, the repayments continue. Budget for that version of events, not only the hopeful one.",
    ],
  },
];

/* ── Due diligence ───────────────────────────────────────────────────────── */

/** Questions to put to any provider before signing a package, plan or loan. */
export const QUESTIONS_BEFORE_SIGNING: string[] = [
  "What exactly is included in this fee — and is the drug bill, ICSI, donor sperm, freezing, storage and each frozen transfer inside it or outside it?",
  "What event ends the agreement in your favour: a positive test, a clinical pregnancy, or a live birth?",
  "What happens if a cycle is cancelled before egg collection, or if I am withdrawn on medical grounds?",
  "What happens if I decide to stop, or to change clinic, part-way through?",
  "If there is a refund, is it of the programme fee or of everything I have paid, and how long after the final cycle is it paid?",
  "Is the credit or insurance provider authorised by the FCA, and under whose registration number?",
  "What is the total amount payable in the outcome where treatment works, and in the outcome where it does not?",
  "Can I have the full terms and an itemised quote in writing, to read away from the clinic?",
];

/** Consumer-protection points specific to this market. */
export const PROTECTIONS: { title: string; body: string; source?: SourceLink }[] = [
  {
    title: "Clinics must publish clear prices",
    body: "HFEA-licensed clinics are expected to give you a costed treatment plan covering everything you will be charged. If you have only been given a headline figure, ask again — an itemised written quote is a reasonable request and a normal one.",
    source: { label: "HFEA — costs and funding", href: "https://www.hfea.gov.uk/treatments/explore-all-treatments/costs-and-funding/" },
  },
  {
    title: "Success-rate claims are regulated",
    body: "Compare clinics using the HFEA's published data rather than the figure on a clinic's own homepage, and check that the figure quoted to you is for patients of your age and diagnosis, per cycle started rather than per transfer.",
    source: { label: "HFEA — choose a clinic", href: "https://www.hfea.gov.uk/choose-a-clinic/" },
  },
  {
    title: "Credit and insurance are FCA-regulated",
    body: "Anything lending you money or insuring your treatment must be authorised. Check the firm on the FCA register before you sign, and keep the paperwork.",
    source: { label: "FCA register", href: "https://register.fca.org.uk/" },
  },
  {
    title: "Counselling is your right, not an upsell",
    body: "Licensed clinics must offer counselling, and it is required before donation or egg sharing. It is one of the few things in this whole process that is routinely included in the fee.",
  },
];
