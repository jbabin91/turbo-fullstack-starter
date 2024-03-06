import { protectedProcedure, publicProcedure, router } from '../../trpc';

export const usersRouter = router({
  example: publicProcedure.query(() => {
    return { message: 'Hello world' };
  }),
  me: protectedProcedure.query(({ ctx }) => {
    return ctx.session.user;
  }),
});
