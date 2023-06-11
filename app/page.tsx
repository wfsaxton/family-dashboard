import React from "react";
import DisplayText from "@/modules/display-text/component";
import Calendar from "@/modules/calendar/component";

const Home = () => {
  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <div className="flex h-1/6">
        <DisplayText text="Hello World!"/>
      </div>
      <div className="flex h-2/3 w-full flex-row gap-4">
        <Calendar />
      </div>
      <div className="flex h-1/6 w-full">
        <DisplayText />
      </div>
    </div>
  );
};

export default Home;
