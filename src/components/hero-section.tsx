"use client";

import { motion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import Image from "next/image";
import { SiteNav } from "./site-nav";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  return (
    <section className="relative bg-background">
      {/* Nav — minimal side padding, no centering cap */}
      <div className="px-6 md:px-10">
        <SiteNav />
      </div>

      {/* Hero grid — text left, image right flush to viewport edge */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_45vw] min-h-[88vh]">

        {/* Left — copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE }}
          className="flex flex-col justify-center px-6 md:px-10 py-16 lg:py-24"
        >
          <p className="text-[11px] font-[500] uppercase tracking-[0.18em] text-muted mb-7 font-sans">
            Solo mums by choice
          </p>

          <h1
            className="font-serif font-semibold text-foreground mb-8"
            style={{
              fontSize: "clamp(2.25rem, 4.5vw, 4rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.018em",
            }}
          >
            Building Your
            <br />
            Family{" "}
            <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
              on Your
              <br />
              Own Terms
            </em>
          </h1>

          <p
            className="text-[17px] text-muted leading-[1.65] mb-10 font-sans"
            style={{ maxWidth: "42ch" }}
          >
            Your comprehensive guide to solo motherhood. From choosing a donor
            and navigating IVF to prepping for birth and thriving as a solo
            parent by choice.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/clinics"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-white px-7 py-3 text-[15px] font-sans font-medium hover:bg-primary-dark transition-colors duration-200"
            >
              Find a clinic
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <button className="inline-flex items-center gap-2.5 rounded-full border border-foreground/20 text-foreground px-7 py-3 text-[15px] font-sans font-medium hover:border-primary hover:text-primary transition-colors duration-200">
              <span className="h-5 w-5 rounded-full bg-accent/12 flex items-center justify-center">
                <Play className="h-2.5 w-2.5 text-accent fill-accent" />
              </span>
              Alice&rsquo;s story
            </button>
          </div>
        </motion.div>

        {/* Right — image, no rounding, flush to viewport right edge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
          className="relative overflow-hidden"
          style={{ minHeight: "420px" }}
        >
          <Image
            src="/images/hero-main.jpg"
            alt="Ultrasound scan among fairy lights and soft textures — the beginning of the solo motherhood journey"
            fill
            className="object-cover"
            style={{ filter: "saturate(0.9) sepia(0.05)" }}
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
