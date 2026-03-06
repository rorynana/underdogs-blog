import TechBadge from "@/components/ui/TechBadge";
import type { PostMeta } from "@/lib/content";

interface PostLayoutProps {
  meta: PostMeta;
  children: React.ReactNode;
}

export default function PostLayout({ meta, children }: PostLayoutProps) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <header className="mb-12">
        <p className="text-sm text-secondary">{meta.date}</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">{meta.title}</h1>
        <p className="mt-4 text-lg text-secondary">{meta.description}</p>
        {meta.techStack.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {meta.techStack.map((tech) => (
              <TechBadge key={tech} label={tech} />
            ))}
          </div>
        )}
      </header>
      <div className="prose prose-invert max-w-none prose-headings:font-semibold prose-a:text-accent prose-code:font-mono prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10">
        {children}
      </div>
    </article>
  );
}
