import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "What Happens During IVF | CairnFertility",
  description:
    "From ovarian stimulation to implantation — what is actually happening inside your body and in the laboratory at every step of the IVF process. In plain English.",
};

// ─── SVG Illustrations ────────────────────────────────────────────────────────

function StimulationIllustration() {
  return (
    <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="s1bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FDE8F2" /><stop offset="100%" stopColor="#f5d4e6" /></radialGradient>
        <radialGradient id="s1ov" cx="32%" cy="28%" r="72%"><stop offset="0%" stopColor="#f9c6da" /><stop offset="100%" stopColor="#F0A8C4" /></radialGradient>
        <radialGradient id="s1fl" cx="30%" cy="28%" r="70%"><stop offset="0%" stopColor="#ffffff" /><stop offset="100%" stopColor="#FDE8F2" /></radialGradient>
        <radialGradient id="s1eg" cx="35%" cy="30%" r="65%"><stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" /><stop offset="100%" stopColor="#f9c6da" /></radialGradient>
      </defs>
      <circle cx="90" cy="90" r="86" fill="url(#s1bg)" />
      <ellipse cx="90" cy="96" rx="60" ry="44" fill="url(#s1ov)" stroke="var(--teal)" strokeWidth="1.5" />
      <circle cx="90" cy="77" r="21" fill="url(#s1fl)" stroke="var(--teal)" strokeWidth="1.5" />
      <circle cx="90" cy="77" r="9" fill="url(#s1eg)" />
      <circle cx="84" cy="72" r="3" fill="white" fillOpacity="0.7" />
      <circle cx="62" cy="92" r="15" fill="url(#s1fl)" stroke="var(--teal)" strokeWidth="1.5" />
      <circle cx="62" cy="92" r="6" fill="url(#s1eg)" />
      <circle cx="118" cy="92" r="15" fill="url(#s1fl)" stroke="var(--teal)" strokeWidth="1.5" />
      <circle cx="118" cy="92" r="6" fill="url(#s1eg)" />
      <circle cx="74" cy="112" r="11" fill="url(#s1fl)" stroke="var(--teal)" strokeWidth="1.5" />
      <circle cx="74" cy="112" r="4.5" fill="url(#s1eg)" />
      <circle cx="106" cy="112" r="11" fill="url(#s1fl)" stroke="var(--teal)" strokeWidth="1.5" />
      <circle cx="106" cy="112" r="4.5" fill="url(#s1eg)" />
      <ellipse cx="64" cy="76" rx="16" ry="10" fill="white" fillOpacity="0.2" transform="rotate(-20 64 76)" />
    </svg>
  );
}

function EggRetrievalIllustration() {
  return (
    <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="s2bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FDE8F2" /><stop offset="100%" stopColor="#f5d4e6" /></radialGradient>
        <radialGradient id="s2ov" cx="35%" cy="28%" r="72%"><stop offset="0%" stopColor="#f9c6da" /><stop offset="100%" stopColor="#F0A8C4" /></radialGradient>
        <radialGradient id="s2fl" cx="30%" cy="28%" r="70%"><stop offset="0%" stopColor="#ffffff" /><stop offset="100%" stopColor="#FDE8F2" /></radialGradient>
      </defs>
      <circle cx="90" cy="90" r="86" fill="url(#s2bg)" />
      <ellipse cx="90" cy="102" rx="58" ry="42" fill="url(#s2ov)" stroke="var(--teal)" strokeWidth="1.5" />
      <circle cx="90" cy="84" r="26" fill="url(#s2fl)" stroke="var(--teal)" strokeWidth="1.5" />
      <circle cx="90" cy="84" r="11" fill="#f9c6da" />
      <circle cx="85" cy="79" r="3.5" fill="white" fillOpacity="0.7" />
      <circle cx="60" cy="110" r="10" fill="url(#s2fl)" stroke="var(--teal)" strokeWidth="1.5" opacity="0.55" />
      <circle cx="120" cy="114" r="9" fill="url(#s2fl)" stroke="var(--teal)" strokeWidth="1.5" opacity="0.55" />
      <line x1="90" y1="10" x2="90" y2="60" stroke="var(--teal)" strokeWidth="3" strokeLinecap="round" />
      <path d="M 86 60 L 90 66 L 94 60" fill="var(--teal)" />
      <ellipse cx="66" cy="82" rx="13" ry="8" fill="white" fillOpacity="0.2" transform="rotate(-20 66 82)" />
    </svg>
  );
}

