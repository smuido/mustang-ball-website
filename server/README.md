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
  matching a token issued at login. That token travels in the login/`/me`
  **response body**, not a second cookie — a double-submit cookie doesn't
  work here because the frontend and API are on different domains, so a
  cookie set by the API's response is scoped to the API's own origin and
  frontend JS can never read it back via `document.cookie` to echo it as a
  header (this was a real bug in an earlier version of this app: every save
  failed with "Invalid CSRF token" because of exactly that). The frontend
  keeps the token in memory (`src/api/client.js`) instead. A forged
  cross-site request can still carry the auth cookie, but the attacking page
  can't read the response body needed to get a valid token, because CORS
  only allows reading responses from origins in `ALLOWED_ORIGINS`. See
  `src/lib/jwt.js` and `src/middleware/auth.js`.
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

## Resetting a forgotten password (no shell needed)

If you're locked out (forgot the password and there's no other admin
account to fix it from the dashboard), the seed script can force a reset —
the same mechanism that creates the first login, extended with an opt-in
flag so it never resets a password by accident on a normal deploy:

1. On the Render service (`mustang-ball-api`) → **Environment**, set:
   - `SEED_ADMIN_EMAIL` → the account's email
   - `SEED_ADMIN_PASSWORD` → the new password
   - `SEED_ADMIN_RESET_PASSWORD` → `true`
2. Saving triggers a redeploy automatically (or use **Manual Deploy** if
   needed) — this reruns `npm run db:seed`, which now updates that
   account's password instead of skipping it.
3. Confirm you can log in with the new password.
4. Delete `SEED_ADMIN_RESET_PASSWORD` (and the other two, if you don't want
   the password sitting in Render's config) and redeploy once more. This
   step matters more than it does for the initial setup: as long as
   `SEED_ADMIN_RESET_PASSWORD=true` is set, *every* deploy will reset that
   account's password back to `SEED_ADMIN_PASSWORD`, silently undoing any
   password change made later through the dashboard.

## Migrations

Schema changes go through Prisma migrations. After editing
`prisma/schema.prisma`:

```bash
npm run prisma:migrate:dev -- --name describe_the_change
```

commit the generated `prisma/migrations/...` folder, and Render will run
`prisma migrate deploy` automatically as part of `npm run build` on the next
deploy.
