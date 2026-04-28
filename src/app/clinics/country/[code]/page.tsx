import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { SiteNav } from "@/components/site-nav";
import { InternationalClinicCard } from "@/components/clinic-browser/international-clinic-card";
import {
  InternationalClinic,
  ClinicCountry,
  COUNTRY_FLAGS,
  COUNTRY_NAMES,
} from "@/types/international-clinic";

const COUNTRY_CODES = ["GB", "ES", "CZ", "GR", "DK", "CY"] as const;

export async function generateStaticParams() {
  return COUNTRY_CODES.map((code) => ({ code }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const name = COUNTRY_NAMES[code];
  if (!name) return { title: "Country not found — Flying Solo" };
  return {
    title: `IVF Clinics in ${name} — Flying Solo`,
    description: `Compare IVF clinics in ${name} for solo women. Pricing, success rates, regulatory overview and solo-friendly status.`,
  };
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const countryName = COUNTRY_NAMES[code];
  if (!countryName) notFound();

  const [{ data: countryData }, { data: clinicsData }] = await Promise.all([
    supabase.from("clinic_countries").select("*").eq("code", code).single(),
    supabase.from("clinics").select("*, country:clinic_countries(*)").eq("country_code", code).order("name"),
  ]);

  if (!countryData) notFound();

  const country = countryData as ClinicCountry;
  const clinics = (clinicsData ?? []) as InternationalClinic[];
  const flag = COUNTRY_FLAGS[code] ?? "";

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <SiteNav />

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[12px] font-[500] uppercase tracking-[0.15em] text-muted font-sans py-4">
          <Link href="/clinics" className="hover:text-foreground transition-colors">
            Clinics
          </Link>
          <span>/</span>
          <span className="text-foreground">{flag} {countryName}</span>
        </nav>

        {/* Hero */}
        <header className="py-10 md:py-14 border-b border-border">
          <p className="text-[12px] font-[500] uppercase tracking-[0.15em] text-muted font-sans mb-3">
            IVF abroad
          </p>
          <h1
            className="font-serif font-semibold text-foreground mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.08 }}
          >
            {flag} IVF Clinics in {countryName}
          </h1>
          {country.notes && (
            <p className="font-sans text-muted max-w-2xl" style={{ fontSize: "1rem" }}>
              {country.notes}
            </p>
          )}
        </header>

        {/* Key facts grid */}
        <section className="py-8 border-b border-border">
          <p className="text-[12px] font-[500] uppercase tracking-[0.15em] text-muted font-sans mb-5">
            {countryName}: key regulatory facts
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="rounded-xl bg-background-alt border border-border p-4">
              <p className="text-[12px] font-[500] uppercase tracking-[0.1em] text-muted font-sans mb-1">
                Donor anonymity
              </p>
              <p className="text-sm font-sans font-medium text-foreground capitalize">
                {country.donor_anonymity}
              </p>
            </div>
            <div className="rounded-xl bg-background-alt border border-border p-4">
              <p className="text-[12px] font-[500] uppercase tracking-[0.1em] text-muted font-sans mb-1">
                Age limit (treatment)
              </p>
              <p className="text-sm font-sans font-medium text-foreground">
                {country.age_limit_treatment ? `Up to ${country.age_limit_treatment}` : "Not specified"}
              </p>
            </div>
            <div className="rounded-xl bg-background-alt border border-border p-4">
              <p className="text-[12px] font-[500] uppercase tracking-[0.1em] text-muted font-sans mb-1">
                Age limit (donor eggs)
              </p>
              <p className="text-sm font-sans font-medium text-foreground">
                {country.age_limit_donor_eggs ? `Up to ${country.age_limit_donor_eggs}` : "Not specified"}
              </p>
            </div>
            <div className="rounded-xl bg-background-alt border border-border p-4">
              <p className="text-[12px] font-[500] uppercase tracking-[0.1em] text-muted font-sans mb-1">
                Solo eligible
              </p>
              <p
                className={`text-sm font-sans font-medium ${country.single_women_eligible ? "text-green-700" : "text-muted"}`}
              >
                {country.single_women_eligible ? "Yes" : "No"}
              </p>
            </div>
            <div className="rounded-xl bg-background-alt border border-border p-4">
              <p className="text-[12px] font-[500] uppercase tracking-[0.1em] text-muted font-sans mb-1">
                LGBTQ+ eligible
              </p>
              <p
                className={`text-sm font-sans font-medium ${country.lgbtq_eligible ? "text-green-700" : "text-muted"}`}
              >
                {country.lgbtq_eligible ? "Yes" : "No"}
              </p>
            </div>
            <div className="rounded-xl bg-background-alt border border-border p-4">
              <p className="text-[12px] font-[500] uppercase tracking-[0.1em] text-muted font-sans mb-1">
                Embryo transfer limit
              </p>
              <p className="text-sm font-sans font-medium text-foreground">
                {country.embryo_transfer_limit ?? "—"}
              </p>
            </div>
            {country.regulatory_body && (
              <div className="rounded-xl bg-background-alt border border-border p-4 col-span-2 sm:col-span-1">
                <p className="text-[12px] font-[500] uppercase tracking-[0.1em] text-muted font-sans mb-1">
                  Regulatory body
                </p>
                {country.regulatory_url ? (
                  <a
                    href={country.regulatory_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-sans font-medium text-accent hover:underline"
                  >
                    {country.regulatory_body}
                  </a>
                ) : (
                  <p className="text-sm font-sans font-medium text-foreground">{country.regulatory_body}</p>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Clinic grid */}
        <section className="py-10 pb-16">
          <p className="text-[12px] font-[500] uppercase tracking-[0.15em] text-muted font-sans mb-6">
            {clinics.length} clinic{clinics.length !== 1 ? "s" : ""} in {countryName}
          </p>

          {clinics.length === 0 ? (
            <div className="rounded-xl bg-background-alt border border-border p-10 text-center">
              <p className="font-sans text-muted">No clinics listed yet for {countryName}.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {clinics.map((clinic) => (
                <InternationalClinicCard
                  key={clinic.slug}
                  clinic={clinic}
                  showCompare={false}
                />
              ))}
            </div>
          )}
        </section>

        {/* Back link */}
        <div className="pb-16 border-t border-border pt-8">
          <Link
            href="/clinics"
            className="text-sm font-sans text-muted hover:text-foreground transition-colors"
          >
            ← Back to all clinics
          </Link>
        </div>
      </div>
    </main>
  );
}
