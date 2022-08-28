import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import {
  Button,
  Switch,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import React, { ReactElement, useEffect, useState } from 'react';
import { render } from 'react-dom';
import { updateCalendarSuggestions } from '../../scripts/content-scripts/cron';
import {
  localStorageWrapper,
  openGithub,
  openTwitter,
  setSettings,
} from '../../scripts/utils/browserUtils';

import App from '../app/App';

function FreeformOptions(): ReactElement {
  return (
    <Grid container spacing={2}>
      <Grid></Grid>
    </Grid>
  );
}

function SwitchOptions(): ReactElement {
  return <Grid container spacing={2}></Grid>;
}
/*
  User controls their settings from here. Separate page from popup.
 */
function Options(): ReactElement {
  const [runOnPageLoad, setRunOnPageLoad] = useState<boolean>();
  const [suggestEvents, setSuggestEvents] = useState<boolean>();
  const [suggestSports, setSuggestSports] = useState<boolean>();
  const [suggestMusic, setSuggestMusic] = useState<boolean>();
  const [suggestComedy, setSuggestComedy] = useState<boolean>();
  const [suggestFamily, setSuggestFamily] = useState<boolean>();

  chrome.storage.local.get(null, (items) => {
    console.log('storage', items);
    setRunOnPageLoad(items.runOnPageLoad);
    setSuggestEvents(items.suggestEvents);
    setSuggestComedy(items.suggestComedy);
    setSuggestSports(items.suggestSports);
    setSuggestMusic(items.suggestMusic);
    setSuggestFamily(items.suggestFamily);
  });

  return (
    <App>
      <Typography variant="h3">Settings</Typography>
      <FormControlLabel
        sx={{
          paddingTop: 2,
          paddingBottom: 2,
        }}
        control={
          <Switch
            value={runOnPageLoad}
            checked={runOnPageLoad}
            onChange={(e: any, checked: boolean) => {
              setSettings({ runOnPageLoad: checked });
              setRunOnPageLoad(checked);
            }}
          />
        }
        label={<Typography variant="h5">Run on page load</Typography>}
      />
      <FormControlLabel
        sx={{
          paddingTop: 2,
          paddingBottom: 2,
        }}
        control={
          <Switch
            checked={suggestEvents}
            value={suggestEvents}
            onChange={(e: any, checked: boolean) => {
              setSettings({ suggestEvents: checked });
              setSuggestEvents(checked);
            }}
          />
        }
        label={<Typography variant="h5">Suggest events to me</Typography>}
      />
      <EventPreferenceOptions
        suggestComedy={suggestComedy}
        suggestFamily={suggestFamily}
        suggestMusic={suggestMusic}
        suggestSports={suggestSports}
        setSuggestComedy={setSuggestComedy}
        setSuggestFamily={setSuggestFamily}
        setSuggestMusic={setSuggestMusic}
        setSuggestSports={setSuggestSports}
      />
      <Typography variant="body1">
        So right now you can't actually change anything else...
        <br />
        But you can customize the shortcuts used to control the modal,
        <br />
        Go to{' '}
        <a href="chrome://extensions/shortcuts">
          chrome://extensions/shortcuts
        </a>{' '}
        to do so!
      </Typography>
      <Button
        variant="contained"
        sx={{
          width: '90%',
          paddingTop: 1,
          paddingBottom: 1,
        }}
        onClick={() =>{
          updateCalendarSuggestions()
        }}
      >
        Add Events to Calendar
      </Button>
      <br />
      <IconButton onClick={openTwitter}>
        <TwitterIcon />
      </IconButton>
      <IconButton onClick={openGithub}>
        <GitHubIcon />
      </IconButton>
    </App>
  );
}

function EventPreferenceOptions(props: any): ReactElement {
  const {
    setSuggestComedy,
    setSuggestFamily,
    setSuggestMusic,
    setSuggestSports,
    suggestSports,
    suggestFamily,
    suggestMusic,
    suggestComedy,
  } = props;
  return (
    <>
      <Typography>Show me these types of events:</Typography>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <Switch
                checked={suggestSports}
                value={suggestSports}
                onChange={(e: any, checked: boolean) => {
                  console.log('changed');
                  console.log(checked);
                  console.log(suggestSports);
                  setSettings({ suggestSports: checked });
                  setSuggestSports(checked);
                }}
              />
            }
            label="Sports"
          />
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <Switch
                checked={suggestMusic}
                value={suggestMusic}
                onChange={(e: any, checked: boolean) => {
                  setSettings({ suggestMusic: checked });
                  setSuggestMusic(checked);
                }}
              />
            }
            label="Music"
          />
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <Switch
                checked={suggestComedy}
                value={suggestComedy}
                onChange={(e: any, checked: boolean) => {
                  setSettings({ suggestComedy: checked });
                  setSuggestComedy(checked);
                }}
              />
            }
            label="Comedy"
          />
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <Switch
                checked={suggestFamily}
                value={suggestFamily}
                onChange={(e: any, checked: boolean) => {
                  setSettings({ suggestFamily: checked });
                  setSuggestFamily(checked);
                }}
              />
            }
            label="Family"
          />
        </Grid>
      </Grid>
    </>
  );
}

render(<Options />, document.getElementById('options_ce'));
