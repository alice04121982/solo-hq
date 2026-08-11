"use client";

import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Logo } from "./logo";

// Core links stay flat on the bar. Lighter-weight pages live behind "More" so
// a 7th/8th item never has to fight the logo and CTA for room at lg.
const PRIMARY_LINKS = [
  { label: "Family Types", href: "/families" },
  { label: "How IVF Works", href: "/how-ivf-works" },
  { label: "Compare Clinics", href: "/ivf-finder" },
  { label: "Stories", href: "/stories" },
];

const MORE_LINKS = [
  { label: "Faith & Culture", href: "/faith" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Our Story", href: "/our-story" },
];

interface SiteNavProps {
  theme?: "light" | "dark";
}

/** Wider than lucide's Menu icon, which is 24px on a 24px box. */
function BurgerIcon() {
  return (
    <svg width="34" height="14" viewBox="0 0 34 14" fill="none" aria-hidden>
      <line x1="0" y1="1" x2="34" y2="1" stroke="currentColor" strokeWidth="1.75" />
      <line x1="0" y1="12" x2="34" y2="12" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden>
      <line x1="2" y1="2" x2="28" y2="28" stroke="currentColor" strokeWidth="1.75" />
      <line x1="28" y1="2" x2="2" y2="28" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

export function SiteNav({ theme = "light" }: SiteNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const isDark = theme === "dark";
  const moreActive = MORE_LINKS.some((l) => l.href === pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The overlay covers the page, so the document behind it must not scroll and
  // Escape needs to close it — neither is free with a plain fixed element.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // "More" is a lightweight dropdown, not a modal — closes on outside click or
  // Escape, but never touches body scroll the way the mobile overlay does.
  useEffect(() => {
    if (!moreOpen) return;
    const onClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [moreOpen]);

  return (
    <nav
      className={`relative flex items-center justify-between gap-8 py-6 transition-all duration-300 ${
        scrolled ? `border-b ${isDark ? "border-white/10" : "border-border"}` : ""
      }`}
    >
      <a href="/" className="flex items-center">
        <Logo height={44} onDark={isDark} />
      </a>

      {/* Desktop links — eight items across primary + "More" no longer fit
          beside the logo and CTA at the md breakpoint, so the burger still
          carries the full list until lg. The inactive-link tint on dark is
          #deb8c8 rather than the standard --on-teal-muted body-copy token
          (#c4a0ae only clears ~3.8:1 on --teal, short of the 4.5:1 text
          needs at nav size); #deb8c8 clears ~5:1 while staying in the same
          mauve-pink family as the active state. */}
      <div className="hidden lg:flex items-center gap-5 xl:gap-8">
        {PRIMARY_LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className={`text-sm font-sans transition-colors duration-150 ${
              isDark
                ? pathname === l.href ? "text-[#f9c6da]" : "text-[#deb8c8] hover:text-[#f9c6da]"
                : pathname === l.href ? "text-foreground" : "text-muted hover:text-foreground"
            }`}
          >
            {l.label}
          </a>
        ))}

        {/* "More" — a small dropdown for lighter-weight pages, so the bar
            stays short without dropping them from desktop nav entirely. */}
        <div className="relative" ref={moreRef}>
          <button
            type="button"
            onClick={() => setMoreOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={moreOpen}
            className={`flex items-center gap-1 text-sm font-sans transition-colors duration-150 ${
              isDark
                ? moreActive ? "text-[#f9c6da]" : "text-[#deb8c8] hover:text-[#f9c6da]"
                : moreActive ? "text-foreground" : "text-muted hover:text-foreground"
            }`}
          >
            More
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-150 ${moreOpen ? "rotate-180" : ""}`} />
          </button>

          {moreOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full mt-3 w-56 rounded-2xl border border-border bg-white p-2 shadow-xl z-50"
            >
              {MORE_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  role="menuitem"
                  onClick={() => setMoreOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-sans transition-colors duration-150 ${
                    pathname === l.href ? "text-foreground bg-surface-hover" : "text-muted hover:text-foreground hover:bg-surface-hover"
                  }`}
                >
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="hidden lg:flex items-center">
        <a
          href="/get-started"
          className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-sans font-medium transition-colors duration-200"
          style={{ background: "#C5E600", color: "#1A3A25" }}
        >
          Get Started
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Mobile burger */}
      <button
        className={`lg:hidden p-1 ${isDark ? "text-[#f9c6da]" : "text-foreground"}`}
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
      >
        <BurgerIcon />
      </button>

      {/* Full-screen menu */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex flex-col lg:hidden"
          style={{ background: "var(--teal)" }}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="flex items-center justify-between gap-8 px-6 py-6">
            <a href="/" onClick={() => setOpen(false)} className="flex items-center">
              <Logo height={44} onDark />
            </a>
            <button
              className="p-1"
              style={{ color: "var(--on-teal)" }}
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Links fill the space between the header and the footer action.
              Eight of them at this type size can exceed a short phone
              viewport, so the column scrolls rather than clipping the last
              item. The desktop primary/"More" grouping is not carried over
              here — one even column reads better at this scale. */}
          <div className="flex-1 min-h-0 overflow-y-auto flex flex-col items-center justify-center gap-5 px-6 py-4">
            {[...PRIMARY_LINKS, ...MORE_LINKS].map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-sans text-center transition-opacity duration-150 hover:opacity-70"
                style={{
                  fontSize: "clamp(1.75rem, 8vw, 2.5rem)",
                  lineHeight: 1.2,
                  color: pathname === l.href ? "var(--on-teal)" : "var(--on-teal-muted)",
                }}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div
            className="px-6 py-6 flex items-center justify-between gap-4 border-t"
            style={{ borderColor: "rgba(249, 198, 218, 0.15)" }}
          >
            <p className="text-xs font-sans leading-snug" style={{ color: "var(--on-teal-muted)" }}>
              Clear, honest guidance.
              <br />
              Free to use.
            </p>
            <a
              href="/get-started"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-sans font-medium shrink-0"
              style={{ background: "var(--accent)", color: "#1A3A25" }}
            >
              Get Started
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
