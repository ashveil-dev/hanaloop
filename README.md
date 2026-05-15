# HanaLoop Carbon Emission Dashboard

# Table of Contents
- [개요](#summary)
- [특징](#features)
- [실행](#run)
- [기술 스택](#tech-stack)
- [AI 활용하기](#using-ai)
- [개발하면서 기록한 내용](#notion)

# Summary
탄소 배출량 및 탄소세를 조직 계층 구조 기반으로 보여주는 대시보드입니다.

# Features

- 탄소 배출량을 기록할 수 있습니다.
- 각 회사의 그룹을 계층별로 등록할 수 있습니다.
- 전체 배출량, 그룹별 배출량, Scope별 배출량을 확인할 수 있습니다.
- 구간 별로 배출량의 위험도를 표시하였습니다.
- 반응형 디자인을 구현하여, 모바일에서도 사용 가능합니다.

# Run
```bash
git clone hanaloop
cd hanaloop

docker compose up --build
```

# Tech Stack
1. Frontend
   - Framework : Next.js
   - Type : Typescript
   - Style : Tailwindcss
2. Backend
   - Type Validation : zod
   - Database : pg, drizzle-orm
   - openAPI Docs : zod-to-openapi, swagger-ui-react
3. Dev Ops
   - Docker
5. Database
   - Postgres

# Using AI
1. SQL의 각 쿼리에서 성능 향상이나, 필요없는 부분을 생략하기 위하여 만든 Query를 다듬도록 요청
2. 처음 사용하는 패키지(Drizzle, Zod, Swagger-UI)에 대한 기본적인 코드와 예제 설명
3. Postgres에 대한 예제 코드
4. 프론트엔드 디자인 코드 (기획과 틀을 잡아놓고 이에 대한 디자인적인 코드 요청)

# Notion
https://spark-fossa-b2a.notion.site/35eff317bebd809c843fe47b6c941084?pvs=74
