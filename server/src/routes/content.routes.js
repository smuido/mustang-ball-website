import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sanitizeRichFields } from '../lib/sanitizeContent.js';

export const contentRouter = Router();

const MAX_BLOCK_BYTES = 200 * 1024;

// Content blocks are free-form JSON objects (one per former src/content/*.js
// module) edited as-is through the dashboard, so validation here is
// intentionally shallow: must be a plain JSON object, not e.g. a string or
// array, and under a size cap. Page-shape correctness is the editor's job.
const contentBodySchema = z.object({
  data: z.record(z.string(), z.unknown()),
});

contentRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const blocks = await prisma.contentBlock.findMany();
    const byKey = Object.fromEntries(blocks.map((block) => [block.key, block.data]));
    res.json(byKey);
  })
);

contentRouter.get(
  '/:key',
  asyncHandler(async (req, res) => {
    const block = await prisma.contentBlock.findUnique({ where: { key: req.params.key } });
    if (!block) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json({ key: block.key, data: block.data, updatedAt: block.updatedAt });
  })
);

contentRouter.put(
  '/:key',
  requireAuth,
  asyncHandler(async (req, res) => {
    const { key } = req.params;
    const parsed = contentBodySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Body must be { "data": { ...object... } }' });
    }

    // Strips anything but a small bold/italic/link allowlist out of this
    // block's rich-text-enabled fields (see richTextFields.js) — the
    // trust boundary for content that gets rendered as HTML on the public
    // site, regardless of what the admin UI itself sent.
    const sanitizedData = sanitizeRichFields(key, parsed.data.data);

    const size = Buffer.byteLength(JSON.stringify(sanitizedData));
    if (size > MAX_BLOCK_BYTES) {
      return res.status(413).json({ error: 'Content block too large' });
    }

    const existing = await prisma.contentBlock.findUnique({ where: { key } });
    if (!existing) {
      return res.status(404).json({ error: `Unknown content block "${key}"` });
    }

    await prisma.contentRevision.create({
      data: { key, data: existing.data, updatedBy: req.user.id },
    });

    const updated = await prisma.contentBlock.update({
      where: { key },
      data: { data: sanitizedData, updatedBy: req.user.id },
    });

    res.json({ key: updated.key, data: updated.data, updatedAt: updated.updatedAt });
  })
);

contentRouter.get(
  '/:key/revisions',
  requireAuth,
  asyncHandler(async (req, res) => {
    const revisions = await prisma.contentRevision.findMany({
      where: { key: req.params.key },
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: { user: { select: { name: true, email: true } } },
    });
    res.json(revisions);
  })
);
