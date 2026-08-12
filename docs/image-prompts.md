# Replacement image prompts

Prompts for generating the seven replacement photographs identified in
`image-audit.md`, plus one optional. Written for Gemini, but they are plain
descriptive prose and work in any image model.

Every prompt hides faces. That is the point: no visible face means no
identifiable person, so nothing about the image implies a real individual had
fertility treatment. It also matches the three original images we kept, so the
set stays coherent.

## The chosen set

Faces are a design choice here, not a legal constraint: these images are
generated, so no real person is depicted and no model release is in question.
The two full sets further down (all-obscured, all-still-life) are kept as
alternates, but this mix is the one to generate.

Five slots take faces, because their job is to show that families like the
reader's exist — a turned back cannot do that. Three take still life, where the
moment is contemplative or where a grid of neighbouring images needs texture
between the people.

| Slot | Treatment | Why |
| --- | --- | --- |
| `newborn.webp` | Faces | The outcome, on the "Mum and Dad" guide |
| `cta-family.webp` | Faces | Emotional close of the homepage |
| `story-two-mums.webp` | Faces | Representation is the point |
| `story-two-dads.webp` | Faces | Representation is the point |
| `story-faith-beach.webp` | Faces | Ditto — footprints would erase it |
| `story-solo-dad.webp` | Still life | The story is about deciding and waiting |
| `family-beach.webp` | Still life | Breaks up the hero grid's run of faces |
| `story-mirror-family.webp` | Still life | The mirror already carries the idea |

Craft notes that apply to every face prompt: no eye contact with the camera,
expressions unguarded rather than beaming, subjects absorbed in each other.
That is the line between editorial and stock. Generated hands and teeth are
where these models fail, so keep hands occupied or partly out of frame and
prefer half-smiles to broad grins.

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

Prompts for the still-life set are below.

## Natural-photography prompts (faces visible)

For the five slots where a face does work the obscured version cannot. Every
one avoids the stock-photo tells: nobody looks at the camera, expressions are
unguarded rather than beaming, and the subjects are absorbed in each other.

### 1. `newborn.webp` — 1400 × 2099 (2:3 portrait)

> A documentary-style photograph of two parents standing together beside a
> large window, both looking down at the swaddled newborn one of them is
> holding. Both faces visible in three-quarter view, absorbed in the baby and
> not the camera — soft, tired, unguarded expressions rather than broad smiles.
> Bright diffused window light from the left. Muted, warm, slightly desaturated
> palette; soft low contrast; shallow depth of field with a real lived-in room
> falling away behind them. Unposed, caught mid-moment. Vertical portrait
> orientation. Editorial reportage, not commercial stock. No eye contact with
> the camera.

### 2. `cta-family.webp` — 1600 × 1185 (4:3 landscape)

> A documentary-style photograph of an adult holding a toddler on their hip
> against a plain exterior wall painted deep teal, the two of them laughing at
> something out of frame. Both faces visible in three-quarter view, turned
> toward each other rather than the camera. Overcast natural daylight, soft and
> directionless. Muted warm palette, slightly desaturated, low contrast, the
> warm yellow of the child's knitted cardigan against the cool teal wall.
> Shallow depth of field. Horizontal landscape orientation with open wall to
> the right of the figures. Unposed, editorial reportage. No eye contact with
> the camera.

### 3. `story-two-mums.webp` — 1200 × 854 (3:2 landscape)

> A documentary-style photograph of two women sitting close together on the
> edge of a bed in a stone-walled room, mid-conversation, one turned toward the
> other and half-laughing at something she has said. Both faces visible in
> profile, engaged with each other and not the camera. Warm late-afternoon
> light from a window to the right, soft and golden. Muted, warm, slightly
> desaturated palette; gentle contrast; shallow depth of field. Horizontal
> landscape orientation. Tender and unposed, editorial reportage rather than
> commercial stock. No eye contact with the camera.

### 4. `story-two-dads.webp` — 1200 × 1800 (2:3 portrait)

> A documentary-style photograph of two men standing close together on a sunlit
> city street, one saying something to the other, both caught mid-laugh. Faces
> visible in three-quarter view, turned toward one another. Behind them a view
> of pale buildings and terracotta rooftops falls well out of focus. Soft hazy
> afternoon light, jacket textures in brown leather and tan canvas. Muted warm
> palette, slightly desaturated, low contrast, shallow depth of field. Vertical
> portrait orientation. Unposed, editorial. No eye contact with the camera.

### 5. `story-faith-beach.webp` — 1600 × 1067 (3:2 landscape)

> A documentary-style photograph of a family walking together along a wide
> beach at low tide — a woman in a soft dusty-pink hijab and a long white
> shirt, a man beside her, and a small child between them holding both their
> hands. All three are looking down at the child rather than at the camera,
> faces visible, calm and unforced. Pale overcast sky, flat silver sea, wet sand
> reflecting the light. Cool muted palette with warm skin and fabric tones, low
> contrast. Horizontal landscape orientation, the family off-centre with open
> beach to one side. Quiet, unposed, editorial reportage. No eye contact with
> the camera.

## Still-life prompts

