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

chrome.runtime.onMessage.addListener((message: any) => {
  if (message.type != 'create_event') return;
  const eventBodies = message.body;
  chrome.identity.getAuthToken({ interactive: true }, function (auth_token) {
    console.log(auth_token);
  });

  // needs a callback that conditionally renders success/failure of the createEvents

  // <Alert></Alert>;
  console.log(eventBodies);
  //createEvents(eventBodies, 'primary');
});

console.log('service worker triggered');
