"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Globe } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

type TreatmentType = "ivf" | "icsi" | "iui" | "donor-egg" | "donor-sperm" | "double-donor";
type AgeKey = "under35" | "age35to37" | "age38to39" | "age40to42" | "age43plus";
type Region = "all" | "uk" | "abroad";
type SortField = "successRate" | "soloFriendliness" | "lgbtqFriendliness" | "priceTransparency" | "realPrice";

interface Clinic {
  id: string;
  name: string;
  location: string;
  country: string;
  region: "uk" | "abroad";
  treatments: TreatmentType[];
  successRates: Record<AgeKey, number>;
  priceTransparency: number;
  soloFriendliness: number;
  lgbtqFriendliness: number;
  reviewCount: number;
  basePriceGBP: number;
  realPriceGBP: number;
}

const CLINICS: Clinic[] = [
  {
    id: "london-womens",
    name: "London Women's Clinic",
    location: "London, UK",
    country: "UK",
    region: "uk",
    treatments: ["ivf", "icsi", "iui", "donor-egg", "donor-sperm"],
    successRates: { under35: 44, age35to37: 37, age38to39: 28, age40to42: 16, age43plus: 6 },
    priceTransparency: 4,
    soloFriendliness: 5,
    lgbtqFriendliness: 5,
    reviewCount: 127,
    basePriceGBP: 4500,
    realPriceGBP: 7200,
  },
  {
    id: "argc",
    name: "ARGC",
    location: "London, UK",
    country: "UK",
    region: "uk",
    treatments: ["ivf", "icsi", "donor-egg", "donor-sperm"],
    successRates: { under35: 52, age35to37: 44, age38to39: 35, age40to42: 20, age43plus: 8 },
    priceTransparency: 2,
    soloFriendliness: 3,
    lgbtqFriendliness: 3,
    reviewCount: 89,
    basePriceGBP: 5000,
    realPriceGBP: 12000,
  },
  {
    id: "create",
    name: "Create Fertility",
    location: "London / Birmingham / Bristol",
    country: "UK",
    region: "uk",
    treatments: ["ivf", "icsi", "iui", "donor-egg", "donor-sperm"],
    successRates: { under35: 38, age35to37: 31, age38to39: 22, age40to42: 12, age43plus: 4 },
    priceTransparency: 5,
    soloFriendliness: 5,
    lgbtqFriendliness: 5,
    reviewCount: 203,
    basePriceGBP: 3500,
    realPriceGBP: 5800,
  },
  {
    id: "care",
    name: "CARE Fertility",
    location: "Multiple UK locations",
    country: "UK",
    region: "uk",
    treatments: ["ivf", "icsi", "iui", "donor-egg", "donor-sperm", "double-donor"],
    successRates: { under35: 41, age35to37: 34, age38to39: 26, age40to42: 14, age43plus: 5 },
    priceTransparency: 3,
    soloFriendliness: 4,
    lgbtqFriendliness: 4,
    reviewCount: 156,
    basePriceGBP: 4200,
    realPriceGBP: 8100,
  },
  {
    id: "manchester-fertility",
    name: "Manchester Fertility",
    location: "Manchester, UK",
    country: "UK",
    region: "uk",
    treatments: ["ivf", "icsi", "iui", "donor-egg", "donor-sperm"],
    successRates: { under35: 39, age35to37: 32, age38to39: 24, age40to42: 13, age43plus: 4 },
    priceTransparency: 4,
    soloFriendliness: 4,
    lgbtqFriendliness: 4,
    reviewCount: 64,
    basePriceGBP: 3800,
    realPriceGBP: 6500,
  },
  {
    id: "ivi-madrid",
    name: "IVI Madrid",
    location: "Madrid, Spain",
    country: "Spain",
    region: "abroad",
    treatments: ["ivf", "icsi", "iui", "donor-egg", "donor-sperm", "double-donor"],
    successRates: { under35: 58, age35to37: 50, age38to39: 42, age40to42: 28, age43plus: 14 },
    priceTransparency: 4,
    soloFriendliness: 5,
    lgbtqFriendliness: 5,
    reviewCount: 312,
    basePriceGBP: 3200,
    realPriceGBP: 5500,
  },
  {
    id: "reprofit-brno",
    name: "Reprofit International",
    location: "Brno, Czech Republic",
    country: "Czech Republic",
    region: "abroad",
    treatments: ["ivf", "icsi", "donor-egg", "donor-sperm", "double-donor"],
    successRates: { under35: 54, age35to37: 47, age38to39: 39, age40to42: 25, age43plus: 11 },
    priceTransparency: 5,
    soloFriendliness: 5,
    lgbtqFriendliness: 4,
    reviewCount: 248,
    basePriceGBP: 2800,
    realPriceGBP: 4800,
  },
  {
    id: "serum-athens",
    name: "SERUM Athens",
    location: "Athens, Greece",
    country: "Greece",
    region: "abroad",
    treatments: ["ivf", "icsi", "iui", "donor-egg", "donor-sperm", "double-donor"],
    successRates: { under35: 56, age35to37: 49, age38to39: 40, age40to42: 26, age43plus: 12 },
    priceTransparency: 4,
    soloFriendliness: 5,
    lgbtqFriendliness: 4,
    reviewCount: 189,
    basePriceGBP: 3000,
    realPriceGBP: 5100,
  },
];

