# Solution Registry

솔루션 프로젝트의 경로, 문서 위치, 별칭을 정의하는 참조 테이블.
블로그 포스트 생성 시 대상 솔루션을 식별하고 탐색 경로를 안내한다.

## 솔루션 목록

| 솔루션 | 별칭 | 프로젝트 루트 | 스택 |
|--------|------|-------------|------|
| ONE STOCK | 원스톡, onestock | `C:\Users\user\.gemini\antigravity\skill\` | React, TS, Express, SQLite, MCP, Gemini |
| SIGNAL | 시그널, signal | `C:\Users\user\.gemini\antigravity\signal\` | React, Vite, Express, Playwright, Gemini |
| 올리브영 모니터 | OY모니터, oliveyoung | `C:\Users\user\.gemini\antigravity\oliveyoung-monitor\` | Python, Selenium, Pandas, GSheets |
| TubeScout | 튜브스카우트, tubescout | `C:\Users\user\.gemini\antigravity\tubescout-main\` | Chrome Extension, TypeScript, YouTube API |

## 문서 경로

### ONE STOCK
- CLAUDE.md: `C:\Users\user\.gemini\antigravity\skill\CLAUDE.md`
- MEMORY.md: `C:\Users\user\.claude\projects\C--Users-user--gemini-antigravity-jsy1-0-onestock\memory\MEMORY.md`
- 사업계획서 CLAUDE.md: `C:\Users\user\.gemini\antigravity\jsy1.0-onestock\CLAUDE.md`

### SIGNAL
- CLAUDE.md: `C:\Users\user\.gemini\antigravity\signal\CLAUDE.md`
- MEMORY.md: `C:\Users\user\.claude\projects\C--Users-user--gemini-antigravity-signal\memory\MEMORY.md`

### 올리브영 모니터
- CLAUDE.md: `C:\Users\user\.gemini\antigravity\oliveyoung-monitor\CLAUDE.md`
- MEMORY.md: `C:\Users\user\.claude\projects\C--Users-user--gemini-antigravity-oliveyoung-monitor\memory\MEMORY.md`

### TubeScout
- CLAUDE.md: 없음
- MEMORY.md: 없음
- manifest.json: `C:\Users\user\.gemini\antigravity\tubescout-main\manifest.json`
- 참고: Chrome Extension (Manifest V3), YouTube 채널 성과 분석 도구

## MDX Slug 매핑

| 솔루션 | 추천 slug | 기존 stub 매핑 |
|--------|----------|---------------|
| ONE STOCK | `onestock-ai-production-intelligence` | TBD (사용자 지정) |
| SIGNAL | `signal-bi-dashboard` | TBD (사용자 지정) |
| 올리브영 모니터 | `oliveyoung-market-monitoring` | TBD (사용자 지정) |
| TubeScout | `tubescout-youtube-analytics` | TBD (사용자 지정) |

### 기존 stub 파일 (ai-systems)
- `creator-scoring-algorithm.mdx` → 매핑: TBD
- `marketing-intelligence-dashboard.mdx` → 매핑: TBD
- `market-monitoring-automation.mdx` → 매핑: TBD

> 실제 포스트 생성 시 사용자에게 "기존 slug 유지 vs 새 slug" 확인

## 사용법

솔루션 식별 시 별칭을 기반으로 매칭:
- "원스톡에 대해 포스팅해줘" → ONE STOCK
- "시그널 글 써줘" → SIGNAL
- "올리브영 모니터링 포스팅" → 올리브영 모니터
- "튜브스카우트 소개 글" → TubeScout
