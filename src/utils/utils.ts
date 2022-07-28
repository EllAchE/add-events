import { CalendarEvent } from '../scripts/types';
import { setActiveField } from '../page/modalSlice';
import { parseDate } from 'chrono-node';
import store from '../page/store';

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

  console.log('mapping modal state');
  console.log(modalState);

  return {
    start: { dateTime: new Date(modalState.startDate).toISOString() },
    end: {
      dateTime: modalState.endDate
        ? new Date(modalState.endDate).toISOString()
        : new Date(modalState.startDate).toISOString(),
    },
    summary: title,
    description,
  };
}

export function focusModalElement(elementId: string) {
  try {
    document.getElementById(elementId).focus();
  } catch (err) {
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
