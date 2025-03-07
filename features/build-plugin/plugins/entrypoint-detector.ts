/* eslint import-x/no-nodejs-modules: ["off"] */
import fs from "node:fs";
import path from "node:path";

import { Plugin } from "vite";

import * as logger from "../../../shared/lib/logger";

const HTML_ENTRYPOINT = "index.html";

export default function entrypointDetector(): Plugin {
  return {
    // 각 엔트리포인트에 해당하는 HTML 파일을 찾아서 추가합니다.
    name: "linkshelf-build-plugin-entrypoint-detector",
    enforce: "pre",

    options(options) {
      const entryDirectories = fs
        .readdirSync(path.resolve("pages"), {
          withFileTypes: true,
        })
        .filter((file) => file.isDirectory());

      const entrypoints = entryDirectories.reduce((result, entry) => {
        const htmlPath = path.resolve("pages", entry.name, HTML_ENTRYPOINT);

        if (fs.existsSync(htmlPath)) {
          return {
            ...result,
            [entry.name]: htmlPath,
          };
        }

        return result;
      }, {});

      logger.info(
        `Found EntryPoints: [${Object.keys(entrypoints).join(", ")}]`,
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