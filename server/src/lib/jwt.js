import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import ms from 'ms';
import { env } from '../env.js';

export const AUTH_COOKIE = 'mb_token';

// Single source of truth for how long a login lasts, derived from
// JWT_EXPIRES_IN so the JWT's own expiry and the cookie's lifetime can
// never drift apart. Browsers hard-cap any cookie's Max-Age at 400 days
// (Chrome/Firefox both enforce this) regardless of what the server sends,
// so that's the practical ceiling for "doesn't expire" — see
// server/README.md.
export const SESSION_MAX_AGE_MS = ms(env.jwtExpiresIn);

// The CSRF token is generated per-login and embedded as a JWT claim, so
// the server can verify it statelessly. It's handed to the frontend in the
// login/`/me` JSON response body (not a cookie — the frontend and API are
// on different domains, and a cookie set by the API's response is scoped
// to the API's own origin, so frontend JS could never read it back via
// document.cookie to echo it as a header). The frontend keeps it in
// memory and sends it back as X-CSRF-Token on state-changing requests. A
// forged cross-site request can carry the auth cookie (SameSite=None makes
// that possible) but can't read this response body — CORS blocks that for
// any origin not in ALLOWED_ORIGINS — so it can't produce a matching
// header. See server/README.md.
export function issueSession(user) {
  const csrfToken = crypto.randomBytes(24).toString('hex');
  const token = jwt.sign(
    { sub: user.id, email: user.email, role: user.role, csrf: csrfToken },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );
  return { token, csrfToken };
}

export function verifySession(token) {
  return jwt.verify(token, env.jwtSecret);
}

export function cookieOptions(maxAgeMs) {
  return {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: env.isProduction ? 'none' : 'lax',
    maxAge: maxAgeMs,
    path: '/',
  };
}
