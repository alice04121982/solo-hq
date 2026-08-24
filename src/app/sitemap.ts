import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { GUIDES } from "@/lib/guides";
import { FAMILY_TYPES } from "@/lib/family-types";
import { ALL_STORIES } from "@/lib/stories";
import { CLINICS } from "@/lib/clinics";

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
  "/terms",
  "/waitlist",
  "/work",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_ROUTES.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...GUIDES.map((g) => ({ url: `${SITE_URL}/resources/${g.slug}` })),
    ...FAMILY_TYPES.map((f) => ({ url: `${SITE_URL}/families/${f.slug}` })),
    ...ALL_STORIES.map((s) => ({ url: `${SITE_URL}/stories/${s.id}` })),
    ...CLINICS.map((c) => ({ url: `${SITE_URL}/ivf-finder/${c.slug}` })),
  ];
}
