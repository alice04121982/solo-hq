import type { Metadata } from "next";
import { Suspense } from "react";
import { ShieldCheck, Scale, PoundSterling, Video } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { Section } from "@/components/section";
import { ClinicFinder } from "@/components/ivf-finder/clinic-finder";
import { CLINICS } from "@/lib/clinics";

export const metadata: Metadata = {
  title: "Compare IVF Clinics, UK and Abroad | Cairn Fertility",
  description:
    "Compare IVF clinics in the UK and abroad in one search, ranked by success rate for your age group, with every figure labelled by source and year.",
};

const WHAT_TO_LOOK_FOR = [
  {
    icon: <ShieldCheck className="h-4 w-4" />,
    title: "Regulation",
    desc: "Every UK fertility clinic must be licensed by the HFEA. Overseas clinics answer to their own national regulator, so ask which body inspects them and when it last did.",
  },
  {
    icon: <Scale className="h-4 w-4" />,
    title: "Comparable numbers",
    desc: "Ask every clinic for live births per embryo transfer for your age group, and for the year it covers. If two clinics quote different measures, the higher number is not the better clinic.",
  },
  {
    icon: <PoundSterling className="h-4 w-4" />,
    title: "All-in pricing",
    desc: "Ask for a written quote covering drugs, ICSI, donor material, counselling, storage and, for treatment abroad, travel and accommodation. Headline cycle prices rarely include them.",
  },
  {
    icon: <Video className="h-4 w-4" />,
    title: "Distance and logistics",
    desc: "Treatment abroad usually means at least one trip of a week or more. Check what can happen remotely, what must happen in person, and who handles aftercare once you are home.",
  },
];

export default function IvfFinderPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <section className="bg-background border-b border-border px-6 md:px-12 lg:px-16">
        <div className="mx-auto">
          <SiteNav />
        </div>
      </section>

      {/* Hero + finder */}
      <Section band={0} padding="pt-16 md:pt-20 pb-20 md:pb-28">
        <p className="text-[13px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
          UK and international clinics
        </p>
        <h1
          className="font-sans font-bold mb-4 text-teal-ink"
          style={{ fontSize: "clamp(2.75rem, 5vw, 5.5rem)", lineHeight: 1.05 }}
        >
          Compare IVF Clinics
        </h1>
        <p className="text-lg font-sans text-muted leading-relaxed mb-10" style={{ maxWidth: "52ch" }}>
          Every clinic in one list, ranked by success rate for your age group. Each figure is
          labelled with its source, its year and what it was measured against.
        </p>

        <Suspense>
          <ClinicFinder clinics={CLINICS} />
        </Suspense>
      </Section>

      {/* What to look for */}
      <Section band={1}>
        <p className="text-[13px] font-[500] uppercase tracking-[0.15em] text-muted mb-8 font-sans">
          What every patient should look for
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
          {WHAT_TO_LOOK_FOR.map((item) => (
            <div key={item.title} className="py-6 border-t border-border">
              <div className="text-accent mb-3">{item.icon}</div>
              <p className="font-sans font-medium text-foreground text-base mb-2">{item.title}</p>
              <p className="text-sm font-sans text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
