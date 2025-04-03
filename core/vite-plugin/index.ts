import { Plugin } from "vite";

import buildOption from "./build-option";
import detector from "./detector";
import flattener from "./flattener";

export default function extensionPlugin(): Plugin[] {
  return [buildOption(), detector(), flattener()];
}
