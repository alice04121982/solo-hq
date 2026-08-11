import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { Section } from "@/components/section";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "News & Updates | Cairn Fertility",
  description: "The latest news on IVF policy, clinic pricing, donor conception, and community stories from Cairn.",
};

const ARTICLES = [
  {
    tag: "Policy",
    title: "HFEA proposes stricter solo-patient counselling guidelines for 2025",
    excerpt: "The Human Fertilisation and Embryology Authority is consulting on updated welfare of the child assessments that could affect single women seeking donor conception.",
    date: "12 Mar 2025",
    readTime: "4 min read",
    featured: true,
  },
  {
    tag: "Costs",
    title: "Why UK IVF prices rose 18% in two years, and what it means for you",
    excerpt: "A combination of post-pandemic lab costs, staffing pressures, and increased demand has driven clinic pricing upward. We break down where the money goes.",
    date: "28 Feb 2025",
    readTime: "6 min read",
  },
  {
    tag: "Community",
    title: "Solo mum by choice: How the language is finally catching up",
    excerpt: "\"Single mother\" no longer captures it. The rise of 'SMC', 'solo parent by choice', and 'known donor' reflects a community defining itself on its own terms.",
    date: "14 Feb 2025",
    readTime: "5 min read",
  },
  {
    tag: "Science",
    title: "PGT-A: What the latest Cochrane review actually says",
    excerpt: "A new systematic review questions whether pre-implantation genetic testing improves live birth rates in unselected patients. We decode the evidence.",
    date: "3 Feb 2025",
    readTime: "7 min read",
  },
  {
    tag: "Clinics",
    title: "Five new HFEA-licensed clinics opened in 2024. Are any worth considering?",
    excerpt: "We looked at success rate data, pricing structures, and solo-patient policies at the UK's newest licensed clinics.",
    date: "20 Jan 2025",
    readTime: "5 min read",
  },
  {
    tag: "Finance",
    title: "Fertility finance: loans, grants, and employer schemes explained",
    excerpt: "From Carrot Fertility and Fertifa to personal loans and NHS funding criteria: every funding route available to solo patients in 2025.",
    date: "8 Jan 2025",
    readTime: "8 min read",
  },
];

export default function NewsPage() {
  const [featured, ...rest] = ARTICLES;

  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <section className="border-b border-border px-6 md:px-12 lg:px-16">
        <div className="mx-auto">
          <SiteNav />
        </div>
      </section>

      {/* Header */}
      <Section band={0} padding="pt-20 pb-16 md:pt-28 md:pb-20">
        <p className="text-[13px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans">Latest</p>
        <h1 className="font-sans font-bold text-foreground mb-4" style={{ fontSize: "clamp(2.75rem, 5vw, 5.5rem)", lineHeight: 1.05 }}>
          News &amp; Updates
        </h1>
        <p className="text-lg font-sans text-muted leading-relaxed" style={{ maxWidth: "52ch" }}>
          Policy changes, science you can use, and stories from the community.
        </p>
      </Section>

      {/* Featured — left-border pull style */}
      <Section band={1}>
        <div className="border-l-2 border-accent pl-8 md:pl-12">
          <p className="text-[13px] font-[500] uppercase tracking-[0.15em] text-teal mb-4 font-sans">
            {featured.tag} &nbsp;·&nbsp; {featured.date} &nbsp;·&nbsp; {featured.readTime}
          </p>
          <h2 className="font-sans font-bold text-foreground mb-4" style={{ fontSize: "clamp(2rem, 3vw, 3.25rem)", lineHeight: 1.15, maxWidth: "28ch" }}>
            {featured.title}
          </h2>
          <p className="text-lg font-sans text-muted leading-relaxed mb-6" style={{ maxWidth: "60ch" }}>
            {featured.excerpt}
          </p>
          <button className="inline-flex items-center gap-2 text-sm font-sans text-foreground border-b border-foreground/30 pb-0.5 hover:border-teal hover:text-teal transition-colors duration-150">
            Read article <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </Section>

      {/* Article grid */}
      <Section band={2}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0">
          {rest.map((a) => (
            <div
              key={a.title}
              className="py-8 border-t border-border cursor-pointer group"
            >
              <p className="text-[13px] font-[500] uppercase tracking-[0.15em] text-teal mb-3 font-sans">
                {a.tag}
              </p>
              <h3 className="font-sans font-bold text-foreground text-lg leading-snug mb-3 group-hover:text-teal transition-colors duration-150" style={{ maxWidth: "26ch" }}>
                {a.title}
              </h3>
              <p className="text-sm font-sans text-muted leading-relaxed mb-4">{a.excerpt}</p>
              <p className="text-[13px] font-[500] uppercase tracking-[0.15em] text-muted font-sans">
                {a.date} &nbsp;·&nbsp; {a.readTime}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <CTASection />
    </main>
  );
}
