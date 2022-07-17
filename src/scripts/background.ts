// const API_KEY = process.env.APP_API_KEY ? process.env.APP_API_KEY : '';

const testEvent = {
  attendees: [] as any[],
  description: 'Test Event',
  summary: 'Test Title',
  end: {
    date: '2022-07-17',
  },
  start: {
    date: '2022-07-17',
  },
};

const events: any[] = [testEvent];

// calls the insert API https://developers.google.com/calendar/api/v3/reference/events/insert
function createEvents(events: any[], calendarId?: string) {
  calendarId = calendarId ? calendarId : 'primary';
  // will need to create a new calendar and persist that id
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

chrome.runtime.onMessage.addListener(() => {
  chrome.identity.getAuthToken({ interactive: true }, function (auth_token) {
    console.log(auth_token);
  });
});

createEvents(events, 'primary');

console.log('test');
