"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ShapeMark } from "../shapes";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ProcessStep } from "@/lib/family-types";

const EASE = [0.16, 1, 0.3, 1] as const;
const TEAL = "var(--teal)";
const TEAL_SOFT = "rgba(0, 83, 83, 0.6)";

export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-step-card]");
    const amount = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: amount * dir, behavior: "smooth" });
  };

  return (
    <section className="bg-background border-y border-border">
      <div className="mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex items-end justify-between gap-6 mb-10"
        >
          <div>
            <p
              className="text-[13px] font-[600] uppercase tracking-[2px] font-sans flex items-center gap-2 mb-3"
              style={{ color: TEAL }}
            >
                <ShapeMark name="halves" size={14} style={{ color: "var(--lavender)" }} />
              Step by step
            </p>
            <h2
              className="font-sans font-bold"
              style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1, color: TEAL }}
            >
              Your complete guide
              <br />
              from first steps to family.
            </h2>
          </div>

          {/* Desktop arrows */}
          <div className="hidden md:flex items-center gap-2 shrink-0 pb-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              disabled={!canScrollLeft}
              aria-label="Previous step"
              className="h-10 w-10 rounded-full border flex items-center justify-center transition-all duration-150 disabled:opacity-30"
              style={{ borderColor: "var(--teal-25)", color: TEAL }}
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              disabled={!canScrollRight}
              aria-label="Next step"
              className="h-10 w-10 rounded-full border flex items-center justify-center transition-all duration-150 disabled:opacity-30"
              style={{ borderColor: "var(--teal-25)", color: TEAL }}
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 -mx-6 px-6 md:-mx-2 md:px-2"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {steps.map((step, i) => (
            <motion.article
              key={step.number}
              data-step-card
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: Math.min(i, 3) * 0.05, ease: EASE }}
              className="shrink-0 rounded-2xl flex flex-col p-6"
              style={{
                scrollSnapAlign: "start",
                width: "min(80vw, 340px)",
                minHeight: "300px",
                background: "var(--card-bg)",
              }}
            >
              <span
                className="font-serif leading-none mb-4"
                style={{ fontSize: "2.25rem", color: TEAL_SOFT }}
              >
                {String(step.number).padStart(2, "0")}
              </span>
              <h3
                className="font-sans font-bold mb-3"
                style={{ fontSize: "1.2rem", lineHeight: 1.25, color: TEAL }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm font-sans leading-relaxed"
                style={{ color: TEAL }}
              >
                {step.body}
              </p>
            </motion.article>
          ))}
        </div>

        <p
          className="md:hidden text-[13px] font-sans text-center mt-2"
          style={{ color: TEAL_SOFT }}
        >
          Swipe to explore all {steps.length} steps →
        </p>
      </div>
    </section>
  );
}
