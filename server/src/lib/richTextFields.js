// Exactly which content-block fields are rich-text-enabled (edited with
// bold/italic/link formatting on the admin dashboard, rendered as HTML on
// the public site). Deliberately an explicit allowlist rather than every
// string in the JSON tree — some existing content contains literal `&`
// (e.g. competitors.disclaimers[0], mustangball.officialSponsors); running
// those through an HTML sanitizer would re-encode them into `&amp;` and
// corrupt the stored data. Only fields listed here are sanitized/rendered
// as HTML; everything else stays plain text, safe by React's normal
// auto-escaping.
//
// A path segment of '*' matches every index of an array at that position.
// This same list drives both server/src/lib/sanitizeContent.js and the
// one-time server/scripts/escape-existing-rich-fields.js migration, so
// they can't drift out of sync — and it must match what the frontend
// actually wires up to RichEditable (see each src/admin/pages/Edit*.jsx).
export const richTextFields = {
  ourHistory: [['intro'], ['press', 'intro'], ['milestones', '*', 'text']],
  competitors: [
    ['intro'],
    ['eligibility', 'intro'],
    ['eligibility', 'outroBefore'],
    ['eligibility', 'outroAfter'],
    ['eligibility', 'disqualifyingActions', '*'],
    ['registrationAndFees', 'bullets', '*'],
    ['disclaimers', '*'],
  ],
  spectators: [['ticketTiers', 'intro'], ['ticketTiers', 'tiers', '*', 'description'], ['faq', '*', 'answer']],
  contact: [['intro', 'text'], ['online', 'subtitle']],
  home: [['promoCard', 'text'], ['milestoneParagraph', 'rest']],
};
