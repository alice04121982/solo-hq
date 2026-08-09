"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import type { Clinic } from "@/types/clinic";

interface ComparisonBarProps {
  selected: Clinic[];
  onRemove: (slug: string) => void;
  onCompare: () => void;
  onClear: () => void;
}

/**
 * Persistent bottom bar once two or more clinics are selected. The selection
 * itself lives in the URL, so it survives refreshes and filter changes; this
 * bar is just the always-visible handle on it. Elevation comes from the dark
 * surface and its border, not from a shadow.
 */
export function ComparisonBar({ selected, onRemove, onCompare, onClear }: ComparisonBarProps) {
  return (
    <AnimatePresence>
      {selected.length >= 2 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl"
        >
          <div className="rounded-[24px] bg-teal border border-teal px-4 py-3 flex items-center gap-3">
            <p className="shrink-0 text-xs font-bold text-on-teal">
              {selected.length} of 4
            </p>
            {/* Each selected clinic is a removable Tag. */}
            <div className="flex-1 flex flex-wrap gap-2 min-w-0">
              {selected.map((clinic) => (
                <span
                  key={clinic.slug}
                  className="inline-flex items-center gap-1.5 rounded-full bg-on-teal/10 px-2.5 py-1 text-xs text-on-teal"
                >
                  <span className="truncate max-w-[120px]">{clinic.name}</span>
                  <button
                    onClick={() => onRemove(clinic.slug)}
                    aria-label={`Remove ${clinic.name} from comparison`}
                    className="hover:text-accent transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onClear}
                className="text-on-teal-muted hover:text-on-teal text-xs transition-colors"
              >
                Clear
              </button>
              <button
                onClick={onCompare}
                className="inline-flex items-center gap-1.5 rounded-full bg-accent text-teal-ink px-4 py-2 text-xs font-bold hover:opacity-90 transition-opacity"
              >
                Compare {selected.length}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
