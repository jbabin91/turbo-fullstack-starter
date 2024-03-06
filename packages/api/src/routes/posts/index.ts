import { db, insertPostSchema, posts, updatePostSchema } from '@repo/db';
import { TRPCError } from '@trpc/server';
import { asc, eq } from 'drizzle-orm';
import { z } from 'zod';

import { publicProcedure, router } from '../../trpc';

export const postsRouter = router({
  add: publicProcedure.input(insertPostSchema).mutation(async ({ input }) => {
    try {
      const newPost = insertPostSchema.safeParse(input);

      if (!newPost.success) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
        });
      }

      await db.insert(posts).values(newPost.data);

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
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
  }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const existingPost = await db.query.posts.findFirst({
          where: eq(posts.id, input.id),
        });

        if (!existingPost) {
          throw new TRPCError({
            code: 'NOT_FOUND',
          });
        }

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
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
    }),
  getAll: publicProcedure.query(async () => {
    try {
      const data = await db.select().from(posts).orderBy(asc(posts.id));
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message,
        });
      }
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
  }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const post = await db.query.posts.findFirst({
          where: eq(posts.id, input.id),
        });
        return post;
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: error.message,
          });
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
    }),
  update: publicProcedure
    .input(
      z.object({
        content: z.string(),
        draft: z.boolean(),
        id: z.string(),
        title: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const existingPost = await db.query.posts.findFirst({
          where: eq(posts.id, input.id),
        });

        if (!existingPost) {
          throw new TRPCError({
            code: 'NOT_FOUND',
          });
        }

        const updatedPost = updatePostSchema.safeParse(input);

        if (!updatedPost.success) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
          });
        }

        await db
          .update(posts)
          .set(updatedPost.data)
          .where(eq(posts.id, input.id));

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
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
    }),
});
