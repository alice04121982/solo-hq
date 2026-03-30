import { HeroSection } from "@/components/hero-section";
import { CostCalculator } from "@/components/cost-calculator";
import { JourneyMap } from "@/components/journey-map";
import { ClinicComparison } from "@/components/clinic-comparison";
import { BentoCard } from "@/components/bento-card";
import { StatCard } from "@/components/stat-card";
import { CTASection } from "@/components/cta-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ClinicFinder } from "@/components/ivf-finder/clinic-finder";
import {
  Users,
  TrendingUp,
  Building2,
  ShieldCheck,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <HeroSection />

      {/* IVF Clinic Finder */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-0">
        <ClinicFinder />
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            value="54%"
            label="of IVF clinic patients are single women — you're not the exception, you're the norm"
            icon={<Users className="h-6 w-6" />}
            highlight
          />
          <StatCard
            value="£20k+"
            label="The real cost of a solo IVF journey once you add donor sperm, shipping, and counselling"
            icon={<TrendingUp className="h-6 w-6" />}
          />
          <StatCard
            value="70+"
            label="HFEA-licensed clinics in the UK — but their solo-friendliness varies wildly"
            icon={<Building2 className="h-6 w-6" />}
          />
          <StatCard
            value="100%"
            label="of the guidance here is built by solo mums who've actually done this"
            icon={<ShieldCheck className="h-6 w-6" />}
          />
        </div>
      </section>

      {/* Solo Navigator — full-width, two-column */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12" id="journey">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Journey Map — takes 1 col on mobile, 1 col on desktop (scrollable) */}
          <div className="lg:col-span-1">
            <BentoCard delay={0.1}>
              <JourneyMap />
            </BentoCard>
          </div>

          {/* Cost Calculator + Clinic Comparison stacked */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <BentoCard delay={0.15}>
              <CostCalculator />
            </BentoCard>
            <BentoCard delay={0.2}>
              <ClinicComparison />
            </BentoCard>
          </div>
        </div>
      </section>

      {/* Testimonials + Journey Stories */}
      <TestimonialsSection />

      {/* CTA Footer */}
      <CTASection />
    </main>
  );
}
