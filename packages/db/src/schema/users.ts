/* eslint-disable sort-keys-fix/sort-keys-fix */
import { createId } from '@paralleldrive/cuid2';
import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { type z } from 'zod';

import { posts } from './posts';

export const users = pgTable('users', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text('name').notNull(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export const selectUserSchema = createSelectSchema(users);
export type SelectUserInput = z.infer<typeof selectUserSchema>;
export const insertUserSchema = createInsertSchema(users);
export type InsertUserInput = z.infer<typeof insertUserSchema>;
export const updateUserSchema = insertUserSchema.partial();
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));
