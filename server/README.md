# Mustang Ball server

The backend for the Mustang Ball dashboard: a login-protected API that stores
the website's content in Postgres and lets signed-in editors update it. The
public site (in `../src`) fetches this content at runtime, so a save in the
dashboard is live on the website immediately — no rebuild or redeploy needed.

## Stack

- **Express** — HTTP API
- **PostgreSQL** + **Prisma** — content, users, and edit history
- **GitHub sign-in** — no passwords; a JWT the frontend stores itself and
  sends as a bearer token (see [Security model](#security-model))

## Local setup

You need a local Postgres. The quickest way, if you have Docker:

```bash
docker run --name mustang-ball-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=mustang_ball -p 5432:5432 -d postgres:16
```

You also need a GitHub OAuth App's client ID + secret — see
[Setting up GitHub sign-in](#setting-up-github-sign-in) below if you don't
have these yet.

Then, from `server/`:

```bash
npm install
cp .env.example .env
# edit .env: set DATABASE_URL to match the Postgres above, set a real
# JWT_SECRET, set GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET, and set
# SEED_ADMIN_EMAIL so the seed script allow-lists your first login.

npm run prisma:migrate:dev   # creates the tables
npm run db:seed              # loads the site's original content + your admin allow-list entry
npm run dev                  # starts the API on http://localhost:4000
```

In `../` (the frontend), make sure `.env` has:

```
VITE_API_URL=http://localhost:4000
VITE_GITHUB_CLIENT_ID=<same GitHub client ID as above>
```

(`VITE_API_URL` defaults to `http://localhost:4000` if unset, so it's
optional for local dev; the client ID is required for sign-in to work at
all). Then `npm run dev` in the project root as usual — the site and
dashboard (`/admin`) will now pull content from this server.

## Setting up GitHub sign-in

GitHub's OAuth flow is a redirect + authorization-code exchange (not a
self-contained token) — the backend exchanges the code for an access token
using a **client secret**, which must never reach the frontend.

1. [github.com/settings/developers](https://github.com/settings/developers)
   → OAuth Apps → New OAuth App.
2. **Homepage URL**: your site's URL.
3. **Authorization callback URL**: this app's OAuth callback page, e.g.
   `http://localhost:5173/mustang-ball-website/admin/oauth/github/callback`
   for local dev, or the equivalent production URL. GitHub OAuth Apps only
   allow **one** callback URL per app — see the note below about local vs.
   production.
4. Click **Register application**, then **Generate a new client secret**
   (shown once — copy it immediately).
5. Copy the client ID into `GITHUB_CLIENT_ID` (here) and
   `VITE_GITHUB_CLIENT_ID` (frontend `.env`); copy the secret into
   `GITHUB_CLIENT_SECRET` (here **only** — it never goes in the frontend
   `.env` or anywhere with a `VITE_` prefix, since anything with that
   prefix ships in the public JS bundle).

Because a GitHub OAuth App only supports one callback URL, register two
separate apps if you want both local dev and production sign-in working at
the same time (one with the `localhost:5173` callback, one with your
production callback), each with its own client ID/secret — or just
register one for production and skip testing sign-in locally.

## Content model

Every former `src/content/*.js` file became one row in the `content_blocks`
table: a `key` (`siteInfo`, `home`, `competitors`, etc.) and a `data` JSON
blob holding that module's exports. `server/prisma/seed-content/` still has
the original files — `npm run db:seed` reads them once to populate the
database on a fresh install. After that, they're inert; editing them does
nothing. All future edits go through the dashboard (`PUT /api/content/:key`),
which also writes the previous value to `content_revisions` before
overwriting, so nothing is lost if someone saves something wrong.

A handful of fields are rich-text-enabled, listed explicitly in
`src/lib/richTextFields.js` — deliberately an allowlist, not every string in
the block, since some existing content contains a literal `&` that would be
corrupted by running it through an HTML sanitizer unconditionally.
`richTextFields` (single-paragraph prose, e.g. `competitors.intro`) allows
bold/italic/links only; `richTextBlockFields` (multi-paragraph/bullet-list
content, e.g. `competitors.disclaimersHtml`) also allows `<p>/<ul>/<ol>/<li>`.
`PUT /api/content/:key` sanitizes exactly those fields
(`src/lib/sanitizeContent.js`) down to the matching allowlist before saving —
the trust boundary for content that later renders as HTML on the public
site, regardless of what the admin UI itself sent.

**One-time migration whenever a field is newly added to `richTextFields.js`
or `richTextBlockFields.js`** (or renamed, the way `competitors.disclaimers`
became `disclaimersHtml`): if that field already held plain text under its
old name, any literal `&`/`<`/`>` in it needs escaping once so it still
displays correctly once it starts rendering as HTML — the seed content for
the current rich fields has already been hand-escaped where needed (see
`disclaimersHtml` in `prisma/seed-content/competitors.js`, which contains a
literal `&`), so this only matters for *already-saved* dashboard edits, not
a fresh seed. Run it once, after deploying the schema/field change but
before (or right after) editors start using the new field:

```bash
node scripts/escape-existing-rich-fields.js
```

It's safe to re-run — it skips any field that already looks like it
contains real formatting.

Uploaded images (hero photos, cards, etc.) are stored as binary blobs in
the `images` table, not on disk — this Render web service has no
persistent disk, so anything written to local disk is lost on every
redeploy. `GET /api/images/:id` is public and streams the bytes with
`Cross-Origin-Resource-Policy: cross-origin` (needed since `helmet()`'s
default would otherwise block the frontend, on a different origin, from
loading them).

## API

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/health` | none | Liveness check |
| GET | `/api/content` | none | All content blocks, `{ key: data }` |
| GET | `/api/content/:key` | none | One content block |
| PUT | `/api/content/:key` | session | Replace a content block |
| GET | `/api/content/:key/revisions` | session | Last 20 saved-over versions |
| POST | `/api/images` | session | Upload an image (multipart, 5MB max) &rarr; `{ id }` |
| GET | `/api/images/:id` | none | The uploaded image's bytes |
| POST | `/api/auth/oauth/github` | none (rate-limited) | `{ credential }` (GitHub authorization code) &rarr; `{ token, user }` |
| GET | `/api/auth/me` | session | Current user |
| GET/POST/PATCH/DELETE | `/api/users` | admin only | Manage the sign-in allow-list |

## Security model

- **No passwords exist anywhere in this app.** Signing in means completing
  GitHub's own sign-in flow in the browser. The frontend only gets back an
  authorization code; the backend exchanges it server-side for an access
  token using the client secret and fetches the verified primary email
  from GitHub's API (`src/lib/github.js`). That email is checked against
  the `users` table, which acts purely as an email allow-list
  (`src/routes/auth.routes.js`) — a user not already added by an admin is
  rejected regardless of how legitimately they signed into GitHub.
- Sessions are a JWT the frontend stores itself (`localStorage`, see
  `src/api/client.js`) and sends back as `Authorization: Bearer <token>` —
  **not a cookie**. This app's frontend (GitHub Pages) and API (Render) are
  on different domains, and a cookie set by the API's response is scoped to
  the API's own origin — frontend JS on a different origin can never read
  it back to prove a session exists. Bearer tokens also sidestep browsers'
  growing restrictions on cross-site cookies (Safari ITP, Chrome's
  third-party-cookie phase-out), which broke real logins for real users in
  an earlier version of this app that used cookies. See `src/lib/jwt.js`.
- Because a bearer header (unlike a cookie) is never attached to a request
  automatically by the browser, a forged cross-site request simply can't
  include it — so there's no CSRF token to manage, unlike a cookie-based
  session would need.
- The OAuth verification endpoint is rate-limited (10 attempts / 15 min /
  IP) as a general abuse guard.
- CORS only allows the origins listed in `ALLOWED_ORIGINS` — never `*` —
  and `helmet()` sets standard security headers.
- Content blocks are validated as plain JSON objects with a 200KB cap, but
  are otherwise free-form — the dashboard trusts signed-in editors not to
  corrupt the shape a page expects. Only `admin`/`editor` accounts can write.

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
   - `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` — from
     [setting up sign-in](#setting-up-github-sign-in) above; make sure your
     production callback URL is registered, not just localhost (and see the
     note there about GitHub OAuth Apps only supporting one callback URL each)
   - `SEED_ADMIN_EMAIL` / `SEED_ADMIN_NAME` — your first dashboard login
     (no password needed — they'll sign in with GitHub themselves)
4. The build command (`npm run build && npm run db:seed`) loads the
   original site content and allow-lists that email automatically — no
   shell access needed, which matters because Render's Shell tab isn't
   available on the free plan. `db:seed` is idempotent for content (skips
   anything that already exists) and safely re-ensures the admin allow-list
   entry every deploy, so it's fine to leave in the build command
   permanently.
5. In your GitHub repo, add these Actions secrets so the deploy workflow
   bakes them into the built frontend: `VITE_API_URL` (your Render
   service's URL, e.g. `https://mustang-ball-api.onrender.com`) and
   `VITE_GITHUB_CLIENT_ID`. (The EmailJS secrets from the main README need
   to be set the same way if you want the contact form to work in
   production.)

Render's free tier spins the service down when idle, so the first request
after a quiet period (including a dashboard sign-in) can take ~30-60s to
wake up.

## Adding more editors/admins

The first login comes from the seed script. After that, sign in and use
**Users** in the dashboard (admin role required) to allow-list more
emails — no server access needed, and no password to set. Whoever you add
signs in themselves with their own GitHub account the first time they
visit `/admin`; their name/role/status can be managed from that same table.

## Migrations

Schema changes go through Prisma migrations. After editing
`prisma/schema.prisma`:

```bash
npm run prisma:migrate:dev -- --name describe_the_change
```

commit the generated `prisma/migrations/...` folder, and Render will run
`prisma migrate deploy` automatically as part of `npm run build` on the next
deploy.
