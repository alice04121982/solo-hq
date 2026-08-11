# CairnFertility brand assets

A cairn is a stack of stones left by travellers — part waymark, part
monument. Each stone was placed by someone who passed this way before,
and the stack guides the next person along the path. That is the brand
story: people who have been through fertility treatment leaving markers
for the ones who follow.

## Wordmark

The wordmark is the single word **CairnFertility**, set in General Sans
(medium, tight tracking), with a two-tone split between the words:

| Surface | "Cairn" | "Fertility" | Contrast |
|---|---|---|---|
| Light | `--teal` #005353 | `--accent-dark` #9BBB00 | ~8.9:1 / ~2.2:1 |
| Teal | white | `--accent` #C5E600 | ~8.9:1 / ~6.2:1 |

Raw lime (`--accent`) must never be used for text on white — it only
clears ~1.6:1 there; the darker leaf green stands in for it on light
surfaces (WCAG's logotype exemption applies, but keep it legible). The
live implementation is `src/components/logo.tsx`.

## Mark explorations (`marks/`)

1. **01 Classic Stack** — four balanced stones; the lime summit stone is
   the goal the journey builds toward. Echoes the existing OG image.
2. **02 Seed Stone** — the stack carries a round lime seed/egg: the
   family the journey leads to.
3. **03 Waypath** — *the chosen mark.* Stones settle slightly off-axis,
   like a real trail cairn; a lime dot hovers centred above the summit,
   marking the next waypoint. Lives in the logo lockup
   (`src/components/logo.tsx`), the favicon (`src/app/icon.svg`), and
   the OG image (`src/app/opengraph-image.tsx`).
4. **04 Monoline** — outlined stones, lighter and more editorial; only
   the summit stone is solid.
5. **05 Embrace** — two stones lean in to cradle the seed: shelter and
   support around new life. Works for solo parents and couples alike.

On teal surfaces, swap stone fills to `--cream` (#FBF2EB) and keep the
lime accent, matching `src/app/opengraph-image.tsx`.
