import { insertUserSchema } from '@repo/db';

import { publicProcedure, router } from '../../trpc';
import {
  loginHandler,
  logoutHandler,
  registerHandler,
} from './auth-controllers';
import { userLoginSchema } from './auth-schemas';

export const authRouter = router({
  login: publicProcedure
    .input(userLoginSchema)
    .mutation(async ({ ctx, input }) => {
      return await loginHandler(ctx, input);
    }),
  logout: publicProcedure.mutation(async ({ ctx }) => {
    return await logoutHandler(ctx);
  }),
  register: publicProcedure
    .input(insertUserSchema)
    .mutation(async ({ ctx, input }) => {
      return await registerHandler(ctx, input);
    }),
});
