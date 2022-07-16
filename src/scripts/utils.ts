// TODO - support dates at any time

// after a POC this should support a full date/information extractor from the webpage
export function extractDates(text: string): string[] {
  const wordMonthRegex =
    '(January,?|February,?|March,?|April,?|May,?|June,?|July,?|August,?|September,?|October,?|November,?|December,?|Jan\\.?|Feb\\.?|Mar\\.?|Apr\\.?|May\\.?|Jun\\.?|Jul\\.?|Aug\\.?|Sep\\.?|Oct\\.?|Nov\\.?|Dec\\.?)';

  const dayRegex = '([1-2][0-9]|3[0-1]|0?[1-9])';
  const wordDayRegex = '([1-2][0-9]|3[0-1]|0?[1-9])((th)|(nd)|(rd)|(st)|)?';

  const monthRegex = '([1][0-2]|0?[1-9])'; // no leading zeroes, add timezones handle :times
  const yearRegex = '((20)?[2-9][0-9])';
  const dateSeparator = '(\\s+|\\.|-|/)';
  const endOfDate = '(?=\\s|\\.|;|$|\\n)';
  const startOfDate = '(?<=\\s|^|\\n)';

  // TODO support recurring dates

  const usDate = `(${startOfDate}${monthRegex}${dateSeparator}${dayRegex}(${dateSeparator}${yearRegex})?${endOfDate})`; // set these up so that only one of the two matches for numbers below a certain date
  const usWordDate = `(${startOfDate}${wordMonthRegex}\\s+${wordDayRegex}((,\\s+?|\\s+)?${yearRegex})?${endOfDate})`;

  // how to infer european vs. american? Set it up to only work for us rn

  //const euDate = `(${dayRegex}${dateSeparator}${monthRegex}(${dateSeparator}${yearRegex})?${endOfDate})`; // deal with double matching
  //const euWordDate = `(${wordDayRegex}(,\s?|\s)${wordMonthRegexes}(,\s?|\s)${yearRegex}?${endOfDate})`;

  let allMatches: RegExpMatchArray = [];
  const regexes = [
    new RegExp(usDate, 'g'),
    new RegExp(usWordDate, 'g'),
    //new RegExp(euDate, 'g'),
    //new RegExp(euWordDate, 'g'),
  ];

  for (const i in regexes) {
    let matches: RegExpMatchArray = regexes[i].exec(text);
    console.dir(matches);
    matches = text.match(regexes[i]);
    if (matches) {
      console.log('match occured at ' + matches.index);
      console.dir(text);

      for (const i in matches) {
        allMatches.push(matches[i]);
      }
    }
  }

  return allMatches;
}

export function getElements(): HTMLCollectionOf<Element> {
  return document.getElementsByTagName('*');
}
