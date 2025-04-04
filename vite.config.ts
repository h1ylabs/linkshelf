import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Vite Plugin의 경우 Path Alias를 사용할 수 없습니다.
import buildPlugin from "./core/build-plugin";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    buildPlugin(),
  ],
});