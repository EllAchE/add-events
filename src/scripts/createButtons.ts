import { replaceText } from './checkcontent';
import { getUsReg } from '../utils';

function createHyperlinkNode(node: HTMLElement, match: string, offset: number) {
  let btn = document.createElement('a');
  btn.className = 'add_to_cal_button_ce';
  btn.textContent = match;

  console.log('creating');
  btn.addEventListener('click', (e) => {
    console.log('aaaded');
    //alert('button action');
  });

  return btn;
}

export function createEventButtons(
  elements: HTMLCollectionOf<HTMLElement>
): void {
  for (const i in elements) {
    // Ignore tags that will not display text to shorten execution
    if (
      elements[i].tagName != 'STYLE' &&
      elements[i].tagName != 'SCRIPT' &&
      elements[i].tagName != 'NOSCRIPT' && // TODO: need to check if these are valid to ignore
      elements[i].tagName != 'FIGURE' &&
      elements[i].tagName != 'META' &&
      elements[i].className != 'add_to_cal_button_ce'
    ) {
      replaceText(elements[i], getUsReg(), createHyperlinkNode);
    }
  }
}
