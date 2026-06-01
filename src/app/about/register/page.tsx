import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui";

export const metadata: Metadata = {
  title: "Register | KLEO Fertility",
  description:
    "Create your free account to access personalised guidance, save clinic comparisons, and connect with the community.",
};

export default function RegisterPage() {
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
            Join KLEO
          </p>
          <h1
            className="font-serif font-semibold text-text-primary mb-6"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}
          >
            Register
          </h1>
          <p
            className="text-md font-sans text-text-secondary leading-relaxed mb-10"
            style={{ maxWidth: "52ch" }}
          >
            Create your free account to access personalised guidance, save
            clinic comparisons, and connect with the community.
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
              href="/about"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              About KLEO
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
            We&apos;re building out KLEO registration. Sign up to be notified
            when it&apos;s ready.
          </p>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
