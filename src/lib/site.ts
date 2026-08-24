/**
 * Canonical origin for absolute URLs (metadataBase, sitemap, robots).
 *
 * Canonical domain is cairnfertility.com; cairnfertility.co.uk is held
 * defensively and redirects here. Set NEXT_PUBLIC_SITE_URL in the
 * deployment environment to override (e.g. back to the Vercel preview
 * origin while the custom domain is not yet attached).
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cairnfertility.com";
