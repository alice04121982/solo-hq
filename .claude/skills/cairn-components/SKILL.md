---
name: cairn-components
description: Use the Cairn app's existing component library (src/components) correctly when building or changing any screen. Consult this before adding UI to pick the right existing component (sections, cards, quotes, shapes, nav, finder parts) and its props, and to avoid building ad-hoc elements or one-off duplicates of components that already exist.
---

# Cairn Components

Every screen is assembled from the components in `src/components`. Build with
these rather than ad-hoc markup; if a pattern genuinely does not exist, add it
as a new component in the library, styled with the tokens from
`cairn-color-tokens`.

## Page structure

- **`Section`** — the full-bleed band every page is composed from. Props:
  `tone` (`"white" | "cream" | "teal"`), `band` (numeric alternation),
  `padding`, and optional `backdrop` shape decorations. Use it for every new
  page region; do not hand-roll `<section>` wrappers with their own padding.
- **`SiteNav`** — top navigation; `theme="dark"` on teal surfaces.
- **`SiteFooter`** — global footer, rendered once in the root layout. Do not
  add per-page footers.
- **`ArticleLayout`** — long-form article/story shell with byline support.

## Brand marks and imagery

- **`Logo`** — the wordmark; `onDark` for teal surfaces. Never retype the
  brand name in nav or footer contexts.
- **`shapes.tsx`** — the shape-mark system: `ShapeMark`, `FAMILY_SHAPES`
  (one mark per family pathway), `SHAPE_CYCLE`, plus `Cross` and `Spark`.
  Family pathways get shape marks, not stock photos; keep that rule.
- **`HeroShapeGrid`** — the homepage hero photo/shape grid showing every
  family type.

## Content cards and quotes

- **`QuoteCard`** — speech-bubble testimonial; `tone="teal" | "pink"`,
  optional avatar. Use for any community voice or pull quote.
- **`BentoCard`** — animated white card wrapper for embedding tools in a
  band (see the Solo Navigator on the solo-mum page).
- **`StatCard`**, **`stat-card`** patterns — stat tiles; check the homepage
  comparison band before inventing a new stat layout.
- **`CTASection`** — the pink join-the-community band; reuse rather than
  writing new end-of-page CTAs.
- **`InfoTooltip`**, **`CopyButton`**, **`ShareButtons`** — utilities;
  check here before adding another tooltip or copy control.

## Family pathway pages (`src/components/family/`)

`FamilyHero`, `ProcessSteps`, `PersonalStories`, `ResourcesSection`,
`NewsletterSection`, `ClinicSection` — all driven by the `FamilyType` data in
`src/lib/family-types.ts`. To change pathway pages, edit the data, not the
components; to add a pathway, add a `FAMILY_TYPES` entry and assign it a
shape in `FAMILY_SHAPES`.

## Clinic finder (`src/components/ivf-finder/`)

`ClinicFinder` orchestrates the finder page: `ClinicToolbar` (search +
active filter chips), `FilterPanel` (slide-over), `ClinicResults` +
`ClinicCard`, `ComparisonBar` (floating tray, max 4), `ComparisonTable`,
`DisclaimerBanner`. Data shapes live in `src/types/clinic.ts`; seed data in
`src/lib/clinic-seed-data.ts`. Note the TODO on `soloFriendly` before
extending eligibility-related UI.

- **`ClinicMatcher`** — the five-question wizard on `/get-started`, already
  pathway-aware for all five family types; extend its step data rather than
  forking it.

## Content libraries (`src/lib/`)

Copy-heavy content lives in data files, not components: `guides.ts`,
`stories.ts`, `family-types.ts`, `quotes.ts`. Edit copy there so every
consumer updates together.

## Currently unused components

`TestimonialsSection`, `CostCalculator`, `ClinicComparison`, `JourneyMap`
(used only on the solo-mum page) are partially or fully unimported. Check
whether one of these already does the job before building something new, and
prefer reviving them over duplicating them.

## Self-check before adding UI

1. Does a component in this inventory already do this? Use or extend it.
2. Is page structure built from `Section` bands with tones, not bespoke
   wrappers?
3. Is copy in the right `src/lib` data file rather than hardcoded in JSX?
4. Are all colours tokens per `cairn-color-tokens`?
