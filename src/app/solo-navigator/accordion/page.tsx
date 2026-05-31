import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { JourneyHeader } from "@/components/solo-navigator/journey-header";
import { JourneyAccordion } from "@/components/solo-navigator/journey-accordion";
import { CTASection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "Solo Navigator — Flying Solo",
  description:
    "Seven stages of the solo motherhood journey. Honest guidance, real resources, and a community at every step — from 'am I really doing this?' to thriving as a solo family.",
};

export default function AccordionPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <div className="px-6 md:px-10 border-b border-border">
        <SiteNav />
      </div>

      {/* Page header + variant switcher */}
      <JourneyHeader />

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Accordion */}
      <section className="pt-0">
        <JourneyAccordion />
      </section>

      {/* CTA + Footer */}
      <CTASection />
    </main>
  );
}
