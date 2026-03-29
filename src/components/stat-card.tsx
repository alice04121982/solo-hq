"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StatCardProps {
  value: string;
  label: string;
  icon?: ReactNode;
  highlight?: boolean;
}

export function StatCard({ value, label, icon, highlight = false }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`rounded-[32px] p-8 flex flex-col items-start gap-3 ${
        highlight
          ? "bg-lime text-charcoal"
          : "bg-card-bg border border-card-border"
      }`}
    >
      {icon && <div className="text-lavender-dark">{icon}</div>}
      <span
        className={`text-4xl md:text-5xl font-bold tracking-tight ${
          highlight ? "text-charcoal" : "text-navy"
        }`}
      >
        {value}
      </span>
      <span
        className={`text-sm font-medium leading-snug ${
          highlight ? "text-charcoal/80" : "text-muted"
        }`}
      >
        {label}
      </span>
    </motion.div>
  );
}
