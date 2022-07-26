console.log('service worker triggered');

chrome.commands.onCommand.addListener((command) => {
  switch (command) {
    case 'save-event':
      // saveEvent();
      break;
    case 'add-title':
      break;
    case 'add-end-date':
      break;
    case 'add-start-date':
      break;
    case 'add-end-time':
      break;
    case 'add-start-time':
      break;
    case 'add-description':
      break;
    case 'add-location':
      break;
    default:
      console.warn(`Command ${command} not found`);
  }
});