const TREATMENT_OPTIONS: { key: TreatmentType | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "ivf", label: "IVF" },
  { key: "icsi", label: "ICSI" },
  { key: "iui", label: "IUI" },
  { key: "donor-egg", label: "Donor Egg" },
  { key: "donor-sperm", label: "Donor Sperm" },
  { key: "double-donor", label: "Double Donor" },
];

const AGE_OPTIONS: { key: AgeKey; label: string }[] = [
  { key: "under35", label: "Under 35" },
  { key: "age35to37", label: "35–37" },
  { key: "age38to39", label: "38–39" },
  { key: "age40to42", label: "40–42" },
  { key: "age43plus", label: "43+" },
];

const SORT_OPTIONS: { field: SortField; label: string }[] = [
  { field: "successRate", label: "Success Rate" },
  { field: "soloFriendliness", label: "Solo-Friendly" },
  { field: "lgbtqFriendliness", label: "LGBTQ+ Friendly" },
  { field: "priceTransparency", label: "Price Transparency" },
  { field: "realPrice", label: "Lowest Price" },
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
  const [treatment, setTreatment] = useState<TreatmentType | "all">("all");
  const [ageKey, setAgeKey] = useState<AgeKey>("under35");
  const [region, setRegion] = useState<Region>("all");
  const [sortField, setSortField] = useState<SortField>("successRate");

  const filtered = useMemo(() => {
    return CLINICS.filter((c) => {
      if (treatment !== "all" && !c.treatments.includes(treatment)) return false;
      if (region !== "all" && c.region !== region) return false;
      return true;
    }).sort((a, b) => {
      if (sortField === "successRate") return b.successRates[ageKey] - a.successRates[ageKey];
      if (sortField === "realPrice") return a.realPriceGBP - b.realPriceGBP;
      return b[sortField] - a[sortField];
    });
  }, [treatment, ageKey, region, sortField]);

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-2 font-sans">
          Clinic comparison engine
        </p>
        <h2 className="font-serif font-normal text-foreground text-2xl leading-tight">
          UK clinics vs abroad — side by side
        </h2>
        <p className="text-sm font-sans text-muted mt-1">
          HFEA data · community-reported costs · success rates by age bracket
        </p>
      </div>

      {/* Treatment filter */}
      <div className="mb-5">
        <p className="text-[10px] font-[500] uppercase tracking-[0.12em] text-muted mb-3 font-sans">
          Treatment
        </p>
        <div className="flex flex-wrap gap-2">
          {TREATMENT_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setTreatment(opt.key as TreatmentType | "all")}
              className={`rounded-full border text-xs font-sans px-4 py-1.5 transition-colors duration-150 ${
                treatment === opt.key
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Age + Region + Sort row */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6 pb-5 border-b border-border">
        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-[500] uppercase tracking-[0.12em] text-muted font-sans">
            Age bracket
          </p>
          <div className="flex flex-wrap gap-4">
            {AGE_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setAgeKey(opt.key)}
                className={`text-xs font-sans pb-1 transition-colors duration-150 ${
                  ageKey === opt.key
                    ? "text-foreground border-b border-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-[500] uppercase tracking-[0.12em] text-muted font-sans">
            Location
          </p>
          <div className="flex gap-4">
            {(["all", "uk", "abroad"] as Region[]).map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`text-xs font-sans pb-1 transition-colors duration-150 capitalize ${
                  region === r
                    ? "text-foreground border-b border-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {r === "all" ? "UK & Abroad" : r === "uk" ? "UK only" : "Abroad only"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-[500] uppercase tracking-[0.12em] text-muted font-sans">
            Sort by
          </p>
          <div className="flex flex-wrap gap-4">
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
        </div>
      </div>

      {/* Clinic rows */}
      <div>
        <AnimatePresence mode="popLayout">
          {filtered.map((clinic, index) => (
            <motion.div
              key={clinic.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.35, delay: index * 0.03, ease: EASE }}
              className="flex flex-col md:flex-row md:items-center gap-4 py-5 border-t border-border"
            >
              {/* Rank + Name */}
              <div className="flex items-start gap-4 md:w-[38%]">
                <span
                  className="font-serif text-muted leading-none shrink-0 mt-0.5"
                  style={{ fontSize: "1.4rem", fontVariationSettings: "'wght' 300" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-serif text-foreground text-lg leading-tight">{clinic.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {clinic.region === "abroad" ? (
                      <Globe className="h-3 w-3 text-muted" />
                    ) : (
                      <MapPin className="h-3 w-3 text-muted" />
                    )}
                    <p className="text-xs font-sans text-muted">{clinic.location}</p>
                  </div>
                  {/* Treatments */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {clinic.treatments.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-sans font-[500] uppercase tracking-wide px-2 py-0.5 rounded-full"
                        style={{
                          background: treatment === t ? "var(--accent)" : "var(--background-alt)",
                          color: treatment === t ? "var(--foreground)" : "var(--muted)",
                        }}
                      >
                        {TREATMENT_OPTIONS.find((o) => o.key === t)?.label ?? t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="flex flex-wrap gap-x-6 gap-y-3 flex-1">
                <div>
                  <p className="text-[10px] font-[500] uppercase tracking-[0.12em] text-muted font-sans mb-1">
                    Success ({AGE_OPTIONS.find((a) => a.key === ageKey)?.label})
                  </p>
                  <p className="font-serif text-foreground text-xl leading-none">
                    {clinic.successRates[ageKey]}%
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-[500] uppercase tracking-[0.12em] text-muted font-sans mb-2">
                    Solo-Friendly
                  </p>
                  <Dots rating={clinic.soloFriendliness} />
                </div>
                <div>
                  <p className="text-[10px] font-[500] uppercase tracking-[0.12em] text-muted font-sans mb-2">
                    LGBTQ+
                  </p>
                  <Dots rating={clinic.lgbtqFriendliness} />
                </div>
                <div>
                  <p className="text-[10px] font-[500] uppercase tracking-[0.12em] text-muted font-sans mb-2">
                    Pricing
                  </p>
                  <Dots rating={clinic.priceTransparency} />
                </div>
              </div>

              {/* Price */}
              <div className="text-right shrink-0">
                <p className="text-xs font-sans text-muted line-through">
                  £{clinic.basePriceGBP.toLocaleString()} quoted
                </p>
                <p className="font-serif text-foreground text-xl">
                  £{clinic.realPriceGBP.toLocaleString()}
                </p>
                <p className="text-[10px] font-sans text-muted">est. real cost</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="text-sm font-sans text-muted py-8 border-t border-border">
            No clinics match this combination. Try widening your filters.
          </p>
        )}
      </div>

      <p className="text-[11px] font-sans text-muted mt-6 leading-relaxed border-t border-border pt-5" style={{ maxWidth: "72ch" }}>
        UK success rates from HFEA published data (2022/23). Abroad clinic data from clinic-reported figures and community verification. Real prices are community-reported estimates including typical add-ons. All data indicative — verify directly with clinics before booking.
      </p>
    </div>
  );
}
