// Display metadata for the dashboard's list of editable content blocks.
// Keys must match the ContentBlock rows seeded by server/prisma/seed.js.
export const CONTENT_BLOCKS = [
  { key: 'siteInfo', label: 'Site Info', description: 'Event name, dates, venue, and every registration/ticket/social link. Used across most pages.' },
  { key: 'navigation', label: 'Navigation', description: 'Top nav bar links and the footer’s "Explore" column.' },
  { key: 'footer', label: 'Footer', description: 'Footer text and social links.' },
  { key: 'home', label: 'Home Page', description: 'Hero, intro paragraphs, promo card, and the four quick-link cards.' },
  { key: 'competitors', label: 'Competitor Guide', description: 'Events, eligibility, registration & fees, policies, disclaimers.' },
  { key: 'spectators', label: 'Spectators Page', description: 'Ticket tiers, prices, spectator guide, FAQ.' },
  { key: 'danceStyles', label: 'Dance Style Table', description: 'The 5-style dance table shared by Competitors and Spectators.' },
  { key: 'contact', label: 'Contact Page', description: 'Intro text, contact form labels, and social links.' },
  { key: 'ourHistory', label: 'Our History Page', description: 'Intro, milestones timeline, press coverage.' },
  { key: 'pastEvents', label: 'Past Events Archive', description: 'Year, title, and dates shown in the Past Events archive list.' },
  { key: 'mustangball', label: 'Historical Staff Records', description: 'Staff/judge records per past year, keyed like "year2025".' },
];
