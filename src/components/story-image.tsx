import Image from "next/image";

interface StoryImageProps {
  src?: string;
  alt?: string;
  /** Shown on the fallback panel when there is no photograph yet. */
  label: string;
  sizes?: string;
  className?: string;
}

/**
 * A story's photograph, or a designed panel where one does not exist yet.
 *
 * The fallback is deliberate rather than a placeholder to be tolerated: for
 * the faith stories in particular it is better to show a typographic panel
 * than to reach for a stock photograph of someone who has no connection to
 * the account being told. Drop a licensed image into `public/photos/` and set
 * `image` on the story to replace it — no other change is needed.
 */
export function StoryImage({ src, alt, label, sizes, className = "" }: StoryImageProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt ?? ""}
        fill
        sizes={sizes}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className="absolute inset-0 flex items-end p-5"
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
      <p
        className="text-[13px] font-[600] uppercase tracking-[0.14em] font-sans"
        style={{ color: "rgba(0, 83, 83, 0.55)" }}
      >
        {label}
      </p>
    </div>
  );
}
