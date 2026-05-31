"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { SiteNav } from "@/components/site-nav";
import {
  InternationalClinic,
  ClinicCountry,
  COUNTRY_FLAGS,
  COUNTRY_NAMES,
  formatPriceRange,
  formatSuccessRate,
} from "@/types/international-clinic";

type ClinicWithCountry = InternationalClinic & { country: ClinicCountry | null };

function findMin(values: (number | null)[]): number | null {
  const nums = values.filter((v): v is number => v !== null);
  if (nums.length === 0) return null;
  return Math.min(...nums);
}

interface RowProps {
  label: string;
  values: (React.ReactNode)[];
  highlightIndex?: number;
}

function CompareRow({ label, values, highlightIndex }: RowProps) {
  return (
    <tr className="border-b border-border last:border-0">
      <td className="py-3.5 pr-4 text-sm font-sans text-muted whitespace-nowrap w-44 align-top sticky left-0 bg-background-alt z-10">
        {label}
      </td>
      {values.map((val, i) => (
        <td
          key={i}
          className={`py-3.5 px-4 text-sm font-sans text-foreground align-top ${
            highlightIndex === i ? "bg-accent/10 font-semibold" : ""
          }`}
        >
          {val ?? <span className="text-muted">—</span>}
        </td>
      ))}
    </tr>
  );
}

function BoolValue({ value }: { value: boolean | null }) {
  if (value === null || value === undefined) return <span className="text-muted">—</span>;
  return (
    <span className={value ? "text-green-700 font-medium" : "text-muted"}>
      {value ? "Yes" : "No"}
    </span>
  );
}

