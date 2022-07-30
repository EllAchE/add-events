import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FindInPageIcon from '@mui/icons-material/FindInPage';
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
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import React, { useState, ReactElement } from 'react';
import {
  focusElementInTab,
  localStorageWrapper,
} from '../../scripts/utils/browserUtils';
import { getCreateEventConfig } from '../../scripts/utils/reactUtils';

import ConfirmationDialog from './ConfirmationDialog';

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
            disablePast={true}
            // maxDate={endDate}
            // onError={() => alert('start date must be after end date')}
            onChange={handleStartDateChange}
            renderInput={(params) => (
              <TextField {...params} sx={{ width: '100%' }} />
            )}
          />
        </Grid>
        {!isSingleDay && (
          <Grid item xs={6}>
            <DesktopDatePicker
              label="End Date"
              disablePast={true}
              value={endDate}
              // minDate={startDate}
              onChange={handleEndDateChange}
              renderInput={(params) => (
                <TextField {...params} sx={{ width: '100%' }} />
              )}
            />
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
              // maxTime={endDate}
              onChange={handleStartDateChange}
              ampm={false}
              renderInput={(params) => (
                <TextField {...params} sx={{ width: '100%' }} />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <TimePicker
              label="End Time"
              value={endDate}
              ampm={false}
              // minTime={startDate}
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
            onChange={(e) => setTitle(e?.target?.value)}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            sx={{ width: '100%' }}
            variant="outlined"
            multiline
            maxRows={3}
            defaultValue={description}
            onChange={(e) => setDescription(e?.target?.value)}
            label="Description"
          />
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
        autoHideDuration={3000}
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
            onClick={async () => {
              openConfirmation();
              chrome.runtime.sendMessage(
                getCreateEventConfig(
                  startDate,
                  isSingleDay,
                  endDate,
                  startDate,
                  endDate,
                  description,
                  title
                ),
                undefined,
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
export function DateAccordion({ dates }: { dates: any }): ReactElement {
  if (dates && dates.length < 1) {
    return (
      <Alert severity="warning">
        <Typography>No events found on page 😢</Typography>
      </Alert>
    );
  }

  return (
    <>
      {dates.map((date: any) => {
        let { text, surroundingText, chunkButtonId } = date;

        return (
          <Accordion key={chunkButtonId}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                <b>{text}</b>
                {` || Context: ...${surroundingText}...`}
                <Tooltip title="See event details on webpage">
                  <IconButton
                    onClick={() => {
                      localStorageWrapper(focusElementInTab, chunkButtonId);
                    }}
                  >
                    <FindInPageIcon />
                  </IconButton>
                </Tooltip>
              </Typography>
            </AccordionSummary>
            <DateSubmissionForm eventPrefill={date} />
          </Accordion>
        );
      })}
    </>
  );
}
