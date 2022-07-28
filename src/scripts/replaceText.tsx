import React from 'react';
import { render } from 'react-dom';

import ChunkButton from '../page/ChunkButton';
import classifyTextNLP from '../utils/textClassification';
import { isInTheFuture } from '../utils/utils';
import { NLPChunk } from './types';

// TODO: should adjust the method signature to not take in regex
export default function replaceText(
  node: HTMLElement,
  excludeElements?: string[]
): void {
  excludeElements ||
    (excludeElements = ['script', 'style', 'iframe', 'canvas', 'input']);
  let child: any = node.firstChild;

  while (child) {
    if (child.nodeType == 3) {
      // These will be used to display a quick summary of data extracted
      const personSet = new Set();
      const placeSet = new Set();
      const urlSet = new Set();
      const emailSet = new Set();
      const ProperNounSet = new Set();
      const dateSet = new Set();

      const classifiedChunks: NLPChunk[] = classifyTextNLP(child.data);

      classifiedChunks.filter((chunk) => {
        // Filter out dates that are in the past
        chunk.categories.includes('Date') && isInTheFuture(chunk.text);
      });

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
}
