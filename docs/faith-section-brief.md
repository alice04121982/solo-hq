# Faith & Culture section — pre-launch brief

The `/faith` section ships complete and buildable, but two things must be done by a
human before it goes public. Both are listed here with everything needed to close them.

---

## 1. The stories are examples, not contributors

The seven faith stories in `src/lib/stories.ts` (marked `theme: "faith"`) were written
to establish the shape, length and tone the section needs. **They are not accounts from
named, consenting people.**

This matters more here than anywhere else on the site. Attributing a religious position
to a named individual who never said it is the one mistake this section cannot survive —
it misrepresents both the person and their tradition, and it is exactly the kind of thing
a community will notice first.

Before launch, either:

- **Replace them** with real accounts, gathered with written consent, or
- **Remove them** and ship the section with the tradition cards and conversation toolkit
  only. The page holds up without the stories; it does not hold up with invented ones.

When gathering real stories:

| Field | Note |
| --- | --- |
| `name`, `age`, `location` | Offer pseudonymity as the default, not the exception. Many contributors will want it. |
| `tradition` | Use the contributor's own words for their tradition, not our category label. |
| `body` | Keep their phrasing. Light edits for length only. |
| `theme` | Set to `"faith"` so it appears on `/faith` and under the Stories filter. |

Get explicit consent covering: publication on the site, the specific wording, the photo
(if any), and the right to withdraw later. Confirm who else appears in the story —
partners and family members named in an account should agree too.

### Traditions still unrepresented

The current examples cover Islam, Judaism, Catholicism, Hinduism, Protestant/Anglican
Christianity (twice) and Sikhism. Nothing yet from Orthodox Christianity, Buddhism, or
interfaith and mixed-belief households — all of which have a tradition card but no story.
Converts and people who have left a tradition are also missing and are worth seeking out.

---

## 2. Imagery

The faith stories currently render a designed typographic panel
(`src/components/story-image.tsx`) instead of a photograph. This is deliberate: a stock
photo of someone with no connection to the account is worse than no photo, and reaching
for visual shorthand — a hijab, a kippah, a turban — to signal "religious person" is the
failure mode this section most needs to avoid.

The panel is a working fallback, not the intended finish. To add a real image, drop the
file into `public/photos/` and set `image` and `imageAlt` on the story. No other change
is needed; every surface (`/`, `/stories`, `/stories/[id]`, `/faith`) already handles
both states.

### Specification

| Property | Value |
| --- | --- |
| Format | `.webp`, matching the existing photos |
| Size | 1600px on the long edge, under ~200KB |
| Aspect | Shot or cropped to work at both 4:3 and 16:9 — cards and article heroes differ |
| Naming | `story-faith-<story-id>.webp`, e.g. `story-faith-aisha-yusuf.webp` |
| Licence | Commercial use with modification, no attribution required in-page. Record the licence and source for each file. |

### Direction

- **Prefer contributors' own photographs.** Ask when you gather the story. A real
  kitchen beats any stock library.
- Photograph people as people — at home, with family, in ordinary light. The rest of the
  site's photography is warm, candid and unposed; match it.
- Religious dress should appear where it is genuinely part of someone's life, and never
  as the subject of the picture.
- Hands, objects, doorways and backs of heads are legitimate choices where a contributor
  wants to be recognisable to nobody. Offer this before offering to drop the photo.
- Avoid: praying hands over a positive test, stock "sad woman by window", clasped hands
  lit like a pharmaceutical advert, and any image where the religion is the point rather
  than the person.

### Alt text

Describe what is in the frame, not what the person believes. `imageAlt` of
"A woman sitting at a kitchen table with her mother" is right; "A devout Muslim woman
considering IVF" is not.

---

## 3. Facts, sources and review

Every factual claim in `src/lib/faith.ts` links to a source that was checked when the
section was written. The editorial rules are documented at the top of that file and
apply to anything added later.

Recommended before launch:

- **Have each tradition card read by someone from inside that tradition** — ideally
  clergy or a community organisation, not a single individual's opinion. The goal is not
  approval, it is catching the sentence that is technically accurate and still reads as
  dismissive.
- **Re-check the linked sources annually.** Vatican documents will not move; charity
  websites and the HFEA's guidance pages do.
- **Watch the support directory.** Fertility Network UK was deliberately left out: the
  charity began a managed closure in 2026 and stopped taking new requests for direct
  support. Do not re-add it without checking current status. Re-verify the remaining
  entries (Chana, BICA, Donor Conception Network, HFEA) before launch.

## 4. Known gaps worth filling

- No dedicated UK Muslim or Catholic fertility support organisation is listed, because
  none could be verified. If one exists, it belongs in `FAITH_SUPPORT`.
- `FAITH_TRADITIONS` covers nine starting points. Bahá'í, Jain, Zoroastrian, Pagan and
  other traditions are absent. The page says so explicitly rather than pretending the
  list is complete — but the honest fix is to research and add them.
