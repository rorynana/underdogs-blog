import type { Metadata } from "next";
import { getPostsByCategory } from "@/lib/content";
import PostCard from "@/components/post/PostCard";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Mind Drift",
  description: "시스템 밖에서 던지는 질문들",
  alternates: { canonical: `${SITE.siteUrl}/philosophy` },
  openGraph: {
    title: "Mind Drift — The Underdogs",
    description: "시스템 밖에서 던지는 질문들",
    url: `${SITE.siteUrl}/philosophy`,
    type: "website",
    images: [{ url: `/api/og?title=Mind+Drift&subtitle=${encodeURIComponent("시스템 밖에서 던지는 질문들")}&category=philosophy`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mind Drift — The Underdogs",
    description: "시스템 밖에서 던지는 질문들",
    images: [`/api/og?title=Mind+Drift&subtitle=${encodeURIComponent("시스템 밖에서 던지는 질문들")}&category=philosophy`],
  },
};

export default function PhilosophyPage() {
  const posts = getPostsByCategory("philosophy");

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-24">
      <p className="font-mono text-sm tracking-[0.2em] text-[#F59E0B] uppercase">MND</p>
      <h1 className="mt-3 text-3xl font-bold sm:text-5xl">Mind Drift</h1>
      <p className="mt-4 text-lg text-secondary">
        시스템 밖에서 던지는 질문들.
      </p>
      <div className="gradient-line mt-10 mb-12" />
      {posts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-secondary">Coming soon.</p>
      )}
    </div>
  );
}
