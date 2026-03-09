import { notFound } from "next/navigation";
import { getPost, getPostsByCategory } from "@/lib/content";
import { renderMDX } from "@/lib/mdx";
import PostLayout from "@/components/post/PostLayout";
import { SITE } from "@/lib/constants";

export async function generateStaticParams() {
  const posts = getPostsByCategory("insights");
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost("insights", slug);
  if (!post) return {};

  const ogImage = post.meta.thumbnail
    ? post.meta.thumbnail
    : `/api/og?title=${encodeURIComponent(post.meta.title)}&subtitle=${encodeURIComponent(post.meta.subtitle || "")}&category=${post.meta.category}`;

  return {
    title: `${post.meta.title} — The Underdogs`,
    description: post.meta.subtitle || post.meta.description,
    alternates: {
      canonical: `${SITE.siteUrl}/insights/${slug}`,
    },
    openGraph: {
      type: "article" as const,
      title: post.meta.title,
      description: post.meta.subtitle || post.meta.description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      publishedTime: post.meta.date,
      authors: [SITE.author],
      tags: post.meta.techStack,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: post.meta.title,
      description: post.meta.subtitle || post.meta.description,
      images: [ogImage],
    },
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
