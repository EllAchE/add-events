export default function createCalendar(calendarName: string) {
  chrome.identity.getAuthToken({ interactive: true }, (token) => {
    const config = getCalendarCreateConfig(token, calendarName);
    fetch(`https://www.googleapis.com/calendar/v3/calendars`, config).then(
      async (response: Response) => {
        const res = await response.json();

        if (response.status === 200) {
          console.log('Successfully created calendar ' + calendarName);
        } else {
          console.warn('Error creating calendar ' + calendarName);
        }

        chrome.storage.local.set({ defaultCalendarId: res.id });

        return res;
      }
    );
  });
}

function getCalendarCreateConfig(token: string, calendarName: string) {
  return {
    method: 'POST',
    async: true,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ summary: calendarName, id: calendarName }),
    contentType: 'json',
    sendUpdates: true,
  };
}
