import React from 'react';
import { ReactElement } from 'react';
import { render } from 'react-dom';
import { ChunkButton } from '../page/ChunkButton';
import { classifyTextNLP } from '../utils/textClassification';
import { NLPChunk } from './types';

// TODO: should adjust the method signature to not take in regex
export function replaceText(
  node: HTMLElement,
  createButton: (text: string, categories: string[]) => ReactElement,
  excludeElements?: string[],
  ...params: any
) {
  excludeElements ||
    (excludeElements = ['script', 'style', 'iframe', 'canvas']);
  let child: any = node.firstChild;

  const {
    setStartDate,
    setEndDate,
    setStartTime,
    setEndTime,
    setTitle,
    setDescription,
    setLocation,
  } = params;

  // These will be used to display a quick summary of data extracted
  const personSet = new Set();
  const placeSet = new Set();
  const urlSet = new Set();
  const emailSet = new Set();
  const ProperNounSet = new Set();
  const dateSet = new Set();

  while (child) {
    if (child.nodeType == 3) {
      const classifiedChunks: NLPChunk[] = classifyTextNLP(child.data);

      // if (extractedDates.length > 0) {
      //   dateSet.add(JSON.stringify(extractedDates[0]));
      // }
      // this logic needs to match better

      while (classifiedChunks.length > 0) {
        const chunk = classifiedChunks.shift();
        child.data.replace(chunk.text, function (buttonText: string) {
          let newTextNode = child.splitText(child.data.indexOf(chunk.text));

          newTextNode.data = newTextNode.data.substr(buttonText.length);

          const createTempNode = (): Node => {
            let newNode = document.createElement('span');
            newNode.setAttribute('id', 'temp-button-node-class');
            newNode.textContent = buttonText;
            document.body.appendChild(newNode);

            return newNode;
          };

          let tag: Node = createTempNode.apply(window, []);

          child.parentNode.insertBefore(tag as Node, newTextNode as Node);
          child = newTextNode;

          render(
            <ChunkButton
              buttonText={chunk.text}
              categories={chunk.categories}
            />,
            tag as HTMLElement
          );
        });
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
