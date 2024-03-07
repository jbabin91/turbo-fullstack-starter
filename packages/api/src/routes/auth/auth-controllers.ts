import { lucia } from '@repo/auth';
import { db, type InsertUserInput, insertUserSchema, users } from '@repo/db';
import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { Argon2id } from 'oslo/password';

import { type TrpcContext } from '../../trpc';
import { setCookie } from '../../utils/cookies';
import { validateRequest } from '../../utils/validateRequest';
import { type UserLoginInput, userLoginSchema } from './auth-schemas';

export async function loginHandler(ctx: TrpcContext, input: UserLoginInput) {
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
      status: 'success',
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
}

export async function logoutHandler(ctx: TrpcContext) {
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
}

export async function registerHandler(
  ctx: TrpcContext,
  input: InsertUserInput,
) {
  try {
    const newUser = insertUserSchema.safeParse(input);

    if (!newUser.success) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
      });
    }

    const hashedPassword = await new Argon2id().hash(input.password);

    const usersData = await db
      .insert(users)
      .values({
        ...newUser.data,
        password: hashedPassword,
      })
      .returning({
        email: users.email,
        id: users.id,
        name: users.name,
        username: users.username,
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
      user: {
        email: usersData[0]?.email ?? '',
        name: usersData[0]?.name ?? '',
        username: usersData[0]?.username ?? '',
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
}
