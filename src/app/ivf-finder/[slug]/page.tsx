import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ExternalLink, Globe, MapPin, Phone } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { Section } from "@/components/section";
import { CompareButton } from "@/components/ivf-finder/compare-button";
import { VerificationBadge } from "@/components/ivf-finder/rate-display";
import { CLINICS, getClinic } from "@/lib/clinics";
import { AGE_BRACKETS } from "@/types/clinic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CLINICS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const clinic = getClinic((await params).slug);
  if (!clinic) return {};
  return {
    title: `${clinic.name}, ${clinic.city} | CairnFertility`,
    description: `Success rates, pricing and treatment options for ${clinic.name} in ${clinic.city}, ${clinic.country}, with the source behind every figure.`,
  };
}

const DONOR_LABELS = {
  identifiable: "Identifiable donors only, by law",
  anonymous: "Anonymous donors",
  both: "Identifiable and anonymous donors",
} as const;

export default async function ClinicDetailPage({ params }: PageProps) {
  const clinic = getClinic((await params).slug);
  if (!clinic) notFound();

  const report = clinic.successRates;

  const facts: { label: string; value: string }[] = [
    {
      label: "Price per cycle",
      value:
        clinic.pricePerCycleGbp != null
          ? `£${clinic.pricePerCycleGbp.toLocaleString()} (own-egg IVF, headline price)`
          : "Not published",
    },
    {
      label: "Donor anonymity",
      value: clinic.donorAnonymity ? DONOR_LABELS[clinic.donorAnonymity] : "No donor treatment offered",
    },
    {
      label: "Remote consultation",
      value: clinic.remoteConsultation ? "Available" : "Not offered",
    },
    ...(clinic.hfeaLicensed
      ? [{ label: "HFEA licence", value: clinic.hfeaNumber ? `Licensed, centre ${clinic.hfeaNumber}` : "Licensed" }]
      : []),
  ];

  return (
    <main className="min-h-screen bg-background">
      <section className="bg-background border-b border-border px-6 md:px-12 lg:px-16">
        <div className="mx-auto">
          <SiteNav />
        </div>
      </section>

      <Section band={0} padding="pt-12 md:pt-16 pb-20 md:pb-28">
        <Link
          href="/ivf-finder"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-teal transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          All clinics
        </Link>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <VerificationBadge verification={report.verification} />
        </div>
        <h1
          className="font-sans font-bold mb-3 text-teal-ink"
          style={{ fontSize: "clamp(2.5rem, 4vw, 4.5rem)", lineHeight: 1.05 }}
        >
          {clinic.name}
        </h1>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted mb-8">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4" aria-hidden />
            {clinic.address ?? `${clinic.city}, ${clinic.country}`}
          </span>
          {clinic.phone && (
            <a href={`tel:${clinic.phone}`} className="inline-flex items-center gap-1.5 hover:text-teal transition-colors">
              <Phone className="h-4 w-4" aria-hidden />
              {clinic.phone}
            </a>
          )}
          {clinic.website && (
            <a
              href={clinic.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-teal transition-colors"
            >
              <Globe className="h-4 w-4" aria-hidden />
              Website
            </a>
          )}
        </div>

        <Suspense>
          <CompareButton slug={clinic.slug} />
        </Suspense>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
          {/* ── Success rates ── */}
          <div className="rounded-[24px] bg-background border border-border p-6">
            <h2 className="text-base font-bold text-teal-ink mb-1">Live birth rates</h2>
            <p className="text-xs text-muted mb-5">
              Measured {report.denominator}, covering {report.year}.{" "}
              {report.verification === "hfea"
                ? "Verified against the HFEA register."
                : "Self-reported by the clinic and not independently verified. Not directly comparable with HFEA verified UK figures."}
            </p>
            <div>
              {AGE_BRACKETS.map((b) => {
                const rate = report.byBracket[b.value];
                return (
                  <div
                    key={b.value}
                    className="flex items-center justify-between gap-2 py-2.5 border-t border-border"
                  >
                    <span className="text-sm text-muted">{b.label}</span>
                    {rate != null ? (
                      <span className="text-sm font-bold text-teal-ink">{rate}%</span>
                    ) : (
                      <span className="text-sm text-muted">Not published</span>
                    )}
                  </div>
                );
              })}
            </div>
            <a
              href={report.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-teal hover:underline underline-offset-2 mt-4"
            >
              Source: {report.sourceLabel}
              <ExternalLink className="h-3 w-3" aria-hidden />
            </a>
          </div>

          {/* ── Key facts ── */}
          <div className="rounded-[24px] bg-background border border-border p-6">
            <h2 className="text-base font-bold text-teal-ink mb-5">Key facts</h2>
            <div className="mb-6">
              {facts.map((f) => (
                <div key={f.label} className="flex items-start justify-between gap-4 py-2.5 border-t border-border">
                  <span className="text-sm text-muted shrink-0">{f.label}</span>
                  <span className="text-sm font-medium text-foreground text-right">{f.value}</span>
                </div>
              ))}
            </div>
            <h3 className="text-[12px] font-[700] uppercase tracking-[0.14em] text-muted mb-3">
              Treatments offered
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {clinic.treatments.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-surface-sunken px-2.5 py-1 text-xs font-medium text-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="text-xs text-muted mt-8" style={{ maxWidth: "70ch" }}>
          Figures on this page are indicative and change over time. Confirm current prices and
          success rates directly with the clinic before making decisions, and ask for live
          births per embryo transfer for your age group so quotes are comparable.
        </p>
      </Section>
    </main>
  );
}
