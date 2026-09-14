import type { Metadata } from "next";
import { InnerNav } from "@/components/inner-nav";
import { NewsletterSection } from "@/components/newsletter-section";
import { CTASection } from "@/components/cta-section";
import { buttonVariants } from "@/components/ui";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Solo Dad families | KLEO Fertility",
  description:
    "Building a family as a single man: surrogacy, adoption, and donor conception. Real guidance for solo dads at every stage.",
};

const treatmentPaths = [
  {
    title: "Gestational surrogacy",
    body: "The most common route for solo dads. Your sperm fertilises a donor egg, and a surrogate carries the pregnancy. The child is genetically yours.",
    facts: [
      "Cost £40,000–£100,000 all-in",
      "UK surrogacy is non-commercial",
      "Surrogate must be found through an agency or known contact",
    ],
  },
  {
    title: "Traditional surrogacy",
    body: "The surrogate uses her own eggs, inseminated with your sperm. Less common today due to legal complexity.",
    facts: [
      "Surrogate is the biological mother",
      "Legal parentage transfer required",
      "Rarely used for solo dads in the UK",
    ],
  },
  {
    title: "Adoption",
    body: "Giving an existing child a permanent home. Solo men can adopt in the UK. The process is thorough but many have done it successfully.",
    facts: [
      "No age limit for adopters",
      "Process takes 12–24 months",
      "Adoption support available post-placement",
    ],
  },
];

const journeyStages = [
  {
    number: "01",
    title: "Understanding your options",
    body: "Surrogacy, adoption, or donor conception: each path has very different timelines, costs, and emotional realities.",
  },
  {
    number: "02",
    title: "Choosing an agency",
    body: "For surrogacy, a reputable agency or Surrogacy UK connects you with surrogates and handles initial matching.",
  },
  {
    number: "03",
    title: "Medical and legal setup",
    body: "Sperm testing, donor egg selection if using surrogacy, and legal advice on UK parental orders.",
  },
  {
    number: "04",
    title: "Finding a surrogate",
    body: "In the UK, surrogates cannot advertise. Agencies and networks are the main route.",
  },
  {
    number: "05",
    title: "Treatment and pregnancy",
    body: "Egg retrieval from donor, fertilisation with your sperm, embryo transfer to surrogate.",
  },
  {
    number: "06",
    title: "Parental order",
    body: "After birth, you apply for a parental order to be recognised as the legal parent. This takes 6–12 months.",
  },
];

const stats = [
  {
    value: "£40k+",
    label:
      "estimated minimum cost for gestational surrogacy in the UK, including legal, medical, and surrogate expenses",
  },
  {
    value: "12–24",
    label: "months typical timeline for adoption in the UK for solo applicants",
  },
  {
    value: "1 in 10",
    label:
      "UK surrogacy arrangements are for single intended parents (COTS data)",
  },
  {
    value: "100%",
    label:
      "of parental order applications succeeding where criteria are met (UK family court data)",
  },
];

const testimonials = [
  {
    quote:
      "I didn't know where to start. The surrogacy section here was the first thing that gave me a clear timeline and cost breakdown: not a brochure, a real picture of what I was signing up for.",
    name: "Marcus, 41 · London",
    stage: "Dad to Eli, 18 months · gestational surrogacy",
  },
  {
    quote:
      "Adoption felt like giving up at first. It wasn't. It was the right choice for me. I found other solo dads here who'd been through it.",
    name: "David, 38 · Bristol",
    stage: "Dad to Kofi, 3 · adoption",
  },
];

const relatedLinks = [
  {
    title: "Find an Agency",
    href: "/clinics",
    description:
      "Surrogacy agencies and fertility clinics that work with solo dads.",
  },
  {
    title: "Donor Conception",
    href: "/donor-conception",
    description: "Understanding donor eggs for gestational surrogacy.",
  },
  {
    title: "All Family Types",
    href: "/families",
    description: "Explore guidance for every path to parenthood.",
  },
];

export default function SoloDadPage() {
  return (
    <main className="min-h-screen bg-bg-secondary">
      <InnerNav />

      {/* Hero */}
      <section className="bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary font-sans mb-5">
            Single men building families
          </p>
          <h1
            className="font-display font-bold text-text-primary mb-6"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Solo Dad families
          </h1>
          <p
            className="font-sans text-text-secondary leading-relaxed mb-10"
            style={{ maxWidth: "52ch", fontSize: "1.125rem" }}
          >
            Building a family as a single man takes extraordinary determination.
            From surrogacy and donor conception to adoption: honest, practical
            guidance for solo dads.
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
            Three paths to becoming a solo dad
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            From solo dads
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
