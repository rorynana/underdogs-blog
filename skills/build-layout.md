# Skill: Build Layout

## Task
레이아웃 컴포넌트 구현 (Header, Footer, Navigation)

## Steps
1. src/components/layout/Header.tsx - 로고 + 네비게이션
2. src/components/layout/Navigation.tsx - Systems, Experiments, Insights, About
3. src/components/layout/Footer.tsx - 카피라이트, 링크
4. src/app/layout.tsx - Root layout에 Header/Footer 통합
5. 반응형 모바일 메뉴 (햄버거)

## Input
- IA: HOME / AI Marketing Systems / Experiments / Insights / About
- 디자인: Minimal, Dark mode

## Output
- 전체 페이지에 공통 Header/Footer 적용
- 모바일 반응형 네비게이션

## Exception Handling
- active state 미반영: usePathname()으로 현재 경로 매칭
- z-index 충돌: 모바일 메뉴 오버레이 z-50
