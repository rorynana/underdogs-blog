"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { NAV_ITEMS } from "@/lib/constants";
import PixelLogo from "@/components/ui/PixelLogo";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ESC 닫기 + body scroll lock
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#0A0B0F]/90 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        {scrolled && <div className="gradient-line" />}
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-2 transition-colors hover:text-accent"
            aria-label="The Underdogs"
          >
            <PixelLogo />
            <span
              className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse"
              style={{ boxShadow: "0 0 6px #06B6D4" }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative font-mono text-sm tracking-[0.1em] uppercase transition-colors ${
                  pathname.startsWith(item.href)
                    ? "text-accent"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {item.label}
                {pathname.startsWith(item.href) && (
                  <span className="absolute -bottom-1 left-0 h-px w-full bg-accent" />
                )}
              </Link>
            ))}
          </nav>

          {/* 검색 버튼 (Cmd+K) */}
          <button
            className="hidden md:flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-white/40 transition-all hover:border-accent/30 hover:text-white/70"
            onClick={() => {
              window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }));
            }}
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Search</span>
            <kbd className="rounded border border-white/10 px-1 py-0.5 text-[9px] text-white/25">⌘K</kbd>
          </button>

          {/* Mobile: 터미널 트리거 버튼 */}
          <button
            className="md:hidden font-mono text-xs tracking-[0.15em] text-white/60 hover:text-accent transition-colors"
            onClick={() => setMobileOpen(true)}
          >
            <span aria-hidden="true">{">_"}</span>
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </header>

      {/* 풀스크린 터미널 오버레이 */}
      <div
        className={`fixed inset-0 z-[200] bg-[#0A0B0F] transition-all duration-500 md:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* CRT 스캔라인 텍스처 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.018) 2px, rgba(255,255,255,0.018) 4px)",
          }}
        />

        {/* 상단 상태 바 */}
        <div className="relative flex items-center justify-between border-b border-white/10 px-6 py-5">
          <span className="font-mono text-xs tracking-[0.2em] text-white/25">
            // NAVIGATION.SYS
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            className="font-mono text-xs tracking-[0.15em] text-white/40 transition-colors hover:text-accent"
          >
            <span aria-hidden="true">[ ESC ]</span>
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        {/* 메뉴 항목 */}
        <nav className="relative flex h-[calc(100%-61px)] flex-col justify-center gap-0 px-8">
          {NAV_ITEMS.map((item, i) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`group flex items-center gap-5 border-b border-white/5 py-6 transition-all duration-300 ${
                  mobileOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-6 opacity-0"
                } ${isActive ? "text-accent" : "text-white/50 hover:text-white"}`}
                style={{
                  transitionDelay: mobileOpen ? `${i * 70 + 150}ms` : "0ms",
                }}
              >
                {/* 번호 */}
                <span className="font-mono text-xs text-white/20 group-hover:text-accent/60 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* 레이블 */}
                <span className="font-mono text-2xl tracking-[0.12em] uppercase">
                  {item.label.replace(/ /g, "_")}
                </span>

                {/* 현재 페이지 표시 */}
                {isActive && (
                  <span className="ml-auto font-mono text-xs text-accent">
                    ●
                  </span>
                )}
              </Link>
            );
          })}

          {/* 하단 힌트 */}
          <p
            className={`mt-8 font-mono text-xs tracking-[0.2em] text-white/15 transition-all duration-300 ${
              mobileOpen ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: mobileOpen ? "500ms" : "0ms" }}
          >
            // PRESS ESC TO EXIT
          </p>
        </nav>
      </div>
    </>
  );
}
