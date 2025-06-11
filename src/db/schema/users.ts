import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import articles from "./articles";

const users = pgTable(
  "user",
  {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 320 }).notNull().unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    password: text("password"),
    image: varchar("image", { length: 2048 }),
  },
  (table) => [uniqueIndex("unique_idx").on(table.email)]
);

export const usersRelations = relations(users, ({ many }) => ({
  articles: many(articles),
}));

export default users;
