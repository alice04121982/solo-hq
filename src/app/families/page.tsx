import type { Metadata } from "next";
import Image from "next/image";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { FAMILY_TYPES, type FamilyType } from "@/lib/family-types";

export const metadata: Metadata = {
  title: "Family Types | Flying Solo — IVF & Fertility Guidance",
  description:
    "Fertility treatment guidance for every family — solo mums, solo dads, two mums, two dads, and couples navigating IVF together.",
};

// Display order: Solo Mums, Solo Dads, Two Mums, Two Dads, Mum and Dad
const DISPLAY_ORDER = ["solo-mum", "single-dad", "same-sex-female", "same-sex-male", "heterosexual-couple"];

function getOrdered(): FamilyType[] {
  return DISPLAY_ORDER.map((slug) => FAMILY_TYPES.find((f) => f.slug === slug)!).filter(Boolean);
}

// ── Card lockup 1: cream bg, heading + badge top, photo below, attribution in photo corner ──
function CardCream({ family }: { family: FamilyType }) {
  return (
    <a href={`/families/${family.slug}`} className="block group rounded-2xl overflow-hidden flex flex-col" style={{ background: "#FDE8F2" }}>
      <div className="p-5">
        <h2 className="font-sans font-medium text-2xl leading-tight group-hover:opacity-80 transition-opacity" style={{ color: "#3D0D1B" }}>
          {family.label}
        </h2>
      </div>
      <p className="px-5 pb-4 text-sm font-sans leading-relaxed" style={{ maxWidth: "38ch", color: "rgba(61,13,27,0.65)" }}>
        {family.cardSummary}
      </p>
      <div className="relative overflow-hidden flex-1" style={{ minHeight: "240px" }}>
        <Image
          src={family.image}
          alt={family.imageAlt}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-3 right-3 text-right">
          <span
            className="text-[11px] font-sans font-[600] rounded-full px-3 py-1.5 inline-block"
            style={{ background: "#C5E600", color: "#1A3A25" }}
          >
            Read the guide →
          </span>
        </div>
      </div>
    </a>
  );
}

// ── Card lockup 2: full-bleed photo, lime diagonal block at bottom ──
function CardFullBleed({ family }: { family: FamilyType }) {
  return (
    <a href={`/families/${family.slug}`} className="block group rounded-2xl overflow-hidden relative" style={{ minHeight: "400px" }}>
      <Image
        src={family.image}
        alt={family.imageAlt}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
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
          <h2 className="font-sans font-medium text-2xl leading-snug mb-3" style={{ color: "#1A3A25" }}>
            {family.label}
          </h2>
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] font-sans font-[600] uppercase tracking-[0.1em] leading-tight" style={{ maxWidth: "28ch", color: "#1A3A25" }}>
              {family.cardSummary}
            </p>
            <span className="shrink-0 rounded-full border w-9 h-9 flex items-center justify-center text-base font-[600]" style={{ borderColor: "#1A3A25", color: "#1A3A25" }}>
              →
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

// ── Card lockup 3: pink bg, burgundy heading top-left, angled photo bottom-right ──
function CardPink({ family }: { family: FamilyType }) {
  return (
    <a href={`/families/${family.slug}`} className="block group rounded-2xl overflow-hidden relative" style={{ background: "#FDE8F2", minHeight: "400px" }}>
      {/* Heading top left */}
      <div className="p-6 relative z-10 max-w-[60%]">
        <h2 className="font-sans font-medium text-[#3D0D1B] text-3xl leading-tight group-hover:opacity-80 transition-opacity">
          {family.label}
        </h2>
        <p className="text-sm font-sans mt-2 leading-relaxed" style={{ maxWidth: "28ch", color: "rgba(61,13,27,0.7)" }}>
          {family.cardSummary}
        </p>
      </div>
      {/* Angled photo bottom right */}
      <div
        className="absolute bottom-0 right-0 overflow-hidden"
        style={{
          width: "68%",
          height: "68%",
          clipPath: "polygon(22% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      >
        <Image
          src={family.image}
          alt={family.imageAlt}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      {/* Arrow pill bottom left */}
      <div className="absolute bottom-5 left-5 z-10">
        <span
          className="rounded-full text-[10px] font-[600] font-sans px-3 py-1.5 inline-block"
          style={{ background: "#C5E600", color: "#1A3A25" }}
        >
          Read the guide →
        </span>
      </div>
    </a>
  );
}

const CARD_COMPONENTS = [CardCream, CardFullBleed, CardPink];

export default function FamiliesPage() {
  const families = getOrdered();
  const topRow = families.slice(0, 3);
  const bottomRow = families.slice(3);

  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <SiteNav />
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-12 pb-14 md:pt-16 md:pb-18 border-b border-border">
        <span
          className="inline-block text-[9px] font-[700] uppercase tracking-[0.16em] font-sans rounded-full px-3 py-1 mb-5"
          style={{ background: "#C5E600", color: "#1A3A25" }}
        >
          IVF for every family
        </span>
        <h1
          className="font-sans font-medium text-foreground mb-4"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}
        >
          Whoever you are,
          <br />your path starts here.
        </h1>
        <p className="text-[17px] font-sans text-muted leading-relaxed" style={{ maxWidth: "55ch" }}>
          IVF looks different depending on who you are. Find your family type below for a guide built specifically for you — the right treatment routes, real stories, and a clear step-by-step from first consultation to family.
        </p>
      </section>

      {/* Card grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
        {/* Top row — 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {topRow.map((family, i) => {
            const CardComponent = CARD_COMPONENTS[i % 3];
            return <CardComponent key={family.slug} family={family} />;
          })}
        </div>

        {/* Bottom row — 2 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {bottomRow.map((family, i) => {
            const CardComponent = CARD_COMPONENTS[(topRow.length + i) % 3];
            return <CardComponent key={family.slug} family={family} />;
          })}
        </div>
      </section>

      {/* What each guide includes */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
            What you&apos;ll find
          </p>
          <h2
            className="font-sans font-medium text-foreground mb-12"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1 }}
          >
            Every guide includes:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
            {[
              { num: "01", title: "Step-by-step process", body: "A clear, honest walkthrough from initial tests to parenthood — tailored to your specific treatment route." },
              { num: "02", title: "Personal stories", body: "Real accounts from people who've been through it. The emotional truth, not just the clinical facts." },
              { num: "03", title: "Clinic comparison", body: "Link directly to our comparison tool filtered for your treatment type, with success rates by age bracket." },
              { num: "04", title: "Newsletter", body: "Updates specific to your family type — clinic data changes, new research, community stories." },
            ].map((item) => (
              <div key={item.num} className="py-6 border-t border-border">
                <p className="font-sans font-medium text-muted/50 mb-3" style={{ fontSize: "1.5rem" }}>
                  {item.num}
                </p>
                <p className="font-sans font-medium text-foreground text-lg mb-2">{item.title}</p>
                <p className="text-sm font-sans text-muted leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
