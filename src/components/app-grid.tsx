import { App } from "~/lib/db/schema/apps.schema";
import { AppCard } from "~/components/app-card";

interface AppGridProps {
  apps: App[];
  onEdit?: (app: App) => void;
  onDelete?: (id: string) => void;
}

export function AppGrid({ apps, onEdit, onDelete }: AppGridProps) {
  if (apps.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">No apps found. Add your first app to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {apps.map((app) => (
        <AppCard key={app.id} app={app} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}