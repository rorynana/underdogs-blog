# The Underdogs — AI Driven Marketing Systems

AI 기반 마케팅 시스템을 구축하는 마케터의 기술 블로그 + 포트폴리오.
PRD 전문은 `guide.md` 참조. 디자인/콘텐츠 전략의 상세 내용은 그곳에 있다.
카테고리: Marketing, AI & Systems, Insights, About

---

## 기술 스택

- **Framework**: Next.js 16.1.6 (App Router) + React 19
- **Content**: MDX (next-mdx-remote v6 + rehype-pretty-code/Shiki)
- **Styling**: Tailwind CSS v4 (postcss)
- **Frontmatter**: gray-matter
- **Package Manager**: pnpm (v10.30.3)
- **Node**: v24.11.0
- **Deploy**: Vercel (예정)

---

## 핵심 규칙

### 코드 패턴
- App Router 사용: `src/app/{route}/page.tsx`
- Dynamic routes: `params`는 `Promise<>` 패턴 (Next.js 16)
- MDX 콘텐츠: `content/{category}/{slug}.mdx`
- 이미지: `public/images/posts/{slug}/`
- 상수: `src/lib/constants.ts` (SITE, NAV_ITEMS, CATEGORIES)

### Frontmatter 필수 필드
```yaml
title: string
subtitle: string        # optional, 25자 이내
thumbnail: string       # optional, /images/posts/{slug}/thumbnail.png
description: string
category: string        # marketing | ai-systems | insights
date: YYYY-MM-DD
techStack: string[]
featured: boolean
```

### 네이밍
- 컴포넌트: PascalCase (`PostCard.tsx`)
- 유틸/훅: camelCase (`useScrollAnimation.ts`)
- MDX 파일: kebab-case (`market-monitoring-automation.mdx`)
- 이미지 폴더: slug 기반 (`public/images/posts/{slug}/`)

### 스타일
- Tailwind utility-first, 인라인 스타일 금지
- 다크모드 전용 (라이트모드 없음)
- MDX 내 `<` 문자는 `&lt;`로 escape

---

## 코드 패턴 레지스트리

새 기능 추가 시 기존 파일을 참조 패턴으로 사용.
핵심 참조: `src/app/marketing/[slug]/page.tsx` (동적 라우트), `src/lib/mdx.ts` (MDX), `src/lib/content.ts` (CRUD), `src/lib/constants.ts` (상수), `src/components/post/PostLayout.tsx` (포스트 레이아웃)

---

## 디자인 규칙

- **Concept**: Minimal Tech Journal, Dark mode only
- **BG**: `#0F1115` / **Text**: `#FFFFFF` / **Accent**: `#5B8CFF` / **Secondary**: `#8A8F98`
- **Fonts**: Inter (title/body), JetBrains Mono (code)
- **이미지**: Dashboard screenshots, system diagrams, data visualizations 권장. Stock images 금지.
- **글 구조**: Problem → System → Implementation → Result → Insight

---

## 오케스트레이터 사용 규칙

### 구조
```
orchestrators/   → 워크플로우 정의 (무엇을, 어떤 순서로)
skills/          → 실행 단위 (어떻게)
sot/             → 상태/이력 기록 (Source of Truth)
```

### 오케스트레이터 목록
`blog-build.md` / `content-generate.md` / `content-publish.md` / `design-review.md`

### 스킬 목록
`setup-project.md` / `build-layout.md` / `build-pages.md` / `build-components.md` / `apply-design-system.md` / `write-content.md` / `optimize-deploy.md` / `solution-registry.md` / `explore-solution.md` / `learn-writing-style.md` / `draft-post.md` / `curate-media.md` / `review-post.md`

### 새 기능 추가 사이클
1. **Research** — 관련 오케스트레이터/스킬 확인, PRD(`guide.md`) 참조
2. **Execute** — 해당 스킬 프로세스에 따라 실행
3. **Review** — `sot/review-log.md`에 결과 기록, 이슈 시 스킬 재실행

