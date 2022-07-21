//const euDate = `(${dayRegex}${dateSeparator}${monthRegex}(${dateSeparator}${yearRegex})?${endOfDate})`; // deal with double matching
//const euWordDate = `(${wordDayRegex}(,\s?|\s)${wordMonthRegexes}(,\s?|\s)${yearRegex}?${endOfDate})`;

export function isInTheFuture(dateStr: string): boolean {
  const yearRegex = /\d{4}/g;
  // const futureYearRegex = /20([3-9][0-9]|2[3-9])/g;
  const today = new Date(Date.now() - 3600 * 1000 * 24);

  const date = new Date(dateStr); // might break for some?

  console.log(today, date);

  if (dateStr.match(yearRegex)) {
    return date > today;
  } else {
    // a more intellignet check desired, i.e. check distance if the event were in the next year, or if it were in the past
    return true;
  }
}

export function getElements(): HTMLCollectionOf<Element> {
  return document.getElementsByTagName('*');
}
