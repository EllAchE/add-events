import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  TextField,
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import React, { useState, ReactElement } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';

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

  return (
    <AccordionDetails>
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
    </AccordionDetails>
  );
}

export function DateAccordion({
  eventPrefills,
}: {
  eventPrefills: any;
}): ReactElement {
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
                {/* this needs to conditionally render */}
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
