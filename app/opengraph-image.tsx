import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const alt = `${site.name} · ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Dynamic Open Graph image — on-brand dark canvas with teal accent.
 * Replace with a static /public og asset later if a bespoke one is provided.
 */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0C0D",
          padding: "72px",
          fontFamily: "sans-serif",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#2DD4BF",
            }}
          />
          <div
            style={{
              color: "#969A9E",
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            {site.role}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#EDEDEA",
              fontSize: 104,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: -2,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              marginTop: 28,
              color: "#2DD4BF",
              fontSize: 40,
              fontWeight: 600,
            }}
          >
            Building at the frontier of AI.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#5C6065",
            fontSize: 24,
            letterSpacing: 2,
          }}
        >
          <span>{site.url.replace("https://", "")}</span>
          <span>Singapore</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
