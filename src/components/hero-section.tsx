"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "./site-nav";
import { HeroShapeGrid } from "./hero-shape-grid";

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
      <div className="relative mx-auto px-6 md:px-12 lg:px-16">
        <SiteNav theme="dark" />

        {/* Copy leads in the DOM so the page reads copy-first, but the grid
            is ordered above it below xl and beside it from xl — the two
            columns sit side by side rather than overlapping, so the grid
            can carry photographs without crowding the headline. */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:gap-12 pt-4 pb-20 md:pb-28 xl:pt-20 xl:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="order-2 xl:order-1 xl:flex-1"
          >
            <h1
              className="font-sans font-bold mb-7"
              style={{
                fontSize: "clamp(2.8rem, 5.5vw, 4.6rem)",
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
              Clinics abroad often look cheaper until you add flights and hotels. We show the{" "}
              <span style={{ color: "var(--on-teal)" }}>true cost</span> beside UK clinics, and
              flag which success rates are verified.
            </p>

            {/* Trust signals — a vertical list, sitting above the CTA */}
            <div className="flex flex-col gap-2 mb-7">
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

          <HeroShapeGrid className="order-1 xl:order-2 w-full max-w-[480px] mx-auto mb-12 xl:mb-0 xl:mx-0 xl:w-[560px] xl:max-w-none xl:shrink-0" />
        </div>
      </div>
    </section>
  );
}
