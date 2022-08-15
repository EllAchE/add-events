import createEvent from '../google-api/createEvent';

import createCalendar from '../google-api/createCalendar';
import { messageActiveTab, setSettings } from '../utils/browserUtils';
import getCalendarId from '../google-api/getCalendarId';

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
      break;
    case 'clear-modal':
      messageActiveTab({
        type: 'clear-modal',
      });
      break;
    default:
      console.warn(`Command ${command} not found`);
  }
});

chrome.runtime.onMessage.addListener(
  (message, sender, callback: (response?: any) => void) => {
    console.log('Background script received message from', sender);
    console.log('Message:', message);
    const { event, calendarName, type } = message;

    if (type === 'create-event') {
      getCalendarId(
        'defaultCalendarId',
        calendarName ? calendarName : 'Event Extension'
      ).then((calendarId) => {
        createEvent(event, calendarId).then((isSuccess) => {
          callback(isSuccess);
        });
      });
    } else if (type === 'get-default-calendar-id') {
      console.log('not impld');
    }

    return true;
  }
);

// Default calendar name is Event Extension
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('Installed extension for first time!');
    setSettings({ runOnPageLoad: true });
    createCalendar('Event Extension'); // TODO: appropriately rename the calendar
  } else if (details.reason === 'update') {
    console.log('Updated extension!');
  }
});
