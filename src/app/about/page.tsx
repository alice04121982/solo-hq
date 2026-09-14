import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui";

export const metadata: Metadata = {
  title: "About KLEO Fertility | KLEO Fertility",
  description:
    "KLEO was built by people who've been through the fertility journey themselves. We know how hard it is to find honest, practical information, so we built it.",
};

export default function AboutPage() {
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
            Who we are
          </p>
          <h1
            className="font-serif font-semibold text-text-primary mb-6"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}
          >
            About KLEO Fertility
          </h1>
          <p
            className="text-md font-sans text-text-secondary leading-relaxed mb-10"
            style={{ maxWidth: "52ch" }}
          >
            KLEO was built by people who&apos;ve been through the fertility
            journey themselves. We know how hard it is to find honest, practical
            information, so we built it.
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

      {/* About sub-pages */}
      <section className="bg-bg-primary border-y border-border-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          <a
            href="/about/register"
            className="rounded-2xl bg-bg-secondary border border-border-secondary p-6 hover:border-border-brand transition-colors group"
          >
            <p className="font-serif font-semibold text-text-primary text-lg mb-2 group-hover:text-text-brand-secondary transition-colors">
              Register
            </p>
            <p className="text-sm font-sans text-text-secondary leading-relaxed">
              Join the KLEO community.
            </p>
          </a>
          <a
            href="/about/press"
            className="rounded-2xl bg-bg-secondary border border-border-secondary p-6 hover:border-border-brand transition-colors group"
          >
            <p className="font-serif font-semibold text-text-primary text-lg mb-2 group-hover:text-text-brand-secondary transition-colors">
              Press &amp; Media
            </p>
            <p className="text-sm font-sans text-text-secondary leading-relaxed">
              For journalists and media enquiries.
            </p>
          </a>
          <a
            href="/about/faqs"
            className="rounded-2xl bg-bg-secondary border border-border-secondary p-6 hover:border-border-brand transition-colors group"
          >
            <p className="font-serif font-semibold text-text-primary text-lg mb-2 group-hover:text-text-brand-secondary transition-colors">
              FAQs
            </p>
            <p className="text-sm font-sans text-text-secondary leading-relaxed">
              Common questions about KLEO.
            </p>
          </a>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
