# Skill: Setup Project

## Task
Next.js 14 프로젝트 초기 세팅

## Steps
1. `pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
2. Inter, JetBrains Mono 폰트 설정 (next/font)
3. 다크모드 기본 테마: body background #0F1115
4. Tailwind 커스텀 색상 등록
5. content/, public/images/ 디렉토리 생성

## Input
- PRD guide.md
- 색상: BG #0F1115, Text #FFFFFF, Accent #5B8CFF, Secondary #8A8F98
- 폰트: Inter, JetBrains Mono

## Output
- 실행 가능한 Next.js 프로젝트
- pnpm dev로 기본 페이지 확인 가능

## Exception Handling
- Node.js < 18: 버전 업그레이드 안내
- pnpm 미설치: `npm install -g pnpm` 안내
- Tailwind 설정 실패: 수동 설정 fallback
