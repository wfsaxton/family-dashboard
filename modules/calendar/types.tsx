type CalendarEvent = {
  id: string;
  calendarId: string;
  summary: string;
  start?: string;
  end?: string;
  color: string;
};

type DayOfCalendarEvents = {
  day: string;
  events: CalendarEvent[];
};

type CalendarConfig = {
  id: string;
  name: string;
  color: string;
  isParent: boolean;
  isInitiallyDisplayed: boolean;
};

export { type CalendarEvent as Event, type DayOfCalendarEvents as DayOfEvents, type CalendarConfig};
