import {
  db,
  type InsertPostInput,
  insertPostSchema,
  posts,
  type SelectPostInput,
  type UpdatePostInput,
  updatePostSchema,
} from '@repo/db';
import { TRPCError } from '@trpc/server';
import { asc, eq } from 'drizzle-orm';

export async function addPostHandler(input: InsertPostInput) {
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
}

export async function deletePostHandler(input: Pick<SelectPostInput, 'id'>) {
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
}

export async function getAllPostsHandler() {
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
}

export async function getPostByIdHandler(input: Pick<SelectPostInput, 'id'>) {
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
}

export async function updatePostByIdHandler(input: {
  id: string;
  post: Pick<UpdatePostInput, 'title' | 'content' | 'draft'>;
}) {
  try {
    const existingPost = await db.query.posts.findFirst({
      where: eq(posts.id, input.id),
    });

    if (!existingPost) {
      throw new TRPCError({
        code: 'NOT_FOUND',
      });
    }

    const updatedPost = updatePostSchema.safeParse(input.post);

    if (!updatedPost.success) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
      });
    }

    await db.update(posts).set(updatedPost.data).where(eq(posts.id, input.id));

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
}
