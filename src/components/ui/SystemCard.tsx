import Link from "next/link";
import TechBadge from "./TechBadge";

interface SystemCardProps {
  title: string;
  description: string;
  techStack: readonly string[];
  slug: string;
}

export default function SystemCard({ title, description, techStack, slug }: SystemCardProps) {
  return (
    <Link
      href={`/systems/${slug}`}
      className="group rounded-xl border border-white/10 p-6 transition-colors hover:border-accent/50 hover:bg-white/[0.02]"
    >
      <h3 className="text-lg font-semibold transition-colors group-hover:text-accent">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-secondary">
        {description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <TechBadge key={tech} label={tech} />
        ))}
      </div>
    </Link>
  );
}
