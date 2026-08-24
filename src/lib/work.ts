/**
 * Content for /work — fertility treatment and employment.
 *
 * Editorial rules for anything added to this file. This section carries more
 * legal risk than the rest of the site, and the failure modes are specific.
 *
 *  1. Separate law from policy in every sentence. The most damaging error this
 *     section can make is implying a right that does not exist. Where something
 *     is a proposed bill, or an employer's voluntary choice, say so in the same
 *     breath as the thing itself.
 *  2. State the rule and cite it; never advise. Employment advice is regulated
 *     work. We say what the position is and point at Acas, CIPD, Working
 *     Families or a solicitor.
 *  3. Date every employer claim. Benefits are withdrawn as quietly as they are
 *     announced, and a stale list is worse than no list.
 *  4. Assume the reader has told nobody. Every script must work for someone who
 *     wants to disclose nothing, because that is most people.
 *  5. No employer is listed as a recommendation, and no benefits provider pays
 *     to appear. We take nothing from anyone named here.
 */

import type { SourceLink } from "./funding";

/** When the legal and employer content was last checked against sources. */
export const WORK_LAST_REVIEWED = "August 2026";

/* ── The numbers that make the case for asking ───────────────────────────── */

export const WORKPLACE_STATS = [
  {
    value: "50%",
    label: "Of US employers with 500+ staff now cover IVF, up from 27% in 2020 — and most of their employees do not know it",
  },
  {
    value: "27%",
    label: "Of UK employers have any fertility policy at all, standalone or inside a wider one",
  },
  {
    value: "38%",
    label: "Of UK employees in fertility treatment have left a job, or considered it, because of the toll",
  },
  {
    value: "63%",
    label: "Of workers in treatment say their employer has no fertility policy; only 35% found their manager supportive",
  },
];

/* ── Rights ──────────────────────────────────────────────────────────────── */

/**
 * One law/not-law entry, written as a claim you can scan plus the detail
 * behind it. Split deliberately: readers arrive at this section to find out
 * where they stand, and a wall of full sentences buries the answer. The
 * `point` must stand alone as a true statement — the `detail` qualifies it,
 * it never reverses it.
 */
export interface RightsPoint {
  /** The claim, short enough to read at a glance. */
  point: string;
  /** The qualification, source or consequence. */
  detail?: string;
}

export interface RightsEntry {
  slug: string;
  name: string;
  /** The one-line position. Must not overstate it. */
  summary: string;
  /** What the law actually gives you. */
  theLaw: RightsPoint[];
  /** What is proposed, voluntary, or down to your employer. */
  notTheLaw: RightsPoint[];
  /** What to do with the above. */
  useIt: string[];
  sources: SourceLink[];
}

