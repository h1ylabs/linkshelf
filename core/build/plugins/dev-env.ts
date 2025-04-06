import { Plugin } from "vite";

import { Logger } from "../../utils";

const logger = new Logger("build", "dev-env");

export default function devEnvPlugin(): Plugin {
  return {
    name: "linkshelf-build-dev-env",
    config() {
      const isDev = process.env.DEV_ENV === "true";

      if (isDev) {
        logger.info("Development environment detected.");
      }
      return {
        build: isDev
          ? {
            minify: false,
            sourcemap: true,
          }
          : {},
      };
    },
  };
}
