import { type ModuleConfig } from "./module-config";

export interface ModuleEntry {
  name: string;
  position:
    | "top_bar"
    | "top_left"
    | "top_center"
    | "top_right"
    | "upper_third"
    | "middle_center"
    | "lower_third"
    | "bottom_left"
    | "bottom_center"
    | "bottom_right"
    | "bottom_bar"
    | "fullscreen_above"
    | "fullscreen_below";
  config?: ModuleConfig;
}
