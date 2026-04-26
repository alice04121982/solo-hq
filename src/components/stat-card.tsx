"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

interface StatCardProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
  highlight?: boolean;
  delay?: number;
}

export function StatCard({ value, label, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className="flex flex-col gap-3 py-8 border-t border-border"
    >
      <span
        className="font-serif font-normal text-foreground leading-none"
        style={{ fontSize: "clamp(3rem, 5vw, 5.5rem)", fontOpticalSizing: "auto" as never }}
      >
        {value}
      </span>
      <span className="text-sm font-sans text-muted leading-snug" style={{ maxWidth: "28ch" }}>
        {label}
      </span>
    </motion.div>
  );
}
