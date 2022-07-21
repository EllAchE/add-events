import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { render } from 'react-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import { DemoCard } from './DemoCard';

/* 
  User controls their settings from here. Separate page from popup.
 */
function Options(): ReactElement {
  return (
    <>
      <Typography variant="h3">Settings</Typography>
      <DemoCard />
      <FormGroup>
        <Typography>Have any questions? Want to contribute?</Typography>
        <IconButton>
          <TwitterIcon />
        </IconButton>
        <IconButton>
          <GitHubIcon />
        </IconButton>
        <CheckboxOptions />
        <FreeformOptions />
      </FormGroup>
    </>
  );
}

function FreeformOptions(): ReactElement {
  return (
    <Grid container spacing={2}>
      <Grid>
        <Autocomplete
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="Automatically Invite Guests"
              placeholder="Search"
              sx={{ width: 300 }}
            />
          )}
          options={[]}
          freeSolo
          multiple
        ></Autocomplete>
      </Grid>
    </Grid>
  );
}

function CheckboxOptions(): ReactElement {
  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <FormControlLabel
          control={<Checkbox disabled={true} />}
          label="Match European Times"
        />
      </Grid>
      <Grid item xs={2}>
        <FormControlLabel
          control={<Checkbox disabled={true} />}
          label="Match American times"
        />
      </Grid>
      <Grid item xs={2}>
        <FormControlLabel
          control={<Checkbox disabled={true} />}
          label="Include times"
        />
      </Grid>
      <Grid item xs={2}>
        <FormControlLabel
          control={<Checkbox disabled={true} />}
          label="Insert Button"
        />
      </Grid>
      <Grid item xs={2}>
        <FormControlLabel
          control={<Checkbox />}
          label="Ask Before Adding Event"
        />
      </Grid>
    </Grid>
  );
}

render(<Options />, document.getElementById('options_ce'));