function ICSIIllustration() {
  return (
    <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="s3bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FDE8F2" /><stop offset="100%" stopColor="#f5d4e6" /></radialGradient>
        <radialGradient id="s3eg" cx="35%" cy="30%" r="65%"><stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" /><stop offset="100%" stopColor="#f9c6da" /></radialGradient>
      </defs>
      <circle cx="90" cy="90" r="86" fill="url(#s3bg)" />
      <circle cx="90" cy="90" r="56" fill="none" stroke="#F0A8C4" strokeWidth="8" strokeOpacity="0.55" />
      <circle cx="90" cy="90" r="46" fill="url(#s3eg)" />
      <circle cx="85" cy="86" r="14" fill="#FDE8F2" fillOpacity="0.75" stroke="#F0A8C4" strokeWidth="1.5" />
      <circle cx="85" cy="86" r="6" fill="#F0A8C4" fillOpacity="0.55" />
      <rect x="8" y="81" width="46" height="18" rx="9" fill="var(--teal)" fillOpacity="0.1" stroke="var(--teal)" strokeWidth="1.5" />
      <path d="M 54 81 Q 50 90 54 99" stroke="var(--teal)" strokeWidth="1.5" fill="none" />
      <rect x="126" y="84" width="46" height="12" rx="6" fill="var(--teal)" fillOpacity="0.1" stroke="var(--teal)" strokeWidth="1.5" />
      <line x1="172" y1="90" x2="100" y2="90" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="118" cy="90" rx="7" ry="3" fill="#1A3A25" />
      <path d="M 125 90 Q 132 86 136 90 Q 140 94 146 90" stroke="#1A3A25" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="70" cy="68" r="10" fill="white" fillOpacity="0.35" />
    </svg>
  );
}

function FertilisationIllustration() {
  return (
    <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="s4bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FDE8F2" /><stop offset="100%" stopColor="#f5d4e6" /></radialGradient>
        <radialGradient id="s4zy" cx="35%" cy="30%" r="65%"><stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" /><stop offset="100%" stopColor="#f9c6da" /></radialGradient>
        <radialGradient id="s4pna" cx="35%" cy="30%" r="65%"><stop offset="0%" stopColor="#ffffff" /><stop offset="100%" stopColor="#FDE8F2" /></radialGradient>
        <radialGradient id="s4pnb" cx="35%" cy="30%" r="65%"><stop offset="0%" stopColor="#ffffff" /><stop offset="100%" stopColor="#e4f4ec" /></radialGradient>
      </defs>
      <circle cx="90" cy="90" r="86" fill="url(#s4bg)" />
      <circle cx="90" cy="90" r="60" fill="none" stroke="#F0A8C4" strokeWidth="6" strokeOpacity="0.45" />
      <circle cx="90" cy="90" r="52" fill="url(#s4zy)" />
      <circle cx="73" cy="92" r="19" fill="url(#s4pna)" stroke="var(--teal)" strokeWidth="1.5" />
      <circle cx="73" cy="92" r="8" fill="var(--teal)" fillOpacity="0.12" />
      <circle cx="67" cy="87" r="3" fill="white" fillOpacity="0.75" />
      <circle cx="108" cy="88" r="19" fill="url(#s4pnb)" stroke="#1A3A25" strokeWidth="1.5" />
      <circle cx="108" cy="88" r="8" fill="#1A3A25" fillOpacity="0.15" />
      <circle cx="103" cy="83" r="3" fill="white" fillOpacity="0.75" />
      <circle cx="66" cy="66" r="10" fill="white" fillOpacity="0.3" />
    </svg>
  );
}

