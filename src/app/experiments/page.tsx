import { getPostsByCategory } from "@/lib/content";
import PostCard from "@/components/post/PostCard";

export const metadata = {
  title: "Experiments — The Underdogs",
  description: "AI 마케팅 실험 기록",
};

export default function ExperimentsPage() {
  const posts = getPostsByCategory("experiments");

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-4xl font-bold">Experiments</h1>
      <p className="mt-4 text-secondary">
        AI 마케팅 실험 기록을 공유합니다.
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
