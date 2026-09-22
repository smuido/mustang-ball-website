import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { AUTH_COOKIE, SESSION_MAX_AGE_MS, cookieOptions, issueSession } from '../lib/jwt.js';
import { requireAuth } from '../middleware/auth.js';
import { loginRateLimit } from '../middleware/rateLimit.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const authRouter = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Generic message on purpose: never reveal whether the email exists.
const INVALID_CREDENTIALS = { error: 'Invalid email or password' };

authRouter.post(
  '/login',
  loginRateLimit,
  asyncHandler(async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid request' });
    }
    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.isActive) {
      return res.status(401).json(INVALID_CREDENTIALS);
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json(INVALID_CREDENTIALS);
    }

    const { token, csrfToken } = issueSession(user);
    res
      .cookie(AUTH_COOKIE, token, cookieOptions(SESSION_MAX_AGE_MS))
      .json({ user: { id: user.id, email: user.email, name: user.name, role: user.role }, csrfToken });
  })
);

authRouter.post('/logout', (req, res) => {
  res.clearCookie(AUTH_COOKIE, { path: '/' }).json({ ok: true });
});

authRouter.get(
  '/me',
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role }, csrfToken: req.csrfToken });
  })
);
