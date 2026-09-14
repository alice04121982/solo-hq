/**
 * Content for /support ("Looking after yourself").
 *
 * Every number and organisation detail here was checked on the organisation's
 * own website, or an official NHS or government source, on
 * SUPPORT_LAST_CHECKED. Sources are listed in a comment beside each entry.
 * When you change anything, recheck all of it and bump the date.
 *
 * Deliberately excluded: Fertility Network UK (closed), the Samaritans
 * email service (closing), Fertility Friends (site could not be read on the
 * check date), Home for Good (page not found on the check date).
 *
 * Tone rules for this page: declarative or imperative sentences; every fact
 * carries an organisation, a number, hours or a cost; no evaluative
 * adjectives; no reassuring asides; no success stories; no numbers on
 * chances except the shared HFEA lines.
 */

export const SUPPORT_LAST_CHECKED = "13 September 2026";

/** Section ids. Other pages link to /support#crisis and friends. */
export type SupportAnchor =
  | "crisis"
  | "waiting"
  | "cycle-fails"
  | "loss"
  | "stopping"
  | "relationships"
  | "work"
  | "money"
  | "counselling"
  | "peer-support";

export interface SupportLink {
  label: string;
  href: string;
}

export interface SupportItem {
  name: string;
  body: string;
  links?: SupportLink[];
}

export interface SupportSection {
  id: SupportAnchor;
  title: string;
  intro?: string;
  /** Rendered first. */
  paragraphs?: string[];
  /** Rendered after the paragraphs. */
  bullets?: string[];
  /** Organisation cards, rendered after the bullets. */
  items?: SupportItem[];
  /** Section-level links, rendered last. */
  links?: SupportLink[];
  /** Rendered after everything else, in small type. */
  footnote?: string;
}

