import { protectedProcedure, router } from '../../trpc';

export const usersRouter = router({
  me: protectedProcedure.query(({ ctx }) => {
    return ctx.session.user;
  }),
});
