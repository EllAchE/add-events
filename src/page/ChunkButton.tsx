import React, { ReactElement } from 'react';
import { Provider, useDispatch } from 'react-redux';

import {
  addLocation,
  addTitle,
  setStartDate,
  setStartTime,
} from './modalSlice';
import store from './store';

function StatelessChunkButton(props: any): ReactElement {
  const dispatch = useDispatch();

  const { buttonText, categories } = props;

  let classList = 'add_to_cal_button ';

  for (const cat of categories) {
    classList += `add_to_cal_button_${cat.toLowerCase()} `;
  }
  classList = classList.slice(0, -1);

  let leadFunction = addTitle;

  // business logic needed for all of these
  if (categories.includes('Date')) {
    leadFunction = setStartDate;
  }
  if (categories.includes('Place')) {
    leadFunction = addLocation;
  }
  if (categories.includes('Time')) {
    leadFunction = setStartTime;
  }

  return (
    <span
      className={classList}
      onClick={() => {
        dispatch(leadFunction(buttonText));
      }}
    >
      {buttonText}
    </span>
  );
}

export default function ChunkButton({
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
