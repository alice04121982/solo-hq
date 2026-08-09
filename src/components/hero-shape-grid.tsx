"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ShapeMark, type ShapeName } from "./shapes";

/**
 * The hero composition: a tidy grid of shape cells and photo cells.
 *
 * A single hero photograph can only ever show one kind of family, and the
 * site is for all of them. The grid solves that two ways at once — the five
 * family marks carry the "every kind" promise structurally, and the photo
 * cells show several different families rather than one stand-in for all.
 *
 * Cells are transparent: the shape itself carries the colour and the teal
 * band shows through the gaps, so the composition reads as flat shape-on-
 * colour rather than a set of tiles. Photos are cropped by simple geometric
 * masks (circle, arch, quarter, leaf) — the intricate marks stay solid,
 * which keeps the grid legible at small sizes.
 */

type Mask = "circle" | "arch" | "quarter" | "leaf";

const MASK_CLASS: Record<Mask, string> = {
  circle: "rounded-full",
  arch: "rounded-t-full",
  quarter: "rounded-tl-full",
  leaf: "rounded-tl-full rounded-br-full",
};

type Cell =
  | { kind: "mark"; name: ShapeName; color: string }
  | { kind: "photo"; src: string; alt: string; mask: Mask; position?: string };

/**
 * Reading order matters: marks and photos alternate so neither clusters,
 * and no two photos sit edge to edge in a row.
 */
const CELLS: Cell[] = [
  { kind: "mark", name: "bloom", color: "var(--on-teal)" },
  {
    kind: "photo",
    src: "/photos/story-two-mums.webp",
    alt: "Two mums together",
    mask: "circle",
  },
  { kind: "mark", name: "egg", color: "var(--accent)" },

  {
    kind: "photo",
    src: "/photos/hands.webp",
    alt: "Two adults holding a baby's hand",
    mask: "arch",
  },
  { kind: "mark", name: "asterisk", color: "var(--lavender)" },
  {
    kind: "photo",
    src: "/photos/story-two-dads.webp",
    alt: "Two dads together",
    mask: "quarter",
    position: "object-[50%_30%]",
  },

  { kind: "mark", name: "spark", color: "var(--accent)" },
  {
    kind: "photo",
    src: "/photos/story-solo-mum.webp",
    alt: "A solo mum holding her child",
    mask: "leaf",
  },
  { kind: "mark", name: "pause", color: "var(--on-teal)" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function HeroShapeGrid({ className }: { className?: string }) {
  const still = useReducedMotion();

  return (
    <div className={className}>
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {CELLS.map((cell, i) => (
          <motion.div
            key={i}
            className="relative aspect-square"
            initial={still ? false : { opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: still ? 0 : i * 0.06, ease: EASE }}
          >
            {cell.kind === "mark" ? (
              <ShapeMark
                name={cell.name}
                className="w-full h-full"
                style={{ color: cell.color }}
              />
            ) : (
              <div className={`absolute inset-0 overflow-hidden ${MASK_CLASS[cell.mask]}`}>
                <Image
                  src={cell.src}
                  alt={cell.alt}
                  fill
                  sizes="(min-width: 1280px) 160px, 30vw"
                  className={`object-cover ${cell.position ?? ""}`}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
