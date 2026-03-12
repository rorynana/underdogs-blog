import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  compress: true,
  async redirects() {
    return [
      // 구 블로그 마케팅 포스트 → 현재 마케팅 카테고리로 301 redirect
      { source: "/mkt-regex/", destination: "/marketing", permanent: true },
      { source: "/mkt-mbtitest-1/", destination: "/marketing", permanent: true },
      { source: "/mkt-facebook-abo-cbo-1/", destination: "/marketing", permanent: true },
      // 구 블로그 기타 포스트 → 홈으로
      { source: "/stainless-cookware-1/", destination: "/", permanent: true },
      { source: "/stainless-cookware-3/", destination: "/", permanent: true },
      // 구 카테고리 페이지 → 홈으로
      { source: "/category/:path*/", destination: "/", permanent: true },
      { source: "/category/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
