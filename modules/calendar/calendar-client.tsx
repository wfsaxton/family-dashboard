"use client";

import React, { useEffect, useState } from "react";
import { type Event, type DayOfEvents, type CalendarConfig } from "./types";
import dayjs from "dayjs";
import CalendarToggle from "./calendar-toggle";
import { cloudtasks } from "googleapis/build/src/apis/cloudtasks";

type CalendarClientProps = {
  calendarConfigs: CalendarConfig[];
  weekOfDaysOfEvents: DayOfEvents[];
};

const CalendarClient = ({
  calendarConfigs,
  weekOfDaysOfEvents,
}: CalendarClientProps) => {
  const [calendarToggles, setCalendarToggles] = useState<Map<string, boolean>>(
    new Map<string, boolean>()
  );

  useEffect(() => {
    const initialCalendarToggles = new Map<string, boolean>();
    for (const calendarConfig of calendarConfigs) {
      initialCalendarToggles.set(
        calendarConfig.id,
        calendarConfig.isInitiallyDisplayed
      );
    }
    setCalendarToggles(initialCalendarToggles);
  }, [calendarConfigs]);

  const handleCalendarToggleChange = (calendarId: string) => {
    setCalendarToggles((prevCalendarToggles) => {
      const newCalendarToggles = new Map(prevCalendarToggles);
      newCalendarToggles.set(calendarId, !prevCalendarToggles.get(calendarId));

      return newCalendarToggles;
    });
  };

  const dayOfTheWeek = dayjs().day();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 p-2">
      <div className="grid h-full w-full grid-cols-7 gap-4">
        {weekOfDaysOfEvents.map((dayOfEvents: DayOfEvents, index) => {
          return (
            <div
              key={dayOfEvents.day}
              className={`flex h-full flex-col gap-2 rounded-lg border-2 p-2 text-center ${
                index !== dayOfTheWeek ? "border-white" : "border-orange-400"
              }`}
            >
              <div className="flex flex-col gap-2">
                <div className="text-2xl">{dayOfEvents.day}</div>
                {dayOfEvents.events.map((event: Event) => {
                  if (calendarToggles.get(event.calendarId)) {
                    return (
                      <div
                        key={event.id}
                        className={`w-full rounded-md ${event.color} p-1 text-left`}
                      >
                        <div>{event.summary}</div>
                        <div>
                          {dayjs(event.start).format("h:mm A")} -{" "}
                          {dayjs(event.end).format("h:mm A")}
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="h-1/8 grid w-full grid-cols-6 gap-4">
        {calendarConfigs.map((calendarConfig: CalendarConfig) => {
          return (
            <CalendarToggle
              key={calendarConfig.id}
              checked={calendarToggles.get(calendarConfig.id)}
              calendarConfig={calendarConfig}
              toggleVisibility={handleCalendarToggleChange}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CalendarClient;
