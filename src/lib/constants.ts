export const SITE = {
  name: "The Underdogs",
  title: "The Underdogs — AI Driven Marketing Systems",
  description: "Building intelligent marketing systems that automate decisions, not just tasks.",
  author: "Seongyun Jang",
} as const;

export const NAV_ITEMS = [
  { label: "AI Driven", href: "/ai-systems" },
  { label: "Digital Marketing", href: "/marketing" },
  { label: "Field Notes", href: "/insights" },
  { label: "About", href: "/about" },
] as const;

export const CATEGORIES = [
  {
    label: "AI Driven",
    abbr: "AI",
    slug: "ai-systems",
    href: "/ai-systems",
    description: "AI 에이전트, 자동화 시스템 구축기",
  },
  {
    label: "Digital Marketing",
    abbr: "MKT",
    slug: "marketing",
    href: "/marketing",
    description: "퍼포먼스 마케팅, 전략, 광고 운영 실무",
  },
  {
    label: "Field Notes",
    abbr: "FLD",
    slug: "insights",
    href: "/insights",
    description: "시장분석, 브랜드 창업, 현장 기록",
  },
] as const;
