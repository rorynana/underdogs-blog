import type { Metadata } from "next";
import { getPostsByCategory } from "@/lib/content";
import PostCard from "@/components/post/PostCard";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Field Notes",
  description: "시장분석, 브랜드 창업, 현장 기록",
  alternates: { canonical: `${SITE.siteUrl}/insights` },
  openGraph: {
    title: "Field Notes — The Underdogs",
    description: "시장분석, 브랜드 창업, 현장 기록",
    url: `${SITE.siteUrl}/insights`,
    type: "website",
    images: [{ url: `/api/og?title=Field+Notes&subtitle=${encodeURIComponent("시장분석 브랜드 창업 현장 기록")}&category=insights`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Field Notes — The Underdogs",
    description: "시장분석, 브랜드 창업, 현장 기록",
    images: [`/api/og?title=Field+Notes&subtitle=${encodeURIComponent("시장분석 브랜드 창업 현장 기록")}&category=insights`],
  },
};

export default function InsightsPage() {
  const posts = getPostsByCategory("insights");

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-24">
      <p className="font-mono text-sm tracking-[0.2em] text-accent uppercase">FLD</p>
      <h1 className="mt-3 text-3xl font-bold sm:text-5xl">Field Notes</h1>
      <p className="mt-4 text-lg text-secondary">
        시장분석, 브랜드 창업, 현장에서 건진 기록들.
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
