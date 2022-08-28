import { CalendarEventMessage } from '../../types';

// calls the insert API https://developers.google.com/calendar/api/v3/reference/events/insert
export default async function createEvent(
  event: CalendarEventMessage,
  calendarId = 'primary'
): Promise<boolean> {
  if (!event) {
    console.error('called create event without an event');
    return;
  }

  console.dir('contents');
  console.dir(event);

  if (!event?.start?.dateTime) {
    return false;
  }

  console.info('attempting to create event on ' + calendarId);

  return new Promise((resolve, reject) => {
    chrome.identity.getAuthToken({ interactive: true }, async (token) => {
      const config = getEventCreateConfig(token, event);

      console.log(token); // TODO: Don't log token

      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
        config
      );

      console.log('Response from creating event:', response);

      resolve(response.status === 200);
    });
  });
}

function getEventCreateConfig(
  token: string,
  event: CalendarEventMessage | any
) {
  //event['id'] = event.title + event.startTime + event.location; // Prevents duplicates with identifier collision
  // TODO: fix the above event id so that it doesn't use invalid characters (only numbers/lowercase)
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
