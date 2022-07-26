import React, { ReactElement } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';

import {
  addLocation,
  addStartDate,
  addStartTime,
  addTitle,
  setStartDate,
} from './modalSlice';
import store from './store';

export function creaateWordButton(
  buttonText: string,
  categories: string[],
): HTMLElement {
  // const newNode = document.createElement('div');
  // newNode.setAttribute('id', 'event-create-modal');

  // document.body.appendChild(newNode);

  // render(<ChunkButton/>, document.getElementById('event-create-modal'));

  const button = document.createElement('span');
  button.classList.add('add_to_cal_button');

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
    // rather than local storage, message sending could do the job?'
    // const obj: any = {};
    // obj[leadCat] = buttonText;
    // chrome.storage.local.set(obj, function () {
    //   console.log('set temp storage to', obj);
    // });
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

export function ChunkButton({
  buttonText,
  categories,
}: {
  buttonText: string;
  categories: string[];
}): ReactElement {
  return (
    <Provider store={store}>
      <StatelessChunkButton buttonText={buttonText} categories={categories} />
    </Provider>
  );
}

function StatelessChunkButton(props: any): ReactElement {
  const modalState = useSelector((state: any) => state.modal);
  const dispatch = useDispatch();

  const {
    visible,
    startDate,
    endDate,
    startTime,
    endTime,
    title,
    description,
    location,
  } = modalState;
  const { buttonText, categories } = props;

  let classList = 'add_to_cal_button ';

  for (const cat of categories) {
    classList += `add_to_cal_button_${cat.toLowerCase()} `;
  }
  classList = classList.slice(0, -1);

  let leadCat = categories[0];
  let leadFunction = addTitle;

  // business logic needed for all of these
  if (categories.includes('Date')) {
    leadCat = 'Date';
    leadFunction = setStartDate;
  }
  if (categories.includes('Place')) {
    leadCat = 'Place';
    leadFunction = addLocation;
  }
  if (categories.includes('Time')) {
    leadCat = 'Time';
    leadFunction = addStartTime;
  }

  return (
    <span
      className={classList}
      onClick={(e) => {
        dispatch(leadFunction(buttonText));
      }}
    >
      {buttonText}
    </span>
  );
}
