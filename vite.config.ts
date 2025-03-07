import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import buildPlugin from "./features/build-plugin";

export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss(), buildPlugin()],
});