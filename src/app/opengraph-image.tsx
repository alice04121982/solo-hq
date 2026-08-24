import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "CairnFertility. Compare IVF clinics on cost, success rates and eligibility.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* ImageResponse renders in an isolated runtime with no access to the app's
   CSS custom properties, so the brand token values are inlined here. Keep in
   sync with globals.css: --teal, --accent, --cream, --on-teal-muted. */
const TEAL = "#005353";
const LIME = "#C5E600";
const CREAM = "#FBF2EB";
const ON_TEAL_MUTED = "#c4a0ae";

/* dx nudges each stone off the stack's axis — the Waypath mark's
   hand-placed settle — while the lime waypoint dot stays centred. */
function Stone({ width, dx = 0 }: { width: number; dx?: number }) {
  return (
    <div
      style={{
        width,
        height: width * 0.4,
        borderRadius: width,
        background: CREAM,
        marginTop: 8,
        marginLeft: dx,
      }}
    />
  );
}

export default async function OpenGraphImage() {
  /* satori reads neither woff2 nor variable fonts, so the brand face is
     shipped as static TTF instances cut from the variable file. */
  const [regular, semibold] = await Promise.all([
    readFile(join(process.cwd(), "src/app/fonts/GeneralSans-Regular.ttf")),
    readFile(join(process.cwd(), "src/app/fonts/GeneralSans-Semibold.ttf")),
  ]);
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
          fontFamily: '"General Sans"',
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Two-tone wordmark, matching the site logo lockup */}
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            <span style={{ color: CREAM }}>Cairn</span>
            <span style={{ color: LIME }}>Fertility</span>
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
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 34,
              background: LIME,
            }}
          />
          <Stone width={90} dx={16} />
          <Stone width={140} dx={-18} />
          <Stone width={180} dx={14} />
          <Stone width={220} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "General Sans", data: regular, style: "normal", weight: 400 },
        { name: "General Sans", data: semibold, style: "normal", weight: 600 },
      ],
    }
  );
}
