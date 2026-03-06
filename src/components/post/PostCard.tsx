import Link from "next/link";
import TechBadge from "@/components/ui/TechBadge";
import type { PostMeta } from "@/lib/content";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/${post.category}/${post.slug}`}
      className="group rounded-xl border border-white/10 p-6 transition-colors hover:border-accent/50 hover:bg-white/[0.02]"
    >
      <p className="text-xs text-secondary">{post.date}</p>
      <h3 className="mt-2 text-lg font-semibold transition-colors group-hover:text-accent">
        {post.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-secondary">
        {post.description}
      </p>
      {post.techStack.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.techStack.map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </div>
      )}
    </Link>
  );
}
