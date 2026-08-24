import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content Security Policy.
 *
 * Set here rather than through a nonce in `proxy.ts`, and that is a deliberate
 * trade. Nonce-based CSP requires every page to render dynamically, which for
 * a site that is almost entirely static reading material means losing static
 * generation and CDN caching site-wide. What it would buy is protection
 * against injected inline scripts — and the thing that makes that attack
 * valuable, a session to steal, does not exist here: no accounts, no login, no
 * cookies, and no user-submitted content is ever rendered back out as HTML.
 *
 * So `script-src` keeps `'unsafe-inline'` (Next's bootstrap needs it without a
 * nonce) and the directives that actually carry weight for this site are the
 * strict ones:
 *
 *   connect-src   the browser may only talk to this origin and the postcode
 *                 lookup — an injected script cannot post data anywhere else
 *   form-action   a form on this site cannot be made to submit elsewhere
 *   frame-ancestors  nobody can frame the application form and harvest it
 *   base-uri      no rewriting where relative URLs resolve to
 *   object-src    no plugins, ever
 *
 * If the site ever grows accounts or renders member-submitted content, revisit
 * this: at that point a nonce-based policy is worth what it costs. The upgrade
 * path is in docs/security-review.md.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  // Tailwind v4 and the many `style={{…}}` attributes across the components
  // are inline styles; there is no version of this policy without it.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com",
  "font-src 'self'",
  // api.postcodes.io resolves browser coordinates to a postcode for the
  // location search. It is the only third party the browser ever contacts.
  `connect-src 'self' https://api.postcodes.io${isDev ? " ws: http://localhost:*" : ""}`,
  "form-action 'self'",
  "base-uri 'none'",
  "object-src 'none'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

/**
 * Everything the browser is allowed to ask for. Geolocation is `self` because
 * the clinic location search asks for it (with a permission prompt, on a
 * click); everything else is off, so a compromised dependency cannot quietly
 * reach for a camera or a microphone.
 */
const permissionsPolicy = [
  "geolocation=(self)",
  "camera=()",
  "microphone=()",
  "payment=()",
  "usb=()",
  "magnetometer=()",
  "gyroscope=()",
  "accelerometer=()",
  "interest-cohort=()",
  "browsing-topics=()",
].join(", ");

const securityHeaders = [
  {
    // Two years, subdomains included, preload-eligible. HTTPS-only is already
    // true on Vercel; this stops the very first request being downgradeable.
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  // frame-ancestors above is the real control; this covers browsers and
  // scanners that only read the older header.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: permissionsPolicy },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
];

const nextConfig: NextConfig = {
  // Version and framework fingerprinting is free reconnaissance.
  poweredByHeader: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Invite links carry a token in the path. `no-referrer` keeps that
        // token out of the Referer header on any navigation away from the
        // page, and the noindex stops it reaching a search index if a link is
        // ever posted somewhere public. The page's own metadata sets the same
        // things; both exist because either alone can be lost in a refactor.
        source: "/community/join/:token*",
        headers: [
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "Cache-Control", value: "no-store, max-age=0" },
        ],
      },
      {
        // Nothing under /api is ever cacheable, and none of it belongs in a
        // search index.
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // /our-story was merged into the About page; its content lives on in
      // the "Our story" section there.
      {
        source: "/our-story",
        destination: "/about#story",
        permanent: true,
      },
      // The old Flying Solo production domain. Vercel redirects it to
      // cairnfertility.vercel.app at platform level (both domains are
      // attached to the project); this app-level rule is a backstop in case
      // that platform redirect is ever removed.
      {
        source: "/:path*",
        has: [{ type: "host", value: "solo-hq.vercel.app" }],
        destination: "https://cairnfertility.vercel.app/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
