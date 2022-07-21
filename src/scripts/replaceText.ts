import { extractDatesNLP } from '../utils/dateExtraction';
import { ExtractedDate } from './types';

// TODO: should adjust the method signature to not take in regex
export function replaceText(
  node: HTMLElement,
  regex: RegExp,
  createButton: (node: any, params: string, other: any) => HTMLAnchorElement,
  excludeElements?: string[]
) {
  excludeElements ||
    (excludeElements = ['script', 'style', 'iframe', 'canvas']);
  var child: any = node.firstChild;

  let dateSet = new Set();

  while (child) {
    if (child.nodeType == 3) {
      let breakpt = 0;

      const extractedDates: ExtractedDate[] = extractDatesNLP(child.data);
      if (extractedDates.length > 0) {
        dateSet.add(JSON.stringify(extractedDates[0]));
      }
      // this logic needs to match better

      if (extractedDates.length > 0) {
        child.data.replace(
          extractedDates[0].date,
          function (match: HTMLElement[]) {
            let args = [].slice.call(arguments);
            let offset = args[args.length - 2];
            let newTextNode = child.splitText(offset + breakpt);

            breakpt -= child.data.length + match.length;

            newTextNode.data = newTextNode.data.substr(match.length);
            let tag = createButton.apply(window, [child].concat(args));

            child.parentNode.insertBefore(tag, newTextNode);
            child = newTextNode;
          }
        );
      }
    }
    child = child.nextSibling;
  }

  const dates = [];
  // This is a hack that leaves the buttons disconnected from what populates the popups
  for (const date of dateSet) {
    dates.push(date);
  }

  return dates;
}

// export function replaceText(
//   node: any,
//   regex: RegExp,
//   callback: any,
//   excludeElements?: string[]
// ) {
//   excludeElements = ['script', 'style', 'iframe', 'canvas'];
//   if (
//     !node?.tagName ||
//     node.className.toLowerCase() == 'add_to_cal_button_ce' ||
//     excludeElements.indexOf(node.tagName.toLowerCase()) > -1
//   ) {
//     console.log('early ex');
//     console.log(node.data);
//     console.log(node.tagName);
//     console.log(node.className);
//     return;
//   }
//   let bk = 0;
//   node.data.replace(regex, function (all: HTMLElement[]) {
//     let args = Array.prototype.slice.call(arguments);
//     let offset = args[args.length - 2];
//     let newTextNode = node.splitText(offset + bk);
//     let tag;

//     bk -= node.data.length + all.length;

//     newTextNode.data = newTextNode.data.substr(all.length);
//     tag = callback.apply(window, [node].concat(args));

//     console.log('inserting button');
//     node.parentNode.insertBefore(tag, newTextNode);
//     node = newTextNode;
//   });
//   regex.lastIndex = 0;
// }
