/**
 * US IVF coverage: the rules behind the coverage checker at /us/coverage.
 *
 * In the US, who pays for IVF turns first on how a health plan is funded and
 * only second on which state regulates it. State IVF laws bind fully insured
 * plans; self-funded employer plans (about two in three covered workers) are
 * governed by federal ERISA law and escape them. So the checker asks where
 * cover comes from, then how an employer plan is funded, and only then the
 * state and employer size.
 *
 * Every rule carries its sources, the date it was checked and a review-by
 * date that `npm run check:data` enforces. `usReviewed` stays false until a
 * US-qualified reviewer has checked the rule against statute; while any rule
 * is unreviewed the checker says so on screen, and check:data warns.
 *
 * Research behind these rules: reports/US IVF market expansion plan.md and
 * research_notes/US IVF market expansion plan/insurance_mandates_and_federal_policy.md.
 *
 * No imports from "@/": scripts/check-data.ts runs this file directly under
 * Node's type stripping, which cannot resolve path aliases.
 */

export interface Source {
  label: string;
  url: string;
}

export interface Provenance {
  sources: Source[];
  /** ISO date the rule was last checked against its sources. */
  checkedOn: string;
  /** ISO date by which it must be re-checked; check:data fails after it. */
  reviewBy: string;
  /** True only once a US-qualified reviewer has checked it against statute. */
  usReviewed: boolean;
}

// ─── Answers ──────────────────────────────────────────────────────────────────

export type CoverSource = "employer" | "individual" | "medicaid" | "tricare" | "fehb" | "none";
export type Funding = "fully-insured" | "self-funded" | "unsure";
export type CheckedState = "CA" | "NY" | "TX" | "FL";
export type PlanState = CheckedState | "other";
export type EmployerSize = "small" | "large" | "unsure";
export type FertilityBenefit = "yes" | "no" | "unsure";

export interface CoverageAnswers {
  source: CoverSource | null;
  funding: Funding | null;
  state: PlanState | null;
  size: EmployerSize | null;
  benefit: FertilityBenefit | null;
}

export const EMPTY_ANSWERS: CoverageAnswers = {
  source: null,
  funding: null,
  state: null,
  size: null,
  benefit: null,
};

/**
 * Both checked states draw the large-group line above 100 employees (CA:
 * 101+; NY: small group is 1 to 100), so one question serves both.
 */
export const LARGE_GROUP_MIN_EMPLOYEES = 101;

// ─── State rules ──────────────────────────────────────────────────────────────

interface StateRuleBase extends Provenance {
  code: CheckedState;
  name: string;
  law: string;
  /** Whether single people and same-sex couples can use the cover, as sourced. */
  whoQualifies: string;
  exemptions: string[];
  /** Related requirements worth knowing, such as fertility preservation. */
  alsoRequired?: string[];
}

/** The state requires fully insured plans above a size threshold to cover IVF. */
export interface CoverRule extends StateRuleBase {
  kind: "cover";
  /** What a fully insured plan for an employer of 101+ must include. */
  largeGroup: string[];
  /** What applies to a fully insured plan for a smaller employer. */
  smallGroup: string;
}

/** The state requires insurers to offer IVF cover, which the employer can decline. */
export interface OfferRule extends StateRuleBase {
  kind: "offer";
  /** What the insurer must offer. */
  offer: string;
  /** Conditions the law lets a plan attach to that cover. */
  conditions: string[];
}

/** The state has no IVF requirement for private plans. */
export interface NoMandateRule extends StateRuleBase {
  kind: "none";
  summary: string;
}

export type StateRule = CoverRule | OfferRule | NoMandateRule;

