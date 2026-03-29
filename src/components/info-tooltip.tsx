"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface InfoTooltipProps {
  content: string;
}

export function InfoTooltip({ content }: InfoTooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex items-center">
      <button
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen(!open)}
        className="text-lavender-dark hover:text-navy transition-colors cursor-help"
        aria-label="More information"
      >
        <Info className="h-4 w-4" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 rounded-xl bg-navy text-warm-white text-xs leading-relaxed p-3 shadow-lg z-50"
          >
            {content}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-navy" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
