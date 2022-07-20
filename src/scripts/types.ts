enum DateFormat {
  US,
  EU,
}

export type ExtractedDate = {
  date: string;
  matchIndex: number;
  format?: DateFormat;
};

export type CalendarEvent = {
  end: { dateTime: string };
  start: { dateTime: string };
  time?: string;
  title?: string;
  description?: string;
  dateFormat?: string;
  timeFormat?: string;
  recurrence?: EventRecurrence;
  attendees?: any[];
  summary?: string;
};

type EventRecurrence = {
  interval: number;
  type: string;
  dayOfWeek: string;
  dayOfMonth: string;
  dayOfYear: string;
};

export type GoogleCalendarEventFields = {
  title: string;
  allDay: boolean;
  startDate: string; // prefilled with the current date
  endDate: string; //
  startTime: string;
  endTime: string;
  timeZone: string;
  recurrence: any; // daily, weekly, monthly, annually, more options. Every <interval> <day,month,year,week> <dow> end recurrence <on date, never, after x recurrences>
  location: string; // selected from dropdown too
  notification: string;
  calendarId: string; // this will be owned by extension. Potentially different cals
  description: any;
  guests: string[]; // list pulled from contacts or free solo
  guestPermissions: boolean[]; // three options
  visibility: any; // Free/Busy and default visibility
  conferencingLink: string; // button to create a conferencing linkk
};

// TODO: add the typing for the nlp types from nlp compromise

// editable within the UI: description, location, title, start/end,
// extra: conference link, notification, visibility, recurrence
