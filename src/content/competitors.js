// Text shown on the Competitor Guide page. The dance-style table is shared
// with the Spectators page and lives in danceStyles.js instead.
import siteInfo from './siteInfo';

export const intro = 'Everything competitors need in one place: rules, levels, registration, '
  + 'competition-day policies, and resources.';

// The three buttons under the intro text.
export const buttons = [
  { label: 'Register', href: siteInfo.registrationUrl, external: true, style: 'primary' },
  { label: 'Tickets', href: siteInfo.competitorTicketsUrl, external: true, style: 'outline' },
  { label: 'Email Questions', href: `mailto:${siteInfo.contactEmail}`, external: false, style: 'outline' },
];

export const events = {
  beforeTable: 'Events are offered in American, International, and Nightclub styles. '
    + 'Multi-dance events are judged collectively across all listed dances. '
    + 'Below is a list of the dances that Mustang Ball has historically offered. '
    + 'This list will be updated for the 2028 competition if changes are made.',
  afterTable: 'Competitors should be ready to dance at least 30 minutes before scheduled '
    + 'events. If a competitor wants to add or drop an event on the day of the '
    + 'competition, they must do so before the posted cutoff time. An add/drop '
    + 'form will be released and must be filled out to get adds or drops approved. '
    + 'Late changes may not be accommodated.',
};

export const eligibility = {
  intro: 'Mustang Ball is open to amateur competitors, with no student or age '
    + 'requirement. Professional competitors are not eligible. An individual '
    + 'will be considered a Professional and ineligible for competition if they '
    + 'have ever done any of the following:',
  disqualifyingActions: [
    'Registered as a Professional with any dance association (such as NDCA, USADance, ISTD, etc)',
    'Competed as a Professional',
    'Declared themself as a Professional by word or deed',
    'Have solicited or received monetary compensation from a partner for competing at any collegiate Ballroom Dance competition',
  ],
  // Split around the email address so the page can render it as a clickable
  // mailto link. `outroBefore` comes right before the email, `outroAfter`
  // comes right after it.
  outroBefore: 'Specific questions about eligibility should be directed to the competition organizers. '
    + 'You can reach us at ',
  outroAfter: ' or through the contact form.',
};

export const registrationAndFees = {
  intro: 'Register online and pay through the EventBrite before the Early Registration deadline to save on your ticket!',
  bullets: [
    'Competitor entry includes admission.',
    'Each competitor must pay an entry fee.',
    'Nightclub entries use Beginner or Intermediate/Advanced levels.',
  ],
};

export const cancellationsAndRefunds = {
  text: 'Cancellations before the posted cutoff may be refunded (minus Eventbrite '
    + 'fees) or transferred. After cutoff, transfer-only policies may apply.',
};

export const formationTeam = {
  text: 'Formation teams are open to 4-10 couples. Formation-only entry may be '
    + 'available for dancers not entering individual events.',
};

export const shoeAndCostumePolicy = {
  paragraphOne: 'Wear shoes that do not mark the floor. Suede soles are highly encouraged, heel '
    + 'protectors are required for high heels, and no powder/oil is allowed to be used '
    + 'either on your shoes or on the floor.',
  paragraphTwo: 'Costumes are not allowed in Newcomer or Bronze '
    + 'levels. They are allowed in Silver and Gold levels, but not required. Competitors are '
    + 'encouraged to wear costumes in Novice and above levels. Below is a table that outlines '
    + 'each level, their allowed choreography, and how costumes pertain to each level.',
};

export const disclaimers = [
  'The Cal Poly DanceSport Team & Cal Poly Ballroom Dance Club (including officers, members, '
    + 'assistants, and helpers), Cal Poly Associated Students Inc., the California Polytechnic State '
    + 'University and all associated entities are not liable for any injuries that may occur during '
    + 'the course of this event, nor for any property that is lost, stolen, or damaged. All persons '
    + 'at this event compete and attend at their own risk and are responsible for their own belongings.',
  'The Cal Poly DanceSport Team reserves the right to cancel any events and/or change the schedule at any time.',
  'Competitors and spectators should be aware that during the course of the competition, anyone in the ballroom '
    + 'may be photographed or videotaped by any variety of people for private or public viewing. Everyone attending '
    + 'this competition hereby consents by their attendance at the competition to be photographed or videotaped.',
];
