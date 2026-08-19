"use client";

import { countriesByRegion } from "@/lib/clinics";
import { CountryFlag } from "@/components/country-flag";
import { MultiSelectDropdown, type FilterOption } from "./filter-dropdown";

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
      prefix: <CountryFlag country={country} />,
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
