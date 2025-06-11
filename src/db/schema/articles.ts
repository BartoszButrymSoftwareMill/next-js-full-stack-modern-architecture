import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import users from "./users";

const articles = pgTable(
  "article",
  {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar("title", { length: 255 }),
    slug: varchar("slug", { length: 255 }).notNull(),
    content: text("content").notNull(),
    image: varchar("image", { length: 2048 }),
    isPublic: boolean("is_public").default(false),
    authorId: uuid("author_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("slug_idx").on(table.slug),
    index("title_idx").on(table.title),
  ]
);

export const articlesRelations = relations(articles, ({ one }) => ({
  author: one(users, {
    fields: [articles.authorId],
    references: [users.id],
  }),
}));

export default articles;
