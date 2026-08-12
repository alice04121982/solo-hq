---
name: cairn-color-tokens
description: Apply the Cairn design system's semantic colour tokens (defined in src/app/globals.css) correctly when building or restyling any screen or component in this app. Use this whenever choosing a colour for a fill, stroke, text, or icon, including new sections, component states, and reviewing code for token misuse. Covers the app's actual CSS custom properties and Tailwind theme colours; the rule set follows the Cairn design system's token discipline.
---

# Cairn Colour Tokens

Every colour in this app comes from the custom properties defined in
`src/app/globals.css`, exposed to Tailwind through the `@theme inline` block.
The one rule that outranks all others: **apply a token, never a raw hex.**
Use Tailwind classes (`bg-teal`, `text-muted`) or `var(--token)` in inline
styles when a class cannot express it.

Known drift: older components carry inline hex values that duplicate token
values. Do not copy that pattern, and when touching a line that contains one,
replace it with the token it duplicates (table below).

## Core tokens

| Token | Value | Use for |
|---|---|---|
| `--background` | #FFFFFF | page canvas, white cards |
| `--background-alt` | #F4F4F4 | recessed section bands |
| `--foreground` | #0C2626 | primary text and headings on light surfaces |
| `--muted` | #3B5350 | secondary text, captions, metadata |
| `--surface-hover` | #F1F6F6 | hovered rows and buttons on light surfaces |
| `--surface-sunken` | #EEF3F3 | inset wells, segmented-control tracks |
| `--border` | #E8E8E8 | card edges, dividers, input outlines |
| `--accent` | #C5E600 | lime: primary CTA fills, highlight marks |
| `--accent-soft` | #DCF04A | lighter lime accents |
| `--accent-dark` | #9BBB00 | lime hover states, "save" text on white |
| `--teal` | #005353 | brand surface (hero, footer) and brand ink on light |
| `--teal-10/20/25/35` | rgba(0,83,83,α) | translucent teal borders and washes |
| `--on-teal` | #f9c6da | headings and high-contrast text on teal |
| `--on-teal-muted` | #c4a0ae | body copy on teal |
| `--cream` | #FBF2EB | warm section bands, story tag pills |
| `--lavender` | #F0A8C4 | bubblegum pink: CTA band, shape marks |
| `--lavender-light` / `--lavender-dark` | #FBE0EE / #C47098 | pink tints and shades |
| `--card-bg` / `--card-border` | #FDE8F2 / #f5c6dd | pink card fills and edges |

Legacy aliases (`--charcoal`, `--navy`, `--lime`, `--warm-white`) resolve to
the tokens above and exist so old Tailwind classes still work. Prefer the
canonical names in new code.

## Pairing rules

- **Content boxes are always white.** Cards, notices, callouts, panels,
  form containers, and pills that sit on a section band use `--background`
  (white) with a `--border` edge — never `--surface-sunken` or
  `--background-alt`. Grey fills on the cream band (`--cream`) are
  near-invisible and are banned outright; because shared components move
  between bands and band numbering shifts, the grey-box pattern is banned
  on white bands too. `--background-alt` is reserved for full-bleed
  recessed section bands and the scrollbar track; `--surface-sunken` for
  control internals on white surfaces (switch tracks, segmented-control
  tracks) and `--surface-hover` for hover states only.
- On `--teal` surfaces: headings `--on-teal`, body `--on-teal-muted`,
  accents `--accent`. Never `--foreground` or `--muted` on teal.
- On light surfaces: headings `--foreground`, body/captions `--muted`,
  brand-coloured text and eyebrows `--teal`.
- On `--accent` (lime) fills: dark green ink. The codebase uses #1A3A25 for
  this; it is not yet a token. If you need it, add it to globals.css as
  `--on-accent` rather than inlining the hex again.
- CTA buttons: `--accent` fill with dark ink; secondary buttons are
  outlined with `--teal-20`/`--teal-35` borders and `--teal` text.
- Dividers and card edges: `--border` on light, `rgba(249,198,218,0.2)`
  pink-tinted on teal (footer pattern).

## Section bands

Pages are built from full-bleed bands via the `Section` component
(`tone="white" | "cream" | "teal"`). Alternate tones so adjacent bands
contrast; teal bands carry the on-teal text pairings automatically in
existing sections. Follow the homepage as the reference rhythm.

## Self-check before finalising a colour

1. Is it a token (Tailwind class or `var(--token)`), not a hex literal?
2. Does the text/icon colour match the surface it sits on (on-teal set for
   teal, foreground/muted for light)?
3. Interactive elements: hover state uses `--surface-hover`,
   `--accent-dark`, or an opacity shift, not a new colour.
4. If the colour you need has no token, add it to `globals.css` with a
   semantic name and use the token, instead of inlining the value.
