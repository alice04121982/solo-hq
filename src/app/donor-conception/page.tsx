import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui";

export const metadata: Metadata = {
  title: "Donor Conception | KLEO Fertility",
  description:
    "Whether you're using donor sperm, donor eggs, or both, you'll find clear, honest guidance on every aspect of donor conception.",
};

const DONOR_TYPES = [
  {
    label: "Sperm donation",
    href: "/donor-conception/sperm-donation",
    description:
      "Understanding sperm donation: choosing a donor, open-ID donors, legal implications, and what it means for your child.",
  },
  {
    label: "Egg donation",
    href: "/donor-conception/egg-donation",
    description:
      "When using donor eggs is the right choice: finding a donor, the process, and what to expect emotionally and practically.",
  },
  {
    label: "Double donor / embryo",
    href: "/donor-conception/double-donor",
    description:
      "Using both donor sperm and donor eggs, or a donated embryo. Everything you need to know about double donor conception.",
  },
];

const RELEVANT_FAMILIES = [
  { label: "Solo Mum families", href: "/families/solo-mum" },
  { label: "Solo Dad families", href: "/families/solo-dad" },
  { label: "Two mum families", href: "/families/two-mum" },
  { label: "Two dad families", href: "/families/two-dad" },
  { label: "Mum & Dad families", href: "/families/mum-and-dad" },
];

export default function DonorConceptionPage() {
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
            A guide to donor conception
          </p>
          <h1
            className="font-serif font-semibold text-text-primary mb-6"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}
          >
            Donor Conception
          </h1>
          <p
            className="text-md font-sans text-text-secondary leading-relaxed mb-10"
            style={{ maxWidth: "52ch" }}
          >
            Whether you&apos;re using donor sperm, donor eggs, or both, you&apos;ll find clear,
            honest guidance on every aspect of donor conception.
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

      {/* Donor type cards */}
      <section className="bg-bg-primary border-y border-border-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DONOR_TYPES.map((card) => (
              <a
                key={card.href}
                href={card.href}
                className="rounded-2xl bg-bg-primary border border-border-secondary p-6 hover:border-border-brand transition-colors group"
              >
                <p className="font-serif font-semibold text-text-primary text-lg mb-2 group-hover:text-text-brand-secondary transition-colors">
                  {card.label}
                </p>
                <p className="text-sm font-sans text-text-secondary leading-relaxed mb-4">
                  {card.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-sans text-text-brand-secondary font-medium">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Relevant families */}
      <section className="bg-bg-secondary border-b border-border-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-tertiary mb-4 font-sans">
            Relevant for
          </p>
          <p
            className="font-serif font-semibold text-text-primary mb-6"
            style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)" }}
          >
            Donor conception is part of many families&apos; journeys.
          </p>
          <div className="flex flex-wrap gap-3">
            {RELEVANT_FAMILIES.map((f) => (
              <a
                key={f.href}
                href={f.href}
                className={buttonVariants({ variant: "secondary", size: "sm" })}
              >
                {f.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
