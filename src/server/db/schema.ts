import {
  serial,
  datetime,
  varchar,
  mysqlTableCreator,
} from "drizzle-orm/mysql-core";
import config from "../../../config.json";
import {
  relations,
  sql,
  InferSelectModel,
  InferInsertModel,
} from "drizzle-orm";

const mysqlTable = mysqlTableCreator(
  (name) => `${config.dbTablePrefix}_${name}`
);

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

export type User = InferSelectModel<typeof user>;
export type NewUser = InferInsertModel<typeof user>;

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

export type Message = InferSelectModel<typeof message>;
export type NewMessage = InferInsertModel<typeof message>;

export const messageRelations = relations(message, ({ one }) => ({
  author: one(user, {
    fields: [message.userId],
    references: [user.id],
  }),
}));
