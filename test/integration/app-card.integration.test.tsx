import React from "react";
import { render, screen } from "@testing-library/react";
import { AppCard } from "../../src/components/app-card";
import type { App } from "../../src/lib/db/schema/apps.schema";

import { describe, test, expect } from "vitest";

function makeApp(overrides: Partial<App>): App {
  return {
    id: "test-id",
    name: "Test App",
    localIp: "192.168.1.2",
    port: 8080,
    remoteIp: null,
    domain: null,
    subdomain: null,
    description: "desc",
    ...overrides
  } as App;
}

describe("AppCard remote access URL generation (integration tests)", () => {
  test("uses remoteIp with http and port when provided", () => {
    const app = makeApp({ remoteIp: "203.0.113.2" });
    render(<AppCard app={app} />);
    const remoteLink = screen.getByText("Remote Access") as HTMLAnchorElement;
    expect(remoteLink).toBeDefined();
    expect(remoteLink.href).toMatch(/^http:\/\/203\.0\.113\.2:8080\/?$/);
  });

  test("uses domain with subdomain in https when remoteIp is not provided", () => {
    const app = makeApp({ remoteIp: null, domain: "example.com", subdomain: "app" });
    render(<AppCard app={app} />);
    const remoteLink = screen.getByText("Remote Access") as HTMLAnchorElement;
    expect(remoteLink).toBeDefined();
    expect(remoteLink.href).toMatch(/^https:\/\/app\.example\.com\/?$/);
  });

  test("uses domain only with https when no subdomain", () => {
    const app = makeApp({ remoteIp: null, domain: "example.org", subdomain: null });
    render(<AppCard app={app} />);
    const remoteLink = screen.getByText("Remote Access") as HTMLAnchorElement;
    expect(remoteLink).toBeDefined();
    expect(remoteLink.href).toMatch(/^https:\/\/example\.org\/?$/);
  });

  test("hides Remote Access button when neither remoteIp nor domain is provided", () => {
    const app = makeApp({ remoteIp: null, domain: null });
    render(<AppCard app={app} />);
    const remoteLink = screen.queryByText("Remote Access");
    expect(remoteLink).toBeNull();
  });
});