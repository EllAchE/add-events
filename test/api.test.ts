import getEvents from '../src/scripts/content-scripts/getEvents';
import searchEvents from '../src/scripts/content-scripts/searchEvents';

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
  const p: any = await getEvents(body);
  console.dir(p.data);
});
