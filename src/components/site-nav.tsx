"use client";

import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./logo";

const NAV_LINKS = [
  { label: "Getting Started", href: "/" },
  { label: "Find a Clinic", href: "/ivf-finder" },
  { label: "News", href: "/news" },
  { label: "Resources", href: "/resources" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between py-5">
      <a href="/" className="flex items-center">
        <Logo height={52} />
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        {NAV_LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className={`transition-colors ${
              pathname === l.href
                ? "text-navy"
                : "text-navy/40 hover:text-navy"
            }`}
          >
            {l.label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <div className="hidden md:flex items-center">
        <a
          href="/ivf-finder"
          className="inline-flex items-center gap-2 rounded-full bg-navy text-white px-5 py-2.5 text-sm font-semibold hover:bg-charcoal transition-colors"
        >
          Find a Clinic
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Mobile burger */}
      <button
        className="md:hidden p-2 text-navy"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile drawer */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-card-border px-4 py-4 flex flex-col gap-4 z-50 md:hidden">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`text-base font-medium py-1 ${
                pathname === l.href ? "text-navy" : "text-navy/50"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/ivf-finder"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-navy text-white px-5 py-2.5 text-sm font-semibold mt-2"
          >
            Find a Clinic <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      )}
    </nav>
  );
}
