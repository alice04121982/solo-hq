"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  ChevronDown,
  ChevronUp,
  Microscope,
  Dna,
  Timer,
} from "lucide-react";
import { InfoTooltip } from "./info-tooltip";

interface AddOn {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: React.ReactNode;
  enabled: boolean;
}

const BASELINE_PRICE = 9999;

const SOLO_ESSENTIALS = [
  { name: "Donor Sperm Vials (2 vials avg.)", cost: 1050, note: "Xytex/Cryos pricing, £900–£1,200 per vial" },
  { name: "Shipping & Tank Rental", cost: 500, note: "International shipping to UK clinic" },
  { name: "Clinic Admin/Coordination Fee", cost: 250, note: "Solo patient coordination surcharge" },
  { name: "Mandatory Implications Counselling", cost: 175, note: "HFEA requirement for donor conception" },
];

const SOLO_ESSENTIALS_TOTAL = SOLO_ESSENTIALS.reduce((sum, item) => sum + item.cost, 0);

export function CostCalculator() {
  const [addOns, setAddOns] = useState<AddOn[]>([
    {
      id: "embryoscope",
      name: "EmbryoScope (Time-Lapse)",
      description:
        "Continuous monitoring of embryo development without removing from incubator. Evidence of benefit is debated.",
      cost: 500,
      icon: <Timer className="h-5 w-5" />,
      enabled: false,
    },
    {
      id: "icsi",
      name: "ICSI (Intracytoplasmic Sperm Injection)",
      description:
        "Direct injection of sperm into egg. Often recommended with donor sperm but not always necessary.",
      cost: 1200,
      icon: <Microscope className="h-5 w-5" />,
      enabled: false,
    },
    {
      id: "pgta",
      name: "PGT-A (Genetic Testing)",
      description:
        "Pre-implantation genetic testing for aneuploidies. More relevant for patients over 37. Costs per embryo biopsied.",
      cost: 2500,
      icon: <Dna className="h-5 w-5" />,
      enabled: false,
    },
  ]);

  const [showEssentials, setShowEssentials] = useState(false);

  const toggleAddOn = useCallback((id: string) => {
    setAddOns((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    );
  }, []);

  const addOnsTotal = addOns
    .filter((a) => a.enabled)
    .reduce((sum, a) => sum + a.cost, 0);

  const realLifeTotal = BASELINE_PRICE + SOLO_ESSENTIALS_TOTAL + addOnsTotal;

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-2xl bg-lime/20 flex items-center justify-center">
          <Calculator className="h-5 w-5 text-charcoal" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-navy">
            The &ldquo;Real-Life Cost&rdquo; Calculator
          </h2>
          <p className="text-sm text-muted">
            What clinics quote vs. what you actually pay as a solo mum
          </p>
        </div>
      </div>

      {/* Price Comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="rounded-2xl border border-card-border p-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">
            Clinic Marketing Price
          </p>
          <p className="text-3xl font-bold text-navy">
            £{BASELINE_PRICE.toLocaleString()}
          </p>
          <p className="text-xs text-muted mt-1">Multi-Cycle IVF Package</p>
        </div>
        <div className="rounded-2xl bg-lime p-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/70 mb-1">
            Your Real-Life Total
          </p>
          <motion.p
            key={realLifeTotal}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-3xl font-bold text-charcoal"
          >
            £{realLifeTotal.toLocaleString()}
          </motion.p>
          <p className="text-xs text-charcoal/70 mt-1">
            Including solo essentials
            {addOnsTotal > 0 ? " + add-ons" : ""}
          </p>
        </div>
      </div>

      {/* Gap Explanation */}
      <div className="rounded-2xl bg-lavender-light/50 border border-lavender/30 p-4 mb-6">
        <div className="flex items-start gap-2">
          <InfoTooltip content="Clinic headline prices are for the medical procedure only. As a solo mum, you must also budget for donor sperm, shipping, counselling, and coordination — costs that couples typically don't face." />
          <p className="text-sm text-navy leading-relaxed">
            <strong>Why the gap?</strong> Clinic quotes cover the medical procedure.
            They rarely include the costs unique to solo patients: donor sperm,
            international shipping, mandatory counselling, and coordination fees.
            The difference can easily exceed{" "}
            <strong>
              £{SOLO_ESSENTIALS_TOTAL.toLocaleString()}
            </strong>{" "}
            before you even consider optional treatments.
          </p>
        </div>
      </div>

      {/* Solo Essentials Breakdown */}
      <div className="mb-6">
        <button
          onClick={() => setShowEssentials(!showEssentials)}
          className="flex items-center gap-2 text-sm font-semibold text-navy hover:text-lavender-dark transition-colors w-full"
        >
          Solo Essentials (Automatic)
          <span className="text-xs font-normal text-muted">
            +£{SOLO_ESSENTIALS_TOTAL.toLocaleString()}
          </span>
          {showEssentials ? (
            <ChevronUp className="h-4 w-4 ml-auto" />
          ) : (
            <ChevronDown className="h-4 w-4 ml-auto" />
          )}
        </button>
        <AnimatePresence>
          {showEssentials && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="mt-3 space-y-2">
                {SOLO_ESSENTIALS.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-xl bg-warm-white p-3 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-navy font-medium">{item.name}</span>
                      <InfoTooltip content={item.note} />
                    </div>
                    <span className="font-semibold text-navy">
                      £{item.cost.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Optional Add-Ons */}
      <div>
        <p className="text-sm font-semibold text-navy mb-3">
          The &ldquo;Minefield&rdquo; Add-Ons{" "}
          <span className="font-normal text-muted">(toggle to see impact)</span>
        </p>
        <div className="space-y-3">
          {addOns.map((addOn) => (
            <button
              key={addOn.id}
              onClick={() => toggleAddOn(addOn.id)}
              className={`w-full flex items-center gap-4 rounded-2xl p-4 text-left transition-all duration-200 ${
                addOn.enabled
                  ? "bg-lime/15 border-2 border-lime-dark"
                  : "bg-warm-white border-2 border-transparent hover:border-lavender/40"
              }`}
            >
              <div
                className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
                  addOn.enabled ? "bg-lime text-charcoal" : "bg-lavender-light text-lavender-dark"
                }`}
              >
                {addOn.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-navy">{addOn.name}</p>
                <p className="text-xs text-muted leading-relaxed mt-0.5">
                  {addOn.description}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-navy">
                  +£{addOn.cost.toLocaleString()}
                </p>
                <div
                  className={`mt-1 h-5 w-10 rounded-full transition-colors duration-200 relative ${
                    addOn.enabled ? "bg-lime-dark" : "bg-card-border"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                      addOn.enabled ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Total Summary Bar */}
      <div className="mt-8 rounded-2xl bg-navy p-5 flex items-center justify-between">
        <div>
          <p className="text-xs text-warm-white/60 uppercase tracking-wider">
            Estimated Real-Life Total
          </p>
          <p className="text-xs text-warm-white/40 mt-0.5">
            Based on average UK clinic pricing, 2024/25
          </p>
        </div>
        <motion.p
          key={realLifeTotal}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          className="text-2xl md:text-3xl font-bold text-lime"
        >
          £{realLifeTotal.toLocaleString()}
        </motion.p>
      </div>
    </div>
  );
}
