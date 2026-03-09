import TechBadge from "@/components/ui/TechBadge";
import Giscus from "@/components/post/Giscus";
import ShareButtons from "@/components/post/ShareButtons";
import ReadingProgress from "@/components/post/ReadingProgress";
import type { PostMeta } from "@/lib/content";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/constants";

interface PostLayoutProps {
  meta: PostMeta;
  children: React.ReactNode;
}

export default function PostLayout({ meta, children }: PostLayoutProps) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": meta.title,
    "description": meta.description,
    "datePublished": meta.date,
    "author": { "@type": "Person", "name": SITE.author },
    "publisher": { "@type": "Organization", "name": SITE.name, "url": SITE.siteUrl },
    "url": `${SITE.siteUrl}/${meta.category}/${meta.slug}`,
    "keywords": meta.techStack.join(", "),
    "inLanguage": "ko-KR",
    ...(meta.thumbnail ? { "image": `${SITE.siteUrl}${meta.thumbnail}` } : {}),
  };

  return (
    <>
    <JsonLd data={articleSchema} />
    <ReadingProgress category={meta.category} />
    <article lang="ko" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
      <header className="mb-8 sm:mb-16">
        <p className="text-sm text-secondary tracking-wide">{meta.date}</p>
        <h1 className="mt-4 text-[1.75rem] sm:text-[2.25rem] leading-[1.2] font-extrabold tracking-[-0.035em]">{meta.title}</h1>
        {meta.subtitle && (
          <p className="mt-2 text-base sm:text-lg leading-relaxed text-secondary/80">{meta.subtitle}</p>
        )}
        <p className="mt-5 text-lg leading-relaxed text-secondary">{meta.description}</p>
        {meta.techStack.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {meta.techStack.map((tech) => (
              <TechBadge key={tech} label={tech} />
            ))}
          </div>
        )}
      </header>
      <div className="post-content">
        {children}
      </div>
      <ShareButtons meta={meta} />
      <Giscus />
    </article>
    </>
  );
}
