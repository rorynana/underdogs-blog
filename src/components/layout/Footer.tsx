import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="mx-auto max-w-5xl px-6 text-center text-sm text-secondary">
        <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
        <p className="mt-2">{SITE.description}</p>
      </div>
    </footer>
  );
}
