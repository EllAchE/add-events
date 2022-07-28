import { getCurrentPageHost, getCurrentPageUrl } from '../utils/utils';
import replaceText from './replaceText';
import { ChunkSets } from './types';

export function createEventButtons(
  elements: HTMLCollectionOf<HTMLElement>
): void {
  const chunkSet: ChunkSets = {
    personSet: new Set<string>(),
    placeSet: new Set<string>(),
    urlSet: new Set<string>(),
    emailSet: new Set<string>(),
    properNounSet: new Set<string>(),
    dateSet: new Set<string>(),
    atMentionSet: new Set<string>(),
  };
  const customClassRegex = /add_to_cal_button/;
  const windowPrefixUrl = getCurrentPageUrl().slice(0, -1);
  const host = getCurrentPageHost();

  for (const i in elements) {
    try {
      // Ignore tags that will not display text to shorten execution
      if (
        !['STYLE', 'SCRIPT', 'NOSCRIPT', 'INPUT', 'TITLE', 'META'].includes(
          elements[i].tagName
        ) &&
        !customClassRegex.test(elements[i].className) &&
        getComputedStyle(elements[i]).opacity != '0' &&
        !['rgb(0, 0, 0)', 'rgba(0, 0, 0, 0)', 'transparent'].includes(
          getComputedStyle(elements[i]).color
        )
      ) {
        const tempChunkSet = replaceText(elements[i]);

        for (const key in tempChunkSet) {
          for (const item of tempChunkSet[key]) {
            chunkSet[key].add(item);
          }
        }
      }

      if (elements[i].tagName === 'A') {
        const href = elements[i].getAttribute('href');
        if (href && /http/.test(href)) {
          chunkSet.urlSet.add(href);
        } else if (href && href.charAt(0) === '/') {
          chunkSet.urlSet.add(windowPrefixUrl + href);
        } else if (href) {
          // case for id selectors, i.e. #maincontent
          chunkSet.urlSet.add(windowPrefixUrl + '/' + href);
        }
      }
    } catch (err: any) {
      console.log('error checking computedStyle', err);
    }
  }

  const internalUrlSet = new Set<string>();
  const samePageUrlSet = new Set<string>();
  const externalUrlSet = new Set<string>();
  for (const url of chunkSet.urlSet) {
    if (url.includes(host)) {
      if (url.includes('#')) {
        samePageUrlSet.add(url);
      } else {
        internalUrlSet.add(url);
      }
    } else {
      externalUrlSet.add(url);
    }
  }

  // TODO: this only handles the buttons I create, could not create buttons but parse
  chunkSet.internalUrlSet = internalUrlSet;
  chunkSet.samePageUrlSet = samePageUrlSet;
  chunkSet.externalUrlSet = externalUrlSet;
  chunkSet.urlSet = new Set<string>(); // todo better way to delete from object

  console.log('chunk set', chunkSet);
  for (const key in chunkSet) {
    const vals = Array.from(chunkSet[key]).map((el: string) => el);
    const tempObj: any = {};
    tempObj[key] = vals;

    console.log('setting');
    chrome.storage.local.set(tempObj, () => {
      //console.log(`local storage of ${key} set to ${vals}`);
    });
  }
}
