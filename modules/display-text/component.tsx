import { type ModuleConfig } from "@/lib/config/module-config";
import React from "react";

interface DisplayTextConfig {
  text: string;
}

const DisplayText = ({ config }: ModuleConfig) => {
  const myConfig = config as DisplayTextConfig;

  const text = myConfig?.text || "Default text";

  return <div className="flex w-full items-center justify-center">{text}</div>;
};

export default DisplayText;