Why these exist: the obscured-people set below was written when the images were
going to be real photographs, where a visible face implicates a real person.
Generated images contain no real person, so that constraint no longer applies —
and a whole site of people shot from behind reads as concealment rather than
intimacy. These say the same things through objects instead, which is warmer
than a turned back and more distinctive than stock.

Same house style throughout: natural available light, muted and slightly
desaturated, low contrast, shallow depth of field, real domestic surfaces with
their wear showing. Editorial still life, not catalogue product photography —
nothing should look styled for sale.

### 1. `newborn.webp` — 1400 × 2099 (2:3 portrait)

> A still-life photograph of a folded white cellular cotton swaddle blanket
> resting on an unmade bed, soft creases in the linen around it. Low morning
> light from a window out of frame to the left, falling across the fabric and
> falling away into shadow at the right. Muted warm palette, very low contrast,
> shallow depth of field with the far side of the bed soft. Real bedroom,
> slightly lived-in, nothing styled. Vertical portrait orientation. Quiet and
> observational, editorial still life. No people.

### 2. `cta-family.webp` — 1600 × 1185 (4:3 landscape)

> A still-life photograph of a small child's mustard-yellow knitted cardigan
> hanging from a wooden peg on a wall painted deep teal. The wool texture is
> soft and slightly pilled; one sleeve hangs lower than the other. Flat overcast
> daylight, soft and directionless. Muted palette, the warm yellow against the
> cool teal, low contrast. Shallow depth of field, the wall texture falling
> soft toward the edges. Horizontal landscape orientation with the cardigan
> off-centre to the left. Editorial still life. No people.

### 3. `story-solo-dad.webp` — 1200 × 2132 (tall 9:16 portrait)

> A still-life photograph of a single stoneware mug resting on a worn wooden
> window sill, faint steam rising, in front of a window with exposed red
> brickwork visible to one side. Soft grey daylight through the glass, strongly
> backlit so the mug reads almost as a silhouette against the bright window.
> Muted palette mixing warm brick and cool daylight, low contrast, shallow
> depth of field. Tall vertical portrait orientation. Contemplative, quiet,
> editorial still life. No people.

### 4. `story-two-mums.webp` — 1200 × 854 (3:2 landscape)

> A still-life photograph of two ceramic tea cups resting close together on a
> wooden bedside table, one with a little tea left in it, beside a folded pair
> of reading glasses. Warm late-afternoon light from a window to the right,
> soft and golden, throwing long low shadows across the wood. Muted, warm,
> slightly desaturated palette, gentle contrast, shallow depth of field with
> the room behind falling soft. Horizontal landscape orientation. Tender and
> unstyled, editorial still life. No people.

### 5. `story-two-dads.webp` — 1200 × 1800 (2:3 portrait)

> A still-life photograph of two pairs of sunglasses resting on an outdoor
> wooden café table beside two small espresso cups. Behind and far out of
> focus, a sunlit street of pale buildings with terracotta rooftops. Soft hazy
> afternoon light, warm and slightly flared. Muted warm palette, slightly
> desaturated, low contrast, very shallow depth of field. Vertical portrait
> orientation. Unstyled, editorial still life. No people.

### 6. `story-faith-beach.webp` — 1600 × 1067 (3:2 landscape)

> A photograph of three sets of footprints in wet sand — two adult, one small
> child — leading away from the camera toward a flat silver sea at low tide.
> The prints are filling slowly with water and catching the light. Pale
> overcast sky meeting the water at a soft horizon. Cool muted palette of
> silver, grey and pale sand, low contrast, soft focus falloff toward the
> horizon. Horizontal landscape orientation. Quiet, observational, editorial.
> No people.

### 7. `family-beach.webp` — 1200 × 1200 (1:1 square)

> A still-life photograph, square composition, of a small blue plastic toy
> spade lying beside a half-finished sandcastle on wet sand, a scatter of
> shells nearby. Sea and a rocky headland soft and far out of focus behind.
> Pale overcast daylight, cool blue-grey tones against warm sand, low contrast,
> shallow depth of field. Editorial, unstyled, caught rather than arranged. No
> people.

### 8. `story-mirror-family.webp` — 1200 × 1800 (2:3 portrait) — optional

> A photograph of a round black-framed mirror on a pale plaster wall,
> reflecting a soft, out-of-focus view through a doorway into a small sunlit
> kitchen. Nobody is in the reflection — only light on a worktop, the edge of a
> cupboard, a rug on the floor. The foreground wall fills most of the frame,
> with the edge of a wooden shelf at the bottom. Natural daylight, muted
> warm-grey palette, low contrast, fine film-like grain. Vertical portrait
> orientation. Quiet, observational, editorial. No people.

## If you want to go further

Every prompt above still depicts people, just unidentifiably. If you would
rather move further toward abstraction, the same scenes work as details:
hands in sand, two coffee cups on a windowsill, a folded swaddle on an unmade
bed, footprints at the tideline. That reads as more editorial and less stock,
sits closer to the existing shape system, and removes the question entirely.
`hands.webp`, one of the three originals we kept, is already exactly this.
