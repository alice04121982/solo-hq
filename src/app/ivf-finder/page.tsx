import type { Metadata } from "next";
import { Sparkles, ShieldCheck, Heart, PoundSterling, Clock } from "lucide-react";
import { ClinicFinder } from "@/components/ivf-finder/clinic-finder";

export const metadata: Metadata = {
  title: "Find IVF Clinics Near You | Solo HQ",
  description:
    "Search and compare HFEA-licensed IVF clinics near you. Real pricing, solo-friendliness ratings, and side-by-side comparison for solo mums by choice.",
};

interface PageProps {
  searchParams: Promise<{ location?: string; radius?: string }>;
}

const WHAT_TO_LOOK_FOR = [
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "HFEA Licence",
    desc: "Every UK fertility clinic must be licensed by the HFEA. Always verify before booking — it's your legal protection.",
  },
  {
    icon: <Heart className="h-5 w-5" />,
    title: "Solo-Friendly Policy",
    desc: "Ask clinics directly: Do you treat single women? Some clinics excel here; others add unnecessary friction. Trust your gut in the consultation.",
  },
  {
    icon: <PoundSterling className="h-5 w-5" />,
    title: "All-In Pricing",
    desc: "Always ask for a written quote covering donor sperm, ICSI, counselling, and storage — not just the headline IVF price.",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: "Waiting Times",
    desc: "Donor sperm availability and clinic waiting lists vary enormously. Factor this into your timeline, especially if your AMH is time-sensitive.",
  },
];

export default async function IvfFinderPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const initialLocation = params.location?.trim() || undefined;
  const initialRadius = params.radius ? parseInt(params.radius, 10) : 25;

  return (
    <main className="min-h-screen bg-background">
      {/* Page header */}
      <section className="bg-lavender-light pt-12 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb nav */}
          <nav className="flex items-center gap-4 mb-10">
            <a href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-navy flex items-center justify-center">
                <Sparkles className="h-3.5 w-3.5 text-lime" />
              </div>
              <span className="text-sm font-bold text-navy">Solo HQ</span>
            </a>
            <span className="text-muted">/</span>
            <span className="text-sm text-muted">IVF Clinic Finder</span>
          </nav>

          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-warm-white/80 px-3 py-1 text-xs font-semibold text-navy border border-card-border mb-4">
              <ShieldCheck className="h-3 w-3 text-lime-dark" />
              HFEA-licensed clinics only
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-navy leading-tight tracking-tight mb-4">
              Find IVF Clinics
              <br />
              <span className="text-lavender-dark">Near You</span>
            </h1>
            <p className="text-base md:text-lg text-navy/70 leading-relaxed">
              Real pricing. Solo-friendliness ratings. Side-by-side comparisons.
              Everything you need to find the right clinic for your journey.
            </p>
          </div>
        </div>
      </section>

      {/* What to look for */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4">
          What to look for as a solo parent
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {WHAT_TO_LOOK_FOR.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-card-bg border border-card-border p-4"
            >
              <div className="h-9 w-9 rounded-xl bg-lavender-light flex items-center justify-center text-lavender-dark mb-3">
                {item.icon}
              </div>
              <p className="text-sm font-bold text-navy mb-1">{item.title}</p>
              <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Clinic Finder */}
        <ClinicFinder
          initialLocation={initialLocation}
          initialRadius={initialRadius}
        />
      </section>
    </main>
  );
}
