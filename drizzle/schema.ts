import { mysqlTable, serial, datetime, varchar } from "drizzle-orm/mysql-core";
import { type InferModel, relations, sql } from "drizzle-orm";

export const user = mysqlTable("user", {
  id: varchar("id", { length: 256 }).primaryKey().notNull(),
  firstName: varchar("firstName", { length: 256 }),
  lastName: varchar("lastName", { length: 256 }),
  username: varchar("username", { length: 256 }),
  createdAt: datetime("createdAt", { mode: "string" }).default(
    sql`(CURRENT_TIMESTAMP)`
  ),
  profileImageUrl: varchar("profileImageUrl", { length: 256 }),
  deletedAt: datetime("deletedAt", { mode: "string" }),
});

export type User = InferModel<typeof user, "select">;
export type NewUser = InferModel<typeof user, "insert">;

export const usersRelations = relations(user, ({ many }) => ({
  posts: many(message),
}));

export const message = mysqlTable("message", {
  id: serial("id").primaryKey().notNull(),
  createdAt: datetime("createdAt", { mode: "string" }).default(
    sql`(CURRENT_TIMESTAMP)`
  ),
  updatedAt: datetime("updatedAt", { mode: "string" }).default(
    sql`(CURRENT_TIMESTAMP)`
  ),
  text: varchar("text", { length: 280 }),
  userId: varchar("userId", { length: 256 }),
});

export type Message = InferModel<typeof message, "select">;
export type NewMessage = InferModel<typeof message, "insert">;

export const messageRelations = relations(message, ({ one }) => ({
  author: one(user, {
    fields: [message.userId],
    references: [user.id],
  }),
}));
