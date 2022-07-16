import { extractDates, getElements } from './utils';

console.info('RUNNING MAIN');
console.info('RUNNING MAIN');
console.info('RUNNING MAIN');
console.info('RUNNING MAIN');
console.info('RUNNING MAIN');
console.info('RUNNING MAIN');
console.info('RUNNING MAIN');

function createEventButtons(elements: any): void {
  for (const i in elements) {
    if (elements[i].innerText?.length) {
      //console.log('checking');
      //console.log(elements[i].innerText);
      const regMatches = extractDates(elements[i].innerText);

      if (regMatches.length > 0) {
        console.log('there was a match');
        var btn = document.createElement('button');
        btn.classList.add('add_to_cal_button');

        btn.appendChild(document.createTextNode('Add to Cal'));

        elements[i].appendChild(btn);

        //styling the button
        btn.style.position = 'relative';

        if (
          elements[0].scrollWidth === elements[0].offsetWidth &&
          elements[0].scrollHeight === elements[0].offsetHeight
        )
          btn.style.left = `${elements[0].offsetWidth - 70}px`;
        else if (
          elements[0].scrollWidth != elements[0].offsetWidth &&
          elements[0].scrollHeight === elements[0].offsetWidth
        )
          btn.style.left = `${elements[0].offsetWidth - 200}px`;
        else btn.style.left = `${elements[0].offsetWidth - 150}px`;

        if (elements[0].scrollHeight === elements[0].offsetHeight)
          btn.style.bottom = `${elements[0].offsetHeight - 50}px`;
        else btn.style.bottom = `${elements[0].scrollHeight - 50}px`;

        btn.addEventListener('click', (e) => {
          alert('button action');
        });
      }
    }
  }
}

const runCheck = () => {
  var elements = getElements();

  createEventButtons(elements);
};

chrome.runtime.onMessage.addListener((msg, sender, callback) => {
  console.log('received from sender', sender.id, msg);
  runCheck();
});

runCheck();
