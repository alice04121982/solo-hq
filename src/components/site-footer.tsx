import { Logo } from "./logo";

const FAMILY_LINKS = [
  { label: "Solo Mums by Choice", href: "/families/solo-mum" },
  { label: "Same-Sex Female Couples", href: "/families/same-sex-female" },
  { label: "Same-Sex Male Couples", href: "/families/same-sex-male" },
  { label: "Single Men by Choice", href: "/families/single-dad" },
  { label: "Heterosexual Couples", href: "/families/heterosexual-couple" },
];

const TOOL_LINKS = [
  { label: "Clinic Comparison Tool", href: "/ivf-finder" },
  { label: "Family Types", href: "/families" },
  { label: "Resources", href: "/resources" },
  { label: "News & Updates", href: "/news" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Medical Disclaimer", href: "/disclaimer" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo height={36} />
            <p className="text-sm font-sans text-muted mt-5 leading-relaxed" style={{ maxWidth: "28ch" }}>
              Clear, honest guidance for everyone building a family through fertility treatment.
            </p>
          </div>

          {/* Family Types */}
          <div>
            <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-5 font-sans">
              Family Types
            </p>
            <ul className="space-y-3">
              {FAMILY_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm font-sans text-muted hover:text-foreground transition-colors duration-150"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-5 font-sans">
              Tools & Guides
            </p>
            <ul className="space-y-3">
              {TOOL_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm font-sans text-muted hover:text-foreground transition-colors duration-150"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[11px] font-[500] uppercase tracking-[0.15em] text-muted mb-5 font-sans">
              Legal
            </p>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm font-sans text-muted hover:text-foreground transition-colors duration-150"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs font-sans text-muted">
            &copy; 2026 Flying Solo. Made with grit and grace in the UK.
          </p>
          <p className="text-xs font-sans text-muted/60 leading-relaxed" style={{ maxWidth: "60ch" }}>
            Flying Solo is not a medical provider. All content is for informational purposes only and does not constitute medical advice. Always consult a qualified fertility specialist before beginning treatment. HFEA success rate data is publicly available and used here for educational comparison.
          </p>
        </div>
      </div>
    </footer>
  );
}