export const RIGHTS_BY_COUNTRY: RightsEntry[] = [
  {
    slug: "uk",
    name: "United Kingdom",
    summary:
      "No statutory right to time off for treatment — but real pregnancy protection that begins earlier than most people, and most employers, realise.",
    theLaw: [
      {
        point: "Pregnancy protection begins at embryo transfer.",
        detail:
          "From the point of transfer you have the rights of a pregnant worker, including paid time off for antenatal appointments — a materially stronger position than the weeks before it.",
      },
      {
        point: "If the transfer fails, protection continues for two weeks.",
        detail:
          "Protection against pregnancy discrimination runs for two weeks after you are told. Employers frequently do not know this, and it covers exactly the period in which someone is least able to argue about it.",
      },
      {
        point: "Penalising you for treatment can be sex discrimination.",
        detail:
          "Refusing time off for treatment, or treating someone detrimentally because of it, can amount to sex discrimination even before the pregnancy protections start.",
      },
      {
        point: "Acas: treat it like any other medical appointment.",
        detail:
          "Acas guidance is that fertility appointments, and sickness arising from treatment, should be handled the same way as any other appointment or sickness under your employer's own policies.",
      },
    ],
    notTheLaw: [
      {
        point: "No statutory right to time off for treatment.",
        detail:
          "There is no right in Great Britain to time off, paid or unpaid, to attend fertility treatment. Whether you get it depends on your contract and your employer's policy.",
      },
      {
        point: "Appointments before transfer are not antenatal appointments.",
        detail: "So the paid-time-off right for antenatal care does not reach them.",
      },
      {
        point: "Nothing forces an employer to discount treatment absence.",
        detail:
          "Many good policies keep it out of sickness triggers. That is a choice, not a duty, so ask for it explicitly.",
      },
      {
        point: "The statutory right that keeps being proposed is still a proposal.",
        detail:
          "Private Members' Bills giving a right to time off for fertility treatment have been introduced more than once and have not become law.",
      },
    ],
    useIt: [
      "If you are at or past embryo transfer and a request is being refused, say so plainly and in writing — your position changed at that point.",
      "Ask for treatment absence to be recorded separately from ordinary sickness, and get the answer in writing before you need it.",
      "Acas and Working Families both run free advice lines; use them before a disagreement hardens.",
    ],
    sources: [
      { label: "Acas — IVF treatment and pregnancy at work", href: "https://www.acas.org.uk/pregnancy-at-work/ivf-treatment" },
      { label: "CIPD — workplace support for fertility challenges", href: "https://www.cipd.org/uk/knowledge/reports/fertility-challenges/" },
      { label: "Working Families — rights during fertility treatment", href: "https://workingfamilies.org.uk/articles/workplace-rights-for-those-undertaking-fertility-treatment/" },
    ],
  },
  {
    slug: "ireland",
    name: "Ireland",
    summary:
      "No statutory fertility leave yet, a live legislative proposal, and a handful of large employers who did it voluntarily first.",
    theLaw: [
      {
        point: "No dedicated statutory entitlement to fertility leave.",
        detail:
          "The general employment protections and your employer's own policy do all of the work here.",
      },
    ],
    notTheLaw: [
      {
        point: "The Reproductive Health Leave Bill is a proposal, not a right.",
        detail:
          "It would give up to 10 days' leave for fertility treatment alongside leave for early pregnancy loss. The Government's own miscarriage-leave measure has been the faster-moving part of the debate.",
      },
      {
        point: "Bank of Ireland and Vodafone chose 10 days; nobody made them.",
        detail:
          "Both introduced fertility leave voluntarily and other large employers have followed. That is policy rather than entitlement — but useful precedent when asking your own employer to catch up.",
      },
    ],
    useIt: [
      "Check whether your sector has a collective agreement or a public-sector policy covering fertility leave; several universities and public bodies have adopted one.",
      "If you are asking your employer to create a policy, name the employers who already have one — it moves the conversation from principle to catching up.",
    ],
    sources: [{ label: "Citizens Information — leave and holidays", href: "https://www.citizensinformation.ie/en/employment/employment-rights-and-conditions/leave-and-holidays/" }],
  },
  {
    slug: "europe",
    name: "Elsewhere in Europe",
    summary:
      "A small group of countries give a statutory right to time off for treatment. Most do not, and the detail varies enough that local advice matters.",
    theLaw: [
      {
        point: "A handful of countries legislate a right to time off.",
        detail:
          "Italy is generally reported to give employees undergoing fertility treatment a right to paid time off for the necessary procedures, and Greece, Malta, Portugal, France and Ukraine are among the others that have legislated some right to time off.",
      },
      {
        point: "Spanish courts have blocked dismissal for treatment absence.",
        detail:
          "Employees cannot be dismissed for repeated absences arising from fertility treatment, and provision is increasingly appearing in collective agreements and equality plans rather than in statute.",
      },
    ],
    notTheLaw: [
      {
        point: "There is no EU-wide right to fertility treatment leave.",
        detail:
          "The countries above differ in whether the time is paid, capped, or conditional on the type of treatment.",
      },
      {
        point: "Treat every entry here as a pointer to check locally.",
        detail:
          "This is the part of the page that varies most and dates fastest — it is not a statement of your own position.",
      },
    ],
    useIt: [
      "Ask your employer's HR for the local policy in writing, and if you work for a multinational, ask whether the group fertility policy applies in your country. It often does, and is often better than local law.",
    ],
    sources: [{ label: "Ius Laboris — fertility and employment across jurisdictions", href: "https://iuslaboris.com/insights/fertility-crisis-impact-on-employment/" }],
  },
  {
    slug: "usa",
    name: "United States",
    summary:
      "No fertility-specific leave right, but three federal laws do work in the background — and the benefit itself is where the real money sits.",
    theLaw: [
      {
        point: "FMLA can cover treatment-related absence.",
        detail:
          "As a serious health condition, for eligible employees at covered employers. It is unpaid, and the eligibility rules are strict.",
      },
      {
        point: "The ADA may require reasonable accommodation.",
        detail: "Where an underlying condition qualifies as a disability.",
      },
      {
        point: "Title VII has been used successfully over IVF.",
        detail:
          "Where someone was penalised for undergoing treatment, on the basis that IVF is sex-specific.",
      },
      {
        point: "State law sits on top of all of it.",
        detail:
          "Several states have their own leave laws that may apply, and state fertility insurance mandates sit above those again.",
      },
    ],
    notTheLaw: [
      {
        point: "There is no federal right to leave for fertility treatment.",
        detail: "The federal laws above reach it only indirectly, and only for some people.",
      },
      {
        point: "Paid fertility leave is a benefit, not an entitlement.",
        detail: "It is concentrated in the largest employers.",
      },
      {
        point: "Whether treatment is covered turns on your plan document.",
        detail:
          "Specifically whether the plan is fully insured or self-funded, and what definition of infertility it uses.",
      },
    ],
    useIt: [
      "Get the plan's Summary Plan Description and read the infertility definition. If it requires a period of unprotected heterosexual intercourse, that clause is what excludes solo and same-sex patients — and many plans have now dropped it.",
      "Ask HR whether the plan is fully insured or self-funded. Self-funded plans are exempt from state mandates, so your state's IVF law may not reach you.",
    ],
    sources: [
      { label: "RESOLVE — insurance coverage and your rights", href: "https://resolve.org/learn/financial-resources/insurance-coverage/" },
      { label: "US Department of Labor — FMLA", href: "https://www.dol.gov/agencies/whd/fmla" },
    ],
  },
];

