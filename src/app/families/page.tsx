import type { Metadata } from "next";
import Image from "next/image";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { Section } from "@/components/section";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { SectionHeading } from "@/components/section-heading";
import { ShapeMark, FAMILY_SHAPES } from "@/components/shapes";
import { FAMILY_TYPES, type FamilyType } from "@/lib/family-types";

export const metadata: Metadata = {
  title: "Family Types | CairnFertility",
  description:
    "Fertility treatment guidance for every family: solo mums, solo dads, two mums, two dads, and couples navigating IVF together.",
};

// Display order: Mum and Dad, Solo Mums, Solo Dads, Two Mums, Two Dads
const DISPLAY_ORDER = ["heterosexual-couple", "solo-mum", "single-dad", "same-sex-female", "same-sex-male"];

function getOrdered(): FamilyType[] {
  return DISPLAY_ORDER.map((slug) => FAMILY_TYPES.find((f) => f.slug === slug)!).filter(Boolean);
}

// One card, used for every family type — matching the homepage cards.
function FamilyCard({ family }: { family: FamilyType }) {
  return (
    <a
      href={`/families/${family.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden border transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
      style={{ borderColor: "var(--border)", background: "var(--background)" }}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {family.image ? (
          <Image
            src={family.image}
            alt={family.imageAlt ?? ""}
            fill
            sizes="(min-width: 768px) 360px, 100vw"
            className="object-cover"
          />
        ) : (
          <ImagePlaceholder label={family.label} />
        )}
      </div>

      <div className="flex flex-col flex-1 gap-2 p-5">
        <div className="flex items-center gap-2.5">
          <ShapeMark
            name={FAMILY_SHAPES[family.slug]}
            size={22}
            className="transition-transform duration-300 group-hover:rotate-12"
            style={{ color: "var(--lavender)" }}
          />
          <h2
            className="font-sans font-semibold text-xl"
            style={{ color: "var(--teal)" }}
          >
            {family.label}
          </h2>
        </div>
        <p className="text-base font-sans" style={{ color: "var(--teal)" }}>
          {family.cardSummary}
        </p>
        <span
          className="mt-auto pt-3 self-start inline-flex items-center gap-1.5 text-sm font-[600] font-sans"
          style={{ color: "var(--teal)" }}
        >
          Read the guide →
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
      <div className="mx-auto px-6 md:px-12 lg:px-16">
        <SiteNav />
      </div>

      {/* Hero — one oversized spark bleeding off the band edge */}
      <Section band={0} padding="pt-12 pb-14 md:pt-16 md:pb-18" backdrop={{ shape: "spark" }}>
        <SectionHeading
          level={1}
          eyebrow="IVF for every family"
          mark="bloom"
          title={
            <>
              Whoever you are,
              <br />your path starts here.
            </>
          }
          intro="IVF looks different depending on who you are. Find your family type below for a guide built specifically for you: the right treatment routes and a clear step-by-step from first consultation to family."
          introWidth="55ch"
          className="mb-0"
        />
      </Section>

      {/* Card grid — one uniform card per family type */}
      <Section band={1} padding="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {families.map((family) => (
            <FamilyCard key={family.slug} family={family} />
          ))}
        </div>
      </Section>

      <CTASection />
    </main>
  );
}
