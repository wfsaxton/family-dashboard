import React from "react";
import { modules as appModules } from "@/config/config";
import { type ModuleEntry } from "@/lib/module-entry";
import dynamic from "next/dynamic";
import { type ModuleConfig } from "@/lib/module-config";

interface LoadedModule {
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
  componentType: React.ComponentType<ModuleConfig>;
  config?: ModuleConfig;
}

interface ModuleByPosition {
  [key: string]: LoadedModule;
}

const loadModules = (): ModuleByPosition => {
  const moduleByPosition: ModuleByPosition = {};

  appModules.forEach((entry: ModuleEntry) => {
    const importedModule = dynamic<ModuleConfig>(
      () => import(`@/modules/${entry.name}`)
    );
    const loadedModule: LoadedModule = {
      name: entry.name,
      position: entry.position,
      componentType: importedModule,
      config: entry.config,
    };

    moduleByPosition[entry.position] = loadedModule;
  });

  return moduleByPosition;
};

const Dashboard: React.FC = () => {
  const moduleByPosition = loadModules();
  const ModuleTopLeft = moduleByPosition["top_bar"]?.componentType;
  const configTopLeft = moduleByPosition["top_bar"]?.config;

  return (
    <div className="flex">
      <div className="w-1/2">
        {ModuleTopLeft && <ModuleTopLeft config={configTopLeft} />}
      </div>
    </div>
  );
};

export default Dashboard;
