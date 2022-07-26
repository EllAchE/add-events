import {
  Card,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { ReactElement } from 'react';
import HelpIcon from '@mui/icons-material/Help';

export function DemoCard(): ReactElement {
  return (
    <>
      <Typography variant="h5">Configure how events are identified!</Typography>
      <Card>
        <Grid container>
          <Grid item xs={8}>
            <Typography sx={{ padding: 3 }}>
              ...world was expected to come to an end on December 31, 2000. And
              again on December 31, 2012. But we're here today. We'll be here
              tomorrow. And we'll be here till{' '}
              <span className="add_to_cal_button add_to_cal_button_date">
                December 31, 3000
              </span>{' '}
              (I hope.{' '}
              <span className="add_to_cal_button add_to_cal_button_date">
                December 31, 2023{' '}
              </span>
              , at the least)...
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <figure>
              <img
                width={200}
                height={120}
                src="https://www.pngkey.com/png/full/834-8345759_a-publicly-available-server-is-hosted-at-book.png"
              ></img>
              <figcaption>
                A real human,{' '}
                <span className="add_to_cal_button add_to_cal_button_date">
                  19/11/2025
                </span>
              </figcaption>
            </figure>
          </Grid>
        </Grid>

        <Grid container sx={{ padding: 2 }} spacing={1}>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Match Color</InputLabel>
              <Select value={'na'} label="Match Color" sx={{ width: 200 }}>
                <MenuItem value={'na'}>No Color</MenuItem>
                <MenuItem value={'red'}>Magenta</MenuItem>
                <MenuItem value={'blue'}>Azure</MenuItem>
                <MenuItem value={'green'}>Green</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label={'Insert Button'}
            ></FormControlLabel>
            <Tooltip title="If this is disabled the extension will not modify the contents of webpages you visit. Events will still appear in the popup window.">
              <HelpIcon />
            </Tooltip>
          </Grid>
          <Grid item xs={5}>
            <Switch defaultChecked />
            <Typography>Highlight in-page</Typography>
            <Tooltip
              title={
                'If this is disabled the extension will not modify the contents of webpages you visit. Events will still appear in the popup window.'
              }
            >
              <HelpIcon />
            </Tooltip>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
