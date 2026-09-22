// Text shown on the Spectators page. The dance-style table is shared with
// the Competitors page and lives in danceStyles.js instead.
import siteInfo from './siteInfo.js';

export const ticketTiers = {
  intro: 'Tickets for Mustang Ball can be purchased online or at the door. There are three tiers of spectator tickets.',
  tiers: [
    { name: 'General Spectator', description: 'Access to the venue and general seating.' },
    { name: 'Premium Spectator', description: 'Includes reserved front row seating during the evening session.' },
    { name: 'Student Spectator', description: 'Free with valid PolyCard day of.' },
  ],
  buttonLabel: 'Get Tickets',
  buttonHref: siteInfo.spectatorTicketsUrl,
};

// The ticket price table.
export const ticketPriceColumns = ['Ticket Type', 'In Advance Price', 'Day of Price'];
export const ticketPriceRows = [
  ['General Spectator', '$12', '$17'],
  ['Premium Spectator', '$20', '$25'],
];

export const afterPrices = {
  polycardNote: 'Cal Poly students who present a valid PolyCard receive free admission to the event, '
    + 'but cannot occupy front row seats during the evening session.',
  // Split around the word "EventBrite" so it can be rendered as a link.
  eventbriteBefore: 'Tickets can be purchased through the ',
  eventbriteLinkText: 'EventBrite',
  eventbriteAfter: '.',
};

export const guide = {
  // Split around "28" so it can be rendered in bold.
  introBefore: "First time at a ballroom dance competition? There's some stuff you should know before you go! "
    + 'First, Mustang Ball currently offers ',
  styleCount: '28',
  introAfter: ' different dance styles! They are categorized as follows:',

  // Split around "7" so it can be rendered in bold.
  levelsIntroBefore: 'These dance styles will be competed in at ',
  levelCount: '7',
  levelsIntroAfter: ' different levels, including:',

  // The first level (Newcomer) has an extra explanatory note under it.
  levels: ['Newcomer', 'Bronze', 'Silver', 'Gold', 'Novice', 'Pre-Champion', 'Champion'],
  newcomerNote: 'Couples only qualify for Newcomer their first year of competing. After that, they must move up to bronze.',

  levelsOutro: 'Competitors are encouraged to dance the level they are eligible for and one level up. '
    + 'Competitors will be judged on their technique, presentation, and showmanship. The judges will rank '
    + 'the couples based on their performance, and the scores from all the judges will be combined to '
    + 'determine the final standings.',
};

export const faq = [
  {
    question: 'Who can compete in Mustang Ball?',
    answer: 'Mustang Ball is open to all amateur dancers, regardless of collegiate affiliation. In most events, dancers '
      + 'compete as couples. However, some events such as formation team competitions are performed by teams of dancers.',
  },
  {
    question: 'How are the events judged?',
    answer: 'During the event, up to five judges will rank the dance couples based on their skills, presentation, and showmanship. '
      + 'Scores from all the judges are combined to obtain the final standings. Adjudication is a subjective process (to say the least) '
      + 'and that is why several judges are used to ensure fairness. Depending on the number of entries, competitors may be required to '
      + 'compete in a series of elimination rounds (nth round, quarter and semi-final) until six couples are recalled for the final round '
      + 'by the judges. During the final round, the top placements are determined.',
  },
  {
    question: 'How do I support my favorite dancers?',
    answer: 'During the competition, you will be seeing some lovely dancing. Beautiful dancing and music is one of life’s great joys! '
      + "Applause is much appreciated anytime during the event. So don't be afraid to clap, yell and call out the number of your favorite couple. "
      + 'We invite you to play “judge” during the competition and see if you agree with the judges results. So sit back and experience this wonderful '
      + 'visual and aural delight.',
  },
];
