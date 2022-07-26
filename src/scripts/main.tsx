import { createEventButtons } from './createButtons';
import { getElements } from '../utils/utils';
import { CreationModal } from '../page/CreationModal';
import { render } from 'react-dom';
import React from 'react';

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
  console.log('received from sender', sender.id, msg);
});

const observer = new MutationObserver(run); // todo: should just run when doc is loaded, buttha's broken for some reasona

// observer.observe(document, {
//   childList: true,
//   subtree: true,
// });

console.log('in main file about to call run');

run();
