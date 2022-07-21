import { CalendarEvent } from './types';

// calls the insert API https://developers.google.com/calendar/api/v3/reference/events/insert
export function createEvents(
  events: CalendarEvent[],
  calendarId?: string,
  callback?: any
): void {
  calendarId = calendarId ? calendarId : 'primary';
  // will need to create a new calendar and persist that id

  console.log('creating events called');
  console.log(events);
  console.log(calendarId);

  if (!events) {
    console.error('called create events without any events to create');
    return;
  }

  events.forEach((event: any) => {
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
      let config = {
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
          return response.json();
        })
        .then(function (data) {
          console.log(data);
        });
    });
  });
}
