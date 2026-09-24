// One-time migration: run once, manually, after deploying the rich-text
// feature (server/README.md documents this) — NOT part of the automatic
// build/seed step.
//
// Existing content in richTextFields' fields was written before those
// fields rendered as HTML, so it was authored and displayed as plain
// text (React's default {value} rendering auto-escapes it). Once those
// fields switch to dangerouslySetInnerHTML, any literal `&`/`<`/`>`
// characters already in the stored text (confirmed present, e.g.
// competitors.disclaimers[0] contains a literal "&") would suddenly be
// interpreted as markup instead of displayed as-is. This walks those
// fields and HTML-escapes any that don't already look like they contain
// one of our allowed tags (<b>/<strong>/<i>/<em>/<a>), which is what
// makes this safe to re-run: rows already carrying real formatting are
// left alone instead of being double-escaped.
//
// Usage: cd server && node scripts/escape-existing-rich-fields.js
import { prisma } from '../src/lib/prisma.js';
import { richTextFields } from '../src/lib/richTextFields.js';

const ALREADY_RICH = /<(b|strong|i|em|a)[\s>]/i;

function getAtPath(obj, path) {
  return path.reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

function setAtPath(obj, path, value) {
  if (path.length === 0) return value;
  const [key, ...rest] = path;
  if (typeof key === 'number') {
    if (!Array.isArray(obj)) return obj;
    const next = [...obj];
    next[key] = setAtPath(next[key], rest, value);
    return next;
  }
  if (!obj || typeof obj !== 'object') return obj;
  return { ...obj, [key]: setAtPath(obj[key], rest, value) };
}

function expandPattern(data, pattern) {
  let paths = [[]];
  for (const segment of pattern) {
    const next = [];
    for (const prefix of paths) {
      if (segment === '*') {
        const arr = getAtPath(data, prefix);
        if (Array.isArray(arr)) arr.forEach((_, i) => next.push([...prefix, i]));
      } else {
        next.push([...prefix, segment]);
      }
    }
    paths = next;
  }
  return paths;
}

function escapeIfPlainText(value) {
  if (ALREADY_RICH.test(value)) return value;
  return value.replace(/&(?!(amp|lt|gt|quot|#39|#\d+);)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

async function main() {
  for (const key of Object.keys(richTextFields)) {
    const block = await prisma.contentBlock.findUnique({ where: { key } });
    if (!block) {
      console.log(`skip ${key}: no such content block`);
      continue;
    }

    let data = block.data;
    let changed = false;
    for (const pattern of richTextFields[key]) {
      for (const path of expandPattern(data, pattern)) {
        const value = getAtPath(data, path);
        if (typeof value !== 'string') continue;
        const escaped = escapeIfPlainText(value);
        if (escaped !== value) {
          data = setAtPath(data, path, escaped);
          changed = true;
          console.log(`${key}.${path.join('.')}: escaped`);
        }
      }
    }

    if (changed) {
      await prisma.contentBlock.update({ where: { key }, data: { data } });
      console.log(`${key}: saved`);
    } else {
      console.log(`${key}: nothing to escape`);
    }
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
