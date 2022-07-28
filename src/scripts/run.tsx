import React from 'react';
import { render } from 'react-dom';

import CreationModal from '../page/CreationModal';
import { getElements } from '../utils/utils';
import { createEventButtons } from './createButtons';

// If statement to prevent content scripts from executing in popup
export const run = () => {
  if (location.hash != '#popup' && location.hash != '#options') {
    const elements = getElements();

    const newNode = document.createElement('div');
    newNode.setAttribute('id', 'event-create-modal');

    document.body.appendChild(newNode);

    render(<CreationModal />, document.getElementById('event-create-modal'));

    createEventButtons(elements as HTMLCollectionOf<HTMLElement>);
  }
};
