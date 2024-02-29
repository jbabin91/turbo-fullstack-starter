import { lucia } from '@repo/auth';
import { TRPCError } from '@trpc/server';

import { getCookie, setCookie } from './cookies';

export async function validateRequest(req: Request, resHeaders: Headers) {
  const sessionId = getCookie(req, lucia.sessionCookieName) ?? null;
  if (!sessionId) {
    return {
      session: null,
      user: null,
    };
  }

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(sessionId);
      setCookie(
        resHeaders,
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      setCookie(
        resHeaders,
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
  }

  return result;
}
