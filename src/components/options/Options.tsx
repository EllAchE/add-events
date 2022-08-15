import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import {
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import React, { ReactElement, useEffect, useState } from 'react';
import { render } from 'react-dom';
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

function CheckboxOptions(): ReactElement {
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

  chrome.storage.local.get('runOnPageLoad', (items) => {
    setRunOnPageLoad(items.runOnPageLoad);
    setSuggestEvents(items.suggestEvents);
  });
  console.log('val after', runOnPageLoad);

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
            value={suggestEvents}
            checked={suggestEvents}
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
              <Checkbox
                value={suggestSports}
                onChange={(e: any, checked: boolean) => {
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
              <Checkbox
                value={suggestMusic}
                onChange={(e: any, checked: boolean) => {
                  setSettings({ suggestSports: checked });
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
              <Checkbox
                value={suggestComedy}
                onChange={(e: any, checked: boolean) => {
                  setSettings({ suggestSports: checked });
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
              <Checkbox
                value={suggestFamily}
                onChange={(e: any, checked: boolean) => {
                  setSettings({ suggestSports: checked });
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
