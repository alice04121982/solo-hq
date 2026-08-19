import { AlertTriangle } from "lucide-react";
import { DATA_PROVENANCE } from "@/lib/clinics";
import { HFEA } from "@/lib/regulators";

export function DisclaimerBanner() {
  return (
    <div className="rounded-2xl bg-background border border-border-warm p-4 flex items-start gap-3">
      <AlertTriangle className="h-4 w-4 text-muted shrink-0 mt-0.5" aria-hidden />
      <p className="text-xs text-muted leading-relaxed">
        <strong className="text-teal-ink">Important:</strong>{" "}
        prices and success rates shown here are indicative and change over time. Prices come
        from {DATA_PROVENANCE.pricesSourceLabel}, last verified on{" "}
        {new Date(`${DATA_PROVENANCE.pricesVerifiedOn}T00:00:00Z`).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        })}
        . Always confirm current figures with the clinic and, for UK clinics, check the{" "}
        <a
          href={HFEA.registerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-teal hover:underline underline-offset-2"
        >
          {HFEA.shortName} register
        </a>
        . Success rates vary with age, diagnosis and treatment protocol, and a clinic&apos;s
        published rate is not a prediction for any individual.
      </p>
    </div>
  );
}
