import type { MetadataRoute } from "next";

/**
 * Pre-launch crawl block.
 *
 * The site is publicly reachable but not ready to be found: the photography
 * in public/photos/ has not yet been cleared for use alongside fertility
 * content (see the note in src/components/story-image.tsx), and the contact
 * addresses only work once the domain's email routing is live.
 *
 * TO LIFT AT LAUNCH: delete this file and remove the `robots` block from the
 * metadata export in src/app/layout.tsx. Both are needed — this file stops
 * crawling, the meta tag stops indexing of any URL discovered another way.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
