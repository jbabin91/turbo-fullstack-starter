/* eslint-disable sort-keys-fix/sort-keys-fix */
import { createId } from '@paralleldrive/cuid2';
import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from 'drizzle-orm';
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { type z } from 'zod';

import { users } from './users';

export const posts = pgTable('posts', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  draft: boolean('draft').notNull().default(false),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Post = InferSelectModel<typeof posts>;
export type NewPost = InferInsertModel<typeof posts>;

export const selectPostSchema = createSelectSchema(posts);
export type SelectPostInput = z.infer<typeof selectPostSchema>;
export const insertPostSchema = createInsertSchema(posts);
export type InsertPostInput = z.infer<typeof insertPostSchema>;
export const updatePostSchema = insertPostSchema.partial();
export type UpdatePostInput = z.infer<typeof updatePostSchema>;

export const postsRelations = relations(posts, ({ one }) => ({
  takeout: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));
