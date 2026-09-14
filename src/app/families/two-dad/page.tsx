import type { Metadata } from "next";
import { InnerNav } from "@/components/inner-nav";
import { NewsletterSection } from "@/components/newsletter-section";
import { CTASection } from "@/components/cta-section";
import { buttonVariants } from "@/components/ui";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Two dad families | KLEO Fertility",
  description:
    "Same-sex male couples building families through surrogacy, donor eggs, and adoption. Real guidance at every stage.",
};

const treatmentPaths = [
  {
    title: "Gestational surrogacy (UK)",
    body: "One or both of you can contribute sperm. A donor egg is fertilised and carried by a surrogate. The child can be genetically related to one dad.",
    facts: [
      "Non-commercial in the UK",
      "Cost £50,000–£120,000 all-in",
      "Surrogate found via agency or known contact",
    ],
  },
  {
    title: "International surrogacy",
    body: "Countries including USA, Canada, and Georgia offer legal surrogacy pathways for same-sex couples. More established legal framework, higher cost.",
    facts: [
      "Cost £80,000–£150,000",
      "Legal parentage established abroad",
      "UK parental order still required on return",
    ],
  },
  {
    title: "Adoption",
    body: "Same-sex couples have the same adoption rights as opposite-sex couples in the UK. Many two-dad families have adopted successfully.",
    facts: [
      "No discrimination in UK adoption law",
      "Process 12–24 months",
      "Joint adoption available",
    ],
  },
];

const journeyStages = [
  {
    number: "01",
    title: "Deciding the route",
    body: "UK surrogacy, international surrogacy, or adoption: each has a very different cost, timeline, and legal path.",
  },
  {
    number: "02",
    title: "Choosing who contributes sperm",
    body: "You can both create embryos and choose which to transfer, or mix and decide at transfer stage.",
  },
  {
    number: "03",
    title: "Donor egg selection",
    body: "Profile-based matching through your clinic or an egg bank. CMV status, identity release, and genetic screening.",
  },
  {
    number: "04",
    title: "Finding a surrogate",
    body: "UK: agency or known surrogate. International: specialist agency with legal support.",
  },
  {
    number: "05",
    title: "Pregnancy",
    body: "Your surrogate's pregnancy is your pregnancy too, so stay involved in appointments and communication.",
  },
  {
    number: "06",
    title: "Legal parentage",
    body: "In the UK, your surrogate is the legal mother at birth. A parental order transfers legal parenthood to you both.",
  },
];

const stats = [
  {
    value: "3×",
    label:
      "increase in same-sex male parental applications for surrogacy in the last five years (UK data)",
  },
  {
    value: "£120k",
    label:
      "average total cost for international gestational surrogacy for two dads",
  },
  {
    value: "99%+",
    label:
      "parental order success rate in UK courts where eligibility criteria are met",
  },
  {
    value: "8,000+",
    label: "children born to same-sex male parents in the UK (ONS 2022)",
  },
];

const testimonials = [
  {
    quote:
      "We spent six months researching before making any decision. The comparison between UK and US surrogacy here saved us from a very expensive mistake.",
    name: "James & Tom · Edinburgh",
    stage: "Dads to Maya, 2 · US gestational surrogacy",
  },
  {
    quote:
      "Adoption wasn't our first thought. But the stories from other two-dad families who'd been through it made us look differently at what 'our path' meant.",
    name: "Ben & Kev · London",
    stage: "Dads to two brothers, 4 and 6 · UK adoption",
  },
];

const relatedLinks = [
  {
    title: "Donor Conception",
    href: "/donor-conception",
    description: "Egg donation and donor selection explained.",
  },
  {
    title: "Find a Clinic",
    href: "/clinics",
    description: "Clinics with experience supporting two-dad families.",
  },
  {
    title: "All Family Types",
    href: "/families",
    description: "Explore guidance for every path.",
  },
];

export default function TwoDadPage() {
  return (
    <main className="min-h-screen bg-bg-secondary">
      <InnerNav />

      {/* Hero */}
      <section className="bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary font-sans mb-5">
            Same-sex male families
          </p>
          <h1
            className="font-display font-bold text-text-primary mb-6"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Two dad families
          </h1>
          <p
            className="font-sans text-text-secondary leading-relaxed mb-10"
            style={{ maxWidth: "52ch", fontSize: "1.125rem" }}
          >
            Two dads, one remarkable journey. Whether you&apos;re researching
            surrogacy in the UK or abroad, or exploring adoption, you&apos;ll find guidance for
            same-sex male couples at every stage.
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
            Three paths to two-dad parenthood
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
            From two-dad families
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
