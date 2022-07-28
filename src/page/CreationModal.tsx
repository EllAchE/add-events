import {
  Alert,
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  TextField,
  TextFieldProps,
} from '@mui/material';
import {
  DesktopDatePicker,
  LocalizationProvider,
  TimePicker,
} from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Moment } from 'moment';
import React, { ReactElement, useState } from 'react';
import Draggable from 'react-draggable';
import { Provider, useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';

import {
  focusModalElement,
  getCurrentPageUrl,
  mapModalState,
} from '../utils/utils';
import {
  setStartDate,
  setTitle,
  setLocation,
  setDescription,
  setEndDate,
  setStartTime,
  setEndTime,
  setVisibility,
  setActiveField,
} from './modalSlice';
import store from './store';

function StatelessCreationModal(): ReactElement {
  const modalState = useSelector((state: any) => state.modal);
  const dispatch = useDispatch();

  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [snackbarIsSuccess, setSnackbarIsSuccess] = useState<boolean>(false);

  const snackbarCallback = (success: boolean) => {
    setShowSnackbar(true);
    setSnackbarIsSuccess(success);
  };

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

  return (
    <>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert severity={snackbarIsSuccess ? 'success' : 'warning'}>
          {snackbarIsSuccess
            ? 'Created new calendar event'
            : 'Failed to create new calendar event'}
        </Alert>
      </Snackbar>
      {visible ? (
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
              <Grid container columnGap={2} direction="row">
                <Grid item xs={5}>
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

                      chrome.runtime.sendMessage(
                        {
                          events: [event],
                          type: 'create-event',
                          calendarName: 'Event Extension',
                        },
                        function (isSuccess: any) {
                          console.log('call success callbcak', isSuccess);
                          dispatch(setVisibility(!isSuccess));
                          snackbarCallback(isSuccess);
                          // TODO: should do something if there is an error creating
                        }
                      );
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid item xs={5}>
                  <Button
                    id="add_to_cal_button_close"
                    variant="contained"
                    sx={{
                      width: '100%',
                      paddingTop: 1,
                      paddingBottom: 1,
                      zIndex: 2147483647,
                    }}
                    onClick={() => {
                      dispatch(setStartDate(null));
                      dispatch(setDescription(''));
                      dispatch(setTitle(''));
                      dispatch(setLocation(''));
                      dispatch(setEndDate(null));
                      dispatch(setStartTime(null));
                      dispatch(setEndTime(null));
                      dispatch(setActiveField('add_to_cal_button_start_date'));
                    }}
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    size="small"
                    onClick={() => {
                      dispatch(setVisibility(false));
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label="Start Date"
                  renderInput={(params: TextFieldProps) => (
                    <TextField
                      size="small"
                      variant="filled"
                      onClick={() =>
                        focusModalElement('add_to_cal_button_start_date')
                      }
                      id="add_to_cal_button_start_date"
                      {...params}
                      sx={{ width: '100%', zIndex: 2147483647 }}
                    />
                  )}
                  onChange={(moment: Moment) => {
                    console.log('should be settiung start', moment.toDate());
                    dispatch(setStartDate(moment.toISOString()));
                  }}
                  value={startDate}
                  disablePast={true}
                />
                <CreationModalTextField
                  label="Title"
                  id={'add_to_cal_button_title'}
                  value={title}
                  onChange={(event) => dispatch(setTitle(event?.target?.value))}
                />
                <CreationModalTextField
                  label="Description"
                  id={'add_to_cal_button_description'}
                  value={description}
                  onChange={(event) =>
                    dispatch(setDescription(event?.target?.value))
                  }
                />
                <CreationModalTextField
                  label="Location"
                  id={'add_to_cal_button_location'}
                  value={location}
                  onChange={(event) =>
                    dispatch(setLocation(event?.target?.value))
                  }
                />
                <DesktopDatePicker
                  label="End Date"
                  disablePast={true}
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      variant="filled"
                      {...params}
                      onClick={() =>
                        focusModalElement('add_to_cal_button_end_date')
                      }
                      id="add_to_cal_button_end_date"
                      sx={{ width: '100%', zIndex: 2147483647 }}
                    />
                  )}
                  onChange={(moment: Moment) => {
                    console.log('should be settiung end', moment);
                    dispatch(setEndDate(moment.toISOString()));
                  }}
                  value={endDate}
                ></DesktopDatePicker>
                <TimePicker
                  label="Start Time"
                  value={startTime}
                  ampm={false}
                  onChange={(event) =>
                    dispatch(setStartTime(event?.target?.value))
                  }
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      variant="filled"
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
                  onChange={(event) =>
                    dispatch(setEndTime(event?.target?.value))
                  }
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      variant="filled"
                      id="add_to_cal_button_end_time"
                      onClick={() =>
                        focusModalElement('add_to_cal_button_end_time')
                      }
                      {...params}
                      sx={{ width: '100%', zIndex: 2147483647 }}
                    />
                  )}
                />
                <Grid item xs={3}></Grid>
              </LocalizationProvider>
            </Paper>
          </Box>
        </Draggable>
      ) : null}
    </>
  );
}

function CreationModalTextField({
  label,
  id,
  value,
  onChange,
}: {
  label: string;
  id: string;
  value: string | Date;
  onChange: (event: any) => void;
}): ReactElement {
  return (
    <TextField
      size="small"
      id={id}
      onClick={() => focusModalElement(id)}
      value={value}
      onChange={onChange}
      variant="filled"
      label={label}
      sx={{ width: '100%', zIndex: 2147483647 }}
    />
  );
}

export default function CreationModal(): ReactElement {
  return (
    <Provider store={store}>
      <StatelessCreationModal />
    </Provider>
  );
}
