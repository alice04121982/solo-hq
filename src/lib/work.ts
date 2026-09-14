/**
 * Content for /work, fertility treatment and employment. UK only.
 *
 * Rules for this file, which carries more legal risk than the rest of the site:
 *  1. Separate law from policy in every sentence. Where something is a bill, a
 *     consultation or an employer's voluntary choice, say so in the same breath.
 *  2. State the rule and cite it; never advise. Point at Acas, CIPD, Working
 *     Families or a solicitor.
 *  3. Date every employer claim, with the report it was read from.
 *  4. Assume the reader has told nobody. Scripts that rely on pregnancy
 *     protection say that the employer has to know.
 *  5. No employer is a recommendation; no provider pays to appear.
 *  6. Every legal fact was checked on 13 September 2026 against gov.uk,
 *     acas.org.uk or legislation.gov.uk.
 */

import type { SourceLink } from "./funding";

/** When the legal and employer content was last checked against sources. */
export const WORK_LAST_REVIEWED = "13 September 2026";

/* ── The numbers ─────────────────────────────────────────────────────────── */

export interface WorkplaceStat {
  value: string;
  label: string;
  source: string;
}

export const WORKPLACE_STATS: WorkplaceStat[] = [
  {
    value: "27%",
    label: "Of UK employers have a policy on fertility treatment",
    source: "CIPD, Workplace support for employees experiencing fertility challenges, 2023",
  },
  {
    value: "38%",
    label: "Of UK employees in fertility treatment have left a job, or considered it, because of the toll",
    source: "Fertility Matters at Work survey of 1,000+ UK workers, July 2025",
  },
  {
    value: "63%",
    label: "Of workers in treatment say their employer has no fertility policy; 35% found their manager supportive",
    source: "Fertility Matters at Work, July 2025",
  },
];

/* ── Rights ──────────────────────────────────────────────────────────────── */

/** The `point` must stand alone as a true statement; the `detail` qualifies it and never reverses it. */
export interface RightsPoint {
  point: string;
  detail?: string;
}

export interface RightsEntry {
  slug: string;
  name: string;
  summary: string;
  theLaw: RightsPoint[];
  /** Proposed, voluntary, or down to your employer. */
  notTheLaw: RightsPoint[];
  useIt: string[];
  sources: SourceLink[];
}

