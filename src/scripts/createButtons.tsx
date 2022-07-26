import { replaceText } from './replaceText';
import { CalendarEvent } from './types';

function createWordButton(
  buttonText: string,
  categories: string[]
): HTMLElement {
  let button = document.createElement('span');
  button.classList.add(`add_to_cal_button`);

  // business logic to resolve type conflicts (date and time)
  for (const cat of categories) {
    button.classList.add(`add_to_cal_button_${cat.toLowerCase()}`);
  }
  button.textContent = buttonText;

  let leadCat = categories[0];

  // business logic needed for all of these
  if (categories.includes('Date')) {
    leadCat = 'Date';
  }
  if (categories.includes('Place')) {
    leadCat = 'Place';
  }
  if (categories.includes('Time')) {
    leadCat = 'Time';
  }

  // sequence we want -> start date, -> title, end date, start time, end time, location
  // Finish with ctrl somehting, switch to title with ctrl t, endt with ctorl...

  // ideal ux would let you type it in focused window if not found, or skip

  button.addEventListener('click', (e) => {
    // rather than local storage, message sending could do the job?
    const obj: any = {};
    obj[leadCat] = buttonText;
    chrome.storage.local.set(obj, function () {
      console.log('set temp storage to', obj);
    });

    // const res = chrome.runtime.sendMessage(
    //   { type: 'create_event', body: [eventDetails] },
    //   (response) => {
    //     // if (response.status == 200) {
    //     // }
    //   }
    // );
    // // TODO: add logic to display the success message on the page
    // alert('Created Test Event');
  });

  return button;
}

export function createEventButtons(
  elements: HTMLCollectionOf<HTMLElement>,
  ...params: any
): void {
  let allDates = new Set();

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
      console.log('calling replace t$ext');
      const res = replaceText(
        elements[i],
        createWordButton,
        undefined,
        ...params
      );
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
      console.log('local storage set to ' + dates);
    });
  }
}
