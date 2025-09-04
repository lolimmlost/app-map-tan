import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const app = pgTable("app", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  localIp: varchar("local_ip", { length: 15 }).notNull(), // IPv4 address format
  remoteIp: varchar("remote_ip", { length: 45 }),
  port: integer("port").notNull(),
  domain: varchar("domain", { length: 253 }),
  subdomain: varchar("subdomain", { length: 253 }),
  description: text("description"),
});

export type App = InferSelectModel<typeof app>;
export type NewApp = InferInsertModel<typeof app>;