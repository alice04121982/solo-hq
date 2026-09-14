import type { Metadata } from "next";
import { InnerNav } from "@/components/inner-nav";
import { NewsletterSection } from "@/components/newsletter-section";
import { CTASection } from "@/components/cta-section";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui";

export const metadata: Metadata = {
  title: "Families | KLEO Fertility",
  description:
    "Guidance for every path to parenthood: solo parents, same-sex families, donor conception, and more.",
};

const FAMILY_TYPES = [
  {
    label: "Solo Mum families",
    href: "/families/solo-mum",
    description:
      "Going it alone by choice. From sperm donation and IVF to pregnancy, birth, and life as a solo mum.",
  },
  {
    label: "Solo Dad families",
    href: "/families/solo-dad",
    description:
      "Single men building a family through surrogacy, adoption, or donor conception.",
  },
  {
    label: "Two mum families",
    href: "/families/two-mum",
    description:
      "Same-sex female couples: reciprocal IVF, sperm donation, and everything in between.",
  },
  {
    label: "Two dad families",
    href: "/families/two-dad",
    description:
      "Same-sex male couples navigating surrogacy, adoption, and donor conception.",
  },
  {
    label: "Mum & Dad families",
    href: "/families/mum-and-dad",
    description:
      "Couples using donor conception: egg donation, sperm donation, double donor, and embryo donation.",
  },
  {
    label: "Stories",
    href: "/families/stories",
    description:
      "Real journeys from real families. Every path, every outcome, shared honestly.",
  },
];

const STATS = [
  {
    value: "4,800",
    label: "single women began fertility treatment in the UK in 2022",
  },
  {
    value: "89%",
    label: "of social egg freezing cycles in the UK are by single women",
  },
  {
    value: "40+",
    label: "years of HFEA data tracking every family type and treatment",
  },
  {
    value: "2,400+",
    label: "KLEO members navigating their path to parenthood right now",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "I didn't know where to start. KLEO gave me a clear map: the real numbers, the honest timelines, and a community of women who'd already walked the path I was about to take.",
    name: "Harriet, 36",
    location: "Leeds",
    stage: "Solo mum to Bea, 8 months · donor IUI",
  },
  {
    quote:
      "We spent months googling and getting nowhere useful. KLEO had everything in one place (clinic comparisons, donor guidance, legal groundwork) and a community that made us feel less alone.",
    name: "Jess & Amy",
    location: "Bristol",
    stage: "Pregnant at 32 weeks · reciprocal IVF",
  },
];

export default function FamiliesPage() {
  return (
    <main className="min-h-screen bg-bg-secondary">
      <InnerNav />

      {/* Hero */}
      <section className="bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary font-sans mb-5">
            Every family type
          </p>
          <h1
            className="font-display font-bold text-text-primary mb-6"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Families
          </h1>
          <p
            className="text-md font-sans text-text-secondary leading-relaxed mb-10"
            style={{ maxWidth: "52ch" }}
          >
            Guidance for every path to parenthood: solo parents, same-sex
            families, donor conception, and more. Wherever you are in your
            journey, you&apos;ll find real information and real community here.
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
              href="/donor-conception"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              Donor conception
            </a>
          </div>
        </div>
      </section>

      {/* Family type cards */}
      <section className="bg-bg-primary border-y border-border-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FAMILY_TYPES.map((card) => (
              <a
                key={card.href}
                href={card.href}
                className="rounded-2xl bg-bg-primary border border-border-secondary p-6 hover:border-border-brand transition-colors group"
              >
                <p
                  className="font-display font-bold text-text-primary mb-2 group-hover:text-text-brand-secondary transition-colors"
                  style={{ letterSpacing: "-0.02em", fontSize: "1.125rem" }}
                >
                  {card.label}
                </p>
                <p className="text-sm font-sans text-text-secondary leading-relaxed mb-4">
                  {card.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-sans text-text-brand-secondary font-medium">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary font-sans mb-14">
            By the numbers
          </p>
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
      <section className="bg-bg-primary border-y border-border-secondary">
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

      <NewsletterSection />
      <CTASection />
    </main>
  );
}
