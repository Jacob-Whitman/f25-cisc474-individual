# Database — Local development and seeding

This folder contains the Prisma schema and a seeding script used by the LMS project.

Quick steps (assumes you have a Postgres instance available and `DATABASE_URL` set):

1. Install dependencies (if needed)

```bash
cd packages/database
npm install
```

2. Generate the Prisma client

```bash
cd packages/database
npx prisma generate --schema=prisma/schema.prisma
```

3a. Use migrations (recommended for development)

```bash
# Creates a migration and applies it to the database
npx prisma migrate dev --name init --schema=prisma/schema.prisma
```

3b. Or push the current schema to the DB (non-destructive where possible)

```bash
npx prisma db push --schema=prisma/schema.prisma
```

4. Seed the database

The seeding script is `src/seed.ts`. It expects `DATABASE_URL` to be available in the environment. Create a `.env` file in `packages/database` or export `DATABASE_URL` in your shell.

```bash
# If you have a .env file in packages/database
cd packages/database
npx ts-node --transpile-only -r dotenv/config src/seed.ts

# Or if you prefer to run the built JS (after building)
node ./dist/seed.js
```

Docker-based quickstart (spins up a local Postgres container)

```bash
# Run Postgres in Docker
docker run --name lms-postgres -e POSTGRES_PASSWORD=pass -e POSTGRES_USER=user -e POSTGRES_DB=lms -p 5432:5432 -d postgres:15
export DATABASE_URL="postgresql://user:pass@localhost:5432/lms?schema=public"
cd packages/database
npx prisma migrate dev --name init --schema=prisma/schema.prisma
npx ts-node --transpile-only -r dotenv/config src/seed.ts
```

Notes
- The seeding script is idempotent where possible (uses `upsert` on unique fields).
- If you use a remote DB (e.g., Supabase), ensure your connection string is placed into `packages/database/.env` or exported into your shell.
- If `prisma db push` warns about destructive changes, prefer `prisma migrate dev` in development so you can manage migrations and avoid accidental data loss.

Adding a convenience npm script

You can add these scripts to `packages/database/package.json` for convenience:

```json
"scripts": {
  "prisma:generate": "prisma generate --schema=prisma/schema.prisma",
  "prisma:migrate": "prisma migrate dev --schema=prisma/schema.prisma",
  "prisma:push": "prisma db push --schema=prisma/schema.prisma",
  "seed": "ts-node --transpile-only -r dotenv/config src/seed.ts"
}
```

Troubleshooting
- `Environment variable not found: DATABASE_URL` — ensure `.env` exists or `DATABASE_URL` is exported.
- `Column does not exist` errors — run `npx prisma db push` or `npx prisma migrate dev` to sync the schema before seeding.

If you want, I can add the npm scripts to `packages/database/package.json` for you.
