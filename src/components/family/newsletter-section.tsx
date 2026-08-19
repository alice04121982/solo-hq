"use client";

import { motion } from "framer-motion";
import { ShapeMark } from "../shapes";
import { ArrowRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const TEAL = "var(--teal)";
const TEAL_SOFT = "rgba(0, 83, 83, 0.6)";

export function NewsletterSection({ familyLabel }: { familyLabel: string }) {
  return (
    <section className="border-y border-border" style={{ background: "#FAFAFA" }}>
      <div className="mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p
              className="text-[13px] font-[600] uppercase tracking-[2px] font-sans flex items-center gap-2 mb-4"
              style={{ color: TEAL }}
            >
                <ShapeMark name="cross" size={14} style={{ color: "var(--lavender)" }} />
              Stay informed
            </p>
            <h2
              className="font-sans font-bold mb-4"
              style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1, color: TEAL }}
            >
              The real guide to building your family.
            </h2>
            <p
              className="text-sm font-sans leading-relaxed"
              style={{ maxWidth: "44ch", color: TEAL }}
            >
              Get clinic comparison updates, new guides for {familyLabel.toLowerCase()}, and honest stories from people who&apos;ve done this, delivered once a fortnight, no noise.
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
                className="flex-1 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-sans text-teal placeholder:text-muted focus:outline-none focus:border-teal/40 transition-colors"
              />
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-on-accent px-7 py-3.5 text-sm font-sans font-medium hover:bg-accent-dark transition-colors duration-200 shrink-0">
                Subscribe
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="text-xs font-sans pl-2" style={{ color: TEAL_SOFT }}>
              No spam. No toxic positivity. Just the real stuff, fortnightly.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
