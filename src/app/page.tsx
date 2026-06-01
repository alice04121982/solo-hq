import { HeroSection } from "@/components/hero-section";
import { ForEveryoneSection } from "@/components/for-everyone-section";
import { NewsletterSection } from "@/components/newsletter-section";
import { MembersSection } from "@/components/members-section";
import { CostCalculator } from "@/components/cost-calculator";
import { BentoCard } from "@/components/bento-card";
import { StatCard } from "@/components/stat-card";
import { CTASection } from "@/components/cta-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-secondary">
      {/* Hero */}
      <HeroSection />

      {/* For everyone — dark green brand statement */}
      <ForEveryoneSection />

      {/* Newsletter signup */}
      <NewsletterSection />

      {/* Member stories */}
      <MembersSection />

      {/* Clinic Finder teaser */}
      <section className="bg-bg-secondary border-y border-border-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-tertiary mb-2 font-sans">
              UK &amp; international clinics
            </p>
            <p className="font-serif font-semibold text-text-primary" style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)" }}>
              Compare success rates and pricing — UK and abroad, side by side.
            </p>
          </div>
          <a
            href="/clinics"
            className={buttonVariants({ variant: "primary", size: "md" })}
          >
            Find a clinic
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      {/* Stats — flat, no cards, separated by border-top */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-tertiary mb-3 font-sans">
          25 years of growth — HFEA data
        </p>
        <p className="font-serif font-semibold text-text-primary mb-10" style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)", lineHeight: 1.2, maxWidth: "38ch" }}>
          Solo treatment has grown{" "}
          <em className="not-italic text-text-brand-secondary">24-fold</em>{" "}
          since 1997. Here&apos;s what the numbers actually say.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
          <StatCard value="×24" label="increase in single women seeking fertility treatment since 1997 — from ~200 to 4,800 per year (HFEA)" delay={0} />
          <StatCard value="4,800" label="single women began treatment in the UK in 2022. In 2015 it was 1,600. In 2012, just 1,400." delay={0.08} />
          <StatCard value="89%" label="of social egg freezing cycles in the UK are by single women — we are the majority here" delay={0.16} />
          <StatCard value="40%" label="live birth rate per cycle for single women aged 18–34 — higher than the 35% average for couples" delay={0.24} />
        </div>
      </section>

      {/* Solo Navigator teaser */}
      <section className="bg-bg-secondary border-y border-border-secondary" id="journey">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* Left — copy */}
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary font-sans mb-5">
                Solo Navigator
              </p>
              <h2
                className="font-serif font-semibold text-text-primary mb-4"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)", lineHeight: 1.1 }}
              >
                Where are you on{" "}
                <em className="not-italic text-text-brand-secondary">
                  your journey?
                </em>
              </h2>
              <p className="text-md font-sans text-text-secondary leading-relaxed mb-8" style={{ maxWidth: "44ch" }}>
                From &ldquo;am I really doing this?&rdquo; to thriving as a solo
                family. Seven stages of honest guidance, real tools, and a
                community who gets it.
              </p>
              <a
                href="/solo-navigator"
                className={buttonVariants({ variant: "primary", size: "md" })}
              >
                Explore the journey
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Right — stage list */}
            <div className="flex flex-col gap-0">
              {[
                "Considering",
                "Choosing a donor",
                "Preparing for treatment",
                "In treatment",
                "Pregnancy",
                "Birth & newborn",
                "Thriving as a solo family",
              ].map((stage, i) => (
                <div
                  key={stage}
                  className="flex items-center gap-4 py-3.5 border-b border-border-secondary last:border-b-0"
                >
                  <span
                    className="shrink-0 font-serif text-sm leading-none select-none tabular-nums text-text-quaternary"
                    style={{ width: "1.75rem" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-sans text-text-primary font-medium">
                    {stage}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Planning Tools — Cost Calculator */}
      <section className="bg-bg-primary border-b border-border-secondary" id="tools">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-tertiary mb-3 font-sans">
            Get Started
          </p>
          <h2 className="font-serif font-semibold text-text-primary mb-10" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1 }}>
            Let&apos;s help you get started on the process
          </h2>
          <BentoCard delay={0.05}>
            <CostCalculator />
          </BentoCard>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA + Footer */}
      <CTASection />
    </main>
  );
}
