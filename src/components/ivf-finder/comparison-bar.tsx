"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import type { ClinicData } from "@/types/clinic";

interface ComparisonBarProps {
  selected: ClinicData[];
  onRemove: (id: string) => void;
  onCompare: () => void;
  onClear: () => void;
}

export function ComparisonBar({
  selected,
  onRemove,
  onCompare,
  onClear,
}: ComparisonBarProps) {
  return (
    <AnimatePresence>
      {selected.length >= 1 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl"
        >
          <div className="rounded-[24px] bg-navy shadow-xl border border-white/10 px-4 py-3 flex items-center gap-3">
            {/* Clinic chips */}
            <div className="flex-1 flex flex-wrap gap-2 min-w-0">
              {selected.map((clinic) => (
                <span
                  key={clinic.id}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs text-warm-white"
                >
                  <span className="truncate max-w-[120px]">{clinic.name}</span>
                  <button
                    onClick={() => onRemove(clinic.id)}
                    className="hover:text-lime transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {selected.length < 4 && (
                <span className="inline-flex items-center rounded-full border border-white/20 border-dashed px-2.5 py-1 text-xs text-warm-white/40">
                  +{4 - selected.length} more
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onClear}
                className="text-warm-white/50 hover:text-warm-white text-xs transition-colors"
              >
                Clear
              </button>
              <button
                onClick={onCompare}
                disabled={selected.length < 2}
                className="inline-flex items-center gap-1.5 rounded-full bg-lime text-charcoal px-4 py-2 text-xs font-bold hover:bg-lime-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Compare {selected.length >= 2 ? `${selected.length}` : ""}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
