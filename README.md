# Mustang Ball

The official website for **Mustang Ball**, Cal Poly Ballroom's annual ballroom dancesport competition. It's a React site with pages for competitors, spectators, event history, and contact info, deployed automatically to GitHub Pages — plus a login-protected dashboard (`/admin`) for editing the site's content, backed by the API in [`server/`](server/README.md).

## Tech stack

**Frontend**
- **React 19** with **React Router 7** for client-side routing
- **Vite 8** for dev server and bundling
- **EmailJS** to send the contact form without a backend
- **ESLint 9** for linting
- Plain CSS (one stylesheet per page/component, no CSS framework)

**Backend** (see [`server/README.md`](server/README.md) for full details)
- **Express** API, **PostgreSQL** + **Prisma** for storage
- JWT (httpOnly cookie) + CSRF-protected sessions, bcrypt-hashed passwords
- Deployed separately (e.g. Render); the frontend fetches content from it at runtime

## Project structure

```
src/
├── main.jsx                # App entry point
├── App.jsx                 # Top-level routing: public site vs. /admin
├── PublicSite.jsx           # The public site's layout + routes
├── pages/                   # One .jsx + .css per public route
│   ├── home.jsx
│   ├── competitors.jsx
│   ├── spectators.jsx
│   ├── past-events.jsx
│   ├── our-history.jsx
│   └── contact.jsx
├── components/               # Shared UI (NavBar, TopBar, Footer, Slideshow, DanceStyleTable)
├── content/ContentContext.jsx # Fetches all page content from the API at startup
├── api/client.js             # Fetch wrapper (cookies + CSRF header)
├── auth/AuthContext.jsx      # Dashboard session state
├── admin/                    # The /admin dashboard (login, page list, JSON editor, users)
└── assets/                   # Images and PDFs (past results, photos, logos)

server/                       # Express + Postgres API — see server/README.md
```

## Editing site content

Page text, dates, prices, links, and the dance-style table all live in the
database now, not in this repo. To change them: sign in at `/admin` (ask
whoever manages the site for a login, or see
[`server/README.md`](server/README.md#adding-more-editorsadmins) to create
one) and edit the relevant page there — changes are live as soon as you
save, no deploy required.

The one exception is **photos**: adding a new one still needs a developer
(importing the file into `src/assets/` and wiring it into a page).

### Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/competitors` | Competitor guide (events, eligibility, registration & fees) |
| `/spectators` | Spectator guide (tickets, competition levels, FAQ) |
| `/past-events` | Archive of past competitions + photo slideshow |
| `/our-history` | Team history, milestones timeline, press coverage |
| `/contact` | Contact form (EmailJS) + social links |

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 22.x (matches the version used in CI)
- npm

### Install

```bash
npm install
```

### Configure environment variables

Copy `.env.example` to `.env` in the project root and fill it in:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_API_URL=http://localhost:4000
```

The EmailJS keys power the contact form; without them the site still runs, but submitting the form shows a "not configured" message instead of sending an email. `VITE_API_URL` points the site at the backend (see below) — it defaults to `http://localhost:4000` if unset. `.env` is gitignored — never commit it.

### Run the backend

The site fetches all of its page content from the API in [`server/`](server/README.md) — without it running, the site will sit on a loading screen. Follow [`server/README.md`](server/README.md#local-setup) to set up Postgres and start it (`npm run dev` inside `server/`), **before** starting the frontend below.

### Run the dev server

```bash
npm run dev
```

Opens the site locally with hot reload. Sign in at `/admin` to edit page content (see [`server/README.md`](server/README.md#adding-more-editorsadmins) for creating a login).

### Lint

```bash
npm run lint
```

### Build for production

```bash
npm run build
```

Outputs static files to `dist/`.

### Preview the production build

```bash
npm run preview
```

## Deployment

Pushes to `main` automatically deploy to **GitHub Pages** via [`.github/workflows/deploy.yaml`](.github/workflows/deploy.yaml):

1. Install dependencies, lint, and build.
2. Copy `dist/index.html` to `dist/404.html` so client-side routes (e.g. `/competitors`) work on direct load/refresh, since GitHub Pages has no server-side fallback.
3. Deploy the `dist/` output to Pages.

Pull requests trigger the lint/build check only — they are never deployed automatically.

Because the site is served from a GitHub Pages project path rather than the domain root, [`vite.config.js`](vite.config.js) sets `base: '/mustang-ball-website/'` so built asset paths resolve correctly. Update this if the repository name changes.

The build step needs four GitHub Actions secrets (Settings &rarr; Secrets and variables &rarr; Actions): `VITE_API_URL` (your deployed backend's URL — see [`server/README.md`](server/README.md#deploying-to-render)) and the three `VITE_EMAILJS_*` keys for the contact form. Vite bakes these into the built JS at build time, so the site won't pick up a changed value until the next deploy.

The backend itself (`server/`) is a separate Node service and is **not** deployed by this workflow — see [`server/README.md`](server/README.md#deploying-to-render) for deploying it (e.g. to Render).