export const UK_RIGHTS: RightsEntry = {
  slug: "uk",
  name: "United Kingdom",
  summary:
    "No statutory right to time off for treatment. Pregnancy protection begins earlier than most employers realise, and two general rights changed in 2024 and 2026.",
  theLaw: [
    {
      point:
        "Protection from pregnancy discrimination starts at embryo transfer, once your employer knows, and continues for two weeks after you are told a transfer has failed (Acas).",
      detail:
        "You never have to tell your employer. To rely on this protection you will need to, ideally in writing. Once a pregnancy is confirmed you also have the right to paid time off for antenatal care (gov.uk).",
    },
    {
      point: "Penalising the person undergoing egg collection can be sex discrimination.",
      detail:
        "Refusing time off, or treating someone unfavourably, because they are having treatment such as egg collection can be sex discrimination before the pregnancy protections start (Working Families). It does not cover a partner or an intended parent.",
    },
    {
      point:
        "Flexible working can be requested from day one (since 6 April 2024), twice a year, with a decision within two months.",
      detail: "A request can cover hours, days or place of work. Employers must deal with it in a reasonable manner (gov.uk).",
    },
    {
      point: "Statutory sick pay is paid from the first day of absence (since 6 April 2026).",
      detail:
        "The waiting days and the lower earnings limit were removed by the Employment Rights Act 2025. The rate is £123.25 a week or 80% of average weekly earnings, whichever is lower (Acas).",
    },
    {
      point:
        "Partners and intended parents through surrogacy can take unpaid time off for up to two antenatal appointments.",
      detail:
        "Up to six and a half hours each, unpaid (Acas). An intended parent who intends to apply for a parental order can qualify for statutory adoption leave and pay (gov.uk). There is no right to time off to attend treatment with a partner.",
    },
    {
      point: "Acas: treat it like any other medical appointment.",
      detail:
        "Fertility appointments, and sickness arising from treatment, should be handled like any other appointment or sickness under your employer's policies.",
    },
  ],
  notTheLaw: [
    {
      point: "No statutory right to time off for treatment.",
      detail:
        "There is no right in Great Britain to time off, paid or unpaid, for fertility treatment (Acas). Appointments before transfer are not antenatal appointments. What you get depends on your contract and your employer's policy.",
    },
    {
      point: "Before embryo transfer, nothing forces an employer to discount treatment absence.",
      detail:
        "Many policies keep treatment absence out of sickness trigger points (the absence totals that start a formal process); ask for it. After transfer, pregnancy-related sickness should be recorded separately and not counted towards them.",
    },
    {
      point: "The Fertility Treatment (Employment Rights) Bill did not become law.",
      detail:
        "A Private Member's Bill to require employers to allow time off for fertility treatment appointments, introduced in the 2022-23 and 2023-24 sessions. No such Act exists on legislation.gov.uk.",
    },
    {
      point: "Leave after pregnancy loss is legislated but not yet in force.",
      detail:
        "The Employment Rights Act 2025 creates at least one week of unpaid bereavement leave from day one, including pregnancy loss before 24 weeks; the government says it will take effect in 2027. The consultation, closed 15 January 2026, proposed including the unsuccessful transfer of an embryo in IVF. Whether failed transfers qualify is undecided until the regulations are made (gov.uk).",
    },
    {
      point: "The Fertility Workplace Pledge is voluntary.",
      detail:
        "Signatories commit to workplace information, staff training and flexibility for people in treatment. Co-op, NatWest, Metro Bank and Channel 4 were reported as signatories in November 2022 (Progress Educational Trust). Ask whether yours has signed.",
    },
  ],
  useIt: [
    "If you are past embryo transfer and are being treated unfavourably, you may be protected. Talk to Acas before deciding whether to raise it.",
    "Ask for treatment absence to be recorded separately from ordinary sickness, and get the answer in writing before you need it.",
    "Acas and Working Families both run free advice lines; use them before a disagreement hardens.",
    "In Northern Ireland the law is similar but separate; contact the Labour Relations Agency. Its Workplace Information Service is on 03300 555 300.",
  ],
  sources: [
    { label: "Acas: IVF treatment", href: "https://www.acas.org.uk/pregnancy-at-work/ivf-treatment" },
    { label: "gov.uk: flexible working", href: "https://www.gov.uk/flexible-working" },
    { label: "Acas: statutory sick pay", href: "https://www.acas.org.uk/checking-sick-pay/statutory-sick-pay-ssp" },
    { label: "Acas: time off for antenatal appointments", href: "https://www.acas.org.uk/paternity-rights-leave-and-pay/pregnancy-appointments" },
    { label: "gov.uk: adoption leave and pay, including surrogacy", href: "https://www.gov.uk/adoption-pay-leave/eligibility" },
    { label: "gov.uk: Employment Rights Act timeline", href: "https://www.gov.uk/government/publications/implementing-the-plan-to-make-work-pay-and-employment-rights-act/plan-to-make-work-pay-and-employment-rights-act-timeline-update" },
    { label: "Working Families: rights during fertility treatment", href: "https://workingfamilies.org.uk/articles/workplace-rights-for-those-undertaking-fertility-treatment/" },
    { label: "Labour Relations Agency (Northern Ireland)", href: "https://www.lra.org.uk/" },
  ],
};

/* ── After treatment ─────────────────────────────────────────────────────── */

export interface Signpost {
  point: string;
  detail: string;
  source: SourceLink;
}

/** Four gov.uk signposts for after a pregnancy is confirmed. The detail lives on gov.uk and changes every April. */
export const AFTER_TREATMENT_SIGNPOSTS: Signpost[] = [
  {
    point: "Statutory maternity, paternity and adoption leave",
    detail: "Employees can take statutory maternity, paternity or adoption leave and pay. Eligibility, notice periods and rates are on gov.uk.",
    source: { label: "gov.uk: maternity pay and leave", href: "https://www.gov.uk/maternity-pay-leave" },
  },
  {
    point: "Maternity Allowance if you are self-employed",
    detail:
      "£27 to £194.32 a week for up to 39 weeks, depending on your Class 2 National Insurance contributions. You can claim from 26 weeks of pregnancy and work up to 10 keeping-in-touch days without affecting it.",
    source: { label: "gov.uk: Maternity Allowance", href: "https://www.gov.uk/maternity-allowance" },
  },
  {
    point: "Surrogacy: adoption leave and pay for intended parents",
    detail:
      "Intended parents who intend to apply for a parental order, and expect it to be granted, can qualify for statutory adoption leave and pay. Pay needs 26 weeks' continuous employment by the 15th week before the due date.",
    source: { label: "gov.uk: adoption leave eligibility", href: "https://www.gov.uk/adoption-pay-leave/eligibility" },
  },
  {
    point: "Funded childcare",
    detail:
      "In England, working parents can get 30 funded hours a week for 38 weeks of the year from age 9 months to 4 years. Scotland, Wales and Northern Ireland have separate arrangements.",
    source: { label: "gov.uk: free childcare if you're working", href: "https://www.gov.uk/check-eligible-free-childcare-if-youre-working" },
  },
];

