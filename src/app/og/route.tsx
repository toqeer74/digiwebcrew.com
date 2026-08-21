import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const revalidate = 86400;

const BRAND = "#114B97";
const INK = "#1A1F38";

/**
 * Generates the social preview image.
 *
 * The site previously pointed every og:image at /og-image.png, which did not
 * exist — the [locale] route matched it and returned an HTML page with a 200,
 * so shared links had no preview at all. This renders a real 1200x630 PNG and
 * takes the page title so each URL gets its own card.
 *
 * No web fonts here on purpose: fetching Google Fonts at render time makes this
 * fail whenever the network is unavailable, which is how the original broke.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawTitle = searchParams.get("title")?.slice(0, 120);
  const title = rawTitle || "Custom Software & AI Automation";
  const kicker = searchParams.get("kicker")?.slice(0, 60) || "Digi Web Crew";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFFFFF",
          padding: "72px",
          position: "relative",
        }}
      >
        {/* Brand wash */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "10px",
            background: BRAND,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-160px",
            right: "-160px",
            width: "620px",
            height: "620px",
            borderRadius: "50%",
            background: "rgba(17,75,151,0.08)",
            display: "flex",
          }}
        />

        {/* Kicker */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: BRAND,
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: BRAND,
              display: "flex",
            }}
          >
            {kicker}
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 70 ? 62 : 78,
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: INK,
            display: "flex",
            maxWidth: "1000px",
          }}
        >
          {title}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #E6E8EE",
            paddingTop: "28px",
          }}
        >
          <div style={{ fontSize: 28, color: "#5B6478", display: "flex" }}>
            digiwebcrew.com
          </div>
          <div style={{ fontSize: 26, color: "#5B6478", display: "flex" }}>
            Custom software · AI automation · Growth
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
