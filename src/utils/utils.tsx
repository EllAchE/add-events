import { CalendarEvent } from '../scripts/types';
import { setActiveField } from '../page/modalSlice';
import { parseDate } from 'chrono-node';
import store from '../page/store';
import React from 'react';

export function isInTheFuture(dateStr: string): boolean {
  const yearRegex = /\d{4}/g;
  // const futureYearRegex = /20([3-9][0-9]|2[3-9])/g;
  const today = new Date(Date.now() - 3600 * 1000 * 24);

  const date = new Date(dateStr); // might break for some?

  if (dateStr.match(yearRegex)) {
    return date > today;
  }
  // a more intellignet check desired, i.e. check distance if the event
  // were in the next year, or if it were in the past
  return true;
}

export function checkIfSetsShareAnElement(a: Set<any>, b: Set<any>) {
  for (const item of a) {
    if (b.has(item)) {
      return true;
    }
  }
  return false;
}

export function setIntersection(a: Set<any>, b: Set<any>): Set<any> {
  const s = new Set();

  a.forEach((item) => {
    if (b.has(item)) {
      s.add(item);
    }
  });

  return s;
}

export function getElements(): HTMLCollectionOf<Element> {
  return document.getElementsByTagName('*');
}

export function reducerReuseAddValue(state: any, action: any, key: string) {
  if (state[key]?.length > 0 && state[key].charAt(-1) !== '\\s') {
    // TODO: make sure the \\s works to not add space when there is a whitespace ending
    state[key] += ' ';
    state[key] += action.payload;
  } else {
    state[key] = action.payload;
  }
}

export function mapModalState(modalState: any): CalendarEvent {
  const { title, description } = modalState;

  return {
    start: { dateTime: new Date(modalState.startDate).toISOString() },
    end: {
      dateTime: modalState.endDate
        ? new Date(modalState.endDate).toISOString()
        : new Date(modalState.startDate).toISOString(),
    },
    summary: title,
    description:
      (description ? description + <br /> + <br /> : '') +
      'Event found at url:' +
      getCurrentPageUrl(),
  };
}

export function focusModalElement(elementId: string) {
  try {
    document.getElementById(elementId).focus();
  } catch (err: any) {
    console.error('should not happen');
  }
  store.dispatch(setActiveField(elementId));
}

export function addCurrentYearToDateWithoutYear(dateStr: string): Date {
  const date = new Date(Date.parse(dateStr));

  // depends on the fact that dates seemingly set the year to 2001 in the absence of any other info
  if (date.getFullYear() == 2001 && !/2001/.test(dateStr)) {
    date.setFullYear(new Date().getFullYear());
  }

  return date;
}

export function convertArbitraryDateStringToISODate(dateStr: string): string {
  return parseDate(dateStr).toISOString();
}

export function getCurrentPageUrl() {
  return window.location.href;
}

export function getCurrentPageHost() {
  return window.location.host;
}

export function getTextContextBounds(
  text: string,
  ind: number,
  lowerOffset = 22,
  upperOffset = 27
) {
  const lowerBound = 0 > ind - lowerOffset ? 0 : ind - lowerOffset;
  const upperBound =
    text.length + 1 < ind + upperOffset ? text.length + 1 : ind + upperOffset;

  return text.slice(lowerBound, upperBound);
}

export function setLastTabAndWindow() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const lastTabId = tabs[0].id;

    if (lastTabId) {
      chrome.storage.local.set({ lastTabId: lastTabId }, () => {
        console.log('Set last tab id to:', lastTabId);
      });
    }
  });

  chrome.windows.getCurrent((window: chrome.windows.Window) => {
    const lastWindowId = window.id;

    if (lastWindowId) {
      chrome.storage.local.set({ lastWindowId: lastWindowId }, () => {
        console.log('Set last window id to:', lastWindowId);
      });
    }
  });
}

export function setTabActive(tabId: number, windowId?: number) {
  if (windowId) {
    chrome.windows.update(windowId, { focused: true });
  }
  chrome.tabs.update(tabId, { active: true });
}

export function localStorageWrapper(
  callback: (storage: { [key: string]: any }, ...params: any[]) => any,
  ...params: any[]
) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(null, (storage: { [key: string]: any }) => {
      const result = callback(storage, ...params);
      resolve(result);
    });
  });
}

export function activateLastTab(
  storage: any,
  elementId: string,
  urlPrefix?: string
) {
  const { lastWindowId, lastTabId } = storage;

  // TODO: if the tab is no longer open, launch it in new tab
  try {
    setTabActive(lastTabId, lastWindowId);
  } catch (err: any) {
    console.warn(err);
    chrome.tabs.create({ url: urlPrefix + '/#' + elementId });
    // might need to wait for extension to run for the el to be present
    // should still launch the page
  }

  document.getElementById(elementId).focus();
}

export function setLastStorageUrl(windowPrefixUrl: string) {
  chrome.storage.local.set({ lastStorageUrl: windowPrefixUrl }, () => {
    console.log('Set last storage url to:', windowPrefixUrl);
  });
}

export function stringifyUrl(href: string) {
  return JSON.stringify({
    text: href,
    index: undefined,
    categories: ['Url'],
    surroundingText: undefined,
  });
}
