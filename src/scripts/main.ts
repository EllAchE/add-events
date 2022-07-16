import { createEventButtons } from './createButtons';
import { getElements } from './utils';

const run = () => {
  var elements = getElements();
  console.log('running element replacement scritp');
  createEventButtons(elements as HTMLCollectionOf<HTMLElement>);
};

chrome.runtime.onMessage.addListener((msg, sender, callback) => {
  console.log('received from sender', sender.id, msg);
  run();
});

run();