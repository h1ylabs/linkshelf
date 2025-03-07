import { Plugin } from "vite";

import entrypointDetector from "./plugins/entrypoint-detector";
import entrypointFlattener from "./plugins/entrypoint-flattener";
import outputConfig from "./plugins/output-config";

export default function buildPlugin(): Plugin[] {
  return [outputConfig(), entrypointDetector(), entrypointFlattener()];
}
