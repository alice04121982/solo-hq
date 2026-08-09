import { ImageResponse } from "next/og";

export const alt =
  "Cairn Fertility. Compare IVF clinics on cost, success rates and eligibility.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* ImageResponse renders in an isolated runtime with no access to the app's
   CSS custom properties, so the brand token values are inlined here. Keep in
   sync with globals.css: --teal, --accent, --cream, --on-teal-muted. */
const TEAL = "#005353";
const LIME = "#C5E600";
const CREAM = "#FBF2EB";
const ON_TEAL_MUTED = "#c4a0ae";

function Stone({ width, color = CREAM }: { width: number; color?: string }) {
  return (
    <div
      style={{
        width,
        height: width * 0.42,
        borderRadius: width,
        background: color,
        marginTop: 6,
      }}
    />
  );
}

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: TEAL,
          padding: 80,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, color: CREAM }}>
            Cairn Fertility
          </div>
          <div
            style={{
              fontSize: 34,
              color: ON_TEAL_MUTED,
              marginTop: 28,
              maxWidth: 700,
              lineHeight: 1.4,
            }}
          >
            Compare IVF clinics on cost, success rates and eligibility. For
            solo mums, solo dads, two mums, two dads, and couples.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Stone width={70} color={LIME} />
          <Stone width={120} />
          <Stone width={170} />
          <Stone width={220} />
        </div>
      </div>
    ),
    { ...size }
  );
}