export const STATE_RULES: Record<CheckedState, StateRule> = {
  CA: {
    kind: "cover",
    code: "CA",
    name: "California",
    law: "SB 729",
    largeGroup: [
      "Diagnosis and treatment of infertility, including IVF",
      "Up to three completed egg retrievals",
      "Unlimited embryo transfers",
    ],
    smallGroup:
      "Plans for employers with 100 or fewer staff must offer IVF cover to the employer, but the employer can decline it.",
    whoQualifies:
      "The law uses a broad definition of infertility that includes needing donor sperm or eggs, so single people and same-sex couples qualify, and plans may not discriminate by sexual orientation, gender identity or marital status.",
    exemptions: [
      "self-funded employer plans (federal law)",
      "plans for religious employers",
      "Medi-Cal",
    ],
    sources: [
      {
        label: "UCLA Center on Reproductive Health: SB 729 explainer",
        url: "https://law.ucla.edu/sites/default/files/PDFs/Center_on_Reproductive_Health/California%E2%80%99s%20SB%20729%20Expanding%20Access%20to%20IVF%20and%20Family-Building%20for%20All%20(1).pdf",
      },
      {
        label: "Sequoia: California mandates infertility and IVF coverage",
        url: "https://www.sequoia.com/2025/07/california-mandates-infertility-ivf-coverage-updated/",
      },
      {
        label: "Senator Menjivar: SB 729 start date moved to 1 January 2026",
        url: "https://sd20.senate.ca.gov/news/california-state-budget-delays-implementation-sb-729-infertility-treatment-health-care",
      },
    ],
    checkedOn: "2026-09-26",
    reviewBy: "2026-12-31",
    usReviewed: false,
  },
  NY: {
    kind: "cover",
    code: "NY",
    name: "New York",
    law: "New York Insurance Law (IVF and fertility preservation, 2020)",
    largeGroup: [
      "Up to three cycles of IVF",
      "Diagnosis and treatment of infertility",
    ],
    smallGroup:
      "The IVF requirement applies to large group plans. Plans for employers with 100 or fewer staff aren't required to cover IVF.",
    whoQualifies:
      "We haven't yet confirmed how New York's law defines infertility for people who need donor sperm or eggs. Ask your insurer how your plan defines it before you start.",
    exemptions: ["self-funded employer plans (federal law)"],
    sources: [
      {
        label: "NY Department of Financial Services: IVF report",
        url: "https://www.dfs.ny.gov/system/files/documents/2019/02/dfs_ivf_report_02272019.pdf",
      },
    ],
    checkedOn: "2026-09-26",
    reviewBy: "2026-12-31",
    usReviewed: false,
  },
  TX: {
    kind: "offer",
    code: "TX",
    name: "Texas",
    law: "Texas Insurance Code, chapter 1366",
    offer:
      "Group plans that cover pregnancy must offer IVF cover on the same terms as other pregnancy care. The employer decides whether to buy it.",
    conditions: [
      "The eggs are fertilized only with the sperm of the patient's spouse",
      "At least five years of infertility, or one of a list of medical causes",
      "Cheaper treatments the plan covers have been tried first",
      "Treatment is at a facility that meets ASRM standards",
    ],
    whoQualifies:
      "Because the law allows plans to require the spouse's sperm, the cover it describes doesn't reach single people, two mums using donor sperm, or anyone using donor eggs or sperm. A plan can choose to cover more than the law requires.",
    exemptions: ["plans of employers affiliated with a religious denomination that objects to IVF"],
    alsoRequired: [
      "Since September 2023, plans must cover fertility preservation, such as egg or sperm freezing, before medical treatment that may cause infertility, such as chemotherapy.",
    ],
    sources: [
      {
        label: "Texas Insurance Code \u00a7 1366.003: IVF cover must be offered",
        url: "https://codes.findlaw.com/tx/insurance-code/ins-sect-1366-003",
      },
      {
        label: "Texas Insurance Code \u00a7 1366.005: conditions on IVF cover",
        url: "https://codes.findlaw.com/tx/insurance-code/ins-sect-1366-005.html",
      },
      {
        label: "Texas House Bill 1649 (2023): fertility preservation",
        url: "https://capitol.texas.gov/tlodocs/88R/analysis/html/HB01649E.htm",
      },
    ],
    checkedOn: "2026-09-26",
    reviewBy: "2026-12-31",
    usReviewed: false,
  },
  FL: {
    kind: "none",
    code: "FL",
    name: "Florida",
    law: "Florida law",
    summary:
      "Florida has no law requiring private health plans to cover IVF or other infertility treatment.",
    whoQualifies:
      "With no state rule, who qualifies is whatever your plan says. Check how it defines infertility if you're single or in a same-sex couple.",
    exemptions: [],
    alsoRequired: [
      "From 2026, the state employees' health plan must cover egg and sperm freezing before cancer treatment. That applies only to people covered through a Florida state job.",
    ],
    sources: [
      {
        label: "Cofertility: fertility insurance mandates by state, 2026",
        url: "https://www.cofertility.com/family-learn/fertility-insurance-mandates-how-does-my-state-stack-up",
      },
      {
        label: "RESOLVE: insurance coverage by state",
        url: "https://resolve.org/learn/financial-resources/insurance-coverage/insurance-coverage-by-state/",
      },
    ],
    checkedOn: "2026-09-26",
    reviewBy: "2026-12-31",
    usReviewed: false,
  },
};

