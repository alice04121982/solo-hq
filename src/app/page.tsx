import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { CTASection } from "@/components/cta-section";
import { FAMILY_TYPES } from "@/lib/family-types";
import { FEATURED_STORIES } from "@/lib/stories";

const CARD_THEMES = [
  { bg: "#C5E600", text: "#1A0810", muted: "#3d5200", badge: "#1A0810", badgeText: "#C5E600" },  // lime
  { bg: "#D43878", text: "#fff",    muted: "#f9c6da", badge: "#fff",    badgeText: "#D43878" },  // pink
  { bg: "#3D0D1B", text: "#fff",    muted: "#c4a0ae", badge: "#C5E600", badgeText: "#1A0810" },  // burgundy
  { bg: "#C5E600", text: "#1A0810", muted: "#3d5200", badge: "#1A0810", badgeText: "#C5E600" },  // lime
  { bg: "#D43878", text: "#fff",    muted: "#f9c6da", badge: "#fff",    badgeText: "#D43878" },  // pink
];

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
                className="font-sans font-medium text-foreground"
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
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth md:grid md:grid-cols-3 lg:grid-cols-5 md:overflow-visible md:pb-0"
            style={{ scrollbarWidth: "none" }}
          >
            {FAMILY_TYPES.map((family, i) => {
              const theme = CARD_THEMES[i % CARD_THEMES.length];
              return (
                <a
                  key={family.slug}
                  href={`/families/${family.slug}`}
                  className="group flex-none w-[80vw] sm:w-[56vw] md:w-auto snap-start flex flex-col gap-4 rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
                  style={{ background: theme.bg, color: theme.text }}
                >
                  <span
                    className="self-start text-[9px] font-[700] uppercase tracking-[0.14em] font-sans rounded-full px-2.5 py-1"
                    style={{ background: theme.badge, color: theme.badgeText }}
                  >
                    {family.treatmentHighlight}
                  </span>
                  <h3
                    className="font-sans font-medium text-lg leading-snug"
                    style={{ color: theme.text }}
                  >
                    {family.label}
                  </h3>
                  <p className="text-sm font-sans leading-relaxed flex-1" style={{ color: theme.muted, maxWidth: "28ch" }}>
                    {family.cardSummary}
                  </p>
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-[600] font-sans mt-auto"
                    style={{ color: theme.muted }}
                  >
                    Read the guide <ArrowRight className="h-3 w-3" />
                  </span>
                </a>
              );
            })}
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
      <section className="border-b border-border" id="compare" style={{ background: "#3D0D1B" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[11px] font-[700] uppercase tracking-[0.18em] mb-4 font-sans" style={{ color: "#C5E600" }}>
                The comparison tool
              </p>
              <h2
                className="font-sans font-medium mb-4"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1, color: "#fff" }}
              >
                The full picture —
                <br />
                <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
                  not the brochure version.
                </em>
              </h2>
              <p className="text-sm font-sans leading-relaxed mb-4" style={{ maxWidth: "46ch", color: "#c4a0ae" }}>
                Greece might look £4,000 cheaper. Add three return flights and two hotel stays and suddenly it isn&apos;t. We factor in travel and accommodation so the comparison is honest.
              </p>
              <p className="text-sm font-sans leading-relaxed mb-8" style={{ maxWidth: "46ch", color: "#c4a0ae" }}>
                Success rates by age bracket, solo- and LGBTQ+-friendliness, HFEA-verified data flags, and all six treatment types: IVF, ICSI, IUI, donor egg, donor sperm, and double donor.
              </p>
              <a
                href="/ivf-finder"
                className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-sans font-[600] transition-colors duration-200"
                style={{ background: "#C5E600", color: "#1A0810" }}
              >
                Open comparison tool
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "400+", label: "clinics compared UK & worldwide" },
                { value: "True cost", label: "Travel & stays factored in, not just clinic fees" },
                { value: "5 brackets", label: "Success rates from under 35 to 43+" },
                { value: "6 types", label: "IVF · ICSI · IUI · Donor Egg · Sperm · Double Donor" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.07)" }}>
                  <p
                    className="font-sans font-medium mb-1"
                    style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.6rem)", color: "#C5E600" }}
                  >
                    {s.value}
                  </p>
                  <p className="text-xs font-sans leading-snug" style={{ color: "#c4a0ae" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3b — Honest intel callouts */}
      <section className="border-b border-border bg-background-alt" id="know-before">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <p className="text-[11px] font-[700] uppercase tracking-[0.18em] text-muted mb-4 font-sans">
            What clinics don&apos;t always tell you
          </p>
          <h2
            className="font-sans font-medium text-foreground mb-10"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1 }}
          >
            The things worth knowing<br />
            <em style={{ fontStyle: "italic", color: "var(--lavender)" }}>before you sign anything.</em>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1 */}
            <div className="rounded-2xl p-7 flex flex-col gap-4" style={{ background: "#D43878" }}>
              <span className="self-start text-[9px] font-[700] uppercase tracking-[0.14em] font-sans rounded-full px-2.5 py-1 bg-white text-pink-700">
                Success rates
              </span>
              <h3 className="font-sans font-medium text-white text-xl leading-snug">
                Success rates can be misleading
              </h3>
              <p className="text-sm font-sans leading-relaxed" style={{ color: "#f9c6da" }}>
                Clinics choose which metrics to publish. A high headline rate might cover only
                younger patients, or exclude frozen cycles. The HFEA in the UK requires
                standardised reporting — but even then, aftercare data (like whether a pregnancy
                went to full term) isn&apos;t always tracked or attributed correctly. Ask clinics
                specifically: what counts as a &ldquo;success&rdquo; in your figures?
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl p-7 flex flex-col gap-4" style={{ background: "#C5E600" }}>
              <span className="self-start text-[9px] font-[700] uppercase tracking-[0.14em] font-sans rounded-full px-2.5 py-1 bg-foreground text-accent">
                Donor sperm
              </span>
              <h3 className="font-sans font-medium text-foreground text-xl leading-snug">
                US sperm banks have no sibling cap
              </h3>
              <p className="text-sm font-sans text-foreground/70 leading-relaxed">
                In the UK, a sperm donor can father children for a maximum of 10 families.
                Many US banks have no equivalent limit — meaning your child could have
                dozens or even hundreds of donor siblings worldwide. This isn&apos;t always
                disclosed at the point of treatment. If you&apos;re using donor sperm, ask
                where the donor bank is based and what their family limits policy is.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl p-7 flex flex-col gap-4" style={{ background: "#1A0810" }}>
              <span className="self-start text-[9px] font-[700] uppercase tracking-[0.14em] font-sans rounded-full px-2.5 py-1" style={{ background: "#C5E600", color: "#1A0810" }}>
                Going abroad
              </span>
              <h3 className="font-sans font-medium text-white text-xl leading-snug">
                Cheaper abroad? Run the full numbers
              </h3>
              <p className="text-sm font-sans leading-relaxed" style={{ color: "#c4a0ae" }}>
                The clinic fee in Athens might be £3,000 less than London.
                But factor in two or three return flights, hotel stays per cycle,
                time off work, and follow-up care back home — and the gap closes fast,
                sometimes reverses. Our tool lets you build the real total so the
                comparison is genuinely fair.
              </p>
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
                className="font-sans font-medium text-foreground"
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
                  <h3 className="font-sans font-medium text-foreground text-xl leading-snug">
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
