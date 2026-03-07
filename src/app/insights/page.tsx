import { getPostsByCategory } from "@/lib/content";
import PostCard from "@/components/post/PostCard";

export const metadata = {
  title: "Insights — The Underdogs",
  description: "시장분석, 업계 뉴스와 아티클 해석",
};

export default function InsightsPage() {
  const posts = getPostsByCategory("insights");

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <p className="font-mono text-sm tracking-[0.2em] text-accent uppercase">INS</p>
      <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Insights</h1>
      <p className="mt-4 text-lg text-secondary">
        시장분석, 업계 뉴스와 아티클을 내 관점에서 해석합니다.
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
