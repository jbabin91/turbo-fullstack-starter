import { z } from 'zod';

const envSchema = z.object({
  DEV: z.boolean().default(false),
  MODE: z.enum(['development', 'production', 'test']).default('development'),
  PROD: z.boolean().default(false),
});
export type Environment = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