const joinNames = (names: string[]) =>
  names.length < 2 ? names.join("") : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;

/** "California, New York, Texas and Florida": the states checked so far. */
export const CHECKED_STATE_NAMES = joinNames(Object.values(STATE_RULES).map((r) => r.name));

// ─── Rules that don't depend on the state ─────────────────────────────────────

export const GENERAL_RULES = {
  selfFunded: {
    sources: [
      {
        label: "KFF 2025 Employer Health Benefits Survey",
        url: "https://www.kff.org/health-costs/2025-employer-health-benefits-survey/",
      },
    ],
    checkedOn: "2026-09-26",
    reviewBy: "2026-12-31",
    usReviewed: false,
  },
  medicaid: {
    sources: [
      {
        label: "RESOLVE: Medicaid coverage for infertility",
        url: "https://resolve.org/learn/financial-resources/insurance-coverage/medicaid-coverage-for-infertility-treatments-and-fertility-preservation/",
      },
    ],
    checkedOn: "2026-09-26",
    reviewBy: "2026-12-31",
    usReviewed: false,
  },
  tricare: {
    sources: [
      {
        label: "The 19th: IVF expansion left out of the 2026 defense bill",
        url: "https://19thnews.org/2025/12/2026-ndaa-defense-bill-military-spending/",
      },
    ],
    checkedOn: "2026-09-26",
    reviewBy: "2026-12-31",
    usReviewed: false,
  },
  fehb: {
    sources: [
      {
        label: "FedTools: FEHB fertility coverage for 2026",
        url: "https://www.fedtools.com/blog/fehb-fertility-coverage-2026",
      },
    ],
    checkedOn: "2026-09-26",
    reviewBy: "2026-12-31",
    usReviewed: false,
  },
  otherStates: {
    sources: [
      {
        label: "RESOLVE: insurance coverage by state",
        url: "https://resolve.org/learn/financial-resources/insurance-coverage/insurance-coverage-by-state/",
      },
    ],
    checkedOn: "2026-09-26",
    reviewBy: "2026-12-31",
    usReviewed: false,
  },
} satisfies Record<string, Provenance>;

/** Every provenance record, for check:data. */
export function allProvenance(): { id: string; provenance: Provenance }[] {
  return [
    ...Object.values(STATE_RULES).map((r) => ({ id: `STATE_RULES.${r.code}`, provenance: r })),
    ...Object.entries(GENERAL_RULES).map(([id, p]) => ({ id: `GENERAL_RULES.${id}`, provenance: p })),
  ];
}

// ─── Steps ────────────────────────────────────────────────────────────────────

export type StepId = "source" | "funding" | "state" | "size" | "benefit" | "result";

/** The questions this set of answers still needs, in order, then the result. */
export function stepsFor(a: CoverageAnswers): StepId[] {
  const steps: StepId[] = ["source"];
  if (a.source === "employer") {
    steps.push("funding");
    if (a.funding === "fully-insured") {
      steps.push("state");
      // Only states whose law turns on employer size ask for it.
      if (a.state && a.state !== "other" && STATE_RULES[a.state].kind === "cover") steps.push("size");
    }
    steps.push("benefit");
  }
  steps.push("result");
  return steps;
}

export function isAnswered(step: StepId, a: CoverageAnswers): boolean {
  if (step === "result") return false;
  return a[step] !== null;
}

// ─── Result ───────────────────────────────────────────────────────────────────

/**
 * How the result reads at a glance. "required" is the only verdict that
 * says the law makes the plan pay; everything else sends the visitor to a
 * document or a person to confirm.
 */
export type Verdict = "required" | "plan-decides" | "unlikely" | "not-checked";

export interface CoverageResult {
  verdict: Verdict;
  headline: string;
  body: string[];
  /** Bullet list shown under "What the law requires", when a state rule applies. */
  requires?: string[];
  /** Bullet list shown under "Conditions the law allows", for offer-only states. */
  conditions?: string[];
  nextSteps: string[];
  provenance: Provenance[];
}

