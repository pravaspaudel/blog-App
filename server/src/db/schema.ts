import {
  pgTable,
  varchar,
  text,
  uuid,
  timestamp,
  primaryKey,
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
  thumbnail: text("thumbnail"),
  createdAt: timestamp("created_at").defaultNow(),
  createdBy: uuid("created_by")
    .notNull()
    .references(() => userTable.id, {
      onDelete: "cascade",
    }),
});

export const blogLikes = pgTable(
  "blog_likes",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => userTable.id, {
        onDelete: "cascade",
      }),

    blogId: uuid("blog_id")
      .notNull()
      .references(() => blog.id, {
        onDelete: "cascade",
      }),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.userId, table.blogId],
    }),
  }),
);

export const blogComments = pgTable("blog_comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  content: text("content").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id, {
      onDelete: "cascade",
    }),
  blogId: uuid("blog_id")
    .notNull()
    .references(() => blog.id, {
      onDelete: "cascade",
    }),
});

export const blogReposts = pgTable(
  "blog_reposts",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => userTable.id, {
        onDelete: "cascade",
      }),

    blogId: uuid("blog_id")
      .notNull()
      .references(() => blog.id, {
        onDelete: "cascade",
      }),

    createdAt: timestamp("created_at").defaultNow(),
  },

  (table) => ({
    pk: primaryKey({
      columns: [table.userId, table.blogId],
    }),
  }),
);
