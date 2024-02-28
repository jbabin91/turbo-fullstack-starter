/* eslint-disable sort-keys-fix/sort-keys-fix */
import { createId } from '@paralleldrive/cuid2';
import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from 'drizzle-orm';
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const users = pgTable('users', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text('name').notNull(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type User = InferSelectModel<typeof users>;
export const selectUserSchema = createSelectSchema(users);

export type NewUser = InferInsertModel<typeof users>;
export const insertUserSchema = createInsertSchema(users);
export const updateUserSchema = insertUserSchema.partial();

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});

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
});

export type Post = InferSelectModel<typeof posts>;
export const selectPostSchema = createSelectSchema(posts);

export type NewPost = InferInsertModel<typeof posts>;
export const insertPostSchema = createInsertSchema(posts);
export const updatePostSchema = insertPostSchema.partial();

export const postsRelations = relations(posts, ({ one }) => ({
  takeout: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));