### 솔루션 포스트 생성 사이클 (`content-generate.md`)
1. **Phase 1: Research** — 솔루션 탐색 + 톤앤매너 학습 → 체크포인트 1 (방향 컨펌)
2. **Phase 2: Draft** — MDX 초안 작성 → 체크포인트 2 (초안 컨펌)
3. **Phase 3: Media** — 스크린샷/GIF 수집, 플레이스홀더 교체
4. **Phase 4: Finalize** — 검수 + 빌드 테스트 + SOT 업데이트

### SOT 기록 규칙
- `sot/progress.md` — Task별 진행 상태 (TODO/IN_PROGRESS/DONE)
- `sot/content-generation-log.md` — 포스트 생성 이력 (Phase별 상태)
- `sot/review-log.md` — 리뷰 결과 기록
- `sot/decisions.md` — 아키텍처/디자인 결정 사항
- `sot/writing-style-guide.md` — 톤앤매너 가이드 (첫 생성 후 재사용)

---

## 예외처리 규칙

- MDX 파싱 에러 → `<` escape 여부 확인, frontmatter YAML 검증
- 빌드 실패 → `pnpm build` 에러 로그 확인, MDX 수정 (최대 2회 재시도)
- 이미지 없음 → GIF 비율 높이기, 사용자에게 스크린샷 요청
- pnpm 관련 → `node_modules` 복사 금지, 반드시 `pnpm install`
- 초안 품질 미달 → 분석 리포트 보충 후 재작성

---

## 🔥 현재 진행 중 (2026-03-10)

### Philosophy & AI 카테고리 첫 포스트 작성 중

**완료된 것**
- [x] Philosophy & AI 카테고리 신설 (constants.ts, globals.css, page 파일, [slug] 페이지)
- [x] CSS: neon-card-philosophy / accent-line-philosophy / neon-badge-philosophy (amber #F59E0B)
- [x] sot/philosophy-ai-ideas.md 생성 (아이데이션 프레임워크, gpt.md 기반)
- [x] ★1 방향 컨펌 완료

**확정된 포스트 정보**
- slug: `pattern-and-awareness`
- 제목: "나는 지금 선택하고 있는가, 자동 재생 중인가"
- 부제: "매트릭스, 불교, AI가 같은 구조를 가리키고 있다"
- 각도: 구조 분석형 (매트릭스/불교/AI 세 프레임 나란히 놓고 공통 구조 해부)
- 카테고리: philosophy

**다음 할 일**
- [ ] ★2 초안 컨펌 — 초안은 대화에 텍스트로 제시된 상태. 사용자 승인 받으면 파일 저장
- [ ] ★2.5 내러티브 검증 — 팩트 체크 (매트릭스 빨간 알약 이미 수정됨)
- [ ] Phase 3: 미디어 (이미지/GIF 없음, philosophy 카테고리 특성상 SVG 또는 GIF 검토)
- [ ] Phase 4: 빌드 테스트 + SOT 업데이트

**재개 시 참조**
- 초안 전문: 직전 대화에서 텍스트로 제시 (stat-grid + callout-highlight 포함)
- 소스: gpt.md (10,517줄) — 불교/AI/매트릭스 대화 원본
- 아이데이션 가이드: sot/philosophy-ai-ideas.md

---

## 현재 미완료 작업

- [ ] Task 7: SEO & Performance (next-sitemap, metadata, Lighthouse > 90)
- [ ] Task 8: Deploy (Vercel)
- [ ] ai-systems stub 3개 → 실제 솔루션 포스트 교체 (creator-scoring, marketing-intelligence, market-monitoring)
- [ ] solution-registry slug 매핑 확정 (stub ↔ 솔루션 연결)

---

## 빌드 / 실행

```bash
pnpm install          # 의존성 설치
pnpm dev              # 개발 서버 (localhost:3000)
pnpm build            # 프로덕션 빌드
pnpm start            # 프로덕션 서버
pnpm lint             # ESLint
```

GitHub CLI: `"/c/Program Files/GitHub CLI/gh.exe"`
