import { FEATURED_SYSTEMS } from "@/lib/constants";
import SystemCard from "@/components/ui/SystemCard";

export default function FeaturedSystems() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="text-2xl font-bold">Featured Systems</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED_SYSTEMS.map((system) => (
          <SystemCard key={system.slug} {...system} />
        ))}
      </div>
    </section>
  );
}
