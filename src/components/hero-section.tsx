"use client";

import { motion } from "framer-motion";
import { SiteNav } from "./site-nav";
import { HomeLocationSearch } from "./home-location-search";

const EASE = [0.16, 1, 0.3, 1] as const;

const TRUST_SIGNALS = [
  "True cost: flights + hotels included",
  "Success rates verified where possible",
  "HFEA-licensed UK clinics flagged",
  "Donor sperm & egg options compared",
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
            <span className="inline-block text-[9px] font-[700] uppercase tracking-[0.16em] font-sans rounded-full px-3 py-1 mb-6" style={{ background: "#C5E600", color: "#1A0810" }}>
              IVF clinic comparison &nbsp;·&nbsp; All family types &nbsp;·&nbsp; UK &amp; worldwide
            </span>

            <h1
              className="font-sans font-medium text-foreground mb-6"
              style={{
                fontSize: "clamp(2.8rem, 6.5vw, 5.2rem)",
                lineHeight: 1.04,
              }}
            >
              Don&apos;t just pick a clinic.
              <br />
              Know the real picture.
            </h1>

            <p
              className="text-[17px] text-muted leading-[1.65] mb-4 font-sans"
              style={{ maxWidth: "56ch" }}
            >
              Clinics in Spain, Greece, and the Czech Republic often look cheaper — until you add
              flights, hotels, and multiple trips. Our tool shows the{" "}
              <span>true cost</span> side by side with UK clinics, so you can decide with open eyes.
            </p>

            <p
              className="text-[15px] text-muted leading-[1.6] mb-10 font-sans"
              style={{ maxWidth: "54ch" }}
            >
              We&apos;re also honest about success rates: they can be presented selectively.
              The HFEA regulates UK data, but even that has limits. We flag what&apos;s verified
              and what to question.
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
