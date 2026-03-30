"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Logo } from "./logo";

export function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto rounded-[32px] bg-lavender-light p-10 md:p-16 text-center"
      >
        <div className="relative">
          <div className="inline-flex items-center justify-center mb-6">
            <Logo height={72} />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-navy mb-4 leading-tight">
            You&rsquo;re not doing this alone.
            <br />
            <span className="text-lavender-dark">Even if you&rsquo;re doing it solo.</span>
          </h2>

          <p className="text-navy/60 max-w-lg mx-auto mb-8 leading-relaxed">
            Join thousands of solo mums by choice who are navigating the journey
            with honest information, real-world costs, and a community that
            actually gets it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-navy text-white px-8 py-3.5 text-sm font-bold hover:bg-charcoal transition-colors">
              Join the Waitlist
              <ArrowRight className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/20 text-navy px-8 py-3.5 text-sm font-semibold hover:bg-navy/5 transition-colors">
              Follow Our Journey
            </button>
          </div>

          <p className="text-navy/30 text-xs mt-6">
            No spam. No toxic positivity. Just the real stuff.
          </p>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-card-border flex flex-col sm:flex-row items-center justify-between gap-4 px-4">
        <div className="flex items-center">
          <Logo height={36} />
        </div>
        <p className="text-xs text-muted">
          &copy; {new Date().getFullYear()} Flying Solo. Made with grit and grace in the UK.
        </p>
      </div>
    </section>
  );
}
