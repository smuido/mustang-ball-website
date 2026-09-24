// Single render point for the small set of content fields that carry
// admin-authored HTML (bold/italic/links) instead of plain text — see
// server/src/lib/richTextFields.js for exactly which fields these are.
// The server sanitizes anything saved to those fields down to a strict
// tag allowlist before it's ever stored, so rendering it here is safe;
// nowhere else in the app should reach for dangerouslySetInnerHTML.
export default function RichText({ as = 'span', html, className }) {
  const Tag = as;
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html || '' }} />;
}
