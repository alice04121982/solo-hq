"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "./site-nav";
import { HeroShapes } from "./hero-shapes";

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
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <SiteNav theme="dark" />

        <div className="relative pb-20 md:pb-28 xl:pt-32 xl:pb-32">
          {/* The hero used to lead with a family photograph, but a photo can
              only ever show one kind of family and the site is for all of
              them — so it leads with the shape language instead. Below xl the
              composition sits above the copy; from xl it takes the photo's
              old spot to the right, bleeding slightly off the container. */}
          <HeroShapes className="mx-auto mt-6 mb-10 w-[72vw] max-w-[400px] xl:hidden" />

          <HeroShapes className="hidden xl:block xl:absolute xl:right-[-52px] xl:top-[130px] xl:w-[560px] pointer-events-none" />

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

            {/* Kept under 30 words — the trust signals below carry the detail
                this used to spell out. */}
            <p
              className="text-[18px] leading-[28px] mb-7 font-sans max-w-[560px]"
              style={{ color: "var(--on-teal-muted)" }}
            >
              Clinics abroad often look cheaper — until you add flights and hotels. We show the{" "}
              <span style={{ color: "var(--on-teal)" }}>true cost</span> beside UK clinics, and
              flag which success rates are verified.
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
        </div>
      </div>
    </section>
  );
}