/* ── What employers offer ────────────────────────────────────────────────── */

export interface BenefitShape {
  title: string;
  body: string;
  worth: string;
}

/** Job adverts use "fertility benefits" for all six of these; they differ by thousands of pounds. */
export const BENEFIT_SHAPES: BenefitShape[] = [
  {
    title: "A discount at a partner clinic",
    body: "A negotiated percentage off treatment at named clinics. The cheapest thing an employer can announce.",
    worth: "Typically 5 to 20% off, and only at clinics you may not have chosen.",
  },
  {
    title: "A contribution",
    body: "A fixed sum towards treatment, often once per employee rather than per cycle.",
    worth: "A fixed sum, often a few thousand pounds at most.",
  },
  {
    title: "A lifetime fund",
    body: "A pot you draw against for treatment, drugs and sometimes storage, usually administered by a benefits platform.",
    worth: "The most valuable common shape.",
  },
  {
    title: "Full cycle cover",
    body: "The employer or its insurer pays for treatment directly, up to a stated number of cycles.",
    worth: "Rare, and concentrated in the largest employers.",
  },
  {
    title: "Paid leave for treatment",
    body: "Dedicated days off for appointments, separate from annual leave and sickness.",
    worth: "Where it exists, usually 5 to 10 days a year. Worth more than a small contribution to most people in treatment.",
  },
  {
    title: "A support platform with no treatment money",
    body: "Clinical guidance, counselling, webinars and a helpline through a third-party provider.",
    worth: "Useful, and frequently announced in language that implies treatment is funded when it is not. Ask which it is.",
  },
];

/** Replaces the old provider grid. One sentence is all the decision value it had. */
export const PLATFORM_LINE =
  "If your scheme runs through a platform (Carrot, Maven, Fertifa or Peppy), its own support team usually holds the detail of what you can claim, and answers questions your employer never sees.";

export interface NamedEmployer {
  name: string;
  sector: string;
  reported: string;
  /** "Reported [month year]" or "checked [month year]" for a first-party page. */
  when: string;
  source: SourceLink;
}

/** Deliberately short: this list decays faster than anything else on the site. */
export const NAMED_EMPLOYERS: NamedEmployer[] = [
  {
    name: "NatWest",
    sector: "Banking",
    reported: "Discounted treatment through Fertifa; five days' leave per treatment cycle for up to three cycles.",
    when: "Reported 2022",
    source: { label: "Working Families case study", href: "https://workingfamilies.org.uk/employers/case-studies/natwest-winner-2022-best-for-supporting-fertility-and-pathways-to-parenthood/" },
  },
  {
    name: "Co-op",
    sector: "Retail",
    reported: "Time off for colleagues undergoing treatment, for surrogates and for their partners.",
    when: "Reported November 2022",
    source: { label: "Progress Educational Trust", href: "https://www.progress.org.uk/major-employers-back-fertility-workplace-pledge/" },
  },
  {
    name: "Centrica",
    sector: "Energy",
    reported: "Paid time off for treatment and support with funding it, under its Pathway to Parenthood programme.",
    when: "Checked September 2026",
    source: { label: "Centrica careers site", href: "https://www.lifeatcentrica.com/belonging-growth/supporting-you/" },
  },
  {
    name: "Clifford Chance",
    sector: "Law",
    reported: "Private medical cover extended to fertility investigations and treatment up to £15,000, with Peppy for advice.",
    when: "Reported June 2021",
    source: { label: "People in Law", href: "https://peopleinlaw.co.uk/top-law-firms-offer-new-fertility-staff-benefits/" },
  },
];

/* ── Scripts ─────────────────────────────────────────────────────────────── */

