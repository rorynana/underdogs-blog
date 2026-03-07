"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import PostCard from "@/components/post/PostCard";
import type { PostMeta } from "@/lib/content";

export default function LatestPosts({ posts }: { posts: PostMeta[] }) {
  const ref = useScrollAnimation();

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-6 py-24">
      <div className="animate-on-scroll">
        <p className="font-mono text-sm tracking-[0.2em] text-accent uppercase">
          Latest
        </p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Recent Posts</h2>
      </div>

      {posts.length > 0 ? (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <div key={post.slug} className={`animate-on-scroll stagger-${i + 1}`}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      ) : (
        <p className="animate-on-scroll mt-10 text-secondary">Coming soon.</p>
      )}
    </section>
  );
}
