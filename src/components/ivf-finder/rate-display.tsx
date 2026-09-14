import { ShieldCheck, FileText } from "lucide-react";
import type { AgeBracket, Clinic } from "@/types/clinic";
import { rateBandLabel, rateFor, verdictFor } from "@/lib/clinics";
import { BADGE_CLINIC, BADGE_HFEA, VERDICT_LABELS, rateLine } from "@/lib/rate-labels";

/**
 * Verification is system-owned and read-only, so it renders as a Badge, never
 * as a removable Tag. The wording comes from src/lib/rate-labels.ts so every
 * surface says the same thing.
 *
 * Both badges take their colours from the card they sit in
 * (`--card-badge-*`, set in globals.css), so a badge stays legible whether the
 * card is white, unfilled, or inverted to teal on hover.
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
      {BADGE_HFEA}
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
      {BADGE_CLINIC}
    </span>
  );
}

/**
 * The small label over a figure on a clinic card ("Your age group",
 * "Headline price"), so the finder and the matcher label their figures the
 * same way. Ink follows the card.
 */
export function FigureLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[11px] font-sans font-semibold uppercase tracking-[0.12em] whitespace-nowrap mb-1"
      style={{ color: "var(--card-ink-muted, var(--muted))" }}
    >
      {children}
    </p>
  );
}

/**
 * A clinic's headline figure for the selected bracket: the number, then what
 * it measures, which year and who published it. UK figures also name the
 * HFEA band the bracket falls in and the register's verdict against the
 * national average, because the band is wider than the filter. Where nothing
 * is published, it says so; it never shows a zero.
 */
export function RateFigure({ clinic, bracket }: { clinic: Clinic; bracket: AgeBracket }) {
  const rate = rateFor(clinic, bracket);
  const muted = { color: "var(--card-ink-muted, var(--muted))" };

  if (rate == null) {
    return (
      <div>
        <p className="text-lg font-bold leading-tight" style={muted}>
          Not published
        </p>
        <p className="text-xs mt-0.5" style={muted}>
          No live birth figure for this age group
        </p>
      </div>
    );
  }

  const verdict = verdictFor(clinic, bracket);
  const band = rateBandLabel(clinic, bracket);

  return (
    <div>
      <p className="text-2xl font-bold leading-tight" style={{ color: "var(--card-ink, var(--teal-ink))" }}>
        {rate}%
      </p>
      <p className="text-xs mt-0.5" style={muted}>
        {rateLine(clinic)}
      </p>
      {verdict && (
        <p className="text-xs mt-0.5" style={muted}>
          {band.charAt(0).toUpperCase() + band.slice(1)}: {VERDICT_LABELS[verdict].toLowerCase()}
        </p>
      )}
    </div>
  );
}
