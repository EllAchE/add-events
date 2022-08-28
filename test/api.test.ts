import createAndGetEvents from '../src/scripts/content-scripts/getEvents';
import searchEvents from '../src/scripts/content-scripts/searchEvents';
import createEvent from '../src/scripts/google-api/createEvent';
import { CalendarEventMessage } from '../src/types';

test('returns from api', async () => {
  const body = {
    location: {
      city: 'San Francisco',
    },
    // preferences: {
    //   suggestEvents: true,
    //   suggestSports: true,
    //   suggestMusic: true,
    //   suggestComedy: true,
    //   suggestFamily: true,
    // },
    preferences: {
      include_sports: true,
      include_music: true,
    },
  };
  const p: CalendarEventMessage[] = await createAndGetEvents(body);
  console.dir(p)
  console.dir('creating event sing');
  createEvent(p[0]);
});
