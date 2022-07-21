import nlp from 'compromise';
import Three from 'compromise/types/view/three';
import { ExtractedDate } from '../scripts/types';
import { isInTheFuture } from './utils';

// after a POC this should support a full date/information extractor from the webpage
export function extractDatesNLP(text: string): ExtractedDate[] {
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
