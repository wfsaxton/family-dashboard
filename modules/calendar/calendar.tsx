import dayjs, { type Dayjs } from "dayjs";
import { google, type Auth, type calendar_v3 } from "googleapis";
import React from "react";

import { calendarConfigs } from "@/config/config";
import { auth, clerkClient, SignIn, SignInButton } from "@clerk/nextjs";

import CalendarClient from "./calendar-client";
import { type CalendarConfig, type DayOfEvents, type Event } from "./types";

const getGoogle0Auth2Client = async () => {
  const { userId } = auth();

  if (!userId) return undefined;

  const getAccessToken = async () => {
    try {
      const accessToken = await clerkClient.users.getUserOauthAccessToken(
        userId,
        "oauth_google"
      );

      return accessToken;
    } catch (e) {
      return undefined;
    }
  };

  const accessToken = await getAccessToken();

  if (!accessToken || !accessToken[0]) return undefined;

  const oauth2Client = new google.auth.OAuth2();

  oauth2Client.setCredentials({ access_token: accessToken[0].token });
  return oauth2Client;
};

const getEvents = async (
  oauth2Client: Auth.OAuth2Client,
  calendarConfig: CalendarConfig,
  startOfWeek: Dayjs,
  endOfWeek: Dayjs
) => {
  try {
    const googleEvents = await google
      .calendar({ version: "v3", auth: oauth2Client })
      .events.list({
        calendarId: calendarConfig.id,
        timeMin: startOfWeek.toISOString(),
        timeMax: endOfWeek.toISOString(),
        singleEvents: true,
      });

    if (!googleEvents || !googleEvents.data || !googleEvents.data.items) {
      return undefined;
    }

    const events = googleEvents.data.items.map(
      (event: calendar_v3.Schema$Event) => {
        return {
          id: event.id,
          calendarId: calendarConfig.id,
          summary: event.summary,
          start: event.start?.dateTime,
          end: event.end?.dateTime,
          color: calendarConfig.color,
        } as Event;
      }
    );

    return events;
  } catch (e) {
    console.log("error", e);
    return undefined;
  }
};

const Calendar = async () => {
  const oauth2Client = await getGoogle0Auth2Client();
  if (!oauth2Client) {
    return (
      <div>
        Not signed in
        <SignInButton />
      </div>
    );
  }

  const startOfWeek = dayjs().startOf("w");
  const endOfWeek = dayjs().endOf("w");

  const getWeekOfDaysOfEvents = async () => {
    const days: string[] = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const weeklyEvents: Event[][] = [[], [], [], [], [], [], []];

    for (const calendarConfig of calendarConfigs) {
      const events = await getEvents(
        oauth2Client,
        calendarConfig,
        startOfWeek,
        endOfWeek
      );

      if (!events) {
        console.log(`No events for ${calendarConfig.id}`);
        continue;
      }

      for (const event of events) {
        if (event.start === undefined || event.end === undefined) {
          console.log("Untimed event: ", event.summary);
          continue;
        }

        const day = dayjs(event.start).day();

        if (day < -1 || day > 6) {
          console.log("Invalid day: ", day, event.summary);
          continue;
        }

        const weeklyEventsForDay = weeklyEvents[day];

        if (!weeklyEventsForDay) {
          console.log("Invalid day: ", event.summary);
          continue;
        }

        // Check for duplicate events.  If found, add a parent name to the summary
        const existingEvent = weeklyEventsForDay.find(
          (e: Event) => e.id === event.id
        );

        if (existingEvent) {
          // Disabling this functionality for now
          // console.log("Duplicate event: ", event)
          // if (calendarConfig.isParent) {
          //   existingEvent.summary = `${existingEvent.summary} (${calendarConfig.name})            `;
          // }
        } else {
          weeklyEvents[day]?.push(event);
        }
      }
    }

    const weekOfDayOfEvents: DayOfEvents[] = days.map(
      (day: string, index: number) => {
        return {
          day,
          events: weeklyEvents[index]?.sort((a, b) => {
            if (!a.start) return -1;
            if (!b.start) return 1;
            return dayjs(a.start).diff(dayjs(b.start));
          }),
        } as DayOfEvents;
      }
    );

    return weekOfDayOfEvents;
  };

  const weekOfDaysOfEvents = await getWeekOfDaysOfEvents();

  if (!weekOfDaysOfEvents) {
    return (
      <div className="flex w-full items-center justify-center">
        No events <SignIn />
      </div>
    );
  }

  return (
    <CalendarClient
      calendarConfigs={calendarConfigs}
      weekOfDaysOfEvents={weekOfDaysOfEvents}
    />
  );
};

export default Calendar;
