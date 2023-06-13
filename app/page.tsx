import React from "react";
import Calendar from "@/modules/calendar/calendar";
import Todolist from "@/modules/todolist/todolist";

const Home = () => {
  return (
    <div className="flex flex-row h-full w-full">
    <div className="flex  h-full w-full">
      <Calendar />
    </div>
    <div className="flex w-1/4">
      <Todolist />
      </div>
    </div>

  );
};

export default Home;
