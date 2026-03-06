import { getAllPosts } from "@/lib/content";
import PostCard from "@/components/post/PostCard";

export default function LatestPosts() {
  const posts = getAllPosts().slice(0, 6);

  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="text-2xl font-bold">Latest Posts</h2>
      {posts.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-secondary">Coming soon.</p>
      )}
    </section>
  );
}
