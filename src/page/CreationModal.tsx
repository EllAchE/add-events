import { Box, Paper, TextField } from '@mui/material';
import {
  DesktopDatePicker,
  LocalizationProvider,
  TimePicker,
} from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import React from 'react';
import { ReactElement } from 'react';
import Draggable from 'react-draggable';

export function CreationModal(props: any): ReactElement {
  const {
    visible,
    startDate,
    endDate,
    startTime,
    endTime,
    title,
    description,
    location,
    setStartDate,
    setEndDate,
    setStartTime,
    setEndTime,
    setTitle,
    setDescription,
    setLocation,
  } = props;
  return visible ? (
    <Draggable>
      <Box
        sx={{
          width: 400,
          height: 400,
          position: 'fixed',
          right: 16,
          bottom: -6,
          zIndex: 50,
        }}
      >
        <Paper elevation={8}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
              label="Start Date"
              renderInput={(params) => (
                <TextField {...params} sx={{ width: '100%' }} />
              )}
              onChange={(value) => setStartDate(value)}
              value={startDate}
            ></DesktopDatePicker>
            <TextField
              value={title}
              onChange={setTitle}
              variant="filled"
              label="Title"
              sx={{ width: '100%' }}
            />
            <TextField
              variant="filled"
              label="Location"
              value={location}
              onChange={(value) => setLocation(value)}
              sx={{ width: '100%' }}
            />
            <TextField
              variant="filled"
              label="Description"
              value={description}
              onChange={(value) => setDescription(value)}
              sx={{ width: '100%' }}
            />
            <DesktopDatePicker
              label="End Date"
              disabled={true}
              renderInput={(params) => (
                <TextField {...params} sx={{ width: '100%' }} />
              )}
              onChange={(newValue) => setEndDate(newValue)}
              value={endDate}
            ></DesktopDatePicker>
            <TimePicker
              label="Start Time"
              value={startTime}
              ampm={false}
              //minTime={startDate}
              onChange={(val) => setStartTime(val)}
              renderInput={(params) => (
                <TextField {...params} sx={{ width: '100%' }} />
              )}
            />
            <TimePicker
              label="End Time"
              value={endTime}
              ampm={false}
              //minTime={startDate}
              onChange={(val) => setEndTime(val)}
              renderInput={(params) => (
                <TextField {...params} sx={{ width: '100%' }} />
              )}
            />
          </LocalizationProvider>
        </Paper>
      </Box>
    </Draggable>
  ) : (
    <></>
  );
}
