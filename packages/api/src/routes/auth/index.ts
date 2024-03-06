import { lucia } from '@repo/auth';
import { db, insertUserSchema, users } from '@repo/db';
import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { Argon2id } from 'oslo/password';
import { z } from 'zod';

import { publicProcedure, router } from '../../trpc';
import { setCookie } from '../../utils/cookies';
import { validateRequest } from '../../utils/validateRequest';

const userLoginSchema = z.object({
  password: z.string().min(1, {
    message: 'Password is required',
  }),
  username: z.string().min(1, {
    message: 'Username is required',
  }),
});

export const authRouter = router({
  login: publicProcedure
    .input(userLoginSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const user = userLoginSchema.safeParse(input);

        // Validate input
        if (!user.success) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
          });
        }

        // Check if user exists
        const existingUser = await db.query.users.findFirst({
          where: eq(users.username, input.username),
        });

        if (!existingUser) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
          });
        }

        // Check if password is correct
        const validPassword = await new Argon2id().verify(
          existingUser.password,
          input.password,
        );

        if (!validPassword) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
          });
        }

        const session = await lucia.createSession(existingUser.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        setCookie(
          ctx.resHeaders,
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );

        return {
          message: 'Logged in successfully',
          user: {
            email: existingUser.email,
            name: existingUser.name,
            username: existingUser.username,
          },
        };
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: error.message,
          });
        }
      }
    }),
  logout: publicProcedure.mutation(async ({ ctx }) => {
    try {
      const { session } = await validateRequest(ctx.req, ctx.resHeaders);

      if (!session) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
        });
      }

      await lucia.invalidateSession(session.id);
      await lucia.invalidateUserSessions(session.userId);

      const sessionCookie = lucia.createBlankSessionCookie();
      setCookie(
        ctx.resHeaders,
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      return {
        status: 'success',
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message,
        });
      }
    }
  }),
  register: publicProcedure
    .input(insertUserSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const newUser = insertUserSchema.safeParse(input);

        if (!newUser.success) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
          });
        }

        const hashedPassword = await new Argon2id().hash(input.password);

        // console.log('hashedPassword', hashedPassword);

        const usersData = await db
          .insert(users)
          .values({
            ...newUser.data,
            password: hashedPassword,
          })
          .returning({
            id: users.id,
          });

        const session = await lucia.createSession(usersData[0]?.id ?? '', {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        setCookie(
          ctx.resHeaders,
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );

        return {
          message: 'User created',
          status: 'success',
        };
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: error.message,
          });
        }
      }
    }),
});
