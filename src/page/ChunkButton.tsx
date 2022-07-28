import React, { ReactElement } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { convertArbitraryDateStringToISODate } from '../utils/utils';

import {
  addLocation,
  addTitle,
  setStartDate,
  setStartTime,
  setVisibility,
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
  const cssTriggers: string[] = [];

  // business logic needed for all of
  if (categories.includes('Time')) {
    leadFunction = setStartTime;
    cssTriggers.push('add_to_cal_button_start_time');
    cssTriggers.push('add_to_cal_button_end_time');
  } else if (categories.includes('Place')) {
    leadFunction = addLocation;
    cssTriggers.push('add_to_cal_button_location');
  } else if (categories.includes('Date')) {
    leadFunction = setStartDate;
    cssTriggers.push('add_to_cal_button_start_date');
    cssTriggers.push('add_to_cal_button_end_date');
  } else {
    cssTriggers.push('add_to_cal_button_title');
  }

  const modalState = useSelector((state: any) => state.modal);

  const { activeModalField, visible } = modalState;

  const defaultOnClick = () => {
    if (visible) {
      dispatch(leadFunction(buttonText));
    }
  };

  const dateOnClick = () => {
    dispatch(setVisibility(true));
    const date = convertArbitraryDateStringToISODate(buttonText);
    dispatch(leadFunction(date));
  };

  if (cssTriggers.includes('add_to_cal_button_start_date')) {
    return (
      <span
        className={
          cssTriggers.includes(activeModalField)
            ? classList
            : 'add_to_cal_button'
        }
        onClick={dateOnClick}
      >
        {buttonText}
      </span>
    );
  } else {
    return (
      <span
        className={
          cssTriggers.includes(activeModalField)
            ? classList
            : 'add_to_cal_button'
        }
        onClick={defaultOnClick}
      >
        {buttonText}
      </span>
    );
  }
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
