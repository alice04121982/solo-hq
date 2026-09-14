import type { Metadata } from "next";
import { InnerNav } from "@/components/inner-nav";
import { NewsletterSection } from "@/components/newsletter-section";
import { CTASection } from "@/components/cta-section";
import { buttonVariants } from "@/components/ui";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Mum & Dad families using donor conception | KLEO Fertility",
  description:
    "Couples using donor sperm, donor eggs, double donor, or embryo donation. Honest guidance for every reason.",
};

const treatmentPaths = [
  {
    title: "Donor sperm",
    body: "Used when male factor infertility makes conception with a partner's sperm unlikely or impossible, or after unsuccessful IUI/IVF cycles.",
    facts: [
      "Most common use of donor conception",
      "Anonymous or identity-release donors",
      "IUI or IVF depending on female partner's fertility",
    ],
  },
  {
    title: "Donor eggs",
    body: "Used when the female partner's egg reserve is low, egg quality is poor, or IVF with own eggs has failed repeatedly.",
    facts: [
      "Higher success rates than own-egg IVF in many cases",
      "Donor eggs from UK or abroad",
      "Identity-release donors available",
    ],
  },
  {
    title: "Double donor",
    body: "Both donor sperm and donor eggs are used. Often the route for older couples, those with genetic conditions, or after multiple failed cycles.",
    facts: [
      "No genetic link to either parent",
      "Embryo created specifically for you",
      "Legal parentage is automatic",
    ],
  },
  {
    title: "Embryo donation",
    body: "A pre-created embryo, donated by another family, is transferred to the female partner. Often called 'embryo adoption'.",
    facts: [
      "Lowest cost donor route",
      "Child conceived from another couple's embryo",
      "Identity-release embryo donors available in UK",
    ],
  },
];

const journeyStages = [
  {
    number: "01",
    title: "Getting a diagnosis",
    body: "Understanding why (sperm issues, egg reserve, genetic factors) shapes which route fits best.",
  },
  {
    number: "02",
    title: "Emotional processing",
    body: "Donor conception involves a shift in how you imagined parenthood. That grief is real and valid.",
  },
  {
    number: "03",
    title: "Choosing a donor",
    body: "Profile matching, open donation, known donors. There's no single right way.",
  },
  {
    number: "04",
    title: "Legal and consent",
    body: "Both partners sign consent forms. The law protects your parental rights automatically.",
  },
  {
    number: "05",
    title: "Treatment",
    body: "IUI, IVF, or FET (frozen embryo transfer) depending on your route.",
  },
  {
    number: "06",
    title: "Telling your child",
    body: "Most families now tell their children about donor conception early. The research strongly supports this.",
  },
];

const stats = [
  {
    value: "1 in 6",
    label: "couples in the UK experience infertility (NHS)",
  },
  {
    value: "50,000+",
    label: "children born through donor conception in the UK since 1991",
  },
  {
    value: "55%",
    label: "live birth rate per cycle using donor eggs for under-35 recipients",
  },
  {
    value: "18",
    label:
      "maximum families a UK sperm donor can help create (HFEA limit)",
  },
];

const testimonials = [
  {
    quote:
      "We tried four rounds of IVF with my own eggs before our consultant suggested donor eggs. The day we got our positive test was the best day of our lives. Biology mattered less than I thought it would.",
    name: "Emma & Dan · Cambridge",
    stage: "Mum to Lily, 8 months · donor eggs",
  },
  {
    quote:
      "The hardest conversation was the one we had with each other, not with the clinic. Once we agreed donor sperm was right for us, everything else followed.",
    name: "Natalie & Rob · London",
    stage: "Parents to twins Oliver and Sam, 18 months · donor IVF",
  },
];

const relatedLinks = [
  {
    title: "Donor Conception",
    href: "/donor-conception",
    description: "Everything about donors: sperm, eggs, double donor.",
  },
  {
    title: "Find a Clinic",
    href: "/clinics",
    description: "Clinics with experience in donor conception for couples.",
  },
  {
    title: "All Family Types",
    href: "/families",
    description: "Explore all paths to parenthood.",
  },
];

