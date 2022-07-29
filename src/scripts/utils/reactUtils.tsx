import { CalendarEvent } from '../../types';
import { getCurrentPageUrl } from './utils';
import React from 'react';

export function mapModalState(modalState: any): CalendarEvent {
  const { title, description } = modalState;

  return {
    start: { dateTime: new Date(modalState.startDate).toISOString() },
    end: {
      dateTime: modalState.endDate
        ? new Date(modalState.endDate).toISOString()
        : new Date(modalState.startDate).toISOString(),
    },
    summary: title,
    description:
      (description ? description + <br /> + <br /> : '') +
      'Event found at url:' +
      getCurrentPageUrl(),
  };
}
