// Text shown on the Our History page. Sourced from Mustang News coverage
// (mustangnews.net/tag/mustang-ball), the Cal Poly events calendar
// (events.calpoly.edu/mustang-ball), and a Cal Poly Mustang Ball video
// from The Tribune's YouTube channel.
import siteInfo from './siteInfo';

export const eyebrow = 'Our History';

export const intro = `${siteInfo.eventName} has grown from a small club-run competition into one of the `
  + 'largest annual dance competitions in San Luis Obispo County. Hosted every February by the Cal Poly '
  + 'Ballroom Dance Club, it now draws hundreds of competitors from teams across California, Arizona, Oregon, '
  + 'and Nevada to the Chumash Auditorium for two days of American and International style ballroom, Rhythm, Latin, '
  + 'and nightclub dancing.';

// A short timeline of milestones, oldest first.
export const milestones = [
  {
    year: '2007',
    heading: 'The first Mustang Ball',
    text: 'The Cal Poly Ballroom Dance Club holds the inaugural Mustang Ball, a student-run competition '
      + "open to amateur dancers from around the region — the start of what's now the club's signature event.",
  },
  {
    year: '2011',
    heading: 'A growing regional draw',
    text: "Mustang Ball's weekend competition draws club ballroom teams from across California, with the "
      + "event settling into the format and venue that's still used today.",
  },
  {
    year: '2013',
    heading: 'A Cal Poly tradition',
    text: 'More than 100 dancers compete beneath balloon arches in Cal Poly’s white, '
      + 'green, and gold, as Mustang Ball becomes a recognizable fixture of the Cal Poly winter calendar.',
  },
  {
    year: '2017',
    heading: 'Dancers from across the West Coast',
    text: 'By its 10th year, Mustang Ball is attracting competitors from collegiate teams as far away as '
      + 'Arizona, alongside dancers from across California.',
  },
  {
    year: '2020',
    heading: '13th annual: over 230 couples',
    text: 'The 13th Mustang Ball brings in more than 230 competing couples dancing Cha-Cha, Samba, Rumba, '
      + 'and more, with professional Latin ballroom dancers performing a showcase for the crowd.',
  },
  {
    year: '2025',
    heading: '17th annual and still growing',
    text: 'Mustang Ball marks its 17th year as one of the largest annual dance competitions in San Luis '
      + 'Obispo County, run as a nonprofit event by student volunteers from the Cal Poly Ballroom Dance Club. '
      + '',
  },
];

export const press = {
  heading: 'In the Press',
  intro: `Mustang Ball has been covered by local and campus media for nearly two decades. A few places to read and watch more:`,
  links: [
    {
      name: 'Mustang News',
      description: "Cal Poly's student newspaper has covered nearly every Mustang Ball since the early 2010s.",
      href: 'https://mustangnews.net/tag/mustang-ball/',
    },
    {
      name: 'Cal Poly Events Calendar',
      description: 'Details on the event in 2025, as featured in the official Cal Poly events calendar.',
      href: 'https://events.calpoly.edu/mustang-ball',
    },
  ],
  video: {
    title: 'Cal Poly Mustang Ball',
    source: 'The Tribune (San Luis Obispo)',
    youtubeId: 'ByRPHItJWQY',
  },
};

// Split around the "Past Events" link.
export const outroBefore = 'Browse the ';
export const outroLinkText = 'Past Events';
export const outroAfter = ' archive for official records and results from previous years.';
