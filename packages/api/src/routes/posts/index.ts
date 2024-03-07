import { insertPostSchema, updatePostSchema } from '@repo/db';
import { z } from 'zod';

import { publicProcedure, router } from '../../trpc';
import {
  addPostHandler,
  deletePostHandler,
  getAllPostsHandler,
  getPostByIdHandler,
  updatePostByIdHandler,
} from './posts-controller';

export const postsRouter = router({
  add: publicProcedure.input(insertPostSchema).mutation(async ({ input }) => {
    await addPostHandler(input);
  }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await deletePostHandler(input);
    }),
  getAll: publicProcedure.query(async () => {
    return await getAllPostsHandler();
  }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await getPostByIdHandler(input);
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        post: updatePostSchema.omit({
          createdAt: true,
          id: true,
          updatedAt: true,
          userId: true,
        }),
      }),
    )
    .mutation(async ({ input }) => {
      return await updatePostByIdHandler(input);
    }),
});
