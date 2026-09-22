// The links shown in the top menu bar and the footer's "Explore" column.
// `to` is an internal page path; `href` (with `external: true`) is an
// outside website that opens in a new tab.
import siteInfo from './siteInfo';

export const mainNavLinks = [
  { name: 'Competitors', to: '/competitors' },
  { name: 'Spectators', to: '/spectators' },
  { name: 'Past Events', to: '/past-events' },
  { name: 'Our History', to: '/our-history' },
  { name: 'Cal Poly Ballroom', href: 'https://cpdancesport.wixsite.com/cpballroom', external: true },
];

// The highlighted button on the right side of the top menu bar. Links
// straight out to Eventbrite (same link as the spectator tickets button).
export const navCta = {
  label: 'Get Tickets',
  href: siteInfo.spectatorTicketsUrl,
  external: true,
};

// Shown in the footer's "Explore" column. Usually the same pages as above,
// plus Home and Contact.
export const footerNavLinks = [
  { name: 'Home', to: '/' },
  { name: 'Competitors', to: '/competitors' },
  { name: 'Spectators', to: '/spectators' },
  { name: 'Past Events', to: '/past-events' },
  { name: 'Our History', to: '/our-history' },
  { name: 'Contact', to: '/contact' },
];
