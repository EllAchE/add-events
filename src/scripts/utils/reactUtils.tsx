import { CalendarEventMessage } from '../../types';
import { getCurrentPageUrl } from './utils';
import React from 'react';

export function mapModalState(modalState: any): CalendarEventMessage {
  const {
    title,
    description,
    startDate,
    endDate,
    startTime,
    endTime,
    location,
  } = modalState;

  return getCreateEventConfig(
    startDate,
    endDate,
    endDate,
    startTime,
    endTime,
    description,
    title,
    location
  );
}

export function getCreateEventConfig(
  startDate: string | Date,
  isSingleDay: boolean,
  endDate?: string | Date,
  startTime?: string | Date,
  endTime?: string | Date,
  description?: string,
  title?: string,
  location?: string
): CalendarEventMessage {
  startDate = new Date(startDate);
  endDate = isSingleDay ? new Date(endDate) : startDate;

  if (startTime) {
    startTime = startTime ? new Date(startTime) : undefined;
    startDate.setHours(startTime.getHours());
    startDate.setMinutes(startTime.getMinutes());
  }
  if (endTime) {
    endTime = endTime ? new Date(endTime) : undefined;
    endDate.setHours(endTime.getHours());
    endDate.setMinutes(endTime.getMinutes());
  }

  return {
    start: {
      dateTime: startDate.toISOString(),
    },
    end: {
      dateTime: endDate.toISOString(),
    },
    summary: title,
    description:
      (description ? description + <br /> + <br /> : '') +
      'Event found at url:' +
      getCurrentPageUrl(),
    location,
    type: 'create-event',
    calendarName: 'Event Extension',
  };
}
