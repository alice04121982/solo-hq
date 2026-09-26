"use client";

import { usePathname } from "next/navigation";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CountryFlag } from "./country-flag";
import {
  MARKETS,
  MARKET_ORDER,
  counterpartPath,
  marketFromPath,
  rememberMarketChoice,
} from "@/lib/market";

/**
 * Header control for moving between the UK and US sites.
 *
 * Two markets do not need a country grid or a modal: this is a small
 * two-row menu that opens from a "UK · £" trigger, built the same way as the
 * nav's "More" dropdown (outside click and Escape close it). Each row is a
 * real link to the matching page in that market, so it works in a new tab
 * and with the Back button.
 */
export function MarketSwitch({ theme = "light" }: { theme?: "light" | "dark" }) {
  const pathname = usePathname() ?? "/";
  const current = marketFromPath(pathname);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isDark = theme === "dark";

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Market: ${current.name}, prices in ${current.currency}. Change market`}
        className={`flex items-center gap-1.5 text-sm font-sans transition-colors duration-150 ${
          isDark ? "text-[#deb8c8] hover:text-on-teal" : "text-muted hover:text-teal"
        }`}
      >
        <CountryFlag country={current.flagCountry} />
        <span aria-hidden>
          {current.shortName} · {current.currencySymbol}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Choose a market"
          className="absolute right-0 top-full mt-3 w-72 rounded-2xl border border-border-warm bg-white p-2 shadow-xl z-50"
        >
          {MARKET_ORDER.map((id) => {
            const market = MARKETS[id];
            const active = market.id === current.id;
            const { href } = counterpartPath(pathname, market);
            return (
              <a
                key={id}
                href={href}
                role="menuitem"
                aria-current={active ? "true" : undefined}
                onClick={() => {
                  rememberMarketChoice(market.id);
                  setOpen(false);
                }}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-sans transition-colors duration-150 ${
                  active ? "text-teal bg-surface-hover" : "text-muted hover:text-teal hover:bg-surface-hover"
                }`}
              >
                <CountryFlag country={market.flagCountry} />
                <span className="flex-1 whitespace-nowrap">{market.name}</span>
                <span className="tabular-nums text-xs whitespace-nowrap">
                  {market.currencySymbol} {market.currency}
                </span>
                <Check
                  className={`h-4 w-4 ${active ? "opacity-100" : "opacity-0"}`}
                  aria-hidden
                />
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * The same choice laid out flat, for the full-screen mobile menu, where a
 * dropdown inside an overlay would be one layer too many.
 */
export function MarketSwitchInline({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname() ?? "/";
  const current = marketFromPath(pathname);

  return (
    <div role="group" aria-label="Market" className="flex items-center gap-2">
      {MARKET_ORDER.map((id) => {
        const market = MARKETS[id];
        const active = market.id === current.id;
        return (
          <a
            key={id}
            href={counterpartPath(pathname, market).href}
            aria-current={active ? "true" : undefined}
            onClick={() => {
              rememberMarketChoice(market.id);
              onNavigate?.();
            }}
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-sans transition-opacity duration-150 hover:opacity-80"
            style={{
              borderColor: active ? "var(--on-teal)" : "rgba(249, 198, 218, 0.25)",
              color: active ? "var(--on-teal)" : "var(--on-teal-muted)",
            }}
          >
            <CountryFlag country={market.flagCountry} />
            {market.shortName} · {market.currencySymbol}
          </a>
        );
      })}
    </div>
  );
}
