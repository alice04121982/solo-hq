/**
 * Colour treatments for the clinic finder's cards.
 *
 * Two surfaces are defined here so they can be compared on the real page
 * with real data, rather than in a mockup:
 *
 *   paper    white fill, warm hairline edge. The quietest option, the data
 *            is the only colour on the card.
 *   outline  no fill at all: the cream band shows through a teal hairline.
 *            The most editorial, and the lightest on the page.
 *   cream    cream fill, no edge. For a card that sits on a white surface
 *            (the clinic matcher's results panel), where paper would vanish
 *            and the token rules put a cream fill on white. Not selectable
 *            on the finder, whose band is already cream.
 *   teal     dark-green fill with the on-teal inks, held as the resting
 *            state with no hover: the clinic matcher's result cards, where
 *            the card is not a control and the way in is its button.
 *
 * A pale-yellow fill was tried and dropped: yellow cards on the pink band
 * clash, so the citrus surface is deliberately not an option here. The badge
 * keeps the yellow; the card does not.
 *
 * Both drop the grey border entirely (grey on the cream band goes muddy) and
 * share the same dark-green hover.
 *
 * The finder ships on `teal`, the same fill as the matcher, with white
 * controls and inks that pass AA at 12px. `?cards=paper|outline` on the
 * finder overrides it, so the light options can still be compared without a
 * rebuild.
|outline` on the finder
 * overrides it, so the two can be flipped between without a rebuild.
 */
export type ClinicCardVariant = "paper" | "outline" | "cream" | "teal";

/** The light options the finder can be flipped to for comparison; `cream` is for the matcher. */
export const CLINIC_CARD_VARIANTS: ClinicCardVariant[] = ["paper", "outline"];

/** The results grid ships on the dark-green fill (owner decision, 2026-09-14). */
export const DEFAULT_RESULT_VARIANT: ClinicCardVariant = "teal";

/** The URL parameter that overrides the grid. */
export const CARD_VARIANT_PARAM = "cards";

export function parseCardVariant(raw: string | null): ClinicCardVariant | null {
  return CLINIC_CARD_VARIANTS.includes(raw as ClinicCardVariant)
    ? (raw as ClinicCardVariant)
    : null;
}

const VARIANT_CLASS: Record<ClinicCardVariant, string> = {
  paper: "",
  outline: "clinic-card--outline",
  cream: "clinic-card--cream",
  teal: "clinic-card--teal",
};

/**
 * The class list for a card surface. The colours themselves live on
 * `.clinic-card` in globals.css as custom properties, which is what lets the
 * hover state re-tint the whole card, badges and buttons included, from a
 * single rule.
 */
export function clinicCardClasses(variant: ClinicCardVariant, isSelected: boolean): string {
  return [
    "clinic-card",
    VARIANT_CLASS[variant],
    isSelected && "clinic-card--selected",
    "rounded-[24px] p-6 flex flex-col",
  ]
    .filter(Boolean)
    .join(" ");
}
