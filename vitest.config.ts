import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: [
      "test/**/*.{test,spec}.{ts,tsx}",
      "test/integration/**/*.integration.test.tsx"
    ],
    environment: "jsdom"
  }
});