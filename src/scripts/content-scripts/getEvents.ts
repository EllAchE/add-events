const axios = require('axios').default;

export default async function getEvents(body: any): Promise<any> {
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
  return axios.put('http://localhost:3000/events', body);

  // take server response and create event with it
}
