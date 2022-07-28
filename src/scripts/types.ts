export type ExtractedDate = {
  date: string;
  matchIndex: number;
};

type EventRecurrence = {
  interval: number;
  type: string;
  dayOfWeek: string;
  dayOfMonth: string;
  dayOfYear: string;
};

export type CalendarEvent = {
  end: { dateTime?: string; date?: string };
  start: { dateTime?: string; date?: string };
  startTime?: string;
  endTime?: string;
  title?: string;
  description?: string;
  dateFormat?: string;
  timeFormat?: string;
  recurrence?: EventRecurrence;
  attendees?: any[];
  summary?: string;
  status?: 'tentative' | 'cancelled' | 'confirmed';
};

export type GoogleCalendarEventFields = {
  title: string;
  allDay: boolean;
  startDate: string; // prefilled with the current date
  endDate: string; //
  startTime: string;
  endTime: string;
  timeZone: string;
  recurrence: any;
  // daily, weekly, monthly, annually, more options.
  // Every <interval> <day,month,year,week> <dow>
  // end recurrence <on date, never, after x recurrences>
  location: string; // selected from dropdown too
  notification: string;
  calendarId: string; // this will be owned by extension. Potentially different cals
  description: any;
  guests: string[]; // list pulled from contacts or free solo
  guestPermissions: boolean[]; // three options
  visibility: any; // Free/Busy and default visibility
  conferencingLink: string; // button to create a conferencing linkk
};

export type NLPChunk = {
  text: string;
  index: number;
  categories: string[];
};

export type ChunkSets = {
  personSet: Set<string>;
  placeSet: Set<string>;
  emailSet: Set<string>;
  properNounSet: Set<string>;
  dateSet: Set<string>;
  atMentionSet: Set<string>;
  urlSet?: Set<string>;
  internalUrlSet?: Set<string>;
  samePageUrlSet?: Set<string>;
  externalUrlSet?: Set<string>;
  [key: string]: Set<String>;
};

// TODO: add the typing for the nlp types from nlp compromise

// editable within the UI: description, location, title, start/end,
// extra: conference link, notification, visibility, recurrence
