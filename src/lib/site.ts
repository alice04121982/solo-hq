/**
 * Canonical origin for absolute URLs (metadataBase, sitemap, robots).
 *
 * Set NEXT_PUBLIC_SITE_URL in the deployment environment once the custom
 * domain (cairnfertility.co.uk) is attached; until then the Vercel preview
 * origin is the only URL that actually serves the site.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cairnfertility.vercel.app";
