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