import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { CTASection } from "@/components/cta-section";
import { FAMILY_TYPES } from "@/lib/family-types";
import { FEATURED_STORIES } from "@/lib/stories";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* 1 — Hero with location search */}
      <HeroSection />

      {/* 2 — Families carousel */}
      <section className="border-b border-border" id="families">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-3 font-sans">
                Every family
              </p>
              <h2
                className="font-serif font-normal text-foreground"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1 }}
              >
                Find your guide.
              </h2>
            </div>
            <a
              href="/families"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-sans text-muted hover:text-foreground transition-colors duration-150 shrink-0"
            >
              All family types <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Carousel — scroll-snap on mobile, grid on desktop */}
          <div
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth md:grid md:grid-cols-3 lg:grid-cols-5 md:overflow-visible md:pb-0"
            style={{ scrollbarWidth: "none" }}
          >
            {FAMILY_TYPES.map((family) => (
              <a
                key={family.slug}
                href={`/families/${family.slug}`}
                className="group flex-none w-[80vw] sm:w-[56vw] md:w-auto snap-start flex flex-col gap-4 rounded-xl border border-border p-6 bg-background hover:bg-background-alt hover:border-foreground/20 transition-colors duration-150"
              >
                <p className="text-[10px] font-[500] uppercase tracking-[0.12em] text-accent font-sans">
                  {family.treatmentHighlight}
                </p>
                <h3 className="font-serif font-normal text-foreground text-lg leading-snug group-hover:text-accent transition-colors duration-150">
                  {family.label}
                </h3>
                <p className="text-sm font-sans text-muted leading-relaxed flex-1" style={{ maxWidth: "28ch" }}>
                  {family.cardSummary}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-sans text-muted group-hover:text-foreground transition-colors duration-150 mt-auto">
                  Read the guide <ArrowRight className="h-3 w-3" />
                </span>
              </a>
            ))}
          </div>

          <a
            href="/families"
            className="sm:hidden inline-flex items-center gap-2 text-sm font-sans text-muted hover:text-foreground transition-colors duration-150 mt-6"
          >
            All family types <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      {/* 3 — Clinic finder teaser */}
      <section className="bg-background-alt border-b border-border" id="compare">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
                The comparison tool
              </p>
              <h2
                className="font-serif font-normal text-foreground mb-4"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1 }}
              >
                UK clinics vs abroad —
                <br />
                <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
                  on what actually matters.
                </em>
              </h2>
              <p className="text-sm font-sans text-muted leading-relaxed mb-8" style={{ maxWidth: "46ch" }}>
                Success rates by age bracket, treatment types, solo- and LGBTQ+-friendliness, price transparency, and real costs — all in one place. Filter by IVF, ICSI, IUI, donor egg, donor sperm, or double donor.
              </p>
              <a
                href="/ivf-finder"
                className="inline-flex items-center gap-2 rounded-full bg-accent text-foreground px-8 py-3.5 text-sm font-sans font-medium hover:bg-accent-dark transition-colors duration-200"
              >
                Open comparison tool
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-px bg-border rounded-xl overflow-hidden">
              {[
                { value: "400+", label: "HFEA-licensed clinics" },
                { value: "UK & abroad", label: "Spain, Czech Republic, Greece & more" },
                { value: "5 brackets", label: "Success rates from under 35 to 43+" },
                { value: "6 types", label: "IVF · ICSI · IUI · Donor Egg · Donor Sperm · Double Donor" },
              ].map((s) => (
                <div key={s.label} className="bg-background p-6">
                  <p
                    className="font-serif font-normal text-foreground mb-1"
                    style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.6rem)" }}
                  >
                    {s.value}
                  </p>
                  <p className="text-xs font-sans text-muted leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4 — Personal stories */}
      <section className="border-b border-border" id="stories">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-3 font-sans">
                Real journeys
              </p>
              <h2
                className="font-serif font-normal text-foreground"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1 }}
              >
                In their own words.
              </h2>
            </div>
            <a
              href="/stories"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-sans text-muted hover:text-foreground transition-colors duration-150 shrink-0"
            >
              See all stories <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURED_STORIES.map((story) => (
              <article key={story.id} className="flex flex-col gap-4">
                {/* Image */}
                <div className="relative h-52 rounded-xl overflow-hidden bg-background-alt">
                  <Image
                    src={story.image}
                    alt={story.imageAlt}
                    fill
                    className="object-cover"
                    style={{ filter: "saturate(0.85) sepia(0.05)" }}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-[500] uppercase tracking-[0.12em] text-accent font-sans">
                      {story.familyLabel}
                    </span>
                    <span className="text-[10px] text-border font-sans">·</span>
                    <span className="text-[10px] font-sans text-muted">{story.treatment}</span>
                  </div>
                  <h3 className="font-serif font-normal text-foreground text-xl leading-snug">
                    {story.title}
                  </h3>
                  <p className="text-sm font-sans text-muted leading-relaxed flex-1">
                    {story.excerpt}
                  </p>
                  <p className="text-[11px] font-[500] uppercase tracking-[0.12em] text-muted font-sans pt-3 border-t border-border">
                    {story.name}, {story.age} &nbsp;·&nbsp; {story.location}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <a
            href="/stories"
            className="sm:hidden inline-flex items-center gap-2 text-sm font-sans text-muted hover:text-foreground transition-colors duration-150 mt-8"
          >
            See all stories <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      {/* 5 — Newsletter + CTA */}
      <CTASection />
    </main>
  );
}
