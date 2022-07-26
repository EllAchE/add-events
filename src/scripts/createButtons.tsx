import replaceText from './replaceText';

export function createEventButtons(
  elements: HTMLCollectionOf<HTMLElement>,
  ...params: any
): void {
  const allDates = new Set();

  const customClassRegex = /add_to_cal_button/;

  for (const i in elements) {
    // Ignore tags that will not display text to shorten execution
    if (
      elements[i].tagName != 'STYLE' &&
      elements[i].tagName != 'SCRIPT' &&
      elements[i].tagName != 'NOSCRIPT' && // TODO: need to check if these are valid to ignore
      elements[i].tagName != 'FIGURE' &&
      elements[i].tagName != 'META' &&
      !customClassRegex.test(elements[i].className)
    ) {
      const res = replaceText(elements[i], undefined);
      if (res) {
        for (const el of res) {
          allDates.add(el);
        }
      }
    }
  }

  // remove duplicates
  const dates = Array.from(allDates).map((el: string) => JSON.parse(el));

  if (dates.length > 0) {
    // hack as the function is still being excuted on tab open for unknwon reason
    chrome.storage.local.set({ currentEvents: dates }, () => {
      console.log(`local storage set to ${dates}`);
    });
  }
}
