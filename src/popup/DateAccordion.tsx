import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  TextField,
  Grid,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import React, { useState, ReactElement } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { createEvents } from '../scripts/background';
import AlertDialog from './ConfirmationDialog';

const testEvent = {
  // date: 'July 16, 2022',
  //attendees: [] as any[],
  description: 'Test Event',
  summary: 'Test Title' + new Date().toString(),
  end: {
    dateTime: '2022-07-29T09:00:00-07:00',
  },
  start: {
    dateTime: '2022-07-29T09:00:00-07:00',
  },
};

const events = [testEvent];

function DateSubmissionForm({ eventPrefill }: { eventPrefill: any }) {
  const {
    startDate: initialStartDate,
    endDate: initialEndDate,
    description,
    title,
  } = eventPrefill;

  const [startDate, setStartDate] = useState<Date | null>(
    new Date(initialStartDate)
  );
  const handleStartDateChange = (newValue: Date | null) => {
    setStartDate(newValue);
  };

  const [endDate, setEndDate] = useState<Date | null>(new Date(initialEndDate));
  const handleEndDateChange = (newValue: Date | null) => {
    setEndDate(newValue);
  };

  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const openConfirmation = () => {
    setConfirmationOpen(true);
  };

  const closeConfirmation = () => {
    setConfirmationOpen(false);
  };

  return (
    <AccordionDetails>
      <AlertDialog open={confirmationOpen} handleClose={closeConfirmation} />
      <TextField
        label="Title"
        variant="outlined"
        defaultValue={title}
      ></TextField>
      <TextField
        variant="outlined"
        multiline
        maxRows={2}
        defaultValue={description}
        label="Description"
      ></TextField>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DesktopDatePicker
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
          renderInput={(params) => <TextField {...params} />}
        ></DesktopDatePicker>
        <DesktopDatePicker
          label="End Date"
          value={endDate}
          onChange={handleEndDateChange}
          renderInput={(params) => <TextField {...params} />}
        ></DesktopDatePicker>
        <TimePicker
          label="Start Time"
          value={startDate}
          onChange={handleStartDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <TimePicker
          label="End Time"
          value={endDate}
          onChange={handleEndDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Grid container spacing={2} justifyContent="space-around">
        <Grid item xs={4}>
          <Button
            variant="contained"
            onClick={() => {
              openConfirmation();
              createEvents(events);
            }}
          >
            Create Event
          </Button>
        </Grid>
      </Grid>
    </AccordionDetails>
  );
}

export function DateAccordion({
  eventPrefills,
}: {
  eventPrefills: any;
}): ReactElement {
  if (eventPrefills.length < 1) {
    return <>No events found on page!</>;
  }

  return (
    <>
      {eventPrefills.map((eventPrefill: any) => {
        const { startDate, endDate, description } = eventPrefill;
        return (
          <>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  {startDate == endDate
                    ? startDate
                    : `${startDate} - ${endDate}`}
                </Typography>
                <Tooltip title="Go to event on webpage">
                  <IconButton onClick={() => alert('not implemented')}>
                    <FindInPageIcon />
                  </IconButton>
                </Tooltip>
              </AccordionSummary>
              <DateSubmissionForm eventPrefill={eventPrefill} />
              {/** There is a better way to pass the same name child prop I believe */}
            </Accordion>
          </>
        );
      })}
    </>
  );
}
