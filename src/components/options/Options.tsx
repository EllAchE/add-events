import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import {
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
  console.log('in component init', runOnPageLoad);

  chrome.storage.local.get('runOnPageLoad', (items) => {
    console.log('setting run on page', items);
    setRunOnPageLoad(items.runOnPageLoad);
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
              console.log('on change called', checked);
              setSettings({ runOnPageLoad: checked });
              setRunOnPageLoad(checked);
            }}
          />
        }
        label={<Typography variant="h5">Run on page load</Typography>}
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

render(<Options />, document.getElementById('options_ce'));
