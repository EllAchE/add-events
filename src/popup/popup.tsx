import React, { ReactElement, useEffect } from 'react';
import { render } from 'react-dom';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

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

  return (
    <div>
      <h1>Eventful</h1>
      <p>Customize your events</p>
      <FormGroup>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControlLabel control={<Checkbox />} label="Include times" />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel control={<Checkbox />} label="Include times" />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel control={<Checkbox />} label="Include times" />
          </Grid>
        </Grid>
      </FormGroup>
      <Grid container spacing={2} justifyContent="space-around">
        <Grid item xs={4}>
          <Button variant="contained">Open Calendar</Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained">Add Event</Button>
        </Grid>
      </Grid>
    </div>
  );
}

render(<Popup />, document.getElementById('popup'));

chrome.runtime.sendMessage({ message: 'msg' });
