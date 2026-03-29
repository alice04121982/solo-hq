"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  delay?: number;
}

export function BentoCard({
  children,
  className = "",
  colSpan = 1,
  rowSpan = 1,
  delay = 0,
}: BentoCardProps) {
  const colClass =
    colSpan === 3
      ? "md:col-span-3"
      : colSpan === 2
        ? "md:col-span-2"
        : "md:col-span-1";
  const rowClass = rowSpan === 2 ? "md:row-span-2" : "md:row-span-1";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`rounded-[32px] bg-card-bg border border-card-border shadow-sm hover:shadow-md transition-shadow duration-300 ${colClass} ${rowClass} ${className}`}
    >
      {children}
    </motion.div>
  );
}
