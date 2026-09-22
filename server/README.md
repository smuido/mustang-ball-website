# Mustang Ball server

The backend for the Mustang Ball dashboard: a login-protected API that stores
the website's content in Postgres and lets signed-in editors update it. The
public site (in `../src`) fetches this content at runtime, so a save in the
dashboard is live on the website immediately — no rebuild or redeploy needed.

## Stack

- **Express** — HTTP API
- **PostgreSQL** + **Prisma** — content, users, and edit history
- **JWT in an httpOnly cookie** — sessions, with a double-submit CSRF token
  (see [Security model](#security-model))
- **bcryptjs** — password hashing

## Local setup

You need a local Postgres. The quickest way, if you have Docker:

```bash
docker run --name mustang-ball-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=mustang_ball -p 5432:5432 -d postgres:16
```

Then, from `server/`:

```bash
npm install
cp .env.example .env
# edit .env: set DATABASE_URL to match the Postgres above, set a real
# JWT_SECRET, and set SEED_ADMIN_EMAIL/SEED_ADMIN_PASSWORD so the seed
# script can create your first login.

npm run prisma:migrate:dev   # creates the tables
npm run db:seed              # loads the site's original content + your admin user
npm run dev                  # starts the API on http://localhost:4000
```

In `../` (the frontend), make sure `.env` has:

```
VITE_API_URL=http://localhost:4000
```

(this is the default if unset, so it's optional for local dev). Then
`npm run dev` in the project root as usual — the site and dashboard
(`/admin`) will now pull content from this server.

## Content model

Every former `src/content/*.js` file became one row in the `content_blocks`
table: a `key` (`siteInfo`, `home`, `competitors`, etc.) and a `data` JSON
blob holding that module's exports. `server/prisma/seed-content/` still has
the original files — `npm run db:seed` reads them once to populate the
database on a fresh install. After that, they're inert; editing them does
nothing. All future edits go through the dashboard (`PUT /api/content/:key`),
which also writes the previous value to `content_revisions` before
overwriting, so nothing is lost if someone saves something wrong.

## API

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/health` | none | Liveness check |
| GET | `/api/content` | none | All content blocks, `{ key: data }` |
| GET | `/api/content/:key` | none | One content block |
| PUT | `/api/content/:key` | session + CSRF | Replace a content block |
| GET | `/api/content/:key/revisions` | session | Last 20 saved-over versions |
| POST | `/api/auth/login` | none (rate-limited) | `{ email, password }` &rarr; sets cookies |
| POST | `/api/auth/logout` | none | Clears cookies |
| GET | `/api/auth/me` | session | Current user |
| GET/POST/PATCH/DELETE | `/api/users` | admin only | Manage dashboard logins |

## Security model

- Passwords are hashed with bcrypt (cost 12); the API never returns a
  password hash.
- Sessions are a JWT in an `httpOnly`, `Secure`, `SameSite=None` cookie.
  `SameSite=None` is required because the frontend (GitHub Pages) and this
  API (Render) are different origins — `SameSite=Lax` would silently break
  cross-origin `fetch` calls.
- Because `SameSite=None` cookies are sent on cross-site requests too, the
  API also requires a `X-CSRF-Token` header on every state-changing request,
  matching a token issued at login (double-submit pattern): the token is
  embedded in the JWT and also set in a second, **non**-httpOnly cookie the
  frontend can read and echo back as a header. A malicious site can trigger
  a cross-site request that carries the cookies, but the same-origin policy
  stops it from *reading* that second cookie's value, so it can't produce a
  matching header. See `src/lib/jwt.js` and `src/middleware/auth.js`.
- `/api/auth/login` is rate-limited (10 attempts / 15 min / IP).
- CORS only allows the origins listed in `ALLOWED_ORIGINS` — never `*` —
  and `helmet()` sets standard security headers.
- Content blocks are validated as plain JSON objects with a 200KB cap, but
  are otherwise free-form — the dashboard's editor is a raw JSON editor, so
  it trusts signed-in editors not to corrupt the shape a page expects. Only
  `admin`/`editor` accounts can write.

## Deploying to Render

This repo includes a `render.yaml` blueprint (in the repo root) that
provisions a free Postgres database and a Node web service for this
`server/` folder.

1. In the Render dashboard: **New > Blueprint**, point it at this repo.
2. Render will create `mustang-ball-db` and `mustang-ball-api`. `DATABASE_URL`
   and `JWT_SECRET` are wired automatically.
3. Set these env vars on `mustang-ball-api` before the first deploy finishes:
   - `ALLOWED_ORIGINS` — your deployed frontend's origin, e.g.
     `https://<github-username>.github.io` (comma-separate if you also want
     to allow `http://localhost:5173`)
   - `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` / `SEED_ADMIN_NAME` — your
     first dashboard login
4. The build command (`npm run build && npm run db:seed`) loads the
   original site content and creates that login automatically — no shell
   access needed, which matters because Render's Shell tab isn't available
   on the free plan. `db:seed` is idempotent (it skips anything that
   already exists), so it's safe to leave in the build command permanently
   and it won't touch your data on later deploys.
   
   If you'd rather not leave the seed password sitting in Render's config
   indefinitely: once you've confirmed you can log in, delete the three
   `SEED_ADMIN_*` env vars and trigger **Manual Deploy → Deploy latest
   commit** from the Render dashboard (free, no shell needed) to redeploy
   without them.
5. In your GitHub repo, add a `VITE_API_URL` Actions secret set to the
   Render service's URL (e.g. `https://mustang-ball-api.onrender.com`), so
   the deploy workflow bakes it into the built frontend. (The EmailJS
   secrets from the main README need to be set the same way if you want the
   contact form to work in production.)

Render's free tier spins the service down when idle, so the first request
after a quiet period (including a dashboard login) can take ~30-60s to wake
up.

## Adding more editors/admins

The first login comes from the seed script. After that, sign in and use
**Users** in the dashboard (admin role required) to add more accounts — no
server access needed.

## Migrations

Schema changes go through Prisma migrations. After editing
`prisma/schema.prisma`:

```bash
npm run prisma:migrate:dev -- --name describe_the_change
```

commit the generated `prisma/migrations/...` folder, and Render will run
`prisma migrate deploy` automatically as part of `npm run build` on the next
deploy.
