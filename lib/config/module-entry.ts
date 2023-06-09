import { type ModuleConfig } from "./module-config";
import { type ModulePosition } from "./module-position";

export interface ModuleEntry {
  name: string;
  position: ModulePosition;
  config?: ModuleConfig;
}
