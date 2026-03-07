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

새 기능 추가 시 아래 파일을 참조 패턴으로 사용:

| 패턴 | 참조 파일 |
|------|----------|
| 동적 라우트 페이지 | `src/app/marketing/[slug]/page.tsx` |
| 카테고리 목록 페이지 | `src/app/marketing/page.tsx` |
| MDX 렌더링 | `src/lib/mdx.ts` |
| 콘텐츠 조회 (CRUD) | `src/lib/content.ts` |
| 사이트 상수 | `src/lib/constants.ts` |
| 레이아웃 구조 | `src/app/layout.tsx` |
| 포스트 카드 컴포넌트 | `src/components/post/PostCard.tsx` |
| 포스트 본문 레이아웃 | `src/components/post/PostLayout.tsx` |
| 홈 섹션 컴포넌트 | `src/components/home/Hero.tsx` |
| 공통 UI 컴포넌트 | `src/components/ui/TechBadge.tsx` |
| 커스텀 훅 | `src/hooks/useScrollAnimation.ts` |

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
| 파일 | 역할 |
|------|------|
| `blog-build.md` | 블로그 빌드 전체 Task 관리 (Task 1~8) |
| `content-generate.md` | 솔루션 → 블로그 포스트 자동 생성 (4-Phase) |
| `content-publish.md` | MDX 콘텐츠 작성/퍼블리싱 |
| `design-review.md` | 디자인 시스템 검수 |

### 스킬 목록
| 스킬 | 역할 |
|------|------|
| `setup-project.md` | 프로젝트 초기 세팅 |
| `build-layout.md` | 레이아웃 & 네비게이션 |
| `build-pages.md` | 페이지 빌드 |
| `build-components.md` | MDX 콘텐츠 시스템 |
| `apply-design-system.md` | 디자인 시스템 적용/검수 |
| `write-content.md` | MDX 콘텐츠 작성 |
| `optimize-deploy.md` | SEO/성능/배포 |
| `solution-registry.md` | 솔루션 프로젝트 경로 레지스트리 |
| `explore-solution.md` | 솔루션 코드베이스 탐색/분석 |
| `learn-writing-style.md` | 기존 글 톤앤매너 학습 |
| `draft-post.md` | MDX 초안 작성 |
| `curate-media.md` | 이미지/GIF 큐레이션 |
| `review-post.md` | 포스트 기술 검수 |

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
