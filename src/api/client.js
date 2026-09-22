// Talks to the mustang-ball-server backend. All requests send cookies
// (the httpOnly JWT is attached automatically by the browser); mutating
// requests also attach the CSRF header the backend requires alongside it.
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// The CSRF token comes back in the login/`/me` response body (not a
// cookie — the frontend and API are on different domains, so a cookie set
// by the API's response isn't readable via document.cookie from a page on
// a different origin). AuthContext calls setCsrfToken() after every
// successful login/session check; apiFetch echoes it back as a header on
// state-changing requests. See server/README.md for the full rationale.
let csrfToken = null;

export function setCsrfToken(token) {
  csrfToken = token;
}

export class ApiError extends Error {
  constructor(message, status, body) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

const MUTATING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

export async function apiFetch(path, { method = 'GET', body, headers, ...rest } = {}) {
  const finalHeaders = { ...headers };
  let finalBody = body;

  if (body !== undefined) {
    finalHeaders['Content-Type'] = 'application/json';
    finalBody = JSON.stringify(body);
  }

  if (MUTATING_METHODS.has(method) && csrfToken) {
    finalHeaders['X-CSRF-Token'] = csrfToken;
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    credentials: 'include',
    headers: finalHeaders,
    body: finalBody,
    ...rest,
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    throw new ApiError(data?.error || `Request failed (${response.status})`, response.status, data);
  }

  return data;
}
