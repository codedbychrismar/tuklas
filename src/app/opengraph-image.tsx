import { ImageResponse } from "next/og";
import { siteConfig } from "./seo";

export const alt = `${siteConfig.name} - Discover the Philippines`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background:
            "linear-gradient(135deg, #1B4E45 0%, #1E7B68 52%, #F0E8D2 100%)",
          color: "white",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            maxWidth: "920px",
          }}
        >
          <div
            style={{
              color: "#F0E8D2",
              fontSize: "34px",
              fontWeight: 600,
              letterSpacing: "6px",
              textTransform: "uppercase",
            }}
          >
            Tuklas Travel & Tour
          </div>
          <div
            style={{
              fontSize: "88px",
              fontWeight: 800,
              lineHeight: 1,
            }}
          >
            Discover the Hidden Wonders of the Philippines
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.82)",
              fontSize: "32px",
              lineHeight: 1.35,
              maxWidth: "780px",
            }}
          >
            Island hopping, beach escapes, guided tours, and custom itineraries.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
