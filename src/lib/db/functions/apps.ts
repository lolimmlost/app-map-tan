import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "~/lib/auth/middleware";
import { createApp as createAppQuery, getApps as getAppsQuery, updateApp as updateAppQuery, deleteApp as deleteAppQuery } from "~/lib/db/queries/apps";
import { NewApp } from "~/lib/db/schema/apps.schema";

export const $getApps = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }: { context?: { user?: { id: string } } }) => {
  const userId = context?.user?.id;
  if (!userId) {
    throw new Error("Unauthorized");
  }
  return await getAppsQuery(userId);
  });

export const $createApp = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown): NewApp => data as NewApp)
  .handler(async ({ data, context }: { data: NewApp; context?: { user?: { id: string } } }) => {
    const userId = context?.user?.id;
    if (!userId) {
      throw new Error("Unauthorized");
    }
    return await createAppQuery(data, userId);
  });

export const $updateApp = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown): { id: string; app: Partial<NewApp> } =>
    data as { id: string; app: Partial<NewApp> }
  )
  .handler(async ({ data, context }: { data: { id: string; app: Partial<NewApp> }; context?: { user?: { id: string } } }) => {
    const { id, app } = data;
    const userId = context?.user?.id;
    if (!userId) {
      throw new Error("Unauthorized");
    }
    return await updateAppQuery(id, app, userId);
  });

export const $deleteApp = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown): { id: string } => data as { id: string })
  .handler(async ({ data, context }: { data: { id: string }; context?: { user?: { id: string } } }) => {
    const userId = context?.user?.id;
    if (!userId) {
      throw new Error("Unauthorized");
    }
    return await deleteAppQuery(data.id, userId);
  });