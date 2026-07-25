"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CTASection() {
  return (
    <section style={{ background: "#D43878" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-2xl"
        >
          <p className="text-[11px] font-[500] uppercase tracking-[0.15em] font-sans mb-6" style={{ color: "#f9c6da" }}>
            Join the community
          </p>

          <h2
            className="font-sans font-medium mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.1, color: "#fff" }}
          >
            You&rsquo;re not doing this alone.
            <br />
            <span style={{ color: "#C5E600" }}>
              Even if you&rsquo;re doing it solo.
            </span>
          </h2>

          <p className="text-[17px] font-sans leading-relaxed mb-10" style={{ maxWidth: "50ch", color: "#f9c6da" }}>
            Join thousands of solo mums by choice who are navigating the journey
            with honest information, real-world costs, and a community that
            actually gets it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-sans font-medium transition-opacity duration-200 hover:opacity-90"
              style={{ background: "#C5E600", color: "#1A0810" }}
            >
              Join the Waitlist
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              className="inline-flex items-center justify-center gap-2 rounded-full border px-8 py-3.5 text-sm font-sans transition-colors duration-200 hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.35)", color: "#fff" }}
            >
              Follow Our Journey
            </button>
          </div>

          <p className="text-xs font-sans mt-6" style={{ color: "rgba(255,255,255,0.45)" }}>
            No spam. No toxic positivity. Just the real stuff.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
