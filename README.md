# HanaLoop Carbon Emission Dashboard

조직 계층 구조 기반으로 Scope1 / Scope2 / Scope3 탄소 배출량을 집계·시각화하고, 배출 레코드와 배출 계수를 관리하는 ESG 대시보드입니다.

---

## Preview

### Dashboard

KPI 카드, Scope별 차트, 월별 추이, 탄소세 예측, 조직 계층 Drill-down을 한 화면에서 확인합니다.

![Dashboard](./public/images/dashboard.png)

### Group Management

조직 그룹 CRUD, 최상위/하위 필터, 정렬, 검색, 페이지네이션이 적용된 목록 테이블입니다.

![Groups](./public/images/groups.png)

### Emission Records

배출 레코드 CRUD, Scope·그룹 필터, 환산 배출량(활동량 × 배출 계수) 조회를 지원합니다.

![Records](./public/images/records.png)

### Emission Factors

배출 계수 CRUD, 분류별 필터, 정렬, 검색 기능을 제공합니다.

![Emission Factors](./public/images/emission-factors.png)

---

## Features

### Dashboard (`/`)

- **KPI 카드:** 총 배출량, 예상 탄소세, 관리 그룹 수, 리스크 레벨
- **차트 (Recharts):**
  - 월별 탄소 배출량 (Scope 스택 바)
  - Scope별 배출 추이 (라인)
  - Scope 비율 (파이)
  - 배출 계수 분류별 배출량 (파이)
  - 월별 예상 탄소세 (라인)
  - 하위 그룹 Top N 배출량 (바)
- **조직 계층 Drill-down:** 그룹 트리에서 직접/하위/합산 배출량 탐색
- **탄소세 계산:** `배출량 × 14,500원` (`lib/shared/carbonTax.ts`)
- **리스크 레벨:** 배출량 기준 LOW / MEDIUM / HIGH / CRITICAL

### Group Management (`/group`)

- 그룹 생성·수정·삭제 (모달 + React Hook Form)
- 상위 그룹 선택 (`GroupListPicker`)
- 요약 카드: 전체 / 최상위 / 하위 그룹 수
- 테이블: 검색, 필터(그룹 유형), 정렬, 페이지네이션 (10건/페이지)

### Emission Records (`/records`)

- 배출 레코드 CRUD (그룹 + 배출 계수 + Scope 연결)
- 환산 배출량 자동 계산 (`amount × factor`)
- 요약 카드: 레코드 수, 총 환산 배출량, Scope별 건수
- 테이블: 검색, 필터(Scope·그룹), 정렬, 페이지네이션

### Emission Factors (`/emission-factors`)

- 배출 계수 CRUD
- 분류: 전기, 가스, 연료, 열/스팀, 운송, 폐기물
- 레코드에서 참조 중인 계수는 삭제 불가 (FK RESTRICT)
- 테이블: 검색, 필터(분류), 정렬, 페이지네이션

### 공통 UI/UX

