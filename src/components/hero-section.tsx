"use client";

import { motion } from "framer-motion";
import { SiteNav } from "./site-nav";
import { HomeLocationSearch } from "./home-location-search";

const EASE = [0.16, 1, 0.3, 1] as const;

const TRUST_SIGNALS = [
  "400+ HFEA-licensed clinics",
  "UK & abroad compared",
  "6 treatment types",
  "5 age brackets",
];

export function HeroSection() {
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <SiteNav />

        <div className="py-20 md:py-28 lg:py-32 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-6 font-sans">
              IVF clinic comparison &nbsp;·&nbsp; All family types &nbsp;·&nbsp; UK &amp; abroad
            </p>

            <h1
              className="font-serif font-bold text-foreground mb-6"
              style={{
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                lineHeight: 1.01,
                fontVariationSettings: "'wght' 800",
              }}
            >
              Find your clinic.
              <br />
              <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
                Compare everything.
              </em>
            </h1>

            <p
              className="text-[17px] text-muted leading-[1.65] mb-10 font-sans"
              style={{ maxWidth: "54ch" }}
            >
              Enter your postcode below to compare IVF clinics near you — success rates by age, treatment types, solo- and LGBTQ+-friendliness, and real costs. UK clinics and abroad, side by side.
            </p>

            {/* Location search */}
            <div className="mb-8 max-w-xl">
              <HomeLocationSearch />
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {TRUST_SIGNALS.map((s) => (
                <span key={s} className="text-xs font-sans text-muted flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-accent inline-block" />
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="h-px bg-border" />
    </section>
  );
}
