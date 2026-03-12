import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Press_Start_2P } from "next/font/google";
import Script from "next/script";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GlowOrbs from "@/components/layout/GlowOrbs";
import SearchModal from "@/components/ui/SearchModal";
import TerminalEgg from "@/components/ui/TerminalEgg";
import { SITE } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  variable: "--font-pixel",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F1115",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.siteUrl),
  title: {
    default: SITE.title,
    template: "%s — The Underdogs",
  },
  description: SITE.description,
  keywords: ["AI 마케팅", "마케팅 자동화", "AI 에이전트", "마케팅 시스템", "The Underdogs"],
  authors: [{ name: SITE.author }],
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.siteUrl,
    siteName: SITE.name,
    title: "The Underdogs",
    description: SITE.description,
    images: [
      {
        url: `/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "The Underdogs — AI Driven Marketing Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Underdogs",
    description: SITE.description,
    images: [`/og-image.jpg`],
  },
  alternates: {
    canonical: SITE.siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  other: {
    "naver-site-verification": "0e991d75a194829ad008c2c994c62885efbe5618",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${pressStart2P.variable} antialiased`}
      >
        <JsonLd data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": `${SITE.siteUrl}/#website`,
              "name": SITE.name,
              "url": SITE.siteUrl,
              "description": SITE.description,
              "publisher": { "@id": `${SITE.siteUrl}/#organization` },
            },
            {
              "@type": "Organization",
              "@id": `${SITE.siteUrl}/#organization`,
              "name": SITE.name,
              "url": SITE.siteUrl,
              "description": SITE.description,
              "founder": { "@id": `${SITE.siteUrl}/#person` },
            },
            {
              "@type": "Person",
              "@id": `${SITE.siteUrl}/#person`,
              "name": SITE.author,
              "jobTitle": "AI Driven Marketing Operator",
              "url": `${SITE.siteUrl}/about`,
              "sameAs": [
                "https://github.com/rorynana",
              ],
            },
          ],
        }} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[999] focus:rounded focus:bg-[#5B8CFF] focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <GlowOrbs />
        <Header />
        <main id="main-content" className="pt-16">{children}</main>
        <Footer />
        <SearchModal />
        <TerminalEgg />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7ZV3HELHQV"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7ZV3HELHQV');
          `}
        </Script>
        {process.env.NEXT_PUBLIC_KAKAO_JS_KEY && (
          <Script
            src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
            strategy="lazyOnload"
          />
        )}
      </body>
    </html>
  );
}
