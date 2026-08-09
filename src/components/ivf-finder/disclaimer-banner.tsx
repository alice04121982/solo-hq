import { AlertTriangle } from "lucide-react";

interface DisclaimerBannerProps {
  fetchedAt?: string;
}

export function DisclaimerBanner({ fetchedAt }: DisclaimerBannerProps) {
  const dateStr = fetchedAt
    ? new Date(fetchedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "recent";

  return (
    <div className="rounded-2xl bg-[#F5F5F5] border border-border p-4 flex items-start gap-3">
      <AlertTriangle className="h-4 w-4 text-muted shrink-0 mt-0.5" />
      <p className="text-xs text-navy/70 leading-relaxed">
        <strong className="text-navy">Important:</strong> Prices and success rates shown are
        indicative and subject to change. Always contact clinics directly for current quotes and
        up-to-date availability. IVF success rates vary by age, diagnosis, and treatment
        protocol. Notes on who a clinic welcomes reflect published policies and are not
        guarantees of experience. Data sourced {dateStr}.
      </p>
    </div>
  );
}
