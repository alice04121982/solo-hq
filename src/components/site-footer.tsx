import { Logo } from "./logo";
import { FAMILY_TYPES } from "@/lib/family-types";

const TEAL = "var(--teal)";
const PINK = "#f9c6da";
const PINK_MUTED = "#c4a0ae";

// Derived from the canonical family-type data so footer naming can never
// drift from the labels used on the family pages themselves, in the same
// display order as the /families index.
const FAMILY_ORDER = [
  "solo-mum",
  "single-dad",
  "same-sex-female",
  "same-sex-male",
  "heterosexual-couple",
];
const FAMILY_LINKS = [...FAMILY_TYPES]
  .sort((a, b) => FAMILY_ORDER.indexOf(a.slug) - FAMILY_ORDER.indexOf(b.slug))
  .map((f) => ({ label: f.label, href: `/families/${f.slug}` }));

const TOOL_LINKS = [
  { label: "Clinic Comparison Tool", href: "/ivf-finder" },
  { label: "Family Types", href: "/families" },
  { label: "Faith, Culture & IVF", href: "/faith" },
  { label: "Difficult Conversations", href: "/faith#conversations" },
  { label: "Funding & Payment Options", href: "/funding" },
  { label: "NHS Eligibility Check", href: "/funding#check" },
  { label: "IVF & Work", href: "/work" },
  { label: "Resources", href: "/resources" },
  { label: "Community Waitlist", href: "/community" },
  { label: "In the Media", href: "/news" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Medical Disclaimer", href: "/disclaimer" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Contact", href: "/contact" },
];


function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p
        className="text-[13px] font-[600] uppercase tracking-[0.15em] mb-5 font-sans"
        style={{ color: PINK_MUTED }}
      >
        {title}
      </p>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-sm font-sans transition-opacity duration-150 hover:opacity-70"
              style={{ color: PINK }}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer style={{ background: TEAL }}>
      <div className="mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-36">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo height={36} onDark />
            <p
              className="text-sm font-sans mt-5 leading-relaxed"
              style={{ maxWidth: "28ch", color: PINK_MUTED }}
            >
              Clear, honest guidance for everyone building a family through fertility treatment.
            </p>
          </div>

          <LinkColumn title="Family Types" links={FAMILY_LINKS} />
          <LinkColumn title="Tools & Guides" links={TOOL_LINKS} />
          <LinkColumn title="Legal" links={LEGAL_LINKS} />
        </div>

        <div
          className="border-t pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{ borderColor: "rgba(249,198,218,0.2)" }}
        >
          <p className="text-xs font-sans" style={{ color: PINK }}>
            &copy; {new Date().getFullYear()} CairnFertility. Made in the UK.
          </p>
          <p
            className="text-xs font-sans leading-relaxed"
            style={{ maxWidth: "60ch", color: PINK_MUTED }}
          >
            CairnFertility is not a medical provider. All content is for informational purposes only and does not constitute medical advice. Always consult a qualified fertility specialist before beginning treatment. HFEA success rate data is publicly available and used here for educational comparison.
          </p>
        </div>
      </div>
    </footer>
  );
}
