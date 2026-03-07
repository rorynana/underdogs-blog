import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GlowOrbs from "@/components/layout/GlowOrbs";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Underdogs — AI Driven Marketing Systems",
  description: "Building intelligent marketing systems that automate decisions, not just tasks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <GlowOrbs />
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
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
