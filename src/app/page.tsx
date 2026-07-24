import { HeroSection } from "@/components/hero-section";
import { CostCalculator } from "@/components/cost-calculator";
import { JourneyMap } from "@/components/journey-map";
import { ClinicComparison } from "@/components/clinic-comparison";
import { BentoCard } from "@/components/bento-card";
import { StatCard } from "@/components/stat-card";
import { CTASection } from "@/components/cta-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ClinicFinder } from "@/components/ivf-finder/clinic-finder";

const DARK: React.CSSProperties = {
  "--background":     "var(--navy)",
  "--background-alt": "#F5F1E6",
  "--foreground":     "var(--warm-white)",
  "--muted":          "rgba(245,241,230,0.6)",
  "--border":         "rgba(245,241,230,0.15)",
} as React.CSSProperties;

const LIME: React.CSSProperties = {
  "--background":     "var(--lime)",
  "--background-alt": "#F5F1E6",
  "--foreground":     "var(--navy)",
  "--muted":          "rgba(61,13,27,0.6)",
  "--border":         "rgba(61,13,27,0.15)",
} as React.CSSProperties;

const PINK: React.CSSProperties = {
  "--background":     "var(--lavender)",
  "--background-alt": "#F5F1E6",
  "--foreground":     "var(--warm-white)",
  "--muted":          "rgba(245,241,230,0.6)",
  "--border":         "rgba(245,241,230,0.2)",
} as React.CSSProperties;

export default function Home() {
  return (
    <main className="min-h-screen">

      {/* ── HERO — deep maroon ── */}
      <HeroSection />

      {/* ── CLINIC FINDER — lime ── */}
      <section className="bg-lime" style={LIME}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16">
          <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-3 font-sans">
            IVF clinic finder
          </p>
          <h2
            className="font-serif font-bold text-foreground mb-10"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.05 }}
          >
            Find a clinic near you.
          </h2>
          <ClinicFinder />
        </div>
      </section>

      {/* ── STATS — hot pink ── */}
      <section className="bg-lavender" style={PINK}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-3 font-sans">
            25 years of growth — HFEA data
          </p>
          <p
            className="font-serif font-bold text-foreground mb-10"
            style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)", lineHeight: 1.2, maxWidth: "38ch" }}
          >
            Solo treatment has grown{" "}
            <em style={{ fontStyle: "italic" }}>24-fold</em>{" "}
            since 1997.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
            <StatCard value="×24" label="increase in single women seeking fertility treatment since 1997 — from ~200 to 4,800 per year (HFEA)" delay={0} />
            <StatCard value="4,800" label="single women began treatment in the UK in 2022. In 2015 it was 1,600. In 2012, just 1,400." delay={0.08} />
            <StatCard value="89%" label="of social egg freezing cycles in the UK are by single women — we are the majority here" delay={0.16} />
            <StatCard value="40%" label="live birth rate per cycle for single women aged 18–34 — higher than the 35% average for couples" delay={0.24} />
          </div>
        </div>
      </section>

      {/* ── SOLO NAVIGATOR — maroon ── */}
      <section className="bg-navy" style={DARK} id="journey">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-3 font-sans">
            Solo Navigator
          </p>
          <h2
            className="font-serif font-bold text-foreground mb-10"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.05 }}
          >
            Where are you on your journey?
          </h2>
          <BentoCard delay={0.05} white>
            <JourneyMap />
          </BentoCard>
        </div>
      </section>

      {/* ── PLANNING TOOLS — lime ── */}
      <section className="bg-lime" style={LIME} id="tools">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-3 font-sans">
            Planning tools
          </p>
          <h2
            className="font-serif font-bold text-foreground mb-10"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.05 }}
          >
            Numbers you can actually use.
          </h2>
          <div className="flex flex-col gap-6">
            <BentoCard delay={0.05} white>
              <CostCalculator />
            </BentoCard>
            <BentoCard delay={0.1} white>
              <ClinicComparison />
            </BentoCard>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS — hot pink ── */}
      <TestimonialsSection />

      {/* ── CTA + FOOTER — maroon ── */}
      <CTASection />

    </main>
  );
}
