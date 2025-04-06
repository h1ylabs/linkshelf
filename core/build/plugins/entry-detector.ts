import fs from "node:fs";
import path from "node:path";

import { Plugin } from "vite";

import { buildConfig } from "../../../build.config.js";
import { Logger } from "../../utils";

const logger = new Logger("build", "entry-detector");

export default function entryDetectorPlugin(): Plugin {
  return {
    name: "linkshelf-build-entry-detector",
    enforce: "pre",

    options(options) {
      const entryDirectories = fs
        .readdirSync(path.resolve(buildConfig.entryPoint.srcDir), {
          withFileTypes: true,
        })
        .filter((file) => file.isDirectory())
        .filter((file) => file.name.match(buildConfig.entryPoint.dirMatcher));

      const entrypoints = entryDirectories.reduce((result, entry) => {
        const htmlPath = path.resolve(
          buildConfig.entryPoint.srcDir,
          entry.name,
          buildConfig.entryPoint.fileName,
        );

        if (fs.existsSync(htmlPath)) {
          return {
            ...result,
            [entry.name]: htmlPath,
          };
        }

        return result;
      }, {});

      logger.info(
        `found entries: [${Object.keys(entrypoints).map(
          buildConfig.entryPoint.extractToEntryName,
        )}]`,
      );

      return {
        ...options,
        input: {
          ...entrypoints,
          // 명시적으로 지정된 엔트리가 있으면 추가합니다.
          ...Object.fromEntries(
            Object.entries(buildConfig.entryPoint.explicit).map(
              ([name, [input]]) => [name, path.resolve(input)],
            ),
          ),
        },
      };
    },
  };
}