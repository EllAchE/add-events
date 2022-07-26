import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import React, { ReactElement, useEffect, useState } from 'react';
import { render } from 'react-dom';

import { App } from '../app/App';
import openTab from '../scripts/tab';
import { DateAccordion } from './DateAccordion';

function Popup(): ReactElement {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    chrome.storage.local.get('currentEvents', (result) => {
      console.log('events in storage', result);
      setEvents(result.currentEvents ? result.currentEvents : []);
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
      <DateAccordion eventPrefills={events} />

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
            Tutorial
          </Button>
        </Grid>
      </Grid>
    </App>
  );
}

render(<Popup />, document.getElementById('popup_ce'));
