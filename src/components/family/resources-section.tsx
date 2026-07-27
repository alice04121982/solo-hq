import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GUIDES } from "@/lib/guides";

interface ResourcesSectionProps {
  resources: string[];
}

export function ResourcesSection({ resources }: ResourcesSectionProps) {
  const guides = resources
    .map((slug) => GUIDES.find((g) => g.slug === slug))
    .filter(Boolean) as (typeof GUIDES)[number][];

  if (guides.length === 0) return null;

  return (
    <section className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
          Guides &amp; tools
        </p>
        <div className="flex items-end justify-between mb-10">
          <h2
            className="font-sans font-bold"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1, color: "#1A3A25" }}
          >
            Resources for your journey.
          </h2>
          <Link
            href="/resources"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-sans font-medium text-muted hover:text-[#1A3A25] transition-colors shrink-0"
          >
            All resources <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/resources/${guide.slug}`}
              className="group flex flex-col gap-2 p-6 bg-background hover:bg-[#F0F8E8] transition-colors duration-150"
            >
              <span
                className="inline-block text-[10px] font-[600] uppercase tracking-[0.1em] font-sans rounded-full px-2.5 py-1 w-fit"
                style={{ background: "#F0F0F0", color: "#5C4050" }}
              >
                {guide.type}
              </span>
              <p className="text-sm font-sans font-medium text-[#1A3A25] leading-snug group-hover:underline decoration-[#1A3A25]/30 underline-offset-2">
                {guide.title}
              </p>
              <p className="text-xs font-sans text-muted leading-relaxed line-clamp-2">
                {guide.intro}
              </p>
              <span className="mt-auto flex items-center gap-1 text-xs font-sans font-medium text-muted group-hover:text-[#1A3A25] transition-colors">
                Read <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>

        <Link
          href="/resources"
          className="sm:hidden inline-flex items-center gap-1.5 text-sm font-sans font-medium text-muted hover:text-[#1A3A25] transition-colors mt-6"
        >
          All resources <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
