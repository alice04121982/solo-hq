import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui";

export const metadata: Metadata = {
  title: "Double donor & embryo donation | KLEO Fertility",
  description:
    "Using both donor sperm and donor eggs, or a donated embryo. What double donor conception means practically, legally, and emotionally.",
};

export default function DoubleDonorPage() {
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
            Donor conception
          </p>
          <h1
            className="font-serif font-semibold text-text-primary mb-6"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}
          >
            Double donor &amp; embryo donation
          </h1>
          <p
            className="text-md font-sans text-text-secondary leading-relaxed mb-10"
            style={{ maxWidth: "52ch" }}
          >
            Using both donor sperm and donor eggs, or a donated embryo. What
            double donor conception means practically, legally, and emotionally.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/clinics"
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              Find a clinic
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/donor-conception"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              All donor types
            </a>
          </div>
        </div>
      </section>

      {/* Coming soon */}
      <section className="bg-bg-primary border-y border-border-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary font-sans mb-4">
            Coming soon
          </p>
          <h2
            className="font-serif font-semibold text-text-primary mb-4"
            style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: 1.15 }}
          >
            Guides and resources are on their way.
          </h2>
          <p
            className="text-md font-sans text-text-secondary leading-relaxed"
            style={{ maxWidth: "48ch" }}
          >
            We&apos;re building out dedicated content for double donor families.
            Sign up to be notified when it&apos;s ready.
          </p>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
