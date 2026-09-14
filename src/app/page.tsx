import { HeroSection }       from "@/components/hero-section";
import { ForEveryoneSection } from "@/components/for-everyone-section";
import { MembersSection }     from "@/components/members-section";
import { NewsletterSection }  from "@/components/newsletter-section";
import { StatCard }           from "@/components/stat-card";
import { FAQSection }         from "@/components/faq-section";
import { CTASection }         from "@/components/cta-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── For Everyone — dark brand statement ───────────────────── */}
      <ForEveryoneSection />

      {/* ── Member portraits on light-purple tint ─────────────────── */}
      <MembersSection />

      {/* ── Newsletter CTA — full brand-solid purple ───────────────── */}
      <NewsletterSection />

      {/* ── HFEA stats ────────────────────────────────────────────── */}
      <section className="bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-tertiary mb-3 font-sans">
            25 years of growth: HFEA data
          </p>
          <p
            className="font-display font-bold text-text-primary mb-10"
            style={{
              fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              maxWidth: "38ch",
            }}
          >
            Solo treatment has grown{" "}
            <em className="not-italic text-text-brand-secondary">24-fold</em>{" "}
            since 1997. Here&apos;s what the numbers actually say.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
            <StatCard
              value="×24"
              label="increase in single women seeking fertility treatment since 1997, from ~200 to 4,800 per year (HFEA)"
              delay={0}
            />
            <StatCard
              value="4,800"
              label="single women began treatment in the UK in 2022. In 2015 it was 1,600. In 2012, just 1,400."
              delay={0.08}
            />
            <StatCard
              value="89%"
              label="of social egg freezing cycles in the UK are by single women: we are the majority here"
              delay={0.16}
            />
            <StatCard
              value="40%"
              label="live birth rate per cycle for single women aged 18–34, higher than the 35% average for couples"
              delay={0.24}
            />
          </div>
        </div>
      </section>

      {/* ── Journey accordion ─────────────────────────────────────── */}
      <FAQSection />

      {/* ── Footer ────────────────────────────────────────────────── */}
      <CTASection />

    </main>
  );
}
