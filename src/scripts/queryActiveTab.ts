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
