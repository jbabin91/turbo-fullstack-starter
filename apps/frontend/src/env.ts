import { z } from 'zod';

const envSchema = z.object({
  DEV: z.boolean().default(false),
  MODE: z.enum(['development', 'production', 'test']).default('development'),
  PROD: z.boolean().default(false),
  VITE_API_URL: z.string().url().default('http://localhost:8787'),
});
export type Environment = z.infer<typeof envSchema>;

export const env = envSchema.parse(import.meta.env);
