"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Heart,
  MapPin,
  Phone,
  Globe,
  ChevronDown,
  Check,
  Plus,
  Clock,
  Stethoscope,
} from "lucide-react";
import type { ClinicData } from "@/types/clinic";

interface ClinicCardProps {
  clinic: ClinicData;
  isSelected: boolean;
  onToggleCompare: (clinic: ClinicData) => void;
  compareDisabled: boolean; // true when 4 already selected and this isn't one
}

function fmt(n?: number): string {
  if (n == null) return "—";
  return `£${n.toLocaleString()}`;
}

export function ClinicCard({
  clinic,
  isSelected,
  onToggleCompare,
  compareDisabled,
}: ClinicCardProps) {
  const [expanded, setExpanded] = useState(false);

  const lowestPrice = Math.min(
    ...[clinic.prices.basicIvf, clinic.prices.donorSpermIvf].filter(
      (p): p is number => p != null
    )
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-[32px] bg-card-bg border-2 transition-all duration-200 overflow-hidden ${
        isSelected ? "border-lime-dark shadow-md" : "border-card-border shadow-sm"
      }`}
    >
      {/* Main card content */}
      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              {clinic.hfeaLicensed && (
                <span className="inline-flex items-center gap-1 rounded-full bg-lime/20 px-2 py-0.5 text-[10px] font-semibold text-charcoal">
                  <ShieldCheck className="h-3 w-3" />
                  HFEA Licensed
                </span>
              )}
              {clinic.soloFriendly && (
                <span className="inline-flex items-center gap-1 rounded-full bg-lavender px-2 py-0.5 text-[10px] font-semibold text-navy">
                  <Heart className="h-3 w-3" />
                  Solo-friendly
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-navy leading-tight">
              {clinic.name}
            </h3>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3 text-muted shrink-0" />
              <p className="text-xs text-muted truncate">{clinic.address}</p>
            </div>
          </div>
          {clinic.distanceMiles != null && (
            <div className="text-right shrink-0">
              <p className="text-lg font-bold text-lavender-dark">
                {clinic.distanceMiles}
              </p>
              <p className="text-[10px] text-muted">miles</p>
            </div>
          )}
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="rounded-xl bg-warm-white p-2.5 text-center">
            <p className="text-xs text-muted leading-none mb-1">IVF from</p>
            <p className="text-sm font-bold text-navy">
              {lowestPrice === Infinity ? "—" : `£${lowestPrice.toLocaleString()}`}
            </p>
          </div>
          <div className="rounded-xl bg-warm-white p-2.5 text-center">
            <p className="text-xs text-muted leading-none mb-1">Success &lt;35</p>
            <p className="text-sm font-bold text-navy">
              {clinic.successRates.under35 != null
                ? `${clinic.successRates.under35}%`
                : "—"}
            </p>
          </div>
          <div className="rounded-xl bg-warm-white p-2.5 text-center">
            <p className="text-xs text-muted leading-none mb-1">Wait</p>
            <p className="text-sm font-bold text-navy">
              {clinic.waitingTimeWeeks != null
                ? `${clinic.waitingTimeWeeks}wk`
                : "—"}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onToggleCompare(clinic)}
            disabled={compareDisabled && !isSelected}
            className={`flex-1 flex items-center justify-center gap-1.5 h-9 rounded-full text-xs font-semibold transition-colors ${
              isSelected
                ? "bg-lime text-charcoal hover:bg-lime-dark"
                : compareDisabled
                  ? "bg-warm-white text-muted cursor-not-allowed border border-card-border"
                  : "bg-warm-white text-navy hover:bg-lavender-light border border-card-border"
            }`}
          >
            {isSelected ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Added to Compare
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5" />
                Add to Compare
              </>
            )}
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 h-9 px-3 rounded-full border border-card-border text-xs font-medium text-navy hover:bg-warm-white transition-colors"
          >
            Details
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-card-border pt-4">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted mb-2">
                    Pricing
                  </p>
                  <div className="space-y-1.5">
                    {[
                      { label: "Basic IVF", val: clinic.prices.basicIvf },
                      { label: "IVF + ICSI", val: clinic.prices.ivfIcsi },
                      { label: "Donor Sperm IVF", val: clinic.prices.donorSpermIvf },
                      { label: "Donor Egg IVF", val: clinic.prices.donorEggIvf },
                      { label: "Embryo Storage/yr", val: clinic.prices.embryoStorage },
                      { label: "Solo Package", val: clinic.prices.soloPackage },
                      { label: "Consultation", val: clinic.prices.consultation },
                    ].map(({ label, val }) => (
                      <div key={label} className="flex justify-between text-xs">
                        <span className="text-muted">{label}</span>
                        <span className="font-medium text-navy">{fmt(val)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted mb-2">
                    Success Rates
                  </p>
                  <div className="space-y-1.5 mb-4">
                    {[
                      { label: "Under 35", val: clinic.successRates.under35 },
                      { label: "35–37", val: clinic.successRates.age35to37 },
                      { label: "38–39", val: clinic.successRates.age38to39 },
                    ].map(({ label, val }) => (
                      <div key={label} className="flex justify-between text-xs">
                        <span className="text-muted">{label}</span>
                        <span className="font-medium text-navy">
                          {val != null ? `${val}%` : "—"}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs">
                      <Stethoscope className="h-3 w-3 text-muted" />
                      <span className="text-muted">NHS referrals:</span>
                      <span className="font-medium text-navy">
                        {clinic.nhsReferrals == null ? "—" : clinic.nhsReferrals ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <Clock className="h-3 w-3 text-muted" />
                      <span className="text-muted">Payment plans:</span>
                      <span className="font-medium text-navy">
                        {clinic.paymentPlans == null ? "—" : clinic.paymentPlans ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {clinic.phone && (
                  <a
                    href={`tel:${clinic.phone}`}
                    className="inline-flex items-center gap-1.5 text-xs text-navy hover:text-lavender-dark transition-colors"
                  >
                    <Phone className="h-3 w-3" />
                    {clinic.phone}
                  </a>
                )}
                {clinic.website && (
                  <a
                    href={clinic.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-navy text-warm-white px-3 py-1.5 text-xs font-medium hover:bg-charcoal transition-colors"
                  >
                    <Globe className="h-3 w-3" />
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
