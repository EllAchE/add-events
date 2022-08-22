export default async function searchEvents(): Promise<Response> {
  // get preferences from local storage

  const config = {
    method: 'GET',
    async: true,
    headers: {
      'Content-Type': 'application/json',
    },
    contentType: 'json',
    sendUpdates: true,
  };

  // query server with hosted events
  return fetch('http://localhost:3000/events/search', config);

  // take server response and create event with it
}
