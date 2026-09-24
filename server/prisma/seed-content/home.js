// Text shown on the home page. Dates, links, and the event name itself
// come from siteInfo.js so they only need to be updated in one place.
import siteInfo from './siteInfo.js';

export const hero = {
  eyebrow: 'Announcing',
  buttonLabel: 'Competitor Guide',
};

export const promoCard = {
  title: 'Spectator Tickets',
  text: 'General admission, VIP seating, and Cal Poly student pricing.',
  linkLabel: 'Learn More',
  to: '/spectators',
};

// Intro text shown under the main photo, edited as one rich-text block
// (see src/admin/pages/EditHome.jsx) rather than separate paragraph vars.
export const introHtml = '<p>The Central Coast collegiate DanceSport Competition — Mustang Ball began '
  + 'as a small competition with less than 100 competitors. Now, it hosts over 250 competitors '
  + "and is Cal Poly Ballroom's largest event of the year.</p>"
  + '<p>Mustang Ball is a Collegiate Dancesport Association (CDA) certified competition '
  + 'covering American, International, and Nightclub styles. Amateur couples from across '
  + 'the region compete for placements while a full house of spectators cheers them on.</p>';

// The final paragraph has a bold lead-in sentence, then a normal sentence
// after it. `strong` is composed from siteInfo so the year/ordinal stay in
// sync automatically when those change.
export const milestoneParagraph = {
  strong: `${siteInfo.eventYear} marks the ${siteInfo.eventOrdinal} Annual ${siteInfo.eventName}`,
  rest: ", continuing nearly two decades of competition hosted by the Cal Poly Ballroom Dance Club. "
    + "Whether you're stepping onto the floor or watching from the audience, we'd love to see you there!",
};

// The four cards under "Explore Mustang Ball".
export const quickLinksCtaLabel = 'View Details';

export const quickLinks = [
  {
    eyebrow: 'Competitors',
    description: 'Registration, eligibility, event schedules, and competition-day policies.',
    to: '/competitors',
  },
  {
    eyebrow: 'Spectators',
    description: "Ticket tiers, pricing, and a first-timer's guide to watching a ballroom competition.",
    to: '/spectators',
  },
  {
    eyebrow: 'Past Events',
    description: 'Results and staff archives going back to the inaugural 2007 competition.',
    to: '/past-events',
  },
  {
    eyebrow: 'Our History',
    description: 'Eighteen years of Mustang Ball, told from the beginning.',
    to: '/our-history',
  },
];