export default function MumAndDadPage() {
  return (
    <main className="min-h-screen bg-bg-secondary">
      <InnerNav />

      {/* Hero */}
      <section className="bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary font-sans mb-5">
            Couples using donor conception
          </p>
          <h1
            className="font-display font-bold text-text-primary mb-6"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Mum &amp; Dad families
          </h1>
          <p
            className="font-sans text-text-secondary leading-relaxed mb-10"
            style={{ maxWidth: "52ch", fontSize: "1.125rem" }}
          >
            Donor conception is far more common than most couples expect.
            Whether you&apos;re using donor sperm, donor eggs, or both,
            you&apos;re not alone, and this isn&apos;t a lesser version of
            parenthood.
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

      {/* Treatment paths — 2-column grid on desktop */}
      <section className="bg-bg-primary border-y border-border-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary font-sans mb-5">
            Your routes
          </p>
          <h2
            className="font-display font-bold text-text-primary mb-12"
            style={{
              fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Four donor conception routes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {treatmentPaths.map((path) => (
              <div
                key={path.title}
                className="bg-bg-primary border border-border-secondary rounded-2xl p-6 hover:border-border-brand transition-colors"
              >
                <h3
                  className="font-display font-bold text-text-primary mb-3"
                  style={{ fontSize: "1.125rem", letterSpacing: "-0.01em" }}
                >
                  {path.title}
                </h3>
                <p className="font-sans text-text-secondary text-sm leading-relaxed mb-5">
                  {path.body}
                </p>
                <ul className="space-y-2">
                  {path.facts.map((fact) => (
                    <li key={fact} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-text-brand-secondary mt-0.5 shrink-0" />
                      <span className="font-sans text-text-secondary text-sm">
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
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary font-sans mb-5">
            The journey
          </p>
          <h2
            className="font-display font-bold text-text-primary mb-12"
            style={{
              fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
              letterSpacing: "-0.02em",
            }}
          >
            What the path looks like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {journeyStages.map((stage) => (
              <div key={stage.number} className="flex gap-4">
                <span
                  className="font-display font-bold text-text-brand-secondary shrink-0"
                  style={{ fontSize: "1rem", letterSpacing: "-0.02em" }}
                >
                  {stage.number}
                </span>
                <div>
                  <h3
                    className="font-display font-bold text-text-primary mb-1"
                    style={{ fontSize: "1rem", letterSpacing: "-0.01em" }}
                  >
                    {stage.title}
                  </h3>
                  <p className="font-sans text-text-secondary text-sm leading-relaxed">
                    {stage.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-bg-primary border-y border-border-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {stats.map((stat) => (
              <div key={stat.value}>
                <p
                  className="font-display font-bold text-text-brand-secondary mb-2"
                  style={{
                    fontSize: "clamp(2.5rem, 4vw, 4rem)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </p>
                <p className="font-sans text-text-tertiary text-sm leading-snug">
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
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary font-sans mb-5">
            Real experiences
          </p>
          <h2
            className="font-display font-bold text-text-primary mb-12"
            style={{
              fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
              letterSpacing: "-0.02em",
            }}
          >
            From couples using donor conception
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <blockquote
                key={t.name}
                className="bg-bg-primary border border-border-secondary rounded-2xl p-6 md:p-8"
              >
                <p className="font-sans text-text-primary leading-relaxed mb-6 text-base">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer>
                  <p className="font-sans font-medium text-text-primary text-sm">
                    {t.name}
                  </p>
                  <p className="font-sans text-text-tertiary text-sm">
                    {t.stage}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Related strip */}
      <section className="bg-bg-primary border-y border-border-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary font-sans mb-8">
            Related
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className="group flex flex-col gap-2 bg-bg-primary border border-border-secondary rounded-2xl p-6 hover:border-border-brand transition-colors"
              >
                <h3
                  className="font-display font-bold text-text-primary"
                  style={{ fontSize: "1rem", letterSpacing: "-0.01em" }}
                >
                  {link.title}
                </h3>
                <p className="font-sans text-text-secondary text-sm leading-relaxed flex-1">
                  {link.description}
                </p>
                <span className="inline-flex items-center gap-1 text-text-brand-secondary text-sm font-medium font-sans mt-2">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </span>
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
