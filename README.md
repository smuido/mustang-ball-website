# Mustang Ball

The official website for **Mustang Ball**, Cal Poly Ballroom's annual ballroom dancesport competition. It's a static React site with pages for competitors, spectators, event history, and contact info, deployed automatically to GitHub Pages.

## Tech stack

- **React 19** with **React Router 7** for client-side routing
- **Vite 8** for dev server and bundling
- **EmailJS** to send the contact form without a backend
- **ESLint 9** for linting
- Plain CSS (one stylesheet per page/component, no CSS framework)

## Project structure

```
src/
├── main.jsx              # App entry point
├── App.jsx                # Route definitions
├── pages/                 # One .jsx + .css per route
│   ├── home.jsx
│   ├── competitors.jsx
│   ├── spectators.jsx
│   ├── past-events.jsx
│   ├── our-history.jsx
│   └── contact.jsx
├── components/             # Shared UI (NavBar, TopBar, Footer, Slideshow, DanceStyleTable)
├── content/                # All editable site text/data lives here — see below
└── assets/                 # Images and PDFs (past results, photos, logos)
```

### Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/competitors` | Competitor guide (events, eligibility, registration & fees) |
| `/spectators` | Spectator guide (tickets, competition levels, FAQ) |
| `/past-events` | Archive of past competitions + photo slideshow |
| `/our-history` | Team history, milestones timeline, press coverage |
| `/contact` | Contact form (EmailJS) + social links |

## Editing site content

**Almost everything on this site — dates, prices, ticket links, page text, the dance-style table, contact info — is data-driven from `src/content/`.** You should not need to touch a `.jsx` or `.css` file to update text, a date, or a link.

See [`src/content/README.md`](src/content/README.md) for the full guide, including a table of which file controls which page. The short version:

- `siteInfo.js` — event name, year, dates, venue, and every registration/ticket/social link. Most pages pull from here.
- `navigation.js` — nav bar and footer links.
- `home.js`, `competitors.js`, `spectators.js`, `contact.js`, `ourHistory.js`, `pastEvents.js` — per-page text content.
- `danceStyles.js` — the 5-style dance table, shared by the Competitors and Spectators pages.
- `mustangball.js` — historical staff/judge records by year.

Two things that intentionally live in code instead of `content/`: adding new **photos** (requires importing the file and wiring it into a page) and the **contact form's** submission logic (`src/pages/contact.jsx`).

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 22.x (matches the version used in CI)
- npm

### Install

```bash
npm install
```

### Configure environment variables

The contact form uses [EmailJS](https://www.emailjs.com/) to send messages client-side. Create a `.env` file in the project root:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Without these, the site still runs, but submitting the contact form shows a "not configured" message instead of sending an email. `.env` is gitignored — never commit it.

### Run the dev server

```bash
npm run dev
```

Opens the site locally with hot reload.

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

**Note:** the deploy workflow does not currently pass the `VITE_EMAILJS_*` secrets into the build, so the contact form may need those configured as GitHub Actions secrets/env vars for it to work in production.
