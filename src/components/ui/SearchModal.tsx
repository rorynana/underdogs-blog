"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/content";

const CATEGORY_LABEL: Record<string, string> = {
  "ai-systems": "AI Driven",
  "marketing":  "Digital Marketing",
  "insights":   "Field Notes",
};

const CATEGORY_COLOR: Record<string, string> = {
  "ai-systems": "#5B8CFF",
  "marketing":  "#F59E0B",
  "insights":   "#34D399",
};

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // 포스트 로드
  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch("/api/search")
      .then((r) => r.json())
      .then((data) => { setPosts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [open]);

  // 전역 단축키 Cmd+K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // 오픈 시 인풋 포커스 + 쿼리 초기화
  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const results = query.trim()
    ? posts.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (CATEGORY_LABEL[p.category] ?? "").toLowerCase().includes(q)
        );
      })
    : posts.slice(0, 6);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-start justify-center pt-[12vh] px-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0A0B0F] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 검색 인풋 */}
        <div className="flex items-center gap-3 border-b border-white/5 px-4 py-3.5">
          <svg className="h-4 w-4 shrink-0 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="포스트 검색..."
            className="flex-1 bg-transparent font-mono text-sm text-white outline-none placeholder:text-white/25"
          />
          <kbd className="hidden rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-white/25 sm:block">
            ESC
          </kbd>
        </div>

        {/* 결과 */}
        <div className="max-h-[55vh] overflow-y-auto py-1">
          {loading ? (
            <p className="px-4 py-6 text-center font-mono text-xs text-white/25">loading...</p>
          ) : results.length === 0 ? (
            <p className="px-4 py-6 text-center font-mono text-xs text-white/25">결과 없음</p>
          ) : (
            results.map((post) => {
              const color = CATEGORY_COLOR[post.category] ?? "#5B8CFF";
              return (
                <Link
                  key={post.slug}
                  href={`/${post.category}/${post.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/5"
                >
                  <span
                    className="shrink-0 rounded border px-1.5 py-0.5 font-mono text-[9px] tracking-wider"
                    style={{ borderColor: color + "55", color }}
                  >
                    {CATEGORY_LABEL[post.category] ?? post.category}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">{post.title}</p>
                    <p className="truncate text-xs text-white/40">{post.description}</p>
                  </div>
                  <span className="shrink-0 font-mono text-xs text-white/20">
                    {post.date.slice(0, 7)}
                  </span>
                </Link>
              );
            })
          )}
          <div ref={bottomRef} />
        </div>

        {/* 하단 힌트 */}
        <div className="flex items-center gap-4 border-t border-white/5 px-4 py-2.5">
          <span className="font-mono text-[10px] text-white/20">
            <kbd className="mr-1 rounded border border-white/10 px-1 py-0.5">↵</kbd>선택
          </span>
          <span className="font-mono text-[10px] text-white/20">
            <kbd className="mr-1 rounded border border-white/10 px-1 py-0.5">ESC</kbd>닫기
          </span>
          <span className="ml-auto font-mono text-[10px] text-white/15">
            {results.length} results
          </span>
        </div>
      </div>
    </div>
  );
}