function CompareTable() {
  const searchParams = useSearchParams();
  const slugsParam = searchParams.get("slugs") ?? "";
  const slugs = slugsParam
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3);

  const [clinics, setClinics] = useState<ClinicWithCountry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slugs.length === 0) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    supabase
      .from("clinics")
      .select("*, country:clinic_countries(*)")
      .in("slug", slugs)
      .then(({ data }) => {
        if (cancelled) return;
        if (!data) { setLoading(false); return; }
        // Preserve order from query params
        const ordered = slugs
          .map((s) => (data as ClinicWithCountry[]).find((c) => c.slug === s))
          .filter((c): c is ClinicWithCountry => !!c);
        setClinics(ordered);
        setLoading(false);
      });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugsParam]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <p className="font-sans text-muted">Loading clinic data…</p>
      </div>
    );
  }

  if (clinics.length === 0) {
    return (
      <div className="rounded-xl bg-background-alt border border-border p-10 text-center my-12">
        <p className="font-sans text-muted mb-4">No clinics selected for comparison.</p>
        <Link
          href="/clinics"
          className="rounded-full bg-foreground text-background px-6 py-2.5 text-sm font-sans font-medium hover:bg-accent transition-colors"
        >
          Browse clinics
        </Link>
      </div>
    );
  }

  // Helpers for price highlight
  function priceHighlight(mins: (number | null)[]): number | undefined {
    const min = findMin(mins);
    if (min === null) return undefined;
    return mins.findIndex((v) => v === min);
  }

  const ivfMins = clinics.map((c) => c.price_ivf_cycle_gbp_min);
  const donorMins = clinics.map((c) => c.price_donor_egg_ivf_gbp_min);
  const iuiMins = clinics.map((c) => c.price_donor_sperm_iui_gbp_min);
  const freezeMins = clinics.map((c) => c.price_egg_freezing_gbp_min);
  const successU35 = clinics.map((c) => c.success_rate_ivf_under_35);
  const success3537 = clinics.map((c) => c.success_rate_ivf_35_to_37);
  const success3839 = clinics.map((c) => c.success_rate_ivf_38_to_39);

  function successHighlight(rates: (number | null)[]): number | undefined {
    const max = rates.filter((v): v is number => v !== null);
    if (max.length === 0) return undefined;
    const maxVal = Math.max(...max);
    return rates.findIndex((v) => v === maxVal);
  }

  const colCount = clinics.length;

  return (
    <>
      {/* Sticky clinic name header */}
      <div className="sticky top-0 z-20 bg-background border-b border-border">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                <th className="w-44 py-4 pr-4 text-left sticky left-0 bg-background z-10" />
                {clinics.map((c) => (
                  <th
                    key={c.slug}
                    className="py-4 px-4 text-left align-top"
                    style={{ width: `${Math.floor(100 / colCount)}%` }}
                  >
                    <Link
                      href={`/clinics/${c.slug}`}
                      className="font-serif font-semibold text-foreground hover:text-accent transition-colors text-base leading-snug block"
                    >
                      {c.name}
                    </Link>
                    <p className="text-[12px] font-[500] uppercase tracking-[0.12em] text-muted font-sans mt-0.5">
                      {COUNTRY_FLAGS[c.country_code]} {c.city}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto mt-6">
        <table className="w-full min-w-[600px]">
          <tbody>
            {/* Location */}
            <tr className="bg-background-alt">
              <td
                colSpan={1 + clinics.length}
                className="py-2 px-0 text-[12px] font-[500] uppercase tracking-[0.15em] text-muted font-sans sticky left-0"
              >
                Location
              </td>
            </tr>
            <CompareRow
              label="Country"
              values={clinics.map((c) => `${COUNTRY_FLAGS[c.country_code]} ${COUNTRY_NAMES[c.country_code]}`)}
            />
            <CompareRow
              label="City"
              values={clinics.map((c) => c.city)}
            />

            {/* Pricing */}
            <tr className="bg-background-alt">
              <td
                colSpan={1 + clinics.length}
                className="py-2 px-0 text-[12px] font-[500] uppercase tracking-[0.15em] text-muted font-sans"
              >
                Pricing (GBP approx.)
              </td>
            </tr>
            <CompareRow
              label="IVF cycle"
              values={clinics.map((c) =>
                formatPriceRange(c.price_ivf_cycle_gbp_min, c.price_ivf_cycle_gbp_max)
              )}
              highlightIndex={priceHighlight(ivfMins)}
            />
            <CompareRow
              label="Donor egg IVF"
              values={clinics.map((c) =>
                formatPriceRange(c.price_donor_egg_ivf_gbp_min, c.price_donor_egg_ivf_gbp_max)
              )}
              highlightIndex={priceHighlight(donorMins)}
            />
            <CompareRow
              label="Donor sperm IUI"
              values={clinics.map((c) =>
                formatPriceRange(c.price_donor_sperm_iui_gbp_min, c.price_donor_sperm_iui_gbp_max)
              )}
              highlightIndex={priceHighlight(iuiMins)}
            />
            <CompareRow
              label="Egg freezing"
              values={clinics.map((c) =>
                formatPriceRange(c.price_egg_freezing_gbp_min, c.price_egg_freezing_gbp_max)
              )}
              highlightIndex={priceHighlight(freezeMins)}
            />

            {/* Success rates */}
            <tr className="bg-background-alt">
              <td
                colSpan={1 + clinics.length}
                className="py-2 px-0 text-[12px] font-[500] uppercase tracking-[0.15em] text-muted font-sans"
              >
                Success rates
              </td>
            </tr>
            <CompareRow
              label="Under 35"
              values={clinics.map((c) => formatSuccessRate(c.success_rate_ivf_under_35))}
              highlightIndex={successHighlight(successU35)}
            />
            <CompareRow
              label="35–37"
              values={clinics.map((c) => formatSuccessRate(c.success_rate_ivf_35_to_37))}
              highlightIndex={successHighlight(success3537)}
            />
            <CompareRow
              label="38–39"
              values={clinics.map((c) => formatSuccessRate(c.success_rate_ivf_38_to_39))}
              highlightIndex={successHighlight(success3839)}
            />

            {/* Practical */}
            <tr className="bg-background-alt">
              <td
                colSpan={1 + clinics.length}
                className="py-2 px-0 text-[12px] font-[500] uppercase tracking-[0.15em] text-muted font-sans"
              >
                Practical info
              </td>
            </tr>
            <CompareRow
              label="Solo friendly"
              values={clinics.map((c) => <BoolValue key={c.slug} value={c.treats_single_women} />)}
            />
            <CompareRow
              label="Remote consultation"
              values={clinics.map((c) => <BoolValue key={c.slug} value={c.remote_initial_consultation} />)}
            />
            <CompareRow
              label="English speaking"
              values={clinics.map((c) => <BoolValue key={c.slug} value={c.english_speaking} />)}
            />
            <CompareRow
              label="Travel visits"
              values={clinics.map((c) =>
                c.travel_required_visits !== null
                  ? `${c.travel_required_visits} visit${c.travel_required_visits !== 1 ? "s" : ""}`
                  : null
              )}
            />
            <CompareRow
              label="Stay duration"
              values={clinics.map((c) =>
                c.shortest_stay_days !== null
                  ? `${c.shortest_stay_days} day${c.shortest_stay_days !== 1 ? "s" : ""}`
                  : null
              )}
            />

            {/* Country regulatory */}
            <tr className="bg-background-alt">
              <td
                colSpan={1 + clinics.length}
                className="py-2 px-0 text-[12px] font-[500] uppercase tracking-[0.15em] text-muted font-sans"
              >
                Country rules
              </td>
            </tr>
            <CompareRow
              label="Donor anonymity"
              values={clinics.map((c) => (
                <span key={c.slug} className="capitalize">
                  {c.country?.donor_anonymity ?? "—"}
                </span>
              ))}
            />
            <CompareRow
              label="Age limit"
              values={clinics.map((c) =>
                c.country?.age_limit_treatment
                  ? `Up to ${c.country.age_limit_treatment}`
                  : "Not specified"
              )}
            />
          </tbody>
        </table>
      </div>

      {/* Back link */}
      <div className="pt-10 pb-16 border-t border-border mt-8">
        <Link
          href="/clinics"
          className="text-sm font-sans text-muted hover:text-foreground transition-colors"
        >
          ← Back to all clinics
        </Link>
      </div>
    </>
  );
}

export default function ComparePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <SiteNav />

        <header className="py-10 border-b border-border mb-2">
          <p className="text-[12px] font-[500] uppercase tracking-[0.15em] text-muted font-sans mb-3">
            Side by side
          </p>
          <h1
            className="font-serif font-semibold text-foreground"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.08 }}
          >
            Compare Clinics
          </h1>
        </header>

        <Suspense
          fallback={
            <div className="py-24 text-center">
              <p className="font-sans text-muted">Loading…</p>
            </div>
          }
        >
          <CompareTable />
        </Suspense>
      </div>
    </main>
  );
}
