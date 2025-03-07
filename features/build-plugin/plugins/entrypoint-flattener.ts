import { Plugin } from "vite";

import * as logger from "../../../shared/lib/logger";

const HTML_ENTRYPOINT = "index.html";

// 각 엔트리포인트에 해당하는 HTML 파일을 최상단에 배치합니다.
export default function entrypointFlattener(): Plugin {
  return {
    name: "linkshelf-build-plugin-entrypoint-flattener",
    enforce: "post",
    generateBundle(_, bundle) {
      const htmlEntrypoints = Object.keys(bundle).filter((file) =>
        file.endsWith(".html"),
      );

      htmlEntrypoints.forEach((entrypoint) => {
        const filePath = bundle[entrypoint].fileName;
        const [fileName, entryName] = filePath.split("/").reverse();

        if (fileName !== HTML_ENTRYPOINT) {
          logger.error(`${entrypoint} is not a valid entrypoint.`);
          return;
        }

        bundle[entrypoint].fileName = `${entryName}.html`;
      });
    },
  };
}
