import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { CTASection } from "@/components/cta-section";
import { StoriesCarousel } from "@/components/stories-carousel";
import { Section } from "@/components/section";
import { QuoteCard } from "@/components/quote-card";
import { SectionHeading } from "@/components/section-heading";
import { TealCard } from "@/components/teal-card";
import { FAMILY_SHAPES, ShapeMark, SHAPE_CYCLE } from "@/components/shapes";
import { FAMILY_TYPES } from "@/lib/family-types";
import { FEATURED_STORIES } from "@/lib/stories";
import { HOMEPAGE_QUOTES } from "@/lib/quotes";

const CARD_THEME = { bg: "var(--background)", text: "var(--teal)" };

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 1 — Hero: deep teal */}
      <HeroSection />

      {/* 2 — Family types: warm cream, white cards */}
      <Section tone="cream" id="families">
        <SectionHeading
          eyebrow="Every family"
          mark="bloom"
          title="Find your guide."
          action={
            <Link
              href="/families"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-sans font-medium transition-opacity duration-150 hover:opacity-70 shrink-0"
              style={{ color: "var(--teal)" }}
            >
              All family types <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        />

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
                {/* Every family gets its own mark, no family gets a stock
                    photo — shape-coded identity from FAMILY_SHAPES. */}
                <ShapeMark
                  name={FAMILY_SHAPES[family.slug]}
                  size={32}
                  className="transition-transform duration-300 group-hover:rotate-12"
                  style={{ color: "var(--lavender)" }}
                />
                <h3 className="font-sans font-semibold text-xl" style={{ color: theme.text }}>
                  {family.label}
                </h3>
                <p className="text-base font-sans flex-1" style={{ color: theme.text }}>
                  {family.cardSummary}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-[600] font-sans mt-auto" style={{ color: theme.text }}>
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
      <Section tone="teal" id="compare" backdrop={{ shape: "dots" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <SectionHeading
              tone="teal"
              eyebrow="The comparison tool"
              title={
                <>
                  The full picture,
                  <br />
                  not the brochure version.
                </>
              }
              intro="Greece might look £4,000 cheaper. Add three return flights and two hotel stays and suddenly it isn’t. We factor in travel and accommodation so the comparison is honest."
              introWidth="46ch"
              className="mb-5"
            />
            <p className="text-lg font-sans leading-relaxed mb-10" style={{ maxWidth: "46ch", color: "var(--on-teal-muted)" }}>
              Success rates by age bracket, solo- and LGBTQ+-friendliness, HFEA-verified data flags, and all six treatment types: IVF, ICSI, IUI, donor egg, donor sperm, and double donor.
            </p>
            <Link
              href="/ivf-finder"
              className="inline-flex items-center gap-2 rounded-full px-9 py-4 text-base font-sans font-[600] transition-opacity duration-200 hover:opacity-90"
              style={{ background: "var(--accent)", color: "var(--on-accent)" }}
            >
              Open comparison tool
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Stats grid — one shape from the bank per card, in the same
              rotation the family cards use. */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "HFEA data", label: "UK success rates from the public register" },
              { value: "True cost", label: "Travel & stays factored in, not just clinic fees" },
              { value: "5 brackets", label: "Success rates from under 35 to 43+" },
              { value: "6 types", label: "IVF · ICSI · IUI · Donor Egg · Sperm · Double Donor" },
            ].map((s, i) => (
              <TealCard
                key={s.label}
                mark={SHAPE_CYCLE[i % SHAPE_CYCLE.length]}
                value={s.value}
                label={s.label}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* 4 — Personal stories: white */}
      <Section tone="white" id="stories">
        <SectionHeading
          eyebrow="Stories"
          mark="spark"
          markClassName="shape-spin"
          title="In their own words."
          action={
            <Link
              href="/stories"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-sans font-medium rounded-full border px-5 py-2 transition-colors duration-150 shrink-0"
              style={{ borderColor: "var(--teal-35)", color: "var(--teal)" }}
            >
              See all stories <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        />

        <StoriesCarousel stories={FEATURED_STORIES} />

        <Link
          href="/stories"
          className="sm:hidden inline-flex items-center gap-2 text-sm font-sans font-medium transition-opacity duration-150 hover:opacity-70 mt-6"
          style={{ color: "var(--teal)" }}
        >
          See all stories <ArrowRight className="h-3.5 w-3.5" />
        </Link>

        <p className="text-xs font-sans mt-8" style={{ color: "var(--muted)" }}>
          Illustrative stories while we collect real, consented accounts. Share yours:
          stories@cairnfertility.co.uk
        </p>
      </Section>

      {/* 5 — Community voices: warm cream, speech-bubble quotes */}
      <Section
        tone="cream"
        id="voices"
        /* The trailing dot is cropped by the seam with the pink CTA band, so it
           takes the lime — pink on pink there reads as a smudge, not a shape. */
        backdrop={{ shape: "dots", side: "left", color: "var(--lavender)", endColor: "var(--accent)" }}
      >
        <SectionHeading
          eyebrow="Community voices"
          mark="egg"
          title="Voices from the journey."
        />
        <p className="text-xs font-sans mb-10 -mt-6" style={{ color: "var(--muted)", maxWidth: "60ch" }}>
          Illustrative quotes while we collect real, consented accounts.
        </p>

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
