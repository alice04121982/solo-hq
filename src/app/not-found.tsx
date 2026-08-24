import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Page not found | CairnFertility",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border px-6 md:px-12 lg:px-16">
        <div className="mx-auto">
          <SiteNav />
        </div>
      </section>

      <Section band={0} padding="pt-24 pb-32">
        <p className="text-[13px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
          404
        </p>
        <h1
          className="font-sans font-bold text-foreground mb-6"
          style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1 }}
        >
          We can&rsquo;t find that page.
        </h1>
        <p
          className="text-lg font-sans leading-relaxed text-muted mb-10"
          style={{ maxWidth: "62ch" }}
        >
          The page may have moved, or the link may be out of date. The clinic
          finder, guides and family-type pages are all one click away.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-sans font-medium transition-opacity duration-200 hover:opacity-90"
            style={{ background: "var(--accent)", color: "var(--on-accent)" }}
          >
            Back to the homepage
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3.5 text-sm font-sans font-medium text-foreground transition-colors duration-200 hover:bg-surface-hover"
          >
            Browse the guides
          </Link>
        </div>
      </Section>
    </main>
  );
}
