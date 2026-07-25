import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { FAMILY_TYPES } from "@/lib/family-types";

export const metadata: Metadata = {
  title: "Family Types | Flying Solo — IVF & Fertility Guidance",
  description:
    "Fertility treatment guidance for every family — solo mums, same-sex couples, single dads, and heterosexual couples navigating IVF together.",
};

export default function FamiliesPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <section className="border-b border-border px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <SiteNav />
        </div>
      </section>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
          IVF for every family
        </p>
        <h1
          className="font-sans font-medium text-foreground mb-6"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}
        >
          Whoever you are,
          <br />
          <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
            your path starts here.
          </em>
        </h1>
        <p
          className="text-[17px] font-sans text-muted leading-relaxed"
          style={{ maxWidth: "55ch" }}
        >
          IVF looks different depending on your situation. Find your family type below to get a guide built specifically for you — the right treatment routes, real stories from people like you, and a clear step-by-step process from first consultation to family.
        </p>
      </section>

      {/* Family type cards */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {FAMILY_TYPES.map((family, i) => (
              <a
                key={family.slug}
                href={`/families/${family.slug}`}
                className="group block border-b border-r-0 lg:border-r border-border py-10 px-0 lg:px-8 first:pl-0 hover:bg-background-alt transition-colors duration-150"
                style={{
                  borderRight:
                    (i + 1) % 3 === 0 ? "none" : undefined,
                }}
              >
                <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-accent mb-4 font-sans">
                  {family.treatmentHighlight}
                </p>
                <h2 className="font-sans font-medium text-foreground text-2xl leading-snug mb-3 group-hover:text-accent transition-colors duration-150">
                  {family.label}
                </h2>
                <p className="text-sm font-sans text-muted leading-relaxed mb-6" style={{ maxWidth: "36ch" }}>
                  {family.cardSummary}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-sans text-foreground border-b border-foreground/20 pb-0.5 group-hover:border-accent group-hover:text-accent transition-colors duration-150">
                  Read the guide
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* How we can help */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
          What you&apos;ll find
        </p>
        <h2
          className="font-sans font-medium text-foreground mb-14"
          style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)", lineHeight: 1.1 }}
        >
          Every guide includes:
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
          {[
            { num: "01", title: "Step-by-step process", body: "A clear, honest walkthrough from initial tests to parenthood — tailored to your specific treatment route." },
            { num: "02", title: "Personal stories", body: "Real accounts from people who've been through it. The emotional truth, not just the clinical facts." },
            { num: "03", title: "Clinic comparison", body: "Link directly to our comparison tool filtered for your treatment type, with success rates by age bracket." },
            { num: "04", title: "Newsletter", body: "Updates specific to your family type — clinic data changes, new research, community stories." },
          ].map((item) => (
            <div key={item.num} className="py-6 border-t border-border">
              <p className="font-serif text-muted mb-3" style={{ fontSize: "1.5rem" }}>
                {item.num}
              </p>
              <p className="font-sans font-medium text-foreground text-lg mb-2">{item.title}</p>
              <p className="text-sm font-sans text-muted leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </main>
  );
}
