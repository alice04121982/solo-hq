"use client";

import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Logo } from "./logo";

const NAV_LINKS = [
  { label: "Family Types", href: "/families" },
  { label: "How IVF Works", href: "/how-ivf-works" },
  { label: "Compare Clinics", href: "/ivf-finder" },
  { label: "Stories", href: "/stories" },
  { label: "Resources", href: "/resources" },
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
  const isDark = theme === "dark";

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

  return (
    <nav
      className={`relative flex items-center justify-between gap-8 py-6 transition-all duration-300 ${
        scrolled ? `border-b ${isDark ? "border-white/10" : "border-border"}` : ""
      }`}
    >
      <a href="/" className="flex items-center">
        <Logo height={44} onDark={isDark} />
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-6 xl:gap-10">
        {NAV_LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className={`text-sm font-sans transition-colors duration-150 ${
              isDark
                ? pathname === l.href ? "text-[#f9c6da]" : "text-[#c4a0ae] hover:text-[#f9c6da]"
                : pathname === l.href ? "text-foreground" : "text-muted hover:text-foreground"
            }`}
          >
            {l.label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <div className="hidden md:flex items-center">
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
        className={`md:hidden p-1 ${isDark ? "text-[#f9c6da]" : "text-foreground"}`}
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
      >
        <BurgerIcon />
      </button>

      {/* Full-screen menu */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex flex-col md:hidden"
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

          {/* Links fill the space between the header and the footer action */}
          <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
            {NAV_LINKS.map((l) => (
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
