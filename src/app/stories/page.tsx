import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";

export default function StoriesPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <section className="border-b border-border px-6 md:px-12 lg:px-16">
        <div className="mx-auto">
          <SiteNav />
        </div>
      </section>

      <Section band={0} padding="pt-20 pb-20 md:pb-28" backdrop={{ shape: "bloom" }}>
        <SectionHeading
          level={1}
          eyebrow="Stories"
          mark="spark"
          title="Stories"
          className="mb-6"
        />
        <p className="text-lg font-sans text-muted leading-relaxed mb-10" style={{ maxWidth: "58ch" }}>
          We&rsquo;re collecting real accounts from people at every stage of fertility
          treatment, including people still trying and people whose treatment didn&rsquo;t
          work. We publish them only with the writer&rsquo;s consent. We have removed the
          example stories that used to be here.
        </p>
        <Link
          href="/stories/share"
          className="inline-flex items-center gap-2 rounded-full px-9 py-4 text-base font-sans font-[600] transition-opacity duration-200 hover:opacity-90"
          style={{ background: "var(--accent)", color: "var(--on-accent)" }}
        >
          Share your story
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Section>
    </main>
  );
}
