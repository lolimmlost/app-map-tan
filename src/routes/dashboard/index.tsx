import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { App, NewApp } from "~/lib/db/schema/apps.schema";
import { AppGrid } from "~/components/app-grid";
import { AppForm } from "~/components/app-form";
import { Button } from "~/components/ui/button";
import { appsQueryOptions } from "~/lib/db/queries/apps.queries";
import { $createApp, $updateApp, $deleteApp } from "~/lib/db/functions/apps";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndex,
});

function DashboardIndex() {
  const queryClient = useQueryClient();
  const { data: apps = [], isLoading, isError } = useQuery(appsQueryOptions());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<App | null>(null);

  const handleCreateApp = async (newApp: NewApp) => {
    try {
      await $createApp({ data: newApp });
      await queryClient.invalidateQueries({ queryKey: ["apps"] });
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error creating app:", error);
    }
  };

  const handleUpdateApp = async (updatedApp: NewApp) => {
    try {
      if (!editingApp) return;
      await $updateApp({ data: { id: editingApp.id, app: updatedApp } });
      await queryClient.invalidateQueries({ queryKey: ["apps"] });
      setEditingApp(null);
    } catch (error) {
      console.error("Error updating app:", error);
    }
  };

  const handleDeleteApp = async (id: string) => {
    try {
      await $deleteApp({ data: { id } });
      await queryClient.invalidateQueries({ queryKey: ["apps"] });
    } catch (error) {
      console.error("Error deleting app:", error);
    }
  };

  const handleEditApp = (app: App) => {
    setEditingApp(app);
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p>Loading apps...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p>Error loading apps. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Homelab Dashboard</h1>
        <Button onClick={() => setIsFormOpen(true)}>Add New App</Button>
      </div>

      {isFormOpen && (
        <div className="mb-8 rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Create New App</h2>
          <AppForm
            onSubmit={handleCreateApp}
            onCancel={() => setIsFormOpen(false)}
          />
        </div>
      )}

      {editingApp && (
        <div className="mb-8 rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Edit App</h2>
          <AppForm
            app={editingApp}
            onSubmit={handleUpdateApp}
            onCancel={() => setEditingApp(null)}
          />
        </div>
      )}

      <AppGrid
        apps={apps}
        onEdit={handleEditApp}
        onDelete={handleDeleteApp}
      />
    </div>
  );
}

export default DashboardIndex;
