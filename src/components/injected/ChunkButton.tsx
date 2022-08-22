import React, { ReactElement } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { convertArbitraryDateStringToISODate } from '../../scripts/utils/utils';

import {
  addLocation,
  addTitle,
  setStartDate,
  setStartTime,
  setVisibility,
} from '../modalSlice';
import store from '../store';

function StatelessChunkButton(props: any): ReactElement {
  const dis = useDispatch();
  const modalState = useSelector((state: any) => state.modal);

  const { activeModalField, visible } = modalState;
  const { buttonText, categories, id } = props;
  const { valueSetFunction, cssClasses } = getLeadFnAndCssTriggers(categories);
  const classList = getClasslist(categories);

  const defaultOnClick = () => {
    if (visible) {
      dis(valueSetFunction(buttonText));
    } else {
      console.warn('Must first click a start date to open the event modal.');
    }
  };

  const dateOnClick = () => {
    dis(setVisibility(true));
    const date = convertArbitraryDateStringToISODate(buttonText);
    dis(valueSetFunction(date));
  };

  if (cssClasses.includes('add_to_cal_button_start_date')) {
    return (
      <span
        id={id}
        className={
          cssClasses.includes(activeModalField) ||
          'add_to_cal_button_title' == activeModalField ||
          'add_to_cal_button_description' == activeModalField
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
        id={id}
        className={
          cssClasses.includes(activeModalField) ||
          'add_to_cal_button_title' == activeModalField ||
          'add_to_cal_button_description' == activeModalField
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

function toggleClassName(
  cssClasses: string[],
  activeModalField: any,
  classList: string
): string {
  return cssClasses.includes(activeModalField) ||
    ['add_to_cal_button_title', 'add_to_cal_button_description'].includes(
      activeModalField
    )
    ? classList
    : 'add_to_cal_button';
}

function getClasslist(categories: any) {
  let classList = 'add_to_cal_button ';

  for (const cat of categories) {
    classList += `add_to_cal_button_${cat.toLowerCase()} `;
  }

  // special case for title and description, can be handled better

  classList = classList.slice(0, -1);
  return classList;
}

function getLeadFnAndCssTriggers(categories: any) {
  let valueSetFunction = addTitle; // TODO: should add to active field otherwise (except pickers)
  let nextField = 'title';
  const cssClasses: string[] = [];

  // business logic needed for all of
  if (categories.includes('Time')) {
    valueSetFunction = setStartTime;
    cssClasses.push('add_to_cal_button_start_time');
    cssClasses.push('add_to_cal_button_end_time');
    nextField = 'location';
  } else if (categories.includes('Place')) {
    valueSetFunction = addLocation;
    cssClasses.push('add_to_cal_button_location');
  } else if (categories.includes('Date')) {
    valueSetFunction = setStartDate;
    cssClasses.push('add_to_cal_button_start_date');
    cssClasses.push('add_to_cal_button_end_date');
  } else {
    cssClasses.push('add_to_cal_button_title');
  }
  return { valueSetFunction, cssClasses, nextField };
}

export default function ChunkButton({
  buttonText,
  categories,
  id,
}: {
  buttonText: string;
  categories: string[];
  id: string;
}): ReactElement {
  return (
    <Provider store={store}>
      <StatelessChunkButton
        id={id}
        buttonText={buttonText}
        categories={categories}
      />
    </Provider>
  );
}
