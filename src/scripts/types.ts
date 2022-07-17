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
