# Portfolio database (local PostgreSQL)

## Architecture

```
Local PostgreSQL / Render Postgres
  → src/server/env.ts         load .env for server
  → src/server/db.ts          connection pool
  → src/server/migrate.ts     create tables + seed
  → src/server/content-db.ts  projects / experience CRUD
  → src/server/session.ts     admin cookie session
  → src/functions/content.ts  server RPCs
  → ContentProvider → Projects / Experience /admin
```

## Local setup (Windows, no Docker)

1. Install [PostgreSQL 16](https://www.postgresql.org/download/windows/) (password: `postgres`).
2. Create the database:

```powershell
& "C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres -c "CREATE DATABASE portfolio;"
```

3. `.env`:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/portfolio
DATABASE_SSL=false
ADMIN_PASSWORD=portfolio-admin-2025
ADMIN_SESSION_SECRET=your-32-char-minimum-secret-here!!!!
```

4. `npm run dev` → open `/admin` (password: `portfolio-admin-2025`).

Tables seed automatically on first request. Optional manual seed: `db/schema.sql`.

## Production (Render)

Set `DATABASE_URL`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET` on the web service. Do not set `DATABASE_SSL=false` in production.
