export default function TechBadge({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-white/8 bg-white/5 px-3 py-1 font-mono text-[11px] text-secondary transition-colors hover:border-accent/30 hover:text-accent">
      {label}
    </span>
  );
}
