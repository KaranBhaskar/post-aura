import { pgTable, uuid, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const Tables = pgTable("tables", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: text("user_id").notNull(),
  prompt: text("prompt").notNull(),
  content: text("content").notNull(),
  type: text("type").notNull(),
  public: boolean("public").notNull().default(false),
  likes: text("likes")
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
