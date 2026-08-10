import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { ShareButtons } from "@/components/share-buttons";

export interface ArticleMeta {
  /** Small label above the title, e.g. the tag or category. */
  eyebrow?: string;
  title: string;
  /** Standfirst under the title. */
  standfirst?: string;
  /** Byline pieces rendered as a single dot-separated line. */
  meta?: string[];
  image?: string;
  imageAlt?: string;
  backHref: string;
  backLabel: string;
}

/**
 * Shared article chrome: nav, hero image, back link, title block, share
 * controls, body, and a closing back link. Any article-shaped page on the
 * site should render through this so they stay consistent — pass the body as
 * children rather than rebuilding the header per page.
 */
export function ArticleLayout({
  eyebrow,
  title,
  standfirst,
  meta,
  image,
  imageAlt,
  backHref,
  backLabel,
  children,
}: ArticleMeta & { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto px-6 md:px-12 lg:px-16">
        <SiteNav />
      </div>

      {image && (
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
          <Image
            src={image}
            alt={imageAlt ?? ""}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      <article className="max-w-3xl mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-xs font-[500] uppercase tracking-[0.12em] transition-colors mb-8 font-sans hover:opacity-70"
          style={{ color: "var(--muted)" }}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {backLabel}
        </Link>

        {eyebrow && (
          <p
            className="text-[11px] font-[600] uppercase tracking-[0.15em] font-sans mb-4"
            style={{ color: "var(--muted)" }}
          >
            {eyebrow}
          </p>
        )}

        <h1
          className="font-sans font-bold mb-5"
          style={{ fontSize: "clamp(2.25rem, 4vw, 4rem)", lineHeight: 1.1, color: "var(--teal)" }}
        >
          {title}
        </h1>

        {standfirst && (
          <p
            className="text-[18px] font-sans leading-[1.6] mb-6"
            style={{ color: "var(--muted)" }}
          >
            {standfirst}
          </p>
        )}

        {meta && meta.length > 0 && (
          <p
            className="text-[11px] font-[600] uppercase tracking-[0.12em] font-sans mb-8"
            style={{ color: "var(--muted)" }}
          >
            {meta.join("  ·  ")}
          </p>
        )}

        <div
          className="flex flex-wrap items-center justify-between gap-4 py-5 border-y mb-10"
          style={{ borderColor: "var(--border)" }}
        >
          <ShareButtons title={title} />
        </div>

        {children}

        <div className="mt-14 pt-8 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href={backHref}
              className="inline-flex items-center gap-1.5 text-sm font-sans font-medium transition-colors hover:opacity-70"
              style={{ color: "var(--teal)" }}
            >
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </Link>
            <ShareButtons title={title} />
          </div>
        </div>
      </article>
    </main>
  );
}
