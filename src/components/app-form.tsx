import { useState } from "react";
import { App, NewApp } from "~/lib/db/schema/apps.schema";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

interface AppFormProps {
  app?: App;
  onSubmit: (app: NewApp) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function AppForm({ app, onSubmit, onCancel, isLoading }: AppFormProps) {
  const [name, setName] = useState(app?.name || "");
  const [localIp, setLocalIp] = useState(app?.localIp || "");
  const [port, setPort] = useState(app?.port.toString() || "");
  const [description, setDescription] = useState(app?.description || "");
  const [remoteIp, setRemoteIp] = useState(app?.remoteIp ?? "");
  const [domain, setDomain] = useState(app?.domain ?? "");
  const [subdomain, setSubdomain] = useState(app?.subdomain ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: app?.id || Math.random().toString(36).substring(2, 15),
      name,
      localIp,
      port: parseInt(port, 10),
      remoteIp: remoteIp || null,
      domain: domain || null,
      subdomain: subdomain || null,
      description: description || null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="App name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="localIp">Local IP</Label>
        <Input
          id="localIp"
          value={localIp}
          onChange={(e) => setLocalIp(e.target.value)}
          placeholder="192.168.1.100"
          pattern="^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="port">Port</Label>
        <Input
          id="port"
          type="number"
          value={port}
          onChange={(e) => setPort(e.target.value)}
          placeholder="8080"
          min="1"
          max="65535"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="remoteIp">Remote IP</Label>
        <Input
          id="remoteIp"
          value={remoteIp}
          onChange={(e) => setRemoteIp(e.target.value)}
          placeholder="203.0.113.1"
          pattern="^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="domain">Domain</Label>
        <Input
          id="domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="example.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subdomain">Subdomain</Label>
        <Input
          id="subdomain"
          value={subdomain}
          onChange={(e) => setSubdomain(e.target.value)}
          placeholder="www"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="App description"
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : app ? "Update App" : "Create App"}
        </Button>
      </div>
    </form>
  );
}