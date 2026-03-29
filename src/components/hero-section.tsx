"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-lavender-light pb-8 pt-12 md:pt-16">

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Nav bar */}
        <nav className="flex items-center justify-between mb-16 md:mb-24">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-navy flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-lime" />
            </div>
            <span className="text-lg font-bold text-navy tracking-tight">
              Solo HQ
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-navy/70">
            <a href="#calculator" className="hover:text-navy transition-colors">
              Cost Calculator
            </a>
            <a href="#journey" className="hover:text-navy transition-colors">
              Journey Map
            </a>
            <a href="#clinics" className="hover:text-navy transition-colors">
              Compare Clinics
            </a>
            <a href="/ivf-finder" className="hover:text-navy transition-colors">
              Clinic Finder
            </a>
          </div>
          <a
            href="/ivf-finder"
            className="rounded-full bg-navy text-warm-white px-5 py-2.5 text-sm font-semibold hover:bg-charcoal transition-colors"
          >
            Find a Clinic
          </a>
        </nav>

        {/* Hero Content */}
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-warm-white/80 backdrop-blur-sm px-4 py-1.5 mb-6 border border-card-border">
              <span className="h-2 w-2 rounded-full bg-lime-dark animate-pulse" />
              <span className="text-xs font-semibold text-navy">
                Built by solo mums, for solo mums
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-navy leading-[1.05] tracking-tight mb-4">
              Find IVF clinics
              <br />
              <span className="text-lavender-dark">near you</span>
            </h1>

            <p className="text-lg md:text-xl text-navy/70 leading-relaxed max-w-xl mb-4">
              Real pricing. Solo-friendliness ratings. Side-by-side comparisons.
              Search below — it&rsquo;s free.
            </p>

            <p className="text-sm text-navy/50">
              Also:{" "}
              <a href="#calculator" className="underline hover:text-navy transition-colors">
                real-life cost calculator
              </a>{" "}
              ·{" "}
              <a href="#journey" className="underline hover:text-navy transition-colors">
                solo journey map
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
