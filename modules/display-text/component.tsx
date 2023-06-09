import React from "react";

interface DisplayTextConfig {
  text?: string;
}

const DisplayText = ({ text = "Default text" }: DisplayTextConfig) => {
  return <div className="flex w-full items-center justify-center">{text}</div>;
};

export default DisplayText;
