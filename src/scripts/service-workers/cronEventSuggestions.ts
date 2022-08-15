// send request to BE and receive event payload to forward

import createEvent from '../google-api/createEvent';

export async function suggestEvents(): Promise<void> {
  // get preferences from local storage
  chrome.storage.local.get(null, async (items: any) => {
    const {
      suggestSports,
      suggestMusic,
      suggestComedy,
      suggestFamily,
      latitude,
      longitude,
    } = items;
    const config = {
      method: 'PUT',
      async: true,
      headers: {
        'Content-Type': 'application/json',
      },
      contentType: 'json',
      sendUpdates: true,
      body: JSON.stringify({
        suggestComedy,
        suggestSports,
        suggestMusic,
        suggestFamily,
        longitude,
        latitude,
      }),
    };

    // query server with hosted events
    const res: Response = await fetch('http://localhost:3000/events', config);
    const events: any[] = await res.json();

    // take server response and create event with it
    // Should not create if an event with matching id/conditions has already been saved to the calendar
    for (const event of events) {
      createEvent(event);
    }
  });
}
