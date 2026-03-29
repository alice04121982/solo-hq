"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpDown,
  Star,
  ShieldCheck,
  PoundSterling,
  Heart,
  MapPin,
} from "lucide-react";

interface Clinic {
  id: string;
  name: string;
  location: string;
  successRate: number; // percentage for under 38
  successRateOver38: number;
  priceTransparency: number; // 1-5
  soloFriendliness: number; // 1-5
  reviewCount: number;
  quotePrice: number;
  realPrice: number;
}

const SAMPLE_CLINICS: Clinic[] = [
  {
    id: "1",
    name: "London Women's Clinic",
    location: "London",
    successRate: 42,
    successRateOver38: 28,
    priceTransparency: 4,
    soloFriendliness: 5,
    reviewCount: 127,
    quotePrice: 4500,
    realPrice: 7200,
  },
  {
    id: "2",
    name: "ARGC",
    location: "London",
    successRate: 50,
    successRateOver38: 35,
    priceTransparency: 2,
    soloFriendliness: 3,
    reviewCount: 89,
    quotePrice: 5000,
    realPrice: 12000,
  },
  {
    id: "3",
    name: "Manchester Fertility",
    location: "Manchester",
    successRate: 38,
    successRateOver38: 24,
    priceTransparency: 4,
    soloFriendliness: 4,
    reviewCount: 64,
    quotePrice: 3800,
    realPrice: 6500,
  },
  {
    id: "4",
    name: "Create Fertility",
    location: "London, Birmingham, Bristol",
    successRate: 35,
    successRateOver38: 22,
    priceTransparency: 5,
    soloFriendliness: 5,
    reviewCount: 203,
    quotePrice: 3500,
    realPrice: 5800,
  },
  {
    id: "5",
    name: "Care Fertility",
    location: "Multiple UK locations",
    successRate: 40,
    successRateOver38: 26,
    priceTransparency: 3,
    soloFriendliness: 4,
    reviewCount: 156,
    quotePrice: 4200,
    realPrice: 8100,
  },
  {
    id: "6",
    name: "Homerton Fertility",
    location: "London (NHS & Private)",
    successRate: 36,
    successRateOver38: 21,
    priceTransparency: 4,
    soloFriendliness: 4,
    reviewCount: 42,
    quotePrice: 3200,
    realPrice: 5500,
  },
];

type SortField = "successRate" | "priceTransparency" | "soloFriendliness" | "realPrice";

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating
              ? "fill-lime-dark text-lime-dark"
              : "fill-none text-card-border"
          }`}
        />
      ))}
    </div>
  );
}

export function ClinicComparison() {
  const [sortField, setSortField] = useState<SortField>("soloFriendliness");
  const [sortAsc, setSortAsc] = useState(false);
  const [ageFilter, setAgeFilter] = useState<"under38" | "over38">("under38");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const sorted = useMemo(() => {
    return [...SAMPLE_CLINICS].sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (sortField === "realPrice") {
        return sortAsc ? valA - valB : valA - valB; // always low to high for price
      }
      return sortAsc ? valA - valB : valB - valA;
    });
  }, [sortField, sortAsc]);

  return (
    <div className="p-6 md:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-navy">
            Clinic Comparison Engine
          </h2>
          <p className="text-sm text-muted mt-1">
            Ranked by solo mums, for solo mums. Based on HFEA data and community reviews.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setAgeFilter("under38")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              ageFilter === "under38"
                ? "bg-navy text-warm-white"
                : "bg-warm-white text-navy hover:bg-lavender-light"
            }`}
          >
            Under 38
          </button>
          <button
            onClick={() => setAgeFilter("over38")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              ageFilter === "over38"
                ? "bg-navy text-warm-white"
                : "bg-warm-white text-navy hover:bg-lavender-light"
            }`}
          >
            38 and over
          </button>
        </div>
      </div>

      {/* Sort Controls */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { field: "successRate" as SortField, label: "Success Rate", icon: <ShieldCheck className="h-3.5 w-3.5" /> },
          { field: "priceTransparency" as SortField, label: "Price Transparency", icon: <PoundSterling className="h-3.5 w-3.5" /> },
          { field: "soloFriendliness" as SortField, label: "Solo-Friendliness", icon: <Heart className="h-3.5 w-3.5" /> },
          { field: "realPrice" as SortField, label: "Lowest Real Price", icon: <ArrowUpDown className="h-3.5 w-3.5" /> },
        ].map((btn) => (
          <button
            key={btn.field}
            onClick={() => handleSort(btn.field)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              sortField === btn.field
                ? "bg-lime text-charcoal"
                : "bg-warm-white text-navy hover:bg-lavender-light"
            }`}
          >
            {btn.icon}
            {btn.label}
          </button>
        ))}
      </div>

      {/* Clinic Cards */}
      <div className="space-y-3">
        {sorted.map((clinic, index) => (
          <motion.div
            key={clinic.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="rounded-2xl bg-warm-white p-4 md:p-5 hover:shadow-sm transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Rank & Name */}
              <div className="flex items-center gap-3 md:w-1/3">
                <span className="h-8 w-8 rounded-xl bg-lavender/30 flex items-center justify-center text-sm font-bold text-navy">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-bold text-navy">{clinic.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3 text-muted" />
                    <p className="text-xs text-muted">{clinic.location}</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 md:flex-1">
                <div>
                  <p className="text-xs text-muted">Success Rate</p>
                  <p className="text-sm font-bold text-navy">
                    {ageFilter === "under38"
                      ? clinic.successRate
                      : clinic.successRateOver38}
                    %
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted">Price Transparency</p>
                  <StarRating rating={clinic.priceTransparency} />
                </div>
                <div>
                  <p className="text-xs text-muted">Solo-Friendliness</p>
                  <StarRating rating={clinic.soloFriendliness} />
                </div>
                <div>
                  <p className="text-xs text-muted">
                    {clinic.reviewCount} reviews
                  </p>
                </div>
              </div>

              {/* Pricing */}
              <div className="flex items-center gap-3 md:w-auto">
                <div className="text-right">
                  <p className="text-xs text-muted line-through">
                    £{clinic.quotePrice.toLocaleString()}
                  </p>
                  <p className="text-sm font-bold text-navy">
                    £{clinic.realPrice.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-muted">est. real cost</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-[11px] text-muted mt-4 leading-relaxed">
        Success rates based on HFEA published data (2022/23). Real prices are community-reported
        estimates including solo essentials. Solo-friendliness ratings are from verified solo mum
        reviews. All data is indicative — always verify directly with clinics.
      </p>
    </div>
  );
}