- 사이드바 네비게이션 + 모바일 반응형 레이아웃
- Notion 스타일 필터·정렬 팝오버
- 로딩 스켈레톤, 에러 상태, Toast 알림 (Sonner)
- OpenAPI 문서: [`/api-docs`](http://localhost:3000/api-docs)

---

## Tech Stack

| 구분 | 기술 |
| --- | --- |
| Framework | Next.js 16 (App Router, standalone) |
| UI | React 19, TypeScript, Tailwind CSS v4 |
| Data Fetching | TanStack Query |
| Forms | React Hook Form + Zod |
| ORM / DB | Drizzle ORM, PostgreSQL 16 |
| Charts | Recharts |
| Client State | Zustand |
| API Docs | `@asteasolutions/zod-to-openapi`, Swagger UI |
| DevOps | Docker, Docker Compose |

---

## System Architecture

```txt
Browser (Next.js Client)
    │
    ├── Dashboard / Group / Records / Emission Factors
    │
    ▼
Next.js Route Handlers (/app/api)
    │
    ├── Zod Validation
    ├── Service Layer (lib/server/services)
    │
    ▼
PostgreSQL (Drizzle ORM)
```

---

## Database Design

ERD: [dbdiagram.io](https://dbdiagram.io/d/Hanaloop-6a1bc4582eeb2f46cd24aa70)

![Database ERD](./public/images/erd.png)

Docker 실행 시 `lib/server/db/init.sql`이 자동 적용됩니다.

### groups

조직 계층 구조 (self-referential).

```sql
CREATE TABLE groups (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id BIGINT REFERENCES groups(id) ON DELETE SET NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

### emission_factors

활동량에 곱하는 배출 계수.

```sql
CREATE TABLE emission_factors (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    factor NUMERIC(15, 6) NOT NULL,
    input_unit VARCHAR(50) NOT NULL,
    output_unit VARCHAR(50) NOT NULL DEFAULT 'kgCO2e',
    description VARCHAR(500),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

### emission_records

그룹별 배출 활동 기록.

```sql
CREATE TABLE emission_records (
    id BIGSERIAL PRIMARY KEY,
    group_id BIGINT NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    emission_factor_id BIGINT NOT NULL REFERENCES emission_factors(id) ON DELETE RESTRICT,
    scope_type VARCHAR(20) NOT NULL CHECK (scope_type IN ('SCOPE1', 'SCOPE2', 'SCOPE3')),
    amount NUMERIC(15, 2) NOT NULL,
    unit VARCHAR(20) NOT NULL DEFAULT 'tCO2e',
    recorded_at DATE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

### Seed Data

- **29개** 조직 그룹 (HanaLoop Holdings 하위 다단계 계층)
- **10개** 배출 계수 (전기, 가스, 연료, 열/스팀, 운송, 폐기물 등)
- **약 40건** 배출 레코드 (2026년 1~6월, 다양한 Scope·그룹·계수)

### Index

```sql
CREATE INDEX idx_emission_factors_category ON emission_factors(category);
CREATE INDEX idx_emission_records_group_id ON emission_records(group_id);
CREATE INDEX idx_emission_records_emission_factor_id ON emission_records(emission_factor_id);
CREATE INDEX idx_emission_records_recorded_at ON emission_records(recorded_at);
CREATE INDEX idx_emission_records_scope_type ON emission_records(scope_type);
```

---

## Scope Strategy

| Scope | 설명 |
| --- | --- |
| Scope1 | 직접 배출 (연료 연소 등) |
| Scope2 | 전력·열 등 구매 에너지 간접 배출 |
| Scope3 | 공급망 및 기타 간접 배출 |

---

## Folder Structure

```txt
app/
 ├── page.tsx                    # Dashboard
 ├── group/page.tsx              # Group management
 ├── records/page.tsx            # Emission records
 ├── emission-factors/page.tsx   # Emission factors
 ├── api-docs/page.tsx           # Swagger UI
 └── api/                        # Route handlers

components/
 ├── dashboard/                  # Charts, stat cards, hierarchy
 ├── groups/                     # Group CRUD UI
 ├── records/                    # Record CRUD UI
 ├── emission-factors/           # Factor CRUD UI
 ├── layout/                     # Shell, pagination, toolbar, skeletons
 │   └── notion/                 # Filter/sort popover UI
 └── icons/sidebar/

lib/
 ├── client/api/                 # Fetch wrappers
 ├── client/types/               # Response types
 ├── server/services/            # Business logic
 ├── server/schema/              # Zod validation
 ├── server/db/                  # Drizzle schema, init.sql
 ├── server/openapi/             # OpenAPI definitions
 └── shared/                     # carbonTax, pagination, tableSort, matchesSearch

hooks/usePagination.ts
stores/useMenuStore.ts           # Mobile sidebar state
public/images/                   # Screenshots, ERD
```

---

## API Reference

OpenAPI 스펙: `GET /api/docs` · Swagger UI: `/api-docs`

### Groups

| Method | Path | 설명 |
| --- | --- | --- |
| GET | `/api/groups` | 그룹 목록 |
| POST | `/api/groups` | 그룹 생성 |
| GET | `/api/groups/:id` | 그룹 단건 조회 |
| PATCH | `/api/groups/:id` | 그룹 수정 |
| DELETE | `/api/groups/:id` | 그룹 삭제 |

### Emission Records

| Method | Path | 설명 |
| --- | --- | --- |
| GET | `/api/emission-records` | 레코드 목록 (환산 배출량 포함) |
| POST | `/api/emission-records` | 레코드 생성 |
| GET | `/api/emission-records/:id` | 레코드 단건 조회 |
| PATCH | `/api/emission-records/:id` | 레코드 수정 |
| DELETE | `/api/emission-records/:id` | 레코드 삭제 |

### Emission Factors

| Method | Path | 설명 |
| --- | --- | --- |
| GET | `/api/emission-factors` | 배출 계수 목록 |
| POST | `/api/emission-factors` | 배출 계수 생성 |
| PUT | `/api/emission-factors/:id` | 배출 계수 수정 |
| DELETE | `/api/emission-factors/:id` | 배출 계수 삭제 |

### Dashboard

| Method | Path | 설명 |
| --- | --- | --- |
| GET | `/api/dashboard/summary` | 전체 요약 (Scope 합계, 탄소세, 리스크) |
| GET | `/api/dashboard/monthly` | 월별 Scope 배출량 |
| GET | `/api/dashboard/category` | 배출 계수 분류별 배출량 |
| GET | `/api/dashboard/hierarchy/:id` | 조직 계층별 배출량 트리 |

---

## Getting Started

### Docker (권장)

```bash
git clone https://github.com/ashveil-dev/hanaloop
cd hanaloop
docker compose up --build
```

| URL | 설명 |
| --- | --- |
| http://localhost:3000 | 대시보드 |
| http://localhost:3000/group | 그룹 관리 |
| http://localhost:3000/records | 배출 레코드 |
| http://localhost:3000/emission-factors | 배출 계수 |
| http://localhost:3000/api-docs | Swagger UI |

PostgreSQL: `localhost:5432` · user `postgres` · password `hanaloop` · db `hanaloop`

### Local Development

```bash
# DB만 Docker로 실행
docker compose up db

# 환경 변수 설정
# DATABASE_URL=postgresql://postgres:hanaloop@localhost:5432/hanaloop

npm install
npm run dev
```

### Scripts

| Command | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 |
| `npm run lint` | ESLint |

README 스크린샷 재생성:

```bash
node scripts/capture-screenshots.mjs
```

---

## Future Improvements

- ESG Report Export (회사별 보고서 형식)
- CSV / Excel Export
- 실시간 데이터 분석
- AI 기반 탄소 분석
- 권한(Role) 및 로그인 인증
- 그룹별 접근 제한 (멀티 테넌트)
- 서버 사이드 필터·정렬·검색 (대용량 데이터 대응)

---

## Repository

https://github.com/ashveil-dev/hanaloop
