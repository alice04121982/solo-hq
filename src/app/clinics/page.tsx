import type { Metadata } from "next";
import { ShieldCheck, Heart, PoundSterling, Plane } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { UnifiedClinicFinder } from "@/components/clinic-finder/unified-clinic-finder";
import { supabase } from "@/lib/supabase";
import type { InternationalClinic } from "@/types/international-clinic";

export const metadata: Metadata = {
  title: "Find & Compare IVF Clinics | Flying Solo",
  description:
    "Search HFEA-licensed UK clinics near you or browse clinics across Europe. Compare success rates and real pricing side-by-side.",
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface PageProps {}

const WHAT_TO_LOOK_FOR = [
  {
    icon: <ShieldCheck className="h-4 w-4" />,
    title: "HFEA Licence (UK)",
    desc: "Every UK fertility clinic must be HFEA-licensed. Always verify before booking — it's your legal protection as a patient.",
  },
  {
    icon: <Heart className="h-4 w-4" />,
    title: "Solo-Friendly Policy",
    desc: "Ask directly: do you routinely treat single women? Some clinics excel here; others add friction. Trust your gut in the consultation.",
  },
  {
    icon: <PoundSterling className="h-4 w-4" />,
    title: "All-In Pricing",
    desc: "Always request a written quote covering donor sperm, ICSI, counselling, and storage — not just the headline IVF price.",
  },
  {
    icon: <Plane className="h-4 w-4" />,
    title: "Clinics Abroad",
    desc: "European clinics can be 30–50% cheaper. Factor in travel, communication, and how many visits are required per cycle.",
  },
];

export default async function ClinicsPage(_props: PageProps) {
  // Fetch all clinics server-side (country filtering happens client-side)
  const { data: intlClinics } = await supabase
    .from("clinics")
    .select("*, country:clinic_countries(*)")
    .order("name");

  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <section className="bg-background border-b border-border px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <SiteNav />
        </div>
      </section>

      {/* Hero + integrated finder */}
      <section className="bg-background-alt border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-16 md:pt-20 pb-0">
          <p className="text-[12px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
            UK &amp; international clinics
          </p>
          <h1
            className="font-serif font-semibold text-foreground mb-4"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}
          >
            Find &amp; Compare
            <br />
            <em style={{ fontStyle: "italic", color: "var(--accent)" }}>IVF Clinics</em>
          </h1>
          <p
            className="text-[17px] font-sans text-muted leading-relaxed mb-10"
            style={{ maxWidth: "52ch" }}
          >
            UK clinics near you or across Europe — real pricing, success rates, and
            side-by-side comparisons in one place.
          </p>

          <UnifiedClinicFinder
            intlClinics={(intlClinics ?? []) as InternationalClinic[]}
          />
        </div>
      </section>

      {/* What to look for */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <p className="text-[12px] font-[500] uppercase tracking-[0.15em] text-muted mb-8 font-sans">
          What to look for as a solo parent
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
          {WHAT_TO_LOOK_FOR.map((item) => (
            <div key={item.title} className="py-6 border-t border-border">
              <div className="text-accent mb-3">{item.icon}</div>
              <p className="font-serif font-semibold text-foreground text-base mb-2">
                {item.title}
              </p>
              <p className="text-sm font-sans text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
