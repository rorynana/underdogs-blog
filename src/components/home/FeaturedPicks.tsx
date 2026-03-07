"use client";

import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { PostMeta } from "@/lib/content";

const CATEGORY_ABBR: Record<string, string> = {
  marketing: "MKT",
  "ai-systems": "AI",
  insights: "INS",
};

export default function FeaturedPicks({ posts }: { posts: PostMeta[] }) {
  const ref = useScrollAnimation();

  if (posts.length === 0) return null;

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-6 pt-10 pb-0">
      <div className="animate-on-scroll">
        <p className="font-mono text-sm tracking-[0.2em] text-accent uppercase">
          Featured
        </p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Editor&apos;s Picks</h2>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/${post.category}/${post.slug}`}
            className={`animate-on-scroll stagger-${i + 1} glow-border group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface/40 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 ${
              i === 0 ? "sm:col-span-2 sm:row-span-1" : ""
            }`}
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-accent/10 px-3 py-1 font-mono text-[11px] tracking-wider text-accent">
                  {CATEGORY_ABBR[post.category] || post.category.toUpperCase()}
                </span>
                <span className="font-mono text-xs text-secondary">{post.date}</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold leading-snug transition-colors group-hover:text-accent sm:text-2xl">
                {post.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-secondary line-clamp-3">
                {post.description}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-sm text-accent opacity-0 transition-opacity group-hover:opacity-100">
              <span>Read</span>
              <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </div>
            <div className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
          </Link>
        ))}
      </div>
    </section>
  );
}
