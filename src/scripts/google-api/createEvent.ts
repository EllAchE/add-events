import { CalendarEvent } from '../../types';

// calls the insert API https://developers.google.com/calendar/api/v3/reference/events/insert
export default async function createEvent(message: {
  event: CalendarEvent;
  calendarId: string;
}): Promise<boolean> {
  let { event, calendarId } = message;
  calendarId = calendarId || 'primary';

  if (!event) {
    console.error('called create event without an event');
    return;
  }

  if (!event?.start?.dateTime) {
    return false;
  }

  return new Promise((resolve, reject) => {
    chrome.identity.getAuthToken({ interactive: true }, async (token) => {
      const config = getConfig(token, event);
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
        config
      );

      console.log('Response from creating event:', response);

      resolve(response.status === 200);
    });
  });
}
function getConfig(token: string, event: CalendarEvent) {
  return {
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
}
