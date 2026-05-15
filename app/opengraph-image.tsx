import { ImageResponse } from "next/og";

export const alt = "HEBREW — Vietnamese streetwear";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#1c0a0a",
          padding: 48,
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#f0ece8",
            fontSize: 128,
            fontWeight: 700,
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            paddingLeft: "0.42em",
            fontFamily:
              "ui-serif, Georgia, Cambria, Times New Roman, Times, serif",
          }}
        >
          Hebrew
        </div>
        <div
          style={{
            marginTop: 36,
            width: 420,
            height: 8,
            background: "#8b1a1a",
          }}
        />
        <div
          style={{
            marginTop: 48,
            fontSize: 30,
            color: "#b8aea4",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
          }}
        >
          Streetwear · Vietnam
        </div>
      </div>
    ),
    { ...size },
  );
}
