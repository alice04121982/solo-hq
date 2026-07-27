"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AGE_BRACKETS, DEFAULT_FILTERS } from "./clinic-filters";
import type { FilterState } from "./clinic-filters";

const RADIUS_OPTIONS = [10, 25, 50, 100];
const ABROAD_COUNTRIES = ["Spain", "Greece", "Czech Republic"];

const SUCCESS_OPTS: { value: number | null; label: string }[] = [
  { value: null, label: "Any" },
  { value: 20, label: "20%+" },
  { value: 30, label: "30%+" },
  { value: 40, label: "40%+" },
  { value: 50, label: "50%+" },
];

const PRICE_OPTS: { value: number | null; label: string }[] = [
  { value: null, label: "Any" },
  { value: 5000, label: "Under £5k" },
  { value: 7500, label: "Under £7.5k" },
  { value: 10000, label: "Under £10k" },
];

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full px-3.5 py-1.5 text-xs font-medium border transition-all duration-150"
      style={{
        background: active ? "#3D0D1B" : "white",
        color: active ? "#f9c6da" : "#3D0D1B",
        borderColor: active ? "#3D0D1B" : "rgba(61,13,27,0.2)",
      }}
    >
      {label}
    </button>
  );
}

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  radius: number;
  locationMode: "uk" | "international";
  selectedCountry: string | null;
  onApply: (
    filters: FilterState,
    radius: number,
    locationMode: "uk" | "international",
    selectedCountry: string | null
  ) => void;
}

