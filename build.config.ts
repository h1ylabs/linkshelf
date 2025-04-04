type EntryInput = string;
type EntryOutput = string;
type Library = string;

export type BuildConfig = {
  out: string;
  staticDir: string;
  chunk: {
    fileName: string;
    manual: {
      [group: string]: Library[];
    };
  };
  entryPoint: {
    srcDir: string;
    dirMatcher: RegExp;
    fileName: string;
    extractToEntryName: (matchedEntryDir: string) => string;
    convertToEntryFileName: (entryName: string) => string;
    explicit: {
      [entry: string]: [EntryInput, EntryOutput];
    };
  };
};

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
