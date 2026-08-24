import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ShapeMark } from "../shapes";
import { GUIDES } from "@/lib/guides";

const TEAL = "var(--teal)";
const TEAL_SOFT = "rgba(0, 83, 83, 0.6)";

interface ResourcesSectionProps {
  resources: string[];
}

export function ResourcesSection({ resources }: ResourcesSectionProps) {
  const guides = resources
    .map((slug) => GUIDES.find((g) => g.slug === slug))
    .filter(Boolean) as (typeof GUIDES)[number][];

  if (guides.length === 0) return null;

  return (
    <section className="border-b border-border" style={{ background: "var(--cream)" }}>
      <div className="mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-36">
        <p
          className="text-[13px] font-[600] uppercase tracking-[2px] font-sans flex items-center gap-2 mb-4"
          style={{ color: TEAL }}
        >
            <ShapeMark name="asterisk" size={14} style={{ color: "var(--lavender)" }} />
          Guides &amp; tools
        </p>
        <div className="flex items-end justify-between mb-10">
          <h2
            className="font-sans font-bold"
            style={{ fontSize: "clamp(2.5rem, 4vw, 4.25rem)", lineHeight: 1.1, color: TEAL }}
          >
            Resources for your journey.
          </h2>
          <Link
            href="/resources"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-sans font-medium transition-opacity hover:opacity-70 shrink-0"
            style={{ color: TEAL }}
          >
            All resources <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/resources/${guide.slug}`}
              className="group flex flex-col gap-2 p-6 bg-white hover:bg-[var(--card-bg)] transition-colors duration-150"
            >
              <span
                className="inline-block text-[12px] font-[600] uppercase tracking-[0.1em] font-sans rounded-full px-2.5 py-1 w-fit"
                style={{ background: "var(--card-bg)", color: TEAL }}
              >
                {guide.type}
              </span>
              <p
                className="text-sm font-sans font-[600] leading-snug group-hover:underline decoration-teal/30 underline-offset-2"
                style={{ color: TEAL }}
              >
                {guide.title}
              </p>
              <p
                className="text-xs font-sans leading-relaxed line-clamp-2"
                style={{ color: TEAL_SOFT }}
              >
                {guide.intro}
              </p>
              <span
                className="mt-auto flex items-center gap-1 text-xs font-sans font-medium"
                style={{ color: TEAL }}
              >
                Read <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>

        <Link
          href="/resources"
          className="sm:hidden inline-flex items-center gap-1.5 text-sm font-sans font-medium transition-opacity hover:opacity-70 mt-6"
          style={{ color: TEAL }}
        >
          All resources <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
