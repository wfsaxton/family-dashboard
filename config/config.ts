import { type ModuleEntry } from "@/lib/config/module-entry";

export const Config: DashboardConfig = {
  units: "metric",
  modules: [
    {
      name: "display-text",
      position: "top_bar",
      config: {
        text: "Hello World!",
      },
    },
  ],
};

type DashboardConfig = {
  units: string;
  modules: ModuleEntry[];
};