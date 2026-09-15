// Shared facts about the event and where things link to.
// Many pages pull from this file, so updating a value here (like the event
// date) updates it everywhere it's used across the site.

const siteInfo = {
  // --- The event itself ---
  eventName: 'Mustang Ball',
  eventYear: 2027,
  eventOrdinal: '19th', // e.g. "19th Annual Mustang Ball"
  eventDatesRange: 'February 6–7, 2027', // shown with a dash (en-dash) in most places
  eventDatesPlain: 'February 6-7, 2027', // plain hyphen version, used in the footer
  venueShort: 'Chumash Auditorium, Cal Poly SLO',
  venueFull: 'Chumash Auditorium, Cal Poly SLO, San Luis Obispo, California',
  cityState: 'San Luis Obispo, CA',

  // --- Contact ---
  contactEmail: 'ballroom@calpoly.edu',

  // --- Links used by buttons across the site ---
  registrationUrl: 'https://mustangball.com/registration',
  // Kept as two separate links since competitor and spectator tickets may
  // eventually sell through different Eventbrite listings. They currently
  // point to the same place.
  competitorTicketsUrl: 'https://www.eventbrite.com/o/28980597001',
  spectatorTicketsUrl: 'https://www.eventbrite.com/o/28980597001',

  // --- Social / partner links ---
  instagramUrl: 'https://www.instagram.com/calpoly_ballroom/',
  facebookUrl: 'https://www.facebook.com/calpolyballroom/',
  cpNowUrl: 'https://now.calpoly.edu/organization/ballroom',
  calPolyBallroomUrl: 'https://cpdancesport.wixsite.com/cpballroom',
  cdaUrl: 'https://collegiatedancesport.org/',
};

export default siteInfo;
