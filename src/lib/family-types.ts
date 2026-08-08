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
  label: string;
  headline: string;
  subHeadline: string;
  heroCopy: string;
  cardSummary: string;
  image: string;
  imageAlt: string;
  hideHeroImage?: boolean;
  treatmentHighlight: string;
  steps: ProcessStep[];
  stories: Story[];
  clinicNote: string;
  resources: string[];
}

export const FAMILY_TYPES: FamilyType[] = [
  {
    slug: "solo-mum",
    label: "Solo Mums",
    headline: "Building your family,\nexactly as you envisioned it.",
    subHeadline: "Solo mums by choice · Donor sperm IVF · UK & abroad",
    heroCopy:
      "Choosing to become a mother on your own terms is one of the most courageous decisions a person can make. Whether you're just starting to research or already mid-treatment, this guide gives you a clear, honest map through every stage — from choosing a donor to your child's first birthday.",
    cardSummary:
      "For women choosing motherhood independently, using donor sperm and IUI or IVF.",
    image: "/photos/story-solo-mum.webp",
    imageAlt: "A mother holding her young child, looking out at the sky",
    hideHeroImage: true,
    treatmentHighlight: "IUI · IVF · ICSI · Donor Sperm",
    steps: [
      {
        number: 1,
        title: "Understand your fertility baseline",
        body: "Start with a fertility MOT: AMH (anti-Müllerian hormone), AFC (antral follicle count), and baseline bloods. These tests tell you where you stand and help you decide between IUI (simpler, less costly) and IVF (more intensive, higher success rates). Most clinics can run these on day 2–3 of your cycle.",
      },
      {
        number: 2,
        title: "Choose your treatment route",
        body: "IUI uses donor sperm inserted directly into the uterus during ovulation — it's less invasive and costs roughly £1,000–£1,500 per cycle. IVF involves stimulating your ovaries, retrieving eggs, fertilising them in the lab, and transferring an embryo. For women under 35 with good fertility markers, IUI is often a sensible first step.",
      },
      {
        number: 3,
        title: "Select your sperm donor",
        body: "In the UK, HFEA law requires that donors are traceable — your child can access identifying information at 18. Choose from a UK-licensed sperm bank or arrange importation from a European bank (common for wider choice). Profiles typically include physical traits, health history, and a personal statement. Take your time: this decision matters.",
      },
      {
        number: 4,
        title: "Choose your clinic",
        body: "Every UK fertility clinic must be HFEA-licensed. Compare clinics on HFEA-reported success rates for your age bracket, solo-patient policy (some add friction; others specialise in it), pricing transparency, and waiting times. Our comparison tool lets you do this side by side.",
      },
      {
        number: 5,
        title: "Start treatment",
        body: "Depending on your route, you'll either have a monitored natural or stimulated IUI cycle, or begin IVF stimulation injections. Most clinics assign you a dedicated nurse coordinator. Treatment cycles typically run 2–4 weeks from start to result.",
      },
      {
        number: 6,
        title: "Embryo banking (optional but worth considering)",
        body: "If you want the option of a second child or want to maximise your success rate per round, consider creating and freezing multiple embryos across several egg collections before your first transfer. This is sometimes called 'batch IVF' and can be more cost-effective in the long run.",
      },
      {
        number: 7,
        title: "Pregnancy and birth",
        body: "Solo pregnancy is common — and you'll be far from the only one navigating it without a co-parent. Build your support team early: a good midwife, a birth partner (friend, family member, or doula), and your community. CairnFertility's birth partner and doula guides cover the practical detail.",
      },
      {
        number: 8,
        title: "Life ahead: thriving as a solo parent",
        body: "Solo parenthood is a legitimate, well-researched, and increasingly common family structure. Children of solo mums by choice show strong outcomes across wellbeing measures. The practical and emotional realities are real — but so is the joy. Our resources section covers everything from childcare planning to talking to your child about their donor.",
      },
    ],
    stories: [
      {
        image: "/photos/hands.webp",
        imageAlt: "An adult hand holding a small child's hand",
        name: "Alice",
        age: 37,
        location: "Bristol",
        tag: "IVF with donor sperm",
        title: "From 'someday' to mum of one in 22 months",
        body: "I started researching after a relationship ended in my mid-thirties. I gave myself three months to decide. Two IUI rounds and one IVF cycle later, my daughter Iris was born in 2023. The hardest part wasn't the injections or the waiting — it was trusting myself to make this decision without anyone to share it with. The CairnFertility community gave me that.",
        treatment: "IUI × 2, IVF × 1",
      },
      {
        name: "Natalie",
        age: 40,
        location: "London",
        tag: "Donor egg journey",
        title: "I used donor eggs and I'm not ashamed of it",
        body: "After three failed cycles with my own eggs, my consultant suggested donor eggs. I was devastated, then slowly curious, then — after reading dozens of stories from women who'd been exactly here — at peace with it. My twins Evi and Rosa are two and a half. I tell them their origin story regularly, and they think it's completely normal. Because it is.",
        treatment: "Donor egg IVF",
      },
      {
        name: "Jo",
        age: 34,
        location: "Manchester",
        tag: "First IVF cycle",
        title: "The bit nobody talks about: the two-week wait, alone",
        body: "Everyone warns you about the injections, the bloating, the retrieval. No one warns you how hard the two-week wait is when there's no partner to distract you at 2am. I found my people in an online group during my wait. We all got our results the same week. Two of us got positives. All of us showed up for each other regardless.",
        treatment: "IVF with donor sperm",
      },
    ],
    clinicNote:
      "Filter our comparison tool for donor sperm availability and solo-patient friendliness to find clinics that genuinely specialise in supporting single women.",
    resources: [
      "complete-solo-ivf-cost-breakdown",
      "how-to-choose-a-sperm-donor",
      "consultation-questions",
      "donor-conception-legal-parenthood",
      "solo-pregnancy-support-team",
      "uk-support-groups",
    ],
  },
  {
    slug: "same-sex-female",
    label: "Two Mums",
    headline: "Two mums.\nOne family. Endless love.",
    subHeadline: "Same-sex female couples · Donor sperm · Reciprocal IVF",
    heroCopy:
      "For two women building a family together, the options are rich and the path is well-trodden. Whether you're deciding who carries, exploring reciprocal IVF, or navigating the legal landscape of parenthood for both partners — this guide walks you through every stage with clarity.",
    cardSummary:
      "For female same-sex couples using donor sperm, including the reciprocal IVF option.",
    image: "/photos/story-two-mums.webp",
    imageAlt: "Two women sitting together, one kissing the other on the cheek",
    treatmentHighlight: "IUI · IVF · Reciprocal IVF · Donor Sperm",
    steps: [
      {
        number: 1,
        title: "Decide who carries — or both",
        body: "The first decision is whether one of you will carry, both of you will carry (reciprocal IVF), or you'll take turns. There's no right answer: it depends on fertility markers, physical health, how you feel emotionally about pregnancy, and practical factors. Many couples find the carrying partner 'obvious' quite quickly; others take longer.",
      },
      {
        number: 2,
        title: "Fertility assessments for the carrying partner(s)",
        body: "The partner who will carry (or both, if considering reciprocal IVF) should have a fertility MOT: AMH, AFC, and baseline bloods. This establishes the best starting point and helps your clinic recommend IUI (simpler) vs IVF (more effective). If both of you have good fertility markers, reciprocal IVF becomes a more viable option.",
      },
      {
        number: 3,
        title: "Explore reciprocal IVF",
        body: "Reciprocal IVF (also called ROPA — Reception of Oocytes from Partner) means one partner provides the eggs, those eggs are fertilised with donor sperm, and the resulting embryo is carried by the other partner. Both of you are biologically involved in the pregnancy. It's available at most HFEA-licensed clinics and costs similarly to standard IVF.",
      },
      {
        number: 4,
        title: "Choose your sperm donor",
        body: "UK law requires all donors to be HFEA-registered and traceable. Your child can request identifying information at 18. UK sperm banks are smaller than European ones; many couples import from banks in Denmark or Spain (this is legal in the UK with HFEA-registered donor sperm). Profiles include physical traits, health screening, and a personal statement.",
      },
      {
        number: 5,
        title: "Choose your clinic",
        body: "Look for HFEA-licensed clinics with an explicit LGBTQ+ inclusive policy — not just tolerance, but active experience with same-sex couples. Ask about their reciprocal IVF process, waiting times, and whether both partners are supported throughout consultations and monitoring. Our comparison tool flags LGBTQ+ friendly clinics.",
      },
      {
        number: 6,
        title: "Treatment and the two-week wait",
        body: "For IUI, the carrying partner attends for insemination during ovulation. For IVF, stimulation injections begin around day 2 of the cycle. For reciprocal IVF, the egg-providing partner goes through stimulation and retrieval while the carrying partner takes hormones to prepare her uterus for transfer. Both partners are deeply involved.",
      },
      {
        number: 7,
        title: "Legal parenthood for both partners",
        body: "In the UK, the non-carrying partner in a same-sex female couple is not automatically a legal parent — even if the child was conceived at a licensed clinic. You must be married or in a civil partnership at the time of treatment (and both consent) for the non-carrying partner to be on the birth certificate. If you're not, you can adopt after birth. Get legal advice before treatment.",
      },
      {
        number: 8,
        title: "Pregnancy, birth, and building your family",
        body: "Pregnancy as a same-sex couple is medically identical to any other pregnancy, but the social and emotional landscape has its own flavours — people's assumptions, family reactions, and the deep joy of two parents who chose this together. Our community includes hundreds of two-mum families at every stage.",
      },
    ],
    stories: [
      {
        name: "Sarah & Priya",
        age: 35,
        location: "London",
        tag: "Reciprocal IVF",
        title: "We both wanted to be part of making her",
        body: "We agonised over who would carry. Then our consultant mentioned reciprocal IVF and something clicked. Priya provided the eggs, they were fertilised with our chosen donor's sperm, and I carried the embryo. Our daughter Maya was born in 2024. She has Priya's eyes. She has both of us in her completely.",
        treatment: "Reciprocal IVF",
      },
      {
        name: "Kat",
        age: 38,
        location: "Edinburgh",
        tag: "IVF with donor sperm",
        title: "The admin was harder than the injections",
        body: "Finding a clinic that actually knew how to handle a two-mum family — not just wasn't hostile, but genuinely got it — took us three attempts. When we found the right clinic it changed everything. My wife was included in every appointment. They never once asked which of us was 'the patient'.",
        treatment: "IVF with donor sperm",
      },
      {
        name: "Gemma & Lola",
        age: 33,
        location: "Brighton",
        tag: "IUI journey",
        title: "Four rounds of IUI and then: positive",
        body: "We chose IUI first because my fertility markers were good and it felt less like launching straight into the deep end. After three unsuccessful rounds, we almost switched to IVF. We decided to try one more IUI. It worked. Our son Theo is 18 months. We're starting the conversation about round two.",
        treatment: "IUI × 4",
      },
    ],
    clinicNote:
      "Use the LGBTQ+ filter in our comparison tool to find clinics with genuine experience supporting same-sex female couples, including reciprocal IVF.",
    resources: [
      "iui-vs-ivf-vs-donor-eggs",
      "how-to-choose-a-sperm-donor",
      "consultation-questions",
      "donor-conception-legal-parenthood",
      "talking-to-child-donor-conception",
      "uk-support-groups",
    ],
  },
  {
    slug: "same-sex-male",
    label: "Two Dads",
    headline: "Two dads.\nA family built with intention.",
    subHeadline: "Same-sex male couples · Surrogacy · Donor egg IVF",
    heroCopy:
      "For two men wanting to become fathers, the path involves surrogacy — a process that's legal, increasingly common, and genuinely achievable in the UK. It's also more complex than other routes. This guide explains every step honestly, from finding a surrogate to the parental order that makes you your child's legal parents.",
    cardSummary:
      "For male same-sex couples pursuing parenthood via surrogacy and donor eggs.",
    image: "/photos/story-two-dads.webp",
    imageAlt: "Two men embracing and smiling at each other",
    treatmentHighlight: "Surrogacy · Donor Egg · IVF · ICSI",
    steps: [
      {
        number: 1,
        title: "Understand UK surrogacy law",
        body: "In the UK, surrogacy is legal but commercial surrogacy is not — surrogates can only receive 'reasonable expenses'. The surrogate is the legal mother at birth, even if she has no genetic connection to the child. You'll need a parental order after birth to become the legal parents. This is standard and achievable — but the legal timeline matters.",
      },
      {
        number: 2,
        title: "Find a surrogate",
        body: "Most couples in the UK find a surrogate through a recognised matching organisation such as Brilliant Beginnings or COTS (Childlessness Overcome Through Surrogacy). The matching process involves detailed conversations about expectations, values, and the type of ongoing relationship you want. Building a genuine relationship with your surrogate is essential.",
      },
      {
        number: 3,
        title: "Choose your egg donor",
        body: "You'll need an egg donor. UK egg donation is altruistic and donor-conceived individuals have the right to identifying information at 18. UK egg banks are available, as is importation from HFEA-registered donors abroad. Decide together which of you (or both, using two separate embryos) will provide the sperm for fertilisation.",
      },
      {
        number: 4,
        title: "Get legal advice before treatment starts",
        body: "This step is non-negotiable. Work with a specialist surrogacy solicitor — firms like Natalie Gamble Associates or Brilliant Beginnings Legal can guide you. Agreements should be in place before any treatment begins, covering the intended role of the surrogate after birth, financial arrangements, and what happens in edge cases.",
      },
      {
        number: 5,
        title: "IVF at an HFEA-licensed clinic",
        body: "The eggs are fertilised with one or both partners' sperm using IVF or ICSI. The resulting embryos are graded, and selected embryos are transferred to your surrogate. Many couples create multiple embryos to freeze, providing options for future pregnancies. Choose a clinic with experience in surrogacy arrangements.",
      },
      {
        number: 6,
        title: "Support your surrogate through pregnancy",
        body: "Your surrogate is carrying your child and her wellbeing directly affects the pregnancy. Stay connected — most surrogacy arrangements involve regular contact, attending scans, and genuine ongoing relationship. Discuss boundaries and expectations openly. Many intended fathers describe this as one of the most profound relationships of their lives.",
      },
      {
        number: 7,
        title: "Birth and immediate legal steps",
        body: "At birth, your surrogate is legally the mother. In the UK, if you're married and one of you is the biological father, you may automatically be a legal parent — but a parental order is still required to transfer legal parenthood fully. Apply for the parental order as soon as possible after birth (you have 6 months).",
      },
      {
        number: 8,
        title: "Life as two dads",
        body: "Two-dad families are raising children who are, by every measure, thriving. The journey is longer and more complex than other routes, but the dads who have done it consistently say the intentionality of it — the number of conversations, the depth of preparation — shapes the family they become. Our community includes two-dad families from day one through teenage years.",
      },
    ],
    stories: [
      {
        name: "Tom & Marcus",
        age: 38,
        location: "London",
        tag: "UK surrogacy",
        title: "We met our surrogate at a barbecue. She changed our lives.",
        body: "We'd been matched through a surrogacy organisation for six months when we met Jo at an introductory event. By the end of the night we knew she was right. Three months later, treatment started. Our son Elliot was born in 2023. Jo is his auntie. It's messier and more beautiful than we expected.",
        treatment: "IVF, UK surrogate",
      },
      {
        name: "Ravi & Ben",
        age: 41,
        location: "Manchester",
        tag: "Donor egg IVF",
        title: "Understanding what 'altruistic' really means",
        body: "We had to un-learn everything we thought we knew about surrogacy from American TV. In the UK, it's different — and in many ways more personal. Our surrogate Claire became someone we care about deeply. The process took longer than we hoped. Our daughter is 14 months. It was worth every moment of it.",
        treatment: "Donor egg IVF, UK surrogate",
      },
      {
        name: "Alex & Dan",
        age: 35,
        location: "Bristol",
        tag: "First-time fathers",
        title: "The two years that made us parents",
        body: "Nobody tells you how long the matching process takes, or how many conversations you'll have before you feel ready. But every conversation mattered. By the time we started treatment, we felt completely prepared. Our twins are four. They know their origin story and they love it.",
        treatment: "IVF with donor eggs × 2 embryos",
      },
    ],
    clinicNote:
      "Our comparison tool highlights clinics with surrogacy experience. Filter for donor egg IVF and ICSI availability when selecting your clinic.",
    resources: [
      "consultation-questions",
      "donor-conception-legal-parenthood",
      "hfea-register",
      "known-donor-legal-agreements",
      "talking-to-child-donor-conception",
      "uk-support-groups",
    ],
  },
  {
    slug: "single-dad",
    label: "Solo Dads",
    headline: "Fatherhood,\non your terms.",
    subHeadline: "Solo dads by choice · Surrogacy · Donor egg IVF",
    heroCopy:
      "More men than ever are choosing to become solo fathers. The path — surrogacy with a donor egg — is clear, legal, and achievable. It takes time, intention, and the right support. This guide covers everything you need to know, from the legal landscape to finding a surrogate to life on the other side.",
    cardSummary:
      "For solo dads pursuing fatherhood independently via surrogacy and donor eggs.",
    image: "/photos/cta-family.webp",
    imageAlt: "A father holding and kissing his young son",
    treatmentHighlight: "Surrogacy · Donor Egg · IVF · ICSI",
    steps: [
      {
        number: 1,
        title: "Know your legal landscape",
        body: "UK surrogacy is legal, altruistic, and well-established. The surrogate is the legal mother at birth — regardless of genetics — and you'll need a parental order to become the legal father. As a solo dad, the parental order process is slightly different from couples but equally achievable. Get specialist legal advice from a surrogacy solicitor at the very start.",
      },
      {
        number: 2,
        title: "Connect with the solo surrogacy community",
        body: "Solo fatherhood via surrogacy is less common than for couples, but not unusual. Organisations like COTS and Brilliant Beginnings have experience matching solo dads with surrogates. Reading other solo dads' stories before you start — understanding the emotional landscape — is genuinely valuable preparation.",
      },
      {
        number: 3,
        title: "Find your surrogate",
        body: "The matching process involves conversations about values, expectations for the relationship during and after pregnancy, and what role (if any) your surrogate would like in your child's life. This takes time and honest reflection. Most intended parents describe finding the right match as one of the most important steps of the entire journey.",
      },
      {
        number: 4,
        title: "Choose your egg donor",
        body: "In the UK, egg donors are identifiable at your child's request from age 18. UK egg banks are smaller; many solo fathers import from HFEA-registered egg banks in Spain, Czech Republic, or Greece. When choosing, consider health screening, open-ID options, and whether the donor has successfully donated before.",
      },
      {
        number: 5,
        title: "IVF treatment",
        body: "Your sperm is used to fertilise the donor eggs via IVF or ICSI at an HFEA-licensed clinic. Resulting embryos are graded and a selected embryo is transferred to your surrogate. Many dads freeze additional embryos at this stage, preserving the option for a second child from the same genetic source.",
      },
      {
        number: 6,
        title: "Supporting your surrogate",
        body: "Your surrogate is giving you an extraordinary gift. Regular contact, attending scans where invited, and genuine care for her wellbeing are part of the relationship. Many solo dads describe their surrogate as a lifelong connection — not a transaction, but a relationship that shaped the family that came from it.",
      },
      {
        number: 7,
        title: "Birth and parental order",
        body: "Apply for your parental order as soon as possible after birth — the window is 6 months from the birth date. In the UK, as a single intended father, you'll need to show you have a biological connection to the child (i.e. your sperm was used). A specialist solicitor handles the application and it's typically straightforward.",
      },
      {
        number: 8,
        title: "Solo fatherhood: building your village",
        body: "Solo parenting requires a village — and building yours before your child arrives makes an enormous difference. This means practical childcare arrangements, trusted family or friends, and community with other solo parents. The CairnFertility community includes single dads by choice who are open about the real experience: hard in places, extraordinary overall.",
      },
    ],
    stories: [
      {
        name: "James",
        age: 42,
        location: "London",
        tag: "Solo surrogacy journey",
        title: "I decided at 40. My son was born at 43.",
        body: "The decision took me two years to fully commit to. Not because I doubted it — I've always wanted to be a father — but because I needed to understand what I was doing before I began. The matching process, the legal preparation, the IVF cycle, the wait — all of it was manageable because I'd done the groundwork. Oscar is three. He is everything.",
        treatment: "IVF with donor eggs, UK surrogate",
      },
      {
        name: "Patrick",
        age: 38,
        location: "Birmingham",
        tag: "International egg donation",
        title: "Choosing a donor felt enormous. It became straightforward.",
        body: "I spent weeks agonising over the egg donor decision. Eventually my counsellor said something simple: you're not trying to build the 'perfect' person, you're just trying to find a healthy embryo. After that, the decision came quickly. My daughter Anya is two. She's entirely herself, and I love her for it.",
        treatment: "ICSI with international egg donor",
      },
      {
        name: "Michael",
        age: 36,
        location: "Edinburgh",
        tag: "Building a village",
        title: "What nobody tells you about solo fatherhood",
        body: "My son Finn came home to me when I was 36 and single. The practical stuff — childcare, night feeds, logistics — is genuinely hard alone. But the emotional stuff? The joy? That's entirely mine. I don't share it with a co-parent. I get all of it. On the hard days, I remind myself of that.",
        treatment: "IVF with donor egg, UK surrogate",
      },
    ],
    clinicNote:
      "Filter our comparison tool for donor egg IVF and ICSI availability. Look for clinics with experience working with single intended fathers and surrogacy arrangements.",
    resources: [
      "consultation-questions",
      "donor-conception-legal-parenthood",
      "hfea-register",
      "childcare-planning",
      "two-week-wait",
      "uk-support-groups",
    ],
  },
  {
    slug: "heterosexual-couple",
    label: "Mum and Dad",
    headline: "When love\nneeds a little science.",
    subHeadline: "Heterosexual couples · IVF & ICSI · All fertility challenges",
    heroCopy:
      "Fertility treatment for heterosexual couples covers an enormous range of situations — from unexplained infertility to specific diagnoses like low sperm count, PCOS, or poor egg reserve. Whatever brought you here, this guide helps you navigate your options with clarity: from initial investigations to embryo transfer, and everything in between.",
    cardSummary:
      "For couples navigating fertility challenges together — unexplained infertility, MFI, PCOS, and more.",
    image: "/photos/newborn.webp",
    imageAlt: "A couple holding their newborn baby by a window",
    treatmentHighlight: "IVF · ICSI · IUI · Donor Egg · Donor Sperm",
    steps: [
      {
        number: 1,
        title: "Initial investigations for both of you",
        body: "Fertility investigation is a two-person process. For women: AMH, AFC, day 2/3 bloods, and ideally a HyCoSy (tube patency test). For men: a semen analysis covering count, motility, and morphology. These tests take 2–4 weeks and give your clinic the information they need to recommend the right treatment route.",
      },
      {
        number: 2,
        title: "Understand your diagnosis",
        body: "The most common diagnoses are male factor infertility (MFI) — affecting 40% of fertility cases — PCOS (polycystic ovary syndrome), endometriosis, low ovarian reserve, or 'unexplained infertility' (no identifiable cause, ~25% of couples). Each has different treatment implications. Ask your consultant to explain the evidence for your specific situation.",
      },
      {
        number: 3,
        title: "Explore your treatment options",
        body: "IUI (intrauterine insemination) works for mild MFI and ovulatory dysfunction — it's less invasive and cheaper. IVF suits moderate-to-severe MFI, tubal issues, or unexplained infertility after IUI fails. ICSI (injecting a single sperm directly into an egg) is used for severe MFI or fertilisation failure. Donor eggs or sperm are options when your own gametes aren't viable.",
      },
      {
        number: 4,
        title: "NHS vs private — understanding your options",
        body: "NHS IVF funding varies enormously by Clinical Commissioning Group (now ICB). Some areas fund 1–3 cycles; others fund none. Check your local criteria carefully — they vary by age, BMI, existing children, and postcode. If you don't qualify or can't wait, private treatment gives you more control over timing and clinic choice.",
      },
      {
        number: 5,
        title: "Starting IVF: stimulation and egg collection",
        body: "IVF begins with ovarian stimulation injections (typically 10–14 days). You'll have regular monitoring scans to track follicle growth. Egg collection is a day-case procedure under sedation. Your partner provides a sperm sample the same day. Fertilisation happens in the lab overnight — you'll hear how many embryos have developed the next morning.",
      },
      {
        number: 6,
        title: "Embryo transfer and the two-week wait",
        body: "The best embryo is selected for transfer, usually on day 5 (blastocyst stage). Transfer is quick and painless — similar to a smear test. Then comes the two-week wait before a pregnancy test. It's one of the most emotionally challenging periods in IVF. Go easy on yourselves: information-seeking behaviour spikes during this time; try to limit it.",
      },
      {
        number: 7,
        title: "If this cycle doesn't work",
        body: "Most IVF cycles don't succeed first time. A failed cycle is devastating — allow yourselves to feel it. Then, when you're ready, your consultant should offer a review: what happened, what (if anything) can be changed, and whether to proceed with a frozen embryo transfer (if you have frozen embryos) or a new cycle.",
      },
      {
        number: 8,
        title: "Pregnancy after IVF",
        body: "Pregnancy after fertility treatment comes with its own emotional weight — anxiety is very common, even when everything looks fine. Many couples find that the joy is real but complicated by fear. This is normal. Stay in contact with your clinic until the midwife handover, and tell your midwife you've been through IVF — it changes the emotional care they provide.",
      },
    ],
    stories: [
      {
        image: "/photos/story-mirror-family.webp",
        imageAlt: "A couple with their newborn, seen through a mirror",
        name: "Emma & David",
        age: 34,
        location: "London",
        tag: "Unexplained infertility",
        title: "Two years of trying. Three months of IVF. One daughter.",
        body: "We tried naturally for two years before getting investigated. Everything came back 'normal'. Unexplained infertility is its own kind of maddening — there's nothing to fix, nothing to point at. Our consultant recommended IVF. First cycle, first transfer. Our daughter Isla is 18 months. We still don't understand why it works. We stopped needing to.",
        treatment: "IVF × 1",
      },
      {
        name: "Jess & Chris",
        age: 38,
        location: "Leeds",
        tag: "Male factor infertility",
        title: "Chris's diagnosis changed everything. And nothing.",
        body: "Chris was diagnosed with severe oligozoospermia — fewer than 1 million sperm per ml. We went straight to ICSI. The first cycle produced four good embryos. We used one on the first transfer and it worked. The other three are frozen. We talk about using them, giving them to research, or both. There's no rush. We're just grateful.",
        treatment: "ICSI × 1",
      },
      {
        name: "Aisha & Sam",
        age: 41,
        location: "Birmingham",
        tag: "Donor egg IVF",
        title: "Using donor eggs wasn't a compromise. It was a decision.",
        body: "At 40 my AMH was very low. After two failed cycles with my own eggs, we had the donor egg conversation. We spent three months on it — reading, talking, counselling. Then we decided, and we were decided. Our son Noah is one. He has Sam's cheekbones. He has my laugh. He is completely ours.",
        treatment: "Donor egg IVF",
      },
    ],
    clinicNote:
      "Use our comparison tool to filter by treatment type — IVF, ICSI, IUI, or donor gametes — and sort by success rate for your age bracket to find the clinic that gives you the best chance.",
    resources: [
      "iui-vs-ivf-vs-donor-eggs",
      "consultation-questions",
      "understanding-hfea-success-rates",
      "fertility-finance-options",
      "two-week-wait",
      "when-treatment-fails",
    ],
  },
];

export function getFamilyType(slug: string): FamilyType | undefined {
  return FAMILY_TYPES.find((f) => f.slug === slug);
}
