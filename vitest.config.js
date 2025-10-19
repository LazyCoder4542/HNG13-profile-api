import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@test": path.resolve(__dirname, "src/__test__"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
});
