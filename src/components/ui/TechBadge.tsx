export default function TechBadge({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-secondary">
      {label}
    </span>
  );
}
