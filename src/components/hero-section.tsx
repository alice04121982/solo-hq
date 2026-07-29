"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "./site-nav";

const EASE = [0.16, 1, 0.3, 1] as const;

const TRUST_SIGNALS = [
  "True cost: flights + hotels included",
  "Success rates verified where possible",
  "HFEA-licensed UK clinics flagged",
  "Donor sperm & egg options compared",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--teal)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <SiteNav theme="dark" />

        <div className="relative pt-16 pb-20 md:pt-24 md:pb-28 lg:pt-32 lg:pb-32">
          {/* Photo — sits to the right of, and overlapping, the copy on lg+.
              Exported from Figma with its mask already baked in, so the notched
              silhouette needs no clip-path here. */}
          <div className="lg:absolute lg:right-[-42px] lg:top-32 lg:w-[580px] lg:h-[619px] mb-12 lg:mb-0 pointer-events-none">
            <Image
              src="/photos/hero-family.png"
              alt="A mother playing guitar with her toddler"
              width={580}
              height={619}
              priority
              className="w-full h-auto object-contain"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative"
          >
            <h1
              className="font-sans font-bold mb-7 max-w-[768px]"
              style={{
                fontSize: "clamp(2.8rem, 6.5vw, 5.2rem)",
                lineHeight: 1.04,
                color: "var(--on-teal)",
              }}
            >
              IVF made clearer, for every kind of family.
            </h1>

            <p
              className="text-[17px] leading-[1.65] mb-7 font-sans max-w-[560px]"
              style={{ color: "var(--on-teal-muted)" }}
            >
              Clinics in Spain, Greece, and the Czech Republic often look cheaper — until you add
              flights, hotels, and multiple trips. Our tool shows the{" "}
              <span style={{ color: "var(--on-teal)" }}>true cost</span> side by side with UK
              clinics, so you can decide with open eyes.
            </p>

            <p
              className="text-[15px] leading-[1.6] mb-7 font-sans max-w-[471px]"
              style={{ color: "var(--on-teal-muted)" }}
            >
              We&apos;re also honest about success rates: they can be presented selectively.
              The HFEA regulates UK data, but even that has limits. We flag what&apos;s verified
              and what to question.
            </p>

            {/* Primary CTA */}
            <div className="mb-7">
              <a
                href="/get-started"
                className="inline-flex items-center gap-2 rounded-full text-sm font-sans font-medium px-7 py-3.5 transition-opacity duration-200 hover:opacity-90"
                style={{ background: "var(--accent)", color: "#1A3A25" }}
              >
                Get started
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 max-w-[768px]">
              {TRUST_SIGNALS.map((s) => (
                <span
                  key={s}
                  className="text-[11px] leading-[1.45] font-sans flex items-center gap-2"
                  style={{ color: "var(--on-teal-muted)" }}
                >
                  <span
                    className="h-1 w-1 rounded-full inline-block shrink-0"
                    style={{ background: "var(--accent)" }}
                  />
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
