# SEO Checklist — The Underdogs

포스트 발행 시 SEO 상태 추적. 새 포스트 발행 시 행 추가.

---

## 글로벌 SEO 상태

| 항목 | 상태 | 메모 |
|------|------|------|
| sitemap.xml | ✅ | `/src/app/sitemap.ts` — Next.js 내장 |
| robots.txt | ✅ | `/src/app/robots.ts` — Yeti 허용 포함 |
| WebSite JSON-LD | ✅ | `layout.tsx` body 내 삽입 |
| Root OG/Twitter Card | ✅ | `layout.tsx` metadata |
| metadataBase | ✅ | `new URL("https://the-underdogs.kr")` |
| naver-site-verification | ⏳ | 배포 후 등록 필요 |
| Google Search Console | ⏳ | 배포 후 sitemap 제출 필요 |
| Web App Manifest | ✅ | `/src/app/manifest.ts` |
| Skip Navigation | ✅ | `layout.tsx` sr-only skip link |
| 보안 헤더 4종 | ✅ | `next.config.ts` |
| 이미지 avif/webp | ✅ | `next.config.ts` formats |

---

## Lighthouse 기록

| 날짜 | Performance | SEO | Accessibility | Best Practices | 비고 |
|------|------------|-----|---------------|----------------|------|
| 2026-03-10 (1차) | 65 | 100 | 100 | 96 | Phase A+B 이전 |
| 2026-03-10 (2차) | 71 | 100 | 96 | 88 | Phase B 완료 후 |
| 2026-03-10 (4차) | 69 | 100 | 100 | 100 | Phase C 완료 — A/BP 100점 달성 |

---

## 포스트별 SEO 상태

| 카테고리 | slug | sitemap | OG | BlogPosting JSON-LD | canonical | thumbnail.webp | 비고 |
|---------|------|---------|----|--------------------|-----------|----------------|------|
| ai-systems | onestock-ai-production-intelligence | ✅ | ✅ | ✅ | ✅ | ✅ | |
| ai-systems | marketing-intelligence-dashboard | ✅ | ✅ | ✅ | ✅ | ✅ | |
| ai-systems | market-monitoring-automation | ✅ | ✅ | ✅ | ✅ | ✅ | |
| ai-systems | creator-scoring-algorithm | ✅ | ✅ | ✅ | ✅ | ✅ | |
| ai-systems | tubescout-youtube-creator-scoring | ✅ | ✅ | ✅ | ✅ | ⬜ | 썸네일 없음 |
| marketing | marketing-persona | ✅ | ✅ | ✅ | ✅ | ⬜ | 썸네일 확인 필요 |
| marketing | facebook-ads-intro | ✅ | ✅ | ✅ | ✅ | ⬜ | |
| marketing | facebook-ads-abo-cbo | ✅ | ✅ | ✅ | ✅ | ⬜ | |
| marketing | mbti-test-without-dev | ✅ | ✅ | ✅ | ✅ | ⬜ | |
| marketing | startup-marketer-portfolio | ✅ | ✅ | ✅ | ✅ | ⬜ | |
| marketing | three-box-strategy | ✅ | ✅ | ✅ | ✅ | ⬜ | |
| marketing | regular-expressions | ✅ | ✅ | ✅ | ✅ | ⬜ | |
| marketing | crypto-pr-agencies | ✅ | ✅ | ✅ | ✅ | ⬜ | |
| marketing | marketing-study-review | ✅ | ✅ | ✅ | ✅ | ⬜ | |
| insights | stainless-cookware-market-1 | ✅ | ✅ | ✅ | ✅ | ⬜ | |
| insights | stainless-cookware-market-2 | ✅ | ✅ | ✅ | ✅ | ⬜ | |
| insights | cast-iron-cookware-market | ✅ | ✅ | ✅ | ✅ | ⬜ | |

> **범례**: ✅ 완료 | ⬜ 미완료/해당없음 | ⏳ 대기 중

---

## 새 포스트 발행 체크리스트

새 MDX 파일 추가 시:

- [ ] frontmatter 완료: title, subtitle, description, category, date, techStack, featured, thumbnail
- [ ] thumbnail.webp 변환: `node scripts/convert-images.mjs`
- [ ] sitemap 자동 포함 확인: `getAllPosts()` 에서 읽히는지 확인
- [ ] generateMetadata에 canonical 포함 (`[slug]/page.tsx`)
- [ ] BlogPosting JSON-LD 자동 삽입 확인 (`PostLayout.tsx`)
- [ ] OG 이미지 미리보기: Facebook Debugger (배포 후)
- [ ] 위 표에 행 추가
