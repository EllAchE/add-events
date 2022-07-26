import { Box, Button, Grid, Paper, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import React, { ReactElement } from 'react';
import Draggable from 'react-draggable';
import { Provider, useDispatch, useSelector } from 'react-redux';

import createEvents from '../scripts/createEvents';
import { mapModalState } from '../utils/utils';
import { setStartDate, setTitle, setLocation } from './modalSlice';
import store from './store';

export function CreationModal(): ReactElement {
  return (
    <Provider store={store}>
      <StatelessCreationModal />
    </Provider>
  );
}

function StatelessCreationModal(): ReactElement {
  const modalState = useSelector((state: any) => state.modal);
  const dispatch = useDispatch();
  const {
    visible,
    startDate,
    endDate,
    startTime,
    endTime,
    title,
    description,
    location,
  } = modalState;
  return visible ? (
    <Draggable>
      <Box
        sx={{
          width: 400,
          height: 400,
          position: 'fixed',
          right: 16,
          bottom: 2,
          zIndex: 2147483647,
        }}
      >
        <Paper elevation={8}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
              label="Start Date"
              renderInput={(params) => (
                <TextField {...params} sx={{ width: '100%' }} />
              )}
              onChange={(event) => dispatch(setStartDate(event.target.value))}
              value={startDate}
            />
            <TextField
              value={title}
              onChange={(event) => dispatch(setTitle(event.target.value))}
              variant="filled"
              label="Title"
              sx={{ width: '100%' }}
            />
            <Grid container>
              <Grid item xs={9}>
                <TextField
                  variant="filled"
                  label="Location"
                  value={location}
                  onChange={(event) =>
                    dispatch(setLocation(event.target.value))
                  }
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  sx={{
                    width: '100%',
                    paddingTop: 1,
                    paddingBottom: 1,
                  }}
                  onClick={() => {
                    const event = mapModalState(modalState);
                    createEvents([event]);
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>

            {/* <TextField
              variant="filled"
              label="Description"
              value={description}
              onChange={(event) => dispatch(setDescription(event.target.value))}
              sx={{ width: '100%' }}
            /> */}
            {/* <DesktopDatePicker
              label="End Date"
              disabled={true}
              renderInput={(params) => (
                <TextField {...params} sx={{ width: '100%' }} />
              )}
              onChange={(event) => dispatch(setEndDate(event.target.value))}
              value={endDate}
            ></DesktopDatePicker>
            <TimePicker
              label="Start Time"
              value={startTime}
              ampm={false}
              //minTime={startDate}
              onChange={(event) => dispatch(setStartTime(event.target.value))}
              renderInput={(params) => (
                <TextField {...params} sx={{ width: '100%' }} />
              )}
            />
            <TimePicker
              label="End Time"
              value={endTime}
              ampm={false}
              //minTime={startDate}
              onChange={(event) => dispatch(setEndTime(event.target.value))}
              renderInput={(params) => (
                <TextField {...params} sx={{ width: '100%' }} />
              )}
            /> */}
          </LocalizationProvider>
        </Paper>
      </Box>
    </Draggable>
  ) : (
    <></>
  );
}
