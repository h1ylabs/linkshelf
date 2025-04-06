import { BuildConfig } from "core/build/types";

export const buildConfig: BuildConfig = {
  out: "build",
  staticDir: "frontend/public",
  chunk: {
    fileName: "chunk/[name]-[hash].js",
    manual: {
      "@react": ["react", "react-dom"],
    },
  },
  entryPoint: {
    srcDir: "frontend/app",
    dirMatcher: /^\([A-Za-z0-9]+\)$/,
    fileName: "index.html",
    extractToEntryName: (matchedEntryDir) =>
      matchedEntryDir.substring(1, matchedEntryDir.length - 1),
    convertToEntryFileName: (entryName) => `${entryName}.html`,
    explicit: {
      background: ["core/background.ts", "[name].js"],
    },
  },
};
