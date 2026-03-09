import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import AboutClient from "@/components/about/AboutClient";

export const metadata: Metadata = {
  title: "About",
  description: "AI 기반 마케팅 시스템을 설계하는 마케터, 장성윤의 프로필",
  alternates: { canonical: `${SITE.siteUrl}/about` },
  openGraph: {
    title: "About — The Underdogs",
    description: "AI Driven Marketing Operator. 자동화 시스템 설계자.",
    url: `${SITE.siteUrl}/about`,
    type: "website",
    images: [
      {
        url: `/api/og?title=About&subtitle=${encodeURIComponent("Operator Profile")}&category=ai-systems`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About — The Underdogs",
    description: "AI Driven Marketing Operator. 자동화 시스템 설계자.",
    images: [`/api/og?title=About&subtitle=${encodeURIComponent("Operator Profile")}&category=ai-systems`],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
