import { API_URL } from '../api/client';

// Resolves an admin-editable image slot to a URL: the uploaded replacement
// if one exists, otherwise the bundled default. Used identically by the
// admin mirrors (ImageEditable) and the public pages so the two can't
// drift apart on how a slot's src is built.
export function resolveImage(imageId, fallback) {
  return imageId ? `${API_URL}/api/images/${imageId}` : fallback;
}
