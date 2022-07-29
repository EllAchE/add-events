import React from 'react';
import { render } from 'react-dom';

import ChunkButton from '../page/ChunkButton';
import classifyTextNLP from '../utils/textClassification';
import { isInTheFuture } from '../utils/utils';
import { ChunkSets as ChunkSetObj, NLPChunk } from './types';

// TODO: should adjust the method signature to not take in regex
export default function replaceText(
  node: HTMLElement,
  chunkSet: ChunkSetObj
): ChunkSetObj {
  let child: Node = node.firstChild;

  while (child) {
    if (child.nodeType == 3) {
      // These will be used to display a quick summary of data extracted

      const classifiedChunks: NLPChunk[] = classifyTextNLP((child as any).data);

      chunkSet = createChunkSets(classifiedChunks, chunkSet); // redundant to reiterate arr

      // if (extractedDates.length > 0) {
      //   dateSet.add(JSON.stringify(extractedDates[0]));
      // }
      // this logic needs to match better

      child = addChunkButtonToDom(classifiedChunks, child);
    }
    child = child.nextSibling;
  }

  return chunkSet;
}

function createChunkSets(
  classifiedChunks: NLPChunk[],
  chunkSet: ChunkSetObj
): ChunkSetObj {
  let chunkButtonIdCounter = 0;
  classifiedChunks.forEach((chunk: NLPChunk) => {
    const chunkButtonId =
      'add_to_cal_button_' + chunkButtonIdCounter.toString();

    const stringifiedSet = JSON.stringify({
      text: chunk.text,
      position: null,
      categories: chunk.categories,
      surroundingText: chunk.surroundingText,
      buttonId: chunkButtonId,
    });

    if (chunk.categories.includes('Date')) {
      chunkSet.dateSet.add(stringifiedSet);
    }
    if (chunk.categories.includes('Place')) {
      chunkSet.placeSet.add(stringifiedSet);
    }
    if (chunk.categories.includes('Url')) {
      chunkSet.urlSet.add(stringifiedSet);
    }
    if (chunk.categories.includes('Email')) {
      chunkSet.emailSet.add(stringifiedSet);
    }
    if (chunk.categories.includes('ProperNoun')) {
      chunkSet.properNounSet.add(stringifiedSet);
    }
    if (chunk.categories.includes('Person')) {
      chunkSet.personSet.add(stringifiedSet);
    }
    if (chunk.categories.includes('AtMention')) {
      chunkSet.atMentionSet.add(stringifiedSet);
    }
  });

  return chunkSet;
}

function addChunkButtonToDom(classifiedChunks: NLPChunk[], child: Node) {
  while (classifiedChunks.length > 0) {
    const chunk = classifiedChunks.shift();

    (child as any).data.replace(chunk.text, (buttonText: string) => {
      const newTextNode = (child as any).splitText(
        (child as any).data.indexOf(chunk.text)
      );

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
          id={chunk.chunkButtonId}
        />,
        tag as HTMLElement
      );
    });
  }

  return child;
}