/**
 * The short first email to HR, verbatim from the former employer-benefits
 * guide (contract C9). The fuller versions are built in benefits-audit.tsx.
 */
export const HR_FIRST_EMAIL =
  "Hi [Name], I wanted to ask whether our benefits package includes any support for fertility treatment or IVF. I understand this is becoming more common and wanted to understand what might be available before I make any plans. Happy to chat if useful. Thanks, [Your name]";

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
    slug: "manager-time-off",
    label: "Time off, without disclosing",
    situation: "You need appointments in work time and you do not want to explain what they are for.",
    whatsHappening: [
      "Monitoring scans land at short notice and cannot be moved, and you can ask for flexibility around them without naming the treatment.",
    ],
    notYourJob: [
      "Naming the treatment to justify a medical appointment.",
      "Using annual leave for medical appointments if your employer's policy allows otherwise.",
      "Absorbing the cost of last-minute changes in your own time twice over.",
    ],
    tryThis: [
      "I have a course of medical appointments over the next few weeks. Some are scheduled at short notice and early in the morning. I'd like to agree how to handle them so it's predictable for both of us.",
      "I'd rather not go into the detail, but this is ongoing medical treatment rather than a one-off. Can we look at what the policy allows?",
      "I can make the time up, but the appointments themselves can't move: the clinic sets them.",
    ],
    exitLine: "I'm happy to keep this between us for now. If anything changes that affects the team, I'll tell you first.",
  },
  {
    slug: "mid-cycle",
    label: "When the cycle takes over",
    situation: "You are mid-treatment, the appointments have multiplied, and work is starting to notice.",
    whatsHappening: [
      "If you have reached embryo transfer, you may be protected from pregnancy discrimination, but only once your employer knows.",
    ],
    notYourJob: [
      "Explaining more than you want to.",
      "Taking on new deadlines you already know you cannot hold this month.",
      "Working through the day of a transfer because you did not want to ask.",
    ],
    tryThis: [
      "The next three weeks are heavy on appointments. Can we look at what moves, rather than me trying to do all of it and doing it badly?",
      "I'd like to record this as treatment-related rather than ordinary sickness absence, in line with the policy.",
      "I've had an embryo transfer, so pregnancy protections apply from now, but only once you know. I'm telling you so it's on record, and I'll confirm it in writing.",
    ],
    exitLine: "I'll keep you posted on timings as I get them. I'm not asking to disappear. I'm asking for the calendar to be realistic.",
  },
  {
    slug: "handled-badly",
    label: "When it is handled badly",
    situation: "You told someone, and the response was dismissive, intrusive or worse.",
    whatsHappening: [
      "Unfavourable treatment because of fertility treatment can be sex discrimination, and from embryo transfer the pregnancy protections apply once your employer knows.",
    ],
    notYourJob: [
      "Educating your manager about fertility while you are mid-cycle.",
      "Litigating the point in the moment.",
      "Answering questions about your body, your relationship or your plans.",
    ],
    tryThis: [
      "I'd like to put what we discussed in writing so we're both clear on what was agreed.",
      "That's a more personal question than I'm going to answer. What I need is agreement on the appointments.",
      "I'd like to raise this with HR, not as a complaint about you, but because I want the position documented.",
    ],
    exitLine: "I'm going to leave it there for today. I'll follow up by email so we have a record.",
  },
];

/* ── Making the case internally ──────────────────────────────────────────── */

export const POLICY_ELEMENTS: string[] = [
  "Paid time off for appointments, separate from annual leave and from sickness absence",
  "Treatment-related absence discounted from sickness triggers",
  "Cover that is written around family building rather than an infertility diagnosis, so solo parents, same-sex couples and surrogacy are included by design",
  "A stated financial contribution, with drugs, donor sperm or eggs, and storage explicitly in or out",
  "Confidentiality: who is told, and who is not, when someone discloses",
  "Manager guidance, because CIPD research finds the manager relationship decides whether someone stays",
  "Provision for pregnancy loss, which is where fertility policies most often stop short",
];

export const CASE_SOURCES: SourceLink[] = [
  { label: "CIPD: employer guide to fertility support", href: "https://www.cipd.org/en/knowledge/guides/fertility-challenges/" },
  { label: "Acas: pregnancy and IVF at work", href: "https://www.acas.org.uk/pregnancy-at-work/ivf-treatment" },
];
