"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShapeMark } from "../shapes";
import { ArrowRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const TEAL = "var(--teal)";

export function ClinicSection({ clinicNote }: { clinicNote: string }) {
  return (
    <section className="bg-background border-b border-border">
      <div className="mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-3xl"
        >
          <p
            className="text-[13px] font-[600] uppercase tracking-[2px] font-sans flex items-center gap-2 mb-4"
            style={{ color: TEAL }}
          >
            <ShapeMark name="egg" size={14} style={{ color: "var(--lavender)" }} />
            Clinic comparison
          </p>
          <h2
            className="font-sans font-bold mb-4"
            style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1, color: TEAL }}
          >
            Find the right clinic
            <br />
            for your family.
          </h2>
          <p
            className="text-sm font-sans leading-relaxed mb-8"
            style={{ maxWidth: "48ch", color: TEAL }}
          >
            {clinicNote}
          </p>

          <Link
            href="/ivf-finder"
            className="inline-flex items-center gap-2 rounded-full bg-accent text-on-accent px-8 py-3.5 text-sm font-sans font-medium hover:bg-accent-dark transition-colors duration-200"
          >
            Open comparison tool
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
