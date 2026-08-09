import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { CTASection } from "@/components/cta-section";
import { Section } from "@/components/section";
import { QuoteCard } from "@/components/quote-card";
import { FAMILY_TYPES } from "@/lib/family-types";
import { FEATURED_STORIES } from "@/lib/stories";
import { HOMEPAGE_QUOTES } from "@/lib/quotes";

const CARD_THEME = { bg: "#FFFFFF", text: "var(--teal)", muted: "rgba(0, 83, 83, 0.6)" };

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 1 — Hero: deep teal */}
      <HeroSection />

      {/* 2 — Family types: warm cream, white cards */}
      <Section tone="cream" id="families">
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
          <Link
            href="/families"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-sans font-medium transition-opacity duration-150 hover:opacity-70 shrink-0"
            style={{ color: "var(--teal)" }}
          >
            All family types <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Scroll-snap on mobile, grid on desktop */}
        <div
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth md:grid md:grid-cols-3 xl:grid-cols-5 md:overflow-visible md:pb-0"
          style={{ scrollbarWidth: "none" }}
        >
          {FAMILY_TYPES.map((family) => {
            const theme = CARD_THEME;
            return (
              <Link
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
              </Link>
            );
          })}
        </div>

        <Link
          href="/families"
          className="sm:hidden inline-flex items-center gap-2 text-sm font-sans font-medium transition-opacity duration-150 hover:opacity-70 mt-6"
          style={{ color: "var(--teal)" }}
        >
          All family types <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Section>

      {/* 3 — Clinic comparison teaser: teal full section */}
      <Section tone="teal" id="compare">
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
            <Link
              href="/ivf-finder"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-sans font-[600] transition-opacity duration-200 hover:opacity-90"
              style={{ background: "#C5E600", color: "#1A3A25" }}
            >
              Open comparison tool
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
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
      </Section>

      {/* 4 — Personal stories: white */}
      <Section tone="white" id="stories">
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
          <Link
            href="/stories"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-sans font-medium rounded-full border px-5 py-2 transition-colors duration-150 shrink-0"
            style={{ borderColor: "rgba(0, 83, 83, 0.3)", color: "var(--teal)" }}
          >
            See all stories <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {FEATURED_STORIES.map((story) => (
            <Link
              key={story.id}
              href={`/stories/${story.id}`}
              className="group flex flex-col rounded-2xl overflow-hidden border transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
              style={{ borderColor: "var(--border)", background: "#FFFFFF" }}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.imageAlt}
                  fill
                  sizes="(min-width: 768px) 360px, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col flex-1 gap-2 p-5">
                <h3
                  className="font-sans font-semibold text-lg leading-7"
                  style={{ color: "var(--teal)" }}
                >
                  {story.title}
                </h3>
                <p
                  className="text-sm font-sans leading-5"
                  style={{ color: "var(--muted)" }}
                >
                  {story.excerpt}
                </p>

                <span
                  className="mt-auto pt-3 self-start text-xs font-sans font-medium leading-[18px]"
                  style={{ color: "var(--teal)" }}
                >
                  <span
                    className="rounded-full px-3 py-1"
                    style={{ background: "var(--cream)" }}
                  >
                    {story.tag}
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/stories"
          className="sm:hidden inline-flex items-center gap-2 text-sm font-sans font-medium transition-opacity duration-150 hover:opacity-70 mt-6"
          style={{ color: "var(--teal)" }}
        >
          See all stories <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Section>

      {/* 5 — Community voices: warm cream, speech-bubble quotes */}
      <Section tone="cream" id="voices">
        <div className="flex flex-col gap-3 mb-10">
          <p className="text-[11px] font-[600] uppercase tracking-[2px] font-sans" style={{ color: "var(--teal)" }}>
            Community voices
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
            What people tell us.
          </h2>
        </div>

        {/* The middle card takes the teal so the row has a centre of gravity. */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {HOMEPAGE_QUOTES.map((q, i) => (
            <QuoteCard
              key={q.name}
              quote={q.quote}
              name={q.name}
              eyebrow={q.stage}
              meta={[q.location]}
              avatar={q.avatar}
              tone={i === 1 ? "teal" : "pink"}
            />
          ))}
        </div>
      </Section>

      {/* 6 — Newsletter + CTA: hot pink */}
      <CTASection />
    </main>
  );
}
