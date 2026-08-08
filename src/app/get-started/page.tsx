import { SiteNav } from "@/components/site-nav";
import { ClinicMatcher } from "@/components/clinic-matcher";

export const metadata = {
  title: "Find Your Clinic — CairnFertility",
  description: "Tell us about your situation and we'll match you with the clinics most suited to your age, family type, and budget.",
};

export default function GetStartedPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <SiteNav />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
        {/* Header and wizard share one left-aligned column so the page reads
            against a single left edge, as the rest of the site does. */}
        <div className="max-w-2xl">
          {/* Page header */}
          <div className="mb-12">
            <span
              className="inline-block text-[9px] font-[700] uppercase tracking-[0.16em] font-sans rounded-full px-3 py-1 mb-5"
              style={{ background: "#C5E600", color: "#1A3A25" }}
            >
              Personalised matching
            </span>
            <h1
              className="font-sans font-bold text-foreground mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.06 }}
            >
              Find clinics that fit your situation.
            </h1>
            <p className="text-[16px] font-sans text-muted leading-[1.65]">
              Answer five questions and we&apos;ll show you clinics ranked for your age, family type, and real budget — not just headline numbers.
            </p>
          </div>

          {/* Wizard */}
          <ClinicMatcher />
        </div>
      </div>
    </main>
  );
}