const BENEFIT_NOTE: Record<FertilityBenefit, string | null> = {
  yes: "You have a separate fertility benefit. It usually has its own clinic network and a dollar or cycle limit, and it can pay even when the main plan doesn't. Read its terms alongside your plan's.",
  no: null,
  unsure:
    "Check whether your employer offers a separate fertility benefit through a company such as Progyny, Carrot, Maven or Kindbody. HR or your benefits portal will list it, and it can pay even when the main plan doesn't.",
};

const ASK_FOR_DOCUMENTS =
  "Ask HR or your insurer for the plan's Summary of Benefits and Coverage and look under “infertility services”.";

export function assessCoverage(a: CoverageAnswers): CoverageResult {
  const withBenefit = (r: CoverageResult): CoverageResult => {
    const note = a.benefit ? BENEFIT_NOTE[a.benefit] : null;
    return note ? { ...r, nextSteps: [...r.nextSteps, note] } : r;
  };

  switch (a.source) {
    case "none":
      return {
        verdict: "unlikely",
        headline: "Without health cover, you would pay for treatment yourself.",
        body: [
          "Plans bought on the health insurance marketplace rarely include IVF, so taking one out usually won't change that. Many clinics offer payment plans, multi-cycle packages or refund programs, and some charities give grants.",
        ],
        nextSteps: [
          "Ask each clinic for a written, itemised quote that includes medication.",
          "Ask whether the clinic offers a multi-cycle or refund program, and what it excludes.",
        ],
        provenance: [],
      };

    case "medicaid":
      return {
        verdict: "unlikely",
        headline: "Medicaid almost never covers IVF.",
        body: [
          "No state's Medicaid program covers IVF in general. New York and Washington, D.C. cover up to three cycles of ovulation-inducing medication, and Utah covers IVF only for carriers of certain genetic conditions.",
          "A few states cover fertility preservation, such as egg freezing, before cancer treatment.",
        ],
        nextSteps: [
          "If you're facing treatment that may affect your fertility, ask your Medicaid plan about fertility preservation before it starts.",
        ],
        provenance: [GENERAL_RULES.medicaid],
      };

    case "tricare":
      return {
        verdict: "unlikely",
        headline: "TRICARE covers IVF only in narrow cases.",
        body: [
          "TRICARE pays for IVF only when infertility results from a serious illness or injury while on active duty. A proposal to cover IVF for all service members and their families was dropped from the 2026 defense bill.",
        ],
        nextSteps: [
          "If your infertility is linked to an illness or injury on active duty, ask TRICARE whether you qualify.",
        ],
        provenance: [GENERAL_RULES.tricare],
      };

    case "fehb":
      return {
        verdict: "plan-decides",
        headline: "It depends on which federal plan you choose.",
        body: [
          "For 2026, the BCBS Standard and GEHA High plans and many HMOs in the federal program cover IVF, and every plan covers IVF medication for up to three cycles a year.",
        ],
        nextSteps: [
          "Compare plans' fertility benefits at Open Season, and check the IVF section of each plan's brochure before you switch.",
        ],
        provenance: [GENERAL_RULES.fehb],
      };

    case "individual":
      return {
        verdict: "plan-decides",
        headline: "Your plan's own terms decide.",
        body: [
          "Plans you buy yourself follow a standard set of benefits chosen by your state, and most states' standard set doesn't include IVF. The state IVF laws we've checked apply to employer plans rather than plans you buy yourself.",
        ],
        nextSteps: [
          "Read the plan's Summary of Benefits and Coverage under “infertility services” before you enrol.",
        ],
        provenance: [],
      };

    case "employer":
      return withBenefit(assessEmployer(a));

    default:
      throw new Error("assessCoverage needs a coverage source");
  }
}

