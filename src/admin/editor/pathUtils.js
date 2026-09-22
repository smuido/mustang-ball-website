// Minimal immutable get/set for nested content-block data, addressed by a
// path array mixing string keys and numeric array indices, e.g.
// ['hero', 'eyebrow'] or ['quickLinks', 2, 'description'].

export function getIn(obj, path) {
  return path.reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

export function setIn(obj, path, value) {
  if (path.length === 0) return value;
  const [key, ...rest] = path;
  const isArrayKey = typeof key === 'number';

  if (isArrayKey) {
    const arr = Array.isArray(obj) ? [...obj] : [];
    arr[key] = setIn(arr[key], rest, value);
    return arr;
  }

  const base = obj && typeof obj === 'object' ? obj : {};
  return { ...base, [key]: setIn(base[key], rest, value) };
}

// Removes the item at `index` from the array found at `path`.
export function removeAt(obj, path, index) {
  const arr = getIn(obj, path);
  if (!Array.isArray(arr)) return obj;
  const next = arr.filter((_, i) => i !== index);
  return setIn(obj, path, next);
}

// Appends `item` to the array found at `path` (creating it if missing).
export function appendTo(obj, path, item) {
  const arr = getIn(obj, path);
  const next = Array.isArray(arr) ? [...arr, item] : [item];
  return setIn(obj, path, next);
}

// Deletes `key` from the object found at `path` (e.g. removing a whole
// staff role, or a whole year record) — setIn can only overwrite an
// existing key's value, not remove it, hence this separate helper.
export function removeKey(obj, path, key) {
  const target = getIn(obj, path);
  if (!target || typeof target !== 'object') return obj;
  const next = { ...target };
  delete next[key];
  return setIn(obj, path, next);
}
