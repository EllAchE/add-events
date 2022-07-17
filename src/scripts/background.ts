// function openTab() {
//   window.open('https://www.google.com', '_blank');
// }

// openTab();

// likely service worker doesn't have access to the window/dom etc.? Would need to be pulled from main script

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
function createEvents(events: any[], calendarId: string) {
  // will need to create a new calendar and persist that id
  let responseError, wasError;
  events.forEach((event: any) => {
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
      let config = {
        method: 'POST',
        async: true,
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
        contentType: 'json',
        sendUpdates: true,
      };
      fetch(
        'https://www.googleapis.com/calendar/v3/calendars/' +
          'primary' + // otherwise need to retrieve a specific id. Can do this when creating and persisting a calendar for events generated by ext
          '/events',
        config
      )
        .then((response) => {
          if (response.status == 403) {
            responseError =
              "I ran out of google api requests OR you've made too many calenders too quickly! Come back in a bit!";
          } else if (response.status !== 200) {
            responseError = 'Unknown error occured, please try again';
          } else if (!response.ok) {
            wasError = true;
          }

          return response.json();
        })
        .then(function (data) {
          console.log(data);
        });
    });
  });
}

console.log('test b');

chrome.runtime.onMessage.addListener(() => {
  chrome.identity.getAuthToken({ interactive: true }, function (auth_token) {
    console.log(auth_token);
  });
});

createEvents(events, 'primary');

console.log('test');
