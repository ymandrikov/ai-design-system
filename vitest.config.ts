import { defineConfig } from "vitest/config";

export default defineConfig({
  esbuild: { jsx: "automatic" },
  test: {
    environment: "happy-dom",
    include: ["fixtures/**/*.test.{ts,tsx}", "test/**/*.test.mjs"],
  },
});
