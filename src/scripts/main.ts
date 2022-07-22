import { createEventButtons } from './createButtons';
import { getElements } from '../utils/utils';

const run = () => {
  console.log('call rn');
  var elements = getElements();
  createEventButtons(elements as HTMLCollectionOf<HTMLElement>);
};

chrome.runtime.onMessage.addListener((msg, sender, callback) => {
  console.log('received from sender', sender.id, msg);
});

const observer = new MutationObserver(run); // todo: should just run when doc is loaded, buttha's broken for some reasona

observer.observe(document, {
  childList: true,
  subtree: true,
});
