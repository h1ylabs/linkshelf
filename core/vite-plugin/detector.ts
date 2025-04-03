import fs from "node:fs";
import path from "node:path";

import { Plugin } from "vite";

import { Logger, logger as base } from "../utils/logger";

const HTML_ENTRYPOINT = "index.html";
const ENTRYPOINT_DIRECTORY = "frontend/app";

const logger = new Logger(base, "build", "detector");

export default function entrypointDetector(): Plugin {
  return {
    // 각 엔트리포인트에 해당하는 HTML 파일을 찾아서 추가합니다.
    name: "linkshelf-build-plugin-entrypoint-detector",
    enforce: "pre",

    options(options) {
      const entryDirectories = fs
        .readdirSync(path.resolve(ENTRYPOINT_DIRECTORY), {
          withFileTypes: true,
        })
        .filter((file) => file.isDirectory())
        .filter((file) => file.name.match(/^\([A-Za-z0-9]+\)$/));

      const entrypoints = entryDirectories.reduce((result, entry) => {
        const htmlPath = path.resolve(
          ENTRYPOINT_DIRECTORY,
          entry.name,
          HTML_ENTRYPOINT,
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
        `Found entrypoints: [${Object.keys(entrypoints).join(", ")}]`,
      );

      return {
        ...options,
        input: {
          ...entrypoints,
        },
      };
    },
  };
}