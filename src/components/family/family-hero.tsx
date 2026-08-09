"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { FamilyType } from "@/lib/family-types";

const EASE = [0.16, 1, 0.3, 1] as const;
const GREEN = "#1A3A25";
const GREEN_SOFT = "rgba(26,58,37,0.65)";

export function FamilyHero({ family }: { family: FamilyType }) {
  const lines = family.headline.split("\n");

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className={`grid grid-cols-1 ${!family.hideHeroImage ? "lg:grid-cols-2" : ""} gap-16 items-center py-20 md:py-28`}>
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className={family.hideHeroImage ? "max-w-3xl" : ""}
          >
            <p
              className="text-[11px] font-[600] uppercase tracking-[0.15em] mb-6 font-sans"
              style={{ color: GREEN_SOFT }}
            >
              {family.label}
            </p>

            <h1
              className="font-sans font-bold mb-6"
              style={{
                fontSize: "clamp(2.5rem, 5.5vw, 4.75rem)",
                lineHeight: 1.03,
                fontVariationSettings: "'wght' 800",
                color: GREEN,
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
              className="text-[17px] leading-[1.65] mb-10 font-sans"
              style={{ maxWidth: "52ch", color: GREEN }}
            >
              {family.heroCopy}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/ivf-finder"
                className="inline-flex items-center gap-2 rounded-full bg-accent text-[#1A3A25] px-8 py-3.5 text-sm font-sans font-medium hover:bg-accent-dark transition-colors duration-200"
              >
                Compare clinics
              </a>
              <a
                href="/families"
                className="inline-flex items-center gap-2 rounded-full border border-[#1A3A25]/20 text-[#1A3A25] px-8 py-3.5 text-sm font-sans font-medium hover:bg-[#1A3A25] hover:text-white transition-colors duration-200"
              >
                All family types
              </a>
            </div>

            <p className="text-xs font-sans text-muted mt-8 pb-0 border-t border-border pt-6">
              <span className="font-[500] text-[#1A3A25]">{family.treatmentHighlight}</span>
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
