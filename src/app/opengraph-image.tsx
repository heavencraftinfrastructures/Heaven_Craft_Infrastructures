import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE_NAME } from "@/lib/seo";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = SITE_NAME;

export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), "public/media/brand/logo.png")
  );
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0b0d",
          backgroundImage:
            "radial-gradient(circle at 22% 20%, rgba(201,162,77,0.22), transparent 55%), radial-gradient(circle at 82% 78%, rgba(179,112,60,0.18), transparent 50%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 28,
            border: "1px solid rgba(201,162,77,0.35)",
            borderRadius: 24,
            display: "flex",
          }}
        />
        <img
          src={logoSrc}
          width={128}
          height={124}
          alt=""
          style={{ marginBottom: 28 }}
        />
        <div
          style={{
            fontSize: 30,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#e8c887",
            marginBottom: 18,
            display: "flex",
          }}
        >
          Heaven Craft
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#ece7db",
            textAlign: "center",
            maxWidth: 920,
            lineHeight: 1.15,
            display: "flex",
          }}
        >
          Civil Construction, Interiors &amp; Exteriors
        </div>
        <div
          style={{
            marginTop: 22,
            fontSize: 26,
            color: "#b9b3a6",
            display: "flex",
          }}
        >
          Hassan, Karnataka
        </div>
      </div>
    ),
    { ...size }
  );
}
