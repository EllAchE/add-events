import React, { ReactElement, useState } from 'react';
import { render } from 'react-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import { openTab } from '../scripts/tab';
import { Badge, BadgeProps, IconButton, styled } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { DateAccordion } from './DateAccordion';

function Popup(): ReactElement {
  const [events, setEvents] = useState([]);

  chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      console.log(
        `Storage key "${key}" in namespace "${namespace}" changed.`,
        `Old value was "${oldValue}", new value is "${newValue}".`
      );
    }
  });

  chrome.storage.local.get('currentEvents', function (result) {
    console.log('events in storage', result);
    setEvents(result['currentEvents'] ? result['currentEvents'] : []);
  });

  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      top: 7,
      right: 7,
      padding: '0 4px',
    },
  }));

  return (
    <>
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
      <Grid sx={{ position: 'fixed', top: 10, right: 10 }}>
        <IconButton onClick={() => chrome.runtime.openOptionsPage()}>
          {/** TODO: callback to the openOptionsPage call */}
          <SettingsIcon />
        </IconButton>
        <IconButton>
          <HelpIcon />
        </IconButton>
        <StyledBadge badgeContent={4} color="error">
          <IconButton>
            <NotificationsIcon />
          </IconButton>
        </StyledBadge>
      </Grid>
      <Grid container justifyContent="space-between" sx={{ paddingTop: 2 }}>
        <Grid>
          <Button variant="contained" onClick={() => alert('not implm')}>
            Create All
          </Button>
        </Grid>
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
    </>
  );
}

render(<Popup />, document.getElementById('popup_ce'));
