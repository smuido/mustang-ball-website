import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { env } from './env.js';
import { authRouter } from './routes/auth.routes.js';
import { contentRouter } from './routes/content.routes.js';
import { usersRouter } from './routes/users.routes.js';

export const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use(helmet());
// No `credentials: true` here — sessions travel as a bearer token in the
// Authorization header (see src/lib/jwt.js), not a cookie, so there's
// nothing cookie-related for CORS to allow.
app.use(
  cors({
    origin: env.allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json({ limit: '1mb' }));

app.get('/health', (req, res) => res.json({ ok: true }));

app.use('/api/auth', authRouter);
app.use('/api/content', contentRouter);
app.use('/api/users', usersRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});