/* ── What employers offer ────────────────────────────────────────────────── */

export interface BenefitShape {
  title: string;
  body: string;
  worth: string;
}

/**
 * Job adverts use "fertility benefits" for all six of these. They are not the
 * same thing, and the difference between the first and the last is thousands
 * of pounds.
 */
export const BENEFIT_SHAPES: BenefitShape[] = [
  {
    title: "A discount at a partner clinic",
    body: "A negotiated percentage off treatment at named clinics. The cheapest thing an employer can announce.",
    worth: "Typically 5–20% off, and only at clinics you may not have chosen.",
  },
  {
    title: "A contribution",
    body: "A fixed sum towards treatment, often once per employee rather than per cycle.",
    worth: "£500–£3,000 is common in the UK.",
  },
  {
    title: "A lifetime fund",
    body: "A pot you draw against for treatment, drugs and sometimes storage, usually administered by a benefits platform.",
    worth: "The most valuable common shape. US lifetime caps cluster around $20,000; the largest UK schemes run higher.",
  },
  {
    title: "Full cycle cover",
    body: "The employer or its insurer pays for treatment directly, up to a stated number of cycles.",
    worth: "Rare, and concentrated in the largest employers.",
  },
  {
    title: "Paid leave for treatment",
    body: "Dedicated days off for appointments, separate from annual leave and sickness.",
    worth: "10 days is the emerging benchmark where it exists. Worth more than a small contribution to most people in treatment.",
  },
  {
    title: "A support platform with no treatment money",
    body: "Clinical guidance, counselling, webinars and a helpline through a third-party provider.",
    worth: "Genuinely useful, and frequently announced in language that implies treatment is funded when it is not. Ask which it is.",
  },
];

