import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui";

export const metadata: Metadata = {
  title: "Legal | KLEO Fertility",
  description:
    "Privacy policy, terms of use, cookie policy, and medical disclaimer.",
};

const LEGAL_DOCS = [
  {
    label: "Privacy Policy",
    note: "How we collect, use, and protect your data.",
  },
  {
    label: "Terms of Use",
    note: "The rules that govern your use of KLEO Fertility.",
  },
  {
    label: "Cookie Policy",
    note: "What cookies we use and why.",
  },
  {
    label: "Medical Disclaimer",
    note: "KLEO provides information, not medical advice. Always consult a qualified professional.",
  },
];

export default function LegalsPage() {
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
            Legals
          </p>
          <h1
            className="font-serif font-semibold text-text-primary mb-6"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}
          >
            Legal
          </h1>
          <p
            className="text-md font-sans text-text-secondary leading-relaxed mb-10"
            style={{ maxWidth: "52ch" }}
          >
            Privacy policy, terms of use, cookie policy, and medical disclaimer.
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

      {/* Legal documents list */}
      <section className="bg-bg-primary border-y border-border-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16">
          {LEGAL_DOCS.map((item, i, arr) => (
            <div
              key={item.label}
              className={`py-6 ${i < arr.length - 1 ? "border-b border-border-secondary" : ""}`}
            >
              <p className="font-serif font-semibold text-text-primary text-lg mb-1">
                {item.label}
              </p>
              <p className="text-sm font-sans text-text-secondary">{item.note}</p>
              <p className="text-xs font-sans text-text-quaternary mt-2">
                Full document coming soon.
              </p>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </main>
  );
}
