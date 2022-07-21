import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { render } from 'react-dom';
import GitHubIcon from '@mui/icons-material/GitHub';

const defaultSettings = Object.freeze({
  border: false,
  background: false,
});
const generalSection = document.getElementById('generalOptionsWrapper');

function Options(): ReactElement {
  return (
    <>
      <h1>Settings</h1>
      <FormGroup>
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
        <Typography>Have any questions? Want to contribute?</Typography>
        <GitHubIcon />
      </FormGroup>
    </>
  );
}

render(<Options />, document.getElementById('options_ce'));
