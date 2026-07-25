import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { CTASection } from "@/components/cta-section";
import { FAMILY_TYPES } from "@/lib/family-types";
import { FEATURED_STORIES } from "@/lib/stories";

const CARD_THEMES = [
  { bg: "#C5E600", text: "#1A0810", muted: "#3d5200", badge: "#1A0810", badgeText: "#C5E600" },
  { bg: "#D43878", text: "#fff",    muted: "#f9c6da", badge: "#fff",    badgeText: "#3D0D1B" },
  { bg: "#3D0D1B", text: "#fff",    muted: "#c4a0ae", badge: "#C5E600", badgeText: "#1A0810" },
  { bg: "#C5E600", text: "#1A0810", muted: "#3d5200", badge: "#1A0810", badgeText: "#C5E600" },
  { bg: "#D43878", text: "#fff",    muted: "#f9c6da", badge: "#fff",    badgeText: "#3D0D1B" },
];

const STORY_THEMES = [
  { frame: "#C5E600", label: "#3d5200",   footer: "#3d5200" },
  { frame: "#D43878", label: "#fff",      footer: "#f9c6da" },
  { frame: "#3D0D1B", label: "#C5E600",   footer: "#c4a0ae" },
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
              <p className="text-[11px] font-[600] uppercase tracking-[0.18em] text-muted mb-3 font-sans">
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
      <section className="border-b border-border bg-background" id="compare">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
          {/* Full-width burgundy card */}
          <div className="rounded-2xl p-10 md:p-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" style={{ background: "#3D0D1B" }}>
            <div>
              <span className="inline-block text-[9px] font-[700] uppercase tracking-[0.16em] font-sans rounded-full px-3 py-1 mb-6" style={{ background: "#C5E600", color: "#1A0810" }}>
                The comparison tool
              </span>
              <h2
                className="font-sans font-medium mb-5"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1, color: "#fff" }}
              >
                The full picture —
                <br />
                <span style={{ color: "#C5E600" }}>
                  not the brochure version.
                </span>
              </h2>
              <p className="text-sm font-sans leading-relaxed mb-4" style={{ maxWidth: "46ch", color: "#c4a0ae" }}>
                Greece might look £4,000 cheaper. Add three return flights and two hotel stays and suddenly it isn&apos;t. We factor in travel and accommodation so the comparison is honest.
              </p>
              <p className="text-sm font-sans leading-relaxed mb-8" style={{ maxWidth: "46ch", color: "#c4a0ae" }}>
                Success rates by age bracket, solo- and LGBTQ+-friendliness, HFEA-verified data flags, and all six treatment types: IVF, ICSI, IUI, donor egg, donor sperm, and double donor.
              </p>
              <a
                href="/ivf-finder"
                className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-sans font-[600] transition-colors duration-200 hover:opacity-90"
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
      <section className="border-b border-border bg-background" id="know-before">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <span className="inline-block text-[9px] font-[700] uppercase tracking-[0.16em] font-sans rounded-full px-3 py-1 mb-6" style={{ background: "#D43878", color: "#fff" }}>
            What clinics don&apos;t always tell you
          </span>
          <h2
            className="font-sans font-medium text-foreground mb-10"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1 }}
          >
            The things worth knowing<br />
            before you sign anything.
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
      <section className="border-b border-border bg-background" id="stories">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[11px] font-[600] uppercase tracking-[0.18em] text-muted mb-3 font-sans">
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
              className="hidden sm:inline-flex items-center gap-2 text-sm font-sans font-[500] text-foreground rounded-full border border-foreground px-5 py-2 hover:bg-foreground hover:text-background transition-colors duration-150 shrink-0"
            >
              See all stories <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">

            {/* ── Card 1: cream bg · heading + badge top · photo below · attribution in corner ── */}
            <article className="rounded-2xl overflow-hidden flex flex-col" style={{ background: "#F2EDE4" }}>
              <div className="p-5 flex items-start justify-between gap-3">
                <h3 className="font-sans font-medium text-[#1A0810] text-xl leading-tight">
                  {FEATURED_STORIES[0].title}
                </h3>
                <span
                  className="shrink-0 rounded-full text-[10px] font-[600] font-sans px-3 py-1.5 whitespace-nowrap"
                  style={{ background: "#D43878", color: "#fff" }}
                >
                  {FEATURED_STORIES[0].familyLabel}
                </span>
              </div>
              <div className="relative mx-3 mb-3 rounded-xl overflow-hidden" style={{ height: "280px" }}>
                <Image
                  src="/photos/story-hero.jpeg"
                  alt="Solo mum story"
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute bottom-3 right-3 text-right">
                  <p className="text-xs font-sans font-[600] text-white" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
                    {FEATURED_STORIES[0].name}, {FEATURED_STORIES[0].age}
                  </p>
                  <p className="text-[11px] font-sans text-white/80" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
                    {FEATURED_STORIES[0].location}
                  </p>
                </div>
              </div>
            </article>

            {/* ── Card 2: full-bleed photo · lime diagonal block · dark text on lime ── */}
            <article className="rounded-2xl overflow-hidden relative" style={{ height: "420px" }}>
              <Image
                src={FEATURED_STORIES[1].image}
                alt={FEATURED_STORIES[1].imageAlt}
                fill
                className="object-cover"
              />
              {/* Lime diagonal overlay */}
              <div className="absolute inset-x-0 bottom-0 overflow-hidden">
                <div
                  className="px-6 pt-14 pb-6"
                  style={{
                    background: "#C5E600",
                    clipPath: "polygon(0 28%, 100% 0%, 100% 100%, 0% 100%)",
                  }}
                >
                  <h3 className="font-sans font-medium text-[#1A0810] text-lg leading-snug mb-3">
                    {FEATURED_STORIES[1].title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-sans font-[600] text-[#3d5200] uppercase tracking-[0.1em]">
                      {FEATURED_STORIES[1].name} &nbsp;·&nbsp; {FEATURED_STORIES[1].location}
                    </p>
                    <span className="rounded-full border border-[#1A0810] w-8 h-8 flex items-center justify-center text-[#1A0810] text-sm font-[600]">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </article>

            {/* ── Card 3: pink bg · burgundy heading top-left · angled photo right ── */}
            <article className="rounded-2xl overflow-hidden relative" style={{ background: "#D43878", height: "420px" }}>
              {/* Heading top left */}
              <div className="p-6 relative z-10 max-w-[65%]">
                <h3 className="font-sans font-medium text-[#3D0D1B] text-2xl leading-tight">
                  {FEATURED_STORIES[2].title}
                </h3>
              </div>
              {/* Angled photo bottom right */}
              <div
                className="absolute bottom-0 right-0 overflow-hidden"
                style={{
                  width: "68%",
                  height: "72%",
                  clipPath: "polygon(22% 0%, 100% 0%, 100% 100%, 0% 100%)",
                }}
              >
                <Image
                  src={FEATURED_STORIES[2].image}
                  alt={FEATURED_STORIES[2].imageAlt}
                  fill
                  className="object-cover object-top"
                />
              </div>
              {/* Lime attribution pill — bottom left */}
              <div className="absolute bottom-5 left-5 z-10">
                <span
                  className="rounded-full text-[10px] font-[600] font-sans px-3 py-1.5"
                  style={{ background: "#C5E600", color: "#1A0810" }}
                >
                  {FEATURED_STORIES[2].name}, {FEATURED_STORIES[2].age} &nbsp;·&nbsp; {FEATURED_STORIES[2].location}
                </span>
              </div>
            </article>

          </div>

          <a
            href="/stories"
            className="sm:hidden inline-flex items-center gap-2 text-sm font-sans text-muted hover:text-foreground transition-colors duration-150 mt-6"
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
