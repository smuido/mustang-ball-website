import 'dotenv/config';

const required = [
  'DATABASE_URL',
  'JWT_SECRET',
  'ALLOWED_ORIGINS',
  'GITHUB_CLIENT_ID',
  'GITHUB_CLIENT_SECRET',
];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const env = {
  port: Number(process.env.PORT) || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '400d',
  allowedOrigins: process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim()),
  githubClientId: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  isProduction: process.env.NODE_ENV === 'production',
};
