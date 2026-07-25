import { HeroSection } from "@/components/hero-section";
import { CostCalculator } from "@/components/cost-calculator";
import { JourneyMap } from "@/components/journey-map";
import { ClinicComparison } from "@/components/clinic-comparison";
import { BentoCard } from "@/components/bento-card";
import { StatCard } from "@/components/stat-card";
import { CTASection } from "@/components/cta-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ClinicFinder } from "@/components/ivf-finder/clinic-finder";
import { FAMILY_TYPES } from "@/lib/family-types";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <HeroSection />

      {/* Comparison tool — the primary product */}
      <section className="bg-background-alt border-b border-border" id="compare">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-3 font-sans">
            The comparison tool
          </p>
          <h2
            className="font-serif font-normal text-foreground mb-4"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1 }}
          >
            UK clinics vs abroad —
            <br />
            <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
              compare on what actually matters.
            </em>
          </h2>
          <p className="text-sm font-sans text-muted mb-10" style={{ maxWidth: "55ch" }}>
            Success rates by age bracket, treatment types available, solo- and LGBTQ+-friendliness, price transparency, and real community-reported costs — all in one place.
          </p>
          <BentoCard delay={0.05} white>
            <ClinicComparison />
          </BentoCard>
        </div>
      </section>

      {/* Family Types — who is this for */}
      <section className="bg-background border-b border-border" id="families">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-3 font-sans">
            Every family
          </p>
          <h2
            className="font-serif font-normal text-foreground mb-10"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1 }}
          >
            Find your guide.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {FAMILY_TYPES.map((family, i) => (
              <a
                key={family.slug}
                href={`/families/${family.slug}`}
                className="group block border-t border-border py-8 pr-0 lg:pr-8 hover:bg-background-alt transition-colors duration-150"
              >
                <p className="text-[10px] font-[500] uppercase tracking-[0.12em] text-accent mb-3 font-sans">
                  {family.treatmentHighlight}
                </p>
                <h3 className="font-serif font-normal text-foreground text-xl leading-snug mb-2 group-hover:text-accent transition-colors duration-150">
                  {family.label}
                </h3>
                <p className="text-sm font-sans text-muted leading-relaxed mb-4" style={{ maxWidth: "34ch" }}>
                  {family.cardSummary}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-sans text-muted group-hover:text-foreground transition-colors duration-150">
                  Read the guide <ArrowRight className="h-3 w-3" />
                </span>
              </a>
            ))}
          </div>
          <div className="border-t border-border pt-8 mt-2">
            <a
              href="/families"
              className="inline-flex items-center gap-2 text-sm font-sans text-foreground border-b border-foreground/30 pb-0.5 hover:border-accent hover:text-accent transition-colors duration-150"
            >
              View all family guides <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Clinic Finder — location search */}
      <section className="bg-background-alt border-b border-border" id="find">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12">
          <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-3 font-sans">
            Find by location
          </p>
          <h2
            className="font-serif font-normal text-foreground mb-8"
            style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: 1.15 }}
          >
            Clinics near you
          </h2>
          <ClinicFinder />
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-3 font-sans">
          The numbers — HFEA data
        </p>
        <p
          className="font-serif font-normal text-foreground mb-10"
          style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)", lineHeight: 1.2, maxWidth: "38ch" }}
        >
          Fertility treatment in the UK is{" "}
          <em style={{ fontStyle: "italic", color: "var(--accent)" }}>growing fast</em>.
          {" "}Here&apos;s what the data says.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
          <StatCard value="×24" label="increase in single women seeking treatment since 1997 — from ~200 to 4,800 per year (HFEA)" delay={0} />
          <StatCard value="4,800" label="single women began treatment in the UK in 2022 — up from 1,600 in 2015" delay={0.08} />
          <StatCard value="89%" label="of social egg freezing cycles in the UK are by single women" delay={0.16} />
          <StatCard value="40%" label="live birth rate per cycle for women aged 18–34 using their own eggs" delay={0.24} />
        </div>
      </section>

      {/* Solo Navigator */}
      <section className="bg-background-alt border-y border-border" id="journey">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-3 font-sans">
            Solo Navigator
          </p>
          <h2
            className="font-serif font-normal text-foreground mb-10"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1 }}
          >
            Where are you on your journey?
          </h2>
          <BentoCard delay={0.05} white>
            <JourneyMap />
          </BentoCard>
        </div>
      </section>

      {/* Cost calculator */}
      <section className="bg-background border-b border-border" id="tools">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-3 font-sans">
            Planning tools
          </p>
          <h2
            className="font-serif font-normal text-foreground mb-10"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1 }}
          >
            Numbers you can actually use.
          </h2>
          <BentoCard delay={0.05}>
            <CostCalculator />
          </BentoCard>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA */}
      <CTASection />
    </main>
  );
}
