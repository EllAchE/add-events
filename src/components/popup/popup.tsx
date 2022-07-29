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

      setPeople(
        personSet?.map((el: string) => {
          return JSON.parse(el);
        }) ?? []
      );
      setPlaces(
        placeSet?.map((el: string) => {
          return JSON.parse(el);
        }) ?? []
      );
      setEmails(
        emailSet?.map((el: string) => {
          return JSON.parse(el);
        }) ?? []
      );
      setProperNouns(
        properNounSet?.map((el: string) => {
          return JSON.parse(el);
        }) ?? []
      );
      setDates(
        dateSet?.map((el: string) => {
          return JSON.parse(el);
        }) ?? []
      );
      setAtMentions(
        atMentionSet?.map((el: string) => {
          return JSON.parse(el);
        }) ?? []
      );
      setInternalUrls(
        internalUrlSet?.map((el: string) => {
          return JSON.parse(el);
        }) ?? []
      );
      setExternalUrls(
        externalUrlSet?.map((el: string) => {
          return JSON.parse(el);
        }) ?? []
      );
      setSamePageUrls(
        samePageUrlSet?.map((el: string) => {
          return JSON.parse(el);
        }) ?? []
      );
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
