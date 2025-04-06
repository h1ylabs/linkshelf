import { Plugin } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

import { buildConfig } from "../../../build.config.js";

export default function staticOutputPlugin(): Plugin[] {
  return viteStaticCopy({
    targets: [
      {
        src: `${buildConfig.staticDir}/*`,
        dest: ".",
      },
    ],
  });
}