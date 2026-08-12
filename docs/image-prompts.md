# Replacement image prompts

Prompts for generating the seven replacement photographs identified in
`image-audit.md`, plus one optional. Written for Gemini, but they are plain
descriptive prose and work in any image model.

Every prompt hides faces. That is the point: no visible face means no
identifiable person, so nothing about the image implies a real individual had
fertility treatment. It also matches the three original images we kept, so the
set stays coherent.

## How to use these

1. Generate, then **crop to the exact pixel dimensions listed** — the layouts
   assume these shapes. Gemini does not take aspect-ratio flags, so the
   orientation is described in words and you may need to crop anyway.
2. Convert to WebP (quality ~80) and save with the **existing filename**. The
   code references these paths already, so a correctly named file needs no
   code change at all.
3. Check each output before using it: hands with the wrong number of fingers,
   garbled text on signage, and warped jewellery are the usual giveaways. A
   face that crept into frame means regenerate, not crop.
4. Keep files under ~250 KB where you can; the originals ran 40–240 KB.

## The prompts

### 1. `newborn.webp` — 1400 × 2099 (2:3 portrait)
Used on the "Mum and Dad" family guide.

> A documentary-style photograph of two parents standing close together beside
> a large window, holding a swaddled newborn between them. Shot from behind and
> slightly to one side so neither adult's face is visible — we see the curve of
> their shoulders, their arms overlapping around the baby, and the soft edge of
> the swaddle. Bright diffused window light from the left, gently blowing out to
> white. Muted, warm, slightly desaturated palette; soft low contrast; shallow
> depth of field with the background falling away. Real domestic interior,
> unposed, caught mid-moment. Vertical portrait orientation. Editorial
> reportage, not commercial stock. No faces visible, no eye contact.

### 2. `cta-family.webp` — 1600 × 1185 (4:3 landscape)
Used in the closing call-to-action band and the hero shape grid.

> A documentary-style photograph of an adult lifting a toddler up against their
> shoulder, both seen from behind against a plain painted exterior wall in deep
> teal. The child's face is turned into the adult's neck; the adult's head is
> turned away from the camera. The child's small hand rests on the adult's
> shoulder. Overcast natural daylight, soft and directionless. Muted warm
> palette, slightly desaturated, low contrast. Shallow depth of field.
> Horizontal landscape orientation. Unposed, editorial reportage. No faces
> visible, no eye contact.

### 3. `story-solo-dad.webp` — 1200 × 2132 (tall 9:16 portrait)
Story: "I decided at 40. My son was born at 43."

> A quiet documentary photograph of a man sitting on a window seat in a
> converted flat with exposed red brick, holding a mug in both hands, looking
> out of the window. Shot from behind and to the side so his face is entirely
> out of view — only the back of his head, the line of his shoulder, and his
> hands around the mug. Soft grey daylight through the glass, strongly
> backlit so he reads almost as a silhouette. Muted palette mixing warm brick
> and cool daylight, low contrast, shallow depth of field. Tall vertical
> portrait orientation. Contemplative, unposed, editorial. No face visible.

### 4. `story-two-mums.webp` — 1200 × 854 (3:2 landscape)
Story: "We both wanted to be part of making her."

> A documentary-style photograph of two women sitting close together on the
> edge of a bed in a stone-walled room, seen from behind and slightly above.
> Their heads are inclined toward one another, hair falling forward, so neither
> face is visible. One rests a hand on the other's knee. Warm late-afternoon
> light from a window to the right, soft and golden. Muted, warm, slightly
> desaturated palette; gentle contrast; shallow depth of field. Horizontal
> landscape orientation. Tender and unposed, editorial reportage rather than
> commercial stock. No faces, no eye contact.

### 5. `story-two-dads.webp` — 1200 × 1800 (2:3 portrait)
Story: "We met our surrogate at a barbecue. She changed our lives."

> A documentary-style photograph of two men standing close together on a city
> street, embracing, photographed from behind so neither face is visible — we
> see the backs of their heads, one man's arms around the other's waist, jacket
> textures in brown leather and tan canvas. Behind them, a sunlit view of pale
> buildings and terracotta rooftops falls out of focus. Soft hazy afternoon
> light. Muted warm palette, slightly desaturated, low contrast, shallow depth
> of field. Vertical portrait orientation. Unposed, editorial. No faces visible.

### 6. `story-faith-beach.webp` — 1600 × 1067 (3:2 landscape)
Story: "Our imam knew more about IVF than our first consultant did."

> A documentary-style photograph of a family on a wide empty beach at low tide,
> seen from behind at middle distance as they walk away from the camera toward
> the water. A woman in a soft dusty-pink hijab and a long white shirt, a man
> beside her, and a small child between them holding both their hands. All three
> are turned away; no faces are visible. Pale overcast sky, flat silver sea, wet
> sand reflecting the light. Cool muted palette with warm skin and fabric tones,
> low contrast, soft focus falloff toward the horizon. Horizontal landscape
> orientation. Quiet, unposed, editorial reportage. No faces.