function CleavageIllustration() {
  const cells = [
    { cx: 90, cy: 57 }, { cx: 114, cy: 65 }, { cx: 122, cy: 90 }, { cx: 114, cy: 115 },
    { cx: 90, cy: 123 }, { cx: 66, cy: 115 }, { cx: 58, cy: 90 }, { cx: 66, cy: 65 },
  ];
  return (
    <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="s5bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FDE8F2" /><stop offset="100%" stopColor="#f5d4e6" /></radialGradient>
        <radialGradient id="s5cell" cx="35%" cy="30%" r="65%"><stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" /><stop offset="100%" stopColor="#f9c6da" /></radialGradient>
      </defs>
      <circle cx="90" cy="90" r="86" fill="url(#s5bg)" />
      <circle cx="90" cy="90" r="60" fill="none" stroke="#F0A8C4" strokeWidth="5" strokeOpacity="0.55" />
      {cells.map((pos, i) => (
        <g key={i}>
          <circle cx={pos.cx} cy={pos.cy} r="18" fill="url(#s5cell)" stroke="var(--teal)" strokeWidth="1.5" />
          <circle cx={pos.cx} cy={pos.cy} r="5" fill="#F0A8C4" fillOpacity="0.6" />
        </g>
      ))}
    </svg>
  );
}

function BlastocystIllustration() {
  const teAngles = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="s6bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FDE8F2" /><stop offset="100%" stopColor="#f5d4e6" /></radialGradient>
        <radialGradient id="s6cav" cx="40%" cy="35%" r="65%"><stop offset="0%" stopColor="#ffffff" /><stop offset="100%" stopColor="#FDE8F2" /></radialGradient>
        <radialGradient id="s6icm" cx="35%" cy="30%" r="65%"><stop offset="0%" stopColor="#f9c6da" /><stop offset="100%" stopColor="#F0A8C4" /></radialGradient>
      </defs>
      <circle cx="90" cy="90" r="86" fill="url(#s6bg)" />
      <circle cx="90" cy="90" r="64" fill="none" stroke="#F0A8C4" strokeWidth="3" strokeOpacity="0.4" />
      <circle cx="90" cy="90" r="58" fill="url(#s6cav)" />
      {teAngles.map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <circle key={i} cx={90 + 50 * Math.cos(rad)} cy={90 + 50 * Math.sin(rad)}
            r="9" fill="#f9c6da" stroke="var(--teal)" strokeWidth="1.2" />
        );
      })}
      <circle cx="71" cy="70" r="26" fill="url(#s6icm)" />
      <circle cx="63" cy="66" r="11" fill="#F0A8C4" fillOpacity="0.75" stroke="var(--teal)" strokeWidth="1" />
      <circle cx="79" cy="68" r="10" fill="#F0A8C4" fillOpacity="0.75" stroke="var(--teal)" strokeWidth="1" />
      <circle cx="68" cy="80" r="10" fill="#F0A8C4" fillOpacity="0.75" stroke="var(--teal)" strokeWidth="1" />
      <circle cx="66" cy="56" r="8" fill="white" fillOpacity="0.38" />
    </svg>
  );
}

function TransferIllustration() {
  return (
    <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="s7bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FDE8F2" /><stop offset="100%" stopColor="#f5d4e6" /></radialGradient>
        <radialGradient id="s7ut" cx="32%" cy="22%" r="78%"><stop offset="0%" stopColor="#f9c6da" /><stop offset="100%" stopColor="#F0A8C4" /></radialGradient>
      </defs>
      <circle cx="90" cy="90" r="86" fill="url(#s7bg)" />
      <path d="M 44 128 Q 36 68 90 38 Q 144 68 136 128 Q 118 148 90 154 Q 62 148 44 128 Z"
        fill="url(#s7ut)" stroke="var(--teal)" strokeWidth="1.5" />
      <path d="M 44 84 Q 28 68 22 52" stroke="#F0A8C4" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 136 84 Q 152 68 158 52" stroke="#F0A8C4" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 70 118 Q 62 76 90 52 Q 118 76 110 118 Q 102 134 90 138 Q 78 134 70 118 Z"
        fill="#FDE8F2" fillOpacity="0.65" />
      <line x1="90" y1="170" x2="90" y2="98" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="90" cy="93" r="10" fill="#FDE8F2" stroke="var(--teal)" strokeWidth="1.5" />
      <circle cx="90" cy="93" r="6.5" fill="#f9c6da" />
      <circle cx="86" cy="89" r="3" fill="#F0A8C4" fillOpacity="0.8" />
      <ellipse cx="62" cy="72" rx="13" ry="8" fill="white" fillOpacity="0.2" transform="rotate(-18 62 72)" />
    </svg>
  );
}

