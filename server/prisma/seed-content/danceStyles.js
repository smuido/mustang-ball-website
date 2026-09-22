// The 5-style dance table shown on both the Competitors and Spectators
// pages. Edit it here once and both pages update.
//
// `columns` are the table headers. `rows` is one array per row of the
// table — each row has 5 entries lining up with the 5 columns above.
// Leave an entry as '' (empty quotes) if that style category has no dance
// in that row.

export const danceStyleColumns = [
  'American Smooth',
  'American Rhythm',
  'International Standard',
  'International Latin',
  'Nightclub',
];

export const danceStyleRows = [
  ['Waltz', 'Cha-Cha', 'Waltz', 'Cha-Cha', 'West Coast Swing'],
  ['Tango', 'Rumba', 'Tango', 'Samba', 'Nightclub Two Step'],
  ['Foxtrot', 'East Coast Swing', 'Foxtrot', 'Rumba', 'Salsa'],
  ['Viennese Waltz', 'Bolero', 'Quickstep', 'Paso Doble', 'Bachata'],
  ['', 'Mambo', 'Viennese Waltz', 'Jive', 'Merengue'],
  ['', '', '', '', 'Argentine Tango'],
  ['', '', '', '', 'Lindy-Hop'],
  ['', '', '', '', 'Blues'],
  ['', '', '', '', 'Hustle'],
];
