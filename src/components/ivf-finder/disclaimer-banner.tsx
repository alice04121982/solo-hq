import { AlertTriangle } from "lucide-react";

export function DisclaimerBanner() {
  return (
    <div className="rounded-2xl bg-surface-sunken border border-border p-4 flex items-start gap-3">
      <AlertTriangle className="h-4 w-4 text-muted shrink-0 mt-0.5" aria-hidden />
      <p className="text-xs text-muted leading-relaxed">
        <strong className="text-teal-ink">Important:</strong>{" "}
        prices and success rates shown
        here are indicative and change over time. Always confirm current figures with the
        clinic and, for UK clinics, check the HFEA register. Success rates vary with age,
        diagnosis and treatment protocol, and a clinic&apos;s published rate is not a
        prediction for any individual.
      </p>
    </div>
  );
}
