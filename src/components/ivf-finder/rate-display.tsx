import { ShieldCheck, FileText } from "lucide-react";
import type { AgeBracket, Clinic } from "@/types/clinic";
import { rateFor } from "@/lib/clinics";

/**
 * Verification is system-owned and read-only, so it renders as a Badge, never
 * as a removable Tag. HFEA verified means the figure comes from the register;
 * Clinic reported means the clinic published it and nobody has checked it.
 *
 * Both badges take their colours from the card they sit in
 * (`--card-badge-*`, set in globals.css), so a badge stays legible whether the
 * card is white, unfilled, or inverted to teal on hover. Clinic reported is
 * an outline rather than a grey fill — grey on the cream band goes muddy.
 */
export function VerificationBadge({ verification }: { verification: "hfea" | "clinic" }) {
  return verification === "hfea" ? (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[12px] font-semibold whitespace-nowrap transition-colors"
      style={{
        background: "var(--card-badge-verified-bg, var(--accent-pale))",
        color: "var(--card-badge-verified-ink, var(--teal-ink))",
      }}
    >
      <ShieldCheck className="h-3 w-3" aria-hidden />
      HFEA verified
    </span>
  ) : (
    <span
      className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[12px] font-semibold whitespace-nowrap transition-colors"
      style={{
        borderColor: "var(--card-badge-reported-edge, var(--teal-20))",
        color: "var(--card-badge-reported-ink, var(--muted))",
      }}
    >
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
        <p
          className="text-lg font-bold leading-tight"
          style={{ color: "var(--card-ink-muted, var(--muted))" }}
        >
          Not published
        </p>
        <p className="text-xs mt-0.5" style={{ color: "var(--card-ink-muted, var(--muted))" }}>
          No figure for this age group
        </p>
      </div>
    );
  }

  return (
    <div>
      <p
        className="text-2xl font-bold leading-tight"
        style={{ color: "var(--card-ink, var(--teal-ink))" }}
      >
        {rate}%
      </p>
      <p className="text-xs mt-0.5" style={{ color: "var(--card-ink-muted, var(--muted))" }}>
        live births {denominator}, {year}
      </p>
    </div>
  );
}
