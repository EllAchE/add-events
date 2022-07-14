// TODO - support dates at any time
export function extractDates(text: string): RegExpMatchArray {
  const wordMonthRegex =
    '(January|February|March|April|May|June|July|August|September|October|November|December)';
  const shortWordMonthRegex =
    '(Jan.?|Feb.?|Mar.?|Apr.?|May.?|Jun.?|Jul.?|Aug.?|Sep.?|Oct.?|Nov.?|Dec.?)';
  const wordMonthRegexes = wordMonthRegex + shortWordMonthRegex;

  const wordDayRegex = '([1-2][0-9]|3[0-1]|0[1-9])((th)?(nd)?(rd)?(st)?)';
  const dayRegex = '([1-2][0-9]|3[0-1]|0[1-9])';
  const monthRegex = '([1][0-2]|0[1-9])'; // no leading zeroes, add timezones handle :times
  const yearRegex = '(20[2-9][0-9])';
  const dateSeparator = '(s|.|-|/)';
  const endOfDate = '(s||.||;)';

  const euDate = `${dayRegex}${dateSeparator}${monthRegex}(${dateSeparator}${yearRegex})?${endOfDate}`; // deal with double matching
  const usDate = `${monthRegex}${dateSeparator}${dayRegex}(${dateSeparator}${yearRegex})?${endOfDate}`;
  const usWordDate = `${wordMonthRegexes}(,\s?|\s)${wordDayRegex}(,\s?|\s)${yearRegex}?${endOfDate}`;
  const euWordDate = `${wordDayRegex}(,\s?|\s)${wordMonthRegexes}(,\s?|\s)${yearRegex}?${endOfDate}`;

  const regexes = [
    new RegExp(euDate),
    new RegExp(usDate),
    new RegExp(usWordDate),
    new RegExp(euWordDate),
  ];
  for (const i in regexes) {
    let matches: RegExpMatchArray = text.match(regexes[i]);
    if (matches) {
      console.dir('list of matching reges');
      console.dir(matches);
      console.dir('text that caused the match');
      console.dir(text);
      return matches;
    }
  }

  return [];
}

export function getElements(): HTMLCollectionOf<Element> {
  return document.getElementsByTagName('*');
}
