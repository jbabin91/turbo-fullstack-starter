import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from 'drizzle-orm';
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const users = pgTable('users', {
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  // TODO: Look into switching id to cuid.
  // import { createdId } from "@paralleldrive/cuid2";
  // id: text('id').$defaultFn(() => createId()),
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export type User = InferSelectModel<typeof users>;
export const selectUserSchema = createSelectSchema(users);

export type NewUser = InferInsertModel<typeof users>;
export const insertUserSchema = createInsertSchema(users);
export const updateUserSchema = insertUserSchema.partial();

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const posts = pgTable('posts', {
  content: text('content').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  draft: boolean('draft').notNull().default(false),
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
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
