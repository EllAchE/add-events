// on startup should check last updated and, if user hasn't updated within 24hrs then trigger an update on the BE?

import { Preferences } from '../../types';
import createEvent from '../google-api/createEvent';
import { localStorageWrapper } from '../utils/browserUtils';
import createAndGetEvents from './getEvents';

// if not retrieved events:
// retrieve and create (upsert? The event ID should be set)

// in production you'd have to hold the access keys?

// TODO: there should be more user interaction/knowledge of what events are created
export async function updateCalendarSuggestions() {
  localStorageWrapper(async (storage) => {
    const preferences: Preferences = {
      suggestEvents: storage.suggestEvents, // this method should not be called if this is false
      suggestComedy: storage.suggestComedy,
      suggestSports: storage.suggestSports,
      suggestMusic: storage.suggestMusic,
      suggestFamily: storage.suggestFamily,
    };
    const events = await createAndGetEvents(preferences);

    console.log('retrieved these events');
    console.dir(events);

    // for (const e of events) {
    //   createEvent(e);
    // }
    createEvent(events[0]);
  });
}
