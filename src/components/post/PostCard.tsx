import Link from "next/link";
import Image from "next/image";
import TechBadge from "@/components/ui/TechBadge";
import type { PostMeta } from "@/lib/content";

const CATEGORY_ABBR: Record<string, string> = {
  marketing: "MKT",
  "ai-systems": "AI",
  insights: "INS",
};

const CATEGORY_KEY: Record<string, string> = {
  marketing: "marketing",
  "ai-systems": "ai",
  insights: "insights",
};

const CORNER_COLOR: Record<string, string> = {
  marketing: "#5B8CFF",
  "ai-systems": "#8B5CF6",
  insights: "#06B6D4",
};

const TITLE_HOVER_CLASS: Record<string, string> = {
  marketing: "group-hover:text-accent",
  "ai-systems": "group-hover:text-accent-purple",
  insights: "group-hover:text-accent-cyan",
};

export default function PostCard({ post }: { post: PostMeta }) {
  const catKey = CATEGORY_KEY[post.category] || "marketing";
  const cornerColor = CORNER_COLOR[post.category] || "#5B8CFF";

  return (
    <Link
      href={`/${post.category}/${post.slug}`}
      className={`neon-card-${catKey} group relative flex h-full flex-col rounded-2xl border bg-surface/30 overflow-hidden transition-all duration-300 hover:-translate-y-1`}
    >
      {/* 카드 상단 카테고리 컬러 라인 */}
      <div className={`h-[2px] w-full accent-line-${catKey}`} />

      {/* 사이버 코너 마킹 */}
      <span className="cyber-corner cyber-corner-tl" style={{borderColor: cornerColor}} />
      <span className="cyber-corner cyber-corner-tr" style={{borderColor: cornerColor}} />
      <span className="cyber-corner cyber-corner-bl" style={{borderColor: cornerColor}} />
      <span className="cyber-corner cyber-corner-br" style={{borderColor: cornerColor}} />

      {post.thumbnail && (
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center justify-between">
          <span className={`neon-badge-${catKey} rounded-full px-3 py-1 font-mono text-[11px] tracking-wider`}>
            {CATEGORY_ABBR[post.category] || post.category.toUpperCase()}
          </span>
          <span className="font-mono text-xs text-secondary">{post.date}</span>
        </div>

        <h3 className={`mt-4 text-lg font-semibold leading-snug transition-colors ${TITLE_HOVER_CLASS[post.category] || "group-hover:text-accent"}`}>
          {post.title}
        </h3>
        {post.subtitle ? (
          <p className="mt-2 flex-1 text-sm leading-relaxed text-secondary/70 line-clamp-2">
            {post.subtitle}
          </p>
        ) : (
          <p className="mt-3 flex-1 text-sm leading-relaxed text-secondary line-clamp-2">
            {post.description}
          </p>
        )}

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
      </div>
    </Link>
  );
}
