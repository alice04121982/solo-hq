# Photography audit — August 2026

Every image in `public/photos/` reviewed for model-rights risk, and the
replacement plan.

Four images were deleted outright during this audit, leaving 11. They were
referenced by nothing in `src/` — the homepage hero moved to the shape system,
and the others were left behind by earlier edits. Anything in `public/` is
served at its URL whether or not a page links to it, so an unused photograph
of an identifiable person is still published; deleting is the fix, not
ignoring. Removed: `hero-desktop.webp`, `hero-mobile.webp`,
`family-sunset.webp`, `story-hero.jpeg`.

## Why this audit exists

All 15 photos came from Unsplash under the standard Unsplash License. That
licence is not the problem: it permits commercial use, needs no attribution,
and is uniform across every free image, so there is no per-image copyright
question to answer.

What the Unsplash License does **not** grant is a model release. Unsplash
licenses the photographer's copyright only; the rights of the people depicted
are expressly not covered, and securing any needed permission is left to the
publisher.

On this site that gap matters more than it would elsewhere. Placing an
identifiable person beside content about IVF implies that person had fertility
treatment — a claim about their health nobody has the right to make on their
behalf. In UK terms it also risks publishing special category data (health)
about an identifiable individual with no lawful basis, which sits badly with a
site whose whole positioning is careful handling of exactly that data.

Four images compound this by implying a **second** special category:

- `story-two-mums`, `story-two-dads` — sexual orientation
- `story-faith-beach`, `family-beach` — religious belief (used in faith context)

Both sit alongside health under Article 9.

## Findings

### Safe to keep — no identifiable face (3)

| File | What it shows |
| --- | --- |
| `story-solo-mum.webp` | Mother and child from behind against sky; no faces visible |
| `family-coast.webp` | Three people from behind looking out to sea; no faces visible |
| `hands.webp` | Close-up of adult and child hands; faces out of frame |

These carry no model-rights exposure and are good images. Keep them.

### Borderline — low identifiability (1)

| File | What it shows |
| --- | --- |
| `story-mirror-family.webp` | Family reflected in a mirror at distance, faces angled down |

Defensible to keep, but replace if replacing anyway — the cost is low and the
argument disappears entirely.

### Replace — clearly identifiable faces (7)

| File | What it shows | Note |
| --- | --- | --- |
| `newborn.webp` | Couple holding newborn, faces close and clear | |
| `cta-family.webp` | Man kissing toddler, both faces very close | |
| `story-solo-dad.webp` | Man at window, face clear | |
| `story-two-mums.webp` | Two women, faces clear | Also implies sexual orientation |
| `story-two-dads.webp` | Two men, faces clear | Also implies sexual orientation |
| `story-faith-beach.webp` | Family on beach, faces visible, hijab | Also implies religion |
| `family-beach.webp` | Same family, faces clearer | Also implies religion |

### Provenance note

`story-hero.jpeg`, now deleted, was the only JPEG in an otherwise all-WebP set
and carried what looked like a UI overlay artifact at its right edge —
consistent with a screen capture rather than a download. If any copy of it
survives elsewhere, confirm it came from Unsplash at all before reusing it.

## Replacement approach

AI-generated images, matched to the existing look. No real person is depicted,
so model rights do not arise and the sensitive-use problem disappears.

Two things to decide before publishing them:

1. **Disclosure.** Transparency expectations for synthetic imagery are
   tightening (EU AI Act Art. 50 among others). A short line in the site
   footer or on `/about` — that photography is AI-generated and no real
   patients are depicted — costs nothing and pre-empts the question.
2. **Tone.** The site's positioning is honesty about what is real and what is
   illustrative; the stories are already labelled as composites. Synthetic
   photography should carry the same candour, for the same reason.

### House style for prompts

The existing set is consistent, and replacements should match it:

- Natural available light, often window light or backlight; no studio flash
- Documentary and unposed — mid-moment, subjects rarely facing the camera
- Muted, warm, slightly desaturated palette; soft contrast
- Shallow depth of field, real domestic interiors and British coastline
- Editorial rather than commercial; no stock-photo gloss or eye contact

Composition rule for the replacements: keep faces turned, obscured, distant or
out of frame wherever it does not cost the image anything. It matches the
existing safe images, it ages better, and it keeps the set coherent if any
image is later swapped for a real, consented photograph.
