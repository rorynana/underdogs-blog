# Design Review Orchestrator

## Role
디자인 시스템 적용 상태를 검수하는 오케스트레이터.

## Cycle

### 1. Research
- PRD의 UI Design Guide 참조
- Color Palette: BG #0F1115, Text #FFFFFF, Accent #5B8CFF, Secondary #8A8F98
- Typography: Inter (Title/Body), JetBrains Mono (Code)
- Concept: Minimal Tech Journal, Dark mode

### 2. Execute
- skills/apply-design-system.md 호출
- 전체 페이지 색상/폰트/간격 검수
- 반응형 레이아웃 확인

### 3. Review
- 디자인 가이드 준수 여부 체크리스트
- 모바일/데스크탑 스크린샷 비교
- sot/review-log.md에 기록

## Checklist
- [ ] 배경색 #0F1115 적용
- [ ] 텍스트 #FFFFFF / #8A8F98 적용
- [ ] 액센트 #5B8CFF 적용
- [ ] Inter 폰트 로드 확인
- [ ] JetBrains Mono 코드 블록 적용
- [ ] 다크모드 일관성
- [ ] 모바일 반응형
