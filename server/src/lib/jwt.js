import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import { env } from '../env.js';

export const AUTH_COOKIE = 'mb_token';
export const CSRF_COOKIE = 'mb_csrf';

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
