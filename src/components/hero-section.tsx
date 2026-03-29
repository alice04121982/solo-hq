"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white border-b border-card-border">

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Nav bar */}
        <nav className="flex items-center justify-between py-5">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-navy flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-lime" />
            </div>
            <span className="text-lg font-bold text-navy tracking-tight">
              Solo HQ
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-navy/50">
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
            className="inline-flex items-center gap-2 rounded-full bg-navy text-white px-5 py-2.5 text-sm font-semibold hover:bg-charcoal transition-colors"
          >
            Find a Clinic
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </nav>

        {/* Hero Content */}
        <div className="py-16 md:py-24 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-lavender-light px-4 py-1.5 mb-6">
              <span className="h-2 w-2 rounded-full bg-lavender-dark" />
              <span className="text-xs font-semibold text-lavender-dark">
                Built by solo mums, for solo mums
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-navy leading-[1.05] tracking-tight mb-6">
              Find IVF clinics
              <br />
              <span className="text-lavender-dark">near you</span>
            </h1>

            <p className="text-lg md:text-xl text-navy/60 leading-relaxed max-w-xl mb-6">
              Real pricing. Solo-friendliness ratings. Side-by-side comparisons.
              Search below — it&rsquo;s free.
            </p>

            <p className="text-sm text-navy/40">
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