export function FilterPanel({
  isOpen,
  onClose,
  filters,
  radius,
  locationMode,
  selectedCountry,
  onApply,
}: FilterPanelProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);
  const [localRadius, setLocalRadius] = useState(radius);
  const [localMode, setLocalMode] = useState<"uk" | "international">(locationMode);
  const [localCountry, setLocalCountry] = useState<string | null>(selectedCountry);

  // Sync when panel opens
  useEffect(() => {
    if (isOpen) {
      setLocalFilters(filters);
      setLocalRadius(radius);
      setLocalMode(locationMode);
      setLocalCountry(selectedCountry);
    }
  }, [isOpen, filters, radius, locationMode, selectedCountry]);

  const activeCount =
    (localMode === "uk" && localRadius !== 25 ? 1 : 0) +
    (localMode === "international" && localCountry ? 1 : 0) +
    (localFilters.ageBracket !== "any" ? 1 : 0) +
    (localFilters.minSuccessRate !== null ? 1 : 0) +
    (localFilters.maxPrice !== null ? 1 : 0);

  const handleClear = () => {
    setLocalFilters(DEFAULT_FILTERS);
    setLocalRadius(25);
    setLocalCountry(null);
  };

  const handleApply = () => {
    onApply(localFilters, localRadius, localMode, localCountry);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(26,8,16,0.4)" }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: [0.32, 0, 0.16, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-[400px] z-50 flex flex-col bg-white shadow-2xl"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b shrink-0"
              style={{ borderColor: "#E8E8E8" }}
            >
              <div className="flex items-center gap-3">
                <h2
                  className="font-sans font-bold text-base"
                  style={{ color: "#1A0810" }}
                >
                  Filters
                </h2>
                {activeCount > 0 && (
                  <span
                    className="flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold"
                    style={{ background: "#3D0D1B", color: "#f9c6da" }}
                  >
                    {activeCount}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full transition-colors hover:bg-[#f9f4f6]"
                style={{ color: "#3D0D1B" }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-7">

              {/* ── Where to search ── */}
              <section>
                <p
                  className="text-[10px] font-[700] uppercase tracking-[0.14em] mb-3"
                  style={{ color: "rgba(61,13,27,0.5)" }}
                >
                  Where to search
                </p>
                <div
                  className="flex rounded-full p-0.5 mb-4"
                  style={{ background: "#F0EEF0" }}
                >
                  {(["uk", "international"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        setLocalMode(m);
                        if (m === "uk") setLocalCountry(null);
                      }}
                      className="flex-1 rounded-full py-2 text-xs font-semibold transition-all duration-150"
                      style={{
                        background: localMode === m ? "#3D0D1B" : "transparent",
                        color: localMode === m ? "#f9c6da" : "#3D0D1B",
                      }}
                    >
                      {m === "uk" ? "UK clinics" : "Abroad"}
                    </button>
                  ))}
                </div>

                {localMode === "uk" ? (
                  <div>
                    <p
                      className="text-[11px] font-[600] mb-2"
                      style={{ color: "#3D0D1B" }}
                    >
                      Search radius
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {RADIUS_OPTIONS.map((r) => (
                        <Chip
                          key={r}
                          label={`${r} miles`}
                          active={localRadius === r}
                          onClick={() => setLocalRadius(r)}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <p
                      className="text-[11px] font-[600] mb-2"
                      style={{ color: "#3D0D1B" }}
                    >
                      Country
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {ABROAD_COUNTRIES.map((c) => (
                        <Chip
                          key={c}
                          label={c}
                          active={localCountry === c}
                          onClick={() =>
                            setLocalCountry((prev) => (prev === c ? null : c))
                          }
                        />
                      ))}
                    </div>
                  </div>
                )}
              </section>

              {/* ── Age bracket ── */}
              <section>
                <p
                  className="text-[10px] font-[700] uppercase tracking-[0.14em] mb-3"
                  style={{ color: "rgba(61,13,27,0.5)" }}
                >
                  Your age
                </p>
                <div className="flex flex-wrap gap-2">
                  {AGE_BRACKETS.map((b) => (
                    <Chip
                      key={b.value}
                      label={b.label}
                      active={localFilters.ageBracket === b.value}
                      onClick={() =>
                        setLocalFilters({ ...localFilters, ageBracket: b.value })
                      }
                    />
                  ))}
                </div>
              </section>

              {/* ── Min success rate ── */}
              <section>
                <p
                  className="text-[10px] font-[700] uppercase tracking-[0.14em] mb-3"
                  style={{ color: "rgba(61,13,27,0.5)" }}
                >
                  Minimum success rate
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUCCESS_OPTS.map((opt) => (
                    <Chip
                      key={String(opt.value)}
                      label={opt.label}
                      active={localFilters.minSuccessRate === opt.value}
                      onClick={() =>
                        setLocalFilters({ ...localFilters, minSuccessRate: opt.value })
                      }
                    />
                  ))}
                </div>
              </section>

              {/* ── Max price ── */}
              <section>
                <p
                  className="text-[10px] font-[700] uppercase tracking-[0.14em] mb-3"
                  style={{ color: "rgba(61,13,27,0.5)" }}
                >
                  Maximum price
                </p>
                <div className="flex flex-wrap gap-2">
                  {PRICE_OPTS.map((opt) => (
                    <Chip
                      key={String(opt.value)}
                      label={opt.label}
                      active={localFilters.maxPrice === opt.value}
                      onClick={() =>
                        setLocalFilters({ ...localFilters, maxPrice: opt.value })
                      }
                    />
                  ))}
                </div>
              </section>
            </div>

            {/* Footer */}
            <div
              className="px-6 py-4 border-t flex items-center gap-3 shrink-0"
              style={{ borderColor: "#E8E8E8" }}
            >
              <button
                type="button"
                onClick={handleClear}
                className="flex-1 py-2.5 text-sm font-medium rounded-full border transition-colors hover:bg-[#f9f4f6]"
                style={{ borderColor: "rgba(61,13,27,0.2)", color: "#3D0D1B" }}
              >
                Clear all
              </button>
              <button
                type="button"
                onClick={handleApply}
                className="flex-1 py-2.5 text-sm font-bold rounded-full transition-opacity hover:opacity-90"
                style={{ background: "#C5E600", color: "#1A3A25" }}
              >
                Show clinics
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
