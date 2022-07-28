import { CalendarEvent } from './types';

// calls the insert API https://developers.google.com/calendar/api/v3/reference/events/insert
export default function createEvents({
  events,
  calendarId,
  callback,
}: {
  events: CalendarEvent[];
  calendarId?: string;
  callback?: any;
}): void {
  calendarId = calendarId || 'primary';
  // will need to create a new calendar and persist that id

  if (!events) {
    console.error('called creat events without any events to create');
    return;
  }

  events.forEach((event: any) => {
    console.log(event);
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      const config = {
        method: 'POST',
        async: true,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
        contentType: 'json',
        sendUpdates: true,
      };
      fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
        config
      )
        .then((response) => {
          console.log('response from creating event reads', response);
          if (response.status === 200) {
            callback();
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
        });
    });
  });
}
