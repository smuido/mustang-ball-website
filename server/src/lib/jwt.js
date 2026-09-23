import jwt from 'jsonwebtoken';
import { env } from '../env.js';

// Sessions are a JWT the frontend stores itself (see src/api/client.js)
// and sends back as `Authorization: Bearer <token>` — not a cookie.
// A cookie set by the API's response is scoped to the API's own origin,
// which frontend JS on a different origin (GitHub Pages) can never read
// back to prove it holds a valid session, and browsers increasingly block
// cross-site cookies outright (Safari ITP, Chrome's third-party cookie
// phase-out), which broke real logins in an earlier version of this app.
// A bearer header sidesteps both problems, and isn't something a forged
// cross-site request can attach the way a cookie is, so there's no CSRF
// token to manage either. See server/README.md.
export function issueSession(user) {
  return jwt.sign({ sub: user.id, email: user.email, role: user.role }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });
}

export function verifySession(token) {
  return jwt.verify(token, env.jwtSecret);
}
