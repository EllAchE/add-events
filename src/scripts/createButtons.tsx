import { regexes } from '../utils/utils';
import { replaceText } from './replaceText';
import { CalendarEvent } from './types';
import React from 'react';
import { Alert } from '@mui/material';

function createHyperlinkNode(
  // this button or some other item will eventually need to house all
  // of the information needed to create an event once one has been identified
  // then send that information to the service worker to add event to calendar
  node: HTMLElement,
  match: string,
  offset: number
): HTMLAnchorElement {
  let button = document.createElement('a');
  button.className = 'add_to_cal_button_ce';
  button.textContent = match;

  const eventDetails: CalendarEvent = {
    summary: 'testTitle',
    end: {
      dateTime: '2022-07-29T09:00:00-07:00',
    },
    start: {
      dateTime: '2022-07-29T09:00:00-07:00',
    },
  };

  button.addEventListener('click', (e) => {
    const res = chrome.runtime.sendMessage(
      { type: 'create_event', body: [eventDetails] },
      (response) => {
        // if (response.status == 200) {
        // }
      }
    );
    // TODO: add logic to display the success message on the page
    alert('Created Test Event');
  });

  return button;
}

export function createEventButtons(
  elements: HTMLCollectionOf<HTMLElement>
): void {
  let allDates = new Set();

  for (const i in elements) {
    // Ignore tags that will not display text to shorten execution
    if (
      elements[i].tagName != 'STYLE' &&
      elements[i].tagName != 'SCRIPT' &&
      elements[i].tagName != 'NOSCRIPT' && // TODO: need to check if these are valid to ignore
      elements[i].tagName != 'FIGURE' &&
      elements[i].tagName != 'META' &&
      elements[i].className != 'add_to_cal_button_ce'
    ) {
      const res = replaceText(elements[i], regexes[1], createHyperlinkNode);
      if (res) {
        for (const el of res) {
          allDates.add(el);
        }
      }
    }
  }

  // remove duplicates
  const dates = Array.from(allDates).map((el: string) => {
    return JSON.parse(el);
  });

  console.log('should be setting local storage key');

  console.dir(dates);

  if (dates.length > 0) {
    // hack as the function is still being excuted on tab open for unknwon reason
    chrome.storage.local.set({ currentEvents: dates }, function () {
      console.log('Value is set to ' + dates);
    });
  }

  chrome.storage.local.get('currentEvents', function (result) {
    console.log('found in storage', result);
    console.log('Value currently is ' + result.key);
  });
}
