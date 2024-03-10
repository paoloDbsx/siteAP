// vite.config.ts
import { defineConfig } from "vite";
import marko from "@marko/run/vite";

export default defineConfig({
  plugins: [
    marko({
      routesDir: "src/routes",
    }),
  ],
});