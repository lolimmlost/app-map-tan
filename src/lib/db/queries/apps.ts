import { db } from "~/lib/db";
import { app, NewApp, App } from "~/lib/db/schema/apps.schema";
import { eq } from "drizzle-orm";

export async function createApp(newApp: NewApp): Promise<App> {
  const [createdApp] = await db.insert(app).values(newApp).returning();
  return createdApp;
}

export async function getApps(): Promise<App[]> {
  return await db.select().from(app);
}

export async function getAppById(id: string): Promise<App | undefined> {
  const [foundApp] = await db.select().from(app).where(eq(app.id, id));
  return foundApp;
}

export async function updateApp(id: string, updatedApp: Partial<NewApp>): Promise<App | undefined> {
  const [updatedAppResult] = await db.update(app).set(updatedApp).where(eq(app.id, id)).returning();
  return updatedAppResult;
}

export async function deleteApp(id: string): Promise<boolean> {
  const result = await db.delete(app).where(eq(app.id, id));
  return result.count > 0;
}