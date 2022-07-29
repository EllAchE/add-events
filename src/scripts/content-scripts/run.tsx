import React from 'react';
import { render } from 'react-dom';

import CreationModal from '../../components/injected/CreationModal';
import { getElements } from '../utils/utils';
import { createButtons } from './createButtons';

// If statement to prevent content scripts from executing in popup
export const run = () => {
  if (location.hash != '#popup' && location.hash != '#options') {
    console.log('Running script to parse page');

    const elements = getElements();

    createEventCreateModal();
    createButtons(elements as HTMLCollectionOf<HTMLElement>);

    chrome.storage.local.get(null, (result) => {
      console.log('IN RUN in storage', result);
    });
  }
};
function createEventCreateModal() {
  const newNode = document.createElement('div');
  newNode.setAttribute('id', 'event-create-modal');

  document.body.appendChild(newNode);

  render(<CreationModal />, document.getElementById('event-create-modal'));
}
