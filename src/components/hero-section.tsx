"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
    <section className="relative overflow-hidden" style={{ background: "#3D0D1B" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <SiteNav theme="dark" />

        <div className="py-20 md:py-28 lg:py-32 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h1
              className="font-sans font-medium mb-6"
              style={{
                fontSize: "clamp(2.8rem, 6.5vw, 5.2rem)",
                lineHeight: 1.04,
                color: "#f9c6da",
              }}
            >
              IVF made clearer, for every kind of family.
            </h1>

            <p
              className="text-[17px] leading-[1.65] mb-4 font-sans"
              style={{ maxWidth: "56ch", color: "#c4a0ae" }}
            >
              Clinics in Spain, Greece, and the Czech Republic often look cheaper — until you add
              flights, hotels, and multiple trips. Our tool shows the{" "}
              <span style={{ color: "#f9c6da" }}>true cost</span> side by side with UK clinics, so you can decide with open eyes.
            </p>

            <p
              className="text-[15px] leading-[1.6] mb-10 font-sans"
              style={{ maxWidth: "54ch", color: "#c4a0ae" }}
            >
              We&apos;re also honest about success rates: they can be presented selectively.
              The HFEA regulates UK data, but even that has limits. We flag what&apos;s verified
              and what to question.
            </p>

            {/* Location search */}
            <div className="mb-5 max-w-xl">
              <HomeLocationSearch onDark />
            </div>

            {/* Primary CTA */}
            <div className="mb-8">
              <a
                href="/get-started"
                className="inline-flex items-center gap-2 rounded-full text-sm font-sans font-medium px-7 py-3.5 transition-opacity duration-200 hover:opacity-90"
                style={{ background: "#C5E600", color: "#1A3A25" }}
              >
                Find clinics matched to you
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {TRUST_SIGNALS.map((s) => (
                <span key={s} className="text-xs font-sans flex items-center gap-2" style={{ color: "#c4a0ae" }}>
                  <span className="h-1 w-1 rounded-full inline-block" style={{ background: "#C5E600" }} />
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
