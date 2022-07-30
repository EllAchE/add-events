import { localStorageWrapper } from '../utils/browserUtils';
import { focusModalElement } from '../utils/utils';
import { run } from './run';

chrome.runtime.onMessage.addListener((msg, sender, callback) => {
  console.log('Received message from', sender);
  console.log('Message:', msg);
  const { type, elementId } = msg;

  switch (type) {
    case 'focus':
      focusModalElement(elementId);
      break;
    case 'run':
      run();
      break;
  }
});

function runIfConfigured(storage: any) {
  if (storage.runOnPageLoad) {
    run();

    // const observer = new MutationObserver(run);
    // todo: should just run when doc is loaded, but that's broken for some reasona

    // observer.observe(document, {
    //   childList: true,
    //   subtree: true,
    // });
  }
}

localStorageWrapper(runIfConfigured);
