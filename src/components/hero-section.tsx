"use client";

import { motion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import Image from "next/image";
import { SiteNav } from "./site-nav";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background border-b border-card-border">

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <SiteNav />

        {/* Two-column hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16 md:py-24">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-normal text-navy leading-[0.95] tracking-tight mb-6">
              Building Your Family
              <br />
              on Your Own Terms
            </h1>

            <p className="text-lg text-navy/60 leading-relaxed max-w-lg mb-10">
              Your comprehensive guide to solo motherhood. From choosing a donor
              and navigating IVF to prepping for birth and thriving as a solo
              parent by choice.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button className="inline-flex items-center gap-2.5 rounded-full border border-navy/20 text-navy px-6 py-3 text-sm font-semibold hover:bg-navy/5 transition-colors">
                <span className="h-7 w-7 rounded-full bg-lavender-light flex items-center justify-center">
                  <Play className="h-3 w-3 text-lavender-dark fill-lavender-dark" />
                </span>
                Alice&rsquo;s story
              </button>
              <a
                href="/ivf-finder"
                className="inline-flex items-center gap-2 rounded-full bg-navy text-white px-6 py-3 text-sm font-semibold hover:bg-charcoal transition-colors"
              >
                Find a clinic
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Right — image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative h-[480px] lg:h-[560px] rounded-3xl overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=900&q=80"
              alt="Mother and child sharing a joyful moment"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