export const SUPPORT_SECTIONS: SupportSection[] = [
  {
    id: "crisis",
    title: "If you need help now",
    items: [
      {
        // Emergency services.
        name: "In immediate danger",
        body: "Call 999 or go to A&E if you are in immediate danger.",
        links: [{ label: "Call 999", href: "tel:999" }],
      },
      {
        // samaritans.org/how-we-can-help/contact-samaritan/talk-us-phone/
        name: "Samaritans",
        body: "Call 116 123, free, any time. Welsh language line: 0808 164 0123.",
        links: [
          { label: "Call 116 123", href: "tel:116123" },
          { label: "Call the Welsh language line", href: "tel:08081640123" },
          {
            label: "Samaritans website",
            href: "https://www.samaritans.org/how-we-can-help/contact-samaritan/talk-us-phone/",
          },
        ],
      },
      {
        // england.nhs.uk/2024/08/nhs-111-offering-crisis-mental-health-support-for-the-first-time/
        name: "England: NHS 111",
        body: "Call NHS 111 and choose the mental health option.",
        links: [{ label: "Call 111", href: "tel:111" }],
      },
      {
        // gov.wales/nhs-111-press-2
        name: "Wales: 111, press 2",
        body: "Call 111 and press 2 to speak to a mental health professional. Free, 24 hours a day.",
        links: [{ label: "Call 111", href: "tel:111" }],
      },
      {
        // nhs24.scot/mental-health-services-at-nhs-24/
        name: "Scotland: NHS 24",
        body: "Call 111 (NHS 24) and choose the mental health option.",
        links: [{ label: "Call 111", href: "tel:111" }],
      },
      {
        // lifelinehelpline.info
        name: "Northern Ireland: Lifeline",
        body: "Call 0808 808 8000, free, 24/7.",
        links: [
          { label: "Call 0808 808 8000", href: "tel:08088088000" },
          { label: "Lifeline website", href: "https://www.lifelinehelpline.info/" },
        ],
      },
      {
        // giveusashout.org/get-help/
        name: "Shout",
        body: "Text SHOUT to 85258, free, 24/7, anywhere in the UK.",
        links: [
          { label: "Text SHOUT to 85258", href: "sms:85258?body=SHOUT" },
          { label: "Shout website", href: "https://giveusashout.org/get-help/" },
        ],
      },
    ],
  },

  {
    id: "waiting",
    title: "Waiting for a test result",
    paragraphs: [
      // HFEA IVF page: "You'll be given a date to do a pregnancy test ... try
      // not to do this early as you may get a false result."
      // Guy's and St Thomas' (guysandstthomas.nhs.uk, IVF treatment: results
      // of your pregnancy test): test 16 days after egg collection; trigger
      // injection can stay in the blood for 8 to 10 days and make a test
      // positive when there is no pregnancy.
      "Your clinic sets the test date. It is usually about two weeks after embryo transfer; the exact day depends on the clinic and on how many days old the embryo was when it was transferred (Guy's and St Thomas' NHS Foundation Trust, for example, tests 16 days after egg collection). The HFEA advises against testing early because the result can be wrong.",
      "A home test before the clinic's date is unreliable in both directions. The hCG trigger injection given before egg collection can stay in the blood for 8 to 10 days and produce a positive result when there is no pregnancy (Guy's and St Thomas'). A negative result before the test date does not settle anything either; wait for the clinic's test.",
      // PubMed 31520259: Cozzolino, Troiano, Esencan. Bed rest after an embryo
      // transfer: a systematic review and meta-analysis. Arch Gynecol Obstet 2019.
      "There is no evidence that bed rest after transfer improves the chance of pregnancy or of a live birth. A 2019 systematic review of the trials found no difference between resting and returning to normal activity (Cozzolino and colleagues, Archives of Gynecology and Obstetrics).",
    ],
    bullets: [
      "Plan something for each day, especially in the second week.",
      "Tell one or two people you are in the wait so there is someone to message.",
      "Keep test day free of work if you can. Write down in advance what you will do that day for either result, and who you will call.",
      "If you have a partner, expect to react at different times and in different ways. Agree beforehand who takes the clinic's call and who you will tell first.",
      // hfea.gov.uk/treatments/explore-all-treatments/risks-of-fertility-treatment/
      // OHSS symptoms: swollen stomach and stomach pains (can be severe),
      // nausea and vomiting, shortness of breath, faintness, reduced urine
      // output. "Contact your clinic immediately." Strong symptoms generally
      // start in the week after egg collection.
      "Call the clinic now, or its out-of-hours number, if you have severe stomach pain or swelling, nausea or vomiting, shortness of breath, faintness, or are passing much less urine. These are symptoms of ovarian hyperstimulation syndrome (OHSS), which usually starts in the week after egg collection (HFEA). If you cannot reach the clinic, call 111. Call 999 for difficulty breathing or chest pain.",
    ],
    links: [
      {
        label: "HFEA: risks of fertility treatment",
        href: "https://www.hfea.gov.uk/treatments/explore-all-treatments/risks-of-fertility-treatment/",
      },
      { label: "OHSS on How IVF works", href: "/how-ivf-works#step-01" },
    ],
  },

  {
    id: "cycle-fails",
    title: "When a cycle fails",
    paragraphs: [
      "Nothing clinical has to be decided in the first days after a negative test.",
      "Ask the clinic for a review appointment with your consultant. It should cover what happened at each stage (response to stimulation, eggs collected, fertilisation, embryo quality, the transfer) and what, if anything, would change next time. Take notes or bring someone with you.",
    ],
    bullets: [
      // hfea.gov.uk/treatments/treatment-add-ons/ (list) and the PGT-A page:
      // endometrial receptivity testing red; PGT-A red for increasing chances
      // of having a baby for most patients, green for reducing the chances of
      // miscarriage for most patients, grey for both in older women.
      "If the clinic offers extra tests or add-ons for the next cycle, check the HFEA rating first. Endometrial receptivity testing is rated red (it may reduce the chance of success). PGT-A is rated red for increasing the chance of having a baby for most patients and green for reducing the chance of miscarriage; both are grey (not enough evidence) for older women.",
      "A second opinion from another licensed clinic is a normal step. Ask your clinic for a copy of your cycle notes to take with you.",
      // C7 verbatim; acas.org.uk/pregnancy-at-work/ivf-treatment
      "Protection from pregnancy discrimination starts at embryo transfer, once your employer knows, and continues for two weeks after you are told a transfer has failed (Acas).",
    ],
    links: [
      {
        label: "HFEA: treatment add-ons",
        href: "https://www.hfea.gov.uk/treatments/treatment-add-ons/",
      },
      { label: "How to read success rates", href: "/resources/understanding-hfea-success-rates" },
      { label: "What IVF really costs", href: "/resources/complete-solo-ivf-cost-breakdown" },
      { label: "Compare clinics", href: "/ivf-finder" },
      { label: "Your rights at work", href: "/work#rights" },
    ],
  },

  {
    id: "loss",
    title: "Miscarriage and loss",
    paragraphs: [
      // nhs.uk/conditions/miscarriage/: call 999 for heavy bleeding (soaking
      // a period pad soon after putting it on), severe tummy pain, shoulder
      // pain, feeling faint or dizzy; call 111 for light bleeding or spotting
      // with mild or no pain; contact your maternity unit or early pregnancy
      // unit. Clinician to review this list before publication.
      "Get medical help first. Call 999 or go to A&E for heavy bleeding (soaking a pad soon after putting it on), severe stomach pain, shoulder pain, or feeling faint or dizzy. For lighter bleeding or pain in early pregnancy, call your clinic, your early pregnancy unit or 111 (NHS).",
      "If you become pregnant after IVF or after a loss, tell the midwife at your booking appointment so it is in your notes.",
    ],
    items: [
      {
        // miscarriageuk.org/how-we-help/helpline/ (live chat in the same hours)
        name: "Miscarriage UK",
        body: "Formerly the Miscarriage Association. Support after miscarriage, ectopic pregnancy or molar pregnancy. Helpline 0303 003 6464: Monday, Tuesday and Thursday 9am to 4pm; Wednesday and Friday 9am to 8pm. Live chat in the same hours.",
        links: [
          { label: "Call 0303 003 6464", href: "tel:03030036464" },
          { label: "Miscarriage UK website", href: "https://www.miscarriageuk.org/" },
        ],
      },
      {
        // petalscharity.org ("provided free of charge"; self-referral or via
        // partner hospitals); petalscharity.org/pal-programme/ (six 90-minute
        // monthly online sessions, two counsellors, up to 12 clients).
        name: "Petals",
        body: "Free specialist counselling after pregnancy or baby loss, by self-referral or through partner hospitals. Its Pregnancy After Loss programme is six 90-minute monthly online group sessions, led by two Petals counsellors, for people pregnant again after a loss.",
        links: [{ label: "Petals website", href: "https://www.petalscharity.org/" }],
      },
      {
        // tommys.org/about-us/our-people/tommys-midwives: 0800 0147 800,
        // Monday to Friday 9am to 5pm; planning for pregnancy, pregnancy loss,
        // pregnancy after loss, mental health before, during or after pregnancy.
        name: "Tommy's midwives",
        body: "A line staffed by midwives for pregnancy planning, pregnancy loss and pregnancy after loss: 0800 014 7800, Monday to Friday, 9am to 5pm, or midwife@tommys.org.",
        links: [
          { label: "Call 0800 014 7800", href: "tel:08000147800" },
          {
            label: "Tommy's midwives",
            href: "https://www.tommys.org/about-us/our-people/tommys-midwives",
          },
        ],
      },
    ],
  },

  {
    id: "stopping",
    title: "Deciding to pause or stop",
    paragraphs: [
      "Four questions to put to yourself, and to your consultant, before booking another cycle:",
    ],
    bullets: [
      "What does the consultant say your realistic chance per cycle is, and how does it compare with the HFEA's published figures for your age and treatment?",
      "Do you have the money and the energy for another cycle now, or do you need a gap first?",
      "Is there a point at which you would stop, and is it ahead of you or behind you?",
      "Are you continuing because you want to, or because you feel you have not tried hard enough? The two lead to different decisions.",
    ],
    items: [
      {
        // Shared HFEA 2019 line (contract C8), verbatim from guides.ts.
        // hfea.gov.uk/treatments/explore-all-treatments/getting-emotional-support/:
        // all licensed clinics must offer counselling before treatment.
        name: "Donor eggs",
        body: "With donor eggs, the donor's age matters more than the recipient's. UK birth rates with donor eggs are above 30% per embryo transferred at every recipient age (HFEA, 2019 data: 34% under 35, 31% at 45 to 50). Every licensed clinic must offer counselling before you start (HFEA); ask for it before deciding.",
        links: [{ label: "IUI, IVF or donor eggs", href: "/resources/iui-vs-ivf-vs-donor-eggs" }],
      },
      {
        // adoptbirmingham.co.uk/news/preparing-for-adoption-after-ivf/: "at
        // least a six-month gap between the end of your last IVF treatment and
        // the start of the adoption process. This may increase to 12 months".
        // pactcharity.org/adoption/adoption-faqs/: "at least six months have
        // elapsed since the last cycle of treatment has finished".
        name: "Adoption or fostering",
        body: "Agencies expect a gap after treatment ends. Adopt Birmingham asks for at least six months between the last cycle and the start of the adoption process, rising to 12 months depending on circumstances. PACT asks for at least six months since the last cycle finished.",
        links: [{ label: "PACT adoption FAQs", href: "https://www.pactcharity.org/adoption/adoption-faqs/" }],
      },
      {
        // gateway-women.com: founded by Jody Day; online community, webinars,
        // Reignite Weekend workshops; for women childless by infertility or
        // circumstance; events listed for 2026.
        name: "A life without children",
        body: "Whether or not it felt like a choice: Gateway Women, founded by Jody Day, runs an online community, webinars and Reignite Weekend workshops for women who are childless through infertility or circumstance.",
        links: [{ label: "Gateway Women", href: "https://gateway-women.com/" }],
      },
      {
        // bica.net/find-a-counsellor
        name: "Counselling at this point",
        body: "The British Infertility Counselling Association (BICA) lists fertility counsellors who work in person or by video call. Details and the questions to ask are under Counselling below.",
        links: [{ label: "Counselling", href: "#counselling" }],
      },
    ],
  },

  {
    id: "relationships",
    title: "Partner, family and friends",
    paragraphs: [
      "Partners often want different things at different times: one ready for the next cycle, the other not; one wanting to talk about it, the other not. Separate what you believe about the treatment from what you fear about it, and say both out loud.",
      "Agree a limit before you are exhausted: a number of cycles, an amount of money, or a date. Write it down and revisit it after each cycle, not in the days after a result.",
      // hfea.gov.uk getting-emotional-support lists Relate; relate.org.uk:
      // counselling for individuals, couples and families, online and face
      // to face; part of Family Action.
      "A joint session with a fertility counsellor from the BICA directory, or with Relate (listed by the HFEA; counselling for couples and individuals, online and in person), puts a third person in the room.",
      "You decide who knows and when. You do not need to feel certain to tell people your plans. If someone asks about results: \"I'd rather not talk about results; I'll tell you when I'm ready.\" For gatherings and pregnancy announcements, one line you can repeat: \"Nothing to report. How are you?\"",
      // Golombok, Zadeh, Imrie, Smith, Freeman (2016). Single mothers by
      // choice: mother-child relationships and children's psychological
      // adjustment. Journal of Family Psychology 30(4), 409-418. PubMed
      // 26866836 / PMC4886836. Centre for Family Research (Cambridge). 51 solo
      // mother families, 52 two-parent families, children aged 4 to 9
      // conceived by donor insemination; no differences in parenting quality
      // apart from lower mother-child conflict in solo mother families.
      "If you are doing this on your own and someone raises the child's wellbeing: a Centre for Family Research (University of Cambridge) study of 51 solo-mother families and 52 two-parent families, all with a child aged 4 to 9 conceived by donor insemination, found no difference in the children's adjustment and lower mother-child conflict in the solo-mother families (Golombok and colleagues, Journal of Family Psychology, 2016).",
      "If the objection is religious, the scripts on the faith page cover family, community and religious leaders.",
    ],
    links: [
      { label: "Faith: difficult conversations", href: "/faith#conversations" },
      { label: "Relate", href: "https://www.relate.org.uk/" },
    ],
  },

  {
    id: "work",
    title: "Work",
    bullets: [
      // acas.org.uk/pregnancy-at-work/ivf-treatment: "There's no legal right
      // to paid time off for IVF appointments"; treat as medical appointments.
      "There is no legal right to time off for fertility treatment. Appointments are treated like other medical appointments under your contract (Acas).",
      // C7 verbatim; same Acas page.
      "Protection from pregnancy discrimination starts at embryo transfer, once your employer knows, and continues for two weeks after you are told a transfer has failed (Acas).",
      // acas.org.uk/pregnancy-at-work/sickness-and-difficult-pregnancies:
      // "Employers should record pregnancy-related absence separately from
      // other sickness absence. They should not count them towards any review
      // or trigger points in the absence policy."
      "Acas says pregnancy-related absence should be recorded separately from other sickness and not count towards absence triggers. Ask for treatment absence to be recorded separately too.",
      // C7 verbatim; acas.org.uk/checking-sick-pay/statutory-sick-pay-ssp;
      // legislation.gov.uk/uksi/2026/373 (ERA 2025 ss 10 to 13 in force
      // 6 April 2026). Rate £123.25 or 80% of average weekly earnings,
      // whichever is lower, up to 28 weeks.
      "Statutory sick pay is paid from the first day of absence (since 6 April 2026). It is £123.25 a week or 80% of your average weekly earnings, whichever is lower, for up to 28 weeks (Acas).",
      // Acas IVF page: related sickness treated the same as any other
      // sickness. nhs.uk/nhs-services/gps/getting-a-fit-note/: fit note after
      // 7 days; doctors, nurses, pharmacists, physiotherapists, occupational
      // therapists can issue one.
      "Sickness caused by treatment is treated like any other sickness (Acas). For an absence of more than seven days, a GP, nurse or other healthcare professional can issue a fit note (NHS).",
      // C7 verbatim; gov.uk/flexible-working (day one; 2 applications in any
      // 12-month period; decision within 2 months).
      "Flexible working can be requested from day one (since 6 April 2024), twice a year, with a decision within two months.",
      // acas.org.uk/getting-emotional-support: "Your employer might offer
      // counselling or mental health support through an employee assistance
      // programme (EAP)."
      "Your employer may offer counselling through an employee assistance programme (Acas). Ask HR or check the intranet for how to reach it.",
      // acas.org.uk/contact/get-advice: 0300 123 1100, Monday to Friday 8am to
      // 6pm; advice is free.
      "Acas helpline: 0300 123 1100, Monday to Friday, 8am to 6pm. The advice is free.",
    ],
    links: [
      { label: "Your rights at work", href: "/work#rights" },
      { label: "Acas: IVF treatment", href: "https://www.acas.org.uk/pregnancy-at-work/ivf-treatment" },
    ],
  },

  {
    id: "money",
    title: "Money worries",
    bullets: [
      "Before paying for anything, check what your employer offers. Some employers fund treatment or pay for leave; the Work page explains how to find out without disclosing more than you want to.",
      "Borrow for one cycle at a time, not for a package you may not use.",
      // fertilityfoundation.org/ivf-grants: "Each grant can contribute up to
      // £3,000"; applications from heterosexual couples, single women and
      // same-sex female and male couples; female applicant 42 and under;
      // British citizens living full time in the UK.
      "The Fertility Foundation grant contributes up to £3,000 towards treatment. It is open to heterosexual couples, single women and same-sex female and male couples who are British citizens living in the UK, with an upper age limit of 42 for the female applicant. Grants and every other funding route are on the funding page.",
      "If repayments become a problem, talk to the lender before you miss a payment.",
      // moneyhelper.org.uk/en/contact-us: 0800 011 3797, Monday to Friday
      // 9am to 5pm, free from the UK; dealing-with-debt: debt advice locator.
      "MoneyHelper, backed by the government, gives free, impartial money and debt guidance: 0800 011 3797, Monday to Friday, 9am to 5pm, and a debt advice locator for free advisers near you.",
    ],
    links: [
      { label: "Funding routes and grants", href: "/funding#routes" },
      { label: "MoneyHelper: dealing with debt", href: "https://www.moneyhelper.org.uk/en/money-troubles/dealing-with-debt" },
    ],
    footnote: "This is general information, not financial advice.",
  },

  {
    id: "counselling",
    title: "Counselling",
    items: [
      {
        // hfea.gov.uk/treatments/explore-all-treatments/getting-emotional-support/
        name: "At your clinic",
        body: "Every clinic licensed by the HFEA must offer you the chance to talk to a counsellor before you start treatment. Some clinics offer this free; others charge. Ask what is available after a failed cycle too.",
        links: [
          {
            label: "HFEA: getting emotional support",
            href: "https://www.hfea.gov.uk/treatments/explore-all-treatments/getting-emotional-support/",
          },
        ],
      },
      {
        // bica.net/find-a-counsellor (listings show each counsellor's level;
        // profiles state costs; many offer online or video sessions).
        name: "British Infertility Counselling Association (BICA)",
        body: "The British Infertility Counselling Association lists fertility counsellors and shows each one's accreditation level. Most work privately; each profile states the cost, and many offer video sessions.",
        links: [{ label: "Find a counsellor", href: "https://www.bica.net/find-a-counsellor" }],
      },
      {
        // England: england.nhs.uk/mental-health/adults/nhs-talking-therapies/
        // Wales: 111.wales.nhs.uk/counselling/ (self-referral available)
        // Scotland: nhsinform.scot what-is-psychological-therapy (speak to your GP)
        // Northern Ireland: nidirect.gov.uk/articles/mental-health-services (via GP)
        name: "NHS Talking Therapies",
        body: "In England you can refer yourself for free, without seeing your GP. In Wales you can refer yourself or ask your GP. In Scotland and Northern Ireland, ask your GP.",
        links: [
          {
            label: "Find NHS Talking Therapies in England",
            href: "https://www.nhs.uk/nhs-services/mental-health-services/find-nhs-talking-therapies-for-anxiety-and-depression/",
          },
        ],
      },
    ],
    paragraphs: ["Four questions for a first call with any counsellor:"],
    bullets: [
      "Have you worked with people going through IVF or other fertility treatment?",
      "Have you worked with families like mine: solo parents, same-sex couples, people using a donor or a surrogate?",
      "Do you know the HFEA framework and what treatment in a UK clinic involves?",
      "How do you work with someone in the middle of a cycle, rather than between cycles?",
    ],
  },

  {
    id: "peer-support",
    title: "Peer support and organisations",
    paragraphs: [
      "Cairn runs a small, moderated WhatsApp group for people in treatment, open to every family type. There is no forum on this site.",
    ],
    items: [
      {
        // dcnetwork.org: heterosexual couples, same-sex couples, single women
        // and men; Getting Started events; Telling and Talking workshops for
        // parents of children aged 0 to 7; local meetups and online groups.
        name: "Donor Conception Network",
        body: "Membership charity for families using donor eggs, sperm or embryos: heterosexual couples, same-sex couples, and single women and men. Runs Getting Started events for people considering donor conception, Telling and Talking workshops for parents of children aged 0 to 7, and local and online groups.",
        links: [{ label: "Donor Conception Network website", href: "https://dcnetwork.org/" }],
      },
      {
        // mumsnet.com/talk/lone_parents: "Use our Single Parent forum to speak
        // to other parents raising a child alone." Posts dated the check day.
        name: "Mumsnet: Lone parents",
        body: "Mumsnet's talk board for parents raising a child alone. Posts every day and a searchable archive.",
        links: [{ label: "Mumsnet Lone parents board", href: "https://www.mumsnet.com/talk/lone_parents" }],
      },
      {
        // gingerbread.org.uk: single parent families in England and Wales;
        // online information, more than 50 volunteer-led groups.
        name: "Gingerbread",
        body: "Charity for single-parent families in England and Wales: online information and advice, and more than 50 volunteer-led local groups.",
        links: [{ label: "Gingerbread website", href: "https://www.gingerbread.org.uk/" }],
      },
      {
        // opfs.org.uk/talk-to-us/lone-parent-helpline/: 0808 801 0323, Monday
        // to Friday 9.30am to 4pm; webchat in the same hours.
        name: "One Parent Families Scotland",
        body: "Lone Parent Helpline 0808 801 0323, Monday to Friday, 9.30am to 4pm, and webchat in the same hours. Advice on benefits, money when having a baby, childcare and work in Scotland.",
        links: [
          { label: "Call 0808 801 0323", href: "tel:08088010323" },
          { label: "One Parent Families Scotland", href: "https://opfs.org.uk/talk-to-us/lone-parent-helpline/" },
        ],
      },
      {
        // chana.org.uk/faq: free, confidential helpline 020 8201 5774 or
        // 020 8800 0018, answered by therapists; medical information;
        // counselling for couples and individuals.
        name: "Chana",
        body: "Jewish fertility charity. Free, confidential helpline 020 8201 5774, answered by therapists; medical information and counselling for couples and individuals.",
        links: [
          { label: "Call 020 8201 5774", href: "tel:02082015774" },
          { label: "Chana website", href: "https://www.chana.org.uk/" },
        ],
      },
    ],
    bullets: [
      // hfea.gov.uk/about-us/media-centre/faqs-relating-to-unregulated-sperm-donation:
      // no clinic health checks; ten-family limit applies only in licensed
      // clinics; donor may regard themselves as the legal parent; Facebook
      // groups given as an example.
      "Be wary of anyone in a group offering sperm outside a licensed clinic. The HFEA warns that unregulated donors have not had the health checks clinics require, that the ten-family limit applies only in licensed clinics, and that the donor may later regard themselves as your child's legal parent.",
      "Assume anything you post in a group, including a private one, can be seen by others and copied.",
    ],
    links: [
      { label: "CairnFertility community", href: "/community" },
      {
        label: "HFEA: unregulated sperm donation FAQs",
        href: "https://www.hfea.gov.uk/about-us/media-centre/faqs-relating-to-unregulated-sperm-donation",
      },
    ],
  },
];
