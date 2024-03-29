import { CalendarEventMessage } from '../../types';

const axios = require('axios').default;

export default async function createAndGetEvents(
  body: any
): Promise<CalendarEventMessage[]> {
  // get preferences from local storage

  const config = {
    method: 'PUT',
    async: true,
    headers: {
      'Content-Type': 'application/json',
    },
    contentType: 'json',
    sendUpdates: true,
  };

  console.dir('calling put');
  // query server with hosted events
  const axiosResponse = await axios.put('http://localhost:3000/events', body);

  console.dir('res');
  console.dir(axiosResponse);

  return axiosResponse?.data?.events;

  // take server response and create event with it
}
