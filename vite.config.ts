import { resolve } from "node:path";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Vite Plugin의 경우 Path Alias를 사용할 수 없습니다.
import buildPlugin from "./service/vite-plugin";

export default defineConfig({
  plugins: [react(), tailwindcss(), buildPlugin()],
  resolve: {
    alias: [
      {
        find: "@client",
        replacement: resolve(import.meta.dirname, "client"),
      },
      {
        find: "@service",
        replacement: resolve(import.meta.dirname, "service"),
      },
    ],
  },
});