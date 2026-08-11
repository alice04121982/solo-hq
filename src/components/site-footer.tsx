import { Logo } from "./logo";

const TEAL = "var(--teal)";
const PINK = "#f9c6da";
const PINK_MUTED = "#c4a0ae";
const PINK_HOT = "#F0A8C4";

const FAMILY_LINKS = [
  { label: "Solo Mums by Choice", href: "/families/solo-mum" },
  { label: "Same-Sex Female Couples", href: "/families/same-sex-female" },
  { label: "Same-Sex Male Couples", href: "/families/same-sex-male" },
  { label: "Solo Dads by Choice", href: "/families/single-dad" },
  { label: "Heterosexual Couples", href: "/families/heterosexual-couple" },
];

const TOOL_LINKS = [
  { label: "Clinic Comparison Tool", href: "/ivf-finder" },
  { label: "Family Types", href: "/families" },
  { label: "Faith, Culture & IVF", href: "/faith" },
  { label: "Difficult Conversations", href: "/faith#conversations" },
  { label: "Funding & Payment Options", href: "/funding" },
  { label: "NHS Eligibility Check", href: "/funding#check" },
  { label: "Resources", href: "/resources" },
  // News is unlisted until there is a real editorial pipeline; the page
  // itself stays in the repo at /news.
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Medical Disclaimer", href: "/disclaimer" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Contact", href: "/contact" },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    path: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 0 1-2.88 0 1.44 1.44 0 0 1 2.88 0z",
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  },
  {
    label: "WhatsApp",
    href: "https://whatsapp.com",
    path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0011.893 0C5.334 0 .001 5.335 0 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.304-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
  },
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
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

          {/* Socials */}
          <div>
            <p
              className="text-[13px] font-[600] uppercase tracking-[0.15em] mb-5 font-sans"
              style={{ color: PINK_MUTED }}
            >
              Follow our socials
            </p>
            <ul className="space-y-2.5">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 w-fit"
                    aria-label={s.label}
                  >
                    <span
                      className="flex items-center justify-center h-9 w-9 rounded-full shrink-0 transition-transform duration-150 group-hover:scale-105"
                      style={{ background: PINK_HOT }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-[18px] w-[18px]"
                        fill={TEAL}
                        aria-hidden="true"
                      >
                        <path d={s.path} />
                      </svg>
                    </span>
                    <span
                      className="rounded-full px-5 py-2 text-sm font-sans font-[600] text-center transition-opacity duration-150 group-hover:opacity-85"
                      style={{ background: PINK, color: TEAL, width: "124px" }}
                    >
                      {s.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="border-t pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{ borderColor: "rgba(249,198,218,0.2)" }}
        >
          <p className="text-xs font-sans" style={{ color: PINK }}>
            &copy; 2026 CairnFertility. Made in the UK.
          </p>
          <p
            className="text-xs font-sans leading-relaxed"
            style={{ maxWidth: "60ch", color: PINK_MUTED }}
          >
            Cairn Fertility is not a medical provider. All content is for informational purposes only and does not constitute medical advice. Always consult a qualified fertility specialist before beginning treatment. HFEA success rate data is publicly available and used here for educational comparison.
          </p>
        </div>
      </div>
    </footer>
  );
}
