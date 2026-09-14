"use client";

import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Logo } from "./logo";
import { buttonVariants } from "@/components/ui";

type NavChild = { label: string; href: string };
type NavItem = { label: string; href: string; children?: NavChild[] };

const NAV_ITEMS: NavItem[] = [
  {
    label: "Families",
    href: "/families",
    children: [
      { label: "Solo Mum families",  href: "/families/solo-mum" },
      { label: "Solo Dad families",  href: "/families/solo-dad" },
      { label: "Two mum families",   href: "/families/two-mum" },
      { label: "Two dad families",   href: "/families/two-dad" },
      { label: "Mum & Dad families", href: "/families/mum-and-dad" },
      { label: "Stories",            href: "/families/stories" },
    ],
  },
  {
    label: "Donor Conception",
    href: "/donor-conception",
    children: [
      { label: "Sperm donation", href: "/donor-conception/sperm-donation" },
      { label: "Egg donation",   href: "/donor-conception/egg-donation" },
      { label: "Double donor",   href: "/donor-conception/double-donor" },
    ],
  },
  { label: "Find a Clinic", href: "/clinics" },
  { label: "Resources",     href: "/resources" },
  { label: "News",          href: "/news" },
];

// ── Desktop dropdown ──────────────────────────────────────────────────────────
function DropdownItem({
  item,
  pathname,
}: {
  item: NavItem & { children: NavChild[] };
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isActive = pathname.startsWith(item.href);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a
        href={item.href}
        className={`flex items-center gap-1 text-sm font-sans transition-colors duration-150 ${
          isActive ? "text-text-primary" : "text-text-tertiary hover:text-text-primary"
        }`}
      >
        {item.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </a>

      {open && (
        <div className="absolute top-full left-0 mt-1.5 w-52 bg-bg-primary border border-border-secondary rounded-xl shadow-lg overflow-hidden z-50">
          {item.children.map((child) => (
            <a
              key={child.href}
              href={child.href}
              className={`block px-4 py-2.5 text-sm font-sans transition-colors duration-150 ${
                pathname === child.href
                  ? "text-text-primary bg-bg-secondary"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-secondary"
              }`}
            >
              {child.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Mobile accordion ──────────────────────────────────────────────────────────
function MobileAccordion({
  item,
  pathname,
  onNavigate,
}: {
  item: NavItem & { children: NavChild[] };
  pathname: string;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const isActive = pathname.startsWith(item.href);

  return (
    <div>
      <button
        className={`flex w-full items-center justify-between py-1 text-base font-sans transition-colors ${
          isActive ? "text-text-primary" : "text-text-tertiary"
        }`}
        onClick={() => setOpen((v) => !v)}
      >
        {item.label}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="mt-1 ml-3 flex flex-col gap-0.5 border-l border-border-secondary pl-4">
          {item.children.map((child) => (
            <a
              key={child.href}
              href={child.href}
              onClick={onNavigate}
              className={`py-1.5 text-sm font-sans transition-colors ${
                pathname === child.href ? "text-text-primary" : "text-text-tertiary"
              }`}
            >
              {child.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main nav ──────────────────────────────────────────────────────────────────
export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`relative flex items-center justify-between py-6 transition-all duration-300 ${
        scrolled ? "border-b border-border-secondary" : ""
      }`}
    >
      <a href="/" className="flex items-center shrink-0">
        <Logo height={44} />
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        {NAV_ITEMS.map((item) =>
          item.children ? (
            <DropdownItem
              key={item.href}
              item={item as NavItem & { children: NavChild[] }}
              pathname={pathname}
            />
          ) : (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-sans transition-colors duration-150 ${
                pathname === item.href
                  ? "text-text-primary"
                  : "text-text-tertiary hover:text-text-primary"
              }`}
            >
              {item.label}
            </a>
          )
        )}
      </div>

      {/* Desktop CTA */}
      <div className="hidden md:flex items-center gap-3">
        <a
          href="/login"
          className="text-sm font-sans text-text-secondary hover:text-text-primary transition-colors duration-150"
        >
          Log in
        </a>
        <a
          href="/clinics"
          className={buttonVariants({ variant: "primary", size: "sm" })}
        >
          Find a Clinic
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Mobile burger */}
      <button
        className="md:hidden p-2 text-fg-primary"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile drawer */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-bg-secondary border-b border-border-secondary px-6 py-5 flex flex-col gap-4 z-50 md:hidden">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <MobileAccordion
                key={item.href}
                item={item as NavItem & { children: NavChild[] }}
                pathname={pathname}
                onNavigate={() => setOpen(false)}
              />
            ) : (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`text-base font-sans py-1 transition-colors ${
                  pathname === item.href ? "text-text-primary" : "text-text-tertiary"
                }`}
              >
                {item.label}
              </a>
            )
          )}
          <a
            href="/clinics"
            className={buttonVariants({ variant: "primary", size: "md" })}
          >
            Find a Clinic <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      )}
    </nav>
  );
}
