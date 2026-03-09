import type { Metadata } from "next";
import { getPostsByCategory } from "@/lib/content";
import PostCard from "@/components/post/PostCard";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AI Driven",
  description: "AI 에이전트, 자동화 시스템 구축기",
  alternates: { canonical: `${SITE.siteUrl}/ai-systems` },
  openGraph: {
    title: "AI Driven — The Underdogs",
    description: "AI 에이전트, 자동화 시스템 구축기",
    url: `${SITE.siteUrl}/ai-systems`,
    type: "website",
    images: [{ url: `/api/og?title=AI+Driven&subtitle=${encodeURIComponent("AI 에이전트 자동화 시스템")}&category=ai-systems`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Driven — The Underdogs",
    description: "AI 에이전트, 자동화 시스템 구축기",
    images: [`/api/og?title=AI+Driven&subtitle=${encodeURIComponent("AI 에이전트 자동화 시스템")}&category=ai-systems`],
  },
};

export default function AiSystemsPage() {
  const posts = getPostsByCategory("ai-systems");

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-24">
      <p className="font-mono text-sm tracking-[0.2em] text-accent uppercase">AI</p>
      <h1 className="mt-3 text-3xl font-bold sm:text-5xl">AI Driven</h1>
      <p className="mt-4 text-lg text-secondary">
        AI 에이전트와 자동화 시스템 구축기를 공유합니다.
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
