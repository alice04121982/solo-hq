# Market selector: UX pattern review

Status: proposal for review. Nothing here is built.

How a visitor moves between the UK site and a future US site, and how US
visitors tell us their state. The patterns come from Mobbin (web), checked
against this codebase (`src/components/site-nav.tsx`,
`src/components/site-footer.tsx`, `src/components/country-flag.tsx`) and the
privacy position in `reports/US IVF market expansion plan.md`.

## What exists today

- There is no market selector. The site is UK only.
- The nav (`site-nav.tsx`) has four primary links plus a "More" menu. The
  footer (`site-footer.tsx`) has link groups and a legal row.
- `CountryFlag` already draws flags as inline SVG, since Windows can't show
  emoji flags. Use it here, not emoji.

## Patterns reviewed

| Pattern | Examples | Fit for Cairn |
|---|---|---|
| Footer market control: flag, country name and currency, plus a "Change" link | [Etsy](https://mobbin.com/screens/ba3a1ef8-7447-4b42-88d2-82eda3a2a77f), [H&M](https://mobbin.com/screens/07fdf1a2-468a-4108-ba74-d92bc38a7455), [Fiverr](https://mobbin.com/screens/3ef44603-217f-4cda-b055-3043731c8063) | **Yes.** It's where people expect to find it and it's always there. |
| Small header control showing the market and currency | [Selfridges](https://mobbin.com/screens/2e5b6e54-82ef-4fa7-8093-1dfcf5add025) | **Yes, compact.** Prices are the main thing that changes between markets, so show the currency. |
| Side panel with a current-location note and list | [lululemon](https://mobbin.com/screens/33e06f3a-67b7-4b20-a7ab-dfb0342e8875), [Selfridges panel](https://mobbin.com/screens/bfd43544-8249-47da-9563-1416e52826d8) | Good for the "you are on X, prices in Y" explanation. Too heavy for a choice between two markets. |
| Large country grid in a modal | [Kiwi](https://mobbin.com/screens/8e64ca07-d238-4ae4-9a12-849b504bf5a9), [Tripadvisor](https://mobbin.com/screens/e037d874-efff-4625-b154-6f8a9dce4d29) | **No.** Built for 50+ countries. With two it's overkill. |
| Blocking modal on arrival ("Where are you based?") | [HoneyBook](https://mobbin.com/screens/5a75b1e0-7645-4fff-8ae4-2895c3de6185), [Klook](https://mobbin.com/screens/72cdad75-9db5-47cc-83ac-d5e5fdfda7ff) | **No.** It stands between an anxious visitor and the content, and it's an interruption on a calm site. |
| Asking for state inside a task, with the reason given | [Headspace](https://mobbin.com/screens/c3313d4b-9065-4b00-ad28-de23488284bc), [Origin](https://mobbin.com/screens/23c4f06e-6df7-484e-8a46-86c539af4f78), [Hims](https://mobbin.com/screens/210a1ebb-9208-4428-8e5c-c36c2b8c50a8) | **Yes, for state.** Headspace's "I don't live in the U.S." escape is worth copying. |
| Country, then state, in one dialog | [Wise](https://mobbin.com/screens/462bbcb2-20a0-4061-b306-6a7744d98371), [Gemini](https://mobbin.com/screens/2ac7c534-a283-4a27-9066-dff6f5f282b4) | **No** as a sitewide setting. State matters only to specific tools. |
| Location or ZIP prompt | [Amazon](https://mobbin.com/screens/b50b0c5c-fc33-4586-ad28-00524dd058fc) | **No.** Asking for a ZIP code is more location data than we need. |

## Recommendation

**1. The market lives in the URL.** UK pages stay where they are and US pages
go under `/us`. The selector is a link to the matching page in the other
market (`/funding` ↔ `/us/funding`). It is not a stored setting. If a page has
no counterpart, it goes to that market's home page with a one-line note. This
keeps pages static and shareable, and search engines see each market as its
own set of pages.

**2. Two places to switch.**
- Footer, bottom row: `[UK flag] United Kingdom · £ GBP  Change`. "Change"
  opens a small popover with the two markets, each with a flag, name and
  currency, and a tick on the current one.
- Header: a compact `UK £` / `US $` control beside "More". On mobile it sits at
  the bottom of the menu drawer rather than using space in the top bar.

**3. A gentle first-visit suggestion, never a redirect.** If the browser
language is `en-US` and the visitor is on a UK page, show one dismissible strip
under the nav:

> Looks like you might be in the US. See US costs, coverage and clinics?
> **[Go to US site]** [Stay on UK site] ×

The choice is based only on `navigator.language`, not an IP lookup, which fits
our no-tracking stance and keeps pages static. The dismissal is remembered in
`localStorage` for this browser only, as a strictly necessary preference. The
strip never appears again once someone has chosen.

**4. State is asked in context, not sitewide.** The coverage checker and the
US finder ask "Which state issued your health plan?" with a one-line reason
("Coverage rules depend on the state your plan is regulated in, which may not
be where you live"). There are options for "Not sure" and "I'm not in the
US". The answer stays in the browser: no ZIP code, no geolocation, no server
storage.

**5. Always show which market you're in.** The flag and currency near the page
title on price-bearing pages (finder, calculator, funding), so a US visitor
never mistakes pounds for dollars.

## Accessibility

- The trigger is a `<button>` with an accessible name: "Market: United
  Kingdom, prices in pounds. Change market". The flag is `aria-hidden`, as
  `CountryFlag` already does.
- The popover works with the keyboard (arrow keys, Escape) and gives focus
  back to the trigger when it closes.
- Each market's layout sets `<html lang="en-GB">` or `lang="en-US"`.

## Anti-patterns to avoid

- Forced geo-IP redirects: they break static pages, confuse UK visitors
  reading about the US, and hide pages from search engines.
- Flags without names, or a "language" picker. Both markets are English. The
  real difference is currency, law and coverage.
- A modal on arrival.
- Keeping state or market in a cookie that is sent to the server.

## Open questions for you

1. Should the UK stay at the current URLs (recommended), or move under `/uk`?
2. Should the US home page lead with the coverage checker or the clinic
   finder?
3. Header control on desktop, or footer only at first?
