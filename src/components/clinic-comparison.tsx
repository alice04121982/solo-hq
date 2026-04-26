"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Clinic {
  id: string;
  name: string;
  location: string;
  successRate: number;
  successRateOver38: number;
  priceTransparency: number;
  soloFriendliness: number;
  reviewCount: number;
  quotePrice: number;
  realPrice: number;
}

const SAMPLE_CLINICS: Clinic[] = [
  { id: "1", name: "London Women's Clinic", location: "London", successRate: 42, successRateOver38: 28, priceTransparency: 4, soloFriendliness: 5, reviewCount: 127, quotePrice: 4500, realPrice: 7200 },
  { id: "2", name: "ARGC", location: "London", successRate: 50, successRateOver38: 35, priceTransparency: 2, soloFriendliness: 3, reviewCount: 89, quotePrice: 5000, realPrice: 12000 },
  { id: "3", name: "Manchester Fertility", location: "Manchester", successRate: 38, successRateOver38: 24, priceTransparency: 4, soloFriendliness: 4, reviewCount: 64, quotePrice: 3800, realPrice: 6500 },
  { id: "4", name: "Create Fertility", location: "London, Birmingham, Bristol", successRate: 35, successRateOver38: 22, priceTransparency: 5, soloFriendliness: 5, reviewCount: 203, quotePrice: 3500, realPrice: 5800 },
  { id: "5", name: "Care Fertility", location: "Multiple UK locations", successRate: 40, successRateOver38: 26, priceTransparency: 3, soloFriendliness: 4, reviewCount: 156, quotePrice: 4200, realPrice: 8100 },
  { id: "6", name: "Homerton Fertility", location: "London (NHS & Private)", successRate: 36, successRateOver38: 21, priceTransparency: 4, soloFriendliness: 4, reviewCount: 42, quotePrice: 3200, realPrice: 5500 },
];

type SortField = "successRate" | "priceTransparency" | "soloFriendliness" | "realPrice";

const SORT_OPTIONS: { field: SortField; label: string }[] = [
  { field: "soloFriendliness", label: "Solo-Friendliness" },
  { field: "successRate", label: "Success Rate" },
  { field: "priceTransparency", label: "Price Transparency" },
  { field: "realPrice", label: "Lowest Real Price" },
];

function Dots({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: i < rating ? "var(--accent)" : "var(--border)" }}
        />
      ))}
    </div>
  );
}

export function ClinicComparison() {
  const [sortField, setSortField] = useState<SortField>("soloFriendliness");
  const [ageFilter, setAgeFilter] = useState<"under38" | "over38">("under38");

  const sorted = useMemo(() => {
    return [...SAMPLE_CLINICS].sort((a, b) => {
      if (sortField === "realPrice") return a[sortField] - b[sortField];
      return b[sortField] - a[sortField];
    });
  }, [sortField]);

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-3 font-sans">
          Clinic comparison
        </p>
        <h2 className="font-serif font-normal text-foreground text-2xl leading-tight mb-1">
          Comparison Engine
        </h2>
        <p className="text-sm font-sans text-muted">
          Ranked by solo mums, for solo mums. Based on HFEA data and community reviews.
        </p>
      </div>

      {/* Controls row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        {/* Sort — text tabs with underline */}
        <div className="flex flex-wrap gap-6">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.field}
              onClick={() => setSortField(opt.field)}
              className={`text-xs font-sans pb-1 transition-colors duration-150 ${
                sortField === opt.field
                  ? "text-foreground border-b border-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Age filter */}
        <div className="flex gap-3">
          {(["under38", "over38"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setAgeFilter(f)}
              className={`text-xs font-sans pb-1 transition-colors duration-150 ${
                ageFilter === f
                  ? "text-foreground border-b border-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {f === "under38" ? "Under 38" : "38 and over"}
            </button>
          ))}
        </div>
      </div>

      {/* Rows */}
      <div>
        {sorted.map((clinic, index) => (
          <motion.div
            key={clinic.id}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.04, ease: EASE }}
            className="flex flex-col md:flex-row md:items-center gap-4 py-5 border-t border-border"
          >
            {/* Rank + Name */}
            <div className="flex items-start gap-4 md:w-2/5">
              <span
                className="font-serif text-muted leading-none shrink-0 mt-1"
                style={{ fontSize: "1.5rem", fontOpticalSizing: "auto" as never }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-serif text-foreground text-lg leading-tight">{clinic.name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3 text-muted" />
                  <p className="text-xs font-sans text-muted">{clinic.location}</p>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="flex flex-wrap gap-x-8 gap-y-3 md:flex-1">
              <div>
                <p className="text-[11px] font-[500] uppercase tracking-[0.12em] text-muted font-sans mb-1">
                  Success
                </p>
                <p className="font-serif text-foreground text-lg">
                  {ageFilter === "under38" ? clinic.successRate : clinic.successRateOver38}%
                </p>
              </div>
              <div>
                <p className="text-[11px] font-[500] uppercase tracking-[0.12em] text-muted font-sans mb-2">
                  Price Transparency
                </p>
                <Dots rating={clinic.priceTransparency} />
              </div>
              <div>
                <p className="text-[11px] font-[500] uppercase tracking-[0.12em] text-muted font-sans mb-2">
                  Solo-Friendly
                </p>
                <Dots rating={clinic.soloFriendliness} />
              </div>
              <div className="hidden sm:block">
                <p className="text-[11px] font-[500] uppercase tracking-[0.12em] text-muted font-sans mb-1">
                  Reviews
                </p>
                <p className="text-sm font-sans text-muted">{clinic.reviewCount}</p>
              </div>
            </div>

            {/* Pricing */}
            <div className="text-right md:w-auto shrink-0">
              <p className="text-xs font-sans text-muted line-through">
                £{clinic.quotePrice.toLocaleString()} quoted
              </p>
              <p className="font-serif text-foreground text-xl">
                £{clinic.realPrice.toLocaleString()}
              </p>
              <p className="text-[10px] font-sans text-muted">est. real cost</p>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-[11px] font-sans text-muted mt-6 leading-relaxed border-t border-border pt-4" style={{ maxWidth: "70ch" }}>
        Success rates based on HFEA published data (2022/23). Real prices are community-reported
        estimates including solo essentials. All data is indicative — always verify directly with clinics.
      </p>
    </div>
  );
}