export const BENEFIT_PROVIDERS: { name: string; scope: string; body: string }[] = [
  {
    name: "Carrot Fertility",
    scope: "International",
    body: "Employer-funded family-building benefit covering IVF, preservation, adoption and surrogacy, administered through partner clinics.",
  },
  {
    name: "Maven Clinic",
    scope: "International",
    body: "Virtual care platform for fertility, pregnancy and parenting, often paired with a treatment fund.",
  },
  {
    name: "Progyny",
    scope: "USA",
    body: "Fertility benefit manager used by many large US employers, typically structured as cycle-based coverage rather than a dollar cap.",
  },
  {
    name: "Fertifa",
    scope: "UK and Europe",
    body: "Reproductive health benefits provider covering fertility treatment, menopause, and related care.",
  },
  {
    name: "Peppy",
    scope: "UK",
    body: "Digital support across fertility, menopause, men's health and early parenthood; support-led rather than treatment-funded.",
  },
  {
    name: "Apryl",
    scope: "Europe",
    body: "Employer fertility benefit covering treatment and preservation across European markets.",
  },
];

/**
 * Employers with publicly reported fertility provision. Deliberately short:
 * this list decays faster than anything else on the site, and a wrong entry
 * sends someone into a job on a false premise.
 */
export const NAMED_EMPLOYERS: { name: string; sector: string; reported: string }[] = [
  { name: "NatWest", sector: "Banking", reported: "Discounted fertility treatment for employees." },
  { name: "Monzo", sector: "Banking", reported: "Fertility and family-forming benefits as part of the standard package." },
  { name: "Centrica", sector: "Energy", reported: "Discounted IVF and related consultations." },
  { name: "Clifford Chance", sector: "Law", reported: "Egg freezing and IVF within its UK fertility benefits." },
  { name: "Co-op", sector: "Retail", reported: "Paid time off for fertility treatment." },
  { name: "Bank of Ireland", sector: "Banking", reported: "10 days' fertility leave (Ireland)." },
  { name: "Vodafone Ireland", sector: "Telecoms", reported: "Fertility leave policy (Ireland)." },
];

/* ── Finding out what you have ───────────────────────────────────────────── */

export interface AuditStep {
  title: string;
  body: string;
  /** Shown only to readers who select the US, where the questions differ. */
  usOnly?: boolean;
}

export const AUDIT_STEPS: AuditStep[] = [
  {
    title: "Search the benefits portal before you ask anyone",
    body: "Search for 'fertility', 'IVF', 'family forming' and 'family building'. Schemes are frequently live but unadvertised, and this costs you nothing and tells nobody.",
  },
  {
    title: "Check the private medical scheme separately",
    body: "Some employers buy a fertility module on the corporate health plan rather than a standalone benefit. It will not appear under 'fertility' in the benefits list.",
  },
  {
    title: "Check whether it covers you",
    body: "Ask whether the benefit is available to solo parents and same-sex couples, and whether a partner is covered. Well-designed schemes are family-building rather than infertility-based; older ones are not.",
  },
  {
    title: "Ask what is inside the money",
    body: "Drugs, donor sperm or eggs, storage and frozen transfers are the items most often outside a stated fund, and together they are a large share of the real bill.",
  },
  {
    title: "Ask about clinic restrictions and waiting periods",
    body: "Whether treatment must be at a partner clinic, and whether there is a qualifying period after joining, decide whether the benefit is usable on the timeline you are actually on.",
  },
  {
    title: "Ask what happens if you leave",
    body: "Mid-treatment departures are common and rarely covered by the announcement. Get the answer before you need it.",
  },
  {
    title: "Ask whether the plan is fully insured or self-funded",
    body: "This single question decides whether your state's IVF mandate reaches you at all. Self-funded plans are exempt from state mandates.",
    usOnly: true,
  },
  {
    title: "Read the plan's definition of infertility",
    body: "If it requires a period of unprotected heterosexual intercourse, that is the clause that excludes solo and same-sex patients. Many plans have dropped it; ask which version yours uses.",
    usOnly: true,
  },
];

