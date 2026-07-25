"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "./site-nav";

const EASE = [0.16, 1, 0.3, 1] as const;

const FAMILY_TYPE_PILLS = [
  { label: "Solo mums by choice", slug: "solo-mum" },
  { label: "Same-sex female couples", slug: "same-sex-female" },
  { label: "Same-sex male couples", slug: "same-sex-male" },
  { label: "Single men by choice", slug: "single-dad" },
  { label: "Heterosexual couples", slug: "heterosexual-couple" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <SiteNav />

        <div className="py-20 md:py-28 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="max-w-4xl"
          >
            <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-6 font-sans">
              IVF clinic comparison &nbsp;·&nbsp; All family types &nbsp;·&nbsp; UK &amp; abroad
            </p>

            <h1
              className="font-serif font-bold text-foreground mb-8"
              style={{
                fontSize: "clamp(3rem, 7vw, 6rem)",
                lineHeight: 1.01,
                fontVariationSettings: "'wght' 800",
              }}
            >
              IVF, made clear.
              <br />
              <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
                For every family.
              </em>
            </h1>

            <p
              className="text-[17px] text-muted leading-[1.65] mb-10 font-sans"
              style={{ maxWidth: "58ch" }}
            >
              Drowning in clinic brochures, conflicting success-rate claims, and unexplained acronyms? Flying Solo cuts through the noise — giving you clear, honest data to compare clinics at home and abroad, understand your treatment options, and take your next step with confidence.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-14">
              <a
                href="/ivf-finder"
                className="inline-flex items-center gap-2 rounded-full bg-accent text-foreground px-8 py-3.5 text-sm font-sans font-medium hover:bg-accent-dark transition-colors duration-200"
              >
                Compare clinics
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="/families"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/20 text-foreground px-8 py-3.5 text-sm font-sans hover:bg-foreground hover:text-background transition-colors duration-200"
              >
                Find your path
              </a>
            </div>
          </motion.div>

          {/* Family type pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="flex flex-wrap gap-3"
          >
            <span className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted font-sans self-center mr-2">
              For
            </span>
            {FAMILY_TYPE_PILLS.map((type) => (
              <a
                key={type.slug}
                href={`/families/${type.slug}`}
                className="inline-block rounded-full border border-border text-xs font-sans text-muted px-4 py-1.5 hover:border-foreground/40 hover:text-foreground transition-colors duration-150"
              >
                {type.label}
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Accent bar */}
      <div className="h-px bg-border" />
    </section>
  );
}
