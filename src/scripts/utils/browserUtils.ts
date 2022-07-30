export function queryActiveTab(callback: any, ...params: any[]) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    callback(tabs[0].id);
  });
}

export function messageActiveTab(message: any) {
  console.log('Sending message to active tab', message);
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
}

export function openCalendar() {
  window.open('https://calendar.google.com/calendar/u/0/r', '_blank');
}

export function openTwitter() {
  window.open('https://twitter.com/myhandleisbest', '_blank');
}

export function openGithub() {
  window.open('https://github.com/EllAchE', '_blank');
}

export function setLastTabAndWindow() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const lastTabId = tabs[0].id;

    if (lastTabId) {
      chrome.storage.local.set({ lastTabId: lastTabId }, () => {
        console.log('Set last tab id to:', lastTabId);
      });
    }
  });

  chrome.windows.getCurrent((window: chrome.windows.Window) => {
    const lastWindowId = window.id;

    if (lastWindowId) {
      chrome.storage.local.set({ lastWindowId: lastWindowId }, () => {
        console.log('Set last window id to:', lastWindowId);
      });
    }
  });
}

export function setTabActive(tabId: number, windowId?: number) {
  if (windowId) {
    chrome.windows.update(windowId, { focused: true });
  }
  chrome.tabs.update(tabId, { active: true });
}

export function localStorageWrapper(
  callback: (storage: { [key: string]: any }, ...params: any[]) => any,
  ...params: any[]
) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(null, (storage: { [key: string]: any }) => {
      const result = callback(storage, ...params);
      resolve(result);
    });
  });
}

export function focusElementInTab(
  storage: any,
  elementId: string,
  urlPrefix?: string
) {
  const { lastWindowId, lastTabId, lastStorageUrl } = storage;

  urlPrefix = urlPrefix ?? lastStorageUrl.slice(0, -1);

  // TODO: if the tab is no longer open, launch it in new tab
  try {
    setTabActive(lastTabId, lastWindowId);
  } catch (err: any) {
    console.warn(err);
    chrome.tabs.create({ url: urlPrefix + '/#' + elementId });
    // might need to wait for extension to run for the el to be present
    // should still launch the page
  }

  document.getElementById(elementId).focus();
}

export function setSettings(settings: any) {
  chrome.storage.local.set(settings);
}
