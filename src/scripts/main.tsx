import { focusModalElement } from '../utils/utils';
import { run } from './run';

chrome.runtime.onMessage.addListener((msg, sender, callback) => {
  console.log('message received from', sender);
  console.log(msg);
  const { type, elementId } = msg;

  switch (type) {
    case 'focus':
      focusModalElement(elementId);
      break;
    case 'parse-page':
      run();
      break;
  }
});

// const observer = new MutationObserver(run);
// todo: should just run when doc is loaded, but that's broken for some reasona

// observer.observe(document, {
//   childList: true,
//   subtree: true,
// });

run();
