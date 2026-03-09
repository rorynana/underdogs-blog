# Skill: optimize-seo

SEO 최적화 재실행 시 참조 가이드. Phase A~C 순서로 진행.

---

## 전제 조건

- `src/lib/constants.ts`의 SITE 상수 확인:
  ```ts
  siteUrl: "https://the-underdogs.kr",  // trailing slash 없음
  twitterHandle: "",
  locale: "ko_KR",
  ```

---

## Phase A: 핵심 SEO (크롤링 시작)

### 1. Root layout metadata (`src/app/layout.tsx`)

```ts
export const viewport: Viewport = {
  width: "device-width", initialScale: 1, themeColor: "#0F1115",
};
export const metadata: Metadata = {
  metadataBase: new URL(SITE.siteUrl),
  title: { default: SITE.title, template: "%s — The Underdogs" },
  keywords: ["AI 마케팅", "마케팅 자동화", "AI 에이전트", "마케팅 시스템", "The Underdogs"],
  authors: [{ name: SITE.author }],
  openGraph: { type: "website", locale: SITE.locale, url: SITE.siteUrl, siteName: SITE.name,
    title: SITE.title, description: SITE.description,
    images: [{ url: `/api/og?title=...`, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.description },
  alternates: { canonical: SITE.siteUrl },
  robots: { index: true, follow: true },
  other: { "naver-site-verification": "REPLACE_WITH_CODE" },
};
```

### 2. 카테고리 페이지 3개 OG/canonical

각 `src/app/{category}/page.tsx`에 추가:
```ts
export const metadata: Metadata = {
  title: "{카테고리명}",
  openGraph: { title, description, url: `${SITE.siteUrl}/{category}`,
    images: [{ url: `/api/og?title=...&category={category}` }] },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: `${SITE.siteUrl}/{category}` },
};
```

### 3. 동적 라우트 generateMetadata 보강

각 `[slug]/page.tsx`에 추가:
```ts
alternates: { canonical: `${SITE.siteUrl}/${category}/${slug}` },
openGraph: { ...기존..., authors: [SITE.author], tags: post.meta.techStack },
```

### 4. robots.ts (`src/app/robots.ts`)

```ts
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: "Yeti", allow: "/" },
    ],
    sitemap: `${SITE.siteUrl}/sitemap.xml`,
    host: SITE.siteUrl,
  };
}
```

### 5. sitemap.ts (`src/app/sitemap.ts`)

```ts
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { getAllPosts } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const staticPages = [
    { url: SITE.siteUrl, priority: 1.0 },
    { url: `${SITE.siteUrl}/ai-systems`, priority: 0.8 },
    { url: `${SITE.siteUrl}/marketing`, priority: 0.8 },
    { url: `${SITE.siteUrl}/insights`, priority: 0.8 },
    { url: `${SITE.siteUrl}/about`, priority: 0.6 },
  ].map((p) => ({ ...p, lastModified: new Date(), changeFrequency: "weekly" as const }));

  const postPages = posts.map((post) => ({
    url: `${SITE.siteUrl}/${post.category}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: post.featured ? 0.9 : 0.7,
  }));

  return [...staticPages, ...postPages];
}
```

### 검증

```bash
pnpm build && pnpm start
# 브라우저에서 확인:
# /sitemap.xml — 전체 포스트 + 정적 페이지
# /robots.txt — Yeti 포함
```

---

## Phase B: 구조화 데이터 + 이미지

### 1. JsonLd 컴포넌트 (`src/components/seo/JsonLd.tsx`)

```tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
```

### 2. WebSite Schema (layout.tsx body 내)

```tsx
<JsonLd data={{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": SITE.name, "url": SITE.siteUrl, "description": SITE.description,
  "author": { "@type": "Person", "name": SITE.author },
}} />
```

### 3. BlogPosting Schema (PostLayout.tsx)

```tsx
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": meta.title, "description": meta.description,
  "datePublished": meta.date,
  "author": { "@type": "Person", "name": SITE.author },
  "url": `${SITE.siteUrl}/${meta.category}/${meta.slug}`,
  "keywords": meta.techStack.join(", "),
  "inLanguage": "ko-KR",
  ...(meta.thumbnail ? { "image": `${SITE.siteUrl}${meta.thumbnail}` } : {}),
};
```

### 4. 이미지 WebP 변환

```bash
node scripts/convert-images.mjs
# public/images/posts/**/*.png → .webp (quality 80, 1200px 상한)
# 썸네일: 1200×630 크롭
# 원본 파일 유지
```

변환 후 MDX frontmatter의 thumbnail 경로를 `.webp`로 교체.

### 5. next.config.ts

```ts
images: { formats: ["image/avif", "image/webp"], minimumCacheTTL: 31536000 },
async headers() {
  return [
    { source: "/(.*)", headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-XSS-Protection", value: "1; mode=block" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    ]},
    { source: "/images/(.*)", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    { source: "/_next/static/(.*)", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
  ];
},
compress: true,
```

---

## Phase C: 접근성

### 1. Skip Navigation (layout.tsx)

`<body>` 직후에:
```html
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute ...">
  Skip to main content
</a>
```
`<main>` 태그에 `id="main-content"` 필수.

### 2. Hydration 안전 (Hero.tsx)

```ts
// 문제: useState 초기값에 typeof window 사용 → 서버/클라이언트 불일치
// 해결: 항상 동일한 초기값, useEffect에서 mobile 감지
const [titlePhase, setTitlePhase] = useState<TitlePhase>('typing');
useEffect(() => {
  if (window.innerWidth < 640) setTitlePhase('final');
}, []);
```

### 3. Button 접근성

버튼에 visible text와 aria-label이 불일치할 경우:
```jsx
// 잘못된 예: aria-label="Open menu" + visible text ">_"
// 올바른 예:
<button>
  <span aria-hidden="true">{">_"}</span>
  <span className="sr-only">Open menu</span>
</button>
```

---

## Lighthouse 실행

```bash
# 로컬 빌드 후
pnpm build && pnpm start

# Lighthouse CLI
npx lighthouse http://localhost:3000 --output=html --output-path=./lighthouse-report.html --chrome-flags="--headless"

# 결과 파싱 (Windows)
node -e "const fs=require('fs');const r=JSON.parse(fs.readFileSync('./lighthouse-report.json','utf8'));const c=r.categories;console.log('Performance:',Math.round(c.performance.score*100));console.log('SEO:',Math.round(c.seo.score*100));console.log('Accessibility:',Math.round(c.accessibility.score*100));console.log('Best Practices:',Math.round(c['best-practices'].score*100));"
```

---

## 네이버 서치어드바이저 등록 (배포 후)

1. https://searchadvisor.naver.com → 사이트 등록 (https://the-underdogs.kr)
2. HTML 태그 인증 코드 발급 → `layout.tsx`의 `"naver-site-verification": "REPLACE_WITH_CODE"` 교체
3. 사이트맵 제출: `https://the-underdogs.kr/sitemap.xml`
4. "검증 > 웹 페이지 수집" 탭에서 메타 태그 확인
5. Google Search Console: https://search.google.com/search-console → sitemap.xml 제출
