import { extractDates, getElements } from './utils';

function createEventButtons(elements: any): void {
  for (const i in elements) {
    if (elements[i].innerText?.length) {
      const regMatches = extractDates(elements[i].innerText);

      if (regMatches.length > 0) {
        var btn = document.createElement('button');
        btn.classList.add('add_to_cal_button');

        btn.appendChild(document.createTextNode('Add to Cal'));

        console.dir('element that had a hit');
        console.dir(elements[i]);

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

  console.log('number of matching elements', elements.length);

  createEventButtons(elements);
};

chrome.runtime.onMessage.addListener((msg, sender, callback) => {
  console.log('received from sender', sender.id, msg);
  callback(runCheck());
});
