import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import ms from 'ms';
import { env } from '../env.js';

export const AUTH_COOKIE = 'mb_token';
export const CSRF_COOKIE = 'mb_csrf';

// Single source of truth for how long a login lasts, derived from
// JWT_EXPIRES_IN so the JWT's own expiry and the cookie's lifetime can
// never drift apart. Browsers hard-cap any cookie's Max-Age at 400 days
// (Chrome/Firefox both enforce this) regardless of what the server sends,
// so that's the practical ceiling for "doesn't expire" — see
// server/README.md.
export const SESSION_MAX_AGE_MS = ms(env.jwtExpiresIn);

// The CSRF token is generated per-login, embedded as a JWT claim (so the
// server can verify it statelessly), and also handed back in a
// non-httpOnly cookie the frontend can read and echo as a header. A
// cross-site attacker can trigger the cookie-bearing request but can't
// read the cookie's value (browsers enforce same-origin on cookie access),
// so they can't produce a matching header. See server/README.md.
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
