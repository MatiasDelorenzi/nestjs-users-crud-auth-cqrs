import { config } from 'dotenv';
config();

export const environment = {
  DATABASE_URL: String(process.env.DATABASE_URL),
  ENV_PORT: String(process.env.ENV_PORT),
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS),
  DATABASE_TYPE: String(process.env.DATABASE_TYPE),
  DATABASE_HOST: String(process.env.DATABASE_HOST),
  DATABASE_USERNAME: String(process.env.DATABASE_USERNAME),
  DATABASE_PASSWORD: String(process.env.DATABASE_PASSWORD),
  DATABASE_PORT: Number(process.env.DATABASE_PORT),
  DATABASE_NAME: String(process.env.DATABASE_NAME),
  AUTH_TOKEN_SECRET: String(process.env.AUTH_TOKEN_SECRET),
};