/* ── Scripts ─────────────────────────────────────────────────────────────── */

export interface WorkScenario {
  slug: string;
  label: string;
  situation: string;
  whatsHappening: string[];
  notYourJob: string[];
  tryThis: string[];
  exitLine: string;
}

export const WORK_SCENARIOS: WorkScenario[] = [
  {
    slug: "asking-hr",
    label: "Asking HR what exists",
    situation: "You want to know what the company offers, without announcing that you are about to start treatment.",
    whatsHappening: [
      "Benefits teams field questions about the package all the time and have no reason to read anything into one more. The discomfort here is almost always ours rather than theirs.",
      "Asking about the policy is not the same as invoking it, and nothing obliges you to explain why you want to know.",
    ],
    notYourJob: [
      "Explaining your circumstances to get an answer about a published benefit.",
      "Justifying why you are asking now.",
      "Accepting a verbal summary when the detail is what matters.",
    ],
    tryThis: [
      "I'm reviewing the benefits package properly for the first time. Could you send me what we offer around fertility and family forming, including anything inside the private medical scheme?",
      "Is there a written fertility policy I can read, rather than the summary on the intranet?",
      "Does the fertility provision cover solo parents and same-sex couples, and does it include donor gametes and medication?",
    ],
    exitLine: "Thanks — that's all I need for now. If I have questions once I've read it, I'll come back to you.",
  },
  {
    slug: "manager-time-off",
    label: "Time off, without disclosing",
    situation: "You need appointments in work time and you do not want to explain what they are for.",
    whatsHappening: [
      "Monitoring scans land at short notice and cannot be moved; that is the part managers find hardest to plan around, and the part you cannot negotiate.",
      "You can ask for the flexibility without naming the treatment. Many people do, and later choose to say more once they know how it is received.",
    ],
    notYourJob: [
      "Naming the treatment to justify a medical appointment.",
      "Using annual leave for medical appointments if your employer's policy allows otherwise.",
      "Absorbing the cost of last-minute changes in your own time twice over.",
    ],
    tryThis: [
      "I have a course of medical appointments over the next few weeks. Some are scheduled at short notice and early in the morning. I'd like to agree how to handle them so it's predictable for both of us.",
      "I'd rather not go into the detail, but this is ongoing medical treatment rather than a one-off. Can we look at what the policy allows?",
      "I can make the time up, but the appointments themselves can't move — the clinic sets them.",
    ],
    exitLine: "I'm happy to keep this between us for now. If anything changes that affects the team, I'll tell you first.",
  },
  {
    slug: "mid-cycle",
    label: "When the cycle takes over",
    situation: "You are mid-treatment, the appointments have multiplied, and work is starting to notice.",
    whatsHappening: [
      "This is the point where people quit. More than a third of UK employees in treatment have left a job or considered it, and the trigger is usually unpredictability rather than the treatment itself.",
      "If you have reached embryo transfer, your legal position in the UK is stronger than it was a fortnight earlier, and that is worth saying out loud.",
    ],
    notYourJob: [
      "Pretending nothing is happening in order to protect other people's comfort.",
      "Taking on new deadlines you already know you cannot hold this month.",
      "Working through the day of a transfer because you did not want to ask.",
    ],
    tryThis: [
      "The next three weeks are heavy on appointments. Can we look at what moves, rather than me trying to do all of it and doing it badly?",
      "I'd like to record this as treatment-related rather than ordinary sickness absence, in line with the policy.",
      "I'm now at a stage where the pregnancy-related protections apply. I'd like to agree the appointments on that basis.",
    ],
    exitLine: "I'll keep you posted on timings as I get them. I'm not asking to disappear — I'm asking for the calendar to be realistic.",
  },
  {
    slug: "handled-badly",
    label: "When it is handled badly",
    situation: "You told someone, and the response was dismissive, intrusive or worse.",
    whatsHappening: [
      "Poor responses are usually ignorance rather than malice, which does not make them cost you less. Either way the fix is the same: get it in writing and move it up.",
      "Detrimental treatment because of fertility treatment can be sex discrimination, and from embryo transfer the pregnancy protections apply directly.",
    ],
    notYourJob: [
      "Educating your manager about fertility while you are mid-cycle.",
      "Litigating the point in the moment.",
      "Answering questions about your body, your relationship or your plans.",
    ],
    tryThis: [
      "I'd like to put what we discussed in writing so we're both clear on what was agreed.",
      "That's a more personal question than I'm going to answer. What I need is agreement on the appointments.",
      "I'd like to raise this with HR — not as a complaint about you, but because I want the position documented.",
    ],
    exitLine: "I'm going to leave it there for today. I'll follow up by email so we have a record.",
  },
  {
    slug: "job-offer",
    label: "At the offer stage",
    situation: "You are choosing between jobs, and one of them may quietly be worth £10,000 more than the other.",
    whatsHappening: [
      "Benefits questions are entirely normal at offer stage, and family-forming provision is a benefits question like pension matching. Recruiters answer these daily.",
      "You are not obliged to say you are planning treatment, and asking about a benefit is not a declaration that you will use it.",
    ],
    notYourJob: [
      "Disclosing family plans to a prospective employer.",
      "Taking 'we have great fertility support' as an answer without the document behind it.",
      "Assuming a benefit announced in the press is available from day one.",
    ],
    tryThis: [
      "Before I confirm, could you send me the benefits documentation — including anything on family forming and fertility?",
      "Is that provision available from day one, or is there a qualifying period?",
      "Does it cover solo parents and same-sex couples, and does the fund include medication and donor gametes?",
    ],
    exitLine: "That's helpful, thank you. I'll read it properly and come back with anything outstanding before I sign.",
  },
];

