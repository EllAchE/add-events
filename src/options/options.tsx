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
} from '@mui/material';
import React, { ReactElement } from 'react';
import { render } from 'react-dom';

const defaultSettings = Object.freeze({
  border: false,
  background: false,
});
const generalSection = document.getElementById('generalOptionsWrapper');

function updateSetting(key: string, value: string | number | boolean) {
  chrome.storage.local.get('settings', ({ settings }) => {
    chrome.storage.local.set({
      settings: {
        ...settings,
        [key]: value,
      },
    });
  });
}

function createOption(
  settingKey: string,
  settingsObject: { [x: string]: any },
  wrapper: HTMLElement
) {
  const settingWrapper = document.createElement('div');
  settingWrapper.classList.add('setting-item');
  settingWrapper.innerHTML = `
    <div class="label-wrapper">
      <label for="${settingKey}" id="${settingKey}Desc">
        ${chrome.i18n.getMessage(`setting${settingKey}`)}
      </label>
    </div>
  
    <input type="checkbox" ${
      settingsObject[settingKey] ? 'checked' : ''
    } id="${settingKey}" />
    <label for="${settingKey}"
      tabindex="0"
      role="switch"
      aria-checked="${settingsObject[settingKey]}"
      aria-describedby="${settingKey}-desc"
      class="is-switch"
    ></label>
    `;

  const toggleSwitch = settingWrapper.querySelector('label.is-switch');
  const input = settingWrapper.querySelector('input');

  input.onchange = () => {
    toggleSwitch.setAttribute(
      'aria-checked',
      input.checked as unknown as string
    );
    updateSetting(settingKey, input.checked);
  };

  (toggleSwitch as HTMLElement).onkeydown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      (toggleSwitch as HTMLElement).click();
    }
  };

  wrapper.appendChild(settingWrapper);
}

chrome.storage.local.get('settings', ({ settings }) => {
  const options = settings ?? defaultSettings; // Fall back to default if settings are not defined
  if (!settings) {
    chrome.storage.local.set({
      settings: defaultSettings,
    });
  }

  // Create and display options
  const generalOptions = Object.keys(options).filter(
    (x) => !x.startsWith('advanced')
  );

  generalOptions.forEach((option: string) =>
    createOption(option, options, generalSection)
  );
});

function Options(): ReactElement {
  return (
    <>
      <h1>Settings Page</h1>
      <div>aaaaa</div>
      <FormGroup>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControlLabel
              control={<Checkbox />}
              label="Match European Times"
            />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel
              control={<Checkbox />}
              label="Match American times"
            />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel control={<Checkbox />} label="Include times" />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControlLabel control={<Checkbox />} label="Insert Button" />
          </Grid>
          <Grid item xs={4}>
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
              </Select>
            </FormControl>
            {/* <FormControl>
              <Select sx={{ width: 300 }} label="Match Color">
                <InputLabel>Match Color</InputLabel>
                <MenuItem value={'magenta'} defaultValue={'magenta'}>
                  Magenta
                </MenuItem>
              </Select>
            </FormControl> */}
          </Grid>
        </Grid>
      </FormGroup>
    </>
  );
}

render(<Options />, document.getElementById('options_ce'));
