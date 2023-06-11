import React from "react";

interface CalendarConfig {
  text?: string;
}

const Calendar = ({ text = "Default calendar" }: CalendarConfig) => {
  return <div className="flex w-full items-center justify-center">{text}</div>;
};

export default Calendar;
