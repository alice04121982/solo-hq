import type { Metadata } from "next";
import { ShieldCheck, Heart, PoundSterling, Clock } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { ClinicFinder } from "@/components/ivf-finder/clinic-finder";

export const metadata: Metadata = {
  title: "Find IVF Clinics Near You | Flying Solo",
  description: "Search and compare HFEA-licensed IVF clinics near you. Real pricing, solo-friendliness ratings, and side-by-side comparison for solo mums by choice.",
};

interface PageProps {
  searchParams: Promise<{ location?: string; radius?: string }>;
}

const WHAT_TO_LOOK_FOR = [
  { icon: <ShieldCheck className="h-4 w-4" />, title: "HFEA Licence", desc: "Every UK fertility clinic must be licensed by the HFEA. Always verify before booking — it's your legal protection." },
  { icon: <Heart className="h-4 w-4" />, title: "Solo-Friendly Policy", desc: "Ask clinics directly: Do you treat single women? Some clinics excel here; others add unnecessary friction. Trust your gut in the consultation." },
  { icon: <PoundSterling className="h-4 w-4" />, title: "All-In Pricing", desc: "Always ask for a written quote covering donor sperm, ICSI, counselling, and storage — not just the headline IVF price." },
  { icon: <Clock className="h-4 w-4" />, title: "Waiting Times", desc: "Donor sperm availability and clinic waiting lists vary enormously. Factor this into your timeline, especially if your AMH is time-sensitive." },
];

export default async function IvfFinderPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const initialLocation = params.location?.trim() || undefined;
  const initialRadius = params.radius ? parseInt(params.radius, 10) : 25;

  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <section className="bg-background border-b border-border px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <SiteNav />
        </div>
      </section>

      {/* Hero + integrated search */}
      <section className="bg-background-alt border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-16 md:pt-20 pb-0">
          <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
            HFEA-licensed clinics only
          </p>
          <h1
            className="font-serif font-normal text-foreground mb-4"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}
          >
            Find IVF Clinics
            <br />
            <em style={{ fontStyle: "italic", color: "var(--accent)" }}>Near You</em>
          </h1>
          <p className="text-[17px] font-sans text-muted leading-relaxed mb-10" style={{ maxWidth: "52ch" }}>
            Real pricing. Solo-friendliness ratings. Side-by-side comparisons.
          </p>

          {/* Search + results — sits inside the hero, expands downward */}
          <ClinicFinder initialLocation={initialLocation} initialRadius={initialRadius} />
        </div>
      </section>

      {/* What to look for — contextual guidance below */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-8 font-sans">
          What to look for as a solo parent
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
          {WHAT_TO_LOOK_FOR.map((item) => (
            <div key={item.title} className="py-6 border-t border-border">
              <div className="text-accent mb-3">{item.icon}</div>
              <p className="font-serif font-normal text-foreground text-base mb-2">{item.title}</p>
              <p className="text-sm font-sans text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
