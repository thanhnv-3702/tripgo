# TripGo — Travel Tour Booking (FE + BE)

Monorepo cho Mock Project TripGo.

| Path | Stack |
| --- | --- |
| [`frontend/`](frontend/) | Next.js (App Router) + TypeScript + Tailwind |
| [`backend/`](backend/) | Spring Boot 3.4 + Java 17 + JPA |
| [`docker-compose.yml`](docker-compose.yml) | PostgreSQL 16 |

**Mentoring repo đích:** [`awesome-academy/thanh_neon_fe`](https://github.com/awesome-academy/thanh_neon_fe) (push khi có write).  
**Repo làm việc hiện tại:** `thanhnv-3702/tripgo`  
**Project board:** https://github.com/orgs/awesome-academy/projects/35  
**Tài liệu học:** thư mục `Mockproject/` trong workspace SLearn (REQUIREMENT, TICKETS, day-01…18).

## Quick start

### 1. Database (khuyến nghị Postgres)

Cần Docker:

```bash
docker compose up -d
```

Nếu chưa có Docker: BE mặc định dùng **H2 in-memory** (dev nhanh, không cần Postgres).

### 2. Backend

```bash
cd backend
./mvnw spring-boot:run
# hoặc với Postgres:
./mvnw spring-boot:run -Dspring-boot.run.profiles=postgres
```

Health: http://localhost:8080/api/health

### 3. Frontend

```bash
cd frontend
cp ../.env.example .env.local   # chỉnh NEXT_PUBLIC_API_BASE_URL nếu cần
npm install
npm run dev
```

App: http://localhost:3000

## Roadmap tickets

Xem Project #35 — `[T01]`…`[T13]` (Backlog). Thứ tự gợi ý: T01 docs → T02 FE layout → T03–T06 BE API → T07+ FE features.

## License

Educational / mentoring use.
