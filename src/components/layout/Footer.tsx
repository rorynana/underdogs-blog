import Link from "next/link";
import { SITE, NAV_ITEMS } from "@/lib/constants";

const CONNECT_LINKS = [
  { label: "GitHub", href: "https://github.com/rorynana" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="text-lg font-bold">{SITE.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-secondary">
              {SITE.description}
            </p>
          </div>

          {/* Navigate */}
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
              Navigate
            </p>
            <nav className="mt-4 flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-secondary transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
              Connect
            </p>
            <nav className="mt-4 flex flex-col gap-3">
              {CONNECT_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-secondary transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="gradient-line mt-12 mb-6" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-secondary">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-secondary/50">
            Built with Next.js + MDX
          </p>
        </div>
      </div>
    </footer>
  );
}
