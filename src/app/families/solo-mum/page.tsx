import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui";

export const metadata: Metadata = {
  title: "Solo Mum families | KLEO Fertility",
  description:
    "You've chosen to build your family on your own terms. From your first consultation to thriving as a solo mum — we've got you.",
};

export default function SoloMumPage() {
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
            Going solo by choice
          </p>
          <h1
            className="font-serif font-semibold text-text-primary mb-6"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}
          >
            Solo Mum families
          </h1>
          <p
            className="text-md font-sans text-text-secondary leading-relaxed mb-10"
            style={{ maxWidth: "52ch" }}
          >
            You&apos;ve chosen to build your family on your own terms. From your
            first consultation to thriving as a solo mum — we&apos;ve got you.
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
              href="/families"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              All family types
            </a>
          </div>
        </div>
      </section>

      {/* Donor conception callout */}
      <section className="bg-bg-secondary border-b border-border-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-tertiary mb-2 font-sans">
              Related
            </p>
            <p
              className="font-serif font-semibold text-text-primary"
              style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)" }}
            >
              Using donor sperm or eggs? Visit our Donor Conception section.
            </p>
          </div>
          <a
            href="/donor-conception"
            className={buttonVariants({ variant: "secondary", size: "md" })}
          >
            Donor Conception <ArrowRight className="h-3.5 w-3.5" />
          </a>
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
            We&apos;re building out dedicated content for solo mum families.
            Sign up to be notified when it&apos;s ready.
          </p>
        </div>
      </section>

      {/* Solo Navigator teaser */}
      <section className="bg-bg-secondary border-b border-border-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-tertiary mb-2 font-sans">
              Solo Navigator
            </p>
            <p
              className="font-serif font-semibold text-text-primary"
              style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)" }}
            >
              Track every stage of your solo IVF journey — from considering to
              thriving.
            </p>
          </div>
          <a
            href="/solo-navigator"
            className={buttonVariants({ variant: "primary", size: "md" })}
          >
            Open Solo Navigator <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
