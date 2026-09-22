// Talks to the mustang-ball-server backend. All requests send cookies
// (the httpOnly JWT is attached automatically by the browser); mutating
// requests also attach the CSRF header the backend requires alongside it.
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const CSRF_COOKIE = 'mb_csrf';

function readCsrfCookie() {
  const match = document.cookie.match(new RegExp(`(?:^|; )${CSRF_COOKIE}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
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

  if (MUTATING_METHODS.has(method)) {
    const csrfToken = readCsrfCookie();
    if (csrfToken) {
      finalHeaders['X-CSRF-Token'] = csrfToken;
    }
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
