import { Plugin } from "vite";

import { buildConfig } from "../../build.config";

export default function entryOutputPlugin(): Plugin {
  return {
    name: "linkshelf-build-entry-output",
    enforce: "post",
    generateBundle(_, bundle) {
      const { entryPoint } = buildConfig;

      const entryPointFiles = Object.keys(bundle).filter((file) =>
        file.endsWith(entryPoint.fileName),
      );

      entryPointFiles.forEach((entrypoint) => {
        const filePath = bundle[entrypoint].fileName;
        const [, entryName] = filePath.split("/").reverse();
        const entrypointName = entryPoint.extractToEntryName(entryName);

        bundle[entrypoint].fileName = entryPoint.convertToEntryFileName(
          entrypointName,
        );
      });
    },
  };
}
