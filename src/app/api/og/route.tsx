import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const CATEGORY_LABEL: Record<string, string> = {
  marketing: "MARKETING",
  "ai-systems": "AI & SYSTEMS",
  insights: "INSIGHTS",
};

const CATEGORY_COLOR: Record<string, string> = {
  marketing: "#5B8CFF",
  "ai-systems": "#5B8CFF",
  insights: "#5B8CFF",
};

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title") || "The Underdogs";
  const subtitle = searchParams.get("subtitle") || "";
  const category = searchParams.get("category") || "marketing";

  const accentColor = CATEGORY_COLOR[category] || "#5B8CFF";
  const categoryLabel = CATEGORY_LABEL[category] || category.toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0F1115",
          padding: "60px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: Category badge */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: `${accentColor}18`,
              borderRadius: "999px",
              padding: "8px 20px",
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              color: accentColor,
            }}
          >
            {categoryLabel}
          </div>
        </div>

        {/* Middle: Title + Subtitle */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: subtitle ? "16px" : "0",
          }}
        >
          <div
            style={{
              fontSize: title.length > 15 ? "52px" : "64px",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: "28px",
                fontWeight: 400,
                color: "#8A8F98",
                lineHeight: 1.4,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        {/* Bottom: Branding + Accent line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                backgroundColor: accentColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                fontWeight: 800,
                color: "#0F1115",
              }}
            >
              U
            </div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#8A8F98",
                letterSpacing: "0.05em",
              }}
            >
              The Underdogs
            </div>
          </div>
          <div
            style={{
              width: "120px",
              height: "3px",
              backgroundColor: accentColor,
              borderRadius: "2px",
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
