// const API_KEY = process.env.APP_API_KEY ? process.env.APP_API_KEY : '';

import { CalendarEvent } from './types';

const testEvent: CalendarEvent = {
  // date: 'July 16, 2022',
  //attendees: [] as any[],
  description: 'Test Event',
  //summary: 'Test Title',
  end: {
    dateTime: '2022-07-17',
  },
  start: {
    dateTime: '2022-07-17',
  },
};

const events: CalendarEvent[] = [testEvent];

// calls the insert API https://developers.google.com/calendar/api/v3/reference/events/insert
function createEvents(events: CalendarEvent[], calendarId?: string): void {
  calendarId = calendarId ? calendarId : 'primary';
  // will need to create a new calendar and persist that id

  console.log('creating events called');
  console.log(events);
  console.log(calendarId);

  if (!events) {
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

chrome.runtime.onMessage.addListener((eventBodies: CalendarEvent[]) => {
  chrome.identity.getAuthToken({ interactive: true }, function (auth_token) {
    console.log(auth_token);
  });
  console.log(eventBodies);
  createEvents(eventBodies, 'primary');
});

console.log('test');
