import nlp from 'compromise';
import Three from 'compromise/types/view/three';
import { ExtractedDate, NLPChunk } from '../scripts/types';
import {
  checkIfSetsShareAnElement,
  isInTheFuture,
  setIntersection,
} from './utils';

export function extractDatesNLP(text: string): ExtractedDate[] {
  console.log('checking text chunk', text);
  let doc: Three = nlp(text);

  const candidateEntities = doc.json();

  const dates = [];

  for (const candidate of candidateEntities) {
    const terms = candidate.terms;

    let isDate = false;
    let j = 0;

    let singleDate: string[] = [];
    let index = -1;

    while (j < terms.length) {
      let term = terms[j];
      if (
        term.text &&
        (term.tags.includes('Date') || (isDate && term.tags.includes('Time'))) // only handles case of the date coming afterwards
      ) {
        if (index == -1) {
          index = term.index[0];
        }

        isDate = true;
        singleDate.push(term.text);
        singleDate.push(term.post);
      } else if (term.text) {
        if (singleDate.length > 0) {
          singleDate.pop();
          const fullDate = singleDate.join('');

          if (isInTheFuture(fullDate)) {
            dates.push({
              date: fullDate,
              matchIndex: index,
            });
          }
          singleDate = [];
        }
        isDate = false;
        index = -1;
      }
      j += 1;
    }

    singleDate.pop();
    const d = singleDate.join('');
    if (isDate && isInTheFuture(d)) {
      dates.push({
        date: d,
        matchIndex: index,
      });
    }
  }

  return dates;
}

/* 
  This function checks through the terms of entities and classifies them according to custom logic.
  This "rechunks" nlp processed terms into groups we care about. It also stores the index at which a chunk begins.
  A comprehensive list of nlp compromise terms is available at https://compromise.cool/#tags
*/
export function classifyTextNLP(text: string): NLPChunk[] {
  let doc: Three = nlp(text);

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
    //checkTerms.add('Acronym')
    checkTerms.add('ProperNoun');

    const terms = ent.terms;
    let runningChunk = [];
    let currentTagMatches: Set<string> = new Set(terms[0].tags);
    let previousTagMatches: Set<string> = new Set(terms[0].tags);
    let j = 0;

    let term;
    while (j < terms.length) {
      term = terms[j];
      console.log(term);
      console.log(term.tags);
      j += 1;

      currentTagMatches = setIntersection(
        currentTagMatches,
        new Set(term.tags)
      );
      index += term.text.length + term.post.length;

      if (!term.text) {
        continue;
      }
      //console.log(previousTagMatches);

      if (runningChunk.length < 1) {
        // initialization case
        currentTagMatches = new Set(term.tags);
      } else if (
        currentTagMatches.size < 1 ||
        !checkIfSetsShareAnElement(currentTagMatches, checkTerms)
      ) {
        // When we've reached the end of a chunk match, add it to the right category
        runningChunk.pop();
        const chunk = runningChunk.join('');

        if (checkIfSetsShareAnElement(previousTagMatches, checkTerms)) {
          processedChunks.push({
            text: chunk,
            index: index - chunk.length - term.post.length,
            categories: Array.from(previousTagMatches),
          });
        }

        // reset chunk and tag matches
        previousTagMatches = currentTagMatches = new Set(term.tags);
        runningChunk = [];
      }

      runningChunk.push(term.text);
      runningChunk.push(term.post);

      previousTagMatches = currentTagMatches;

      // // Many of these categories are not going to be mutually exclusive
      // if (term.tags.includes('Person')) {
      //   //personSet.add()
      // }
      // if (term.tags.includes('Place')) {
      // }
      // if (term.tags.includes('Organization')) {
      // }
      // if (term.tags.includes('Activity')) {
      // }
      // if (term.tags.includes('Date')) {
      // }
      // if (term.tags.includes('Time')) {
      // }
      // if (term.tags.includes('Money')) {
      // }
      // if (term.tags.includes('Currency')) {
      // }
      // if (term.tags.includes('Url')) {
      //   urlSet.add(term.text);
      // }
      // if (term.tags.includes('AtMention')) {
      // }
      // if (term.tags.includes('Email')) {
      //   emailSet.add(term.text);
      // }
      // // if (term.tags.includes('Acronym')) {
      // // }
      // if (term.tags.includes('ProperNoun')) {
      // }
    }
    runningChunk.pop();
    const chunk = runningChunk.join('');

    if (checkIfSetsShareAnElement(previousTagMatches, checkTerms)) {
      processedChunks.push({
        text: chunk,
        index: index - chunk.length - term.post.length,
        categories: Array.from(previousTagMatches),
      });
    }
  }

  console.dir('processed Chunks');
  console.dir(processedChunks);

  return processedChunks;
}

// after a POC this should support a full date/information extractor from the webpage
export function extractDatesRegex(text: string): ExtractedDate[] {
  let allMatches = [];

  const wordMonthRegex =
    '(January,?|February,?|March,?|April,?|May,?|June,?|July,?|August,?|September,?|October,?|November,?|December,?|Jan\\.?|Feb\\.?|Mar\\.?|Apr\\.?|May\\.?|Jun\\.?|Jul\\.?|Aug\\.?|Sep\\.?|Oct\\.?|Nov\\.?|Dec\\.?)';

  const dayRegex = '([1-2][0-9]|3[0-1]|0?[1-9])';
  const wordDayRegex = '([1-2][0-9]|3[0-1]|0?[1-9])((th)|(nd)|(rd)|(st))?';

  const monthRegex = '([1][0-2]|0?[1-9])'; // no leading zeroes, add timezones handle :times
  const yearRegex = '((20)?[2-9][0-9])';
  const dateSeparator = '(\\s+|\\.|-|/)';
  const endOfDate = '(?=\\s|\\.|;|$|\\n|\\"|,)';
  const startOfDate = '(?<=\\s|^|\\n|\\")';
  // TODO support recurring dates

  const usDate = `(${startOfDate}${monthRegex}${dateSeparator}${dayRegex}(${dateSeparator}${yearRegex})?${endOfDate})`; // set these up so that only one of the two matches for numbers below a certain date
  const usWordDate = `(${startOfDate}${wordMonthRegex}\\s+${wordDayRegex}((,\\s+?|\\s+)${yearRegex})?${endOfDate})`;
  // how to infer european vs. american? Set it up to only work for us rn

  const regexes: RegExp[] = [
    new RegExp(usDate, 'g'),
    new RegExp(usWordDate, 'g'),
    //new RegExp(euDate, 'g'),
    //new RegExp(euWordDate, 'g'),
  ];

  for (const reg of regexes) {
    const matches: ExtractedDate[] = [];
    let match: RegExpMatchArray;
    while ((match = reg.exec(text)) != null) {
      if (match.length > 0) {
        matches.push({
          date: match[0],
          matchIndex: match.index,
        });
      }
    }
    if (matches) {
      for (const match of matches) {
        allMatches.push(match);
      }
    }
  }

  return allMatches;
}
