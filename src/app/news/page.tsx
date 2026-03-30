import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { CTASection } from "@/components/cta-section";
import { ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "News & Updates | Flying Solo",
  description:
    "The latest news on solo motherhood, IVF policy, donor conception, and community stories from Flying Solo.",
};

const ARTICLES = [
  {
    tag: "Policy",
    tagColor: "bg-lavender-light text-lavender-dark",
    title: "HFEA proposes stricter solo-patient counselling guidelines for 2025",
    excerpt:
      "The Human Fertilisation and Embryology Authority is consulting on updated welfare of the child assessments that could affect single women seeking donor conception.",
    date: "12 Mar 2025",
    readTime: "4 min read",
    featured: true,
  },
  {
    tag: "Costs",
    tagColor: "bg-lime text-charcoal",
    title: "Why UK IVF prices rose 18% in two years — and what it means for you",
    excerpt:
      "A combination of post-pandemic lab costs, staffing pressures, and increased demand has driven clinic pricing upward. We break down where the money goes.",
    date: "28 Feb 2025",
    readTime: "6 min read",
  },
  {
    tag: "Community",
    tagColor: "bg-warm-white text-navy border border-card-border",
    title: "Solo mum by choice: How the language is finally catching up",
    excerpt:
      "\"Single mother\" no longer captures it. The rise of 'SMC', 'solo parent by choice', and 'known donor' reflects a community defining itself on its own terms.",
    date: "14 Feb 2025",
    readTime: "5 min read",
  },
  {
    tag: "Science",
    tagColor: "bg-lavender-light text-lavender-dark",
    title: "PGT-A: What the latest Cochrane review actually says",
    excerpt:
      "A new systematic review questions whether pre-implantation genetic testing improves live birth rates in unselected patients. We decode the evidence.",
    date: "3 Feb 2025",
    readTime: "7 min read",
  },
  {
    tag: "Clinics",
    tagColor: "bg-lime text-charcoal",
    title: "Five new HFEA-licensed clinics opened in 2024 — are any worth considering?",
    excerpt:
      "We looked at success rate data, pricing structures, and solo-patient policies at the UK's newest licensed clinics.",
    date: "20 Jan 2025",
    readTime: "5 min read",
  },
  {
    tag: "Finance",
    tagColor: "bg-warm-white text-navy border border-card-border",
    title: "Fertility finance: loans, grants, and employer schemes explained",
    excerpt:
      "From Carrot Fertility and Fertifa to personal loans and NHS funding criteria — every funding route available to solo patients in 2025.",
    date: "8 Jan 2025",
    readTime: "8 min read",
  },
];

export default function NewsPage() {
  const [featured, ...rest] = ARTICLES;

  return (
    <main className="min-h-screen bg-background">
      <section className="bg-background border-b border-card-border px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <SiteNav />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-lavender-dark mb-2">
            Latest
          </p>
          <h1 className="text-4xl md:text-5xl text-navy leading-tight">News &amp; Updates</h1>
          <p className="text-navy/50 mt-3 max-w-lg">
            Policy changes, science you can actually use, and stories from the community.
          </p>
        </div>

        {/* Featured article */}
        <div className="rounded-[28px] bg-navy text-white p-8 md:p-10 mb-8 flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-lime text-charcoal mb-4">
              {featured.tag}
            </span>
            <h2 className="text-2xl md:text-3xl font-normal leading-snug mb-4">{featured.title}</h2>
            <p className="text-white/60 leading-relaxed mb-6">{featured.excerpt}</p>
            <div className="flex items-center gap-4">
              <button className="inline-flex items-center gap-2 rounded-full bg-white text-navy px-5 py-2.5 text-sm font-semibold hover:bg-lime transition-colors">
                Read article <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <span className="text-white/30 text-xs flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {featured.readTime}
              </span>
            </div>
          </div>
          <div className="text-white/20 text-xs shrink-0 mt-1">{featured.date}</div>
        </div>

        {/* Article grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((a) => (
            <div
              key={a.title}
              className="rounded-[24px] bg-card-bg border border-card-border p-6 flex flex-col gap-3 hover:border-navy/20 transition-colors cursor-pointer"
            >
              <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full ${a.tagColor}`}>
                {a.tag}
              </span>
              <h3 className="text-base font-normal text-navy leading-snug">{a.title}</h3>
              <p className="text-sm text-navy/50 leading-relaxed flex-1">{a.excerpt}</p>
              <div className="flex items-center justify-between pt-3 border-t border-card-border mt-auto">
                <span className="text-xs text-muted">{a.date}</span>
                <span className="text-xs text-muted flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {a.readTime}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </main>
  );
}
