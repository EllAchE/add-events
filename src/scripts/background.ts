import createEvent from './createEvent';

console.log('service worker triggered');
import createCalendar from './createCalendar';
import getCalendarId from './getCalendarId';
import { messageActiveTab } from './queryActiveTab';
//const dispatch = useDispatch();

chrome.commands.onCommand.addListener((command, tab) => {
  console.log('received command', command);
  switch (command) {
    case 'save-event':
      // saveEvent();
      break;
    case 'add-title':
      messageActiveTab({
        type: 'focus',
        elementId: 'add_to_cal_button_title',
      });
      break;
    case 'add-end-date':
      messageActiveTab({
        type: 'focus',
        elementId: 'add_to_cal_button_end_date',
      });
      break;
    case 'add-start-date':
      messageActiveTab({
        type: 'focus',
        elementId: 'add_to_cal_button_start_date',
      });
      break;
    case 'add-end-time':
      messageActiveTab({
        type: 'focus',
        elementId: 'add_to_cal_button_end_time',
      });
      break;
    case 'add-start-time':
      messageActiveTab({
        type: 'focus',
        elementId: 'add_to_cal_button_start_time',
      });
      break;
    case 'add-description':
      messageActiveTab({
        type: 'focus',
        elementId: 'add_to_cal_button_description',
      });
      break;
    case 'add-location':
      messageActiveTab({
        type: 'focus',
        elementId: 'add_to_cal_button_location',
      });
      break;
    case 'parse-page':
      messageActiveTab({
        type: 'run',
      });
    default:
      console.warn(`Command ${command} not found`);
  }
});

chrome.runtime.onMessage.addListener(
  (message, sender, callback: (response?: any) => void) => {
    console.log('received message from', sender);
    console.log('received message reading', message);
    const { events, calendarName, type } = message;

    if (type === 'create-event') {
      getCalendarId(
        calendarName ? calendarName : 'Event Extension',
        'defaultCalendarId'
      ).then((calendarId) => {
        createEvent({ events, calendarId }).then((isSuccess) => {
          console.log('was it ddd', isSuccess);
          callback(isSuccess);
        });
      });
    } else if (type === 'get-default-calendar-id') {
      console.log('not impld');
    }

    return true;
  }
);

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    createCalendar('Event Extension'); // TODO: appropriately rename the calendar
  } else if (details.reason === 'update') {
    console.log('update');
  }
});
