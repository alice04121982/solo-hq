import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { buttonVariants } from "@/components/ui";

export const metadata: Metadata = {
  title: "Press & Media | KLEO Fertility",
  description:
    "For journalists, podcasters, and media professionals. Get in touch for comment, data, or interview requests.",
};

export default function PressPage() {
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
            Media enquiries
          </p>
          <h1
            className="font-serif font-semibold text-text-primary mb-6"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}
          >
            Press &amp; Media
          </h1>
          <p
            className="text-md font-sans text-text-secondary leading-relaxed mb-10"
            style={{ maxWidth: "52ch" }}
          >
            For journalists, podcasters, and media professionals. Get in touch
            for comment, data, or interview requests.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:press@kleofertility.com"
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              Contact press team
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
            We&apos;re building out the press kit. Sign up to be notified when
            it&apos;s ready.
          </p>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
