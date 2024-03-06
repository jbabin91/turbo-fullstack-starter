import { z } from 'zod';

const userSchema = z.object({
  email: z.string(),
  name: z.string(),
  username: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const authSchema = z.object({
  isAuthenticated: z.boolean(),
  user: userSchema,
});

const authSchemaPartial = authSchema.partial();

export type Auth = z.infer<typeof authSchemaPartial>;