### 7. `family-beach.webp` — 1200 × 1200 (1:1 square)
Used in the hero shape grid.

> A documentary-style photograph, square composition, of two adults and a small
> child crouched together on wet sand building a sandcastle, photographed from
> behind and slightly to the side so all three heads are turned down and away,
> faces hidden. We see the curve of their backs, hands working in the sand, a
> small blue spade. Sea and a rocky headland soft and out of focus behind them.
> Pale overcast daylight, cool blue-grey tones against warm sand. Low contrast,
> shallow depth of field. Unposed, editorial reportage. No faces visible.

### 8. `story-mirror-family.webp` — 1200 × 1800 (2:3 portrait) — optional
Story: "Two years of trying. Three months of IVF. One daughter." Currently
borderline rather than high risk, so replace only if you are doing the set.

> A documentary photograph of a round black-framed mirror on a pale plaster
> wall, reflecting a view through a doorway into a small bright kitchen where
> two parents stand holding a newborn. The reflection sits at a distance and
> slightly soft; both parents' heads are bowed toward the baby so their faces
> are not visible. The foreground wall fills most of the frame, with the edge of
> a wooden shelf at the bottom. Natural daylight, muted warm-grey palette, low
> contrast, fine film-like grain. Vertical portrait orientation. Quiet,
> observational, editorial. No faces visible.

## Alt text to apply with the new images

Alt text describes what is *in* the picture, so it has to change in the same
commit as the picture. Do not apply these before the images land — they would
describe photographs the site is not yet serving.

Three things to know before editing:

- **Several images carry alt text in more than one file**, and today those
  copies disagree with each other. `cta-family.webp` has three different
  descriptions, one of which calls the adult a solo dad while the other two
  call him a father. Update every location listed, not just the first hit.
- **`story-mirror-family.webp` in `stories.ts` currently reads "Couple
  embracing warmly"**, which does not describe the photograph at all — it is a
  family with a newborn seen at distance in a round wall mirror. That is a live
  accessibility defect independent of any image swap.
- The `hero-shape-grid.tsx` entries ("Two mums together", "Two dads together")
  are accurate but thin; the replacements below give a screen reader something
  to actually picture.

### If you use the obscured-people images

| Image | Alt text | Locations to update |
| --- | --- | --- |
| `newborn.webp` | Two parents seen from behind, standing by a bright window while holding a swaddled newborn baby between them. | `family-types.ts` |
| `cta-family.webp` | An adult seen from behind lifting a toddler up to their shoulder against a deep teal wall. | `hero-shape-grid.tsx`, `cta-section.tsx`, `family-types.ts` |
| `story-solo-dad.webp` | Silhouette of a man sitting on a window seat in an exposed brick flat, holding a mug and looking out of the window. | `stories.ts` |
| `story-two-mums.webp` | Two women seen from behind sitting close together on the edge of a bed in soft afternoon light. | `hero-shape-grid.tsx`, `stories.ts`, `family-types.ts` |
| `story-two-dads.webp` | Two men embracing on a city street, seen from behind with sunlit rooftops blurred in the background. | `hero-shape-grid.tsx`, `stories.ts`, `family-types.ts` |
| `story-faith-beach.webp` | A family walking away from the camera along a wet, wide beach toward the water at low tide. | `stories.ts` |
| `family-beach.webp` | Two adults and a small child crouched together on wet sand building a sandcastle, seen from behind. | `hero-shape-grid.tsx` |
| `story-mirror-family.webp` | A round wall mirror reflecting a distant, soft view of two parents holding a newborn in a bright kitchen. | `stories.ts`, `family-types.ts` |

### If you use the abstract / still-life images

| Image | Alt text |
| --- | --- |
| `newborn.webp` | A folded cellular cotton swaddle blanket resting on an unmade bed in soft window light. |
| `cta-family.webp` | A small toddler's knitted cardigan hanging on a wooden wall hook against a deep teal background. |
| `story-solo-dad.webp` | A single ceramic mug resting on a wooden window sill in front of exposed brickwork. |
| `story-two-mums.webp` | Two ceramic tea cups resting close together on a bedside table in golden afternoon light. |
| `story-two-dads.webp` | Two pairs of sunglasses resting on an outdoor wooden café table with city buildings in the background. |
| `story-faith-beach.webp` | Three sets of footprints — two adult and one child — leading across wet sand toward the sea. |
| `family-beach.webp` | A small blue toy spade resting beside a sandcastle on a wet beach. |
| `story-mirror-family.webp` | A round wall mirror reflecting a soft, out-of-focus view of a sunlit kitchen through a doorway. |

The still-life set needs its own prompts; the scenes are described well enough
above to write them when the choice is made.

## If you want to go further

Every prompt above still depicts people, just unidentifiably. If you would
rather move further toward abstraction, the same scenes work as details:
hands in sand, two coffee cups on a windowsill, a folded swaddle on an unmade
bed, footprints at the tideline. That reads as more editorial and less stock,
sits closer to the existing shape system, and removes the question entirely.
`hands.webp`, one of the three originals we kept, is already exactly this.
