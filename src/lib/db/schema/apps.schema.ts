import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const app = pgTable("app", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  localIp: varchar("local_ip", { length: 15 }).notNull(), // IPv4 address format
  port: integer("port").notNull(),
  description: text("description"),
});

export type App = InferSelectModel<typeof app>;
export type NewApp = InferInsertModel<typeof app>;