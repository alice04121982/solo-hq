"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";
import { Bloom, Cross, Dot, Egg, Spark } from "./shapes";

/**
 * The shape composition that leads the homepage in place of a family photo.
 *
 * A photograph always shows one kind of family; the site is for all of them.
 * So the hero leads with the shape language instead, and plays out the
 * journey in miniature: a small lime egg drifts toward the bloom, overlaps
 * it, and a spark turns above — merging as the quiet nod to IVF.
 *
 * Everything loops slowly and gently (this is a fertility site, nothing
 * should feel frantic), and all motion is dropped for users who prefer
 * reduced motion.
 */

const breathe = (duration: number, delay = 0): Transition => ({
  duration,
  delay,
  repeat: Infinity,
  repeatType: "mirror",
  ease: "easeInOut",
});

export function HeroShapes({ className }: { className?: string }) {
  const still = useReducedMotion();

  return (
    <div aria-hidden className={className}>
      <div className="relative w-full" style={{ aspectRatio: "1.06" }}>
        {/* Backdrop circle the bloom sits on — flat solid colour layering,
            never a translucent wash: shapes must not show through each
            other, per the reference art direction. */}
        <motion.div
          className="absolute"
          style={{ right: "0%", top: "8%", width: "62%", color: "var(--on-teal)" }}
          animate={still ? undefined : { x: [0, 14, 0] }}
          transition={breathe(11)}
        >
          <Dot className="w-full h-auto" />
        </motion.div>

        {/* The bloom — the egg cell, breathing. */}
        <motion.div
          className="absolute"
          style={{ left: "4%", top: "18%", width: "56%", color: "var(--lavender)" }}
          animate={still ? undefined : { scale: [1, 1.05, 1] }}
          transition={breathe(7)}
        >
          <Bloom className="w-full h-auto" />
        </motion.div>

        {/* The small lime egg, drifting in to merge with the bloom. */}
        <motion.div
          className="absolute"
          style={{ left: "-2%", top: "48%", width: "15%", color: "var(--accent)" }}
          animate={still ? undefined : { x: ["0%", "85%", "0%"], scale: [1, 1.12, 1] }}
          transition={breathe(9, 0.6)}
        >
          <Dot className="w-full h-auto" />
        </motion.div>

        {/* The spark — turning slowly above the merge. */}
        <motion.div
          className="absolute"
          style={{ right: "16%", top: "0%", width: "14%", color: "var(--accent)" }}
          animate={still ? undefined : { rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        >
          <Spark className="w-full h-auto" />
        </motion.div>

        {/* The egg ring, resting bottom-right. */}
        <motion.div
          className="absolute"
          style={{ right: "5%", bottom: "4%", width: "20%", color: "var(--on-teal)" }}
          animate={still ? undefined : { y: [0, -10, 0] }}
          transition={breathe(8, 1.2)}
        >
          <Egg className="w-full h-auto" />
        </motion.div>

        {/* Calendar crosses — days marked off. Solid, in the muted tone
            rather than faded via opacity. */}
        <div
          className="absolute"
          style={{ left: "16%", top: "2%", width: "7%", color: "var(--on-teal-muted)" }}
        >
          <Cross className="w-full h-auto" />
        </div>
        <div
          className="absolute"
          style={{ left: "38%", bottom: "0%", width: "5%", color: "var(--on-teal-muted)" }}
        >
          <Cross className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
}
