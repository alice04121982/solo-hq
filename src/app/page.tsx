import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { CTASection } from "@/components/cta-section";
import { FAMILY_TYPES } from "@/lib/family-types";
import { FEATURED_STORIES } from "@/lib/stories";

const CARD_THEME = { bg: "#FAFAFA", text: "#3D0D1B", muted: "rgba(61,13,27,0.6)" };

const RACING_GREEN = "#1A3A25";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 1 — Hero: deep burgundy */}
      <HeroSection />

      {/* 2 — Families carousel: fluorescent lime */}
      <section style={{ background: "#FDE8F2" }} id="families">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[11px] font-[600] uppercase tracking-[0.18em] font-sans mb-3" style={{ color: "#3D0D1B" }}>
                Every family
              </p>
              <h2
                className="font-sans font-bold"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1, color: "#3D0D1B" }}
              >
                Find your guide.
              </h2>
            </div>
            <a
              href="/families"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-sans font-medium transition-opacity duration-150 hover:opacity-70 shrink-0"
              style={{ color: "#3D0D1B" }}
            >
              All family types <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Scroll-snap on mobile, grid on desktop */}
          <div
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth md:grid md:grid-cols-3 lg:grid-cols-5 md:overflow-visible md:pb-0"
            style={{ scrollbarWidth: "none" }}
          >
            {FAMILY_TYPES.map((family) => {
              const theme = CARD_THEME;
              return (
                <a
                  key={family.slug}
                  href={`/families/${family.slug}`}
                  className="group flex-none w-[80vw] sm:w-[56vw] md:w-auto snap-start flex flex-col gap-4 rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
                  style={{ background: theme.bg, color: theme.text }}
                >
                  <h3 className="font-sans font-bold text-lg leading-snug" style={{ color: theme.text }}>
                    {family.label}
                  </h3>
                  <p className="text-sm font-sans leading-relaxed flex-1" style={{ color: theme.muted, maxWidth: "28ch" }}>
                    {family.cardSummary}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-[600] font-sans mt-auto" style={{ color: theme.muted }}>
                    Read the guide <ArrowRight className="h-3 w-3" />
                  </span>
                </a>
              );
            })}
          </div>

          <a
            href="/families"
            className="sm:hidden inline-flex items-center gap-2 text-sm font-sans font-medium transition-opacity duration-150 hover:opacity-70 mt-6"
            style={{ color: "#3D0D1B" }}
          >
            All family types <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      {/* 3 — Clinic comparison teaser: burgundy full section */}
      <section style={{ background: "#3D0D1B" }} id="compare">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span
                className="inline-block text-[9px] font-[700] uppercase tracking-[0.16em] font-sans rounded-full px-3 py-1 mb-6"
                style={{ background: "#C5E600", color: "#1A3A25" }}
              >
                The comparison tool
              </span>
              <h2
                className="font-sans font-bold mb-5"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1, color: "#f9c6da" }}
              >
                The full picture —
                <br />
                not the brochure version.
              </h2>
              <p className="text-sm font-sans leading-relaxed mb-4" style={{ maxWidth: "46ch", color: "#c4a0ae" }}>
                Greece might look £4,000 cheaper. Add three return flights and two hotel stays and suddenly it isn&apos;t. We factor in travel and accommodation so the comparison is honest.
              </p>
              <p className="text-sm font-sans leading-relaxed mb-8" style={{ maxWidth: "46ch", color: "#c4a0ae" }}>
                Success rates by age bracket, solo- and LGBTQ+-friendliness, HFEA-verified data flags, and all six treatment types: IVF, ICSI, IUI, donor egg, donor sperm, and double donor.
              </p>
              <a
                href="/ivf-finder"
                className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-sans font-[600] transition-opacity duration-200 hover:opacity-90"
                style={{ background: "#C5E600", color: "#1A3A25" }}
              >
                Open comparison tool
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "400+", label: "Clinics compared UK & worldwide" },
                { value: "True cost", label: "Travel & stays factored in, not just clinic fees" },
                { value: "5 brackets", label: "Success rates from under 35 to 43+" },
                { value: "6 types", label: "IVF · ICSI · IUI · Donor Egg · Sperm · Double Donor" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.07)" }}>
                  <p
                    className="font-sans font-medium mb-1"
                    style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.6rem)", color: "#f9c6da" }}
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

      {/* 4 — Personal stories: light pink */}
      <section style={{ background: "#FDE8F2" }} id="stories">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[11px] font-[600] uppercase tracking-[0.18em] font-sans mb-3" style={{ color: "rgba(61,13,27,0.5)" }}>
                Real journeys
              </p>
              <h2
                className="font-sans font-bold"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1, color: "#3D0D1B" }}
              >
                In their own words.
              </h2>
            </div>
            <a
              href="/stories"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-sans font-medium rounded-full border px-5 py-2 transition-colors duration-150 shrink-0"
              style={{ borderColor: "rgba(61,13,27,0.3)", color: "#3D0D1B" }}
            >
              See all stories <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">

            {/* Card 1: hot pink bg, heading + badge top, photo below */}
            <article className="rounded-2xl overflow-hidden flex flex-col" style={{ background: "#F0A8C4" }}>
              <div className="p-5 flex items-start justify-between gap-3">
                <h3 className="font-sans font-bold text-xl leading-tight" style={{ color: "#3D0D1B" }}>
                  {FEATURED_STORIES[0].title}
                </h3>
                <span
                  className="shrink-0 rounded-full text-[10px] font-[600] font-sans px-3 py-1.5 whitespace-nowrap"
                  style={{ background: "#FDE8F2", color: "#3D0D1B" }}
                >
                  {FEATURED_STORIES[0].familyLabel}
                </span>
              </div>
              <div className="relative overflow-hidden flex-1" style={{ minHeight: "280px" }}>
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

            {/* Card 2: full-bleed photo, lime diagonal */}
            <article className="rounded-2xl overflow-hidden relative" style={{ height: "420px" }}>
              <Image
                src={FEATURED_STORIES[1].image}
                alt={FEATURED_STORIES[1].imageAlt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 overflow-hidden">
                <div
                  className="px-6 pt-14 pb-6"
                  style={{ background: "#C5E600", clipPath: "polygon(0 28%, 100% 0%, 100% 100%, 0% 100%)" }}
                >
                  <h3 className="font-sans font-bold text-lg leading-snug mb-3" style={{ color: "#1A3A25" }}>
                    {FEATURED_STORIES[1].title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-sans font-[600] uppercase tracking-[0.1em]" style={{ color: "#1A3A25" }}>
                      {FEATURED_STORIES[1].name} &nbsp;·&nbsp; {FEATURED_STORIES[1].location}
                    </p>
                    <span className="rounded-full border w-8 h-8 flex items-center justify-center text-sm font-[600]" style={{ borderColor: "#1A3A25", color: "#1A3A25" }}>
                      →
                    </span>
                  </div>
                </div>
              </div>
            </article>

            {/* Card 3: light pink bg, angled photo */}
            <article className="rounded-2xl overflow-hidden relative" style={{ background: "#FDE8F2", height: "420px" }}>
              <div className="p-6 relative z-10 max-w-[65%]">
                <h3 className="font-sans font-bold text-2xl leading-tight" style={{ color: "#3D0D1B" }}>
                  {FEATURED_STORIES[2].title}
                </h3>
              </div>
              <div
                className="absolute bottom-0 right-0 overflow-hidden"
                style={{ width: "68%", height: "72%", clipPath: "polygon(22% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
              >
                <Image
                  src={FEATURED_STORIES[2].image}
                  alt={FEATURED_STORIES[2].imageAlt}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="absolute bottom-5 left-5 z-10">
                <span
                  className="rounded-full text-[10px] font-[600] font-sans px-3 py-1.5"
                  style={{ background: "#C5E600", color: "#1A3A25" }}
                >
                  {FEATURED_STORIES[2].name}, {FEATURED_STORIES[2].age} &nbsp;·&nbsp; {FEATURED_STORIES[2].location}
                </span>
              </div>
            </article>

          </div>

          <a
            href="/stories"
            className="sm:hidden inline-flex items-center gap-2 text-sm font-sans font-medium transition-opacity duration-150 hover:opacity-70 mt-6"
            style={{ color: "#3D0D1B" }}
          >
            See all stories <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      {/* 5 — Newsletter + CTA: hot pink */}
      <CTASection />
    </main>
  );
}