function assessEmployer(a: CoverageAnswers): CoverageResult {
  if (a.funding === "self-funded") {
    return {
      verdict: "plan-decides",
      headline: "Your employer decides, not state law.",
      body: [
        "Self-funded plans, where the employer pays claims itself and an insurer only administers the plan, are governed by federal law, so state IVF laws don't apply. About two in three people with employer cover are in one.",
        "Many large employers include IVF anyway. Your plan documents are the only place that says whether yours does.",
      ],
      nextSteps: [
        "Ask HR for the Summary Plan Description and look for the section on infertility or fertility treatment.",
      ],
      provenance: [GENERAL_RULES.selfFunded],
    };
  }

  if (a.funding === "unsure") {
    return {
      verdict: "plan-decides",
      headline: "First, find out how your plan is funded.",
      body: [
        "If your employer pays claims itself (self-funded, including level-funded plans), state IVF laws don't apply and the employer decides. If it buys a policy from an insurer (fully insured), your state's law may require IVF cover.",
        "Your plan documents usually say which. “Administered by” an insurer suggests self-funded; “insured by” or “underwritten by” suggests fully insured.",
      ],
      nextSteps: [
        "Ask HR: “Is our health plan fully insured or self-funded?” Then run this checker again.",
      ],
      provenance: [GENERAL_RULES.selfFunded],
    };
  }

  // Fully insured from here.
  if (a.state === "other" || a.state === null) {
    return {
      verdict: "not-checked",
      headline: "We haven't checked your state's law yet.",
      body: [
        `So far we've checked ${CHECKED_STATE_NAMES}. About 15 states and Washington, D.C. require some fully insured plans to cover IVF, and the rules vary a lot: some only require insurers to offer it, and many apply only above a certain employer size.`,
      ],
      nextSteps: [
        "RESOLVE, the national infertility association, keeps a guide to each state's law.",
        ASK_FOR_DOCUMENTS,
      ],
      provenance: [GENERAL_RULES.otherStates],
    };
  }

  const rule = STATE_RULES[a.state];
  const also = rule.alsoRequired ?? [];

  if (rule.kind === "offer") {
    return {
      verdict: "plan-decides",
      headline: `${rule.name} law requires insurers to offer IVF cover, but your employer can turn it down.`,
      body: [
        rule.offer,
        rule.whoQualifies,
        ...also,
        ...(rule.exemptions.length ? [`The law doesn't reach ${rule.exemptions.join(", ")}.`] : []),
      ],
      conditions: rule.conditions,
      nextSteps: [
        "Ask HR whether your employer took up the IVF cover its insurer had to offer.",
        ASK_FOR_DOCUMENTS,
      ],
      provenance: [rule],
    };
  }

  if (rule.kind === "none") {
    return {
      verdict: "plan-decides",
      headline: `${rule.name} law doesn't require your plan to cover IVF.`,
      body: [rule.summary, "Your plan may still include it. The plan documents will say.", rule.whoQualifies, ...also],
      nextSteps: [ASK_FOR_DOCUMENTS],
      provenance: [rule],
    };
  }

  if (a.size === "large") {
    return {
      verdict: "required",
      headline: `${rule.name} law requires your plan to cover IVF.`,
      body: [
        `Under ${rule.law}, fully insured plans for employers with ${LARGE_GROUP_MIN_EMPLOYEES} or more staff must cover IVF.`,
        rule.whoQualifies,
        `The law doesn't reach ${rule.exemptions.join(", ")}.`,
        ...also,
      ],
      requires: rule.largeGroup,
      nextSteps: [
        ASK_FOR_DOCUMENTS,
        "Ask your insurer which clinics are in network and whether treatment needs prior authorization.",
      ],
      provenance: [rule],
    };
  }

  if (a.size === "small") {
    return {
      verdict: "plan-decides",
      headline: `${rule.name} law doesn't require your plan to cover IVF.`,
      body: [rule.smallGroup, "Your plan may still include it. The plan documents will say."],
      nextSteps: [ASK_FOR_DOCUMENTS],
      provenance: [rule],
    };
  }

  return {
    verdict: "plan-decides",
    headline: "It depends on how many people your employer has.",
    body: [
      `In ${rule.name}, the IVF requirement applies to fully insured plans for employers with ${LARGE_GROUP_MIN_EMPLOYEES} or more staff. ${rule.smallGroup}`,
    ],
    nextSteps: [
      "Ask HR how many employees the plan covers, then run this checker again.",
      ASK_FOR_DOCUMENTS,
    ],
    provenance: [rule],
  };
}

/**
 * True while any rule is still awaiting US review. The checker shows a draft
 * notice on every screen until this is false, not just on results that cite
 * an unreviewed rule: the questions themselves encode the same research.
 */
export const AWAITING_US_REVIEW = allProvenance().some(({ provenance }) => !provenance.usReviewed);
