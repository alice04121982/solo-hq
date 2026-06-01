import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui";

export const metadata: Metadata = {
  title: "Families | KLEO Fertility",
  description:
    "Guidance for every path to parenthood — solo parents, same-sex families, donor conception, and more.",
};

const FAMILY_TYPES = [
  {
    label: "Solo Mum families",
    href: "/families/solo-mum",
    description:
      "Going it alone by choice. From sperm donation and IVF to pregnancy, birth, and life as a solo mum.",
  },
  {
    label: "Solo Dad families",
    href: "/families/solo-dad",
    description:
      "Single men building a family through surrogacy, adoption, or donor conception.",
  },
  {
    label: "Two mum families",
    href: "/families/two-mum",
    description:
      "Same-sex female couples — reciprocal IVF, sperm donation, and everything in between.",
  },
  {
    label: "Two dad families",
    href: "/families/two-dad",
    description:
      "Same-sex male couples navigating surrogacy, adoption, and donor conception.",
  },
  {
    label: "Mum & Dad families",
    href: "/families/mum-and-dad",
    description:
      "Couples using donor conception — egg donation, sperm donation, double donor, and embryo donation.",
  },
  {
    label: "Stories",
    href: "/families/stories",
    description:
      "Real journeys from real families. Every path, every outcome, shared honestly.",
  },
];

export default function FamiliesPage() {
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
            Every family type
          </p>
          <h1
            className="font-serif font-semibold text-text-primary mb-6"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}
          >
            Families
          </h1>
          <p
            className="text-md font-sans text-text-secondary leading-relaxed mb-10"
            style={{ maxWidth: "52ch" }}
          >
            Guidance for every path to parenthood — solo parents, same-sex
            families, donor conception, and more.
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
              Donor conception
            </a>
          </div>
        </div>
      </section>

      {/* Family type cards */}
      <section className="bg-bg-primary border-y border-border-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FAMILY_TYPES.map((card) => (
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

      <CTASection />
    </main>
  );
}
