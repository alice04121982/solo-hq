import { SiteNav } from "./site-nav";

/**
 * Shared nav wrapper for every interior page.
 * Renders the SiteNav inside the standard max-width container with
 * a bottom border matching the design system border-secondary token.
 */
export function InnerNav() {
  return (
    <div className="border-b border-border-secondary bg-bg-primary px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <SiteNav />
      </div>
    </div>
  );
}
