# Skill: Build Components

## Task
재사용 UI 컴포넌트 구현

## Components
1. src/components/home/Hero.tsx - 히어로 섹션
2. src/components/home/FeaturedSystems.tsx - 3개 시스템 카드
3. src/components/home/LatestPosts.tsx - 최신 글 목록
4. src/components/post/PostCard.tsx - 글 카드 (목록용)
5. src/components/post/PostLayout.tsx - 글 상세 레이아웃
6. src/components/post/CodeBlock.tsx - 코드 블록 (Shiki)
7. src/components/ui/TechBadge.tsx - 기술 스택 뱃지
8. src/components/ui/SystemCard.tsx - 시스템 카드 (Featured용)

## Input
- 디자인 스펙 (colors, typography, spacing)
- PRD 카드 구성: Title, Description, Tech stack, Thumbnail

## Output
- 독립적으로 사용 가능한 컴포넌트
- Tailwind 기반 스타일링

## Exception Handling
- 이미지 로드 실패: fallback placeholder
- 긴 텍스트: line-clamp 적용
