import { createEventButtons } from './createButtons';
import { getElements } from '../utils/utils';
import { CreationModal } from '../page/CreationModal';
import { createContext, useState } from 'react';
import { render } from 'react-dom';
import React from 'react';

const run = () => {
  console.log('run triggered');

  const elements = getElements();

  const dateModalVisible: boolean = undefined;
  const startDate: string = undefined;
  const endDate: string = undefined;
  const startTime: string = undefined;
  const endTime: string = undefined;
  const title: string = undefined;
  const description: string = undefined;
  const location: string = undefined;

  const defaultContext = {
    dateModalVisible,
    startDate,
    endDate,
    startTime,
    endTime,
    title,
    description,
    location,
    setStartDate: () => {},
    setEndDate: () => {},
    setStartTime: () => {},
    setEndTime: () => {},
    setTitle: () => {},
    setDescription: () => {},
    setLocation: () => {},
    setDateModalVisible: () => {},
  };

  const DateModalContext = createContext(defaultContext);

  const newNode = document.createElement('div');
  newNode.setAttribute('id', 'event-create-modal');

  document.body.appendChild(newNode);

  render(
    <DateModalContext.Provider value={defaultContext}>
      <CreationModal
      // visible={dateModalVisible}
      // startDate={startDate}
      // endDate={endDate}
      // startTime={startTime}
      // endTime={endTime}
      // title={title}
      // description={description}
      // location={location}
      // setStartDate={setStartDate}
      // setEndDate={setEndDate}
      // setStartTime={setStartTime}
      // setEndTime={setEndTime}
      // setTitle={setTitle}
      // setDescription={setDescription}
      // setLocation={setLocation}
      // setDateModalVisible={setDateModalVisible}
      />
    </DateModalContext.Provider>,
    document.getElementById('event-create-modal')
  );

  createEventButtons(elements as HTMLCollectionOf<HTMLElement>);
};

chrome.runtime.onMessage.addListener((msg, sender, callback) => {
  console.log('received from sender', sender.id, msg);
});

const observer = new MutationObserver(run); // todo: should just run when doc is loaded, buttha's broken for some reasona

// observer.observe(document, {
//   childList: true,
//   subtree: true,
// });

console.log('in main file about to call run');

run();
