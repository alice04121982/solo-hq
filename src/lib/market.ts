/**
 * The markets the site serves, and how a page in one maps to the other.
 *
 * The market lives in the URL, never in a cookie or a server-side setting:
 * UK pages keep the paths they have always had, and US pages live under
 * /us. Switching market is an ordinary link to the matching page in the
 * other market, so it opens in a new tab, survives the Back button and
 * keeps every page statically rendered. See
 * docs/market-selector-ux-review.md for the reasoning.
 */

export type MarketId = "uk" | "us";

export interface Market {
  id: MarketId;
  /** Written out in full wherever the market is named. */
  name: string;
  /** Compact label for the header control. */
  shortName: string;
  currency: "GBP" | "USD";
  currencySymbol: string;
  /** BCP 47 tag: the page `lang`, hreflang and number formatting. */
  locale: "en-GB" | "en-US";
  /** Path prefix. The UK has none. */
  basePath: "" | "/us";
  /** Country code understood by CountryFlag. */
  flagCountry: string;
}

export const MARKETS: Record<MarketId, Market> = {
  uk: {
    id: "uk",
    name: "United Kingdom",
    shortName: "UK",
    currency: "GBP",
    currencySymbol: "£",
    locale: "en-GB",
    basePath: "",
    flagCountry: "United Kingdom",
  },
  us: {
    id: "us",
    name: "United States",
    shortName: "US",
    currency: "USD",
    currencySymbol: "$",
    locale: "en-US",
    basePath: "/us",
    flagCountry: "United States",
  },
};

export const MARKET_ORDER: MarketId[] = ["uk", "us"];

/**
 * Pages that exist in both markets, as [UK path, US path]. Only listed
 * pairs switch like for like; any other page switches to the other
 * market's home page with a note saying why. Add a pair here in the same
 * change that adds a US page with a UK counterpart.
 */
export const PAGE_PAIRS: ReadonlyArray<readonly [uk: string, us: string]> = [
  ["/", "/us"],
];

/** Query flag on a market home page when the visitor's page had no match. */
export const NO_COUNTERPART_PARAM = "from";

export function marketFromPath(pathname: string): Market {
  return pathname === "/us" || pathname.startsWith("/us/")
    ? MARKETS.us
    : MARKETS.uk;
}

export function otherMarket(market: Market): Market {
  return market.id === "uk" ? MARKETS.us : MARKETS.uk;
}

/**
 * Where a visitor on `pathname` lands when switching to `target`.
 * `exact` is false when the page has no counterpart and they are sent to
 * the target market's home page instead.
 */
export function counterpartPath(
  pathname: string,
  target: Market,
): { href: string; exact: boolean } {
  const current = marketFromPath(pathname);
  if (current.id === target.id) return { href: pathname, exact: true };

  const pair = PAGE_PAIRS.find(([uk, us]) =>
    current.id === "uk" ? uk === pathname : us === pathname,
  );
  if (pair) {
    return { href: target.id === "uk" ? pair[0] : pair[1], exact: true };
  }

  const home = target.basePath || "/";
  return { href: `${home}?${NO_COUNTERPART_PARAM}=${current.id}`, exact: false };
}

/**
 * The market a browser language suggests, or null when it suggests
 * neither. Only an exact en-US or en-GB counts: plain "en" says nothing
 * about where someone is, and no IP or location lookup is ever made.
 */
export function marketFromLanguage(language: string | undefined): Market | null {
  const tag = language?.toLowerCase();
  if (tag === "en-us") return MARKETS.us;
  if (tag === "en-gb") return MARKETS.uk;
  return null;
}

/**
 * localStorage key recording that this browser has chosen a market or
 * dismissed the suggestion. It holds "uk", "us" or "dismissed", never
 * leaves the browser, and only stops the suggestion strip reappearing.
 */
export const MARKET_CHOICE_KEY = "cairn:market-choice";

export function rememberMarketChoice(value: MarketId | "dismissed") {
  try {
    window.localStorage.setItem(MARKET_CHOICE_KEY, value);
  } catch {
    // Storage blocked (private mode, disabled site data): the strip may
    // reappear next visit, which is harmless.
  }
}

export function hasMarketChoice(): boolean {
  try {
    return window.localStorage.getItem(MARKET_CHOICE_KEY) !== null;
  } catch {
    return false;
  }
}
