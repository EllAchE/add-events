import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import React, { ReactElement, useEffect, useState } from 'react';
import { render } from 'react-dom';
import { openCalendar } from '../../scripts/utils/browserUtils';

import App from '../app/App';
import TabGroup from './TabGroup';

function Popup(): ReactElement {
  const [people, setPeople] = useState([]);
  const [places, setPlaces] = useState([]);
  const [emails, setEmails] = useState([]);
  const [properNouns, setProperNouns] = useState([]);
  const [dates, setDates] = useState([]);
  const [atMentions, setAtMentions] = useState([]);
  const [internalUrls, setInternalUrls] = useState([]);
  const [externalUrls, setExternalUrls] = useState([]);
  const [SamePageUrls, setSamePageUrls] = useState([]);

  useEffect(() => {
    console.log('change to component');
    chrome.storage.local.get(null, (result) => {
      console.log('in storage', result);
      const {
        personSet,
        placeSet,
        emailSet,
        properNounSet,
        dateSet,
        atMentionSet,
        internalUrlSet,
        samePageUrlSet,
        externalUrlSet,
      } = result;

      const filterSet = (arr: any[]): any[] => {
        console.log(arr);
        const f = arr.filter((value: any, index: any, self: any) => {
          return (
            value &&
            self.findIndex(
              (v: any) => v?.text?.toLowerCase() === value?.text?.toLowerCase()
            ) === index
          );
        });
        console.log(f);
        return f;
      };
      setPeople(filterSet(personSet) ?? []);
      setPlaces(filterSet(placeSet) ?? []);
      setEmails(filterSet(emailSet) ?? []);
      setProperNouns(filterSet(properNounSet) ?? []);
      setDates(filterSet(dateSet) ?? []);
      setAtMentions(filterSet(atMentionSet) ?? []);
      setInternalUrls(filterSet(internalUrlSet) ?? []);
      setExternalUrls(filterSet(externalUrlSet) ?? []);
      setSamePageUrls(filterSet(samePageUrlSet) ?? []);
    });
  }, []);

  return (
    <App>
      <TabGroup
        people={people}
        emails={emails}
        dates={dates}
        places={places}
        atMentions={atMentions}
      />
      <Grid container justifyContent="space-around" sx={{ paddingTop: 2 }}>
        {/* <Grid>
          <Button variant="contained" onClick={() => alert('not implm')}>
          TODO: Support this, if desired. Doens't seem like something people would actually use anyways
            Create All
          </Button>
        </Grid> */}
        <Grid>
          <Button variant="contained" onClick={openCalendar}>
            Open Calendar
          </Button>
        </Grid>
        <Grid>
          <Button variant="contained" onClick={() => alert('not implm')}>
            Parse Page
          </Button>
        </Grid>
        <Grid>
          <Button variant="contained" onClick={() => alert('not implm')}>
            Tutorial
          </Button>
        </Grid>
      </Grid>
    </App>
  );
}

render(<Popup />, document.getElementById('popup_ce'));
