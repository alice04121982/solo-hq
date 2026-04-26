"use client";

import { motion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import Image from "next/image";
import { SiteNav } from "./site-nav";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <SiteNav />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-24 md:py-32">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-6 font-sans">
              Solo mums by choice &nbsp;·&nbsp; UK guide
            </p>

            <h1
              className="font-serif font-normal text-foreground mb-8"
              style={{
                fontSize: "clamp(2.75rem, 6vw, 5.5rem)",
                lineHeight: 1.05,
                fontOpticalSizing: "auto" as never,
              }}
            >
              Building Your Family
              <br />
              <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
                on Your Own Terms
              </em>
            </h1>

            <p className="text-[17px] text-muted leading-[1.65] mb-10 font-sans" style={{ maxWidth: "52ch" }}>
              Your comprehensive guide to solo motherhood. From choosing a donor
              and navigating IVF to prepping for birth and thriving as a solo
              parent by choice.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button className="inline-flex items-center gap-2.5 rounded-full border border-foreground/20 text-foreground px-8 py-3.5 text-sm font-sans font-medium hover:bg-foreground hover:text-background transition-colors duration-200">
                <span className="h-6 w-6 rounded-full bg-accent/15 flex items-center justify-center">
                  <Play className="h-2.5 w-2.5 text-accent fill-accent" />
                </span>
                Alice&rsquo;s story
              </button>
              <a
                href="/ivf-finder"
                className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-8 py-3.5 text-sm font-sans font-medium hover:bg-accent transition-colors duration-200"
              >
                Find a clinic
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Right — image */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            className="relative h-[480px] lg:h-[580px] rounded-2xl overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=900&q=80"
              alt="Mother and child sharing a joyful moment"
              fill
              className="object-cover"
              style={{ filter: "saturate(0.9) sepia(0.05)" }}
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
