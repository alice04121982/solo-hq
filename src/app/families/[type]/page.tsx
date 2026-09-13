import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { FamilyHero } from "@/components/family/family-hero";
import { ProcessSteps } from "@/components/family/process-steps";
import { NewsletterSection } from "@/components/family/newsletter-section";
import { ResourcesSection } from "@/components/family/resources-section";
import { ClinicSection } from "@/components/family/clinic-section";
import { JourneyMap } from "@/components/journey-map";
import { BentoCard } from "@/components/bento-card";
import { Section } from "@/components/section";
import { getFamilyType, FAMILY_TYPES, type FamilyTypeSlug } from "@/lib/family-types";

interface PageProps {
  params: Promise<{ type: string }>;
}

export async function generateStaticParams() {
  return FAMILY_TYPES.map((f) => ({ type: f.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = await params;
  const family = getFamilyType(type);
  if (!family) return {};
  return {
    title: `${family.label} | CairnFertility`,
    description: family.heroCopy.slice(0, 160),
  };
}

export default async function FamilyTypePage({ params }: PageProps) {
  const { type } = await params;
  const family = getFamilyType(type as FamilyTypeSlug);

  if (!family) notFound();

  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <section className="border-b border-border px-6 md:px-12 lg:px-16">
        <div className="mx-auto">
          <SiteNav />
        </div>
      </section>

      {/* Hero */}
      <FamilyHero family={family} />

      {/* Step-by-step guide */}
      <ProcessSteps steps={family.steps} />

      {/* Support link: the one emotional-support pointer on this page */}
      <Section tone="white" padding="pb-8 md:pb-12">
        <p className="text-base font-sans" style={{ color: "var(--teal)" }}>
          <Link href="/support" className="underline underline-offset-2" style={{ color: "var(--teal)" }}>
            Looking after yourself
          </Link>
          : counselling and support during treatment.
        </p>
      </Section>

      {/* Solo Navigator — solo-mum page only */}
      {family.slug === "solo-mum" && (
        <section className="bg-background border-b border-border">
          <div className="mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-36">
            <p
              className="text-[13px] font-[600] uppercase tracking-[0.15em] mb-3 font-sans"
              style={{ color: "rgba(26,58,37,0.65)" }}
            >
              Solo Navigator
            </p>
            <h2
              className="font-sans font-bold mb-10"
              style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1, color: "var(--teal)" }}
            >
              Where are you on your journey?
            </h2>
            <BentoCard delay={0.05}>
              <JourneyMap />
            </BentoCard>
          </div>
        </section>
      )}

      {/* Personal stories are not rendered until real, consented accounts exist. */}

      {/* Resources */}
      <ResourcesSection resources={family.resources} />

      {/* Newsletter */}
      <NewsletterSection familyLabel={family.label} />

      {/* Clinic finder + comparison tool */}
      <ClinicSection clinicNote={family.clinicNote} />
    </main>
  );
}
