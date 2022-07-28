import React from 'react';
import { render } from 'react-dom';

import ChunkButton from '../page/ChunkButton';
import classifyTextNLP from '../utils/textClassification';
import { isInTheFuture } from '../utils/utils';
import { ChunkSets, NLPChunk } from './types';

// TODO: should adjust the method signature to not take in regex
export default function replaceText(
  node: HTMLElement,
  excludeElements?: string[]
): ChunkSets {
  excludeElements ||
    (excludeElements = ['script', 'style', 'iframe', 'canvas', 'input']);
  let child: any = node.firstChild;

  const personSet = new Set<string>();
  const placeSet = new Set<string>();
  const urlSet = new Set<string>();
  const emailSet = new Set<string>();
  const properNounSet = new Set<string>();
  const dateSet = new Set<string>();
  const atMentionSet = new Set<string>();

  while (child) {
    if (child.nodeType == 3) {
      // These will be used to display a quick summary of data extracted

      const classifiedChunks: NLPChunk[] = classifyTextNLP(child.data);

      classifiedChunks.filter((chunk: NLPChunk) => {
        // Filter out dates that are in the past
        chunk.categories.includes('Date') && isInTheFuture(chunk.text);
      });

      classifiedChunks.forEach((chunk: NLPChunk) => {
        if (chunk.categories.includes('Date')) {
          dateSet.add(chunk.text);
        }
        if (chunk.categories.includes('Place')) {
          placeSet.add(chunk.text);
        }
        if (chunk.categories.includes('Url')) {
          urlSet.add(chunk.text);
        }
        if (chunk.categories.includes('Email')) {
          emailSet.add(chunk.text);
        }
        if (chunk.categories.includes('ProperNoun')) {
          properNounSet.add(chunk.text);
        }
        if (chunk.categories.includes('Person')) {
          personSet.add(chunk.text);
        }
        if (chunk.categories.includes('AtMention')) {
          atMentionSet.add(chunk.text);
        }
      }); // redundant to reiterate arr

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

  return {
    personSet,
    placeSet,
    urlSet,
    emailSet,
    properNounSet,
    dateSet,
    atMentionSet,
  };
}
