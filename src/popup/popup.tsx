import React, { ReactElement } from 'react';
import { render } from 'react-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import { openTab } from '../scripts/tab';
import { IconButton } from '@mui/material';

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
      <DateAccordion
        eventPrefills={[
          {
            startDate: 'July 1, 2023',
            endDate: 'July 1, 2023',
            description: 'A is gonna be lit Time: 5pm-6pm',
            title: 'Event Title',
          },
          {
            startDate: 'July 4, 2023',
            endDate: 'July 5, 2023',
            description: 'A is gonna be lit Time: 5pm-6pm',
          },
        ]}
      />
      <IconButton onClick={() => chrome.runtime.openOptionsPage()}>
        {/** TODO: callback to the openOptionsPage call */}
        <SettingsIcon />
      </IconButton>
      <IconButton>
        <HelpIcon />
      </IconButton>
      <Grid container spacing={2} justifyContent="space-around">
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
