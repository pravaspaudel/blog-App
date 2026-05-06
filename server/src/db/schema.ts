import {
  pgTable,
  varchar,
  text,
  uuid,
  foreignKey,
  timestamp,
} from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: varchar("username", { length: 30 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
});

export const blog = pgTable("blogs", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 50 }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  createdBy: uuid("created_by")
    .notNull()
    .references(() => userTable.id, {
      onDelete: "cascade",
    }),
});
