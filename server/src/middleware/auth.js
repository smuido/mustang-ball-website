import { AUTH_COOKIE, verifySession } from '../lib/jwt.js';

const MUTATING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

// Verifies the JWT cookie and, for any request that changes state, also
// requires a matching X-CSRF-Token header (double-submit pattern — see
// server/README.md for why this is needed on a cross-origin cookie setup).
export function requireAuth(req, res, next) {
  const token = req.cookies?.[AUTH_COOKIE];
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  let payload;
  try {
    payload = verifySession(token);
  } catch {
    return res.status(401).json({ error: 'Session expired or invalid' });
  }

  if (MUTATING_METHODS.has(req.method)) {
    const headerToken = req.get('X-CSRF-Token');
    if (!headerToken || headerToken !== payload.csrf) {
      return res.status(403).json({ error: 'Invalid CSRF token' });
    }
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
