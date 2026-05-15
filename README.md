# HanaLoop Carbon Emission Dashboard

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

## 개발하면서 기록한 내용
https://spark-fossa-b2a.notion.site/35eff317bebd809c843fe47b6c941084?pvs=74
