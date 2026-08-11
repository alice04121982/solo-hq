import { ShieldCheck, FileText } from "lucide-react";
import type { AgeBracket, Clinic } from "@/types/clinic";
import { rateFor } from "@/lib/clinics";

/**
 * Verification is system-owned and read-only, so it renders as a Badge, never
 * as a removable Tag. HFEA verified means the figure comes from the register;
 * Clinic reported means the clinic published it and nobody has checked it.
 */
export function VerificationBadge({ verification }: { verification: "hfea" | "clinic" }) {
  return verification === "hfea" ? (
    <span className="inline-flex items-center gap-1 rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-semibold text-teal-ink whitespace-nowrap">
      <ShieldCheck className="h-3 w-3" aria-hidden />
      HFEA verified
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full bg-surface-sunken px-2 py-0.5 text-[10px] font-semibold text-muted whitespace-nowrap">
      <FileText className="h-3 w-3" aria-hidden />
      Clinic reported
    </span>
  );
}

/**
 * A clinic's headline figure for the selected bracket: the number, then the
 * denominator and year it was calculated on, because those change what the
 * number means. Where nothing is published, it says so; it never shows a zero.
 */
export function RateFigure({ clinic, bracket }: { clinic: Clinic; bracket: AgeBracket }) {
  const rate = rateFor(clinic, bracket);
  const { denominator, year } = clinic.successRates;

  if (rate == null) {
    return (
      <div>
        <p className="text-lg font-bold text-muted leading-tight">Not published</p>
        <p className="text-xs text-muted mt-0.5">No figure for this age group</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-2xl font-bold text-teal-ink leading-tight">{rate}%</p>
      <p className="text-xs text-muted mt-0.5">
        live births {denominator}, {year}
      </p>
    </div>
  );
}
