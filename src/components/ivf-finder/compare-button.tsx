"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Check, Plus } from "lucide-react";
import { CLINICS } from "@/lib/clinics";

const COMPARE_PARAM = "compare";
const COMPARE_CAP = 4;

/**
 * Add to compare, from anywhere. The selection is the ?compare= URL parameter
 * on whatever page the control sits on, so a clinic detail page participates
 * in the same selection as the finder, and the link back to the comparison
 * carries the full set.
 */
export function CompareButton({ slug }: { slug: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const knownSlugs = useMemo(() => new Set(CLINICS.map((c) => c.slug)), []);
  const selected = useMemo(() => {
    const raw = searchParams.get(COMPARE_PARAM);
    if (!raw) return [];
    return [...new Set(raw.split(","))].filter((s) => knownSlugs.has(s)).slice(0, COMPARE_CAP);
  }, [searchParams, knownSlugs]);

  const isSelected = selected.includes(slug);
  const isFull = selected.length >= COMPARE_CAP && !isSelected;

  const toggle = () => {
    const next = isSelected ? selected.filter((s) => s !== slug) : [...selected, slug];
    const params = new URLSearchParams(searchParams.toString());
    if (next.length > 0) params.set(COMPARE_PARAM, next.join(","));
    else params.delete(COMPARE_PARAM);
    // Slugs are url-safe, so keep the commas literal and the URL shareable.
    const query = params.toString().replace(/%2C/g, ",");
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={toggle}
        disabled={isFull}
        className={`inline-flex items-center justify-center gap-1.5 h-10 px-5 rounded-full text-sm font-semibold border transition-colors ${
          isSelected
            ? "bg-teal border-teal text-on-teal hover:opacity-90"
            : isFull
              ? "bg-background border-border text-muted cursor-not-allowed"
              : "bg-background border-teal/20 text-teal hover:bg-surface-hover"
        }`}
      >
        {isSelected ? (
          <>
            <Check className="h-4 w-4" aria-hidden />
            In comparison
          </>
        ) : (
          <>
            <Plus className="h-4 w-4" aria-hidden />
            Add to compare
          </>
        )}
      </button>
      {selected.length >= 2 && (
        <Link
          href={`/ivf-finder?${COMPARE_PARAM}=${selected.join(",")}#comparison-table`}
          className="inline-flex items-center gap-1.5 h-10 px-5 rounded-full bg-accent text-teal-ink text-sm font-bold hover:opacity-90 transition-opacity"
        >
          Compare {selected.length}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      )}
    </div>
  );
}
