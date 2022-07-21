import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { render } from 'react-dom';
import GitHubIcon from '@mui/icons-material/GitHub';

/* 
  User controls their settings from here. Separate page from popup.
 */
function Options(): ReactElement {
  return (
    <>
      <h1>Settings</h1>
      <FormGroup>
        <CheckboxOptions />
        <FreeformOptions />
        <Typography>Have any questions? Want to contribute?</Typography>
        <IconButton>
          <GitHubIcon />
        </IconButton>
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
      <Grid>
        <FormControl fullWidth>
          <InputLabel>Match Color</InputLabel>
          <Select value={'a'} label="Match Color" sx={{ width: 200 }}>
            <MenuItem value={'red'}>Magenta</MenuItem>
            <MenuItem value={'blue'}>Azure</MenuItem>
            <MenuItem value={'green'}>Green</MenuItem>
          </Select>
        </FormControl>
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
