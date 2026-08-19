"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { countriesByRegion } from "@/lib/clinics";

/**
 * Flag shorthand for the country picker, keyed by the country names in the
 * clinic database. A country without an entry just renders its name.
 */
export const COUNTRY_FLAGS: Record<string, string> = {
  "United Kingdom": "\u{1F1EC}\u{1F1E7}",
  Spain: "\u{1F1EA}\u{1F1F8}",
  "Czech Republic": "\u{1F1E8}\u{1F1FF}",
  Greece: "\u{1F1EC}\u{1F1F7}",
  Denmark: "\u{1F1E9}\u{1F1F0}",
  "South Africa": "\u{1F1FF}\u{1F1E6}",
  Turkey: "\u{1F1F9}\u{1F1F7}",
  "United States": "\u{1F1FA}\u{1F1F8}",
};

interface CountrySelectProps {
  selected: string[];
  onChange: (countries: string[]) => void;
}

/**
 * Country multi-select: a trigger with a live count, opening a checkbox list
 * of every country in the database. It narrows the result list like any other
 * filter and never gates it; clearing the selection returns everything.
 *
 * The open panel is a bordered bg-background surface, in keeping with the
 * finder's no-shadow elevation.
 */
export function CountrySelect({ selected, onChange }: CountrySelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const toggleCountry = (country: string) => {
    onChange(
      selected.includes(country)
        ? selected.filter((c) => c !== country)
        : [...selected, country]
    );
  };

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
          open || selected.length > 0
            ? "border-teal text-teal bg-background"
            : "border-teal/20 text-teal bg-background hover:bg-surface-hover"
        }`}
      >
        Country
        {selected.length > 0 && (
          <span className="flex items-center justify-center min-w-5 h-5 px-1 rounded-full text-[13px] font-bold bg-teal text-on-teal">
            {selected.length}
          </span>
        )}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 z-30 w-64 rounded-2xl bg-background border border-border-warm p-2">
          <div className="max-h-72 overflow-y-auto">
            {countriesByRegion().flatMap(({ countries }) =>
              countries.map((country) => (
                <label
                  key={country}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground cursor-pointer hover:bg-surface-hover transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(country)}
                    onChange={() => toggleCountry(country)}
                    className="h-4 w-4 rounded accent-(--teal)"
                  />
                  <span aria-hidden>{COUNTRY_FLAGS[country] ?? ""}</span>
                  <span className="font-medium">{country}</span>
                </label>
              ))
            )}
          </div>
          <div className="border-t border-border-warm mt-1 pt-2 px-3 pb-1">
            <button
              type="button"
              onClick={() => onChange([])}
              disabled={selected.length === 0}
              className="text-sm text-muted hover:text-teal transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear selection
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
