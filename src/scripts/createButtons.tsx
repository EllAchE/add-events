import replaceText from './replaceText';

export function createEventButtons(
  elements: HTMLCollectionOf<HTMLElement>
): void {
  const allDates = new Set();

  const customClassRegex = /add_to_cal_button/;

  for (const i in elements) {
    try {
      // Ignore tags that will not display text to shorten execution
      if (
        !['STYLE', 'SCRIPT', 'NOSCRIPT', 'INPUT', 'TITLE', 'META'].includes(
          elements[i].tagName
        ) &&
        !customClassRegex.test(elements[i].className) &&
        getComputedStyle(elements[i]).opacity != '0' &&
        !['rgb(0, 0, 0)', 'rgba(0, 0, 0, 0)', 'transparent'].includes(
          getComputedStyle(elements[i]).color
        )
      ) {
        replaceText(elements[i]);
      }
    } catch (err) {
      console.error(err);
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
