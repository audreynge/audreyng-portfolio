import { ImageResponse } from "next/og"

export const size = {
  width: 180,
  height: 180,
}

export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(135deg, #7c3aed, #312e81)",
          color: "#f8fafc",
          display: "flex",
          fontSize: 72,
          fontWeight: 700,
          height: "100%",
          justifyContent: "center",
          letterSpacing: "-0.03em",
          width: "100%",
        }}
      >
        AN
      </div>
    ),
    {
      ...size,
    }
  )
}
