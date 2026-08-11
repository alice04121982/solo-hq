"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Cross, Spark } from "./shapes";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CTASection() {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--lavender)" }}>
      {/* Calendar crosses in the band's corner — days marked off. Solid
          tone-on-tone, not an opacity fade. */}
      <div aria-hidden className="absolute top-10 right-8 hidden md:flex gap-4" style={{ color: "var(--lavender-dark)" }}>
        <Cross size={26} />
        <Cross size={26} />
        <Cross size={26} />
      </div>

      <div className="mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-0">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="w-full lg:w-[672px] shrink-0"
          >
            <p
              className="text-[13px] font-[500] uppercase font-sans mb-6"
              style={{ color: "var(--teal)", letterSpacing: "1.65px" }}
            >
              Join the community
            </p>

            <h2
              className="font-sans font-bold mb-6"
              style={{
                fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)",
                lineHeight: 1.1,
                letterSpacing: "-1.2px",
                color: "var(--teal)",
              }}
            >
              You&rsquo;re not doing this alone. Even if you&rsquo;re doing it solo.
            </h2>

            <p
              className="text-lg font-sans leading-[1.65] mb-10 max-w-[560px]"
              style={{ color: "var(--teal)" }}
            >
              Whatever your path, IVF is easier alongside people who get it.
              We are building a place to find others at your stage, hear from
              people who have been through it, and set up local meetups. Join
              the waitlist and you will be first to know when it opens.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/community#waitlist"
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-sans font-medium transition-opacity duration-200 hover:opacity-90"
                style={{ background: "var(--accent)", color: "var(--on-accent)" }}
              >
                Join the Waitlist
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/our-story"
                className="inline-flex items-center justify-center gap-2 rounded-full border px-8 py-3.5 text-sm font-sans transition-colors duration-200 hover:bg-black/10"
                style={{ borderColor: "var(--teal-35)", color: "var(--teal)" }}
              >
                Follow Our Journey
              </a>
            </div>

            <p className="text-xs font-sans mt-6" style={{ color: "rgba(0, 83, 83, 0.5)" }}>
              No spam. No toxic positivity. Just the real stuff.
            </p>
          </motion.div>

          {/* Photo — fills the remaining column and matches the copy block's height on lg+ */}
          <div className="relative w-full lg:flex-1 lg:self-stretch min-h-[280px]">
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <Image
                src="/photos/cta-family.webp"
                alt="A father holding and kissing his young son"
                fill
                className="object-cover"
              />
            </div>
            {/* A spark pinned over the photo's corner, turning slowly. */}
            <Spark
              size={76}
              className="shape-spin absolute -top-6 -left-6"
              style={{ color: "var(--accent)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
