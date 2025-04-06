import { Plugin } from "vite";

import { buildConfig } from "../../../build.config.js";
import { Logger } from "../../utils";

const logger = new Logger("build", "output-config");

export default function outputConfigPlugin(): Plugin {
  return {
    name: "linkshelf-build-output-config",
    config() {
      return {
        build: {
          outDir: buildConfig.out,
        },
      };
    },
    outputOptions(options) {
      return {
        ...options,
        dir: buildConfig.out,
        manualChunks: buildConfig.chunk.manual,
        entryFileNames: (chunkInfo) => {
          const info = buildConfig.entryPoint.explicit[chunkInfo.name];

          // 명시적으로 지정된 엔트리가 없으면 기본 청크 파일 이름을 사용합니다.
          if (!info) {
            return buildConfig.chunk.fileName;
          }

          const [, output] = info;

          logger.info(`found explicit entry: ${chunkInfo.name}`);

          return output;
        },
        chunkFileNames: buildConfig.chunk.fileName,
      };
    },
  };
}