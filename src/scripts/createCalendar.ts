export default function createCalendar(calendarName: string, callback?: any) {
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
    fetch(`https://www.googleapis.com/calendar/v3/calendars`, config)
      .then(async (response) => {
        //callback(response.status === 200);
        const res = await response.json();

        chrome.storage.local.set({ defaultCalendarId: res.id });

        return res;
      })
      .then((data) => {
        console.log(data);
      });
  });
}
