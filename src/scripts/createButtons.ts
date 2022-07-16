import { extractDates } from './utils';

function baseButton() {
  var btn = document.createElement('button');
  btn.classList.add('add_to_cal_button');

  btn.appendChild(document.createTextNode('Add to Cal'));
  return btn;
}

export function createEventButtons(
  elements: HTMLCollectionOf<HTMLElement>
): void {
  for (const i in elements) {
    if (elements[i].childNodes[0]?.nodeValue?.length) {
      console.log(typeof elements[i]);
      // console.log('a');
      // console.log(elements[i].contents().get(0).nodeValue.trim());
      const dates = extractDates(elements[i].childNodes[0].nodeValue);

      if (dates.length > 0) {
        const btn = baseButton();

        elements[i].appendChild(btn);

        btn.style.position = 'relative';

        btn.addEventListener('click', (e) => {
          alert('button action');
        });
      }
    }
  }
}
