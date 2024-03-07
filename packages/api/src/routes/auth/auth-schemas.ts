import { z } from 'zod';

export const userLoginSchema = z.object({
  password: z.string().min(1, {
    message: 'Password is required',
  }),
  username: z.string().min(1, {
    message: 'Username is required',
  }),
});

export type UserLoginInput = z.infer<typeof userLoginSchema>;
