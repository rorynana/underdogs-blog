import { notFound } from "next/navigation";
import { getPost, getPostsByCategory } from "@/lib/content";
import { renderMDX } from "@/lib/mdx";
import PostLayout from "@/components/post/PostLayout";

export async function generateStaticParams() {
  const posts = getPostsByCategory("insights");
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost("insights", slug);
  if (!post) return {};
  return {
    title: `${post.meta.title} — The Underdogs`,
    description: post.meta.description,
  };
}

export default async function InsightPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost("insights", slug);
  if (!post) notFound();

  const content = await renderMDX(post.content);

  return (
    <PostLayout meta={post.meta}>
      {content}
    </PostLayout>
  );
}
