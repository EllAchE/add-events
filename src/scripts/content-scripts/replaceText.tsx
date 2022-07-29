import React from 'react';
import { render } from 'react-dom';

import ChunkButton from '../../components/injected/ChunkButton';
import classifyTextNLP from './textClassification';
import { ChunkSetObj, ExtractedTuple, NLPChunk } from '../../types';

// TODO: should adjust the method signature to not take in regex
export default function replaceText(
  node: HTMLElement,
  chunkSetObj: ChunkSetObj
): void {
  let child: Node = node.firstChild;

  while (child) {
    if (child.nodeType == 3) {
      // These will be used to display a quick summary of data extracted

      const classifiedChunks: NLPChunk[] = classifyTextNLP((child as any).data);

      addToChunkSet(classifiedChunks, chunkSetObj); // redundant to reiterate arr

      // if (extractedDates.length > 0) {
      //   dateSet.add(JSON.stringify(extractedDates[0]));
      // }
      // this logic needs to match better

      child = addChunkButtonToDom(classifiedChunks, child);
    }
    child = child.nextSibling;
  }
}

function addToChunkSet(
  classifiedChunks: NLPChunk[],
  chunkSet: ChunkSetObj
): ChunkSetObj {
  let chunkButtonIdCounter = 0;
  classifiedChunks.forEach((chunk: NLPChunk) => {
    const chunkButtonId =
      'add_to_cal_button_' + chunkButtonIdCounter.toString();

    const tup: ExtractedTuple = {
      text: chunk.text,
      position: null,
      categories: chunk.categories,
      surroundingText: chunk.surroundingText,
      chunkButtonId: chunkButtonId,
    };

    const stringifiedSetTuple: string = JSON.stringify(tup);

    if (chunk.categories.includes('Date')) {
      chunkSet.dateSet.add(stringifiedSetTuple);
    }
    if (chunk.categories.includes('Place')) {
      chunkSet.placeSet.add(stringifiedSetTuple);
    }
    if (chunk.categories.includes('Url')) {
      chunkSet.urlSet.add(stringifiedSetTuple);
    }
    if (chunk.categories.includes('Email')) {
      chunkSet.emailSet.add(stringifiedSetTuple);
    }
    if (chunk.categories.includes('ProperNoun')) {
      chunkSet.properNounSet.add(stringifiedSetTuple);
    }
    if (chunk.categories.includes('Person')) {
      chunkSet.personSet.add(stringifiedSetTuple);
    }
    if (chunk.categories.includes('AtMention')) {
      chunkSet.atMentionSet.add(stringifiedSetTuple);
    }
    if (chunk.categories.includes('PhoneNumber')) {
      chunkSet.phoneNumberSet.add(stringifiedSetTuple);
    }
    if (chunk.categories.includes('HashTag')) {
      chunkSet.hashTagSet.add(stringifiedSetTuple);
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
