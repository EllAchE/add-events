import { CalendarEvent } from './types';

// calls the insert API https://developers.google.com/calendar/api/v3/reference/events/insert
export default async function createEvent(
  //message: { events: CalendarEvent[]; calendarId: string },
  message: any
) {
  let { events, calendarId } = message;
  console.log(message);
  calendarId = calendarId || 'primary';
  // will need to create a new calendar and persist that id

  if (!events) {
    console.error('called creat events without any events to create');
    return;
  }

  const event = events[0];
  console.log(event);

  if (!event?.startDate?.dateTime) {
    return false;
  }

  const createEventSuccessPromise: Promise<boolean> = new Promise(
    (resolve, reject) => {
      chrome.identity.getAuthToken({ interactive: true }, async (token) => {
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
        const response = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
          config
        );

        console.log('response from creating event reads', response);

        resolve(response.status === 200);
      });
    }
  );

  const isSuccess = await createEventSuccessPromise;

  return isSuccess;
}
