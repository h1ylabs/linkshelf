import { PluginOption } from "vite";

import devEnvPlugin from "./dev-env";
import entryDetectorPlugin from "./entry-detector";
import entryOutputPlugin from "./entry-output";
import outputConfigPlugin from "./output-config";
import staticOutputPlugin from "./static-output";

export default function buildPlugin(): PluginOption[] {
  return [
    devEnvPlugin(),
    outputConfigPlugin(),
    entryDetectorPlugin(),
    entryOutputPlugin(),
    staticOutputPlugin(),
  ];
}
