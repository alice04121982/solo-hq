"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function NewsletterSection({ familyLabel }: { familyLabel: string }) {
  return (
    <section className="bg-background-alt border-y border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
              Stay informed
            </p>
            <h2
              className="font-sans font-bold mb-4"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1, color: "#1A3A25" }}
            >
              The{" "}
              <span style={{ color: "var(--accent)" }}>
                real
              </span>{" "}
              guide to building your family.
            </h2>
            <p className="text-sm font-sans text-muted leading-relaxed" style={{ maxWidth: "44ch" }}>
              Get clinic comparison updates, new guides for {familyLabel.toLowerCase()}, and honest stories from people who&apos;ve done this — delivered once a fortnight, no noise.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-sans text-foreground placeholder:text-muted focus:outline-none focus:border-foreground/40 transition-colors"
              />
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-[#1A3A25] px-7 py-3.5 text-sm font-sans font-medium hover:bg-accent-dark transition-colors duration-200 shrink-0">
                Subscribe
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="text-xs font-sans text-muted/60 pl-2">
              No spam. No toxic positivity. Just the real stuff, fortnightly.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
