import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { FamilyHero } from "@/components/family/family-hero";
import { ProcessSteps } from "@/components/family/process-steps";
import { PersonalStories } from "@/components/family/personal-stories";
import { NewsletterSection } from "@/components/family/newsletter-section";
import { ClinicSection } from "@/components/family/clinic-section";
import { JourneyMap } from "@/components/journey-map";
import { BentoCard } from "@/components/bento-card";
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
    title: `${family.label} | Flying Solo — IVF & Fertility Guidance`,
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
      <section className="border-b border-border px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <SiteNav />
        </div>
      </section>

      {/* Hero */}
      <FamilyHero family={family} />

      {/* Step-by-step guide */}
      <ProcessSteps steps={family.steps} />

      {/* Solo Navigator — solo-mum page only */}
      {family.slug === "solo-mum" && (
        <section className="bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
            <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-3 font-sans">
              Solo Navigator
            </p>
            <h2
              className="font-sans font-bold text-foreground mb-10"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1 }}
            >
              Where are you on your journey?
            </h2>
            <BentoCard delay={0.05} white>
              <JourneyMap />
            </BentoCard>
          </div>
        </section>
      )}

      {/* Personal stories */}
      <PersonalStories stories={family.stories} />

      {/* Newsletter */}
      <NewsletterSection familyLabel={family.label} />

      {/* Clinic finder + comparison tool */}
      <ClinicSection clinicNote={family.clinicNote} />
    </main>
  );
}
