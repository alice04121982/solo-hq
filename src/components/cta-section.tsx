"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CTASection() {
  return (
    <section style={{ background: "#F0A8C4" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-0">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="w-full lg:w-[672px] shrink-0"
          >
            <p
              className="text-[11px] font-[500] uppercase font-sans mb-6"
              style={{ color: "var(--teal)", letterSpacing: "1.65px" }}
            >
              Join the community
            </p>

            <h2
              className="font-sans font-bold mb-6"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                lineHeight: 1.1,
                letterSpacing: "-1.2px",
                color: "var(--teal)",
              }}
            >
              You&rsquo;re not doing this alone. Even if you&rsquo;re doing it solo.
            </h2>

            <p
              className="text-[17px] font-sans leading-[1.65] mb-10 max-w-[560px]"
              style={{ color: "var(--teal)" }}
            >
              Whatever your path — solo, same-sex, or as a couple — join thousands
              of people navigating IVF with honest information, real-world costs,
              and a community that actually gets it.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-sans font-medium transition-opacity duration-200 hover:opacity-90"
                style={{ background: "var(--accent)", color: "#1A3A25" }}
              >
                Join the Waitlist
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                className="inline-flex items-center justify-center gap-2 rounded-full border px-8 py-3.5 text-sm font-sans transition-colors duration-200 hover:bg-black/10"
                style={{ borderColor: "rgba(0, 83, 83, 0.35)", color: "var(--teal)" }}
              >
                Follow Our Journey
              </button>
            </div>

            <p className="text-xs font-sans mt-6" style={{ color: "rgba(0, 83, 83, 0.5)" }}>
              No spam. No toxic positivity. Just the real stuff.
            </p>
          </motion.div>

          {/* Photo — fills the remaining column and matches the copy block's height on lg+ */}
          <div className="relative w-full lg:flex-1 lg:self-stretch min-h-[280px] rounded-2xl overflow-hidden">
            <Image
              src="/photos/cta-family.jpg"
              alt="A mother and her daughter reading a book together"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
