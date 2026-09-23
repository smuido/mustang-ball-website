import { verifySession } from '../lib/jwt.js';

// Verifies the bearer token in the Authorization header. No CSRF check is
// needed here — unlike a cookie, a bearer header is never attached to a
// request automatically by the browser, so a forged cross-site request
// simply can't include it. See server/README.md and src/lib/jwt.js.
export function requireAuth(req, res, next) {
  const header = req.get('Authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice('Bearer '.length) : null;

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  let payload;
  try {
    payload = verifySession(token);
  } catch {
    return res.status(401).json({ error: 'Session expired or invalid' });
  }

  req.user = { id: payload.sub, email: payload.email, role: payload.role };
  next();
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
}
