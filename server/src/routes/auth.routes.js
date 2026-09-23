import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { issueSession } from '../lib/jwt.js';
import { exchangeGitHubCode } from '../lib/github.js';
import { requireAuth } from '../middleware/auth.js';
import { loginRateLimit } from '../middleware/rateLimit.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const authRouter = Router();

const oauthSchema = z.object({ credential: z.string().min(1) });

// Never reveal whether an email exists — same message whether the code
// was invalid or the email just isn't allow-listed.
const NOT_ALLOWED = { error: 'That account isn’t set up for this dashboard. Ask an admin to add you.' };

function publicUser(user) {
  return { id: user.id, email: user.email, name: user.name, role: user.role };
}

authRouter.post(
  '/oauth/github',
  loginRateLimit,
  asyncHandler(async (req, res) => {
    const parsed = oauthSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    let profile;
    try {
      profile = await exchangeGitHubCode(parsed.data.credential);
    } catch {
      return res.status(401).json({ error: 'Could not verify that sign-in. Try again.' });
    }

    const user = await prisma.user.findUnique({ where: { email: profile.email.toLowerCase() } });
    if (!user || !user.isActive) {
      return res.status(403).json(NOT_ALLOWED);
    }

    await prisma.user.update({ where: { id: user.id }, data: { provider: 'github' } });

    const token = issueSession(user);
    res.json({ token, user: publicUser(user) });
  })
);

authRouter.get(
  '/me',
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    res.json({ user: publicUser(user) });
  })
);
