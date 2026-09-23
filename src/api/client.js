// Talks to the mustang-ball-server backend. Sessions travel as a bearer
// token (see src/auth/AuthContext.jsx), not a cookie — the frontend and
// API are on different domains, and a cookie set by the API's response is
// scoped to the API's own origin, so frontend JS on a different origin
// could never read it back to prove a session existed. Bearer tokens also
// avoid browsers' growing restrictions on cross-site cookies (Safari ITP,
// Chrome's third-party-cookie phase-out), which broke real logins in an
// earlier version of this app. See server/README.md.
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const TOKEN_STORAGE_KEY = 'mb_auth_token';

let token = null;
try {
  token = window.localStorage.getItem(TOKEN_STORAGE_KEY);
} catch {
  // Storage can throw in a locked-down/private-browsing context; treat
  // it the same as "no saved session" rather than crashing the app.
}

export function setAuthToken(nextToken) {
  token = nextToken;
  try {
    if (nextToken) {
      window.localStorage.setItem(TOKEN_STORAGE_KEY, nextToken);
    } else {
      window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  } catch {
    // Ignore — the in-memory copy still works for the rest of this tab.
  }
}

export class ApiError extends Error {
  constructor(message, status, body) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

export async function apiFetch(path, { method = 'GET', body, headers, ...rest } = {}) {
  const finalHeaders = { ...headers };
  let finalBody = body;

  if (body !== undefined) {
    finalHeaders['Content-Type'] = 'application/json';
    finalBody = JSON.stringify(body);
  }

  if (token) {
    finalHeaders['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
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
