"use client";

import { motion } from "framer-motion";
import { FAMILY_SHAPES, ShapeMark } from "../shapes";
import Image from "next/image";
import type { FamilyType } from "@/lib/family-types";

const EASE = [0.16, 1, 0.3, 1] as const;
const TEAL = "var(--teal)";
const TEAL_SOFT = "rgba(0, 83, 83, 0.6)";

export function FamilyHero({ family }: { family: FamilyType }) {
  const lines = family.headline.split("\n");
  const heroShape = family.heroShapeBackdrop ? FAMILY_SHAPES[family.slug] : undefined;

  return (
    <section className="relative overflow-hidden bg-background">
      {/* The family's mark as backdrop — solid shape-on-colour cropped by the
          section edge, same treatment as Section's `backdrop`. */}
      {heroShape && (
        <ShapeMark
          name={heroShape}
          className="absolute top-0 left-0 -translate-x-[28%] -translate-y-[32%] w-[18rem] md:w-[30rem] lg:w-[38rem] h-auto pointer-events-none"
          style={{ color: "var(--card-bg)" }}
        />
      )}
      <div className="relative mx-auto px-6 md:px-12 lg:px-16">
        <div className={`grid grid-cols-1 ${!family.hideHeroImage ? "lg:grid-cols-2" : ""} gap-16 items-center py-24 md:py-36`}>
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className={family.hideHeroImage ? "max-w-3xl" : ""}
          >
            <p
              className="text-[13px] font-[600] uppercase tracking-[2px] font-sans flex items-center gap-2 mb-6"
              style={{ color: TEAL }}
            >
                <ShapeMark name="bloom" size={14} style={{ color: "var(--lavender)" }} />
              {family.label}
            </p>

            <h1
              className="font-sans font-bold mb-6"
              style={{
                fontSize: "clamp(3rem, 5.5vw, 6rem)",
                lineHeight: 1.03,
                fontVariationSettings: "'wght' 800",
                color: TEAL,
              }}
            >
              {lines[0]}
              {lines[1] && (
                <>
                  <br />
                  {lines[1]}
                </>
              )}
            </h1>

            <p
              className="text-lg leading-[1.65] mb-10 font-sans"
              style={{ maxWidth: "52ch", color: TEAL }}
            >
              {family.heroCopy}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/ivf-finder"
                className="inline-flex items-center gap-2 rounded-full bg-accent text-on-accent px-8 py-3.5 text-sm font-sans font-medium hover:bg-accent-dark transition-colors duration-200"
              >
                Compare clinics
              </a>
              <a
                href="/families"
                className="inline-flex items-center gap-2 rounded-full border border-teal/20 text-teal px-8 py-3.5 text-sm font-sans font-medium hover:bg-teal hover:text-on-teal transition-colors duration-200"
              >
                All family types
              </a>
            </div>

            <p className="text-xs font-sans text-muted mt-8 pb-0 border-t border-border pt-6">
              <span className="font-[500] text-teal">{family.treatmentHighlight}</span>
              : treatment routes covered in this guide
            </p>
          </motion.div>

          {/* Right — image */}
          {!family.hideHeroImage && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              className="relative h-[440px] lg:h-[560px] rounded-2xl overflow-hidden"
            >
              <Image
                src={family.image}
                alt={family.imageAlt}
                fill
                className="object-cover"
                style={{ filter: "saturate(0.9) sepia(0.05)" }}
                priority
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
