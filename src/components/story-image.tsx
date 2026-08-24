import Image from "next/image";
import { ImagePlaceholder } from "./image-placeholder";

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

  return <ImagePlaceholder label={label} />;
}
