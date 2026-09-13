import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { FamilyHero } from "@/components/family/family-hero";
import { ProcessSteps } from "@/components/family/process-steps";
import { ResourcesSection } from "@/components/family/resources-section";
import { ClinicSection } from "@/components/family/clinic-section";
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

      {/* Personal stories are not rendered until real, consented accounts exist. */}

      {/* Resources */}
      <ResourcesSection resources={family.resources} />

      {/* Clinic finder + comparison tool. The site-wide sign-up lives in
          CTASection, so there is no per-family newsletter block here. */}
      <ClinicSection clinicNote={family.clinicNote} />
    </main>
  );
}
