import { App } from "~/lib/db/schema/apps.schema";
import { Button } from "~/components/ui/button";

interface AppCardProps {
  app: App;
  onEdit?: (app: App) => void;
  onDelete?: (id: string) => void;
}

export function AppCard({ app, onEdit, onDelete }: AppCardProps) {
  const localUrl = `http://${app.localIp}:${app.port}`;

  // Build remote URL based on available configuration:
  // - If a remote IP is provided, use http with optional port
  // - Else if a domain is provided, use https with optional subdomain
  // - If neither is provided, no remote URL is available
  let remoteUrl: string | null = null;

  if (app.remoteIp) {
    const portPart = app.port ? `:${app.port}` : "";
    remoteUrl = `http://${app.remoteIp}${portPart}`;
  } else if (app.domain) {
    const host = app.subdomain ? `${app.subdomain}.${app.domain}` : app.domain;
    remoteUrl = `https://${host}`;
  }

  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{app.name}</ h3>
          <p className="text-sm text-muted-foreground">{app.description}</p>
        </div>
        <div className="flex gap-2">
          {onEdit && (
            <Button variant="outline" size="sm" onClick={() => onEdit(app)}>
              Edit
            </Button>
          )}
          {onDelete && (
            <Button variant="destructive" size="sm" onClick={() => onDelete(app.id)}>
              Delete
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm">
          <span className="font-medium">Local IP:</span> {app.localIp}
        </div>
        <div className="text-sm">
          <span className="font-medium">Port:</span> {app.port}
        </div>
        <div className="text-sm">
          <span className="font-medium">Remote IP:</span> {app.remoteIp ?? "—"}
        </div>
        <div className="text-sm">
          <span className="font-medium">Domain:</span> {app.domain ?? "—"}
        </div>
        <div className="text-sm">
          <span className="font-medium">Subdomain:</span> {app.subdomain ?? "—"}
        </div>
        <div className="mt-2 flex gap-2">
          <Button variant="default" size="sm" asChild>
            <a href={localUrl} target="_blank" rel="noopener noreferrer">
              Local Access
            </a>
          </Button>
          {remoteUrl ? (
            <Button variant="outline" size="sm" asChild>
              <a href={remoteUrl} target="_blank" rel="noopener noreferrer">
                Remote Access
              </a>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}