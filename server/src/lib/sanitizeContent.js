import sanitizeHtml from 'sanitize-html';
import { richTextFields, richTextBlockFields } from './richTextFields.js';

const INLINE_OPTIONS = {
  allowedTags: ['b', 'strong', 'i', 'em', 'a'],
  allowedAttributes: { a: ['href'] },
  allowedSchemes: ['http', 'https', 'mailto'],
};

const BLOCK_OPTIONS = {
  allowedTags: [...INLINE_OPTIONS.allowedTags, 'p', 'ul', 'ol', 'li'],
  allowedAttributes: INLINE_OPTIONS.allowedAttributes,
  allowedSchemes: INLINE_OPTIONS.allowedSchemes,
};

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

// Expands a '*'-wildcard pattern into the concrete paths it matches
// against `data`, e.g. ['milestones', '*', 'text'] with 3 milestones
// becomes [['milestones',0,'text'], ['milestones',1,'text'], ...].
function expandPattern(data, pattern) {
  let paths = [[]];
  for (const segment of pattern) {
    const next = [];
    for (const prefix of paths) {
      if (segment === '*') {
        const arr = getAtPath(data, prefix);
        if (Array.isArray(arr)) {
          arr.forEach((_, i) => next.push([...prefix, i]));
        }
      } else {
        next.push([...prefix, segment]);
      }
    }
    paths = next;
  }
  return paths;
}

function sanitizeFields(data, patterns, options) {
  let result = data;
  for (const pattern of patterns) {
    for (const path of expandPattern(result, pattern)) {
      const value = getAtPath(result, path);
      if (typeof value !== 'string') continue;
      const sanitized = sanitizeHtml(value, options);
      if (sanitized !== value) {
        result = setAtPath(result, path, sanitized);
      }
    }
  }
  return result;
}

// Sanitizes only the fields listed in richTextFields/richTextBlockFields
// for this content block — see richTextFields.js for why this is a
// scoped allowlist rather than a blanket walk of every string in the
// JSON tree, and why block fields get a wider tag allowlist than inline
// ones.
export function sanitizeRichFields(key, data) {
  let result = data;
  if (richTextFields[key]) {
    result = sanitizeFields(result, richTextFields[key], INLINE_OPTIONS);
  }
  if (richTextBlockFields[key]) {
    result = sanitizeFields(result, richTextBlockFields[key], BLOCK_OPTIONS);
  }
  return result;
}
