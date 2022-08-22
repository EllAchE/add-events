import { Typography } from '@mui/material';
import React, { ReactElement, useState } from 'react';
import Draggable from 'react-draggable';

export default function Legend(): ReactElement {
  return (
    <Draggable>
      <Typography>Proper Nouns</Typography>
      <Typography>Date</Typography>
      <Typography>Time</Typography>
      <Typography>Activity</Typography>
    </Draggable>
  );
}
