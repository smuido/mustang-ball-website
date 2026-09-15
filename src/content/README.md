# Editing this website's content

Everything a non-developer would ever want to change — dates, prices, ticket
links, page text, the dance-style table, contact info — lives in this
`src/content/` folder. **You should never need to open a `.jsx` or `.css`
file just to update text, a date, or a link.**

## How to make a change

1. Open the file for the page you want to change (see the list below).
2. Find the text or value you want to update. It'll be inside quotes, like
   `'Tickets & Admission'`.
3. Type your new text between the same quotes. Don't delete the quotes
   themselves, and don't remove any commas at the end of a line.
4. Save the file. If you're running the site locally (`npm run dev`), the
   page updates automatically. If the site is deployed, someone will need to
   rebuild/redeploy it (ask your developer how that's set up).

**Rule of thumb:** if it's plain English text inside quotes, it's safe to
edit. Everything else (the `export const`, curly braces `{ }`, square
brackets `[ ]`) is structure — leave that alone.

## Where things live

| File | What it controls |
|---|---|
| `siteInfo.js` | The event name, year, dates, venue, contact email, and every registration/ticket/social link. **Most pages pull from here**, so updating a link here updates it everywhere it appears. |
| `navigation.js` | The links in the top menu bar and the footer's "Explore" column. |
| `home.js` | Text on the home page: the hero announcement, the intro paragraphs, the "Spectator Tickets" callout, and the four cards at the bottom. |
| `competitors.js` | Every section of the Competitor Guide page (Events, Eligibility, Registration & Fees, etc.) and the fine-print disclaimers. |
| `spectators.js` | Every section of the Spectators page: ticket tiers, ticket prices, the spectator guide, competition levels, and the FAQ. |
| `danceStyles.js` | The 5-style dance table. It's shared by both the Competitors and Spectators pages, so you only ever need to update it in one place. |
| `contact.js` | The intro text on the Contact page and the list of social links shown there. |
| `ourHistory.js` | Text on the Our History page: the intro, the milestones timeline (add a new entry each year, oldest first), and the "In the Press" links and video. |
| `pastEvents.js` | The list of past competitions (year, "Nth Annual" title, and dates) shown in the Past Events archive, plus the photos in the Past Events slideshow. |
| `mustangball.js` | Historical staff/judge records for each past year. There's a comment at the top of that file explaining how to add a new year. |

## A couple of things that aren't in here on purpose

- **Photos** still need to be added by a developer — dropping a new image
  into `src/assets/` and wiring it into a page involves code (importing the
  file, choosing where it's cropped). The one exception is the Past Events
  slideshow: once a developer has added a photo, you can still edit its
  caption or reorder it in `pastEvents.js`.
- **The contact form** (`src/pages/contact.jsx`) has some logic for sending
  email that isn't plain text content, so it stays in that file.