function ImplantationIllustration() {
  return (
    <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="s8bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#F0F8E8" /><stop offset="100%" stopColor="#e4f0e0" /></radialGradient>
        <radialGradient id="s8em" cx="35%" cy="30%" r="65%"><stop offset="0%" stopColor="#f9c6da" /><stop offset="100%" stopColor="#F0A8C4" /></radialGradient>
        <radialGradient id="s8bl" cx="40%" cy="35%" r="65%"><stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" /><stop offset="100%" stopColor="#f9c6da" /></radialGradient>
      </defs>
      <circle cx="90" cy="90" r="86" fill="url(#s8bg)" />
      <path d="M 10 138 Q 50 122 90 128 Q 130 134 170 118 L 170 160 L 10 160 Z"
        fill="#1A3A25" fillOpacity="0.12" />
      <path d="M 10 120 Q 50 104 90 110 Q 130 116 170 100 L 170 138 Q 130 134 90 128 Q 50 122 10 138 Z"
        fill="#1A3A25" fillOpacity="0.08" />
      <path d="M 10 102 Q 46 86 70 94 Q 82 98 90 95 Q 108 89 134 98 Q 154 104 170 92 L 170 120 Q 130 116 90 110 Q 50 104 10 120 Z"
        fill="#C5E600" fillOpacity="0.2" />
      <path d="M 10 102 Q 46 86 70 94 Q 82 98 90 95 Q 108 89 134 98 Q 154 104 170 92"
        stroke="#1A3A25" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="90" cy="85" r="30" fill="url(#s8bl)" stroke="var(--teal)" strokeWidth="1.5" />
      <circle cx="90" cy="85" r="23" fill="#FDE8F2" />
      <circle cx="80" cy="76" r="14" fill="url(#s8em)" />
      <circle cx="78" cy="112" r="7" fill="#F0A8C4" fillOpacity="0.85" stroke="var(--teal)" strokeWidth="1" />
      <circle cx="90" cy="115" r="6.5" fill="#F0A8C4" fillOpacity="0.85" stroke="var(--teal)" strokeWidth="1" />
      <circle cx="102" cy="112" r="7" fill="#F0A8C4" fillOpacity="0.85" stroke="var(--teal)" strokeWidth="1" />
      <circle cx="150" cy="40" r="16" fill="#C5E600" />
      <path d="M 143 40 L 148 45 L 157 36" stroke="#1A3A25" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="74" cy="64" r="9" fill="white" fillOpacity="0.38" />
    </svg>
  );
}

// ─── Stage Data ───────────────────────────────────────────────────────────────

