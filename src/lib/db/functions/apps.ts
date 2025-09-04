import { createServerFn } from "@tanstack/react-start";
import { createApp as createAppQuery, getApps as getAppsQuery, updateApp as updateAppQuery, deleteApp as deleteAppQuery } from "~/lib/db/queries/apps";
import { NewApp } from "~/lib/db/schema/apps.schema";

export const $getApps = createServerFn({ method: "GET" })
  .handler(async () => {
    return await getAppsQuery();
  });

export const $createApp = createServerFn({ method: "POST" })
  .validator((data: unknown): NewApp => data as NewApp)
  .handler(async ({ data }: { data: NewApp }) => {
    return await createAppQuery(data);
  });

export const $updateApp = createServerFn({ method: "POST" })
  .validator((data: unknown): { id: string; app: Partial<NewApp> } =>
    data as { id: string; app: Partial<NewApp> }
  )
  .handler(async ({ data }: { data: { id: string; app: Partial<NewApp> } }) => {
    const { id, app } = data;
    return await updateAppQuery(id, app);
  });

export const $deleteApp = createServerFn({ method: "POST" })
  .validator((data: unknown): { id: string } => data as { id: string })
  .handler(async ({ data }: { data: { id: string } }) => {
    return await deleteAppQuery(data.id);
  });