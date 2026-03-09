import type { Metadata } from "next";
import { getPostsByCategory } from "@/lib/content";
import PostCard from "@/components/post/PostCard";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Digital Marketing",
  description: "퍼포먼스 마케팅, 전략, 광고 운영 실무",
  alternates: { canonical: `${SITE.siteUrl}/marketing` },
  openGraph: {
    title: "Digital Marketing — The Underdogs",
    description: "퍼포먼스 마케팅, 전략, 광고 운영 실무",
    url: `${SITE.siteUrl}/marketing`,
    type: "website",
    images: [{ url: `/api/og?title=Digital+Marketing&subtitle=${encodeURIComponent("퍼포먼스 마케팅 전략 실무")}&category=marketing`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing — The Underdogs",
    description: "퍼포먼스 마케팅, 전략, 광고 운영 실무",
    images: [`/api/og?title=Digital+Marketing&subtitle=${encodeURIComponent("퍼포먼스 마케팅 전략 실무")}&category=marketing`],
  },
};

export default function MarketingPage() {
  const posts = getPostsByCategory("marketing");

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-24">
      <p className="font-mono text-sm tracking-[0.2em] text-accent uppercase">MKT</p>
      <h1 className="mt-3 text-3xl font-bold sm:text-5xl">Digital Marketing</h1>
      <p className="mt-4 text-lg text-secondary">
        퍼포먼스 마케팅, 전략, 광고 운영 실무를 공유합니다.
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
