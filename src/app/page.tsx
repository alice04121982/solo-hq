import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { CTASection } from "@/components/cta-section";
import { FAMILY_TYPES } from "@/lib/family-types";
import { FEATURED_STORIES } from "@/lib/stories";

const CARD_THEME = { bg: "#FFFFFF", text: "var(--teal)", muted: "rgba(0, 83, 83, 0.6)" };

const RACING_GREEN = "#1A3A25";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 1 — Hero: deep teal */}
      <HeroSection />

      {/* 2 — Family types: warm cream, white cards */}
      <section style={{ background: "var(--cream)" }} id="families">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <div className="flex items-end justify-between mb-10">
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-[600] uppercase tracking-[2px] font-sans" style={{ color: "var(--teal)" }}>
                Every family
              </p>
              <h2
                className="font-sans font-bold"
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.8px",
                  color: "var(--teal)",
                }}
              >
                Find your guide.
              </h2>
            </div>
            <a
              href="/families"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-sans font-medium transition-opacity duration-150 hover:opacity-70 shrink-0"
              style={{ color: "var(--teal)" }}
            >
              All family types <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Scroll-snap on mobile, grid on desktop */}
          <div
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth md:grid md:grid-cols-3 xl:grid-cols-5 md:overflow-visible md:pb-0"
            style={{ scrollbarWidth: "none" }}
          >
            {FAMILY_TYPES.map((family) => {
              const theme = CARD_THEME;
              return (
                <a
                  key={family.slug}
                  href={`/families/${family.slug}`}
                  className="group flex-none w-[80vw] sm:w-[56vw] md:w-auto snap-start flex flex-col gap-4 rounded-2xl p-6 md:min-h-[229px] transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
                  style={{ background: theme.bg, color: theme.text }}
                >
                  <h3 className="font-sans font-semibold text-lg leading-7" style={{ color: theme.text }}>
                    {family.label}
                  </h3>
                  <p className="text-sm font-sans leading-5 flex-1" style={{ color: theme.text }}>
                    {family.cardSummary}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-[600] font-sans mt-auto" style={{ color: theme.text }}>
                    Read the guide <ArrowRight className="h-3 w-3" />
                  </span>
                </a>
              );
            })}
          </div>

          <a
            href="/families"
            className="sm:hidden inline-flex items-center gap-2 text-sm font-sans font-medium transition-opacity duration-150 hover:opacity-70 mt-6"
            style={{ color: "var(--teal)" }}
          >
            All family types <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      {/* 3 — Clinic comparison teaser: teal full section */}
      <section style={{ background: "var(--teal)" }} id="compare">
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

      {/* 4 — Personal stories: white */}
      <section style={{ background: "#FFFFFF" }} id="stories">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <div className="flex items-end justify-between mb-10">
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-[600] uppercase tracking-[2px] font-sans" style={{ color: "rgba(0, 83, 83, 0.5)" }}>
                Real journeys
              </p>
              <h2
                className="font-sans font-bold"
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.8px",
                  color: "var(--teal)",
                }}
              >
                In their own words.
              </h2>
            </div>
            <a
              href="/stories"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-sans font-medium rounded-full border px-5 py-2 transition-colors duration-150 shrink-0"
              style={{ borderColor: "rgba(0, 83, 83, 0.3)", color: "var(--teal)" }}
            >
              See all stories <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">

            {/* Card 1: pink bg, teal badge + heading, angled photo bottom-right */}
            <article
              className="rounded-2xl overflow-hidden relative flex flex-col px-4 py-[21px]"
              style={{ background: "#feb3d1", height: "420px" }}
            >
              <div
                className="absolute bottom-0 right-0 overflow-hidden"
                style={{ width: "72%", height: "69%", clipPath: "polygon(26% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
              >
                <Image
                  src={FEATURED_STORIES[0].image}
                  alt={FEATURED_STORIES[0].imageAlt}
                  fill
                  className="object-cover object-top"
                />
              </div>

              <div className="relative z-10 flex flex-col gap-1 items-start">
                <span
                  className="rounded-full text-xs font-sans font-medium leading-[18px] px-4 py-1"
                  style={{ background: "var(--teal)", color: "var(--cream)" }}
                >
                  {FEATURED_STORIES[0].tag}
                </span>
                <h3
                  className="font-sans font-semibold"
                  style={{ fontSize: "clamp(1.75rem, 2.8vw, 2.25rem)", lineHeight: 1.22, letterSpacing: "-0.72px", color: "var(--teal)" }}
                >
                  {FEATURED_STORIES[0].title}
                </h3>
              </div>

              <span
                className="relative z-10 mt-auto rounded-full border w-8 h-8 flex items-center justify-center text-sm font-[600] shrink-0"
                style={{ borderColor: "var(--teal)", color: "var(--teal)" }}
              >
                →
              </span>
            </article>

            {/* Card 2: teal card wrapping a cream panel, lime badge notched into its corner */}
            <article
              className="rounded-2xl relative"
              style={{ background: "var(--teal)", height: "420px" }}
            >
              {/* Cream panel — inset 16px left/right, sitting below the badge */}
              <div
                className="absolute left-4 right-4 top-[33px] bottom-[19px] rounded-2xl flex flex-col px-4 pt-12 pb-4"
                style={{ background: "var(--cream)" }}
              >
                <h3
                  className="font-sans font-semibold"
                  style={{ fontSize: "clamp(1.75rem, 2.8vw, 2.25rem)", lineHeight: 1.22, letterSpacing: "-0.72px", color: "var(--teal)" }}
                >
                  &ldquo;{FEATURED_STORIES[1].title}&rdquo;
                </h3>
                <p
                  className="text-xs font-sans leading-[18px] uppercase mt-1.5"
                  style={{ color: "var(--teal)" }}
                >
                  {FEATURED_STORIES[1].name} &nbsp;·&nbsp; {FEATURED_STORIES[1].location}
                </p>
                <span
                  className="mt-auto rounded-full w-8 h-8 flex items-center justify-center text-sm font-[600] shrink-0"
                  style={{ background: "var(--teal)", color: "var(--accent)" }}
                >
                  →
                </span>
              </div>

              {/* Badge straddles the panel's top edge; the teal ring cuts the notch */}
              <span
                className="absolute left-4 top-[21px] rounded-full text-xs font-sans font-medium leading-[18px] px-4 py-1"
                style={{
                  background: "var(--accent)",
                  color: "var(--teal)",
                  boxShadow: "0 0 0 6px var(--teal)",
                }}
              >
                {FEATURED_STORIES[1].tag}
              </span>
            </article>

            {/* Card 3: full-bleed photo with an inset rounded lime block */}
            <article
              className="rounded-2xl overflow-hidden relative border"
              style={{
                height: "420px",
                borderColor: "rgba(0,0,0,0.08)",
                boxShadow:
                  "0 10px 13px -3px rgba(10,13,18,0.08), 0 3px 5px -2px rgba(10,13,18,0.03), 0 2px 2px -1px rgba(10,13,18,0.04)",
              }}
            >
              <Image
                src={FEATURED_STORIES[2].image}
                alt={FEATURED_STORIES[2].imageAlt}
                fill
                className="object-cover"
              />
              <div className="absolute left-4 right-4 bottom-4 h-[186px] rounded-[20px] overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{ background: "var(--accent)", clipPath: "polygon(0 15%, 100% 0%, 100% 100%, 0% 100%)" }}
                />
                <div className="relative h-full flex flex-col gap-2 px-3 pt-[50px] pb-3">
                  <span
                    className="self-start rounded-full text-xs font-sans font-medium leading-[18px] px-4 py-1"
                    style={{ background: "var(--teal)", color: "var(--cream)" }}
                  >
                    {FEATURED_STORIES[2].tag}
                  </span>
                  <h3 className="font-sans font-bold text-lg leading-[1.375]" style={{ color: "#1A3A25" }}>
                    {FEATURED_STORIES[2].title}
                  </h3>
                  <div className="flex items-center gap-5 mt-auto">
                    <p
                      className="flex-1 text-[11px] font-sans font-[600] uppercase leading-[1.45]"
                      style={{ color: "#1A3A25", letterSpacing: "1.1px" }}
                    >
                      {FEATURED_STORIES[2].name} &nbsp;·&nbsp; {FEATURED_STORIES[2].location}
                    </p>
                    <span
                      className="rounded-full border w-8 h-8 flex items-center justify-center text-sm font-[600] shrink-0"
                      style={{ borderColor: "var(--teal)", color: "var(--teal)" }}
                    >
                      →
                    </span>
                  </div>
                </div>
              </div>
            </article>

          </div>

          <a
            href="/stories"
            className="sm:hidden inline-flex items-center gap-2 text-sm font-sans font-medium transition-opacity duration-150 hover:opacity-70 mt-6"
            style={{ color: "var(--teal)" }}
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
