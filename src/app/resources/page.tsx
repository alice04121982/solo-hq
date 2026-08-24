import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { FAMILY_SHAPES, ShapeMark } from "@/components/shapes";
import { ArrowRight, Calculator, ExternalLink, Heart } from "lucide-react";
import { FAMILY_TYPES, type FamilyType } from "@/lib/family-types";
import { ResourceLibrary, RESOURCE_COUNT, TOPIC_COUNT } from "@/components/resource-library";

export const metadata: Metadata = {
  title: "Resources | CairnFertility",
  description: "Guides, tools, checklists, and templates for solo mums, solo dads, two mums, two dads, and couples going through fertility treatment.",
};

// Same display order as /families: Solo Mums, Solo Dads, Two Mums, Two Dads, Mum and Dad.
const FAMILY_DISPLAY_ORDER = ["solo-mum", "single-dad", "same-sex-female", "same-sex-male", "heterosexual-couple"];

function orderedFamilies(): FamilyType[] {
  return FAMILY_DISPLAY_ORDER.map((slug) => FAMILY_TYPES.find((f) => f.slug === slug)!).filter(Boolean);
}

/**
 * A category icon, drawn straight onto the band in brand teal.
 *
 * No tile behind it: a filled container turns a 20px glyph into a 44px block
 * of colour, which then competes with the card's own heading for the eye. The
 * stroke weight carries it on its own at this size.
 */
function CategoryIcon({ children }: { children: React.ReactNode }) {
  return <span className="shrink-0 text-teal">{children}</span>;
}

export default function ResourcesPage() {
  const families = orderedFamilies();

  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <section className="border-b border-border px-6 md:px-12 lg:px-16">
        <div className="mx-auto">
          <SiteNav />
        </div>
      </section>

      {/* Header — one oversized egg mark bleeding off the band edge */}
      <Section band={0} padding="pt-16 pb-14 md:pt-24 md:pb-18" backdrop={{ shape: "egg" }}>
        <SectionHeading
          level={1}
          eyebrow="The library"
          mark="egg"
          title="Resources"
          intro="Guides, checklists, templates, and explainers for solo mums, solo dads, two mums, two dads, and couples going through fertility treatment."
          introWidth="52ch"
          className="mb-6"
        />
        <p className="text-sm font-sans font-medium text-teal">
          {RESOURCE_COUNT} free resources · {TOPIC_COUNT} topics · No sign-up needed
        </p>
      </Section>

      {/* Start here — the two things most people arrive needing */}
      <Section band={1} padding="py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
          {/* Funding — the question that gates every other decision */}
          <div className="flex flex-col rounded-2xl bg-cream p-7 md:p-8">
            <div className="flex items-center gap-4 mb-5">
              <CategoryIcon>
                <Calculator className="h-7 w-7" />
              </CategoryIcon>
              <p className="text-[12px] font-[600] uppercase tracking-[0.12em] text-muted font-sans">
                Start here if cost is the question
              </p>
            </div>
            <h2 className="font-sans font-bold text-teal text-2xl mb-2">
              Funding &amp; payment options
            </h2>
            <p className="text-sm font-sans text-muted leading-relaxed mb-7" style={{ maxWidth: "52ch" }}>
              What is free on the NHS and how to qualify, an eligibility self-check, and every route people use to pay for the rest — employer benefits, egg sharing, multi-cycle and refund programmes, insurance-backed plans, grants and 0% clinic finance.
            </p>
            <Link
              href="/funding"
              className="mt-auto inline-flex items-center gap-2 self-start rounded-full bg-accent text-on-accent px-6 py-3 text-sm font-sans font-[600] hover:bg-accent-dark transition-colors"
            >
              See funding options
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* DCN — the essential external resource for every family type */}
          <div className="flex flex-col rounded-2xl bg-cream p-7 md:p-8">
            <div className="flex items-center gap-4 mb-5">
              <CategoryIcon>
                <Heart className="h-7 w-7" />
              </CategoryIcon>
              <p className="text-[12px] font-[600] uppercase tracking-[0.12em] text-muted font-sans">
                Essential external resource · All family types
              </p>
            </div>
            <h2 className="font-sans font-bold text-teal text-2xl mb-2">
              Donor Conception Network
            </h2>
            <p className="text-sm font-sans text-muted leading-relaxed mb-7" style={{ maxWidth: "52ch" }}>
              The UK&apos;s leading support charity for donor-conceived families. Books, workshops, peer support, and guidance on talking to children about their conception. Relevant to solo parents, same-sex couples, and heterosexual couples alike.
            </p>
            <a
              href="https://dcnetwork.org"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-2 self-start rounded-full border px-6 py-3 text-sm font-sans font-[600] text-teal hover:bg-surface-hover transition-colors"
              style={{ borderColor: "var(--teal-35)" }}
            >
              Visit dcnetwork.org
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </Section>

      {/* The library — every topic as a white card on the cream band */}
      <Section band={2} padding="py-16 md:py-24">
        <SectionHeading eyebrow="Browse by topic" mark="bloom" title="Everything, organised." />

        <ResourceLibrary />
      </Section>

      {/* Browse by family type — shape-coded cards on the teal band */}
      <Section tone="teal" backdrop={{ shape: "dots", side: "left" }}>
        <SectionHeading
          tone="teal"
          eyebrow="Made for your family"
          title="Browse by family type."
          intro="Each family guide ends with a hand-picked reading list for that path — start there if you want only what applies to you."
          introWidth="52ch"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 items-stretch">
          {families.map((family) => (
            <Link
              key={family.slug}
              href={`/families/${family.slug}#resources`}
              className="group flex flex-col gap-4 rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-1"
              style={{ background: "var(--teal-card)" }}
            >
              <ShapeMark
                name={FAMILY_SHAPES[family.slug]}
                size={28}
                className="transition-transform duration-300 group-hover:rotate-12"
                style={{ color: "var(--accent)" }}
              />
              <h3 className="font-sans font-semibold text-lg text-on-teal">{family.label}</h3>
              <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-[600] font-sans text-on-teal-muted group-hover:text-on-teal transition-colors duration-150">
                View resources <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <CTASection />
    </main>
  );
}
