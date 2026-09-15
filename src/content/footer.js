// Text shown in the site footer. Links and event facts are pulled from
// siteInfo.js so they stay in sync with the rest of the site.
import siteInfo from './siteInfo';

export const aboutHeading = siteInfo.eventName;

// Split around the "here" link to the CDA website.
export const aboutBefore = 'Mustang Ball is a Collegiate Dancesport Association (CDA) certified competition. '
  + 'Learn more about the CDA ';
export const aboutLinkText = 'here';
export const aboutAfter = '.';

export const exploreHeading = 'Explore';
export const eventInfoHeading = 'Event Info';

export const hostedByLine = 'Hosted by Cal Poly Ballroom';

// The icon for each social link is chosen in Footer.jsx.
export const footerSocialLinks = [
  { name: 'Instagram', href: siteInfo.instagramUrl },
  { name: 'Facebook', href: siteInfo.facebookUrl },
  { name: 'CPNow', href: siteInfo.cpNowUrl },
];
