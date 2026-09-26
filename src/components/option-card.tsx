import type { ReactNode } from "react";
import { Check } from "lucide-react";

/**
 * A single-choice answer in a step-by-step wizard: title, optional
 * subtitle and icon, and a round check on the right. Shared by the clinic
 * matcher (/get-started) and the US coverage checker (/us/coverage) so the
 * two wizards answer the same way.
 */
export function OptionCard({
  selected, onClick, title, subtitle, icon,
}: {
  selected: boolean; onClick: () => void; title: string; subtitle?: string; icon?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-150 ${
        selected ? "border-teal bg-teal/5" : "border-border hover:border-teal/40"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {icon && (
            <span
              className={`shrink-0 mt-0.5 flex w-6 justify-center transition-colors ${
                selected ? "text-foreground" : "text-muted"
              }`}
            >
              {icon}
            </span>
          )}
          <div>
            <p className={`text-sm font-sans font-medium leading-snug ${selected ? "text-foreground" : "text-foreground/80"}`}>
              {title}
            </p>
            {subtitle && (
              <p className="text-xs font-sans text-muted mt-1 leading-relaxed">{subtitle}</p>
            )}
          </div>
        </div>
        <div className={`shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors mt-0.5 ${
          selected ? "border-teal bg-teal" : "border-border"
        }`}>
          {selected && <Check className="h-3 w-3 text-background" strokeWidth={3} />}
        </div>
      </div>
    </button>
  );
}
