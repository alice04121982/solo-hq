import { ShieldCheck, ExternalLink } from "lucide-react";
import { HFEA } from "@/lib/regulators";

/**
 * A standing card naming the regulator behind the UK figures, shown wherever
 * clinic results render. Regulator data comes from src/lib/regulators.ts so
 * other countries' regulators can join without touching this component's
 * consumers.
 */
export function RegulatorNotice() {
  return (
    <div className="rounded-2xl bg-surface-sunken border border-border p-4 flex items-start gap-3">
      <ShieldCheck className="h-4 w-4 text-teal shrink-0 mt-0.5" aria-hidden />
      <div className="text-xs text-muted leading-relaxed">
        <p>
          <strong className="text-teal-ink">
            UK clinics are regulated by the {HFEA.shortName}
          </strong>{" "}
          ({HFEA.name}). {HFEA.description} The {HFEA.shortName} does not
          endorse this site, and figures here are no substitute for the
          register.
        </p>
        <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          <a
            href={HFEA.registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-teal hover:underline underline-offset-2"
          >
            Check a clinic on the {HFEA.shortName} register
            <ExternalLink className="h-3 w-3" aria-hidden />
          </a>
          <a
            href={HFEA.treatmentGuideUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-teal hover:underline underline-offset-2"
          >
            {HFEA.shortName} guide to treatments and costs
            <ExternalLink className="h-3 w-3" aria-hidden />
          </a>
        </p>
      </div>
    </div>
  );
}
