import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, CheckCircle2, XCircle, Globe, ShieldAlert } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { SiteNav } from "@/components/site-nav";
import { ClinicLogo } from "@/components/clinic-browser/clinic-logo";
import {
  InternationalClinic,
  ClinicPackage,
  ClinicCountry,
  COUNTRY_FLAGS,
  COUNTRY_NAMES,
  formatPriceRange,
  formatSuccessRate,
} from "@/types/international-clinic";

export async function generateStaticParams() {
  const { data } = await supabase.from("clinics").select("slug");
  return (data ?? []).map((row: { slug: string }) => ({ slug: row.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await supabase
    .from("clinics")
    .select("name, city, country_code")
    .eq("slug", slug)
    .single();

  if (!data) return { title: "Clinic not found — Flying Solo" };

  return {
    title: `${data.name}, ${data.city} — Flying Solo`,
    description: `Full pricing, success rates and solo-friendly details for ${data.name} in ${data.city}, ${COUNTRY_NAMES[data.country_code] ?? data.country_code}.`,
  };
}

function PackageCard({ pkg }: { pkg: ClinicPackage }) {
  return (
    <div className="rounded-xl border border-border bg-background p-5">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <p className="text-base font-sans font-semibold text-foreground leading-snug">
            {pkg.name}
          </p>
          {pkg.cycles && (
            <p className="text-sm font-sans text-muted mt-0.5">
              {pkg.cycles} cycle{pkg.cycles !== 1 ? "s" : ""}
              {pkg.includes_meds ? " · medications included" : ""}
            </p>
          )}
        </div>
        <div className="text-right shrink-0">
          {pkg.price_gbp != null && (
            <p className="text-lg font-sans font-bold text-foreground">
              £{pkg.price_gbp.toLocaleString()}
            </p>
          )}
          {pkg.saves_gbp != null && pkg.saves_gbp > 0 && (
            <p
              className="text-sm font-sans font-semibold"
              style={{ color: "var(--primary)" }}
            >
              Save £{pkg.saves_gbp.toLocaleString()}
            </p>
          )}
        </div>
      </div>

      {pkg.money_back && (
        <div className="flex items-start gap-2 mt-3 rounded-lg p-3"
          style={{ background: "color-mix(in srgb, var(--primary) 8%, transparent)" }}>
          <ShieldAlert
            className="h-4 w-4 shrink-0 mt-0.5"
            style={{ color: "var(--primary)" }}
          />
          <p className="text-sm font-sans leading-relaxed" style={{ color: "var(--primary)" }}>
            {pkg.money_back_terms ?? "Money-back guarantee if unsuccessful"}
          </p>
        </div>
      )}

      {pkg.description && (
        <p className="text-sm font-sans text-muted mt-2 leading-relaxed">
          {pkg.description}
        </p>
      )}
    </div>
  );
}

function BoolCell({ value }: { value: boolean | null }) {
  if (value === null || value === undefined)
    return <span className="text-muted font-sans text-sm">—</span>;
  return value ? (
    <span className="flex items-center gap-1 text-green-700 font-sans text-sm font-medium">
      <CheckCircle2 className="h-4 w-4" /> Yes
    </span>
  ) : (
    <span className="flex items-center gap-1 text-muted font-sans text-sm">
      <XCircle className="h-4 w-4" /> No
    </span>
  );
}

export default async function ClinicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: clinic } = await supabase
    .from("clinics")
    .select("*, country:clinic_countries(*)")
    .eq("slug", slug)
    .single();

  if (!clinic) notFound();

  const c = clinic as InternationalClinic & { country: ClinicCountry };
  const country = c.country;
  const flag = COUNTRY_FLAGS[c.country_code] ?? "";
  const countryName = COUNTRY_NAMES[c.country_code] ?? c.country_code;

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <SiteNav />

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[12px] font-[500] uppercase tracking-[0.15em] text-muted font-sans py-4 flex-wrap">
          <Link href="/clinics" className="hover:text-foreground transition-colors">
            Clinics
          </Link>
          <span>/</span>
          <Link
            href={`/clinics/country/${c.country_code}`}
            className="hover:text-foreground transition-colors"
          >
            {flag} {countryName}
          </Link>
          <span>/</span>
          <span className="text-foreground">{c.name}</span>
        </nav>

        {/* Hero */}
        <header className="py-10 md:py-14 border-b border-border">
          <div className="flex items-start gap-5">
            {/* Logo */}
            <ClinicLogo website={c.website} name={c.name} size={80} />

            <div className="flex-1 min-w-0">
              {/* Badges */}
              <div className="flex flex-wrap items-start gap-2 mb-3">
                {c.treats_single_women && (
                  <span className="rounded-full bg-green-50 text-green-700 text-[12px] font-[500] uppercase tracking-[0.15em] px-2.5 py-1">
                    Solo-friendly
                  </span>
                )}
                {c.verification_status === "clinic_confirmed" && (
                  <span className="rounded-full bg-accent/10 text-accent text-[12px] font-[500] uppercase tracking-[0.15em] px-2.5 py-1">
                    Clinic confirmed
                  </span>
                )}
                {c.verification_status === "human_verified" && (
                  <span className="rounded-full bg-accent/10 text-accent text-[12px] font-[500] uppercase tracking-[0.15em] px-2.5 py-1">
                    Human verified
                  </span>
                )}
              </div>

              <h1
                className="font-serif font-semibold text-foreground mb-2"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", lineHeight: 1.08 }}
              >
                {c.name}
              </h1>
              <p className="text-[12px] font-[500] uppercase tracking-[0.15em] text-muted font-sans mb-5">
                {flag} {c.city}, {countryName}
              </p>

              {c.website && (
                <a
                  href={c.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-2.5 text-sm font-sans font-medium hover:bg-accent transition-colors"
                >
                  <Globe className="h-3.5 w-3.5" />
                  Visit website
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              )}
            </div>
          </div>
        </header>

        {/* 3-column info grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10 border-b border-border">
          {/* Pricing table */}
          <div className="rounded-xl bg-background-alt border border-border p-6">
            <p className="text-[12px] font-[500] uppercase tracking-[0.15em] text-muted font-sans mb-4">
              Pricing (GBP approx.)
            </p>
            <table className="w-full">
              <tbody className="divide-y divide-border">
                {[
                  { label: "IVF cycle", price: formatPriceRange(c.price_ivf_cycle_gbp_min, c.price_ivf_cycle_gbp_max) },
                  { label: "Donor egg IVF", price: formatPriceRange(c.price_donor_egg_ivf_gbp_min, c.price_donor_egg_ivf_gbp_max) },
                  { label: "Donor sperm IUI", price: formatPriceRange(c.price_donor_sperm_iui_gbp_min, c.price_donor_sperm_iui_gbp_max) },
                  { label: "Egg freezing", price: formatPriceRange(c.price_egg_freezing_gbp_min, c.price_egg_freezing_gbp_max) },
                ].map(({ label, price }) => (
                  <tr key={label}>
                    <td className="py-2.5 text-sm font-sans text-muted pr-4">{label}</td>
                    <td className="py-2.5 text-sm font-sans font-medium text-foreground text-right">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {c.price_includes_meds !== null && (
              <p className="mt-3 text-xs font-sans text-muted">
                Medications {c.price_includes_meds ? "included" : "not included"} in prices above.
              </p>
            )}
          </div>

          {/* Success rates table */}
          <div className="rounded-xl bg-background-alt border border-border p-6">
            <p className="text-[12px] font-[500] uppercase tracking-[0.15em] text-muted font-sans mb-4">
              Success rates
              {c.success_rate_year ? ` (${c.success_rate_year})` : ""}
            </p>
            <table className="w-full">
              <tbody className="divide-y divide-border">
                {[
                  { label: "Under 35", rate: c.success_rate_ivf_under_35 },
                  { label: "35–37", rate: c.success_rate_ivf_35_to_37 },
                  { label: "38–39", rate: c.success_rate_ivf_38_to_39 },
                  { label: "40–42", rate: c.success_rate_ivf_40_to_42 },
                ].map(({ label, rate }) => (
                  <tr key={label}>
                    <td className="py-2.5 text-sm font-sans text-muted pr-4">{label}</td>
                    <td className="py-2.5 text-sm font-sans font-medium text-foreground text-right">
                      {formatSuccessRate(rate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {c.success_rate_metric && (
              <p className="mt-3 text-xs font-sans text-muted">{c.success_rate_metric}</p>
            )}
            {c.success_rate_source_url && (
              <a
                href={c.success_rate_source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center gap-1 text-xs font-sans text-accent hover:underline"
              >
                Source <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>

          {/* Key facts */}
          <div className="rounded-xl bg-background-alt border border-border p-6">
            <p className="text-[12px] font-[500] uppercase tracking-[0.15em] text-muted font-sans mb-4">
              Key facts
            </p>
            <dl className="divide-y divide-border">
              {[
                { label: "English speaking", value: <BoolCell value={c.english_speaking} /> },
                { label: "Remote consultation", value: <BoolCell value={c.remote_initial_consultation} /> },
                {
                  label: "Travel visits required",
                  value: (
                    <span className="text-sm font-sans font-medium text-foreground">
                      {c.travel_required_visits !== null ? `${c.travel_required_visits} visit${c.travel_required_visits !== 1 ? "s" : ""}` : "—"}
                    </span>
                  ),
                },
                {
                  label: "Shortest stay",
                  value: (
                    <span className="text-sm font-sans font-medium text-foreground">
                      {c.shortest_stay_days !== null ? `${c.shortest_stay_days} day${c.shortest_stay_days !== 1 ? "s" : ""}` : "—"}
                    </span>
                  ),
                },
                { label: "Treats single women", value: <BoolCell value={c.treats_single_women} /> },
                {
                  label: "Last verified",
                  value: (
                    <span className="text-sm font-sans text-muted">
                      {new Date(c.last_verified_at).toLocaleDateString("en-GB", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  ),
                },
              ].map(({ label, value }) => (
                <div key={label} className="py-2.5 flex items-center justify-between gap-4">
                  <dt className="text-sm font-sans text-muted">{label}</dt>
                  <dd className="text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Packages & bundles */}
        {c.packages && c.packages.length > 0 && (
          <div className="py-10 border-b border-border">
            <p className="text-[12px] font-[500] uppercase tracking-[0.15em] text-muted font-sans mb-6">
              Packages &amp; bundles
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {c.packages.map((pkg) => (
                <PackageCard key={pkg.name} pkg={pkg} />
              ))}
            </div>
            <p className="text-xs font-sans text-muted mt-4">
              Prices are estimates in GBP. Confirm directly with the clinic before booking.
            </p>
          </div>
        )}

        {/* Country regulatory info box */}
        {country && (
          <div className="rounded-xl bg-background-alt border border-border p-6 mt-8 mb-4">
            <p className="text-[12px] font-[500] uppercase tracking-[0.15em] text-muted font-sans mb-3">
              {flag} {countryName}: Regulatory overview
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs font-sans text-muted mb-0.5">Donor anonymity</p>
                <p className="text-sm font-sans font-medium text-foreground capitalize">
                  {country.donor_anonymity}
                </p>
              </div>
              <div>
                <p className="text-xs font-sans text-muted mb-0.5">Age limit (treatment)</p>
                <p className="text-sm font-sans font-medium text-foreground">
                  {country.age_limit_treatment ? `Up to ${country.age_limit_treatment}` : "Not specified"}
                </p>
              </div>
              <div>
                <p className="text-xs font-sans text-muted mb-0.5">Age limit (donor eggs)</p>
                <p className="text-sm font-sans font-medium text-foreground">
                  {country.age_limit_donor_eggs ? `Up to ${country.age_limit_donor_eggs}` : "Not specified"}
                </p>
              </div>
              <div>
                <p className="text-xs font-sans text-muted mb-0.5">Embryo transfer limit</p>
                <p className="text-sm font-sans font-medium text-foreground">
                  {country.embryo_transfer_limit ?? "—"}
                </p>
              </div>
              <div>
                <p className="text-xs font-sans text-muted mb-0.5">Solo women eligible</p>
                <p className="text-sm font-sans font-medium text-foreground">
                  {country.single_women_eligible ? "Yes" : "No"}
                </p>
              </div>
              {country.regulatory_body && (
                <div>
                  <p className="text-xs font-sans text-muted mb-0.5">Regulatory body</p>
                  {country.regulatory_url ? (
                    <a
                      href={country.regulatory_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-sans font-medium text-accent hover:underline inline-flex items-center gap-1"
                    >
                      {country.regulatory_body} <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <p className="text-sm font-sans font-medium text-foreground">{country.regulatory_body}</p>
                  )}
                </div>
              )}
            </div>
            {country.notes && (
              <p className="text-sm font-sans text-muted border-t border-border pt-3">{country.notes}</p>
            )}
          </div>
        )}

        {/* Price notes disclaimer */}
        {c.price_notes && (
          <div className="rounded-xl bg-background-alt border border-border p-6 mb-8">
            <p className="text-[12px] font-[500] uppercase tracking-[0.15em] text-muted font-sans mb-2">
              Price notes
            </p>
            <p className="text-sm font-sans text-muted">{c.price_notes}</p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="rounded-xl bg-background-alt border border-border p-6 mb-10">
          <p className="text-xs font-sans text-muted">
            <strong className="text-foreground">Disclaimer:</strong> Prices shown are estimates
            in GBP and may not reflect current clinic fees, exchange rates, or your specific
            treatment plan. Always confirm costs directly with the clinic before making any
            decisions. Flying Solo is not a medical provider and does not earn commission from
            clinics.
          </p>
        </div>

        {/* Back link */}
        <div className="pb-16">
          <Link
            href={`/clinics?country=${c.country_code}`}
            className="text-sm font-sans text-muted hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            ← Back to {countryName} clinics
          </Link>
        </div>
      </div>
    </main>
  );
}
