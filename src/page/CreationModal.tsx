import { Box, Button, Grid, Paper, TextField } from '@mui/material';
import {
  DesktopDatePicker,
  LocalizationProvider,
  TimePicker,
} from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import React, { ReactElement } from 'react';
import Draggable from 'react-draggable';
import { Provider, useDispatch, useSelector } from 'react-redux';

import { focusModalElement, mapModalState } from '../utils/utils';
import {
  setStartDate,
  setTitle,
  setLocation,
  setDescription,
  setEndDate,
  setStartTime,
  setEndTime,
  setVisibility,
} from './modalSlice';
import store from './store';

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
    <Draggable disabled={false}>
      <Box
        sx={{
          width: 400,
          height: 400,
          position: 'fixed',
          right: 16,
          bottom: 2,
          zIndex: 2147483646,
        }}
      >
        <Paper elevation={8}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
              label="Start Date"
              renderInput={(params) => (
                <TextField
                  onClick={() =>
                    focusModalElement('add_to_cal_button_start_date')
                  }
                  id="add_to_cal_button_start_date"
                  {...params}
                  sx={{ width: '100%', zIndex: 2147483647 }}
                />
              )}
              onChange={(event) => dispatch(setStartDate(event.target.value))}
              value={startDate}
              disablePast={true}
            />
            <TextField
              id="add_to_cal_button_title"
              onClick={() => focusModalElement('add_to_cal_button_title')}
              value={title}
              onChange={(event) => dispatch(setTitle(event.target.value))}
              variant="filled"
              label="Title"
              sx={{ width: '100%', zIndex: 2147483647 }}
            />
            <TextField
              variant="filled"
              onClick={() => focusModalElement('add_to_cal_button_description')}
              id="add_to_cal_button_description"
              label="Description"
              value={description}
              onChange={(event) => dispatch(setDescription(event.target.value))}
              sx={{ width: '100%' }}
            />
            <DesktopDatePicker
              label="End Date"
              disablePast={true}
              disabled={true}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onClick={() =>
                    focusModalElement('add_to_cal_button_end_date')
                  }
                  id="add_to_cal_button_end_date"
                  sx={{ width: '100%', zIndex: 2147483647 }}
                />
              )}
              onChange={(event) => dispatch(setEndDate(event.target.value))}
              value={endDate}
            ></DesktopDatePicker>
            <TimePicker
              label="Start Time"
              value={startTime}
              ampm={false}
              onChange={(event) => dispatch(setStartTime(event.target.value))}
              renderInput={(params) => (
                <TextField
                  onClick={() =>
                    focusModalElement('add_to_cal_button_start_time')
                  }
                  id="add_to_cal_button_start_time"
                  {...params}
                  sx={{ width: '100%', zIndex: 2147483647 }}
                />
              )}
            />
            <TimePicker
              label="End Time"
              value={endTime}
              ampm={false}
              onChange={(event) => dispatch(setEndTime(event.target.value))}
              renderInput={(params) => (
                <TextField
                  id="add_to_cal_button_end_time"
                  onClick={() =>
                    focusModalElement('add_to_cal_button_end_time')
                  }
                  {...params}
                  sx={{ width: '100%', zIndex: 2147483647 }}
                />
              )}
            />
            <Grid container>
              <Grid item xs={9}>
                <TextField
                  id="add_to_cal_button_location"
                  variant="filled"
                  label="Location"
                  value={location}
                  onClick={() =>
                    focusModalElement('add_to_cal_button_location')
                  }
                  onChange={(event) =>
                    dispatch(setLocation(event.target.value))
                  }
                  sx={{ width: '100%', zIndex: 2147483647 }}
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  id="add_to_cal_button_submit"
                  variant="contained"
                  sx={{
                    width: '100%',
                    paddingTop: 1,
                    paddingBottom: 1,
                    zIndex: 2147483647,
                  }}
                  onClick={async () => {
                    const event = mapModalState(modalState);

                    const successfulCreationCallback = () => {
                      dispatch(setVisibility(false));
                      // TODO: should do something if there is an error creating
                    };

                    chrome.runtime.sendMessage(
                      {
                        events: [event],
                        type: 'create-event',
                        calendarName: 'Event Extension',
                      },
                      undefined,
                      successfulCreationCallback
                    );
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </LocalizationProvider>
        </Paper>
      </Box>
    </Draggable>
  ) : null;
}

export default function CreationModal(): ReactElement {
  return (
    <Provider store={store}>
      <StatelessCreationModal />
    </Provider>
  );
}
