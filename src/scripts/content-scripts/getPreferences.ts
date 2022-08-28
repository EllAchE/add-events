import { CalendarEventMessage } from '../../types';

const axios = require('axios').default;

export default async function getPrefernces(
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
  // query server with hosted Prefernces
  return axios.put('http://localhost:3000/Prefernces', body);

  // take server response and create event with it
}
