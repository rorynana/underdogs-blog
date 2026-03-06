import { getPostsByCategory } from "@/lib/content";
import PostCard from "@/components/post/PostCard";

export const metadata = {
  title: "AI Marketing Systems — The Underdogs",
  description: "실제 구축한 AI 기반 마케팅 시스템 소개",
};

export default function SystemsPage() {
  const posts = getPostsByCategory("systems");

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-4xl font-bold">AI Marketing Systems</h1>
      <p className="mt-4 text-secondary">
        실제 구축한 AI 기반 마케팅 시스템을 소개합니다.
      </p>
      {posts.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-secondary">Coming soon.</p>
      )}
    </div>
  );
}
