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

// potentially use a drawer https://mui.com/material-ui/react-drawer/

function Popup(): ReactElement {
  // TODO add usestate etc. here to display retrieved events in the popup

  // useEffect(() => {
  //   chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
  //     const activeTabId = tabs.length === 0 ? 0 : tabs[0].id;
  //     chrome.tabs.sendMessage(activeTabId, '', (response) => {
  //       console.log('receieved res', response);
  //     });
  //   });
  // });

  // https://mui.com/material-ui/react-drawer/

  const [events, setEvents] = useState([]);

  chrome.runtime.onMessage.addListener((msg, sender, callback) => {
    const { type, body } = msg;
    alert('received message from backend');

    if (type == 'popup_init') {
      setEvents(body);
    }
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
      <Grid container spacing={2} justifyContent="space-around">
        <Grid item xs={4}>
          <Button variant="contained" onClick={() => alert('not implm')}>
            Create All
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" onClick={() => openTab()}>
            Open Calendar
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

render(<Popup />, document.getElementById('popup_ce'));
