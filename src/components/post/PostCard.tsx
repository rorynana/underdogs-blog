import Link from "next/link";
import TechBadge from "@/components/ui/TechBadge";
import type { PostMeta } from "@/lib/content";

const CATEGORY_ABBR: Record<string, string> = {
  marketing: "MKT",
  "ai-systems": "AI",
  insights: "INS",
};

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/${post.category}/${post.slug}`}
      className="glow-border group flex h-full flex-col rounded-2xl border border-border bg-surface/30 p-7 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-accent/10 px-3 py-1 font-mono text-[11px] tracking-wider text-accent">
          {CATEGORY_ABBR[post.category] || post.category.toUpperCase()}
        </span>
        <span className="font-mono text-xs text-secondary">{post.date}</span>
      </div>

      <h3 className="mt-4 text-lg font-semibold leading-snug transition-colors group-hover:text-accent">
        {post.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-secondary line-clamp-2">
        {post.description}
      </p>

      {post.techStack.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.techStack.map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </div>
      )}

      <div className="mt-5 flex items-center gap-1 text-sm text-accent opacity-0 transition-opacity group-hover:opacity-100">
        <span>Read</span>
        <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
      </div>
    </Link>
  );
}
