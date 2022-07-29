import nlp from 'compromise';
import Three from 'compromise/types/view/three';

import { NLPChunk } from '../../types';
import { checkIfSetsShareAnElement, setIntersection } from '../utils/setUtils';
import { getTextContextBounds, isInTheFuture } from '../utils/utils';

const datePlugin = require('compromise-dates');
nlp.plugin(datePlugin);

const checkTerms = new Set([
  'Place',
  'Person',
  'Organization',
  'Activity',
  'Date',
  'Time',
  'Money',
  'Currency',
  'Url',
  'AtMention',
  'Email',
  'ProperNoun',
  //'Acronym'
]);

/*
  This function checks through the terms of entities and classifies them according to custom logic.
  This "rechunks" nlp processed terms into groups we care about.
  It also stores the index at which a chunk begins.
  A comprehensive list of nlp compromise terms is available at https://compromise.cool/#tags
*/
export default function classifyTextNLP(text: string): NLPChunk[] {
  const doc: Three = nlp(text);

  const entities = doc.json();
  const processedChunks: NLPChunk[] = [];
  let chunkIndex = 0;

  for (const ent of entities) {
    const { terms } = ent;
    let runningChunk: string[] = [];
    let previousTagMatches: Set<string> = new Set(terms[0].tags);

    const { term, retChunkIndex } = iterateTerms(
      terms,
      chunkIndex,
      runningChunk,
      text,
      processedChunks,
      previousTagMatches
    );

    chunkIndex = retChunkIndex;

    addProcessedChunk(
      chunkIndex,
      runningChunk,
      term,
      text,
      processedChunks,
      previousTagMatches
    );
  }

  return processedChunks.filter((chunk: NLPChunk) => {
    // Filter out dates that are in the past
    if (chunk.categories.includes('Date')) {
      return isInTheFuture(chunk.text);
    }
    return true;
  });
}

function addProcessedChunk(
  chunkIndex: number,
  runningChunk: string[],
  term: any,
  text: string,
  processedChunks: NLPChunk[],
  previousTagMatches: Set<string>
) {
  runningChunk.pop();
  const chunk = runningChunk.join('');

  if (checkIfSetsShareAnElement(previousTagMatches, checkTerms)) {
    const ind = chunkIndex - chunk.length - term.post.length;
    const substr = getTextContextBounds(text, ind);

    processedChunks.push({
      text: chunk,
      index: ind,
      categories: Array.from(previousTagMatches),
      surroundingText: substr,
    });
  }
}

function iterateTerms(
  terms: any[],
  chunkIndex: number,
  runningChunk: string[],
  text: string,
  processedChunks: NLPChunk[],
  previousTagMatches: Set<string>
) {
  let j = 0;
  let term;
  let currentTagMatches: Set<string> = new Set(terms[0].tags);
  while (j < terms.length) {
    term = terms[j];
    j += 1;

    currentTagMatches = setIntersection(currentTagMatches, new Set(term.tags));
    chunkIndex += term.text.length + term.post.length;

    if (!term.text) {
      continue;
    }

    if (runningChunk.length < 1) {
      currentTagMatches = new Set(term.tags); // initialization case
    } else if (
      currentTagMatches.size < 1 ||
      !checkIfSetsShareAnElement(currentTagMatches, checkTerms)
    ) {
      // When we reach the end of a chunk tag set intersection add it to the list
      addProcessedChunk(
        chunkIndex,
        runningChunk,
        term,
        text,
        processedChunks,
        previousTagMatches
      );

      // reset chunk and tag matches
      previousTagMatches = currentTagMatches = new Set(term.tags);
      runningChunk = [];
    }

    runningChunk.push(term.text);
    runningChunk.push(term.post);

    previousTagMatches = currentTagMatches;
  }

  return { term, retChunkIndex: chunkIndex };
}
