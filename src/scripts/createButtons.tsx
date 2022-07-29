import {
  getCurrentPageHost,
  getCurrentPageUrl,
  setLastStorageUrl,
  setLastTabAndWindow,
} from '../utils/utils';
import replaceText from './replaceText';
import { ChunkSets as ChunkSetObj } from './types';

export function createEventButtons(
  elements: HTMLCollectionOf<HTMLElement>
): void {
  let chunkSetObj: ChunkSetObj = createEmptyChunkSetObj();

  const windowPrefixUrl = getCurrentPageUrl().slice(0, -1);

  for (const i in elements) {
    try {
      // Ignore tags that will not display text to shorten execution
      if (
        !['STYLE', 'SCRIPT', 'NOSCRIPT', 'INPUT', 'TITLE', 'META'].includes(
          elements[i].tagName
        ) &&
        !/add_to_cal_button/.test(elements[i].className) &&
        getComputedStyle(elements[i]).opacity != '0' &&
        !['rgb(0, 0, 0)', 'rgba(0, 0, 0, 0)', 'transparent'].includes(
          getComputedStyle(elements[i]).color
        )
      ) {
        chunkSetObj = replaceText(elements[i], chunkSetObj);
      }

      if (elements[i].tagName === 'A') {
        const href = elements[i].getAttribute('href');
        if (href && /http/.test(href)) {
          chunkSetObj.urlSet.add(href);
        } else if (href && href.charAt(0) === '/') {
          chunkSetObj.urlSet.add(windowPrefixUrl + href);
        } else if (href) {
          // case for id selectors, i.e. #maincontent
          chunkSetObj.urlSet.add(windowPrefixUrl + '/' + href);
        }
      }
    } catch (err: any) {
      console.log('error checking computedStyle', err);
    }
  }

  saveChunkSetsToLocalStorage(chunkSetObj);
  setLastStorageUrl(windowPrefixUrl);
  setLastTabAndWindow();
}

function saveChunkSetsToLocalStorage(chunkSetObj: ChunkSetObj) {
  const internalUrlSet = new Set<string>();
  const samePageUrlSet = new Set<string>();
  const externalUrlSet = new Set<string>();

  const host = getCurrentPageHost();

  for (const urlChunk of chunkSetObj.urlSet) {
    const obj = JSON.parse(urlChunk);
    if (obj.text.includes(host)) {
      if (obj.text.includes('#')) {
        samePageUrlSet.add(urlChunk);
      } else {
        internalUrlSet.add(urlChunk);
      }
    } else {
      externalUrlSet.add(urlChunk);
    }
  }

  // TODO: this only handles the buttons I create, could not create buttons but parse
  chunkSetObj.internalUrlSet = internalUrlSet;
  chunkSetObj.samePageUrlSet = samePageUrlSet;
  chunkSetObj.externalUrlSet = externalUrlSet;
  chunkSetObj.urlSet = new Set<string>(); // todo better way to delete from object

  console.log('Values of chunk set:', chunkSetObj);
  for (const key in chunkSetObj) {
    const vals = Array.from(chunkSetObj[key]).map((el: string) =>
      JSON.parse(el)
    );
    const tempObj: any = {};
    tempObj[key] = vals;

    chrome.storage.local.set(tempObj, () => {
      console.log(`local storage of ${key} set to ${vals}`);
    });
  }
}

function createEmptyChunkSetObj(): ChunkSetObj {
  return {
    personSet: new Set<string>(),
    placeSet: new Set<string>(),
    urlSet: new Set<string>(),
    emailSet: new Set<string>(),
    properNounSet: new Set<string>(),
    dateSet: new Set<string>(),
    atMentionSet: new Set<string>(),
  };
}
