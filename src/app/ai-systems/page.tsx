import { getPostsByCategory } from "@/lib/content";
import PostCard from "@/components/post/PostCard";

export const metadata = {
  title: "AI & Systems — The Underdogs",
  description: "AI 에이전트, 자동화 시스템 구축기",
};

export default function AiSystemsPage() {
  const posts = getPostsByCategory("ai-systems");

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-24">
      <p className="font-mono text-sm tracking-[0.2em] text-accent uppercase">AI</p>
      <h1 className="mt-3 text-3xl font-bold sm:text-5xl">AI & Systems</h1>
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
