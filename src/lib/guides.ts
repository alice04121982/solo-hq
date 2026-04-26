export interface GuideSection {
  heading: string;
  body: string[];
  bullets?: string[];
  postBody?: string[];
  postBullets?: string[];
  numbered?: string[];
  callout?: string;
}

export interface Guide {
  slug: string;
  title: string;
  type: "Guide" | "Checklist" | "Template" | "Script" | "Explainer" | "Directory" | "Stories" | "Reading list";
  category: string;
  categorySlug: string;
  readTime: string;
  intro: string;
  sections: GuideSection[];
  keyTakeaways?: string[];
}

export const GUIDES: Guide[] = [
  // ─── Finance & Costs ────────────────────────────────────────────────────────
  {
    slug: "complete-solo-ivf-cost-breakdown",
    title: "The complete solo IVF cost breakdown (2025)",
    type: "Guide",
    category: "Finance & Costs",
    categorySlug: "finance-costs",
    readTime: "8 min read",
    intro:
      "The headline IVF price you see on a clinic's website is rarely the number you'll actually pay. For solo patients using donor sperm, the real cost is typically 30–50% higher than the advertised figure. This guide breaks down every line item so you can build a genuinely accurate budget before you begin.",
    sections: [
      {
        heading: "Why the headline price is misleading",
        body: [
          "UK fertility clinics are legally required to advertise their prices, but most headline figures cover only the basic IVF cycle — stimulation drugs, egg collection, fertilisation, and embryo transfer. For a solo patient using donor sperm, several additional costs apply that can add thousands to the total.",
          "Always ask clinics for an itemised written quote. Verbal estimates are not reliable, and costs vary significantly between clinics.",
        ],
      },
      {
        heading: "The full cost breakdown",
        body: [
          "Here is every cost category you should budget for on a single solo IVF cycle in the UK in 2025:",
        ],
        bullets: [
          "Basic IVF cycle: £3,500–£6,500 depending on clinic and location",
          "ICSI (intracytoplasmic sperm injection — required for frozen donor sperm): £800–£1,500 if not included",
          "Stimulation drugs: £1,000–£2,500 per cycle (varies enormously with protocol)",
          "Donor sperm: £800–£1,800 per vial (most solo patients buy 2–4 vials upfront)",
          "Sperm import and handling fee: £300–£600",
          "CMV testing and additional screening: £100–£300",
          "Mandatory counselling (HFEA requirement): £150–£400 per session, typically 2–3 sessions",
          "Initial consultation: £150–£300",
          "Baseline blood tests and scans: £200–£500",
          "Embryo freezing and annual storage: £300–£500/year",
          "Frozen embryo transfer (FET) cycle: £1,200–£2,500 per transfer",
          "Add-ons (PGT-A, embryo glue, assisted hatching — optional): £500–£3,000",
        ],
      },
      {
        heading: "Real total: what a solo patient actually pays",
        body: [
          "Based on the above, a realistic all-in cost for a single solo IVF cycle — including donor sperm, drugs, counselling, and all clinic fees — ranges from approximately £8,000 to £14,000.",
          "Most solo patients do not achieve pregnancy on the first cycle. The HFEA reports cumulative success rates that improve significantly across multiple cycles. Budgeting for two to three cycles before you start is advisable, not pessimistic — it removes the financial pressure that can make decision-making harder during treatment.",
          "A full solo journey including three cycles, embryo storage for two years, and any frozen embryo transfers typically totals £18,000–£30,000.",
        ],
        callout:
          "Rule of thumb: take the clinic's quoted price, double it, and use that as your working budget ceiling. If you spend less, you've protected yourself. If treatment takes longer, you won't be financially blindsided.",
      },
      {
        heading: "Costs you can reduce",
        body: [
          "Not all of these costs are fixed. Here is where there is genuine room to reduce spend:",
        ],
        bullets: [
          "Sperm banks: prices vary significantly between Cryos, European Sperm Bank, London Sperm Bank, and others. Shop around for the same donor profile at a lower vial price.",
          "Drugs: ask your GP if any stimulation medications can be prescribed on the NHS. Some ICBs will prescribe these even for private patients.",
          "Multi-cycle packages: most clinics offer 2- or 3-cycle packages at 10–20% discount. If you have the capital, these save money and reduce paperwork.",
          "Monitoring scans: some clinics allow you to do mid-cycle monitoring scans at a local clinic or hospital rather than travelling back to the treating clinic for every appointment.",
          "Consultations: once you have a diagnosis and a treatment plan, follow-up calls are often unnecessary. Ask for email updates where possible.",
        ],
      },
    ],
    keyTakeaways: [
      "Never rely on a headline clinic price — always request a full itemised written quote",
      "Donor sperm, ICSI, drugs and counselling add £3,000–£6,000 on top of a basic cycle fee",
      "Budget for 2–3 cycles minimum before you start",
      "Multi-cycle packages typically save 10–20% and are worth considering if you have the capital",
      "A complete solo IVF journey typically costs £18,000–£30,000 across multiple cycles",
    ],
  },

  {
    slug: "fertility-finance-options",
    title: "Fertility finance options: loans, grants & employer schemes",
    type: "Guide",
    category: "Finance & Costs",
    categorySlug: "finance-costs",
    readTime: "6 min read",
    intro:
      "IVF is expensive and rarely covered by NHS funding for single women in most areas of England. But there are more funding routes than most people realise — from specialist fertility loans to employer benefit schemes and charitable grants. This guide covers every option available in the UK in 2025.",
    sections: [
      {
        heading: "NHS funding: what single women can actually access",
        body: [
          "NHS-funded IVF for single women exists in theory but is extremely patchy in practice. Criteria are set by local Integrated Care Boards (ICBs) and vary enormously. Most ICBs in England require patients to be in a heterosexual relationship. Some Scottish Health Boards are more inclusive.",
          "Before assuming you are ineligible, check your specific ICB's current policy at icb.nhs.uk or by calling your GP surgery. Criteria change, and some areas have quietly become more inclusive in recent years. It is always worth asking.",
        ],
      },
      {
        heading: "Employer fertility benefits",
        body: [
          "This is one of the most underused funding routes. Large UK employers — particularly in financial services, tech, law, and the public sector — increasingly offer fertility benefits as part of their employee package. These range from small contributions (£500–£1,000) to full cycle funding (£10,000+) through platforms like Carrot Fertility, Fertifa, and Peppy.",
          "How to find out what your employer offers:",
        ],
        bullets: [
          "Search your staff intranet or benefits portal for 'fertility', 'IVF', or 'family planning'",
          "Contact HR or your benefits team directly and ask explicitly — many employees do not know these benefits exist",
          "Check whether your employer is listed on the Fertifa employer directory at fertifa.com",
          "If your employer has no policy, consider whether you are in a position to advocate for one — the business case for fertility benefits is well established",
        ],
        callout:
          "Carrot Fertility and Fertifa both offer employer-sponsored cycles through partner clinics. If your employer uses either platform, you may be able to access fully funded treatment.",
      },
      {
        heading: "Specialist fertility loans",
        body: [
          "Standard personal loans are one option, but several lenders offer products specifically designed for fertility treatment — sometimes with more favourable rates or deferred repayment terms that align with treatment timelines.",
          "Options to consider:",
        ],
        bullets: [
          "Clinic payment plans: many clinics offer 0% interest payment plans over 6–12 months",
          "Novuna (formerly Hitachi Capital): specialist healthcare finance frequently offered at point of sale by clinics",
          "Personal loans from high street banks: comparison sites like MoneySuperMarket can identify the lowest APR",
          "Credit unions: some offer lower-rate personal loans to members — worth checking if you belong to one",
        ],
        postBody: [
          "If you take a loan for fertility treatment, structure it carefully. Borrow only what you need for one cycle at a time rather than the full projected cost of multiple cycles — this keeps your monthly payments manageable and avoids being locked into debt if treatment concludes sooner than expected.",
        ],
      },
      {
        heading: "Grants and charitable funding",
        body: [
          "Several charities and foundations offer grants specifically for fertility treatment. Competition is high, but the amounts are meaningful and do not need to be repaid.",
        ],
        bullets: [
          "The Fertility Foundation (fertilityfoundation.org): provides grants to patients in financial hardship. Single women are eligible.",
          "Gift of IVF (giftofivf.co.uk): fully funded IVF cycles donated by clinic partners",
          "Endometriosis UK: signposting to funding support for patients with endometriosis",
          "Some clinics run their own hardship or bursary programmes — always ask",
          "Pay It Forward schemes: some patients who complete treatment donate unused medications. Check Fertility Network UK's Facebook groups.",
        ],
      },
      {
        heading: "Tax considerations",
        body: [
          "Fertility treatment costs are not tax-deductible for employees in the UK. However, if you are self-employed and receiving fertility treatment partly to preserve your ability to work, some costs may have a legitimate business case — discuss this with an accountant.",
          "If your employer pays for fertility treatment, HMRC currently treats employer-funded IVF as a non-taxable medical benefit in most circumstances, but this is an evolving area. Check with a tax adviser if your employer is offering significant funding.",
        ],
      },
    ],
    keyTakeaways: [
      "Check your employer's benefits portal — fertility funding is more common than most employees realise",
      "NHS funding for single women exists in some areas — always check your local ICB criteria",
      "Specialist fertility loans and clinic payment plans can spread the cost with low or zero interest",
      "The Fertility Foundation and Gift of IVF offer grants that do not need to be repaid",
      "Never borrow more than you need for one cycle at a time",
    ],
  },

  {
    slug: "ivf-budget-template",
    title: "Budget spreadsheet template",
    type: "Template",
    category: "Finance & Costs",
    categorySlug: "finance-costs",
    readTime: "3 min read",
    intro:
      "A complete IVF budget template covering every cost category for solo patients using donor sperm. Use this as your financial planning baseline — adjust the figures to match quotes from your chosen clinic.",
    sections: [
      {
        heading: "How to use this template",
        body: [
          "Start by getting written quotes from two or three clinics for all the items below. Do not rely on website prices — always request an itemised written quote. Enter the figures from your preferred clinic and use the contingency column to build in a buffer for unexpected costs.",
          "Plan your budget across the number of cycles you are prepared to fund — most financial planners in this space recommend budgeting for three cycles before you begin, to avoid the pressure of making clinical decisions based on financial stress.",
        ],
      },
      {
        heading: "One-time costs",
        body: ["These costs typically occur once, regardless of how many cycles you complete:"],
        bullets: [
          "Initial consultation fee: £150–£300",
          "Baseline tests (AMH, FSH, AFC, blood panel): £200–£500",
          "Mandatory counselling sessions (HFEA requirement): £150–£400 × 2–3 sessions",
          "Donor sperm selection (bank registration fee): £0–£150",
          "Sperm vials: £800–£1,800 per vial × quantity purchased (buy 3–4 upfront for sibling potential)",
          "Sperm import and quarantine: £300–£600",
          "Sperm storage at clinic (annual): £200–£400/year",
        ],
      },
      {
        heading: "Per-cycle costs",
        body: ["These costs apply to every treatment cycle:"],
        bullets: [
          "IVF base fee: £3,500–£6,500",
          "ICSI: £800–£1,500 (often included in donor sperm cycle packages)",
          "Stimulation drugs: £1,000–£2,500 (request an estimate based on your AMH)",
          "Monitoring scans (if not included): £200–£600",
          "Embryo freezing (if applicable): £300–£500",
          "Annual embryo storage: £300–£500/year",
        ],
      },
      {
        heading: "Frozen embryo transfer (FET) costs",
        body: [
          "If you have frozen embryos from a stimulated cycle, each transfer attempt costs significantly less than a full cycle:",
        ],
        bullets: [
          "FET cycle fee: £1,200–£2,500",
          "Endometrial preparation drugs (usually progesterone + oestrogen): £200–£500",
          "Monitoring scans: £200–£400 (or included in FET fee)",
        ],
      },
      {
        heading: "Contingency and total",
        body: [
          "Add a 15–20% contingency to your total budget for unexpected costs: additional consultations, medication changes, cycle cancellations, courier fees for drugs, and time off work.",
          "Your working budget formula: (One-time costs) + (Per-cycle costs × planned cycles) + (FET costs × expected transfers) + 20% contingency.",
          "Enter the figures in a spreadsheet with three columns: Estimated cost, Actual cost, and Difference. Review it monthly throughout your treatment journey.",
        ],
        callout:
          "Download the Flying Solo budget template as a Google Sheet — it includes pre-filled formulas and a month-by-month cash flow projection.",
      },
    ],
    keyTakeaways: [
      "Always work from itemised written quotes, not website prices",
      "Buy 3–4 sperm vials upfront to secure sibling potential at the same price",
      "Budget for three full IVF cycles before you start",
      "Add 15–20% contingency to your total estimated cost",
      "FETs are significantly cheaper than fresh cycles — track your frozen embryos carefully",
    ],
  },

  {
    slug: "employer-fertility-benefits",
    title: "How to ask your employer about fertility benefits",
    type: "Script",
    category: "Finance & Costs",
    categorySlug: "finance-costs",
    readTime: "4 min read",
    intro:
      "Asking your employer for fertility support is a conversation many solo mums by choice never have — either because they assume the answer is no, or because they do not know how to raise it. This guide gives you a practical script and context to make the conversation as effective as possible.",
    sections: [
      {
        heading: "Before you ask: do your research",
        body: [
          "Before approaching HR, spend 20 minutes checking what might already exist. Many large employers have fertility benefits that go unused because employees simply do not know about them.",
        ],
        bullets: [
          "Search your intranet for 'IVF', 'fertility', or 'family forming'",
          "Check the staff handbook or benefits summary document",
          "Look up your employer on the Fertifa employer directory (fertifa.com/employers)",
          "Ask a trusted colleague who has navigated this before, if one exists",
        ],
      },
      {
        heading: "Who to speak to and how",
        body: [
          "Your first contact should typically be HR, not your line manager — HR conversations carry more confidentiality expectations and HR staff are better placed to answer questions about benefit entitlements.",
          "Email is better than an unannounced call for this type of conversation. It gives the other person time to check what exists before responding, and creates a written record.",
          "You do not need to disclose why you are asking at this stage. A simple initial message is enough.",
        ],
        callout:
          "Sample email: 'Hi [Name], I wanted to ask whether our benefits package includes any support for fertility treatment or IVF. I understand this is becoming more common and wanted to understand what might be available before I make any plans. Happy to chat if useful. Thanks, [Your name]'",
      },
      {
        heading: "If there is no policy: making the case",
        body: [
          "If your employer has no current fertility policy, you are in a position to be the person who creates one. This is increasingly a retention and recruitment issue for employers — fertility benefits are one of the most frequently cited workplace benefits by employees under 40.",
          "A short business case to HR might cover:",
        ],
        bullets: [
          "The cost of losing and replacing an experienced employee versus the cost of providing IVF support",
          "Competitor employers who already offer this benefit (this is easy to research)",
          "The Fertility Foundation's employer resources at fertilityfoundation.org",
          "The growing legal landscape: while there is no current UK legal right to fertility treatment time off, employment tribunals have found in favour of employees in some cases",
        ],
      },
      {
        heading: "What a good fertility benefit looks like",
        body: [
          "If your employer is open to creating a policy, here is what a meaningful fertility benefit typically includes:",
        ],
        bullets: [
          "Financial contribution: £1,500–£10,000 toward treatment costs",
          "Paid time off for appointments: typically 5–10 days of dedicated fertility leave",
          "EAP (employee assistance programme) support with fertility-aware counselling",
          "Access to a fertility benefit platform (Carrot, Fertifa, or Peppy) for case management",
          "Flexible working during treatment (critical for monitoring scans and recovery)",
        ],
      },
    ],
    keyTakeaways: [
      "Check what already exists before asking — many employees are unaware of existing benefits",
      "Email HR rather than your line manager for initial enquiries",
      "You do not need to disclose your personal situation to enquire about what benefits exist",
      "If no policy exists, you are well-placed to make the business case for one",
      "A good fertility benefit includes financial contribution, paid leave, and flexible working",
    ],
  },

  // ─── Treatment & Clinics ─────────────────────────────────────────────────────
  {
    slug: "iui-vs-ivf-vs-donor-eggs",
    title: "IUI vs IVF vs donor eggs: which is right for you?",
    type: "Guide",
    category: "Treatment & Clinics",
    categorySlug: "treatment-clinics",
    readTime: "7 min read",
    intro:
      "The three main routes to solo pregnancy — IUI, IVF with donor sperm, and donor egg IVF — have very different success rates, costs, and physical demands. The right starting point depends on your age, ovarian reserve, and circumstances. This guide cuts through the clinical jargon to help you understand your options clearly.",
    sections: [
      {
        heading: "IUI (Intrauterine Insemination)",
        body: [
          "IUI involves placing prepared donor sperm directly into the uterus at the point of ovulation — either in a natural cycle or after mild hormonal stimulation. It is the least invasive and least expensive option.",
          "Success rates are lower than IVF — typically 10–18% per attempt for women under 35, falling to 5–10% over 38. Most guidelines recommend no more than three to six IUI cycles before moving to IVF, as continuing beyond this is generally not cost-effective.",
          "IUI is a reasonable starting point if you are under 35, have good ovarian reserve, no known tube or egg quality issues, and want to begin treatment with a lower financial and physical commitment. It is not recommended as a first-line treatment for women over 40.",
        ],
        callout:
          "Cost: approximately £800–£1,500 per cycle including donor sperm. For context, three failed IUI cycles costs roughly the same as one IVF cycle — factor this into your planning.",
      },
      {
        heading: "IVF with donor sperm",
        body: [
          "IVF is the most commonly used treatment for solo patients. Ovaries are stimulated with hormonal injections to produce multiple eggs; those eggs are fertilised with donor sperm in the laboratory; resulting embryos are assessed and one is transferred to the uterus, with any remaining high-quality embryos frozen.",
          "Success rates (live birth per cycle) for women using their own eggs with donor sperm: approximately 40% for women under 35, 33% for 35–37, 22% for 38–39, 12–15% for 40–42, and around 5% for women over 43. These figures are drawn from HFEA 2022 data.",
          "IVF makes sense as a first-line treatment for women over 35, anyone with a diagnosis that reduces natural conception probability, or those who want to maximise their chances from the outset.",
        ],
        bullets: [
          "Allows embryo freezing — gives you future FET attempts from a single stimulation",
          "Enables preimplantation genetic testing (PGT-A) if relevant to your situation",
          "One stimulated cycle can yield multiple embryos for future siblings",
          "Higher chance of pregnancy per attempt than IUI",
        ],
      },
      {
        heading: "Donor egg IVF",
        body: [
          "Donor egg IVF uses eggs from a screened, anonymous or identity-release donor rather than your own eggs. It is typically recommended when egg quality or quantity is significantly reduced — usually from around 42–43+ or after multiple failed IVF cycles with your own eggs.",
          "Success rates for donor egg IVF are substantially higher than own-egg IVF for older patients — around 35–45% per transfer regardless of the recipient's age — because the outcome depends primarily on the donor's egg quality, not the recipient's ovarian reserve.",
          "In the UK, egg donors are anonymous until the donor-conceived child turns 18, at which point they have the right to access the donor's identifying information from the HFEA register. This is an important consideration in your decision and in how you plan to talk to your future child about their conception.",
        ],
      },
      {
        heading: "Making the decision",
        body: [
          "Your consultant will make a recommendation based on your test results — particularly your AMH (anti-Müllerian hormone), antral follicle count, age, and any relevant medical history. Use this as the primary clinical guidance.",
          "Beyond the clinical picture, consider the financial and emotional implications of each route. IUI is lower commitment but potentially a less efficient use of money and time for women over 35. IVF with your own eggs is the most common choice. Donor eggs should be considered pragmatically, not as a last resort — the success rates are genuinely better for older patients.",
        ],
        callout:
          "Ask your consultant: 'Based on my AMH and AFC, what is the realistic probability of success per cycle with IUI, with my own eggs, and with donor eggs?' Getting real numbers for your specific situation is more useful than any general guide.",
      },
    ],
    keyTakeaways: [
      "IUI is lowest cost and least invasive but has lower success rates — most suitable under 35 with good ovarian reserve",
      "IVF with own eggs is the most common route for solo patients and allows embryo freezing",
      "Donor egg IVF has higher success rates for women over 42 and after multiple own-egg IVF failures",
      "Success rates drop significantly with age — especially own-egg IVF over 40",
      "Always ask for success rate numbers specific to your age group and ovarian reserve, not clinic averages",
    ],
  },

  {
    slug: "consultation-questions",
    title: "Questions to ask at your first consultation",
    type: "Checklist",
    category: "Treatment & Clinics",
    categorySlug: "treatment-clinics",
    readTime: "5 min read",
    intro:
      "Your first fertility consultation typically lasts 45–60 minutes and covers a lot of ground quickly. Going in with prepared questions ensures you leave with the information you need to make decisions. This checklist covers everything worth asking — pick the ones most relevant to your situation.",
    sections: [
      {
        heading: "About your specific situation",
        body: ["Start with your own clinical picture:"],
        numbered: [
          "What do my test results (AMH, FSH, AFC) tell you about my ovarian reserve, and how does this compare to what you would expect for my age?",
          "Based on my results, what treatment do you recommend as a first-line approach — IUI or IVF?",
          "What is the realistic success rate per cycle for someone with my profile at this clinic?",
          "Are there any investigations you would want to do before we start treatment?",
          "Is there anything about my history that would change your recommendation?",
        ],
      },
      {
        heading: "About the clinic",
        body: ["These questions help you assess whether this is the right clinic for you:"],
        numbered: [
          "Do you routinely treat single women and women using donor sperm? What proportion of your patients are solo?",
          "What are your success rates for my age group using own eggs with donor sperm? (Ask to see the HFEA-reported figures specifically, not internal marketing data.)",
          "How many consultants work here, and will I see the same person throughout my treatment?",
          "What is your policy on add-ons such as PGT-A, embryo glue, and endometrial scratch? How do you advise patients on these?",
          "How responsive are you between appointments — is there a nurse coordinator I can contact with questions?",
        ],
      },
      {
        heading: "About costs",
        body: ["Always leave with a written cost breakdown:"],
        numbered: [
          "Can you provide me with a full itemised quote in writing that covers everything — drugs, ICSI, donor sperm handling, counselling, storage, and any standard add-ons?",
          "What is not included in your standard IVF quote?",
          "Do you offer multi-cycle packages, and what do they cost?",
          "What are your cancellation and refund policies if a cycle needs to be stopped?",
          "Do you offer any funding schemes, payment plans, or finance options?",
        ],
      },
      {
        heading: "About donor sperm",
        body: ["As a solo patient, these are particularly important:"],
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
        body: ["Understanding what treatment actually involves day-to-day:"],
        numbered: [
          "How many monitoring scans will I need, and can any of these be done at a clinic closer to where I live or work?",
          "What does the stimulation protocol typically involve in terms of daily injections?",
          "How much time off work should I plan for egg collection?",
          "What is your embryo transfer policy — single embryo transfer only?",
          "What support do you offer if a cycle fails or if I have a pregnancy loss?",
        ],
      },
    ],
    keyTakeaways: [
      "Always ask for a full itemised written quote before you leave — verbal estimates are not reliable",
      "Ask for HFEA-reported success rates for your specific age group, not headline clinic averages",
      "Confirm the clinic's experience with solo patients specifically",
      "Understand the monitoring scan schedule before you commit — this affects your working life significantly",
      "Leave with a clear sense of what happens next and who your named nurse contact is",
    ],
  },

  {
    slug: "understanding-hfea-success-rates",
    title: "Understanding HFEA success rates",
    type: "Explainer",
    category: "Treatment & Clinics",
    categorySlug: "treatment-clinics",
    readTime: "5 min read",
    intro:
      "The HFEA (Human Fertilisation and Embryology Authority) publishes success rate data for every licensed UK fertility clinic. But the numbers are often misread or misrepresented. This guide explains exactly what the figures mean, how to compare them fairly, and what questions to ask when a clinic quotes you a headline success rate.",
    sections: [
      {
        heading: "What the HFEA measures — and what it does not",
        body: [
          "HFEA success rates measure live birth rate per embryo transferred — the proportion of transfers that result in a baby taken home. This is the most meaningful clinical outcome, but it is not the only number clinics quote.",
          "Be wary of clinics that quote 'pregnancy rate' rather than 'live birth rate'. Pregnancy rates (which include biochemical pregnancies and miscarriages) are consistently higher and less useful as a planning metric. Always ask for live birth rate.",
          "HFEA data is reported by age group: under 35, 35–37, 38–39, 40–42, 43–44, and 45+. The age of the egg at the time of egg collection is what matters — not your age at transfer. If you are using frozen embryos created two years ago when you were 37, use the 35–37 success rate figures.",
        ],
      },
      {
        heading: "Why clinic comparison is harder than it looks",
        body: [
          "Raw success rates are not a fair basis for comparison without context. Several factors can make a clinic's numbers look better or worse than the clinical reality:",
        ],
        bullets: [
          "Patient mix: a clinic that treats more older patients or patients with poor prognosis will have lower headline rates even if it is excellent at what it does",
          "Cancellation policy: clinics that cancel more cycles (removing them from the denominator) can show higher per-transfer rates",
          "Embryo transfer policy: clinics that are more selective about which embryos to transfer will show higher per-transfer rates but achieve that by discarding more embryos",
          "Data lag: HFEA reports are typically two to three years behind the current date — the 2022 data published in 2024 reflects treatment from two years ago",
          "Volume: clinics with lower patient numbers will have more statistical noise in their rates",
        ],
        callout:
          "The most useful comparison: ask each clinic for their live birth rate for women in your exact age group using own eggs and donor sperm. This is more precise than their overall headline rate.",
      },
      {
        heading: "How to find a clinic's HFEA data",
        body: [
          "All licensed UK clinic data is publicly available at hfea.gov.uk/choose-a-clinic. You can search by location and filter by age group.",
          "When reviewing the data, look at:",
        ],
        bullets: [
          "Live birth rate per embryo transferred — the primary metric",
          "Number of cycles per year — a proxy for experience and volume",
          "Trends over time — is the clinic improving?",
          "Cancellation rate — a high rate may indicate aggressive stimulation or low quality control",
        ],
      },
      {
        heading: "National benchmarks",
        body: [
          "As a reference point, the UK national average live birth rates per embryo transferred (HFEA 2022 data) are:",
        ],
        bullets: [
          "Under 35: approximately 37–40%",
          "35–37: approximately 30–33%",
          "38–39: approximately 21–24%",
          "40–42: approximately 12–15%",
          "43–44: approximately 5–7%",
          "45+: approximately 2–4%",
        ],
        postBody: [
          "These figures include all embryo types. Donor egg cycles show higher rates across all recipient age groups — typically 35–45% live birth per transfer.",
        ],
      },
    ],
    keyTakeaways: [
      "Always ask for live birth rate, not pregnancy rate",
      "Compare success rates for your specific age group, not the clinic's overall average",
      "Use the egg's age at collection, not your current age, when selecting the right age group",
      "Raw rate comparison is misleading — patient mix and transfer policy affect the numbers",
      "HFEA clinic data is at hfea.gov.uk/choose-a-clinic and is publicly available for every licensed clinic",
    ],
  },

  {
    slug: "how-to-choose-a-sperm-donor",
    title: "How to choose a sperm donor",
    type: "Guide",
    category: "Treatment & Clinics",
    categorySlug: "treatment-clinics",
    readTime: "8 min read",
    intro:
      "Choosing a sperm donor is one of the most personal decisions in your solo journey — and one that many women find unexpectedly emotional. This guide covers the practical and legal framework in the UK, what information is available about donors, and how to approach the decision without being paralysed by it.",
    sections: [
      {
        heading: "UK legal framework: what you need to know",
        body: [
          "In the UK, all sperm donors used through HFEA-licensed clinics must be registered with the HFEA. Anonymous donation is not permitted — donor-conceived people have the right to access their donor's identifying information when they turn 18.",
          "This is known as an identity-release or open-ID system. Donors are not anonymous, but contact is not mandatory — the donor-conceived person chooses whether to make contact. Most clinics and sperm banks refer to UK-compliant donors as 'open-ID' donors.",
          "Using sperm purchased abroad and imported into a UK HFEA-licensed clinic is allowed, but the donor must still be registered with the HFEA. Your clinic will handle this registration as part of the import process.",
        ],
        callout:
          "The HFEA's position and the research on donor-conceived adults both support openness from an early age. The decision you make about your donor will be part of your child's story — plan now for how you will share it.",
      },
      {
        heading: "What information is available about donors",
        body: [
          "UK-registered donors provide the following information, which is available to you during selection:",
        ],
        bullets: [
          "Physical characteristics: height, weight, eye colour, hair colour, ethnicity",
          "Education and occupation",
          "Motivations for donating (a personal statement)",
          "Medical and genetic history (extensive screening is required)",
          "CMV (cytomegalovirus) status",
          "Number of families already created from this donor (limited to 10 in the UK)",
          "Extended profiles at sperm banks often include audio messages, staff impressions, and childhood photographs",
        ],
        postBody: [
          "What you do not get: contact details, surname, or current circumstances. These are accessible to your child through the HFEA register at age 18.",
        ],
      },
      {
        heading: "Sperm banks operating in the UK",
        body: [
          "You can use a UK-registered bank or an overseas bank that ships to the UK. Both options are used widely by solo patients. The main differences are cost, donor pool size, and the depth of profile information available.",
        ],
        bullets: [
          "Cryos International (cryosinternational.com): the world's largest sperm bank. Very large donor pool, detailed profiles, ships worldwide. HFEA-registered donors available.",
          "European Sperm Bank (europeanspermbank.com): Danish bank with strong UK presence. Known for rigorous screening and detailed profiles.",
          "London Sperm Bank (londonspermbank.com): UK-based. More limited pool but straightforward logistics — no import required.",
          "Manchester Fertility (manchesterfertility.com): UK-based bank with a growing donor pool.",
          "California Cryobank (cryobank.com): US-based, ships to UK with HFEA registration. Large pool, video profiles and audio messages available.",
        ],
      },
      {
        heading: "How to approach the selection",
        body: [
          "There is no right way to choose. Some women approach it analytically; others find they react intuitively to profiles. Both are valid. A few things that help:",
        ],
        bullets: [
          "Decide early which attributes matter to you and which do not — this prevents decision paralysis across hundreds of profiles",
          "Physical resemblance to you can make donor conception conversations with your child slightly easier — but is not essential",
          "The personal statement or motivations section is often the most meaningful part of a profile — it gives you a sense of who this person is",
          "CMV matching: if you are CMV negative, some clinics recommend a CMV-negative donor to reduce theoretical risk. Discuss with your consultant.",
          "Buy 3–4 vials upfront if you find a donor you feel good about — sibling potential and price stability are both reasons to buy in advance",
        ],
        callout:
          "Give yourself time, but do not let perfect be the enemy of good. Many women report spending weeks on donor selection and then finding the decision became clear relatively quickly once they actually started reading profiles.",
      },
    ],
    keyTakeaways: [
      "UK law requires identity-release donors — your child can access identifying information at age 18",
      "Using overseas banks is allowed as long as the donor is HFEA-registered (your clinic handles this)",
      "Extended donor profiles at large banks include personal statements, audio, and sometimes childhood photos",
      "Buy 3–4 vials upfront if you find a donor you connect with — for multiple cycle attempts and sibling potential",
      "Give the decision time and structure — decide which attributes matter before you start browsing",
    ],
  },

  // ─── Emotional Wellbeing ─────────────────────────────────────────────────────
  {
    slug: "two-week-wait",
    title: "Managing the two-week wait alone",
    type: "Guide",
    category: "Emotional Wellbeing",
    categorySlug: "emotional-wellbeing",
    readTime: "5 min read",
    intro:
      "The two-week wait — the period between embryo transfer and a pregnancy test — is notoriously difficult. Doing it alone, without a partner to share the anxiety with, adds a particular weight to an already strange fortnight. This guide offers strategies that actually help.",
    sections: [
      {
        heading: "Why the two-week wait is so hard",
        body: [
          "After embryo transfer, you are physically instructed to carry on normally while emotionally knowing that something enormous is either happening or not happening inside your body. Every physical sensation becomes a potential symptom to interpret. The uncertainty is exhausting.",
          "For solo patients, the isolation is intensified. There is no one in the same house who understands what you are going through without having to be briefed, and no one who shares equally in the outcome. It is worth acknowledging that this is genuinely harder than it would be with a partner — and planning accordingly.",
        ],
      },
      {
        heading: "What helps — and what does not",
        body: ["What tends to help:"],
        bullets: [
          "Planning specific activities on specific days rather than leaving unstructured time — particularly in the second week",
          "Telling one or two trusted people you are in the wait, so you have someone to text when anxiety spikes",
          "Keeping a record of how you are feeling each day — not symptom-tracking, but emotional check-ins",
          "Moderate physical activity (walking, yoga) — there is no evidence that rest improves outcomes, and movement helps anxiety",
          "Having something to look forward to after the test date regardless of the result — a trip, a meal, a purchase — something that belongs to you and does not depend on the outcome",
        ],
        postBody: ["What tends not to help:"],
        postBullets: [
          "Googling symptoms or 'early signs of implantation' — the information is conflicting, unhelpful, and anxiety-amplifying",
          "Early home pregnancy tests — a negative result before the official test date is often unreliable and can cause unnecessary distress",
          "Checking fertility forums for reassurance — other people's symptoms and timelines are not your data",
          "Telling everyone and then having to manage their expectations on top of your own",
          "Treating this period as 'just waiting' — it is an active emotional experience that deserves real support",
        ],
      },
      {
        heading: "Preparing for both outcomes",
        body: [
          "Before your test date, give yourself permission to think about both possibilities. Not as catastrophising, but as preparation: if the result is negative, what will you do that day? Who will you call? What is your plan for the next 24 hours?",
          "Having this thought through in advance means you are not making decisions while in acute distress. Many women find it useful to write a short note to themselves in advance — acknowledging that whatever the result, they have already done something remarkable.",
          "If you have a trusted friend or family member who can be with you on the test day, or available to call immediately after, ask them in advance to hold that space for you.",
        ],
        callout:
          "It is entirely valid to take a day off work for your test day regardless of the result. Many people find returning to normal immediately after either a positive or a negative test extremely difficult.",
      },
    ],
    keyTakeaways: [
      "Plan specific activities for each day of the two-week wait — unstructured time amplifies anxiety",
      "Tell one or two trusted people you are in the wait so you have support available",
      "Avoid early home tests, symptom googling, and forum-checking — none of it helps",
      "Think through your plan for test day and the 24 hours after, for both a positive and a negative result",
      "Take the day off work for your test — it is not a normal day regardless of the outcome",
    ],
  },

  {
    slug: "when-treatment-fails",
    title: "When treatment doesn't work: what next?",
    type: "Guide",
    category: "Emotional Wellbeing",
    categorySlug: "emotional-wellbeing",
    readTime: "7 min read",
    intro:
      "A failed cycle, a miscarriage, or the decision to stop treatment are among the hardest experiences of the solo IVF journey. This guide does not minimise that. Instead, it tries to help you think clearly about what comes next — at a time when clear thinking is difficult.",
    sections: [
      {
        heading: "Giving yourself time to grieve",
        body: [
          "A negative pregnancy test or a pregnancy loss is a loss. It deserves to be treated as one — not explained away, not immediately problem-solved, not rushed past to get to the question of what to do next.",
          "The fertility community often defaults to 'what's your plan?' before giving space to the grief. You are allowed to sit with what has happened before you think about the path forward. There is no clinical urgency to make decisions in the days immediately following a failed cycle.",
          "What grief looks like in this context varies enormously — some people need to cry, some people go numb, some people need to talk, some people need to be alone. All of these are normal. What tends to help is not suppressing whichever response is natural to you.",
        ],
      },
      {
        heading: "The practical steps after a failed cycle",
        body: [
          "Once you are ready — and that timeline is yours to set — there are practical things to understand:",
        ],
        bullets: [
          "Request a debrief appointment with your consultant. This should cover: what happened in the cycle, what the data suggests, and what the recommended next steps are. Take notes or bring someone with you.",
          "Ask specifically: 'Is there anything from this cycle that changes your protocol recommendation for next time?'",
          "If you had embryos tested (PGT-A), ask for the full genetic report — this gives more information about why a transfer may not have worked",
          "If you have had two or more failures with chromosomally normal embryos, ask about recurrent implantation failure investigations",
          "Review your finances. A failed cycle is a reasonable point at which to reassess how many more cycles you are prepared to fund and on what timeline",
        ],
      },
      {
        heading: "Deciding whether to continue",
        body: [
          "There is no universally right answer to whether to continue treatment after a failure. It is a decision that lives at the intersection of your clinical picture, your finances, your emotional state, and your personal threshold.",
          "Some questions that can help structure the decision:",
        ],
        bullets: [
          "What does my consultant think my realistic chances are per cycle, and does this represent a probability I am willing to take?",
          "Do I have the financial and emotional resources to sustain another cycle right now, or do I need time?",
          "Is there a point at which I would choose to stop — and is that point still ahead of me or behind me?",
          "Am I continuing because I genuinely want to, or because I feel I have not tried hard enough? These are different reasons and they lead to different decisions.",
        ],
      },
      {
        heading: "Other paths: donor eggs, adoption, and choosing a child-free life",
        body: [
          "If own-egg IVF is not working, donor eggs offer a meaningfully different probability profile. It is worth understanding this option clinically and emotionally before you rule it out — some women find that the genetic connection to their child is less important than they initially assumed; others find it is central to their decision.",
          "Adoption and fostering are separate journeys with their own processes and timelines. Pursuing one does not preclude eventually pursuing the other, though agencies typically require you to have stopped treatment for a period before applying.",
          "Choosing to live without children after unsuccessful treatment is also a valid outcome, and one that is not talked about enough. Many women who reach this point describe a period of profound grief followed by genuine rebuilding. It is not settling — it is a life.",
        ],
        callout:
          "Fertility counselling at this decision point is genuinely useful — not to be told what to do, but to think through your values clearly with someone who understands the landscape.",
      },
    ],
    keyTakeaways: [
      "Give yourself time to grieve before trying to plan — there is no clinical urgency to decide quickly",
      "Request a thorough debrief with your consultant after any failed cycle",
      "Continuing treatment should be a genuine choice, not a default — check in with your actual desires",
      "Donor eggs offer a meaningfully different success rate profile if own-egg IVF is not working",
      "There is support available — from counsellors, from the SMC community, and from Fertility Network UK",
    ],
  },

  {
    slug: "finding-fertility-therapist",
    title: "Finding a fertility-aware therapist",
    type: "Directory",
    category: "Emotional Wellbeing",
    categorySlug: "emotional-wellbeing",
    readTime: "4 min read",
    intro:
      "The emotional load of solo IVF is significant, and most people carry more of it than they should without professional support. A good therapist — specifically one with experience in fertility and reproductive loss — can make a real difference at any stage of the journey. Here is how to find one.",
    sections: [
      {
        heading: "Why fertility-specific experience matters",
        body: [
          "Not all therapists are equipped to support people through fertility treatment. A generalist therapist may lack familiarity with the clinical landscape (what IVF actually involves, the significance of different test results, the particular grief of a late miscarriage), which can mean you spend time explaining rather than processing.",
          "A fertility-aware therapist understands the treatment cycle, is familiar with the emotional patterns that commonly emerge, and is less likely to offer unhelpful advice or misframe the experience. For solo patients specifically, a therapist who understands the single-parent-by-choice decision adds another layer of relevance.",
        ],
      },
      {
        heading: "Where to find one",
        body: ["These directories and organisations are the most reliable starting points:"],
        bullets: [
          "British Infertility Counselling Association (bica.net): directory of qualified fertility counsellors. All listed members have completed specialist fertility counselling training. Filter by location and approach.",
          "Fertility Network UK (fertilitynetworkuk.org): peer support and counsellor signposting, plus a telephone helpline",
          "The Miscarriage Association (miscarriageassociation.org.uk): specifically for pregnancy loss support, with trained counsellors and peer support groups",
          "HFEA website: all HFEA-licensed clinics are legally required to offer patients access to counselling. Ask your clinic for a referral to their counsellor even if you prefer to see someone independently.",
          "Psychology Today (psychologytoday.com/gb): searchable directory — filter by 'fertility' under specialisms",
        ],
      },
      {
        heading: "Online therapy options",
        body: [
          "If you live in an area with limited local provision, or if the flexibility of online sessions suits your treatment schedule better, several platforms offer fertility-aware therapists remotely:",
        ],
        bullets: [
          "Betterhelp (betterhelp.com): large platform with fertility specialist filter",
          "Spill (spill.chat): workplace mental health platform sometimes offered via employer EAP",
          "Your clinic's in-house counsellor (if HFEA-licensed, this must be offered): typically free or low-cost as part of treatment",
        ],
      },
      {
        heading: "What to ask in an initial consultation",
        body: [
          "Most therapists offer a free 20-minute initial call. Use it to assess fit:",
        ],
        bullets: [
          "'Have you worked with people going through IVF or fertility treatment before?'",
          "'Do you have experience supporting solo mums by choice or single parents?'",
          "'Are you familiar with the HFEA framework and what fertility treatment in the UK involves?'",
          "'What is your approach when someone is in the middle of a treatment cycle rather than between cycles?'",
        ],
        callout:
          "You do not need to wait until you are struggling to see a therapist. Many women find it most useful to start sessions before treatment begins — establishing the relationship before the emotional weight arrives.",
      },
    ],
    keyTakeaways: [
      "Fertility-specific experience matters — use BICA (bica.net) to find qualified fertility counsellors",
      "Your HFEA-licensed clinic must offer access to counselling — ask for it",
      "Online therapy removes geographic barriers — several platforms offer fertility specialists",
      "Start therapy before you need it, ideally before treatment begins",
      "It is not a sign of struggle — it is a sign of preparation",
    ],
  },

  {
    slug: "telling-friends-family",
    title: "Telling friends and family you're going solo",
    type: "Guide",
    category: "Emotional Wellbeing",
    categorySlug: "emotional-wellbeing",
    readTime: "5 min read",
    intro:
      "Deciding to become a solo mum by choice is a personal decision you have worked through carefully. Telling the people in your life is a different challenge. Some will be immediately supportive; others will ask questions that feel intrusive; a few may react in ways that surprise you. This guide helps you plan the conversations.",
    sections: [
      {
        heading: "You choose the timing — and the audience",
        body: [
          "You are not obliged to tell anyone anything until you want to. Some women tell people before they start treatment and use the wider support; others tell nobody until they are pregnant; others tell a small inner circle throughout. All of these approaches are valid.",
          "What matters is choosing your audience deliberately rather than letting it happen by accident — and being clear with yourself about why you are sharing with each person and what kind of response you are hoping for.",
        ],
      },
      {
        heading: "The conversation that tends to go well",
        body: [
          "The conversations that go best are usually the ones where you come in confident, clear, and matter-of-fact rather than defensive or apologetic. You are not asking for approval — you are sharing news about your life.",
          "A framing that many women find works well: tell the 'what' and the 'why' briefly, express what support would look like, and then give the other person space to respond.",
          "Example: 'I have decided I want to have a child, and I have decided not to wait any longer for a partner. I am starting IVF treatment with donor sperm later this year. I wanted to tell you because [you are important to me / I may need some practical support / I did not want you to find out another way]. I am really happy about this decision.'",
        ],
        callout:
          "The word 'decided' is doing a lot of work in that framing. It signals that the decision is made, reducing the invitation to debate it or offer alternatives.",
      },
      {
        heading: "Handling difficult reactions",
        body: [
          "Even people who love you may initially react in ways that feel hurtful — concerns about the child's 'missing' father, questions about whether you have thought it through, worry framed as discouragement. Most of these reactions come from genuine care, even if clumsily expressed.",
          "A few approaches that help:",
        ],
        bullets: [
          "Name what you need from them: 'I am not looking for feedback on the decision — I have made it. What I am hoping for is [support / excitement / a listening ear].'",
          "Have some data ready if you anticipate pushback: research consistently shows that children of solo mums by choice grow up with positive self-concept and strong family bonds",
          "You do not have to win the argument in real time — 'I hear that you have concerns. I have thought about them. I want to share this with you because I care about you, not because I need you to agree.'",
          "Allow people time to adjust — an initial reaction is not always the final one. Some family members who were initially resistant become enthusiastic grandparents",
        ],
      },
      {
        heading: "Who to tell first, and why",
        body: [
          "If you have a close friend who is likely to be unconditionally supportive, tell them first. Having one person in your corner before the harder conversations means you have somewhere to debrief afterwards.",
          "Parents and siblings often take the news hardest initially — not because they do not love you, but because they have a different imagined script for your life. Give them time. Most come around.",
          "Colleagues and employers: you are not required to tell your employer you are having IVF. Many women keep treatment entirely private at work, at least during the early stages.",
        ],
      },
    ],
    keyTakeaways: [
      "Choose your audience and timing deliberately — you are not obliged to tell anyone until you are ready",
      "Come to the conversation confident and matter-of-fact, not defensive",
      "Use the word 'decided' — it signals the decision is made and reduces invitation to debate",
      "Name what support looks like for you — many people want to help but do not know how",
      "Initial difficult reactions are often not the final position — give people time to adjust",
    ],
  },

  // ─── Legal & Admin ───────────────────────────────────────────────────────────
  {
    slug: "donor-conception-legal-parenthood",
    title: "Donor conception and legal parenthood explained",
    type: "Explainer",
    category: "Legal & Admin",
    categorySlug: "legal-admin",
    readTime: "6 min read",
    intro:
      "UK law on donor conception is clear, protective, and often misunderstood. This explainer covers the key legal principles: who is a legal parent, what rights donors have, what rights your child has, and what this means practically for your journey.",
    sections: [
      {
        heading: "Who is the legal parent?",
        body: [
          "When you conceive through licensed fertility treatment at an HFEA-licensed clinic using donor sperm, you are the sole legal parent of your child from birth. The sperm donor has no legal parental status and no parental rights or responsibilities — including no obligation to pay child maintenance.",
          "This is set out in the Human Fertilisation and Embryology Act 2008. It applies to all treatments carried out at HFEA-licensed clinics. It does not apply if you use a donor outside of a licensed clinic (for example, via a home insemination arrangement), in which case the legal position is more complex.",
          "If you are unmarried and use a licensed clinic, you are the sole legal parent. If you are married or in a civil partnership, your spouse or civil partner may be treated as a second legal parent unless they have explicitly opted out.",
        ],
        callout:
          "The key protection: treatment at a licensed clinic. If you are using a home insemination kit or a known donor outside of a clinic, get legal advice before proceeding — the donor may have legal rights.",
      },
      {
        heading: "The donor's legal position",
        body: [
          "A sperm donor who donates through an HFEA-licensed clinic:",
        ],
        bullets: [
          "Has no legal parental status",
          "Has no rights over any child conceived from their donation",
          "Has no obligation to financially support any child",
          "Cannot be named on the birth certificate",
          "Can be identified by a donor-conceived child who has reached 18 via the HFEA register",
        ],
        postBody: [
          "Donors must consent to the identity-release system when they donate. They know that any children conceived from their donation may contact them at 18. They cannot withdraw this consent after donation.",
        ],
      },
      {
        heading: "Your child's legal rights",
        body: [
          "Donor-conceived children in the UK have the right to access non-identifying information about their donor at age 16, and identifying information (including name, date of birth, and last known address) at age 18.",
          "This information is held by the HFEA register and cannot be removed. Your child can request it themselves when they reach adulthood — it is not conditional on your consent at that point.",
          "Your child also has the right to know the number of other families created from the same donor (up to 10 families per donor in the UK), and may be able to connect with donor siblings through the HFEA or the Donor Sibling Registry.",
        ],
      },
      {
        heading: "Birth registration",
        body: [
          "You will register the birth as the sole parent. The birth certificate will show your name only — there is no donor entry. This is legally straightforward for solo parents using licensed treatment.",
          "You may choose to register your child's donor conception with the HFEA by noting it on the child's medical record. This is recommended by many fertility specialists as a way of ensuring medical staff are aware, and the information is preserved regardless of what you tell your child directly.",
        ],
      },
    ],
    keyTakeaways: [
      "Treatment at an HFEA-licensed clinic = you are the sole legal parent, full stop",
      "The sperm donor has no parental rights and no maintenance obligations",
      "Your child can access the donor's identifying information from the HFEA at age 18",
      "Home insemination with a known donor creates a different legal picture — get legal advice first",
      "Birth registration is straightforward as sole parent",
    ],
  },

  {
    slug: "hfea-register",
    title: "What the HFEA register means for your child",
    type: "Guide",
    category: "Legal & Admin",
    categorySlug: "legal-admin",
    readTime: "5 min read",
    intro:
      "The HFEA register is the UK's central database of donor-conceived people and their donors. Understanding what it holds, who can access it, and when helps you make informed decisions now and prepares you for conversations with your child later.",
    sections: [
      {
        heading: "What the register holds",
        body: [
          "The HFEA register contains information about every person born through licensed fertility treatment in the UK since 1991. For each donor-conceived person, the register holds:",
        ],
        bullets: [
          "Details of the treatment cycle that led to their birth (clinic, treatment type, date)",
          "The donor's identifying information (name, date of birth, last known address at time of donation)",
          "The donor's non-identifying information (physical characteristics, medical history, personal statement)",
          "The number of families created from the same donor",
        ],
      },
      {
        heading: "When your child can access it",
        body: [
          "A donor-conceived person can access the HFEA register in stages:",
        ],
        bullets: [
          "Age 16+: non-identifying information about their donor (physical characteristics, personal statement)",
          "Age 18+: identifying information (name, date of birth, last known address)",
          "Age 18+: details of any donor siblings (other families created from the same donor, if they have also registered an interest)",
        ],
        postBody: [
          "Access is not automatic — your child must apply to the HFEA. The process involves verifying their identity and completing an application. The HFEA offers counselling support as part of this process.",
        ],
      },
      {
        heading: "What this means for disclosure",
        body: [
          "The existence of the HFEA register is one of several reasons why the research and clinical guidance strongly support early donor disclosure — telling your child about their conception from a young age rather than waiting until they are older or potentially finding out another way.",
          "If your child is not told and discovers their donor-conceived status through a DNA ancestry test (which are now extremely widely used), the disclosure will be on someone else's terms, not yours. This is increasingly a real risk.",
          "The guidance from donor-conceived adult communities, psychologists specialising in this area, and the HFEA itself is consistent: early, age-appropriate, honest disclosure is better for children and families.",
        ],
        callout:
          "Resources for talking to children about donor conception: Donor Conception Network (dcnetwork.org) publishes excellent age-appropriate books and guides for parents.",
      },
      {
        heading: "The Donor Sibling Registry",
        body: [
          "In addition to the HFEA register, there is the international Donor Sibling Registry (donorsiblingregistry.com) — a voluntary database where donor-conceived people, donors, and donor families can register to find siblings or other biological connections.",
          "This operates entirely separately from the HFEA and relies on people choosing to register. It can be a meaningful resource for your child in adulthood — it is worth being aware of it.",
        ],
      },
    ],
    keyTakeaways: [
      "The HFEA register holds the donor's identifying information — your child can access it at 18",
      "Access requires an application — it is not automatic",
      "DNA ancestry tests mean donor-conceived people are increasingly finding out through other means — early disclosure removes the risk of an uncontrolled discovery",
      "Donor Conception Network (dcnetwork.org) has excellent resources for talking to children",
      "The Donor Sibling Registry (donorsiblingregistry.com) is an additional voluntary resource for finding half-siblings",
    ],
  },

  {
    slug: "known-donor-legal-agreements",
    title: "Known donors: legal agreements you need",
    type: "Guide",
    category: "Legal & Admin",
    categorySlug: "legal-admin",
    readTime: "5 min read",
    intro:
      "Using a known donor — a friend, acquaintance, or someone found through an online platform — is a meaningful choice that comes with specific legal complexities. This guide covers the legal agreements you need and the risks of proceeding without them.",
    sections: [
      {
        heading: "The critical difference: licensed clinic vs. home insemination",
        body: [
          "How you use a known donor determines the entire legal picture:",
          "If you use your known donor's sperm through an HFEA-licensed clinic, the same legal protections apply as with any other clinic treatment: you are the sole legal parent, and the donor has no parental rights or obligations. The donor's sperm must be screened and quarantined before use (typically a six-month wait for quarantine).",
          "If you use a known donor through home insemination (without a licensed clinic), the legal position is fundamentally different: the donor may have parental rights and maintenance obligations, regardless of any private agreement you have made. Private agreements between you and your donor about parental responsibility are not legally enforceable.",
        ],
        callout:
          "A written agreement with a known donor that says 'he will have no parental rights' is not legally enforceable in the UK outside of the licensed clinic system. Courts look at the welfare of the child, not the terms of private contracts.",
      },
      {
        heading: "The legal agreement you should still have",
        body: [
          "Even if you use a licensed clinic — where the legal protections are already in place — it is strongly advisable to have a written agreement with your known donor that sets out your mutual intentions. This is not for legal enforcement purposes, but to:",
        ],
        bullets: [
          "Document clearly that both parties understood and agreed to the arrangement",
          "Reduce the risk of future misunderstandings about the donor's role in the child's life",
          "Provide clarity if circumstances change (for example, the donor later marries and their partner has concerns)",
          "Form a record for your child about the intention behind their conception",
        ],
        postBody: [
          "The agreement should be prepared by a solicitor who specialises in family law or fertility law. It typically covers: the agreed role (or no role) of the donor in the child's life, agreement on identity disclosure, financial expectations, and what happens if either party's circumstances change.",
        ],
      },
      {
        heading: "Finding a fertility law solicitor",
        body: [
          "Specialist fertility law solicitors can be found through:",
        ],
        bullets: [
          "Natalie Gamble Associates (nataliegambleassociates.co.uk): specialists in donor conception and fertility law",
          "Brilliant Families (brilliantfamilies.co.uk): fertility family law specialists",
          "The Law Society's solicitor finder (solicitors.lawsociety.org.uk) filtered by 'family' and 'surrogacy and fertility'",
        ],
        postBody: [
          "A known donor agreement typically costs £300–£800. Given what is at stake, this is always worth it.",
        ],
      },
      {
        heading: "The conversation with your known donor",
        body: [
          "Beyond the legal agreement, the relational clarity matters as much as the legal framework. Questions to discuss and document your alignment on:",
        ],
        bullets: [
          "What role, if any, does the donor want to play in the child's life?",
          "How do you plan to describe him to your child — donor, biological father, family friend?",
          "What happens if the donor forms a new relationship? What does their partner need to know?",
          "What medical information will he provide, and how can your child contact him if they want to in adulthood?",
          "What happens if either of you changes your mind about the arrangement?",
        ],
      },
    ],
    keyTakeaways: [
      "Using a known donor through a licensed clinic gives you full legal protection — home insemination does not",
      "Private agreements about parental rights are not enforceable outside the licensed clinic system",
      "A written agreement is still advisable even with a licensed clinic — for relational clarity, not legal enforcement",
      "Use a specialist fertility law solicitor: Natalie Gamble Associates or Brilliant Families",
      "Have explicit conversations about the donor's intended role before you start — document your alignment",
    ],
  },

  {
    slug: "self-employed-maternity-leave",
    title: "Maternity leave as a self-employed solo mum",
    type: "Guide",
    category: "Legal & Admin",
    categorySlug: "legal-admin",
    readTime: "6 min read",
    intro:
      "Self-employed women have access to maternity support from the state, but the system is different — and often less generous — than employment-based maternity leave. Planning ahead significantly changes what you can claim and how long you can step back from work. This guide covers the self-employed maternity landscape in the UK.",
    sections: [
      {
        heading: "Maternity Allowance: what you can claim",
        body: [
          "Self-employed women in the UK can claim Maternity Allowance (MA) rather than Statutory Maternity Pay (SMP) — SMP is only available through employed positions. MA is paid by the government and is separate from your employer.",
          "The standard rate of Maternity Allowance in 2025 is £184.03 per week for up to 39 weeks, provided you have paid Class 2 National Insurance contributions for at least 13 of the 66 weeks before your due date.",
          "If you have not paid Class 2 NI (for example, if your profits were below the small profits threshold), you may qualify for a reduced rate of £27 per week for 14 weeks.",
          "To claim: submit form MA1 to HMRC, which you can do from 26 weeks pregnant. You will need proof of self-employment (SED) from HMRC and a MATB1 certificate from your midwife.",
        ],
        callout:
          "Class 2 NI contributions: if you are self-employed and above the small profits threshold (£12,570 in 2024/25), you pay Class 2 NI automatically via your self-assessment tax return. These contributions qualify you for the standard MA rate.",
      },
      {
        heading: "Planning: what the numbers actually look like",
        body: [
          "At the standard rate, 39 weeks of Maternity Allowance totals approximately £7,177. For most self-employed women, this covers a fraction of their normal income.",
          "The financial planning questions to address before you get pregnant:",
        ],
        bullets: [
          "What is the minimum monthly income you need to cover essential outgoings?",
          "How much can you save in advance to supplement MA during the months you plan to take off?",
          "Can your work be structured to allow some part-time activity during maternity leave without affecting your MA? (Keeping in Touch days or Shared Parental Leave equivalents do not apply to self-employed, but the rules around what counts as 'working' during MA are less restrictive than for employees)",
          "Have you registered for the Government's 15–30 hours free childcare offer, and what is the timeline from birth to eligibility?",
          "Do you have professional indemnity or income protection insurance that would pay out for pregnancy-related inability to work?",
        ],
      },
      {
        heading: "Tax and business continuity during maternity leave",
        body: [
          "Self-employment does not pause when you do. Key points:",
        ],
        bullets: [
          "You must still file a self-assessment tax return for any tax year in which you are self-employed, even if your income is zero",
          "If you have business expenses ongoing during maternity leave (software subscriptions, insurance, etc.), keep records — these remain deductible",
          "Class 2 NI contributions continue to accrue during maternity leave if you remain registered as self-employed",
          "Consider whether to pause your sole trader registration if you are planning a longer break — this affects your NI record and benefit entitlements",
          "Inform your professional bodies, insurers, and any clients with ongoing retainers",
        ],
      },
      {
        heading: "Childcare: planning ahead as a solo self-employed parent",
        body: [
          "The government's free childcare offer (15–30 hours per week from 9 months of age in England as of 2024) is available to self-employed parents. Your eligibility is based on earning the equivalent of minimum wage for 16 hours per week on average — very achievable for most self-employed people even during part-time return.",
          "Apply via the government's childcare service (childcarechoices.gov.uk) as soon as you are eligible. Places in nurseries and childminder settings are often limited — research local provision before your child is born.",
        ],
      },
    ],
    keyTakeaways: [
      "Self-employed women claim Maternity Allowance (not SMP) — up to £184.03/week for 39 weeks in 2025",
      "Eligibility requires Class 2 NI contributions for 13 of the 66 weeks before your due date",
      "Submit form MA1 to HMRC from 26 weeks pregnant",
      "Plan to supplement MA with savings — it covers a fraction of typical self-employed income",
      "Free childcare from 9 months is available to self-employed parents — apply early as places are limited",
    ],
  },

  // ─── Pregnancy & Beyond ──────────────────────────────────────────────────────
  {
    slug: "solo-pregnancy-support-team",
    title: "Solo pregnancy: building your support team",
    type: "Guide",
    category: "Pregnancy & Beyond",
    categorySlug: "pregnancy-beyond",
    readTime: "6 min read",
    intro:
      "Pregnancy without a partner is manageable, but it goes significantly better with a thought-through support structure. The women who report the most positive solo pregnancy experiences almost universally describe having deliberately built their village in advance rather than hoping people would show up. This guide helps you build yours.",
    sections: [
      {
        heading: "The roles you need to fill",
        body: [
          "Partner-supported pregnancies distribute responsibilities across two people: appointment companion, emotional support, practical household support, birth partner, and postnatal help. As a solo parent, these roles still need to be filled — they just need to be distributed across your community.",
          "Be honest with yourself about who in your existing network can genuinely fill each of these roles versus who will offer in theory but not in practice. The best support structures are built on realistic assessments of people's actual reliability and capacity.",
        ],
        bullets: [
          "Scan buddy: someone who can come to key appointments (12-week, 20-week scan) — ideally someone who can absorb both good and difficult news alongside you",
          "Emotional anchor: the person you call when you need to talk — consistent, available, genuinely invested",
          "Practical support: someone who can help with household tasks, particularly in the third trimester and early postnatal period",
          "Birth partner: one or two people specifically prepared for this role",
          "Postnatal help: a rota of people for the first few weeks — meals, visits, holding the baby while you shower",
        ],
      },
      {
        heading: "Having the explicit conversation",
        body: [
          "Most people who care about you will want to help but will not know how unless you tell them. The conversations that build real support are specific, not general.",
          "Not: 'I hope you can help out when the baby arrives'",
          "But: 'I am going to need some support in the first few weeks. Would you be willing to come round on Tuesday evenings for the first month? Even just company and holding the baby while I eat would make a real difference.'",
          "Specificity respects people's time, makes it easy to say yes, and means the help actually arrives.",
        ],
        callout:
          "Build a simple shared calendar or spreadsheet for postnatal support. It sounds clinical, but in practice it means people know when they are needed, can see gaps, and feel like part of something coordinated rather than guessing.",
      },
      {
        heading: "Professional support to consider",
        body: [
          "Beyond your personal network, several professional roles are worth considering:",
        ],
        bullets: [
          "Doula: a birth and postnatal support professional. Not a medical role — they provide continuous emotional and practical support. Particularly valuable for solo births where your birth partner may be nervous. Find a doula at doula.org.uk.",
          "Independent midwife: offers continuity of care beyond the NHS model. More expensive but means you see the same midwife throughout your pregnancy.",
          "Postnatal doula or night nanny: postnatal-specific support for the early weeks. Can make an enormous difference to sleep and recovery.",
          "NCT or antenatal class: as much about building a local community of people at the same life stage as about the birth preparation itself",
        ],
      },
      {
        heading: "Solo parent communities",
        body: [
          "Connecting with other solo mums by choice — people who understand your specific experience — is one of the most consistently valued parts of the journey. The SMC (Single Mothers by Choice) community in the UK has local groups, online forums, and an annual conference.",
          "Groups to find: Mumsnet Solo Parents board, The Stork and I Facebook group, Solo Mum Tribe, and local NCT solo parent networks.",
        ],
      },
    ],
    keyTakeaways: [
      "Deliberately build your village in advance — do not assume people will show up",
      "Be specific when asking for help — general offers rarely materialise into practical support",
      "Use a shared calendar or rota for postnatal support",
      "A doula is especially valuable for solo births and postnatal recovery",
      "Connect with the SMC community — no one understands the specific experience better",
    ],
  },

  {
    slug: "birth-partner-options",
    title: "Birth partner options when you're going solo",
    type: "Guide",
    category: "Pregnancy & Beyond",
    categorySlug: "pregnancy-beyond",
    readTime: "5 min read",
    intro:
      "Choosing a birth partner — or deciding not to have one — is a significant decision that deserves more thought than it typically gets. As a solo parent, you have complete freedom in who you bring into this experience, and there are more options than most people realise.",
    sections: [
      {
        heading: "What a birth partner does",
        body: [
          "A birth partner's role is primarily emotional and practical support rather than medical decision-making. They are there to:",
        ],
        bullets: [
          "Provide continuous presence and reassurance during labour",
          "Advocate for your preferences to medical staff",
          "Handle practical logistics (timing, communication, comfort measures)",
          "Be a calm, supportive presence regardless of how long the process takes",
          "Remember what has been said when you cannot",
        ],
        postBody: [
          "This is a specific role that not everyone is naturally suited to — someone who loves you very much but does not handle medical environments well, or who will catastrophise under pressure, may not be your best choice.",
        ],
      },
      {
        heading: "Who to consider as a birth partner",
        body: [
          "Friends: the most common choice for solo mums. The ideal friend birth partner is someone calm, reliable, practical, and able to be present for as long as needed without needing to leave. They should ideally attend antenatal classes with you.",
          "Family member: a mother, sister, or other close family member is often natural for this role. Factor in how your family member will respond under pressure and whether their presence will feel comforting or stressful to you specifically.",
          "Two people: many solo mums choose two birth partners — one for emotional support, one for more practical support. Both can be present in most UK hospital settings (check your specific hospital's policy).",
          "A doula: a trained doula offers continuity that friends and family rarely can — they have done this before, they know what normal looks like, and they are not emotionally invested in your specific situation in the way a loved one is. Many solo mums describe their doula as the most valuable decision of their pregnancy.",
        ],
      },
      {
        heading: "Preparing your birth partner",
        body: [
          "Whoever you choose, preparation matters:",
        ],
        bullets: [
          "Attend an antenatal course together so they understand the process and know what to expect",
          "Discuss your birth preferences in detail — what you want to try, what you want to avoid, your attitude to pain relief",
          "Be explicit about what you need from them: 'I may say things I do not mean. Please stay calm and remind me of what I wanted.'",
          "Give them a written copy of your birth preferences to advocate from",
          "Make sure they know who to contact and what to do if complications arise that you cannot manage yourself",
        ],
        callout:
          "Some solo mums choose to give birth with a doula as their sole support. This is completely valid. A doula is a professional presence who has done this before and whose entire focus is you.",
      },
      {
        heading: "If you want to do this alone",
        body: [
          "Some women choose to give birth with only medical staff present. This is allowed and valid. If this is your preference, discuss it with your midwife in advance so appropriate support can be arranged, and consider whether a doula could provide the professional presence you need without the relationship complexity.",
        ],
      },
    ],
    keyTakeaways: [
      "A birth partner's role is support, not medical decision-making — choose someone calm and reliable",
      "Two birth partners is an option — many hospital policies allow this",
      "A doula brings professional experience and continuity that friends and family cannot offer",
      "Preparation is essential — attend antenatal classes together and discuss your preferences explicitly",
      "Giving birth with only medical staff present is valid if that is your preference",
    ],
  },

  {
    slug: "talking-to-child-donor-conception",
    title: "Talking to your child about donor conception",
    type: "Guide",
    category: "Pregnancy & Beyond",
    categorySlug: "pregnancy-beyond",
    readTime: "6 min read",
    intro:
      "The research on this is clear: children who learn about their donor conception early, from their parents, in an age-appropriate and positive way, have better outcomes than those who find out later or from another source. This guide gives you practical language and a framework for these conversations at different ages.",
    sections: [
      {
        heading: "The case for early disclosure",
        body: [
          "Studies of donor-conceived adults consistently show that those told before age 5 have more positive responses to their conception story than those told later. The reasons are straightforward: early telling means it is just part of the family story, not a revelation; it removes the risk of accidental disclosure; and it builds trust.",
          "DNA ancestry tests have transformed the landscape. With 23andMe and AncestryDNA used by millions of people globally, any first cousin, second cousin, or half-sibling taking such a test can reveal a biological connection that you have not disclosed. Planning your own disclosure takes this out of someone else's hands.",
          "The question is not whether to tell — for most families today, their child will eventually find out. The question is how and when, on whose terms.",
        ],
      },
      {
        heading: "Language for young children (0–5)",
        body: [
          "At this stage, the story needs to be simple, positive, and woven into normal family conversation. You do not need a specific 'disclosure conversation' — it should just be part of how you talk about your family.",
          "A starting script for young children:",
        ],
        bullets: [
          "'Some families have a mummy and a daddy. Our family has just you and me — and I wanted you so much that I got help from a very kind man called a donor to help make you.'",
          "'A donor is someone who helps a family by giving something special. Our donor helped by giving me what I needed to make you.'",
          "'You grew in my tummy, and you are our family.'",
        ],
        postBody: [
          "At this age, children accept this straightforwardly. Their questions are simple and literal: 'Where did I come from?' 'What is a donor?' Answer simply and naturally.",
        ],
        callout:
          "Donor Conception Network (dcnetwork.org) publishes a series of books for donor-conceived children at every age. 'My Story' for young children and 'Telling and Talking' for older children are widely recommended.",
      },
      {
        heading: "The middle years (6–12)",
        body: [
          "Children in this age range begin asking more detailed questions and may compare their family structure to friends'. This is a normal developmental stage, not a sign of distress.",
          "It is helpful to explain more about what a donor is and is not at this stage:",
        ],
        bullets: [
          "The donor is not their 'dad' — he was not involved in their life and does not live with anyone as their dad",
          "They may have half-siblings — other children from the same donor who they might one day meet if both are interested",
          "They can find out more about their donor when they are older if they want to",
          "Their family is complete exactly as it is — different does not mean less",
        ],
      },
      {
        heading: "Teenage years and adulthood",
        body: [
          "Teenagers often revisit their conception story with more complexity — questions of identity, belonging, and difference emerge more forcefully. This is normal and does not indicate that disclosure was done incorrectly.",
          "Stay open to their questions without defending your choices. 'How do you feel about it?' is more useful than 'Are you okay with it?' Give them space to feel complicated things.",
          "At 18, they can access the HFEA register for identifying information about their donor. This is their right and their choice — prepare for this possibility and support whatever decision they make.",
        ],
      },
    ],
    keyTakeaways: [
      "Tell your child early — before age 5 is associated with the best outcomes in research",
      "Weave it into normal family conversation rather than making it a single 'disclosure event'",
      "DNA tests mean your child may find out another way — being the one to tell them protects their trust in you",
      "Donor Conception Network (dcnetwork.org) has excellent books and resources for every age",
      "Their right to access HFEA register information at 18 is theirs alone — support whatever they choose",
    ],
  },

  {
    slug: "childcare-planning",
    title: "Childcare planning: a solo parent's guide",
    type: "Guide",
    category: "Pregnancy & Beyond",
    categorySlug: "pregnancy-beyond",
    readTime: "6 min read",
    intro:
      "Childcare as a solo parent is both simpler and harder than for couples: simpler because there is no negotiation about approach, harder because you are the only person navigating the system and covering the cost. Planning early, understanding the system, and knowing your entitlements makes an enormous difference.",
    sections: [
      {
        heading: "Start earlier than you think",
        body: [
          "Good nursery places in most urban areas have waiting lists of 12–18 months. Registering your interest before your child is born — and in some cases before you are pregnant — is genuinely necessary in competitive areas.",
          "Start visiting nurseries from around 20 weeks pregnant. Most nurseries allow you to go on their waiting list during pregnancy, and some require a deposit to hold a place.",
          "Register interest at multiple settings — you can always decline a place, but you cannot add to a list that has closed.",
        ],
      },
      {
        heading: "Understanding government childcare entitlements",
        body: [
          "The UK government's free childcare offer (as of 2024/25) provides:",
        ],
        bullets: [
          "15 hours per week free childcare from 9 months of age (working parents with children born after April 2024)",
          "15 hours per week free for all 3- and 4-year-olds",
          "30 hours per week for working parents of 3- and 4-year-olds (income threshold: you must earn at least the equivalent of 16 hours per week at national minimum wage)",
          "Tax-Free Childcare: the government tops up every £8 you put in with £2 (up to £500 per quarter per child) for working parents earning under £100,000",
        ],
        postBody: [
          "Eligibility and application is through childcarechoices.gov.uk. You will need a Government Gateway account. Reconfirm your eligibility every three months or you lose the entitlement.",
        ],
        callout:
          "Even if you are self-employed with variable income, you are likely eligible for 30 hours if your earnings average at least the equivalent of minimum wage for 16 hours per week. Check eligibility at childcarechoices.gov.uk.",
      },
      {
        heading: "Types of childcare and what they cost",
        body: [
          "Understanding your options:",
        ],
        bullets: [
          "Nursery (full-time): typically £1,200–£2,000/month in London, £800–£1,400 outside London before entitlements",
          "Childminder: registered childminder rates are typically £5–£9/hour. Often more flexible, smaller groups, home environment.",
          "Nanny (shared): sharing a nanny with another family (nanny share) can reduce per-child costs significantly. Cost typically £8–£12/hour per family share.",
          "Nanny (sole): sole nanny is the most expensive but offers the most flexibility for solo parents — no nursery drop-off logistics",
          "After-school clubs and wraparound care: once school age, these typically cost £10–£20 per session",
        ],
      },
      {
        heading: "The solo parent childcare challenge",
        body: [
          "As a solo parent, the practical challenges are specific: what happens when your child is sick and you have a work commitment? Who does pick-up if you are delayed? Having explicit backup arrangements matters more for solo parents than for couples.",
        ],
        bullets: [
          "Identify two or three people who can do emergency childcare for you",
          "Build a relationship with your nursery key worker — they are your eyes and ears and genuine allies",
          "Consider a childminder over a nursery if flexibility is your priority — childminders often have more latitude with drop-off and collection times",
          "Emergency childcare services (some employers offer these through EAP or benefits platforms) can cover acute gaps",
        ],
      },
    ],
    keyTakeaways: [
      "Register nursery interest from around 20 weeks pregnant — good places have 12–18 month waiting lists",
      "Free childcare from 9 months is available to working parents — apply at childcarechoices.gov.uk",
      "Tax-Free Childcare tops up your contributions by 20% — up to £2,000 per year per child",
      "Have two to three people identified for emergency childcare — solo parents need an explicit backup plan",
      "A childminder often offers more flexibility than a nursery setting — consider this if your schedule is unpredictable",
    ],
  },

  // ─── Community & Stories ─────────────────────────────────────────────────────
  {
    slug: "real-stories",
    title: "Real stories: solo mums share their journeys",
    type: "Stories",
    category: "Community & Stories",
    categorySlug: "community-stories",
    readTime: "10 min read",
    intro:
      "Nothing helps more than reading about someone who has been exactly where you are. These are real accounts from solo mums by choice who navigated the decision, the treatment, the pregnancy, and early parenthood — shared in their own words.",
    sections: [
      {
        heading: "Sarah, 38 — Two rounds of IUI, one round of IVF",
        body: [
          "I made the decision at 36. I had been thinking about it for two years and I finally gave myself permission to stop waiting for something that might not come. Starting the process felt like taking back control after a long time of feeling like life was happening to me rather than being something I was choosing.",
          "The two IUI cycles were harder emotionally than I expected. I think I had convinced myself they would work because they were 'easier'. When the second one failed I felt genuinely devastated, which surprised me — I had not let myself feel how much I wanted this until it did not happen.",
          "IVF was a completely different experience in terms of commitment — more injections, more monitoring, more waiting. But it worked on the first cycle. My daughter is two now. The part I was least prepared for was how un-alone I felt the moment she arrived. I thought I would feel the absence of a partner more in those first days. Mostly I just felt incredibly present.",
        ],
        callout:
          "What I wish someone had told me: the community of solo mums online is extraordinary. I found an Instagram community early in my journey and those connections became some of my closest relationships during treatment. Don't wait to find your people.",
      },
      {
        heading: "Priya, 41 — Own eggs, then donor eggs",
        body: [
          "I started IVF at 40 using my own eggs. My AMH was on the lower side for my age and my consultant was honest that it would be harder, but possible. I had two failed cycles. The second one yielded three embryos — all of which either failed to develop properly or did not implant.",
          "The conversation about donor eggs was not easy. I had a very specific idea of what my child would look like and I had to let go of that. My fertility counsellor helped me think about what really mattered — and what I realised was that I wanted to be a mother, and the genetic connection, while something I had assumed, was not actually what I was pursuing.",
          "I found a donor through my clinic's egg bank — a woman in her late twenties who had donated before. The transfer worked first time. My son is four months old. He looks like no one in particular and he is perfectly himself. The story I tell him already is that he was so wanted that I looked and looked until I found exactly the right way to make him.",
        ],
      },
      {
        heading: "Gemma, 35 — Single transfer, now 10 weeks pregnant",
        body: [
          "I am still in it — ten weeks pregnant after a single IVF cycle. I do not quite believe it is real yet. The two-week wait was the strangest experience of my life — I went to a lot of cinema screenings. I booked tickets in advance for the specific purpose of having somewhere to be at a specific time every evening.",
          "What surprised me about telling people was the response. I had braced myself for difficult reactions. Almost everyone was genuinely happy for me. My mum — who I had most worried about — cried and said she had been hoping I would do this for years.",
          "I am trying to be in it rather than planning it all to death. That is my new daily challenge.",
        ],
        callout:
          "Want to share your story? We are always looking for honest accounts from every stage of the journey — whether you are at the beginning, in the middle of treatment, pregnant, or already a mum. Contact us at stories@flyingsolo.co.uk.",
      },
    ],
    keyTakeaways: [
      "Every journey is different — some take one cycle, some take many, and the destination is sometimes not the one you expected",
      "The SMC community is consistently cited as one of the most valuable parts of the journey",
      "Difficult decisions — like moving to donor eggs — often feel clearer after speaking with a fertility counsellor",
      "Preparing for both outcomes during treatment (not just the positive one) is genuinely protective",
      "The solo part often feels less significant than expected once the baby arrives",
    ],
  },

  {
    slug: "recommended-books",
    title: "Books every solo mum by choice should read",
    type: "Reading list",
    category: "Community & Stories",
    categorySlug: "community-stories",
    readTime: "4 min read",
    intro:
      "The best books on solo motherhood by choice do more than inform — they keep you company through a journey that can feel isolating. This reading list covers the decision-making phase, the practical guides, the memoirs, and the books you will want for your child later.",
    sections: [
      {
        heading: "For the decision-making phase",
        body: [
          "These books help you think through the choice before you have made it:",
        ],
        bullets: [
          "Choosing Single Motherhood by Mikki Morrissette — considered the founding text of the SMC movement. Honest, practical, and designed specifically for women making this decision. Covers everything from the emotional landscape to the clinical steps.",
          "The Baby Matrix by Laura Carroll — examines the cultural assumptions behind the expectation to partner before parenting. Useful for the internal permission-giving part of the journey.",
          "Maybe Baby, edited by Lori Leibovich — collection of essays on the decision of whether to have a child. Includes perspectives from solo parents and gives language to the ambivalence many women feel.",
        ],
      },
      {
        heading: "Memoirs",
        body: ["First-person accounts of the journey:"],
        bullets: [
          "I Thought It Was Just Me by Brené Brown — not specifically about solo motherhood, but about shame and vulnerability in a way that illuminates the social pressures of the decision",
          "The Art of the Ordinary by Chloe Melas — journalist's account of solo motherhood journey",
          "The Road Not Taken by various authors — anthology of personal essays from SMC members published by Single Mothers by Choice organisation",
        ],
      },
      {
        heading: "For the fertility and clinical journey",
        body: ["Practical and informative:"],
        bullets: [
          "It Starts with the Egg by Rebecca Fett — the most evidence-based guide to improving egg quality through supplements, diet, and environment. Particularly relevant for women over 35.",
          "The IVF Companion by Dr Susan Bewley — UK-specific guide to IVF from a senior British reproductive medicine specialist.",
          "Fertility Fitness by Emma Cannon — integrative approach to fertility combining conventional and Chinese medicine perspectives.",
        ],
      },
      {
        heading: "For talking to your child about donor conception",
        body: ["Age-appropriate books for donor-conceived children:"],
        bullets: [
          "My Story: Books for children conceived with donor insemination (Donor Conception Network) — a series of picture books written specifically for young children in different family configurations",
          "Telling and Talking (Donor Conception Network) — a guide for parents on having these conversations at different ages",
          "The Pea That Was Me by Kimberly Kluger-Bell — picture book for young children explaining egg donation",
          "Before You Were Born: Our Wish for a Baby by Jennifer Davis — gentle picture book for children",
        ],
      },
    ],
    keyTakeaways: [
      "Choosing Single Motherhood by Mikki Morrissette is the essential starting point for the decision-making phase",
      "It Starts with the Egg is the most evidence-based guide for improving outcomes through diet and supplements",
      "Donor Conception Network publishes the best age-appropriate books for talking to your child",
      "Memoirs are especially valuable during treatment — they remind you that others have been in exactly this place",
      "Reading before you start the clinical process can significantly improve the quality of your decision-making",
    ],
  },

  {
    slug: "online-communities",
    title: "Online communities worth joining",
    type: "Directory",
    category: "Community & Stories",
    categorySlug: "community-stories",
    readTime: "3 min read",
    intro:
      "The online solo mum by choice community is genuinely extraordinary — candid, informed, kind, and full of people at every stage of the journey who understand in a way that friends and family often cannot. These are the communities worth your time.",
    sections: [
      {
        heading: "Facebook groups",
        body: [
          "Facebook remains the primary platform for the UK SMC community. These groups are private (you need to request to join) and the quality of support is high:",
        ],
        bullets: [
          "UK Solo Mums by Choice — the largest UK-specific group. Covers everything from the decision phase through treatment and beyond.",
          "IVF with Donor Sperm UK — specifically for women using donor sperm. Practical, treatment-focused discussion.",
          "Solo Mum Tribe — global group with significant UK membership. Mix of decision-making support and treatment advice.",
          "The Stork and I UK — support group for solo women navigating fertility treatment",
          "Donor Conception Support — for parents and those considering donor conception, focused on disclosure and identity questions",
        ],
      },
      {
        heading: "Forums and Reddit",
        body: [
          "For asynchronous, searchable discussion:",
        ],
        bullets: [
          "Mumsnet Solo Parents board (mumsnet.com/solo-parents) — the largest UK parenting forum has an active solo parent community. Searchable archives make it particularly useful.",
          "Reddit r/SingleMothersbyChoice — active global community covering all stages. Good for candid, anonymous discussion.",
          "Fertility Friends (fertilityfriends.co.uk) — long-running UK fertility forum with dedicated solo treatment boards. Huge archive of treatment experiences.",
          "Fertility Network UK discussion boards — moderated and supportive",
        ],
      },
      {
        heading: "Instagram and other platforms",
        body: [
          "For inspiration, community, and real-time connection:",
        ],
        bullets: [
          "Search #soloparenting, #solomotherbyChoice, #singlemombyChoice on Instagram — significant community of people sharing their journeys openly",
          "TikTok: growing SMC community, particularly valuable for younger women at the consideration stage",
          "Twitter/X: #fertilitytreatment and #soloparent hashtags connect a smaller but engaged community",
        ],
        callout:
          "A note on quality: all communities have variation in the quality of information shared. For clinical questions, always verify advice with your medical team. Communities are best for emotional support, shared experience, and practical logistics — not as a substitute for medical guidance.",
      },
    ],
    keyTakeaways: [
      "Facebook groups are the primary hub for the UK SMC community — join two or three at different stages",
      "Mumsnet Solo Parents and Fertility Friends have large searchable archives of UK-specific experiences",
      "Instagram and TikTok communities are growing and valuable, particularly for younger women",
      "Use communities for emotional support and shared experience — verify clinical information with your medical team",
      "The global nature of online communities means you can find people at exactly your stage at any hour",
    ],
  },

  {
    slug: "uk-support-groups",
    title: "UK support groups: in-person and online",
    type: "Directory",
    category: "Community & Stories",
    categorySlug: "community-stories",
    readTime: "4 min read",
    intro:
      "Structured support — from organisations, charities, and professional bodies — exists at every stage of the solo motherhood journey. This directory covers the main UK organisations worth knowing about.",
    sections: [
      {
        heading: "Fertility-specific organisations",
        body: ["These organisations provide support during the treatment phase:"],
        bullets: [
          "Fertility Network UK (fertilitynetworkuk.org): the UK's leading patient support charity. Helpline, information, local support groups, and online community. Particularly strong on emotional support and advocacy.",
          "The Donor Conception Network (dcnetwork.org): support and resources for those using donor conception. Runs workshops, webinars, and has an extensive library of resources for parents and donor-conceived people.",
          "The Miscarriage Association (miscarriageassociation.org.uk): specialist support for pregnancy loss. Helpline, counselling referrals, and peer support.",
          "Progress Educational Trust (progress.org.uk): independent charity providing information on fertility treatment, genetics, and stem cell research. Evidence-based and patient-focused.",
          "BICA (bica.net): British Infertility Counselling Association. Directory of trained fertility counsellors.",
        ],
      },
      {
        heading: "Solo parent-specific organisations",
        body: ["These groups focus specifically on solo parenting by choice:"],
        bullets: [
          "Single Mothers by Choice UK (smcuk.co.uk): UK chapter of the international SMC organisation. Local meetups, national events, and an annual conference.",
          "Gingerbread (gingerbread.org.uk): the UK's leading organisation for single parents. Practical advice on benefits, childcare, and employment. Not specifically for solo mums by choice, but covers the practical landscape of single parenting comprehensively.",
          "One Parent Families Scotland (opfs.org.uk): Scottish equivalent of Gingerbread. Strong on Scottish-specific benefits and legal information.",
        ],
      },
      {
        heading: "NHS and clinical support",
        body: ["Within the healthcare system:"],
        bullets: [
          "Your HFEA-licensed clinic is legally required to offer access to counselling at all stages of treatment. Ask your clinic coordinator about this — it is often underused.",
          "Your GP can refer you to NHS talking therapies (Improving Access to Psychological Therapies / IAPT) for anxiety and depression support during treatment.",
          "NHS 111 and your midwifery team are your first ports of call for clinical concerns during pregnancy.",
        ],
      },
      {
        heading: "Local groups",
        body: [
          "Beyond the national organisations, many areas have local solo parent groups. Searching '[your city] solo parent' on Facebook or Meetup will often find them. NCT (nct.org.uk) also runs some antenatal and postnatal groups that are open to solo parents.",
          "Some fertility clinics run their own patient support groups or peer matching schemes — ask your clinic whether they have anything like this. Bourn Hall and CARE Fertility both run community events.",
        ],
        callout:
          "If there is no local group near you, consider starting one. Solo Mum Tribe (facebook.com/groups/solomumtribe) has a guide to setting up local meetups.",
      },
    ],
    keyTakeaways: [
      "Fertility Network UK (fertilitynetworkuk.org) is the first port of call for support during treatment",
      "Donor Conception Network (dcnetwork.org) is essential for anyone using donor conception — workshops and resources for all stages",
      "Your HFEA-licensed clinic must offer counselling access — ask for it",
      "Gingerbread (gingerbread.org.uk) covers the practical landscape of single parenting comprehensively",
      "Local groups often exist and are worth seeking out — the in-person community makes a difference",
    ],
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
  "emotional-wellbeing": "Emotional Wellbeing",
  "legal-admin": "Legal & Admin",
  "pregnancy-beyond": "Pregnancy & Beyond",
  "community-stories": "Community & Stories",
};
