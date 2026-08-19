"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FilterControls,
  countActiveFilters,
  DEFAULT_FINDER_FILTERS,
  type FinderFilterState,
} from "./finder-filters";

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FinderFilterState;
  onChange: (f: FinderFilterState) => void;
  resultCount: number;
}

/**
 * Mobile home for the finder filters. Changes apply live, so the footer CTA
 * just closes the sheet; nothing here ever blocks results from showing.
 */
export function FilterSheet({ isOpen, onClose, filters, onChange, resultCount }: FilterSheetProps) {
  const activeCount = countActiveFilters(filters);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-foreground/40"
            onClick={onClose}
          />

          <motion.div
            key="sheet"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: [0.32, 0, 0.16, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-[400px] z-50 flex flex-col bg-background border-l border-border-warm"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-warm shrink-0">
              <div className="flex items-center gap-3">
                <h2 className="font-sans font-bold text-base text-foreground">Filters</h2>
                {activeCount > 0 && (
                  <span className="flex items-center justify-center w-5 h-5 rounded-full text-[13px] font-bold bg-teal text-on-teal">
                    {activeCount}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Close filters"
                className="p-1 rounded-full text-teal transition-colors hover:bg-surface-hover"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <FilterControls filters={filters} onChange={onChange} />
            </div>

            <div className="px-6 py-4 border-t border-border-warm flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() =>
                  onChange({ ...DEFAULT_FINDER_FILTERS, ageBracket: filters.ageBracket })
                }
                className="flex-1 py-2.5 text-sm font-medium rounded-full border border-teal/20 text-teal transition-colors hover:bg-surface-hover"
              >
                Clear all
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 text-sm font-bold rounded-full bg-accent text-teal-ink transition-opacity hover:opacity-90"
              >
                Show {resultCount} {resultCount === 1 ? "clinic" : "clinics"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
