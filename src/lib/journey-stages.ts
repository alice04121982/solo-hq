export type CardType = "GUIDE" | "TOOL" | "COMMUNITY" | "ARTICLE";

export interface StageCard {
  type: CardType;
  title: string;
  description: string;
  href?: string;
}

export interface JourneyStage {
  id: string;
  number: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  topics: string[];
  cards: StageCard[];
  ctaLabel: string;
}

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: "considering",
    number: 1,
    eyebrow: "STAGE 1 — CONSIDERING",
    title: "Considering",
    subtitle: "Am I really doing this?",
    description:
      "For most solo mums by choice, the decision takes months — sometimes years. There is no right timeline. This stage is about getting honest with yourself: what you want, what you fear, and what conditions feel right before you start.",
    topics: [
      "Sit with the question without rushing — most women take 6–24 months to decide",
      "Read memoirs and join SMC communities before committing to anything clinical",
      "Talk to a therapist experienced in fertility and solo parenthood",
      "Have an honest conversation about your support network",
    ],
    cards: [
      {
        type: "GUIDE",
        title: "The honest decision guide",
        description: "Questions to sit with before committing to the solo path.",
      },
      {
        type: "COMMUNITY",
        title: "SMC forums & groups",
        description: "Connect with women at exactly the same stage as you.",
      },
      {
        type: "TOOL",
        title: "Fertility timeline tool",
        description: "Understand your window and what different timelines look like.",
      },
      {
        type: "ARTICLE",
        title: "What 'ready' actually means",
        description: "Reflections from women who've been through the decision.",
      },
    ],
    ctaLabel: "Explore this stage",
  },
  {
    id: "donor",
    number: 2,
    eyebrow: "STAGE 2 — CHOOSING A DONOR",
    title: "Choosing a Donor",
    subtitle: "Navigating sperm banks",
    description:
      "Choosing a donor is deeply personal and logistically complex. You'll navigate international sperm banks, open-ID versus anonymous debates, and the emotional weight of selecting half your child's genetics.",
    topics: [
      "Understand open-ID donors vs. anonymous — UK law requires traceability",
      "Create accounts at major banks: Cryos, European Sperm Bank, London Sperm Bank",
      "Budget for 2–4 vials per cycle attempt, plus additional storage for siblings",
      "Consider CMV status, blood type matching, and extended family health history",
    ],
    cards: [
      {
        type: "GUIDE",
        title: "Open-ID vs. anonymous donors",
        description: "What UK law requires and what your child may want to know.",
      },
      {
        type: "GUIDE",
        title: "Sperm bank comparison guide",
        description: "Cryos, European Sperm Bank, London Sperm Bank — side by side.",
      },
      {
        type: "TOOL",
        title: "Donor selection checklist",
        description: "Everything to look for in an extended donor profile.",
      },
      {
        type: "COMMUNITY",
        title: "Donor choice support",
        description: "Peer support from women who've been through this decision.",
      },
    ],
    ctaLabel: "Explore this stage",
  },
  {
    id: "treatment-prep",
    number: 3,
    eyebrow: "STAGE 3 — PREPARING FOR TREATMENT",
    title: "Preparing for Treatment",
    subtitle: "IVF, IUI, and getting clinic-ready",
    description:
      "Before you book a first consultation, do the groundwork. Financial clarity, clinic research, and a realistic support structure separate women who feel prepared from those who feel blindsided when the process begins.",
    topics: [
      "Compare clinics on HFEA success rates for your age group — not headline numbers",
      "Complete a full financial audit: treatment costs plus 12 months of solo maternity",
      "Get baseline bloods done: AMH, FSH, LH, TSH, and an antral follicle count",
      "Understand IUI vs. IVF and which protocols your shortlisted clinics offer",
    ],
    cards: [
      {
        type: "TOOL",
        title: "Clinic comparison finder",
        description: "Compare HFEA success rates and all-in pricing in your area.",
      },
      {
        type: "GUIDE",
        title: "IUI vs. IVF — which is right for me?",
        description: "Pros, cons, and a real cost breakdown of both routes.",
      },
      {
        type: "GUIDE",
        title: "Pre-treatment baseline tests",
        description: "Which blood tests to request and what the results mean.",
      },
      {
        type: "TOOL",
        title: "Treatment cost calculator",
        description: "Build a realistic budget including the hidden extras.",
      },
    ],
    ctaLabel: "Explore this stage",
  },
  {
    id: "treatment",
    number: 4,
    eyebrow: "STAGE 4 — IN TREATMENT",
    title: "In Treatment",
    subtitle: "Cycles, scans, and the two-week wait",
    description:
      "The clinical phase is intense — injections, scans, and a lot of waiting. Understanding your protocol helps you advocate for yourself and avoid costly add-ons with little evidence base. And if a cycle fails, knowing what comes next matters as much as the treatment itself.",
    topics: [
      "Understand your stimulation protocol: long, short, or natural/modified",
      "Know which add-ons have HFEA amber/green evidence status",
      "Prepare for the two-week wait — plan distractions, not symptom-tracking",
      "Have a plan B before you start — not as defeat, but as preparation",
    ],
    cards: [
      {
        type: "GUIDE",
        title: "Understanding your protocol",
        description: "Long, short, and natural cycles explained in plain language.",
      },
      {
        type: "GUIDE",
        title: "HFEA add-ons: what's evidence-based?",
        description: "Traffic-light guide to treatment extras — what to accept and decline.",
      },
      {
        type: "COMMUNITY",
        title: "Two-week wait support",
        description: "Daily thread for the hardest fortnight in the journey.",
      },
      {
        type: "GUIDE",
        title: "When cycles fail",
        description: "Grief, next steps, and knowing when to pause or pivot.",
      },
    ],
    ctaLabel: "Explore this stage",
  },
  {
    id: "pregnancy",
    number: 5,
    eyebrow: "STAGE 5 — PREGNANCY",
    title: "Pregnancy as a Solo Mum",
    subtitle: "Growing your family solo",
    description:
      "A positive test is thrilling and terrifying in equal measure. Solo pregnancy comes with unique logistics — from who comes to scans to managing the physical demands without a partner at home. Planning ahead makes all the difference.",
    topics: [
      "Book a trusted scan buddy for your 12-week and 20-week appointments",
      "Review your maternity leave entitlement and start the employer conversation early",
      "Arrange your birth partner — a close friend, doula, or both",
      "Start thinking about childcare now — waiting lists are long in most areas",
    ],
    cards: [
      {
        type: "GUIDE",
        title: "Scan buddies & birth partners",
        description: "Who to bring to appointments and how to ask someone to be there.",
      },
      {
        type: "GUIDE",
        title: "Maternity leave as a solo parent",
        description: "Enhanced rights, SMP, and what to say to your employer.",
      },
      {
        type: "ARTICLE",
        title: "Telling your story",
        description: "When and how to share your journey — on your own terms.",
      },
      {
        type: "COMMUNITY",
        title: "Solo pregnancy group",
        description: "Peer support from women who know exactly how this feels.",
      },
    ],
    ctaLabel: "Explore this stage",
  },
  {
    id: "birth",
    number: 6,
    eyebrow: "STAGE 6 — BIRTH & NEWBORN",
    title: "Birth & Newborn",
    subtitle: "Your village matters most now",
    description:
      "The fourth trimester is relentless for every new parent — and doing it without a co-partner is hard in specific, practical ways. Planning for the first twelve weeks before you give birth makes a real difference to how you come through it.",
    topics: [
      "Create a postnatal support rota before you give birth — meals, visits, practical help",
      "Research local NCT groups and solo parent meetups in your area",
      "If possible, book a postnatal doula or night nanny for the first few weeks",
      "Know the signs of postnatal depression — solo mums are at higher risk",
    ],
    cards: [
      {
        type: "GUIDE",
        title: "Building your postnatal rota",
        description: "How to plan practical support well before you give birth.",
      },
      {
        type: "GUIDE",
        title: "Fourth trimester solo",
        description: "Setting up your home for single-handed newborn care.",
      },
      {
        type: "GUIDE",
        title: "Mental health after birth",
        description: "Signs of PND and where to get help when you're doing this alone.",
      },
      {
        type: "COMMUNITY",
        title: "New solo mum meetups",
        description: "Find local groups and online communities for the early weeks.",
      },
    ],
    ctaLabel: "Explore this stage",
  },
  {
    id: "thriving",
    number: 7,
    eyebrow: "STAGE 7 — THRIVING",
    title: "Thriving as a Solo Family",
    subtitle: "Life ahead, together",
    description:
      "Solo parenthood gets more manageable as your child grows — and often more joyful. The questions shift from 'can I do this?' to 'how do I talk to my child about their donor?' and 'how do I build a full life alongside this?' You've done the hardest part.",
    topics: [
      "Start thinking about donor disclosure early — honesty from the beginning is best",
      "Connect with donor-conceived adult communities for perspective on what children want",
      "Build solo parent friendships — the shared experience is irreplaceable",
      "Review finances annually: childcare, schooling, and your retirement as a sole earner",
    ],
    cards: [
      {
        type: "GUIDE",
        title: "Talking to your child about their donor",
        description: "What the research says, and how to do it at every age.",
      },
      {
        type: "COMMUNITY",
        title: "Solo parent meetups",
        description: "Find your people — local groups and national communities.",
      },
      {
        type: "GUIDE",
        title: "Financial planning as a sole earner",
        description: "Childcare costs, schooling, and planning for your own future.",
      },
      {
        type: "ARTICLE",
        title: "What solo family life is actually like",
        description: "Honest reflections from women a few years down the road.",
      },
    ],
    ctaLabel: "Explore this stage",
  },
];
