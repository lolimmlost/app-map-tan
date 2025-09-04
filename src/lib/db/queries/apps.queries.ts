import { queryOptions } from "@tanstack/react-query";
import { $getApps } from "~/lib/db/functions/apps";

export const appsQueryOptions = () =>
  queryOptions({
    queryKey: ["apps"],
    queryFn: () => $getApps(),
  });