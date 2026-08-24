/**
 * The panel shown where a photograph has not been cleared for use yet.
 *
 * This is a designed absence, not a broken image. The site's photography was
 * withdrawn because free-stock licences cover the photographer's copyright but
 * not the rights of the people depicted, and an identifiable face beside
 * fertility content implies something about that person's health (see
 * docs/image-audit.md). Until replacements arrive, a quiet panel is the honest
 * thing to show — better than a stock photograph of someone with no connection
 * to the account being told.
 *
 * To replace one: drop the file into `public/photos/` and set `image` back on
 * the story, family type, or grid cell. Nothing else needs changing.
 */
export function ImagePlaceholder({
  label,
  className = "",
}: {
  /** Short caption, e.g. the story's tag. Omit for purely decorative slots. */
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`absolute inset-0 flex items-end p-5 ${className}`}
      style={{
        background:
          "linear-gradient(135deg, var(--cream) 0%, #F6E7DC 55%, var(--lavender-light) 100%)",
      }}
      aria-hidden
    >
      {/* A quiet mark rather than an illustration of a person — we are not
          guessing what anyone in these stories looks like. */}
      <svg
        viewBox="0 0 120 120"
        className="absolute right-4 top-4 h-16 w-16"
        fill="none"
        aria-hidden
      >
        <circle cx="60" cy="60" r="44" stroke="var(--teal)" strokeOpacity="0.18" strokeWidth="1.5" />
        <circle cx="60" cy="60" r="28" stroke="var(--teal)" strokeOpacity="0.28" strokeWidth="1.5" />
        <circle cx="60" cy="60" r="10" fill="var(--teal)" fillOpacity="0.16" />
      </svg>
      {label && (
        <p
          className="text-[13px] font-[600] uppercase tracking-[0.14em] font-sans"
          style={{ color: "rgba(0, 83, 83, 0.55)" }}
        >
          {label}
        </p>
      )}
    </div>
  );
}
