import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GUIDES } from "@/lib/guides";

const GREEN = "#1A3A25";
const GREEN_SOFT = "rgba(26,58,37,0.65)";
const OFF_WHITE = "#FAFAFA";

interface ResourcesSectionProps {
  resources: string[];
}

export function ResourcesSection({ resources }: ResourcesSectionProps) {
  const guides = resources
    .map((slug) => GUIDES.find((g) => g.slug === slug))
    .filter(Boolean) as (typeof GUIDES)[number][];

  if (guides.length === 0) return null;

  return (
    <section className="border-b border-border" style={{ background: OFF_WHITE }}>
      <div className="mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20">
        <p
          className="text-[11px] font-[600] uppercase tracking-[0.15em] mb-4 font-sans"
          style={{ color: GREEN_SOFT }}
        >
          Guides &amp; tools
        </p>
        <div className="flex items-end justify-between mb-10">
          <h2
            className="font-sans font-bold"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1, color: GREEN }}
          >
            Resources for your journey.
          </h2>
          <Link
            href="/resources"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-sans font-medium transition-opacity hover:opacity-70 shrink-0"
            style={{ color: GREEN }}
          >
            All resources <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/resources/${guide.slug}`}
              className="group flex flex-col gap-2 p-6 bg-white hover:bg-[#FDE8F2] transition-colors duration-150"
            >
              <span
                className="inline-block text-[10px] font-[600] uppercase tracking-[0.1em] font-sans rounded-full px-2.5 py-1 w-fit"
                style={{ background: "#FDE8F2", color: GREEN }}
              >
                {guide.type}
              </span>
              <p
                className="text-sm font-sans font-[600] leading-snug group-hover:underline decoration-[#1A3A25]/30 underline-offset-2"
                style={{ color: GREEN }}
              >
                {guide.title}
              </p>
              <p
                className="text-xs font-sans leading-relaxed line-clamp-2"
                style={{ color: GREEN_SOFT }}
              >
                {guide.intro}
              </p>
              <span
                className="mt-auto flex items-center gap-1 text-xs font-sans font-medium"
                style={{ color: GREEN }}
              >
                Read <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>

        <Link
          href="/resources"
          className="sm:hidden inline-flex items-center gap-1.5 text-sm font-sans font-medium transition-opacity hover:opacity-70 mt-6"
          style={{ color: GREEN }}
        >
          All resources <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
