import React from 'react';
import { render } from 'react-dom';

import { ChunkButton } from '../page/ChunkButton';
import classifyTextNLP from '../utils/textClassification';
import { NLPChunk } from './types';

// TODO: should adjust the method signature to not take in regex
export default function replaceText(
  node: HTMLElement,
  excludeElements?: string[]
) {
  excludeElements ||
    (excludeElements = ['script', 'style', 'iframe', 'canvas']);
  let child: any = node.firstChild;

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
        child.data.replace(chunk.text, (buttonText: string) => {
          const newTextNode = child.splitText(child.data.indexOf(chunk.text));

          newTextNode.data = newTextNode.data.substr(buttonText.length);

          const createTempNode = (): Node => {
            const newNode = document.createElement('span');
            newNode.setAttribute('id', 'temp-button-node-class');
            newNode.textContent = buttonText;
            document.body.appendChild(newNode);

            return newNode;
          };

          const tag: Node = createTempNode.apply(window, []);

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
