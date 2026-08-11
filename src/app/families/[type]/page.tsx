import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { FamilyHero } from "@/components/family/family-hero";
import { ProcessSteps } from "@/components/family/process-steps";
import { PersonalStories } from "@/components/family/personal-stories";
import { NewsletterSection } from "@/components/family/newsletter-section";
import { ResourcesSection } from "@/components/family/resources-section";
import { ClinicSection } from "@/components/family/clinic-section";
import { JourneyMap } from "@/components/journey-map";
import { BentoCard } from "@/components/bento-card";
import { Section } from "@/components/section";
import { QuoteCard } from "@/components/quote-card";
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
    title: `${family.label} | Cairn Fertility`,
    description: family.heroCopy.slice(0, 160),
  };
}

export default async function FamilyTypePage({ params }: PageProps) {
  const { type } = await params;
  const family = getFamilyType(type as FamilyTypeSlug);

  if (!family) notFound();

  // Only the lead story carries a quote. It is pulled up here, a full section
  // clear of the story it came from further down the page.
  const voice = family.stories.find((s) => s.quote);

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

      {/* A voice from this community, before the practical steps */}
      {voice?.quote && (
        <Section tone="white" padding="pb-4 md:pb-8">
          <div className="max-w-2xl">
            <QuoteCard
              quote={voice.quote}
              name={voice.name}
              eyebrow={voice.tag}
              meta={[`${voice.age}`, voice.location]}
              avatar={voice.image}
              tone="pink"
            />
          </div>
        </Section>
      )}

      {/* Step-by-step guide */}
      <ProcessSteps steps={family.steps} />

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
              style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1, color: "#1A3A25" }}
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

      {/* Resources */}
      <ResourcesSection resources={family.resources} />

      {/* Newsletter */}
      <NewsletterSection familyLabel={family.label} />

      {/* Clinic finder + comparison tool */}
      <ClinicSection clinicNote={family.clinicNote} />
    </main>
  );
}
