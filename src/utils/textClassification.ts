import nlp from 'compromise';
import Three from 'compromise/types/view/three';

import { NLPChunk } from '../scripts/types';
import {
  checkIfSetsShareAnElement,
  getTextContextBounds,
  setIntersection,
} from './utils';

const datePlugin = require('compromise-dates');

nlp.plugin(datePlugin);

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
  let index = 0;

  for (const ent of entities) {
    const checkTerms = new Set();
    checkTerms.add('Place');
    checkTerms.add('Person');
    checkTerms.add('Organization');
    checkTerms.add('Activity');
    checkTerms.add('Date');
    checkTerms.add('Time');
    checkTerms.add('Money');
    checkTerms.add('Currency');
    checkTerms.add('Url');
    checkTerms.add('AtMention');
    checkTerms.add('Email');
    // checkTerms.add('Acronym')
    checkTerms.add('ProperNoun');

    const { terms } = ent;
    let runningChunk = [];
    let currentTagMatches: Set<string> = new Set(terms[0].tags);
    let previousTagMatches: Set<string> = new Set(terms[0].tags);
    let j = 0;

    let term;
    while (j < terms.length) {
      term = terms[j];
      j += 1;

      currentTagMatches = setIntersection(
        currentTagMatches,
        new Set(term.tags)
      );
      index += term.text.length + term.post.length;

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
        runningChunk.pop();
        const chunk = runningChunk.join('');

        if (checkIfSetsShareAnElement(previousTagMatches, checkTerms)) {
          const ind = index - chunk.length - term.post.length;
          const substr = getTextContextBounds(text, ind);

          processedChunks.push({
            text: chunk,
            index: ind,
            categories: Array.from(previousTagMatches),
            surroundingText: substr,
          });
        }

        // reset chunk and tag matches
        previousTagMatches = currentTagMatches = new Set(term.tags);
        runningChunk = [];
      }

      runningChunk.push(term.text);
      runningChunk.push(term.post);

      previousTagMatches = currentTagMatches;
    }
    runningChunk.pop();
    const chunk = runningChunk.join('');

    if (checkIfSetsShareAnElement(previousTagMatches, checkTerms)) {
      const ind = index - chunk.length - term.post.length;
      const substr = getTextContextBounds(text, ind);

      processedChunks.push({
        text: chunk,
        index: index - chunk.length - term.post.length,
        categories: Array.from(previousTagMatches),
        surroundingText: substr,
      });
    }
  }

  return processedChunks;
}
