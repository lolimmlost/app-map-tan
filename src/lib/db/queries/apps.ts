import { db } from "~/lib/db";
import { app, NewApp, App } from "~/lib/db/schema/apps.schema";
import { eq, and } from "drizzle-orm";

export async function createApp(newApp: NewApp, userId: string): Promise<App> {
  const [createdApp] = await db.insert(app).values({ ...newApp, userId }).returning();
  return createdApp;
}

export async function getApps(userId: string): Promise<App[]> {
  return await db.select().from(app).where(eq(app.userId, userId));
}

export async function getAppById(id: string, userId: string): Promise<App | undefined> {
  const [foundApp] = await db.select().from(app).where(and(eq(app.id, id), eq(app.userId, userId)));
  return foundApp;
}

export async function updateApp(id: string, updatedApp: Partial<NewApp>, userId: string): Promise<App | undefined> {
  const [updatedAppResult] = await db.update(app).set(updatedApp).where(and(eq(app.id, id), eq(app.userId, userId))).returning();
  return updatedAppResult;
}

export async function deleteApp(id: string, userId: string): Promise<boolean> {
  try {
    const result = await db.delete(app).where(and(eq(app.id, id), eq(app.userId, userId))).returning();
    // If the array is empty, no rows were deleted (app didn't exist or didn't belong to user)
    // If the array has items, the deletion was successful
    return result.length > 0;
  } catch (error) {
    // If there's an error, return false
    console.error("Error deleting app:", error);
    return false;
  }
}