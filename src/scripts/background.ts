import createEvents from './createEvents';

console.log('service worker triggered');

chrome.commands.onCommand.addListener((command) => {
  switch (command) {
    case 'save-event':
      // saveEvent();
      break;
    case 'add-title':
      break;
    case 'add-end-date':
      break;
    case 'add-start-date':
      break;
    case 'add-end-time':
      break;
    case 'add-start-time':
      break;
    case 'add-description':
      break;
    case 'add-location':
      break;
    default:
      console.warn(`Command ${command} not found`);
  }
});

chrome.runtime.onMessage.addListener((message, sender, callback) => {
  console.log('received message from', sender);
  console.log('received message reading', message);
  const { events, calendarId, type } = message;

  if (type == 'create-event') {
    createEvents(events, callback, calendarId);
  }
});
