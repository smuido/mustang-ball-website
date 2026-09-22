import 'dotenv/config';

const required = ['DATABASE_URL', 'JWT_SECRET', 'ALLOWED_ORIGINS'];

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
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '2h',
  allowedOrigins: process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim()),
  isProduction: process.env.NODE_ENV === 'production',
};
