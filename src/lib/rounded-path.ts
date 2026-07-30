export type Point = [number, number];

/**
 * Build an SVG path for a closed polygon with rounded corners.
 *
 * CSS `clip-path: polygon()` can only produce sharp corners, and
 * `clip-path: path()` takes fixed pixel coordinates so it cannot flex with
 * its container. The story cards need diagonal-edged shapes whose corners are
 * rounded — including where a diagonal meets a straight edge — so the shapes
 * are drawn as SVG paths instead and scaled by the viewBox.
 *
 * The radius is clamped per-corner to half the shorter adjoining edge, so a
 * radius larger than a short edge degrades gracefully instead of inverting.
 */
export function roundedPolygon(points: Point[], radius: number): string {
  const n = points.length;
  if (n < 3) return "";

  const parts: string[] = [];

  for (let i = 0; i < n; i++) {
    const prev = points[(i - 1 + n) % n];
    const curr = points[i];
    const next = points[(i + 1) % n];

    const toPrev = vec(curr, prev);
    const toNext = vec(curr, next);
    const lenPrev = len(toPrev);
    const lenNext = len(toNext);
    if (lenPrev === 0 || lenNext === 0) continue;

    const r = Math.min(radius, lenPrev / 2, lenNext / 2);

    const start: Point = [
      curr[0] + (toPrev[0] / lenPrev) * r,
      curr[1] + (toPrev[1] / lenPrev) * r,
    ];
    const end: Point = [
      curr[0] + (toNext[0] / lenNext) * r,
      curr[1] + (toNext[1] / lenNext) * r,
    ];

    parts.push(
      i === 0 ? `M ${fmt(start)}` : `L ${fmt(start)}`,
      // Quadratic through the original vertex gives a clean fillet and, unlike
      // an arc, needs no sweep/large-arc bookkeeping per corner orientation.
      `Q ${fmt(curr)} ${fmt(end)}`,
    );
  }

  parts.push("Z");
  return parts.join(" ");
}

const vec = (a: Point, b: Point): Point => [b[0] - a[0], b[1] - a[1]];
const len = (v: Point) => Math.hypot(v[0], v[1]);
const fmt = (p: Point) => `${round(p[0])},${round(p[1])}`;
const round = (v: number) => Math.round(v * 100) / 100;
