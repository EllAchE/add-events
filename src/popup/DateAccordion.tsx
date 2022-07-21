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
  Snackbar,
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import React, { useState, ReactElement } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import ConfirmationDialog from './ConfirmationDialog';
import { createEvents } from '../scripts/createEvents';

/* 
  Time wheel and datetime selectors
*/
function DatetimePickers({
  isSingleDay,
  isAllDay,
  startDate,
  endDate,
  handleStartDateChange,
  handleEndDateChange,
}: {
  isSingleDay: boolean;
  isAllDay: boolean;
  startDate: Date;
  endDate: Date;
  handleStartDateChange: any;
  handleEndDateChange: any;
}) {
  return (
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
  );
}

/*
  Form that appears in the accordion dropdown for each extracted date
*/
function DateSubmissionForm({ eventPrefill }: { eventPrefill: any }) {
  const {
    startDate: iStartDate,
    endDate: iEndDate,
    startTime: iStart,
    description: iDesc,
    title: iTitle,
  } = eventPrefill;

  // TODO: consolidate all of these variables to a single modifiable state (possibly)

  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [snackbarIsSuccess, setSnackbarIsSuccess] = useState<boolean>(false);

  const snackbarCallback = (success: boolean) => {
    setShowSnackbar(true);
    setSnackbarIsSuccess(success);
  };

  const [title, setTitle] = useState<string>(iTitle);
  const [description, setDescription] = useState<string>(iDesc);
  const [startDate, setStartDate] = useState<Date | null>(new Date(iStartDate));
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [endDate, setEndDate] = useState<Date | null>(new Date(iEndDate));
  const [isAllDay, setIsAllDay] = useState<boolean>(!iStart && !iEndDate);
  const [isSingleDay, setIsSingleDay] = useState<boolean>(
    !(iStartDate && iEndDate)
  );

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
      <ConfirmationDialog
        open={confirmationOpen}
        handleClose={closeConfirmation}
      />
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
      <DatetimePickers
        isSingleDay={isSingleDay}
        isAllDay={isAllDay}
        startDate={startDate}
        endDate={endDate}
        handleStartDateChange={handleStartDateChange}
        handleEndDateChange={handleEndDateChange}
      />
      <Snackbar
        open={showSnackbar}
        autoHideDuration={4000}
        message={
          snackbarIsSuccess
            ? 'Created new calendar event'
            : 'Failed to create new calendar event'
        }
        onClose={() => setShowSnackbar(false)}
      >
        <Alert severity={snackbarIsSuccess ? 'success' : 'warning'}>
          {snackbarIsSuccess
            ? 'Created new calendar event'
            : 'Failed to create new calendar event'}
        </Alert>
      </Snackbar>
      <Grid container spacing={2} justifyContent="space-around">
        <Grid item xs={4}>
          <Button
            sx={{ width: '100%' }}
            variant="contained"
            onClick={() => {
              openConfirmation();
              createEvents(
                [
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
                ],
                snackbarCallback
              );
            }}
          >
            Create Event
          </Button>
        </Grid>
      </Grid>
    </AccordionDetails>
  );
}

/*
  Rendered dropdown of dates extracted from site
*/
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
