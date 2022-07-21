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
  Checkbox,
  FormControlLabel,
  Alert,
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import React, { useState, ReactElement } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpIcon from '@mui/icons-material/Help';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import AlertDialog from './ConfirmationDialog';
import { createEvents } from '../scripts/createEvents';

function DateSubmissionForm({ eventPrefill }: { eventPrefill: any }) {
  console.log('date sub form');
  console.log(eventPrefill);
  const {
    startDate: initialStartDate,
    endDate: initialEndDate,
    startTime: initialStartTime,
    endTime: initialEndTime,
    description: initialDescription,
    title: initialTitle,
  } = eventPrefill;

  const [startDate, setStartDate] = useState<Date | null>(
    new Date(initialStartDate)
  );
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [endDate, setEndDate] = useState<Date | null>(new Date(initialEndDate));
  const [isAllDay, setIsAllDay] = useState<boolean>(
    !initialStartTime && !initialEndTime
  );
  const [isSingleDay, setIsSingleDay] = useState<boolean>(
    !(initialStartDate && initialEndDate)
  );
  const [title, setTitle] = useState<string>(initialTitle);
  const [description, setDescription] = useState<string>(initialDescription);

  const handleStartDateChange = (newValue: Date | null) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue: Date | null) => {
    setEndDate(newValue);
  };

  const openConfirmation = () => {
    setConfirmationOpen(true);
  };

  const closeConfirmation = () => {
    setConfirmationOpen(false);
  };

  return (
    <AccordionDetails>
      <AlertDialog open={confirmationOpen} handleClose={closeConfirmation} />
      <Grid sx={{ paddingBottom: 1 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isAllDay}
              onChange={(e) => setIsAllDay(e.target.checked)}
            />
          }
          label="All Day"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isSingleDay}
              onChange={(e) => setIsSingleDay(e.target.checked)}
            />
          }
          label="Single Day"
        />
      </Grid>
      <Grid
        container
        spacing={1}
        justifyContent="flex-start"
        sx={{ paddingBottom: 2 }}
      >
        <Grid item xs={4}>
          <TextField
            label="Title"
            variant="outlined"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
          ></TextField>
        </Grid>
        <Grid item xs={8}>
          <TextField
            sx={{ width: '100%' }}
            variant="outlined"
            multiline
            maxRows={3}
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Description"
          ></TextField>
        </Grid>
      </Grid>

      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Grid
          container
          spacing={1}
          justifyContent="flex-start"
          sx={{ paddingBottom: 2 }}
        >
          <Grid item xs={6}>
            <DesktopDatePicker
              label={isSingleDay ? 'Date' : 'Start Date'}
              value={startDate}
              onChange={handleStartDateChange}
              renderInput={(params) => (
                <TextField {...params} sx={{ width: '100%' }} />
              )}
            ></DesktopDatePicker>
          </Grid>
          {!isSingleDay && (
            <Grid item xs={6}>
              <DesktopDatePicker
                label="End Date"
                value={endDate}
                onChange={handleEndDateChange}
                renderInput={(params) => (
                  <TextField {...params} sx={{ width: '100%' }} />
                )}
              ></DesktopDatePicker>
            </Grid>
          )}
        </Grid>
        {!isAllDay && (
          <Grid
            container
            spacing={1}
            justifyContent="flex-start"
            sx={{ paddingBottom: 2 }}
          >
            <Grid item xs={6}>
              <TimePicker
                label="Start Time"
                value={startDate}
                onChange={handleStartDateChange}
                renderInput={(params) => (
                  <TextField {...params} sx={{ width: '100%' }} />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TimePicker
                label="End Time"
                value={endDate}
                onChange={handleEndDateChange}
                renderInput={(params) => (
                  <TextField {...params} sx={{ width: '100%' }} />
                )}
              />
            </Grid>
          </Grid>
        )}
      </LocalizationProvider>
      <Grid container spacing={2} justifyContent="space-around">
        <Grid item xs={4}>
          <Button
            sx={{ width: '100%' }}
            variant="contained"
            onClick={() => {
              openConfirmation();
              createEvents([
                {
                  description,
                  end: {
                    dateTime: isSingleDay
                      ? startDate.toISOString()
                      : endDate.toISOString(),
                  },
                  start: {
                    dateTime: startDate.toISOString(),
                  },
                  summary: title,
                },
              ]);
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
    return (
      <Alert severity="warning">
        <Typography>No events found on page!</Typography>
      </Alert>
    );
  }

  return (
    <>
      {eventPrefills.map((eventPrefill: any) => {
        if (!eventPrefill.startDate && eventPrefill.date) {
          eventPrefill.startDate = eventPrefill.date;
        }
        const { startDate, endDate, description, date } = eventPrefill;

        return (
          <Accordion key={startDate + endDate + description}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                {!endDate || startDate == endDate
                  ? startDate
                  : `${startDate} - ${endDate}`}
                <Tooltip title="See event details on webpage">
                  <IconButton onClick={() => alert('not implemented')}>
                    <FindInPageIcon />
                  </IconButton>
                </Tooltip>
              </Typography>
            </AccordionSummary>
            <DateSubmissionForm eventPrefill={eventPrefill} />
            {/** There is a better way to pass the same name child prop I believe */}
          </Accordion>
        );
      })}
    </>
  );
}
