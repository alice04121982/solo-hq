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
              className="text-[18px] leading-[28px] mb-7 font-sans max-w-[560px]"
              style={{ color: "var(--on-teal-muted)" }}
            >
              IVF is expensive, every penny counts. That&apos;s why many people look abroad to
              undertake treatment. Our tool shows the{" "}
              <span style={{ color: "var(--on-teal)" }}>true cost</span> side by side with UK
              clinics, so you can decide with open eyes whether it is worth going overseas or if
              staying local is better for your care.
            </p>

            <p
              className="text-[18px] leading-[28px] mb-7 font-sans max-w-[471px]"
              style={{ color: "var(--on-teal-muted)" }}
            >
              We&apos;re also honest about success rates: they can be presented selectively.
              The HFEA regulates UK data, but even that has limits. We flag what&apos;s verified
              and what to question.
            </p>

            {/* Trust signals — a vertical list, sitting above the CTA */}
            <div className="flex flex-col gap-2 mb-7 max-w-[768px]">
              {TRUST_SIGNALS.map((s) => (
                <span
                  key={s}
                  className="text-sm leading-5 font-sans font-medium flex items-center gap-2"
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

            {/* Primary CTA */}
            <div>
              <a
                href="/get-started"
                className="inline-flex items-center gap-2 rounded-full text-sm font-sans font-medium px-7 py-3.5 transition-opacity duration-200 hover:opacity-90"
                style={{ background: "var(--accent)", color: "#1A3A25" }}
              >
                Get started
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Photo. From xl up it is absolutely placed to the right of — and
              overlapping — the copy, as designed; the container caps at 1280px
              so 580px is the designed width at every width above that. Below
              xl the copy column is too narrow for the overlap to clear the
              text, so the photo drops beneath it instead.
              Exported from Figma with its mask already baked in, so the
              notched silhouette needs no clip-path here. */}
          <div className="mt-12 w-full max-w-[520px] ml-auto xl:mt-0 xl:max-w-none xl:ml-0 xl:absolute xl:right-[-52px] xl:top-[162px] xl:w-[580px] pointer-events-none">
            <Image
              src="/photos/hero-family.png"
              alt="A mother playing guitar with her toddler"
              width={580}
              height={619}
              priority
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
