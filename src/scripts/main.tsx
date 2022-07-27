import React from 'react';
import { render } from 'react-dom';

import CreationModal from '../page/CreationModal';
import { getElements } from '../utils/utils';
import { createEventButtons } from './createButtons';
import store from '../page/store';
import { setActiveField } from '../page/modalSlice';

const run = () => {
  console.log('run triggered');

  const elements = getElements();

  const newNode = document.createElement('div');
  newNode.setAttribute('id', 'event-create-modal');

  document.body.appendChild(newNode);

  render(<CreationModal />, document.getElementById('event-create-modal'));

  createEventButtons(elements as HTMLCollectionOf<HTMLElement>);
};

chrome.runtime.onMessage.addListener((msg, sender, callback) => {
  console.log('message received from', sender);
  console.log(msg);
  const { type, elementId } = msg;

  switch (type) {
    case 'focus':
      console.log('setting focus');
      document.getElementById(elementId).focus();
      store.dispatch(setActiveField(elementId));
  }
});

// const observer = new MutationObserver(run);
// todo: should just run when doc is loaded, but that's broken for some reasona

// observer.observe(document, {
//   childList: true,
//   subtree: true,
// });

console.log('in main file about to call run');

run();
