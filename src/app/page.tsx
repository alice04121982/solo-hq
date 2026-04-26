import { HeroSection } from "@/components/hero-section";
import { CostCalculator } from "@/components/cost-calculator";
import { JourneyMap } from "@/components/journey-map";
import { ClinicComparison } from "@/components/clinic-comparison";
import { BentoCard } from "@/components/bento-card";
import { StatCard } from "@/components/stat-card";
import { CTASection } from "@/components/cta-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ClinicFinder } from "@/components/ivf-finder/clinic-finder";
import { Users, TrendingUp, Building2, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <HeroSection />

      {/* Clinic Finder */}
      <section className="bg-background-alt border-y border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12">
          <ClinicFinder />
        </div>
      </section>

      {/* Stats — flat, no cards, separated by border-top */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-3 font-sans">
          25 years of growth — HFEA data
        </p>
        <p className="font-serif font-normal text-foreground mb-10" style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)", lineHeight: 1.2, maxWidth: "38ch" }}>
          Solo treatment has grown{" "}
          <em style={{ fontStyle: "italic", color: "var(--accent)" }}>24-fold</em>{" "}
          since 1997. Here&apos;s what the numbers actually say.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
          <StatCard value="×24" label="increase in single women seeking fertility treatment since 1997 — from ~200 to 4,800 per year (HFEA)" delay={0} />
          <StatCard value="4,800" label="single women began treatment in the UK in 2022. In 2015 it was 1,600. In 2012, just 1,400." delay={0.08} />
          <StatCard value="89%" label="of social egg freezing cycles in the UK are by single women — we are the majority here" delay={0.16} />
          <StatCard value="40%" label="live birth rate per cycle for single women aged 18–34 — higher than the 35% average for couples" delay={0.24} />
        </div>
      </section>

      {/* Tools — Solo Navigator + Calculator + Comparison */}
      <section className="bg-background-alt border-y border-border" id="journey">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-3 font-sans">
            Tools & guidance
          </p>
          <h2 className="font-serif font-normal text-foreground mb-12" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1 }}>
            Everything you need to plan
            <em style={{ fontStyle: "italic", color: "var(--accent)" }}> with confidence.</em>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <BentoCard delay={0.05}>
                <JourneyMap />
              </BentoCard>
            </div>
            <div className="lg:col-span-2 flex flex-col gap-6">
              <BentoCard delay={0.1}>
                <CostCalculator />
              </BentoCard>
              <BentoCard delay={0.15}>
                <ClinicComparison />
              </BentoCard>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA + Footer */}
      <CTASection />
    </main>
  );
}
