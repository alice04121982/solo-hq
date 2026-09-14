import type { Metadata } from "next";
import { InnerNav } from "@/components/inner-nav";
import { NewsletterSection } from "@/components/newsletter-section";
import { CTASection } from "@/components/cta-section";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { buttonVariants } from "@/components/ui";

export const metadata: Metadata = {
  title: "Solo Mum families | KLEO Fertility",
  description:
    "You've chosen to build your family on your own terms. From your first clinic consultation to thriving as a solo mum: every stage, covered honestly.",
};

const TREATMENT_PATHS = [
  {
    title: "IUI with donor sperm",
    summary:
      "The most common starting point for solo mums. Less invasive than IVF, lower cost, and a good first choice for women under 38 with healthy egg reserve.",
    facts: [
      "Cost £800–£1,500 per cycle",
      "Success rate 10–20% per cycle",
      "3–6 cycles typically recommended",
    ],
  },
  {
    title: "IVF with donor sperm",
    summary:
      "Recommended when IUI hasn't worked, or when age or egg reserve makes IVF the stronger choice from the start.",
    facts: [
      "Cost £4,000–£7,000 per cycle",
      "40% live birth rate for under-35s",
      "Most common route for over-38s",
    ],
  },
  {
    title: "Egg freezing first",
    summary:
      "Preserve your eggs now, start treatment when you're ready. Increasingly chosen by women in their early-to-mid thirties who aren't quite there yet.",
    facts: [
      "Cost £3,000–£5,000 per cycle",
      "Stored up to 10 years",
      "Best for under-38 with good AMH",
    ],
  },
];

const JOURNEY_STAGES = [
  {
    number: "01",
    title: "Researching and deciding",
    description:
      "The hardest part is often just committing to the idea. Give yourself time.",
  },
  {
    number: "02",
    title: "Fertility tests",
    description:
      "AMH, antral follicle count, and Day 3 bloods tell you where you stand.",
  },
  {
    number: "03",
    title: "Choosing a clinic",
    description:
      "Compare success rates, protocols, and costs. Our clinic finder makes this easier.",
  },
  {
    number: "04",
    title: "Choosing a donor",
    description:
      "Identity-release donors, CMV status, open donors: there's a lot to weigh.",
  },
  {
    number: "05",
    title: "Starting treatment",
    description: "IUI or IVF cycles, monitoring, the two-week wait.",
  },
  {
    number: "06",
    title: "Pregnancy and beyond",
    description:
      "Solo pregnancy is its own chapter. You don't have to navigate it alone.",
  },
];

const STATS = [
  {
    value: "4,800",
    label: "single women began fertility treatment in the UK in 2022",
  },
  {
    value: "×24",
    label: "increase in solo treatment since 1997 (HFEA data)",
  },
  {
    value: "89%",
    label: "of social egg freezing cycles in the UK are by single women",
  },
  {
    value: "40%",
    label: "live birth rate per cycle for single women aged 18–34",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "I spent a year reading everything I could find. KLEO was the first place that gave me real numbers, real timelines, and a community of women who said 'me too' without any judgement.",
    name: "Gemma, 38",
    location: "Bristol",
    stage: "Mum to Arlo, 14 months · donor IUI",
  },
  {
    quote:
      "I'm 42 and everyone kept telling me I'd left it too late. This community showed me women who'd had their babies at 43 and 44. It changed everything about how I saw my own chances.",
    name: "Claire, 42",
    location: "Edinburgh",
    stage: "Pregnant, due in August",
  },
];

const RELATED_LINKS = [
  {
    label: "Solo Navigator",
    href: "/solo-navigator",
    description: "Seven stages of guidance from considering to thriving.",
  },
  {
    label: "Donor Conception",
    href: "/donor-conception",
    description: "Everything you need to know about choosing a sperm donor.",
  },
  {
    label: "Find a Clinic",
    href: "/clinics",
    description: "Compare UK and international clinics by success rate and cost.",
  },
];

