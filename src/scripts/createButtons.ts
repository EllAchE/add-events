import { regexes } from '../utils';
import { replaceText } from './replaceText';

function createHyperlinkNode(
  node: HTMLElement,
  match: string,
  offset: number
): HTMLAnchorElement {
  let btn = document.createElement('a');
  btn.className = 'add_to_cal_button_ce';
  btn.textContent = match;

  btn.addEventListener('click', (e) => {
    alert('button action');
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
      replaceText(elements[i], regexes[1], createHyperlinkNode);
    }
  }
}
