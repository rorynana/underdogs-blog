"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { PostMeta } from "@/lib/content";

const CATEGORY_ABBR: Record<string, string> = {
  marketing: "MKT",
  "ai-systems": "AI",
  insights: "INS",
};

const CATEGORY_KEY: Record<string, string> = {
  marketing: "marketing",
  "ai-systems": "ai",
  insights: "insights",
};

const CORNER_COLOR: Record<string, string> = {
  marketing: "#5B8CFF",
  "ai-systems": "#8B5CF6",
  insights: "#06B6D4",
};

export default function FeaturedPicks({ posts }: { posts: PostMeta[] }) {
  const ref = useScrollAnimation();

  if (posts.length === 0) return null;

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-6 pt-6 sm:pt-10 pb-0">
      <div className="animate-on-scroll">
        <span className="section-label">Featured</span>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Editor&apos;s Picks</h2>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => {
          const catKey = CATEGORY_KEY[post.category] || "marketing";
          const cornerColor = CORNER_COLOR[post.category] || "#5B8CFF";
          return (
            <Link
              key={post.slug}
              href={`/${post.category}/${post.slug}`}
              className={`animate-on-scroll stagger-${i + 1} neon-card-${catKey} group relative flex flex-col overflow-hidden rounded-2xl border bg-surface/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 ${
                i === 0 ? "sm:col-span-2 sm:row-span-1" : ""
              }`}
            >
              {/* 상단 카테고리 컬러 라인 */}
              <div className={`h-[2px] w-full accent-line-${catKey}`} />

              {/* 사이버 코너 마킹 */}
              <span className="cyber-corner cyber-corner-tl" style={{borderColor: cornerColor}} />
              <span className="cyber-corner cyber-corner-tr" style={{borderColor: cornerColor}} />
              <span className="cyber-corner cyber-corner-bl" style={{borderColor: cornerColor}} />
              <span className="cyber-corner cyber-corner-br" style={{borderColor: cornerColor}} />

              {post.thumbnail && (
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    priority={i < 2}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes={i === 0 ? "(max-width: 640px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"}
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col justify-between p-5 sm:p-8">
                <div>
                  <div className="flex items-center gap-3">
                    <span className={`neon-badge-${catKey} rounded-full px-3 py-1 font-mono text-[11px] tracking-wider`}>
                      {CATEGORY_ABBR[post.category] || post.category.toUpperCase()}
                    </span>
                    <span className="font-mono text-xs text-secondary">{post.date}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold leading-snug transition-colors group-hover:text-white sm:text-2xl">
                    {post.title}
                  </h3>
                  {post.subtitle ? (
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-secondary/70 line-clamp-2">
                      {post.subtitle}
                    </p>
                  ) : (
                    <p className="mt-3 text-sm leading-relaxed text-secondary line-clamp-3">
                      {post.description}
                    </p>
                  )}
                </div>
                <div className="mt-6 flex items-center gap-1 text-sm text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  <span>Read</span>
                  <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
