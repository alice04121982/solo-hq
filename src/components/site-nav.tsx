"use client";

import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Logo } from "./logo";

const NAV_LINKS = [
  { label: "Family Types", href: "/families" },
  { label: "Compare Clinics", href: "/ivf-finder" },
  { label: "Stories", href: "/stories" },
  { label: "Resources", href: "/resources" },
  { label: "Get Started", href: "/get-started" },
];

interface SiteNavProps {
  theme?: "light" | "dark";
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

  return (
    <nav
      className={`relative flex items-center justify-between py-6 transition-all duration-300 ${
        scrolled ? `border-b ${isDark ? "border-white/10" : "border-border"}` : ""
      }`}
    >
      <a href="/" className="flex items-center">
        <Logo height={44} onDark={isDark} />
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-10">
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
        className={`md:hidden p-2 ${isDark ? "text-[#f9c6da]" : "text-foreground"}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile drawer */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border px-6 py-5 flex flex-col gap-4 z-50 md:hidden">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`text-base font-sans py-1 transition-colors ${
                pathname === l.href ? "text-foreground" : "text-muted"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/get-started"
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-sans font-medium mt-2 transition-colors"
            style={{ background: "#C5E600", color: "#1A3A25" }}
          >
            Get Started <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      )}
    </nav>
  );
}
