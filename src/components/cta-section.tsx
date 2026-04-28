"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Logo } from "./logo";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CTASection() {
  return (
    <section className="bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-2xl"
        >
          <p className="text-[12px] font-[500] uppercase tracking-[0.15em] text-muted mb-6 font-sans">
            Join the community
          </p>

          <h2
            className="font-serif font-semibold text-foreground mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.1 }}
          >
            You&rsquo;re not doing this alone.
            <br />
            <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
              Even if you&rsquo;re doing it solo.
            </em>
          </h2>

          <p className="text-[17px] font-sans text-muted leading-relaxed mb-10" style={{ maxWidth: "50ch" }}>
            Join thousands of solo mums by choice who are navigating the journey
            with honest information, real-world costs, and a community that
            actually gets it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-white px-8 py-3.5 text-sm font-sans hover:bg-primary-dark transition-colors duration-200">
              Join the Club
              <ArrowRight className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/20 text-foreground px-8 py-3.5 text-sm font-sans hover:border-primary hover:text-primary transition-colors duration-200">
              Follow Our Journey
            </button>
          </div>

          <p className="text-xs font-sans text-muted/60 mt-6">
            No spam. No toxic positivity. Just the real stuff.
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Logo height={32} />
          <p className="text-xs font-sans text-muted">
            &copy; {new Date().getFullYear()} Flying Solo. Made with grit and grace in the UK.
          </p>
        </div>
      </div>
    </section>
  );
}
