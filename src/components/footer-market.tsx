"use client";

import { usePathname } from "next/navigation";
import { CountryFlag } from "./country-flag";
import {
  counterpartPath,
  marketFromPath,
  otherMarket,
  rememberMarketChoice,
} from "@/lib/market";

const PINK = "var(--on-teal)";
const PINK_MUTED = "var(--on-teal-muted)";

/**
 * The footer's market row: which site this is, in words and currency, and
 * a plain link to the matching page on the other one. With two markets a
 * direct link beats a menu, and it still works with JavaScript off (the
 * link then points at the other market's home page).
 */
export function FooterMarketRow() {
  const pathname = usePathname() ?? "/";
  const current = marketFromPath(pathname);
  const other = otherMarket(current);

  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-sans" style={{ color: PINK }}>
      <CountryFlag country={current.flagCountry} />
      <span>
        {current.name} · {current.currencySymbol} {current.currency}
      </span>
      <span aria-hidden style={{ color: PINK_MUTED }}>·</span>
      <a
        href={counterpartPath(pathname, other).href}
        onClick={() => rememberMarketChoice(other.id)}
        className="underline underline-offset-2 transition-opacity duration-150 hover:opacity-70"
      >
        Switch to {other.name} ({other.currencySymbol} {other.currency})
      </a>
    </p>
  );
}

/** Crisis numbers for the market the visitor is reading. */
export function FooterHelpLine() {
  const pathname = usePathname() ?? "/";
  const isUs = marketFromPath(pathname).id === "us";

  return (
    <p className="text-xs font-sans leading-relaxed" style={{ color: PINK }}>
      {isUs ? (
        <>
          Need help now? Call 911 in an emergency, or call or text{" "}
          <a href="tel:988" className="underline underline-offset-2">
            988
          </a>{" "}
          (Suicide &amp; Crisis Lifeline), any time.
        </>
      ) : (
        <>
          Need help now? Call 999 in an emergency, or Samaritans free on{" "}
          <a href="tel:116123" className="underline underline-offset-2">
            116 123
          </a>
          , any time. More support:{" "}
          <a href="/support#crisis" className="underline underline-offset-2">
            Looking after yourself
          </a>
        </>
      )}
    </p>
  );
}
