# Stock imagery: iStock shortlist, licence record and gaps

Cairn's family and story photography lives in `public/photos/` and is already
in place. This purchase adds the **clinical side** — labs, embryology,
medication, consultations — which the site currently has no imagery for.
Per the practice in `docs/faith-section-brief.md`, this file is the licence
record: every stock asset on the site should have a row here.

## How to buy

- Plan: **iStock Premium + Video, one month** (~$99 / ~£75). It must be the
  **monthly (no-commitment) billing option** — the cheaper "annual, billed
  monthly" plan cannot be cancelled mid-term. Switch off auto-renew
  immediately after subscribing.
- The plan includes 25 downloads covering Essentials and Signature photos
  and video. The shortlist below uses ~14, leaving ~11 for the gap searches.
- Licence: iStock standard royalty-free. Perpetual — cancelling the
  subscription does not revoke it — **provided each file is used in a
  project within 30 days of the subscription ending.** Getting the files
  into this repo counts. Do not stockpile unused downloads.
- Before downloading any asset, check it is **not** labelled
  "Editorial use only" — that label bars commercial use and disqualifies it.
- Download photos at a web-appropriate size (the largest is unnecessary);
  videos at 1080p, not 4K.

## Shortlist — chosen from the collaboration board

| iStock ID | Subject | Page | Intended home | Model disclaimer |
|---|---|---|---|---|
| 1333406906 | Liquid nitrogen cryogenic tank | [link](https://www.istockphoto.com/photo/liquid-nitrogen-cryogenic-tank-at-life-sciences-laboratory-gm1333406906-415921214) | Egg/embryo freezing & storage content | No |
| 1292821427 | Microscopic research of IVF | [link](https://www.istockphoto.com/detail/1292821427) | /how-ivf-works | No |
| 2258278158 | ICSI procedure, micro-manipulator | [link](https://www.istockphoto.com/detail/2258278158) | ICSI guide | No |
| 653378396 | 3D render of ICSI | [link](https://www.istockphoto.com/detail/653378396) | Explainer contexts | No |
| 2148393424 | Doctor with syringe and vial | [link](https://www.istockphoto.com/detail/2148393424) | Medication/protocol guides | Low risk — covered by footer line |
| 2188207933 | Woman self-injecting IVF medication | [link](https://www.istockphoto.com/detail/2188207933) | Stimulation-phase content; reads as Solo Mum | **Yes** |
| 1394005050 | Gynaecologist consultation | [link](https://www.istockphoto.com/detail/1394005050) | Clinic finder / choosing-a-clinic content | **Yes** |
| 2248620975 | Prenatal exam, Black couple | [link](https://www.istockphoto.com/detail/2248620975) | Mum and Dad pathway contexts | **Yes** |
| 1490754501 | Couple holding pregnancy test | [link](https://www.istockphoto.com/detail/1490754501) | Two Mums pathway contexts | **Yes** |
| 2241669320 | Couple holding sonogram | [link](https://www.istockphoto.com/detail/2241669320) | Journey-end/outcome contexts | **Yes** |
| 2155474695 | **VIDEO** — embryologist performing ICSI | [link](https://www.istockphoto.com/detail/2155474695) | /how-ivf-works ambient clip | No |
| 2243995575 | **VIDEO** — scientist at microscope, sperm lab | [link](https://www.istockphoto.com/detail/2243995575) | Secondary/b-roll clip | No |

### Check on sight before downloading

| iStock ID | Note |
|---|---|
| 2148544826 | "In vitro fertilization or IVF" — keep only if it is not another needle-and-egg microscope shot |
| 1401551018 | "In vitro fertilisation concept" — same test |
| 1171693374 | Title unknown — keep only if it fills a slot nothing above covers |
| 1131579777 | Title unknown — same test |
| 2225472852 | Title unknown — same test |

Dropped from the board (do not download): nine near-identical
needle-and-egg shots (1152441076, 2249622781, 1185877424, 1152441056,
2283581709, 2283555265, 2177969613, 1321816085, 1450340737), the same-shoot
prenatal frames (2248620837, 2248620763), the off-topic abdominal ultrasound
(2217869519), duplicates of existing site photos (1212366702 baby hand,
973216342 holding hands), 1409422576 (superseded by 2188207933), 1366837786
(superseded by 2241669320), and 2177969532 (likely same lab shoot as
2177969613).

## Gaps — searches still to run on iStock

Journey steps and family types with no coverage in the shortlist:

1. **Egg collection** — a journey step with no image. Try: *egg retrieval
   procedure*, *oocyte retrieval*.
2. **Embryo transfer** — likewise (it is not the same procedure as ICSI).
   Try: *embryo transfer procedure*, *embryo transfer catheter ultrasound*.
3. **Two Dads / Solo Dads** — no men-as-parents imagery anywhere on the
   board; surrogacy is the planned next section. Try: *two dads newborn*,
   *gay couple baby surrogacy*, *single father newborn*, *male couple
   clinic consultation*.
4. **Donor conception** — donor selection is a step in almost every
   pathway. Try: *sperm donor selection*, *fertility clinic consultation
   paperwork*.
5. **Age diversity** — most fertility stock skews young; one shot of a
   patient plausibly over 40 would better reflect the audience. Try:
   *woman 40s fertility clinic*.

## After downloading

- Photos go in `public/photos/clinical/`, videos in `public/video/`, named
  `istock-<id>-<short-slug>.<ext>` so the licence trail survives renames.
- Convert photos to WebP like the rest of `public/photos/`.
- Compress videos (strip audio, cap at 1280px wide) and extract a poster:

  ```bash
  ffmpeg -i in.mp4 -an -vf scale=1280:-2 -c:v libx264 -crf 28 -preset slow -movflags +faststart out.mp4
  ffmpeg -i in.mp4 -an -vf scale=1280:-2 -c:v libvpx-vp9 -crf 40 -b:v 0 out.webm
  ffmpeg -i in.mp4 -vf "scale=1280:-2" -frames:v 1 poster.webp
  ```

- Render clips with `AmbientVideo` (`src/components/ambient-video.tsx`),
  which handles autoplay, looping and the reduced-motion poster fallback.
- Add a row to the shortlist table for every gap-search asset you download,
  and record each asset's collection tier (Essentials/Signature) and
  download date when known.

## Sensitive-use disclaimer

iStock's licence requires that content featuring models, used in connection
with sensitive subjects (fertility treatment qualifies), is marked as
illustrative and posed. Rather than captioning each image, add one line to
the site footer once these images ship:

> Photographs are stock images posed by models, shown for illustrative
> purposes only.

The "Model disclaimer: Yes" rows above are the images this line exists for.
