# Skill: Build Pages

## Task
각 페이지 라우팅 및 구현

## Pages
1. src/app/page.tsx - HOME (Hero + Featured Systems + Latest Posts)
2. src/app/systems/page.tsx - AI Marketing Systems 목록
3. src/app/systems/[slug]/page.tsx - 시스템 상세 글
4. src/app/experiments/page.tsx - Experiments 목록
5. src/app/experiments/[slug]/page.tsx - 실험 상세 글
6. src/app/insights/page.tsx - Insights 목록
7. src/app/insights/[slug]/page.tsx - 인사이트 상세 글
8. src/app/about/page.tsx - About 정적 페이지

## Input
- IA 구조 (guide.md 참조)
- MDX 콘텐츠 로더 (lib/content.ts)

## Output
- 모든 라우트 접근 가능
- 목록 페이지에서 카드 클릭 시 상세 페이지 이동

## Exception Handling
- 존재하지 않는 slug: notFound() 호출 -> 404
- 빈 카테고리: "Coming soon" 메시지 표시
- 빈 상태: 카드 데이터 없을 때 placeholder
