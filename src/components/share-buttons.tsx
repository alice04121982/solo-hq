"use client";

import { useEffect, useState } from "react";
import { Check, Link2, Mail, Share2 } from "lucide-react";

/**
 * lucide-react no longer ships brand marks, so these are inlined — the same
 * approach the site footer takes for its social icons.
 */
const BRANDS = [
  {
    label: "Share on WhatsApp",
    path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.886-9.885 9.886",
    href: (u: string, t: string) => `https://wa.me/?text=${encodeURIComponent(`${t} ${u}`)}`,
  },
  {
    label: "Share on Facebook",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073",
    href: (u: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}`,
  },
  {
    label: "Share on X",
    path: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
    href: (u: string, t: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}`,
  },
];

export function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  // Read on the client: the canonical URL is not known at build time, and
  // navigator.share only exists in some browsers.
  useEffect(() => {
    setUrl(window.location.href);
    setCanNativeShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      /* clipboard blocked — the other options still work */
    }
  };

  const btn =
    "inline-flex items-center justify-center h-9 w-9 rounded-full border transition-colors hover:bg-background-alt";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className="text-[11px] font-[600] uppercase tracking-[0.12em] font-sans mr-1"
        style={{ color: "var(--muted)" }}
      >
        Share
      </span>

      {BRANDS.map((b) => (
        <a
          key={b.label}
          href={url ? b.href(url, title) : undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={b.label}
          className={btn}
          style={{ borderColor: "var(--border)", color: "var(--teal)" }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
            <path d={b.path} />
          </svg>
        </a>
      ))}

      <a
        href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`}
        aria-label="Share by email"
        className={btn}
        style={{ borderColor: "var(--border)", color: "var(--teal)" }}
      >
        <Mail className="h-4 w-4" />
      </a>

      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Link copied" : "Copy link"}
        className={btn}
        style={{ borderColor: "var(--border)", color: "var(--teal)" }}
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      </button>

      {canNativeShare && (
        <button
          type="button"
          onClick={() => navigator.share({ title, url }).catch(() => {})}
          aria-label="Share"
          className={`${btn} md:hidden`}
          style={{ borderColor: "var(--border)", color: "var(--teal)" }}
        >
          <Share2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
