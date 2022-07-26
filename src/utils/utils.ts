import { CalendarEvent } from '../scripts/types';

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
  a.forEach((item) => {
    if (b.has(item)) {
      return true;
    }
  });
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
    start: { dateTime: modalState.startDate },
    end: {
      dateTime: modalState.endDate ? modalState.endDate : modalState.startDate,
    },
    title,
    description,
  };
}
