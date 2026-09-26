import type { Metadata } from "next";
import { MARKETS } from "@/lib/market";

export const metadata: Metadata = {
  title: "CairnFertility US | IVF costs and coverage",
  description:
    "Cairn is coming to the US: what IVF will cost you given your health plan and state, and which clinics fit your family.",
};

/**
 * Every US page renders inside this layout. The root layout owns <html>
 * and declares en-GB for the UK site; the wrapper here re-declares the
 * language as en-US so spelling, screen-reader pronunciation and number
 * formatting follow the market.
 */
export default function UsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang={MARKETS.us.locale} className="flex flex-1 flex-col">
      {children}
    </div>
  );
}
