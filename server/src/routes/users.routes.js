import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const usersRouter = Router();

usersRouter.use(requireAuth, requireRole('admin'));

const selectFields = { id: true, email: true, name: true, role: true, isActive: true, provider: true, createdAt: true };

usersRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const users = await prisma.user.findMany({ select: selectFields, orderBy: { createdAt: 'asc' } });
    res.json(users);
  })
);

// Creating a user here is really adding an email to the allow-list —
// there's no password; they sign in with GitHub, and the backend checks
// their verified email against this table.
const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(200),
  role: z.enum(['admin', 'editor']).default('editor'),
});

usersRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const parsed = createUserSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message || 'Invalid request' });
    }
    const { email, name, role } = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (existing) {
      return res.status(409).json({ error: 'A user with that email already exists' });
    }

    const user = await prisma.user.create({
      data: { email: email.toLowerCase(), name, role },
      select: selectFields,
    });
    res.status(201).json(user);
  })
);

const updateUserSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  role: z.enum(['admin', 'editor']).optional(),
  isActive: z.boolean().optional(),
});

usersRouter.patch(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const parsed = updateUserSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message || 'Invalid request' });
    }

    if (id === req.user.id && parsed.data.isActive === false) {
      return res.status(400).json({ error: "You can't deactivate your own account" });
    }
    if (id === req.user.id && parsed.data.role && parsed.data.role !== 'admin') {
      return res.status(400).json({ error: "You can't remove your own admin role" });
    }

    const user = await prisma.user.update({ where: { id }, data: parsed.data, select: selectFields });
    res.json(user);
  })
);

usersRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    if (id === req.user.id) {
      return res.status(400).json({ error: "You can't delete your own account" });
    }
    await prisma.user.delete({ where: { id } });
    res.status(204).end();
  })
);
