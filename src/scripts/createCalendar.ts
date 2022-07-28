export default function createCalendar(calendarName: string) {
  chrome.identity.getAuthToken({ interactive: true }, (token) => {
    const config = {
      method: 'POST',
      async: true,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ summary: calendarName }),
      contentType: 'json',
      sendUpdates: true,
    };
    fetch(`https://www.googleapis.com/calendar/v3/calendars`, config).then(
      async (response) => {
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
