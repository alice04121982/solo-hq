import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { GUIDES } from "@/lib/guides";
import { FAMILY_TYPES } from "@/lib/family-types";
import { PUBLISHED_STORIES } from "@/lib/stories";
import { CLINICS } from "@/lib/clinics";
import { PAGE_PAIRS } from "@/lib/market";

const STATIC_ROUTES = [
  "",
  "/about",
  "/accessibility",
  "/community",
  "/contact",
  "/cookies",
  "/disclaimer",
  "/faith",
  "/families",
  "/funding",
  "/get-started",
  "/how-ivf-works",
  "/ivf-finder",
  "/privacy",
  "/resources",
  "/stories",
  "/support",
  "/terms",
  "/waitlist",
  "/work",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_ROUTES.filter((path) => !PAGE_PAIRS.some(([uk]) => uk === (path || "/"))).map(
      (path) => ({ url: `${SITE_URL}${path}` }),
    ),
    // Pages that exist in both markets list each other as alternates, so a
    // search engine serves the UK page in the UK and the US page in the US.
    ...PAGE_PAIRS.flatMap(([uk, us]) => {
      const languages = {
        "en-GB": `${SITE_URL}${uk === "/" ? "" : uk}`,
        "en-US": `${SITE_URL}${us}`,
      };
      return [
        { url: languages["en-GB"], alternates: { languages } },
        { url: languages["en-US"], alternates: { languages } },
      ];
    }),
    ...GUIDES.map((g) => ({ url: `${SITE_URL}/resources/${g.slug}` })),
    ...FAMILY_TYPES.map((f) => ({ url: `${SITE_URL}/families/${f.slug}` })),
    ...PUBLISHED_STORIES.map((s) => ({ url: `${SITE_URL}/stories/${s.id}` })),
    ...CLINICS.map((c) => ({ url: `${SITE_URL}/ivf-finder/${c.slug}` })),
  ];
}
