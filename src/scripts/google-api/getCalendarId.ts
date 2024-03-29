/*
    Executes callback with the default calendarId.
    First, local storage is checked. If no id is saved
    in local storage, users calendars are fetched with 
    an api call and filtered for one with a matching name
*/
// Default name of the calendar is 'Event Extension'
export default async function getCalendarId(
  storageName?: string,
  calendarName = 'Event Extension'
): Promise<string> {
  // First look for it in local storage
  const calIdPromise: Promise<string> = new Promise((resolve, reject) => {
    chrome.storage.local.get(storageName, (result) => {
      let calendarId: string;
      if (result) {
        calendarId = result[storageName];
      }

      resolve(calendarId);
    });
  });

  const calId = await calIdPromise;

  if (calId) {
    return calId;
  }

  // If not found fetch it filtering on the passed name
  const calIdPromise2: Promise<string> = new Promise((resolve, reject) => {
    chrome.identity.getAuthToken({ interactive: true }, async (token) => {
      const config = {
        method: 'GET',
        async: true,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        contentType: 'json',
        sendUpdates: true,
      };

      const res = await fetch(
        `https://www.googleapis.com/calendar/v3/users/me/calendarList`,
        config
      );

      const calendarListObj = await res.json();

      const calendarId = calendarListObj?.items
        .filter((cal: any) => {
          return cal.summary === calendarName;
        })
        .map((cal: any) => {
          return cal.id;
        });

      resolve(calendarId);
    });
  });

  return await calIdPromise2;
}