const STAGES = [
  {
    number: "01",
    title: "Ovarian Stimulation",
    duration: "Days 1–12 of treatment",
    body: [
      "In a natural cycle, one follicle matures and releases one egg. Stimulation changes that. Daily hormone injections — usually FSH (follicle-stimulating hormone) — encourage both ovaries to develop multiple follicles at the same time.",
      "During this phase you will attend monitoring scans every 2–3 days and have blood tests to track hormone levels. The aim is usually 8–15 mature follicles, though every ovary is different and fewer is not a failure.",
    ],
    facts: [
      "Stimulation typically lasts 10–14 days",
      "Follicles need to reach roughly 18 mm before retrieval",
      "Your ovaries may feel heavy or tender — this is expected and normal",
    ],
    Illustration: StimulationIllustration,
  },
  {
    number: "02",
    title: "Egg Retrieval",
    duration: "30–40 minutes, under sedation",
    body: [
      "Around 36 hours after your trigger injection, egg retrieval takes place. Under sedation, an ultrasound probe with a very fine attached needle is passed transvaginally to reach each follicle. The needle punctures the follicle wall and the fluid inside — including the egg — is gently aspirated.",
      "An embryologist in the adjacent lab immediately examines the fluid under a microscope to identify and count mature eggs. You won't feel anything during the procedure and most people go home within a few hours.",
    ],
    facts: [
      "Most people feel bloated or crampy afterwards but recover the same day",
      "Mature eggs (MII stage) are the ones that can be fertilised — not all retrieved eggs will be mature",
      "A retrieval of 6–15 eggs is considered a good response for most patients",
    ],
    Illustration: EggRetrievalIllustration,
  },
  {
    number: "03",
    title: "ICSI — Sperm Meets Egg",
    duration: "Hours 0–4, in the laboratory",
    body: [
      "For most solo parents and same-sex female couples using frozen donor sperm, fertilisation is done via ICSI (intracytoplasmic sperm injection). The embryologist selects a single sperm under high magnification and injects it directly into the egg using a microscopic needle — rather than leaving sperm to find the egg naturally.",
      "The egg is held in place with a blunt holding pipette on one side while the injection pipette approaches from the other. The sperm is deposited into the cytoplasm in seconds. ICSI is used routinely because the freeze-thaw process reduces sperm motility.",
    ],
    facts: [
      "ICSI requires the egg's surrounding cumulus cells to be removed first",
      "Each mature egg is injected with one carefully selected sperm",
      "Standard IVF (without ICSI) can be used when sperm quality is high — ask your clinic which they recommend",
    ],
    Illustration: ICSIIllustration,
  },
  {
    number: "04",
    title: "Fertilisation Confirmed",
    duration: "Day 1 — 16–20 hours after ICSI",
    body: [
      "The morning after ICSI, the embryologist checks each injected egg under the microscope. A successfully fertilised egg — now called a zygote — shows two small spheres called pronuclei: one carrying your genetic material, one carrying the donor sperm's.",
      "Not every injected egg will fertilise. A typical fertilisation rate is 60–80% of mature eggs. Those that don't fertilise are not used further. You will usually receive an update from your clinic on day 1.",
    ],
    facts: [
      "Two pronuclei (2PN) is the sign of normal, successful fertilisation",
      "Three pronuclei (3PN) means two sperm fertilised the egg — these embryos are not transferred",
      "A fertilisation rate of 70% from mature eggs is considered good",
    ],
    Illustration: FertilisationIllustration,
  },
  {
    number: "05",
    title: "Cell Division",
    duration: "Days 2–4",
    body: [
      "A fertilised egg begins to divide. By day 2 it has 2–4 cells. By day 3, a typical embryo has 6–8 cells, known as blastomeres. The embryologist grades embryos at each check: cell number, whether the cells are even in size, and how much fragmentation is present.",
      "The cells don't grow — the same cytoplasm from the original egg is simply divided into smaller and smaller units. Each blastomere at this stage is genetically identical to the others.",
    ],
    facts: [
      "Grading systems vary between clinics but all assess cell number, symmetry, and fragmentation",
      "Some embryos develop more slowly at day 3 but catch up by day 5 — don't read too much into early grades",
      "Most clinics culture embryos to day 5 before selecting one for transfer or freezing",
    ],
    Illustration: CleavageIllustration,
  },
  {
    number: "06",
    title: "The Blastocyst",
    duration: "Day 5–6",
    body: [
      "By day 5, a good-quality embryo has transformed into a blastocyst — a fluid-filled sphere with two distinct cell populations. The outer layer (trophectoderm) will become the placenta. The inner cell mass (ICM), a tight cluster on one side, will become the baby.",
      "The blastocyst also begins to hatch out of its outer shell (the zona pellucida) in preparation for implantation. Grading uses expansion (1–6), ICM quality (A/B/C), and trophectoderm quality (A/B/C) — so a 4AA is top grade.",
    ],
    facts: [
      "On average 40–60% of fertilised eggs reach blastocyst stage",
      "Good expansion and high ICM/TE grades predict better implantation rates",
      "Blastocysts can be vitrified (frozen) and stored for months or years without significant quality loss",
    ],
    Illustration: BlastocystIllustration,
  },
  {
    number: "07",
    title: "Embryo Transfer",
    duration: "10–15 minutes, no sedation needed",
    body: [
      "On transfer day, the chosen embryo is loaded into a thin, flexible catheter. You lie as you would for a smear test while the catheter is passed gently through the cervix and into the uterine cavity. The embryo is deposited with a tiny amount of fluid.",
      "Ultrasound guidance is usually used so the team can see exactly where in the uterus the embryo is placed. Most people describe the procedure as no more uncomfortable than a cervical smear. You can drive home and resume normal activity the same day.",
    ],
    facts: [
      "Most clinics now transfer a single embryo to minimise the risk of twins",
      "Bed rest after transfer is not recommended — normal gentle activity is fine",
      "Remaining good-quality embryos are vitrified and stored for future frozen embryo transfer (FET) cycles",
    ],
    Illustration: TransferIllustration,
  },
  {
    number: "08",
    title: "Implantation",
    duration: "Days 1–10 after transfer",
    body: [
      "After transfer, the blastocyst floats free in the uterus for a day or two before making contact with the endometrium — the uterine lining. The trophectoderm cells begin to burrow into the lining in a process called implantation. Blood vessels start to form between embryo and uterus.",
      "As the embryo embeds, it starts producing hCG (human chorionic gonadotropin) — the hormone detected by pregnancy tests. A blood test 9–14 days after transfer measures hCG to confirm whether implantation has occurred.",
    ],
    facts: [
      "Implantation typically occurs 6–10 days after fertilisation",
      "A beta-hCG blood test is more sensitive and accurate than a home pregnancy test",
      "Even a perfectly graded blastocyst doesn't always implant — chromosomal abnormalities in the embryo are the most common reason for failure",
    ],
    Illustration: ImplantationIllustration,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HowIVFWorksPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <SiteNav />
        </div>
      </section>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-12 md:pb-16">
        <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
          The science
        </p>
        <h1
          className="font-sans font-bold text-[#1A3A25] mb-5"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}
        >
          What actually happens.
        </h1>
        <p className="text-[17px] font-sans leading-relaxed" style={{ maxWidth: "56ch", color: "#5C4050" }}>
          From the first injection to implantation — what is happening inside your body, and inside the laboratory, at every step. In plain English.
        </p>

        {/* Steps overview strip */}
        <div className="mt-10 flex flex-wrap gap-2">
          {STAGES.map((s) => (
            <a
              key={s.number}
              href={`#step-${s.number}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs font-sans text-[#1A3A25] hover:bg-[#1A3A25] hover:text-white hover:border-[#1A3A25] transition-colors"
            >
              <span className="font-[600] text-muted text-[10px]">{s.number}</span>
              {s.title}
            </a>
          ))}
        </div>
      </section>

      {/* Stages */}
      {STAGES.map((stage, i) => {
        const illustrationLeft = i % 2 === 0;
        return (
          <section
            key={stage.number}
            id={`step-${stage.number}`}
            className="border-t border-border"
            style={{ background: i % 2 === 0 ? "white" : "#FAFAFA" }}
          >
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

                {/* Illustration */}
                <div className={`flex items-center justify-center ${!illustrationLeft ? "lg:order-last" : ""}`}>
                  <div className="w-full max-w-[300px] mx-auto aspect-square">
                    <stage.Illustration />
                  </div>
                </div>

                {/* Text */}
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="inline-flex items-center justify-center text-[11px] font-[700] font-sans rounded-full px-3 py-1"
                      style={{ background: "#C5E600", color: "#1A3A25" }}
                    >
                      Step {stage.number}
                    </span>
                    <span className="text-xs font-[500] font-sans text-muted">
                      {stage.duration}
                    </span>
                  </div>
                  <h2
                    className="font-sans font-bold mb-5"
                    style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: 1.1, color: "#1A3A25" }}
                  >
                    {stage.title}
                  </h2>
                  {stage.body.map((para, j) => (
                    <p key={j} className="text-sm font-sans leading-relaxed mb-4" style={{ color: "#5C4050", maxWidth: "52ch" }}>
                      {para}
                    </p>
                  ))}
                  <ul className="mt-6 space-y-2.5">
                    {stage.facts.map((fact, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm font-sans" style={{ color: "#1A3A25" }}>
                        <span
                          className="mt-0.5 flex-none w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-[700]"
                          style={{ background: "#F0F8E8", color: "#1A3A25" }}
                        >
                          ✓
                        </span>
                        {fact}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </section>
        );
      })}

      <CTASection />
    </main>
  );
}
