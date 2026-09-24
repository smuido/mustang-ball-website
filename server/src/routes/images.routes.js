import { Router } from 'express';
import multer from 'multer';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const imagesRouter = Router();

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_IMAGE_BYTES },
});

function handleUpload(req, res, next) {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      const message = err.code === 'LIMIT_FILE_SIZE' ? 'Image must be 5MB or smaller' : err.message;
      return res.status(413).json({ error: message });
    }
    if (err) return next(err);
    next();
  });
}

imagesRouter.post(
  '/',
  requireAuth,
  handleUpload,
  asyncHandler(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided (expected a "image" form field)' });
    }
    if (!req.file.mimetype.startsWith('image/')) {
      return res.status(400).json({ error: 'File must be an image' });
    }

    const image = await prisma.image.create({
      data: {
        data: req.file.buffer,
        mimeType: req.file.mimetype,
        size: req.file.size,
        createdBy: req.user.id,
      },
      select: { id: true },
    });

    res.status(201).json({ id: image.id });
  })
);

// Public — the live site needs to load these without a login, same as
// GET /api/content/:key.
imagesRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid image id' });
    }

    const image = await prisma.image.findUnique({ where: { id } });
    if (!image) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.set({
      'Content-Type': image.mimeType,
      'Content-Length': image.size,
      'Cache-Control': 'public, max-age=31536000, immutable',
      // helmet()'s default Cross-Origin-Resource-Policy is 'same-origin',
      // which blocks <img> loads once the frontend (GitHub Pages) and this
      // API (Render) are genuinely cross-origin in production.
      'Cross-Origin-Resource-Policy': 'cross-origin',
    });
    res.send(image.data);
  })
);