export default function SoloMumPage() {
  return (
    <main className="min-h-screen bg-bg-secondary">
      <InnerNav />

      {/* Hero */}
      <section className="bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary font-sans mb-5">
            Going solo by choice
          </p>
          <h1
            className="font-display font-bold text-text-primary mb-6"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Solo Mum families
          </h1>
          <p
            className="text-md font-sans text-text-secondary leading-relaxed mb-10"
            style={{ maxWidth: "52ch" }}
          >
            You&apos;ve chosen to build your family on your own terms. From your
            first clinic consultation to thriving as a solo mum: every stage,
            covered honestly.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/clinics"
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              Find a clinic
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/families"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              All family types
            </a>
          </div>
        </div>
      </section>

      {/* Treatment paths */}
      <section className="bg-bg-primary border-y border-border-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary font-sans mb-4">
            Treatment paths
          </p>
          <h2
            className="font-display font-bold text-text-primary mb-12"
            style={{
              fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Three routes most solo mums take
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TREATMENT_PATHS.map((path) => (
              <div
                key={path.title}
                className="bg-bg-primary border border-border-secondary rounded-2xl p-6 hover:border-border-brand transition-colors"
              >
                <h3
                  className="font-display font-bold text-text-primary mb-3"
                  style={{ letterSpacing: "-0.02em", fontSize: "1.125rem" }}
                >
                  {path.title}
                </h3>
                <p className="text-sm font-sans text-text-secondary leading-relaxed mb-5">
                  {path.summary}
                </p>
                <ul className="space-y-2.5">
                  {path.facts.map((fact) => (
                    <li key={fact} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-text-brand-secondary mt-0.5 shrink-0" />
                      <span className="text-sm font-sans text-text-secondary">
                        {fact}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey stages */}
      <section className="bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary font-sans mb-4">
            The journey
          </p>
          <h2
            className="font-display font-bold text-text-primary mb-12"
            style={{
              fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Six stages, covered honestly
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {JOURNEY_STAGES.map((stage) => (
              <div key={stage.number} className="flex gap-6">
                <span
                  className="font-display font-bold text-text-brand-secondary shrink-0"
                  style={{
                    fontSize: "clamp(1.5rem, 2vw, 2rem)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {stage.number}
                </span>
                <div>
                  <h3
                    className="font-display font-bold text-text-primary mb-1.5"
                    style={{ letterSpacing: "-0.02em", fontSize: "1.0625rem" }}
                  >
                    {stage.title}
                  </h3>
                  <p className="text-sm font-sans text-text-secondary leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-bg-primary border-y border-border-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {STATS.map((stat) => (
              <div key={stat.value}>
                <p
                  className="font-display font-bold text-text-brand-secondary mb-3"
                  style={{
                    fontSize: "clamp(2.5rem, 4vw, 4rem)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </p>
                <p className="text-sm font-sans text-text-secondary leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary font-sans mb-12">
            From our community
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="bg-bg-primary border border-border-secondary rounded-2xl p-6 md:p-8"
              >
                <blockquote className="font-sans text-text-primary leading-relaxed mb-6 text-[1.0625rem]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption>
                  <p className="font-sans font-medium text-text-primary text-sm">
                    {t.name} &middot; {t.location}
                  </p>
                  <p className="font-sans text-text-tertiary text-sm mt-0.5">
                    {t.stage}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Related links strip */}
      <section className="bg-bg-primary border-y border-border-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {RELATED_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group flex flex-col gap-1"
              >
                <span className="inline-flex items-center gap-1.5 font-display font-bold text-text-primary group-hover:text-text-brand-secondary transition-colors"
                  style={{ letterSpacing: "-0.02em", fontSize: "1.0625rem" }}
                >
                  {link.label}
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </span>
                <p className="text-sm font-sans text-text-secondary leading-snug">
                  {link.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />
      <CTASection />
    </main>
  );
}
