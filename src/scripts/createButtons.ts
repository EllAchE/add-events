import { replaceText } from './checkcontent';
import { extractDates, getUsReg } from './utils';

function createHyperlinkNode(node: HTMLElement, match: string, offset: number) {
  let btn = document.createElement('a');
  btn.className = 'add_to_cal_button_ce';
  btn.textContent = match;

  return btn;
}

function createTextNode(text: string) {
  return document.createTextNode(text);
}

export function createEventButtons(
  elements: HTMLCollectionOf<HTMLElement>
): void {
  console.log('all eles');
  console.log(elements);
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
      //   let child = elements[i]?.firstChild;
      //   let texts = [];

      //   // needed to extract just text from the parent node
      //   while (child) {
      //     if (child.nodeType == 3) {
      //       const dates: ExtractedDate[] = extractDates(child.nodeValue);

      //       let originalValue = child.nodeValue;
      //       // take out the text, split and insert an html node, then add in the text node afterwards
      //       let newValue = '';

      //       // execute logic if there was a match for any of the regex
      //       if (dates.length > 0) {
      //         console.log('dates');
      //         console.log(dates);
      //         for (const j in dates) {
      //           const { date, matchIndex } = dates[j];
      //           console.log('in for ' + date + ' ' + matchIndex);

      //           newValue += createHyperlinkStringNode(date);

      //           let leftText = originalValue.slice(0, matchIndex);
      //           originalValue = originalValue.slice(matchIndex + date.length);

      //           console.log('left text');
      //           console.log(leftText);
      //         }

      //         console.log('adding remaining text');
      //         console.log(originalValue);
      //         child.nodeValue = newValue + originalValue;
      //       }

      //       texts.push((child as any).data); // casting here
      //     }
      //     child = child.nextSibling; // ignores possibility of a partially bolded date, but that;s
      //   }
      // }
      replaceText(elements[i], getUsReg(), createHyperlinkNode);
    }
  }
}