/* ── Offer-stage checks ──────────────────────────────────────────────────── */

export const OFFER_CHECKS: string[] = [
  "Is the benefit available from day one, or after a qualifying period? A fund that unlocks after twelve months is no use for a cycle you are planning in March.",
  "What is the cap — per cycle, per year, or lifetime — and is it stated in money or in cycles?",
  "Does it cover donor sperm and eggs? For solo parents and two-mum families this is thousands of pounds of the real bill.",
  "Are drugs inside the fund or charged separately?",
  "Does the eligibility wording cover solo parents and same-sex couples, or is it written around a couple with an infertility diagnosis?",
  "Must treatment be at a partner clinic, and is that clinic somewhere you would actually choose?",
  "Is there paid leave for appointments, and is it separate from annual leave and sickness?",
  "What happens if you leave part-way through treatment, and what happens if the employer changes provider?",
];

/* ── Making the case internally ──────────────────────────────────────────── */

export const POLICY_ELEMENTS: string[] = [
  "Paid time off for appointments, separate from annual leave and from sickness absence",
  "Treatment-related absence discounted from sickness triggers",
  "Cover that is written around family building rather than an infertility diagnosis, so solo parents and same-sex couples are included by design",
  "A stated financial contribution, with drugs, donor gametes and storage explicitly in or out",
  "Confidentiality: who is told, and who is not, when someone discloses",
  "Manager guidance, because the CIPD research consistently finds the manager relationship is what decides whether someone stays",
  "Provision for pregnancy loss, which is where fertility policies most often stop short",
];

export const CASE_SOURCES: SourceLink[] = [
  { label: "CIPD — employer guide to fertility support", href: "https://www.cipd.org/en/knowledge/guides/fertility-challenges/" },
  { label: "Fertility Network UK — workplace resources", href: "https://fertilitynetworkuk.org/" },
  { label: "Acas — pregnancy and IVF at work", href: "https://www.acas.org.uk/pregnancy-at-work/ivf-treatment" },
];
