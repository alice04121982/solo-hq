import type { Metadata } from "next";
import { InnerNav } from "@/components/inner-nav";
import { NewsletterSection } from "@/components/newsletter-section";
import { CTASection } from "@/components/cta-section";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { buttonVariants } from "@/components/ui";

export const metadata: Metadata = {
  title: "Two mum families | KLEO Fertility",
  description:
    "Whether you're exploring reciprocal IVF, sperm donation, or navigating clinic protocols as a couple, you'll find real guidance for same-sex female families at every stage.",
};

const TREATMENT_PATHS = [
  {
    title: "Reciprocal IVF",
    summary:
      "One partner provides the eggs, the other carries the pregnancy. Both of you are biologically involved in the process.",
    facts: [
      "Cost £6,000–£10,000 per cycle",
      "Both partners involved",
      "Requires a sperm donor",
    ],
  },
  {
    title: "IVF with donor sperm",
    summary:
      "Either or both of you can undergo IVF using donor sperm. Often chosen when reciprocal IVF isn't possible or preferred.",
    facts: [
      "Cost £4,000–£7,000 per cycle",
      "40% success rate for under-35s",
      "Flexible on who carries",
    ],
  },
  {
    title: "IUI with donor sperm",
    summary:
      "A lower-intensity starting option. One or both partners can try IUI before moving to IVF if needed.",
    facts: [
      "Cost £800–£1,500 per cycle",
      "Less invasive",
      "Good first step for under-38s",
    ],
  },
];

const JOURNEY_STAGES = [
  {
    number: "01",
    title: "Deciding who does what",
    description:
      "Reciprocal IVF, one-partner IVF, or trying both? There's no single right answer.",
  },
  {
    number: "02",
    title: "Choosing a sperm donor",
    description:
      "Identity-release, open, or known donor. Genetic matching, CMV status, and more.",
  },
  {
    number: "03",
    title: "Legal groundwork",
    description:
      "The non-carrying partner needs to be named on the birth certificate. Your clinic will guide you through consent forms.",
  },
  {
    number: "04",
    title: "Fertility testing",
    description:
      "Both partners tested if you're considering reciprocal IVF.",
  },
  {
    number: "05",
    title: "Treatment cycles",
    description: "Egg retrieval, fertilisation, and embryo transfer.",
  },
  {
    number: "06",
    title: "Pregnancy and co-parenting",
    description:
      "Two mums, one journey. The hard parts are real, and so is the joy.",
  },
];

const STATS = [
  {
    value: "1 in 50",
    label: "IVF births in the UK are now to same-sex female couples",
  },
  {
    value: "89%",
    label:
      "of social egg freezing cycles in the UK are by single women or same-sex couples",
  },
  {
    value: "40%",
    label: "live birth rate for under-35s using IVF with donor sperm",
  },
  {
    value: "2 donors",
    label: "maximum allowed per family in the UK under HFEA rules",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Reciprocal IVF meant we were both part of the process. The decision of who provides eggs and who carries took us months, but once we made it, everything felt clearer.",
    name: "Priya & Meena",
    location: "London",
    stage: "Pregnant at 34 weeks · reciprocal IVF",
  },
  {
    quote:
      "Our clinic had never done reciprocal IVF before we asked. KLEO helped us find one that had. That research took days with the clinic finder, not months of cold-calling.",
    name: "Sophie, 37",
    location: "Manchester",
    stage: "Mum to twins Isla and Rosa · donor IVF",
  },
];

const RELATED_LINKS = [
  {
    label: "Donor Conception",
    href: "/donor-conception",
    description:
      "Choosing a sperm donor: what to look for and what the research says.",
  },
  {
    label: "Find a Clinic",
    href: "/clinics",
    description:
      "Not all clinics offer reciprocal IVF. Compare those that do.",
  },
  {
    label: "All Family Types",
    href: "/families",
    description: "Explore guidance for every path to parenthood.",
  },
];

export default function TwoMumPage() {
  return (
    <main className="min-h-screen bg-bg-secondary">
      <InnerNav />

      {/* Hero */}
      <section className="bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary font-sans mb-5">
            Same-sex female families
          </p>
          <h1
            className="font-display font-bold text-text-primary mb-6"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Two mum families
          </h1>
          <p
            className="text-md font-sans text-text-secondary leading-relaxed mb-10"
            style={{ maxWidth: "52ch" }}
          >
            Whether you&apos;re exploring reciprocal IVF, sperm donation, or
            navigating clinic protocols as a couple, you&apos;ll find real guidance for
            same-sex female families at every stage.
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
            Three routes two mum families take
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
            Six stages, from first decision to family
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
                    fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
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
                <span
                  className="inline-flex items-center gap-1.5 font-display font-bold text-text-primary group-hover:text-text-brand-secondary transition-colors"
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
