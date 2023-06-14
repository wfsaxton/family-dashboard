import React from "react";
import Calendar from "@/modules/calendar/calendar";
import Todolist from "@/modules/todolist/todolist";
import Clock from "@/modules/clock/clock";

const Home = () => {
  return (
    <div className="flex h-full w-full flex-row gap-2">
      <div className="flex h-full w-full">
        <Calendar />
      </div>
      <div className="flex h-full w-1/4 p-2">
        <div className="flex h-full w-full flex-col gap-2">
          <div className="flex w-full">
            <Clock />
          </div>
          <div className="flex w-full h-full">
            <Todolist />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
