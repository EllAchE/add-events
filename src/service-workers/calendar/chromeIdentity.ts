// https://developers.google.com/calendar/api/v3/reference/events/quickAdd

function createEvents(events: any[], id: string) {
  let responseError, wasError;
  events.forEach((e: any) => {
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
      let config = {
        method: 'POST',
        async: true,
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(e),
        contentType: 'json',
      };
      fetch(
        'https://www.googleapis.com/calendar/v3/calendars/' + id + '/events',
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

  if (responseError !== '') {
    document.getElementById('message').innerHTML = responseError;
    document.getElementById('message').style.color = 'red';
    document.getElementById('loader').style.display = 'none';
  } else if (wasError) {
    document.getElementById('message').innerHTML =
      'There was an error adding the events to your calendar';
    document.getElementById('message').style.color = 'red';
    document.getElementById('loader').style.display = 'none';
  } else {
    document.getElementById('message').innerHTML =
      'calendar sucessfully added :)';
    document.getElementById('message').style.color = 'green';
    document.getElementById('loader').style.display = 'none';
  }
}
