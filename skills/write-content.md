# Skill: Write Content

## Task
MDX 콘텐츠 작성

## Content Structure (PRD 기준)
각 글은 다음 구조를 따른다:
1. Problem - 문제 정의
2. System - 시스템 설계
3. Implementation - 구현 방법
4. Result - 결과
5. Insight - 인사이트

## Frontmatter Template
```yaml
---
title: ""
description: ""
category: "systems" | "experiments" | "insights"
date: "YYYY-MM-DD"
techStack: []
thumbnail: ""
featured: false
---
```

## Target Files
1. content/systems/marketing-intelligence-dashboard.mdx
2. content/systems/creator-scoring-algorithm.mdx
3. content/systems/market-monitoring-automation.mdx

## Exception Handling
- frontmatter 누락 시: 빌드 에러 -> 필수 필드 검증 스크립트
- 이미지 경로 오류: public/images/ 경로 확인
