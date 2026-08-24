"use client";

import { countriesByRegion } from "@/lib/clinics";
import { MultiSelectDropdown, type FilterOption } from "./filter-dropdown";

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
 * Country multi-select, ordered by region so the UK sits above the overseas
 * options. It narrows the result list like any other filter and never gates
 * it; clearing the selection returns everything.
 */
export function CountrySelect({ selected, onChange }: CountrySelectProps) {
  const options: FilterOption<string>[] = countriesByRegion().flatMap(({ countries }) =>
    countries.map((country) => ({
      value: country,
      label: country,
      prefix: COUNTRY_FLAGS[country],
    }))
  );

  return (
    <MultiSelectDropdown
      label="Country"
      options={options}
      selected={selected}
      onChange={onChange}
    />
  );
}
