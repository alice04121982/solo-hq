import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui";

export const metadata: Metadata = {
  title: "Stories | KLEO Fertility",
  description:
    "Every path to parenthood is different. Read honest, first-hand accounts from families who've been where you are.",
};

export default function StoriesPage() {
  return (
    <main className="min-h-screen bg-bg-secondary">
      {/* Nav */}
      <div className="border-b border-border-secondary px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <SiteNav />
        </div>
      </div>

      {/* Hero */}
      <section className="bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary font-sans mb-5">
            Real families. Real journeys.
          </p>
          <h1
            className="font-serif font-semibold text-text-primary mb-6"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}
          >
            Stories
          </h1>
          <p
            className="text-md font-sans text-text-secondary leading-relaxed mb-10"
            style={{ maxWidth: "52ch" }}
          >
            Every path to parenthood is different. Read honest, first-hand
            accounts from families who&apos;ve been where you are.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/clinics"
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              Find a clinic
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Stories placeholder */}
      <section className="bg-bg-primary border-y border-border-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 text-center">
          <p className="font-serif font-semibold text-text-primary text-2xl mb-4">
            Stories are coming soon.
          </p>
          <p className="text-md font-sans text-text-secondary">
            We&apos;re collecting real accounts from families across every path.
            Check back soon — or share your own.
          </p>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
