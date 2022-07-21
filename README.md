Automatically add events to your calendar!

TODO:

Automatically adding guests in the future would benefit from a searchable contacts list

Move to an element within a page based on #id
https://stackoverflow.com/questions/13266746/scroll-jump-to-id-without-jquery
document.getElementById('id').scrollIntoView({
behavior: 'smooth'
});

listen for browser changes to rerun scripts
https://stackoverflow.com/questions/2844565/is-there-a-javascript-jquery-dom-change-listener/39508954#39508954

Listens for url changes to rerun scripts (probably want this one)
https://stackoverflow.com/questions/21657319/detect-youtube-video-change-with-injected-javascript/21668232#21668232

Known bugs/areas for improvement:

Doesn't handle hidden text
doesn't select on user input
doesn't work if text for dates is across child nodes

https://mui.com/material-ui/react-alert/
For success messaging, make it fixed and have it fade after x period

// potentially use a drawer https://mui.com/material-ui/react-drawer/

// useEffect(() => {
// chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
// const activeTabId = tabs.length === 0 ? 0 : tabs[0].id;
// chrome.tabs.sendMessage(activeTabId, '', (response) => {
// console.log('receieved res', response);
// });
// });
// });

// after a POC this should support a full date/information extractor from the webpage
export function extractDatesRegex(text: string): ExtractedDate[] {
let allMatches = [];
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

chrome.runtime.onMessage.addListener((message: any) => {
if (message.type != 'create_event') return;
const eventBodies = message.body;
chrome.identity.getAuthToken({ interactive: true }, function (auth_token) {
console.log(auth_token);
});

// needs a callback that conditionally renders success/failure of the createEvents

// <Alert></Alert>;
console.log(eventBodies);
//createEvents(eventBodies, 'primary');
});
