import type { Metadata } from "next";
import Image from "next/image";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { FAMILY_TYPES, type FamilyType } from "@/lib/family-types";

export const metadata: Metadata = {
  title: "Family Types | CairnFertility — IVF & Fertility Guidance",
  description:
    "Fertility treatment guidance for every family — solo mums, solo dads, two mums, two dads, and couples navigating IVF together.",
};

// Display order: Solo Mums, Solo Dads, Two Mums, Two Dads, Mum and Dad
const DISPLAY_ORDER = ["solo-mum", "single-dad", "same-sex-female", "same-sex-male", "heterosexual-couple"];

function getOrdered(): FamilyType[] {
  return DISPLAY_ORDER.map((slug) => FAMILY_TYPES.find((f) => f.slug === slug)!).filter(Boolean);
}

// One card, used for every family type — matching the homepage cards.
function FamilyCard({ family }: { family: FamilyType }) {
  return (
    <a
      href={`/families/${family.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden border transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
      style={{ borderColor: "var(--border)", background: "#FFFFFF" }}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={family.image}
          alt={family.imageAlt}
          fill
          sizes="(min-width: 768px) 360px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col flex-1 gap-2 p-5">
        <h2
          className="font-sans font-semibold text-lg leading-7"
          style={{ color: "var(--teal)" }}
        >
          {family.label}
        </h2>
        <p className="text-sm font-sans leading-5" style={{ color: "var(--muted)" }}>
          {family.cardSummary}
        </p>
        <span
          className="mt-auto pt-3 self-start text-xs font-sans font-medium leading-[18px]"
          style={{ color: "var(--teal)" }}
        >
          <span className="rounded-full px-3 py-1" style={{ background: "var(--cream)" }}>
            Read the guide →
          </span>
        </span>
      </div>
    </a>
  );
}

export default function FamiliesPage() {
  const families = getOrdered();

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
          className="font-sans font-bold text-[#1A3A25] mb-4"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}
        >
          Whoever you are,
          <br />your path starts here.
        </h1>
        <p className="text-[17px] font-sans text-muted leading-relaxed" style={{ maxWidth: "55ch" }}>
          IVF looks different depending on who you are. Find your family type below for a guide built specifically for you — the right treatment routes, real stories, and a clear step-by-step from first consultation to family.
        </p>
      </section>

      {/* Card grid — one uniform card per family type */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {families.map((family) => (
            <FamilyCard key={family.slug} family={family} />
          ))}
        </div>
      </section>

      {/* What each guide includes */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
            What you&apos;ll find
          </p>
          <h2
            className="font-sans font-bold text-[#1A3A25] mb-12"
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
                <p className="font-sans font-medium text-[#1A3A25] text-lg mb-2">{item.title}</p>
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
