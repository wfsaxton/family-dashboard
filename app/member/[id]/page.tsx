import React from "react";
import dynamic from "next/dynamic";
import { Config } from "@/config/config";
import { type ModuleEntry } from "@/lib/config/module-entry";
import { type ModuleConfig } from "@/lib/config/module-config";
import { type ModulePosition } from "@/lib/config/module-position";

interface LoadedModule {
  name: string;
  position: ModulePosition;
  componentType: React.ComponentType<ModuleConfig>;
  config?: ModuleConfig;
}

interface ModuleByPosition {
  [key: string]: LoadedModule;
}

const loadModules = (): ModuleByPosition => {
  const moduleByPosition: ModuleByPosition = {};

  Config.modules.forEach((entry: ModuleEntry) => {
    const importedModule = dynamic<ModuleConfig>(
      () => import(`@/modules/${entry.name}/component`)
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
