import React from "react";
import dynamic from "next/dynamic";
import { dashboardConfig } from "@/config/config";
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

  dashboardConfig.modules.forEach((entry: ModuleEntry) => {
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

const DevPage = () => {
  const moduleByPosition = loadModules();
  const ModuleTopBar = moduleByPosition["top_bar"]?.componentType;
  const configTopBar = moduleByPosition["top_bar"]?.config;
  const ModuleTopCenter = moduleByPosition["top_center"]?.componentType;
  const configTopCenter = moduleByPosition["top_center"]?.config;
  const ModuleBottomBar = moduleByPosition["bottom_bar"]?.componentType;
  const configBottomBar = moduleByPosition["bottom_bar"]?.config;

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <div className="flex h-1/6">
        {(ModuleTopBar && <ModuleTopBar config={configTopBar} />) || (
          <div className="flex h-full w-full items-center justify-center rounded-lg bg-fuchsia-500">
            TOP BAR
          </div>
        )}
      </div>
      <div className="flex h-2/3 w-full flex-row gap-4">
        {(ModuleTopCenter && <ModuleTopCenter config={configTopCenter} />) || (
          <div className="flex h-full w-full items-center justify-center rounded-lg bg-fuchsia-500">
            TOP CENTER
          </div>
        )}
      </div>
      <div className="flex h-1/6">
        {(ModuleBottomBar && <ModuleBottomBar config={configBottomBar} />) || (
          <div className="flex h-full w-full items-center justify-center rounded-lg bg-fuchsia-500">
            BOTTOM BAR
          </div>
        )}
      </div>
    </div>
  );
};

export default DevPage;
