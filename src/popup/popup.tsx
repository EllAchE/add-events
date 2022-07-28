import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import React, { ReactElement, useEffect, useState } from 'react';
import { render } from 'react-dom';

import App from '../app/App';
import openTab from '../scripts/tab';
import { DateAccordion } from './DateAccordion';

function Popup(): ReactElement {
  const [persons, setPersons] = useState([]);
  const [places, setPlaces] = useState([]);
  const [emails, setEmails] = useState([]);
  const [ProperNouns, setProperNouns] = useState([]);
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

      setPersons(personSet ? personSet : []);
      setPlaces(placeSet ? placeSet : []);
      setEmails(emailSet ? emailSet : []);
      setProperNouns(properNounSet ?? []);
      setDates(dateSet ?? []);
      setAtMentions(atMentionSet ?? []);
      setInternalUrls(internalUrlSet ?? []);
      setExternalUrls(externalUrlSet ?? []);
      setSamePageUrls(samePageUrlSet ?? []);
    });
  }, []);

  return (
    <App>
      <Grid
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1 style={{ fontSize: 48 }}>Eventful</h1>
      </Grid>
      <DateAccordion dates={dates} />
      <Grid container justifyContent="space-around" sx={{ paddingTop: 2 }}>
        {/* <Grid>
          <Button variant="contained" onClick={() => alert('not implm')}>
          TODO: Support this, if desired. Doens't seem like something people would actually use anyways
            Create All
          </Button>
        </Grid> */}
        <Grid>
          <Button variant="contained" onClick={() => openTab()}>
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
