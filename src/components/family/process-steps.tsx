"use client";

import { motion } from "framer-motion";
import type { ProcessStep } from "@/lib/family-types";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <section className="bg-background-alt border-y border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-14"
        >
          <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-3 font-sans">
            Step by step
          </p>
          <h2
            className="font-sans font-medium text-foreground"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)", lineHeight: 1.1 }}
          >
            Your complete guide
            <br />
            <span style={{ color: "var(--accent)" }}>
              from first steps to family.
            </span>
          </h2>
        </motion.div>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.04, ease: EASE }}
              className="grid grid-cols-1 md:grid-cols-[5rem_1fr] gap-x-8 gap-y-3 py-8 border-t border-border"
            >
              <div className="flex md:justify-end pt-0.5">
                <span
                  className="font-serif text-muted leading-none"
                  style={{ fontSize: "2rem", fontVariationSettings: "'wght' 300" }}
                >
                  {String(step.number).padStart(2, "0")}
                </span>
              </div>
              <div>
                <h3
                  className="font-sans font-medium text-foreground mb-3"
                  style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)", lineHeight: 1.25 }}
                >
                  {step.title}
                </h3>
                <p className="text-sm font-sans text-muted leading-relaxed" style={{ maxWidth: "70ch" }}>
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
