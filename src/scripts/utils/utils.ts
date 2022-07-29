import { parseDate } from 'chrono-node';
import { setActiveField } from '../../components/modalSlice';
import store from '../../components/store';

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
    chunkButtonId: href,
  });
}
